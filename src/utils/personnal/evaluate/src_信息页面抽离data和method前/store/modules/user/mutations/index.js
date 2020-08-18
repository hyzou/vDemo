/**
 * mutations
 * 方法命名：驼峰命名 setState(前缀)+appName(state中变量名)=>commitAppName
 */
const mutations = {
  setStateUserInfos: (state, userInfos) => {
    userInfos.userName = state.userName[userInfos.loginName];
    userInfos.userId = state.userId[userInfos.loginName];
    state.userInfos = { ...userInfos };
  },
  setStateClearUserInfos: state => {
    let userInfos = {
      userName: "",
      userId: "",
      loginName: "",
      password: ""
    };
    state.userInfos = { ...userInfos };
  }
};
export default mutations;
