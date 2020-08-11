/**阀门寄存器
 * {
 *  key:"" 寄存器表单key值，用于动态表单取值赋值
 *  propValue:"" 寄存器设备属性编号
 *  type:"" 寄存器表单项类型：ip或者target(需比对结果的项目)
 *  controlType:"" 寄存器表单项类型：statusR(状态寄存器项),controlR(控制寄存器项)
 *  label:"" 寄存器表单中文名称
 * }
 * */

/* 默认值，需用户自行填写
4001	阀门控制	必须	
0（关闭） 必须
2（打开） 必须
100 （停止）
控制阀门打开关闭

4101	阀门状态	 必须	
0（全关） 必须
1（正打开）
2（正关闭）
3（全开）必须
4（中间）
5（异常）
显示阀门状态
*/

const registJson = [
  {
    key: "statusRegister",
    propValue: "4101",
    type: "ip",
    controlType: "statusR",
    label: "状态寄存器地址",
    required: true
  },
  {
    key: "close",
    propValue: "4101",
    type: "target",
    controlType: "statusR",
    label: "全关",
    required: true
  },
  {
    key: "opening",
    propValue: "4101",
    type: "target",
    controlType: "statusR",
    label: "正打开",
    required: false
  },
  {
    key: "opened",
    propValue: "4101",
    type: "target",
    controlType: "statusR",
    label: "全开",
    required: true
  },
  {
    key: "closeing",
    propValue: "4101",
    type: "target",
    controlType: "statusR",
    label: "正关闭",
    required: false
  },
  {
    key: "middle",
    propValue: "4101",
    type: "target",
    controlType: "statusR",
    label: "中间",
    required: false
  },
  {
    key: "error",
    propValue: "4101",
    type: "target",
    controlType: "statusR",
    label: "异常",
    required: false
  },
  {
    key: "controlRegister",
    propValue: "4001",
    type: "ip",
    controlType: "controlR",
    label: "控制寄存器地址",
    required: true
  },
  {
    key: "turnOff",
    propValue: "4001",
    type: "target",
    controlType: "controlR",
    label: "关闭",
    required: true
  },
  {
    key: "turnOn",
    propValue: "4001",
    type: "target",
    controlType: "controlR",
    label: "打开",
    required: true
  },
  {
    key: "turnPause",
    propValue: "4001",
    type: "target",
    controlType: "controlR",
    label: "停止",
    required: false
  }
];
export default registJson;
