const { apiVersion,token } = require("././config");
const koaJwt = require("koa-jwt");
const router = require("koa-router")({
  prefix: `/api/v${apiVersion}`,
});

const jwt = koaJwt({secret:token.secret});

module.exports = (app) => {
  const { controller } = app;
  router.get("/test", jwt,controller.test.test);
  router.post("/users/login", controller.user.login);
  router.post("/users/regist", controller.user.regist);

  app.use(router.routes());
  app.use(router.allowedMethods());
};


