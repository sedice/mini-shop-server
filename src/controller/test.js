const {SUCCESS} = require("../utils/response-helper");
module.exports = {
  async test(ctx) {
    SUCCESS(ctx,{
      status:'success'
    });
  },
}