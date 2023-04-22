const User = require("../../models/user-model");

module.exports = (router) => {
  router.get("/register", async (ctx, next) => {
    // 新增数据
    const user = {
      username: "bysking",
      password: "123123",
      email: "",
    };
    const newUser = new User(user);
    await newUser.save();

    const data = await User.findOne({ username: "bysking" });

    const result = {
      code: 200,
      response: data,
      ts: 12345,
    };
    ctx.response.body = result;
  });
};
