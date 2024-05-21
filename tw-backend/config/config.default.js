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
  security: {},
};
