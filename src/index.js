const Koa = require("koa");
// 第三方中间件
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors= require('koa2-cors');
const logger = require('koa-logger')
const koaJwt = require('koa-jwt')

// 自己封装的
const config = require("./config");
const router = require("./router");
const installModule = require('./midware/install-module');
const ErrorHandler = require('./midware/error-handler');

const app = new Koa();
// 跨域
app.use(cors());
// 日志打印
app.use(logger());
// body 解析
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}));
// 注册 controll service model 到 app 实例上;
installModule(app);
// 静态文件
app.use(static(__dirname + '/static'));
// 在路由之前先加载错误处理中间件
app.use(ErrorHandler);
// 加载路由中间件
router(app);

app.listen(config.port,() => {
  console.log(`server is running at port ${config.port} , mode = ${config.env}`);
})