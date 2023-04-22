const User = require("../../models/user-model");

module.exports = (router) => {
  router.post("/register", async (ctx, next) => {
    const { username, password, email } = ctx.request.body;
    console.log(ctx.request.body);
    const data = (await User.findOne({ username })) || {};

    if (data.username) {
      const result = {
        code: 200,
        data,
        msg: "用户已经注册",
      };
      ctx.response.body = result;
      return;
    }

    // 新增数据
    const user = {
      username,
      password,
      email,
    };

    const newUser = new User(user);
    await newUser.save();
    const result = {
      code: 200,
      data,
      msg: "ok",
    };
    ctx.response.body = result;
  });

  router.post("/login", async (ctx, next) => {
    const { username, password } = ctx.request.body;
    console.log(ctx.request.body);
    const data = (await User.findOne({ username })) || {};

    if (data.password === password) {
      const result = {
        code: 200,
        data,
        msg: "ok",
      };
      ctx.response.body = result;
      return;
    } else {
      const result = {
        code: 200,
        data: {},
        msg: "用户名或者密码错误",
      };
      ctx.response.body = result;
    }
  });
};
