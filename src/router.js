const router = require("koa-router")();
const {NOT_FOUND} = require("./utils/response-helper")

module.exports = (app) => {
  const {controller} = app;
  router.get("/user/login",controller.user.login);
  // 404
  app.use(async (ctx,next) => {
    await next();
    if (ctx.response.status === 404) {
      NOT_FOUND(ctx)
    }
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
};