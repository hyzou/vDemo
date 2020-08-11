const testJson = [
  {
    name: "测试流程一",
    description: "低速-关闭-高速-关闭-双速切换-关闭",
    id: "1",
    process: [
      {
        idx: 0,
        processName: "测试前确认",
        tipsTitle: "测试前确认",
        tips: [
          { tip: "1.请确认双速风机处于关闭状态" },
          { tip: "2.请先用柜控操作关闭双速风机，切换至程控模式" },
          { tip: "3.点击【开始测试】启动测试" }
        ],
        tankTips: [
          { tip: "1.请确认双速风机处于关闭状态" },
          { tip: "2.点击【开始测试】启动测试" }
        ],
        testItems: "",
        processId: "0",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "开始测试", instruction: "nextStep" }
        ],
        operateButtons: []
      },
      {
        idx: 1,
        processName: "低速运行风机",
        tipsTitle: "低速运行风机",
        tips: [
          { tip: "1.请点击【低速运行】按钮开启风机" },
          { tip: "2.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作风机低速运行" },
          { tip: "2.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "close,lowSpeed,turnLowSpeed",
        processId: "1",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "低速运行", instruction: "turnLowSpeed" }]
      },
      {
        idx: 2,
        processName: "关闭低速运行风机",
        tipsTitle: "关闭低速运行风机",
        tips: [
          { tip: "1.请点击【关闭风机】按钮关闭风机" },
          { tip: "2.风机正常关闭后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作关闭风机" },
          { tip: "2.风机正常关闭后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "lowSpeed,close,turnOff",
        processId: "2",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "关闭风机", instruction: "turnOff" }]
      },
      {
        idx: 3,
        processName: "高速运行风机",
        tipsTitle: "高速运行风机",
        tips: [
          { tip: "1.请点击【高速运行】按钮开启风机" },
          { tip: "2.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作风机高速运行" },
          { tip: "2.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "close,highSpeed,turnHighSpeed",
        processId: "3",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "高速运行", instruction: "turnHighSpeed" }]
      },
      {
        idx: 4,
        processName: "关闭高速运行风机",
        tipsTitle: "关闭高速运行风机",
        tips: [
          { tip: "1.请点击【关闭风机】按钮关闭风机" },
          { tip: "3.风机正常关闭后，请点击【下一动作】进行下一步测试" },
          { tip: "4.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作关闭风机" },
          { tip: "2.风机正常关闭后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "highSpeed,close,turnOff",
        processId: "4",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "关闭风机", instruction: "turnOff" }]
      },
      {
        idx: 5,
        processName: "变速运行一阶段",
        tipsTitle: "变速运行一阶段",
        tips: [
          { tip: "1.请点击【低速运行】按钮开启风机" },
          { tip: "2.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作风机低速运行" },
          { tip: "2.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "close,lowSpeed,turnLowSpeed",
        processId: "5",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "低速运行", instruction: "turnLowSpeed" }]
      },
      {
        idx: 6,
        processName: "变速运行二阶段",
        tipsTitle: "变速运行二阶段",
        tips: [
          { tip: "1.请点击【高速运行】按钮提高风速" },
          { tip: "2.风机正常运行后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作风机高速运行" },
          { tip: "2.风机正常运行后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "lowSpeed,highSpeed,turnHighSpeed",
        processId: "6",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "高速运行", instruction: "turnHighSpeed" }]
      },
      {
        idx: 7,
        processName: "变速运行三阶段",
        tipsTitle: "变速运行三阶段",
        tips: [
          { tip: "1.请点击【低速运行】按钮降低风速" },
          { tip: "2.风机正常运行后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作风机低速运行" },
          { tip: "2.风机正常运行后，请点击【下一动作】进行下一步测试" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "highSpeed,lowSpeed,turnLowSpeed",
        processId: "7",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "低速运行", instruction: "turnLowSpeed" }]
      },
      {
        idx: 8,
        processName: "变速运行四阶段",
        tipsTitle: "变速运行四阶段",
        tips: [
          { tip: "1.请点击【关闭风机】按钮降低风速" },
          { tip: "2.风机正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作关闭风机" },
          { tip: "2.风机正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "lowSpeed,close,turnOff",
        processId: "8",
        isEnd: "true",
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
