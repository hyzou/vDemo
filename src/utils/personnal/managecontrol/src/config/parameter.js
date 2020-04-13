//监控摄像头配置参数
var monitor = {
  gatewayIp: "http://192.168.2.67:9081", //摄像头网关默认地址
  monitorAccessUrl: "/oh-security/_data/security/access", //鉴权地址，判断是否可访问
  gatewayPort: ":9081", //摄像头网关端口
  gatewaySocketIp: "http://192.168.2.67:8081/_wst", //本地加速网关默认地址
  gatewaySocketPort: ":8081/_wst" //本地加速网关端口
};
//测温计划任务配置
var task = {
  minTime: 1, //最小执行时间间隔 单位小时(正整数)
  maxTimeCount: 5 //一天最多可配置次数(正整数)
};
//报表服务链接
var reportUrl = {
  reportContextUrl: null,
  contextUrl: null,
  local: true // 需要用localhost访问
};
//配置需要显示加速按钮的页面 参数页面id
//已配置页面   库区总览,粮情，通风，气调，控温，熏蒸, 气密性检测
var fasterArray = [
  "scene",
  "detection-cereals",
  "control-ventilate",
  "control-gas",
  "control-temperature",
  "control-circulation",
  "tightness",
  "detection-insect",
  "detection-gas"
];
//首页菜单配置
// indexMenu 建议长度为8
var indexMenu = [
  {
    id: "scene",
    icon: "icon-kufang",
    text: "库区总览",
    backgroundClass: "index-orange"
  },
  {
    id: "detection-cereals",
    icon: "icon-wendu",
    text: "温湿度检测",
    backgroundClass: "index-green"
  },
  {
    id: "house_erv",
    icon: "icon-huanjing",
    text: "库区气象",
    backgroundClass: "index-yellow"
  },
  {
    id: "energy_con",
    icon: "icon-nenghaozonglan",
    text: "能耗展示",
    backgroundClass: "index-blue"
  },
  {
    id: "control-ventilate",
    icon: "icon-tongfengjing",
    text: "智能通风系统",
    backgroundClass: "index-orange"
  },
  {
    id: "control-temperature",
    icon: "icon-kongtiao",
    text: "智能控温系统",
    backgroundClass: "index-blue"
  },
  {
    id: "control-gas",
    icon: "icon-guandaoshujuico_hui",
    text: "智能气调系统",
    backgroundClass: "index-orange"
  },
  {
    id: "control-circulation",
    icon: "icon-xunhuan",
    text: "环流熏蒸系统",
    backgroundClass: "index-green"
  }
  // {
  //     id : 'control-temperature',
  //     icon: 'icon-shuiweijiance',
  //     text: '水位监测',
  //     backgroundClass: 'index-blue'
  // },
  // {
  //     id : 'control-gas',
  //     icon: 'icon-icon-test',
  //     text: '健康指数',
  //     backgroundClass: 'index-orange'
  // },
  // {
  //     id : 'insect',
  //     icon: 'icon-icontubiao',
  //     text: '测虫系统',
  //     backgroundClass: 'index-green'
  // }
];
var monitorRelationList = [
  //摄像头可配置的页面
  { text: "智能通风", value: "control-ventilate" },
  { text: "智能控温", value: "control-temperature" },
  { text: "智能气调", value: "control-gas" },
  { text: "数量检测", value: "detection-inventory" }
];
//省平台提供库区储粮情况数据地址
var grainDataIframe = {
  host: "http://115.238.91.156:8380/",
  address:
    "wmsReport.prStore.StockBQuery.do?param/case=graph&param/district2=&param/grain_property="
  // address : 'wmsReport.prCockpit.operate.do'
  // address : 'wmsReport.prStroe.StockBQuery.do'
};
//库区总览中的  单击仓房---更多---粮情检查表,货位配置
var grainCheckTable = {
  has: true,
  hostName: "http://115.238.91.156:8380/",
  checkTable: "wmsCondition.prHC.storeConditionView.do?sh=",
  cargoLocation: "pkgBasic.pr.prWmsStorestackView.do?sh="
};
//系统集成页面跳转地址
var sysIntegrate = {
  address: "http://115.238.91.156:8888/"
};
//仓房气体浓度警报消息配置
var houseGasAlarm = {
  //配置需要显示气体浓度报警信息 参数页面id
  //已配置页面 温湿度，通风，气调，控温，熏蒸, 气密性检测, 测虫, 测气, 数量检测, 水位监测
  alarmPageArray: [
    "detection-cereals",
    "control-ventilate",
    "control-gas",
    "control-temperature",
    "control-circulation",
    "tightness",
    "detection-insect",
    "detection-gas",
    "detection-inventory",
    "detection-water"
  ]
};
/**
 *
 * @type {{o2: string, ph3: string, co2: string, n2: string, atmosphere: string}}
 */
var houseGasType = {
  o2: "氧气",
  ph3: "磷化氢",
  co2: "二氧化碳",
  n2: "氮气",
  atmosphere: "气压差"
};
//气调和环流熏蒸页面，模型的打光位置偏移量
var gasLightOffset = {
  //  x : -0.5,
  //  y : 0,
  //  z : 0
  x: 0.5,
  y: 0,
  z: 3
};
var visualMapColor = [ '#ff0a00', '#ff1a00', '#ff2a00', '#ff3a00', '#ff4a00', '#ff5a00', '#ff6a00', '#ff7a00',
			   '#ff8a00', '#ff9a00', '#ffaa00', '#ffba00', '#ffca00', '#ffda00', '#ffea00', '#fffa00', 
			   '#fffb00', '#fffc00', '#fffd00', '#fffe00', '#dcff00', '#aaff00', '#9aff00', '#8aff00',
			   '#7aff00', '#6aff00', '#5aff00', '#4aff00', '#3aff00', '#2aff00', '#1aff00', '#0aff00',
			   '#00ff0a', '#00ff1a', '#00ff2a', '#00ff3a', '#00ff4a', '#00ff5a', '#00ff6a', '#00ff7a',
			   '#00ff8a', '#00ff9a', '#00ffaa', '#00ffba', '#00ffda', '#00fffa', '#00ffff', '#00feff',
			   '#00faff', '#00eaff', '#00daff', '#00caff', '#00baff', '#00aaff', '#009aff', '#008aff',
			   '#007aff', '#006aff', '#005aff', '#004aff', '#003aff', '#002aff', '#001aff', '#000aff'];
export default {
  monitorConfig: monitor,
  tempTaskConfig: task,
  reportUrl: reportUrl,
  fasterArray: fasterArray,
  indexMenu: indexMenu,
  monitorRelationList: monitorRelationList,
  grainDataIframe: grainDataIframe,
  gasLightOffset: gasLightOffset,
  grainCheckTable: grainCheckTable,
  sysIntegrate: sysIntegrate,
  houseGasAlarm: houseGasAlarm,
  houseGasType: houseGasType,
  visualMapColor: visualMapColor
};
