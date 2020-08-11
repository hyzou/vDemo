const mutations = {
  // 设置登录信息
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  // 保存分机信息
  SET_EQPINFO: (state, eqpInfo) => {
    eqpInfo.status = "未测试";
    eqpInfo.title = eqpInfo.eqpName;
    if (!eqpInfo.id && eqpInfo.id !== 0) {
      eqpInfo.id = state.eqpInfo.length;
      state.eqpInfo.push(eqpInfo);
    } else {
      state.eqpInfo.splice(eqpInfo.id, 1, eqpInfo);
    }
  },
  // 设置设备测试信息
  SET_TESTINFO: (state, testInfo) => {
    testInfo.title = testInfo.eqpName;
    testInfo.status = "柜控未测试，程控未测试";
    testInfo.testType = "0"; //testType:0 未测试，1柜控已测试，2都已测试
    if (!testInfo.id && testInfo.id !== 0) {
      testInfo.id = state.testInfo.length;
      state.testInfo.push(testInfo);
    } else {
      state.testInfo.splice(testInfo.id, 1, testInfo);
    }
  },
  // 设置已选择的测试流程
  SET_CHOSEDPROCESS: (state, chosedProcess) => {
    state.chosedProcess = chosedProcess;
  }
};
export default mutations;
