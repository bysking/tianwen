module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some((uu) => {
      return new RegExp(uu, 'i').test(source);
    });

    if (match) {
      ctx.status = 403;
      ctx.message = '出门左转，谢谢';
    } else {
      await next();
    }
  };
};
