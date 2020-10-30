module.exports = {
  env: "development",
  port: 3000,
  apiVersion: "1",
  dburl: "mongodb://localhost/mini-shop",
  token: {
    secret: "hjqbwensfdf",
    expires: 1000 * 60 * 60 * 24 * 7, // 7天过期时间
  },
};
