/**
 * actions
 * 方法命名：驼峰命名 commit(前缀)+appName(state中变量名)=>commitAppName
 */
const actions = {
  commitAddInfoToAllInfosList({ commit }, info) {
    return new Promise(relsove => {
      commit("setStateAddInfoToAllInfosList", info);
      relsove();
    });
  },
  commitRemoveInfoFromAllInfosList({ commit }, id) {
    return new Promise(relsove => {
      commit("setStateRemoveInfoFromAllInfosList", id);
      relsove();
    });
  },
  commitEditInfoFromAllInfosList({ commit }, info) {
    return new Promise(relsove => {
      commit("setStateEditInfoFromAllInfosList", info);
      relsove();
    });
  },
  commitAddInfoToStuffList({ commit }, info) {
    return new Promise(relsove => {
      commit("setStateAddInfoToStuffList", info);
      relsove();
    });
  },
  commitRemoveInfoFromStuffList({ commit }, id) {
    return new Promise(relsove => {
      commit("setStateRemoveInfoFromStuffList", id);
      relsove();
    });
  },
  commitEditInfoFromStuffList({ commit }, info) {
    return new Promise(relsove => {
      commit("setStateEditInfoFromStuffList", info);
      relsove();
    });
  }
};
export default actions;
