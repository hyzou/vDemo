import equipmentTypejson from "@/util/testProjectsJson/equipmentTypeSettings";
import serialPortjson from "@/util/testProjectsJson/serialPortSettings";
import connectTpyejson from "@/util/testProjectsJson/connectTpyeSettings";
import protocoljson from "@/util/testProjectsJson/protocolSettings";
import registersjson from "@/util/testProjectsJson/registersSettings";
import testProcessjson from "@/util/testProjectsJson/testProcessSettings";
import protocolParamsjson from "@/util/testProjectsJson/protocolParamsListSettings";
import testTypejson from "@/util/testProjectsJson/testTypeSettings";
import controllerTypeRouterPathjson from "@/util/testProjectsJson/controllerTypeRouterPath";
import switchFunctionsSettingsjson from "@/util/testProjectsJson/switchFunctionsSettings";

const state = {
  // 登录用户信息
  userInfo: {},
  // 测试主体信息
  mainTestInfo: {
    eqpId: "",
    testType: "",
    testEqpId: "",
    controlType: "",
    testProcessId: 1,
    testProcessStepId: 0,
    gwDto: {}
  },
  // 当前测试分机类型（plc,测温，测气等）
  testEquipmentType: "",
  // 分机信息列表
  eqpInfo: [],
  // 分机类型对应路由信息表
  equipTypeToPath: controllerTypeRouterPathjson,
  // 设备测试信息
  testInfo: [],
  // 添加分机类型列表
  testTypeDatas: testTypejson,
  // 串口
  serialPortDatas: serialPortjson,
  // 连接类型
  connectTpyeDatas: connectTpyejson,
  // 协议类型
  protocolDatas: protocoljson,
  // 协议参数列表
  protocolParamsDatas: protocolParamsjson,
  // 分机设备类型
  eqpTpyeDatas: equipmentTypejson,
  // 寄存器类型
  registers: registersjson,
  // 测试流程
  testProcess: testProcessjson,
  // 已选中的测试流程
  chosedProcess: {},
  // 测温协议转换函数
  switchTempratureFunctions: switchFunctionsSettingsjson,
  // plc测试流程错误信息
  plcTestErrorInfo: {},
  // plc测试结果
  plcTestResult: "",
  // plc设备是否可进行程控（先柜控后程控）
  plcCanTestProgram: false
};
export default state;
