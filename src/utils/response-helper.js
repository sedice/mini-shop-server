function successHandler(ctx, data, message) {
  ctx.status = 200;
  ctx.body = {
    code:0,
    message,
    data,
  };
}

function errorHandler(ctx, httpCode, errmsg = "未知错误") {
  ctx.throw(httpCode, errmsg, {
    flag: "errFlag",
  });
}

// 200 请求成功
exports.SUCCESS = (ctx, data, msg = "操作成功") =>
  successHandler(ctx, data, msg);

// 400
exports.PARAM_NOT_COMPLETE = (ctx, msg = "请求参数缺失") =>
  errorHandler(ctx, 400, msg);
exports.PARAM_INVALID = (ctx, msg = "请求参数无效") =>
  errorHandler(ctx, 400, msg);
exports.USER_ACCOUNT_DISABLE = (ctx, msg = "账号不可用") =>
  errorHandler(ctx, 400, "账号不可用");
exports.USER_ACCOUNT_ALREADY_EXIST = (ctx, msg = "用户已存在") =>
  errorHandler(ctx, 400, "用户已存在");
exports.USER_ACCOUNT_NOT_EXIST = (ctx, msg = "用户不存在") =>
  errorHandler(ctx, 400, "用户不存在");
exports.USER_PWD_ERROR = (ctx, msg = "密码错误") =>
  errorHandler(ctx, 400, "密码错误");

// 401
exports.TOKEN_IS_BLANK = (ctx, msg = "token为空") =>
  errorHandler(ctx, 401, msg);
exports.TOKEN_EXPIRED = (ctx, msg = "token过期") => errorHandler(ctx, 401, msg);
exports.TOKEN_INVALID = (ctx, msg = "token无效") => errorHandler(ctx, 401, msg);
exports.AUTHENTICATION_FAIL = (ctx, msg = "认证失败") =>
  errorHandler(ctx, 401, msg);

// 404
exports.NOT_FOUND = (ctx, msg = "找不到对应的api接口") =>
  errorHandler(ctx, 404, msg);

// 405
exports.METHOD_NOT_ALLOWED = (ctx, msg = "此api不支持该调用方式") =>
  errorHandler(ctx, 405, msg);

// 500
exports.SERVER_ERROR = (ctx, msg = "服务器错误") => errorHandler(ctx, 500, msg);
