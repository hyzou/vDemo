/**
 * mutations
 * 方法命名：驼峰命名 setState(前缀)+appName(state中变量名)=>commitAppName
 */
const mutations = {
  setStateUserInfos: (state, userInfos) => {
    // userInfos.userName = state.userName[userInfos.loginName];
    // userInfos.userId = state.userId[userInfos.loginName];
    state.userInfos = { ...userInfos };
  },
  setFileViewerUrl: (state, fileViewerUrl) => {
    state.fileViewerUrl = fileViewerUrl;
  },
  setReportServerUrl: (state, reportServerUrl) => {
    state.reportServerUrl = reportServerUrl;
  },
  setStateClearUserInfos: state => {
    let userInfos = {
      userName: "",
      userId: "",
      loginName: "",
      password: ""
    };
    state.userInfos = { ...userInfos };
  },
  setStateToken: (state, data) => {
    state.token = data.jwt;
  },
  setStateClearToken: state => {
    state.token = "";
  },
  setSysType: (state, sysType) => {
    state.sysType = sysType;
  },
  setAsyncRouterslist: (state, asyncRouter) => {
    state.asyncRouterslist = asyncRouter;
  }
};
export default mutations;
