const getters = {
  // 登录用户信息
  userInfo: state => {
    return state.userInfo;
  },
  // 设备分机信息
  eqpInfo: state => {
    return state.eqpInfo;
  },
  // 分机类型对应路由信息表
  equipTypeToPaht: state => {
    return state.equipTypeToPaht;
  },
  // 分机类型
  testTypeDatas: state => {
    return state.testTypeDatas;
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
  // 协议参数列表
  protocolParamsDatas: state => {
    return state.protocolParamsDatas;
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
  },
  // 测温转换函数
  switchTempratureFunctions: state => {
    return state.switchTempratureFunctions;
  },
  // plc测试流程错误信息
  plcTestErrorInfo: state => {
    return state.plcTestErrorInfo;
  },
  // plc测试流程结果信息
  plcTestResult: state => {
    return state.plcTestResult;
  }
};
export default getters;
