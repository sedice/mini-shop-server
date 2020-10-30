const { NOT_FOUND,TOKEN_INVALID,METHOD_NOT_ALLOWED } = require("../utils/response-helper");

const format = (err, ctx) => {
  ctx.response.status = err.statusCode
  ctx.response.body = {
    code: -1,
    message: err.message || "未知错误"
  }
}

module.exports = async (ctx, next) => {
  try {
    await next()
    if (ctx.response.status === 404) {
      NOT_FOUND(ctx);
    } else if (ctx.response.status === 405) {
      METHOD_NOT_ALLOWED(ctx);
    }
  } catch (err) {
    let myErr = err;
    if (err.status === 401 || err.statusCode === 401) {
      myErr = {
        statusCode:401,
        message:"token 验证失败",
        flag:"errFlag"
      }
    }
    // 判断是否为已知错误
    if (myErr.flag === 'errFlag') {
      format(myErr, ctx)
    } else {
      format({
        statusCode:err.statusCode || 500,
        message:err.message || "服务器错误"
      }, ctx)
    }
    ctx.app.emit('error', err, ctx);
  }
}