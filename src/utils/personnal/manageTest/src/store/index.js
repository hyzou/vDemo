import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import equipmentTypejson from "@/util/testProjectsJson/equipmentTypeSettings";
import serialPortjson from "@/util/testProjectsJson/serialPortSettings";
import connectTpyejson from "@/util/testProjectsJson/connectTpyeSettings";
import protocoljson from "@/util/testProjectsJson/protocolSettings";
import registersjson from "@/util/testProjectsJson/registersSettings";
import testProcessjson from "@/util/testProjectsJson/testProcessSettings";

export default new Vuex.Store({
  state: {
    // 登录用户信息
    userInfo: {
      userName: "crk"
    },
    // 分机信息列表
    eqpInfo: [],
    // 设备测试信息
    testInfo: [],
    // 串口
    serialPortDatas: serialPortjson,
    // 连接类型
    connectTpyeDatas: connectTpyejson,
    // 协议类型
    protocolDatas: protocoljson,
    // 分机设备类型
    eqpTpyeDatas: equipmentTypejson,
    // 寄存器类型
    registers: registersjson,
    // 测试流程
    testProcess: testProcessjson,
    // 已选中的测试流程
    chosedProcess: {}
  },
  getters: {
    // 登录用户信息
    userInfo: state => {
      return state.userInfo;
    },
    // 设备分机信息
    eqpInfo: state => {
      return state.eqpInfo;
    },
    // 串口
    serialPortDatas: state => {
      return state.serialPortDatas;
    },
    // 连接类型
    connectTpyeDatas: state => {
      return state.connectTpyeDatas;
    },
    // 协议类型
    protocolDatas: state => {
      return state.protocolDatas;
    },
    // 分机设备类型
    eqpTpyeDatas: state => {
      return state.eqpTpyeDatas;
    },
    // 不同设备的寄存器类型
    registers: state => {
      return state.registers;
    },
    // 设备测试信息
    testInfo: state => {
      return state.testInfo;
    },
    // 设备测试流程
    testProcess: state => {
      return state.testProcess;
    },
    // 已选中的测试流程
    chosedProcess: state => {
      return state.chosedProcess;
    }
  },
  mutations: {
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
  },
  actions: {
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
  }
});
