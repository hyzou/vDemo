import equipmentTypejson from "@/util/testProjectsJson/equipmentTypeSettings";
import serialPortjson from "@/util/testProjectsJson/serialPortSettings";
import connectTpyejson from "@/util/testProjectsJson/connectTpyeSettings";
import protocoljson from "@/util/testProjectsJson/protocolSettings";
import registersjson from "@/util/testProjectsJson/registersSettings";
import testProcessjson from "@/util/testProjectsJson/testProcessSettings";
import protocolParamsjson from "@/util/testProjectsJson/protocolParamsListSettings";
import testTypejson from "@/util/testProjectsJson/testTypeSettings";

const state = {
  // 登录用户信息
  userInfo: {
    userName: "crk"
  },
  // 分机信息列表
  eqpInfo: [],
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
  chosedProcess: {}
};
export default state;
