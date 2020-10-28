function transformSuccessData(ctx,errcode,message,data) {
  ctx.status = 200;
  ctx.body = {
    errcode,
    message,
    data
  }
}

function transformError(ctx,httpCode,errcode,errmsg) {
  ctx.throw(httpCode, errmsg, {
    errcode,
    errmsg,
    flag: "errFlag",
  })
}

// 200 请求成功
exports.SUCCESS =  (ctx, data, msg = "操作成功") => transformSuccessData(ctx,0,msg,data);

// 用户相关
exports.USER_ACCOUNT_DISABLE =  (ctx) => transformSuccessData(ctx,20001,'账号不可用');
exports.USER_ACCOUNT_ALREADY_EXIST =  (ctx) => transformSuccessData(ctx,20002,'用户已存在');
exports.USER_ACCOUNT_NOT_EXIST =  (ctx) => transformSuccessData(ctx,20003,'用户不存在');
exports.USER_PWD_ERROR =  (ctx) => transformSuccessData(ctx,20004,'密码错误');

// 400
exports.PARAM_NOT_COMPLETE =  (ctx, msg = "请求参数缺失") => transformError(ctx,400,40001,msg);
exports.PARAM_INVALID =  (ctx, msg = "请求参数无效") => transformError(ctx,400,40002,msg);

// 401
exports.TOKEN_IS_BLANK =  (ctx, msg = "token为空") => transformError(ctx,401,40101,msg);
exports.TOKEN_EXPIRED =  (ctx, msg = "token过期") => transformError(ctx,401,40002,msg);
exports.TOKEN_INVALID =  (ctx, msg = "token无效") => transformError(ctx,401,40003,msg);
exports.AUTHENTICATION_FAIL =  (ctx, msg = "认证失败") => transformError(ctx,401,40004,msg);

// 404
exports.NOT_FOUND =  (ctx, msg = "找不到对应的api接口") => transformError(ctx,404,40401,msg);

// 500
exports.SERVER_ERROR =  (ctx, msg = "服务器错误") => transformError(ctx,500,50001,msg);
