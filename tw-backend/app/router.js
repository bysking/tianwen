module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/menuConfigWithPermit', controller.menu.menuConfigWithPermit);
  router.get('/userInfo', controller.user.userInfo);
  router.get('/roleAccess', controller.user.roleAccess);
};
