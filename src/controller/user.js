const {
  SUCCESS,
  USER_PWD_ERROR,
  USER_ACCOUNT_NOT_EXIST,
  PARAM_NOT_COMPLETE,
  USER_ACCOUNT_ALREADY_EXIST,
} = require("../utils/response-helper");
const { comparePassword, encryptPassword } = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");

async function createToken(payload) {
  return await jwt.sign(payload,config.token.secret,{ expiresIn: "1day" });
}

module.exports = {
  async login(ctx) {
    const { app } = ctx;
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      return PARAM_NOT_COMPLETE(ctx, "用户名或密码不能为空");
    }

    const userModel = app.model.user;
    let data = await userModel.findOne({ username });
    if (!data) {
      return USER_ACCOUNT_NOT_EXIST(ctx, "找不到该用户,请检查用户名是否有误");
    }

    if (!comparePassword(password, data.password)) {
      return USER_PWD_ERROR(ctx);
    }

    let token = await createToken({
      username:data.username,
      id:data._id
    });

    SUCCESS(ctx, {
      username,
      id: data._id,
      token,
    });
  },

  async regist(ctx) {
    const { app } = ctx;
    const { username, password, password2 } = ctx.request.body;

    if (!username || !password || !password2) {
      return PARAM_NOT_COMPLETE(ctx);
    }

    if (password !== password2) {
      return PARAM_INVALID(ctx, "密码与确认密码不一致");
    }

    const userModel = app.model.user;
    let data = await userModel.findOne({ username });
    if (data) {
      return USER_ACCOUNT_ALREADY_EXIST(ctx);
    }

    let encryPassword = encryptPassword(password);
    let user = await app.model.user.create({
      username,
      password: encryPassword,
    });
    SUCCESS(ctx, {
      username:user.username,
      id:user._id
    });
  },
};
