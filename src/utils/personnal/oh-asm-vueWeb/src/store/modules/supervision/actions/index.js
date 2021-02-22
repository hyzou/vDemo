/**
 * actions
 * 方法命名：驼峰命名 commit(前缀)+appName(state中变量名)=>commitAppName
 */
const actions = {
  commitWorkProgress({ commit }, info) {
    return new Promise(relsove => {
      commit("setWorkProgress", info);
      relsove();
    });
  },
  commitDeleteWorkProgress({ commit }, id) {
    return new Promise(relsove => {
      commit("deleteWorkProgress", id);
      relsove();
    });
  },
  commitProgressResult({ commit }, info) {
    return new Promise(relsove => {
      commit("setProgressResult", info);
      relsove();
    });
  },
  commitSpecialProgressResult({ commit }, info) {
    return new Promise(relsove => {
      commit("setSpecialProgressResult", info);
      relsove();
    });
  }
};
export default actions;
