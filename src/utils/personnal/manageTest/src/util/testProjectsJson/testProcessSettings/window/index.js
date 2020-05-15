const testJson = [
  {
    name: "测试流程一",
    description: "全关-正打开 -中间-全开-正关闭-中间-全关",
    id: "1",
    process: [
      {
        idx: 0,
        processName: "测试前确认",
        tipsTitle: "测试前确认",
        tips: [
          { tip: "1.请确认仓窗处于全关状态" },
          { tip: "2.请先用柜控操作关闭仓窗，切换至程控模式" },
          { tip: "3.点击【开始测试】启动测试" }
        ],
        tankTips: [
          { tip: "1.请确认仓窗处于全关状态" },
          { tip: "2.点击【开始测试】启动测试" }
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
        processName: "打开仓窗",
        tipsTitle: "打开仓窗",
        tips: [
          { tip: "1.请点击【打开仓窗】按钮打开仓窗" },
          { tip: "2.仓窗已开启到位后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控打开仓窗" },
          { tip: "2.仓窗已开启到位后，请点击【下一动作】进行下一步测试" },
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
        operateButtons: [{ label: "打开仓窗", instruction: "turnOn" }]
      },
      {
        idx: 2,
        processName: "关闭仓窗",
        tipsTitle: "关闭仓窗",
        tips: [
          { tip: "1.请点击【关闭仓窗】按钮关闭仓窗" },
          { tip: "2.仓窗已关闭到位后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控关闭仓窗" },
          { tip: "2.仓窗已关闭到位后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "opened,closeing,middle,close,turnOff",
        processId: "2",
        isEnd: "true",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "获取结果", instruction: "getResult" }
        ],
        operateButtons: [{ label: "关闭仓窗", instruction: "turnOff" }]
      }
    ]
  }
];
export default testJson;
