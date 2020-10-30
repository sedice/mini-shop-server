const {
  SUCCESS,
} = require("../utils/response-helper");

module.exports = {
  async init (ctx) {
    const datas = require("../data/goods");
    await ctx.app.model.goods.create(datas);
    SUCCESS(ctx);
  },
  async getAll (ctx) {
    let model = ctx.app.model.goods;
    const {page = 1,per_page = 20} = ctx.request.body;
    let data = await model.find({}).skip(per_page * (page - 1)).limit(per_page)
    SUCCESS(ctx,data);
  },
  async getById (ctx) {
    let model = ctx.app.model.goods;
    const {goodsid} = ctx.request.params;
    let data = await model.findOne({_id:goodsid});
    SUCCESS(ctx,data);
  }
};
