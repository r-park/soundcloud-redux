export const appActions = {
  INIT_APP: 'INIT_APP',

  initApp: config => ({
    type: appActions.INIT_APP,
    payload: config
  })
};
