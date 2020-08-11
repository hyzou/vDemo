const testJson = [
  {
    name: "单向风机测试流程",
    code: "w_fan_1",
    description: "启动-关闭",
    id: "1",
    process: [
      {
        idx: 0,
        processName: "测试前确认",
        tipsTitle: "测试前确认",
        tips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认仓窗处于打开状态，单向风机处于关闭状态" },
          { tip: "3.请先用柜控操作关闭单向风机，切换至程控模式" },
          { tip: "4.点击【开始测试】启动测试" }
        ],
        tankTips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认仓窗处于打开状态，单向风机处于关闭状态" },
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
        processName: "单向风机启动",
        tipsTitle: "单向风机启动",
        tips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认仓窗处于打开状态" },
          { tip: "3.请点击【开启风机】按钮开启风机" },
          { tip: "4.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "5.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认仓窗处于打开状态" },
          { tip: "3.请使用柜控开启风机" },
          { tip: "4.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "5.点击【终止测试】退出测试" }
        ],
        testItems: "stop,operating,turnOn",
        processId: "1",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "开启风机", instruction: "turnOn" }]
      },
      {
        idx: 2,
        processName: "单向风机关闭",
        tipsTitle: "单向风机关闭",
        tips: [
          { tip: "1.请点击【关闭风机】按钮关闭风机" },
          { tip: "2.风机正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控关闭风机" },
          { tip: "2.风机正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "operating,stop,turnOff",
        processId: "2",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "获取结果", instruction: "getResult" }
        ],
        operateButtons: [{ label: "关闭风机", instruction: "turnOff" }]
      }
    ]
  }
];
export default testJson;
