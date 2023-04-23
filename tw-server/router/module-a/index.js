module.exports = (router) => {
  router.get("/test", async (ctx, next) => {
    const { username, password } = ctx.request.body;
    console.log(ctx.request.body);

    await next();

    const result = {
      code: 200,
      data: {
        name: "222",
      },
      msg: "ok",
    };
    ctx.response.body = result;
    return;
  });
};
