const format = (err, ctx) => {
  ctx.response.status = err.statusCode
  ctx.response.body = {
    errcode: err.errcode,
    message: err.errmsg || err.message || "未知错误",
    request: ctx.method + ' >> ' + ctx.url
  }
}

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err);
  //判断是否为已知错误
    if (err.flag === 'errFlag') {
      format(err, ctx)
    } else {
      format({
        statusCode:500
      }, ctx)
    }
    ctx.app.emit('error', err, ctx);
  }
}