const testJson = [
  {
    name: "通风口测试流程",
    code: "vent_1",
    description: "全关-正打开 -中间-全开-正关闭-中间-全关",
    id: "1",
    process: [
      {
        idx: 0,
        processName: "测试前确认",
        tipsTitle: "测试前确认",
        tips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认通风口处于全关状态" },
          { tip: "3.请先用柜控操作关闭通风口，切换至程控模式" },
          { tip: "4.点击【开始测试】启动测试" }
        ],
        tankTips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认通风口处于全关状态" },
          { tip: "3.点击【开始测试】启动测试" }
        ],
        testItems: "",
        processId: "0",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "开始测试", instruction: "nextStep", status: "start" }
        ],
        operateButtons: []
      },
      {
        idx: 1,
        processName: "打开通风口",
        tipsTitle: "打开通风口",
        tips: [
          { tip: "1.请点击【打开通风口】按钮打开通风口" },
          { tip: "2.通风口已开启到位后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控打开通风口" },
          { tip: "2.通风口已开启到位后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "close,opening,middle,opened,turnOn",
        processId: "1",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          {
            label: "下一动作",
            instruction: "nextStep"
          }
        ],
        operateButtons: [{ label: "打开通风口", instruction: "turnOn" }]
      },
      {
        idx: 2,
        processName: "关闭通风口",
        tipsTitle: "关闭通风口",
        tips: [
          { tip: "1.请点击【关闭通风口】按钮关闭通风口" },
          { tip: "2.通风口已关闭到位后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控关闭通风口" },
          { tip: "2.通风口已关闭到位后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "opened,closeing,middle,close,turnOff",
        processId: "2",
        isEnd: "true",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "获取结果", instruction: "getResult" }
        ],
        operateButtons: [{ label: "关闭通风口", instruction: "turnOff" }]
      }
    ]
  }
];
export default testJson;
