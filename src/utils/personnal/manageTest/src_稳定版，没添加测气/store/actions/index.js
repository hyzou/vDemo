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
  },
  // 保存当前plc测试流程出错信息
  setPlcTestErrorInfo({ commit }, plcTestErrorInfo) {
    commit("SET_PLCTESTERRORINFO", plcTestErrorInfo);
  },
  // 保存当前plc测试流程结果信息
  setPlcTestResult({ commit }, plcTestResult) {
    commit("SET_PLCTESTRESULT", plcTestResult);
  },
  // 保存当前plc测试流程结果信息
  setPlcCanTestProgram({ commit }, plcCanTestProgram) {
    commit("SET_PLCCANTESPROGRAM", plcCanTestProgram);
  }
};
export default actions;
