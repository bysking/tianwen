const cacheMockAppKey = 'tianwen_cacheMockAppKey';
export const getMockApp = () => {
  let app = JSON.parse(
    localStorage.getItem(cacheMockAppKey) || JSON.stringify({}),
  );

  app = {
    entry: app.entry,
    path: app.name,
    microApp: app.name,
    name: app.name,
  };

  return app;
};

export const setMockApp = (data: any) => {
  localStorage.setItem(cacheMockAppKey, JSON.stringify(data));
};

export const clearApp = () => {
  localStorage.removeItem(cacheMockAppKey);
};
