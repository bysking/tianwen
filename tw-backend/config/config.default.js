module.exports = {
  keys: 'bysking', // cookie 安全字符串
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  },
  news: {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  },
  middleware: ['robot'],
  robot: {
    ua: ['Baiduspider'],
  },
  i18n: {
    defaultLocale: 'zh-CN',
  },
  security: {
    csrf: {
      ignore: (ctx) => {
        // 登录接口放行，其余接口必须携带token
        console.log('------------------------->');
        console.log(ctx.url);
        console.log(ctx.request.body, ctx.request.query);
        if (ctx.url.indexOf('/oauth/token') !== -1) {
          return true;
        }
      },
    },
  },
};
