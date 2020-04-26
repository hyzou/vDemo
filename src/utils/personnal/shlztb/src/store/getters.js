const getters = {
  token: state => state.user.token,
  hasNewNotice: state => state.user.hasNewNotice,
  unreadNotice: state => state.user.unreadNotice,
  userInfo: state => state.user.userInfo,
  hasGotRouters: state => state.user.hasGotRouters,
  routerWhiteList: state => state.user.routerWhiteList,
  routerList: state => state.user.routerList,
  routerAsyncList: state => state.user.routerAsyncList
};
export default getters;
