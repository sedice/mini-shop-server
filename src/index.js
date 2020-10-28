const Koa = require("koa");
const config = require("./config");
const router = require("./router");
const installModule = require('./midware/install-module');
const ErrorHandler = require('./midware/error-handler');



const app = new Koa();

// 加载路由中间件
installModule(app);
app.use(ErrorHandler);
router(app);

app.listen(config.port,() => {
  console.log(`server is running at port ${config.port}`);
})