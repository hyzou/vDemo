/**单向风机寄存器
 * {
 *  key:"" 寄存器表单key值，用于动态表单取值赋值
 *  propValue:"" 寄存器设备属性编号
 *  type:"" 寄存器表单项类型：ip或者target(需比对结果的项目)
 *  controlType:"" 寄存器表单项类型：statusR(状态寄存器项),controlR(控制寄存器项)
 *  label:"" 寄存器表单中文名称
 * }
 * */

/* 默认值，需用户自行填写
7001	单向风机控制	必须	
0（停止） 必须
1（启动） 必须
控制单向风机启动停止

7101	单向风机状态	 必须	
0（停止） 必须
1（运行）必须
2（异常）
显示单向风机状态
*/

const registJson = [
  {
    key: "statusRegister",
    propValue: "7101",
    type: "ip",
    controlType: "statusR",
    label: "状态寄存器地址",
    required: true
  },
  {
    key: "stop",
    propValue: "7101",
    type: "target",
    controlType: "statusR",
    label: "停止",
    required: true
  },
  {
    key: "operating",
    propValue: "7101",
    type: "target",
    controlType: "statusR",
    label: "运行",
    required: true
  },
  {
    key: "error",
    propValue: "7101",
    type: "target",
    controlType: "statusR",
    label: "异常",
    required: false
  },
  {
    key: "controlRegister",
    propValue: "7001",
    type: "ip",
    controlType: "controlR",
    label: "控制寄存器地址",
    required: true
  },
  {
    key: "turnOff",
    propValue: "7001",
    type: "target",
    controlType: "controlR",
    label: "停止",
    required: true
  },
  {
    key: "turnOn",
    propValue: "7001",
    type: "target",
    controlType: "controlR",
    label: "启动",
    required: true
  }
];
export default registJson;
