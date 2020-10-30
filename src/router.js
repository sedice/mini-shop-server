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
  router.get("/goods/init", controller.goods.init);
  router.get("/goods/", controller.goods.getAll);
  router.get("/goods/:goodsid", controller.goods.getById);

  app.use(router.routes());
  app.use(router.allowedMethods());
};


