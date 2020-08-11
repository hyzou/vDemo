/**
 * actions
 * 方法命名：驼峰命名 commit(前缀)+appName(state中变量名)=>commitAppName
 */
const actions = {
  commitUserInfos({ commit }, userInfos) {
    return new Promise((relsove, reject) => {
      if (
        userInfos.loginName == "skb" ||
        userInfos.loginName == "sk" ||
        userInfos.loginName == "ncj" ||
        userInfos.loginName == "ncc" ||
        userInfos.loginName == "swj" ||
        userInfos.loginName == "swc"
      ) {
        commit("setStateUserInfos", userInfos);
        relsove();
      } else {
        reject("帐号不存在，请确认您的账号名是否正确");
      }
    });
  },
  commitClearUserInfos({ commit }) {
    return new Promise(relsove => {
      commit("setStateClearUserInfos");
      relsove();
    });
  }
};
export default actions;
