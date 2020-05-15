const actions = {
  // 设置登录信息
  setUserInfos({ commit }, userInfo) {
    commit("SET_USERINFO", userInfo);
  },
  // 添加分机信息
  setEqpInfo({ commit }, eqpInfo) {
    commit("SET_EQPINFO", eqpInfo);
  },
  // 设置设备测试信息
  setTestInfos({ commit }, testInfo) {
    commit("SET_TESTINFO", testInfo);
  },
  // 设置设备测试流程
  setChosedProcess({ commit }, chosedProcess) {
    commit("SET_CHOSEDPROCESS", chosedProcess);
  }
};
export default actions;
