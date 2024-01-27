module.exports = (router) => {
  router.get("/test", async (ctx, next) => {
    const { username, password } = ctx.request.body;

    const user = ctx.session.user;

    if (user) {
      console.log("session", user);
    } else {
      ctx.session.user = Math.random();
    }

    let bb = ctx.cookies.get("bysking");
    if (bb) {
      console.log("cookie", bb);
    } else {
      ctx.cookies.set("bysking", Math.random());
    }

    const result = {
      code: 200,
      data: {
        name: "222",
      },
      msg: "ok",
    };
    ctx.response.body = result;

    await next();
  });
};
