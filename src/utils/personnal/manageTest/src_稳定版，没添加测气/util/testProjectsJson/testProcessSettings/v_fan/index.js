const testJson = [
  {
    name: "双向风机测试流程",
    code: "v_fan_1",
    description: "正转-关闭-反转-关闭",
    id: "1",
    process: [
      {
        idx: 0,
        processName: "测试前确认",
        tipsTitle: "测试前确认",
        tips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认仓窗处于打开状态，双向风机处于关闭状态" },
          { tip: "3.请先用柜控操作关闭双向风机，切换至程控模式" },
          { tip: "4.点击【开始测试】启动测试" }
        ],
        tankTips: [
          { tip: "1.请确认当前设备处于对应的工艺当中" },
          { tip: "2.请确认仓窗处于打开状态，双向风机处于关闭状态" },
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
        processName: "风机正转",
        tipsTitle: "风机正转",
        tips: [
          { tip: "1.请确认仓窗处于打开状态" },
          { tip: "2.请点击【风机正转】按钮开启风机" },
          { tip: "3.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "4.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请确认仓窗处于打开状态" },
          { tip: "2.请使用柜控操作风机正向转动" },
          { tip: "3.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "4.点击【终止测试】退出测试" }
        ],
        testItems: "stop,foreward,turnForeward",
        processId: "1",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "风机正转", instruction: "turnForeward" }]
      },
      {
        idx: 2,
        processName: "关闭风机正转",
        tipsTitle: "关闭风机正转",
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
        testItems: "foreward,stop,turnOff",
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
        processName: "风机反转",
        tipsTitle: "风机反转",
        tips: [
          { tip: "1.请确认仓窗处于打开状态" },
          { tip: "2.请确认双向风机处于关闭状态" },
          { tip: "3.请点击【风机反转】按钮开启风机" },
          { tip: "4.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "5.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请确认仓窗处于打开状态" },
          { tip: "2.请确认双向风机处于关闭状态" },
          { tip: "3.请使用柜控操作风机反向转动" },
          { tip: "4.风机正常启动后，请点击【下一动作】进行下一步测试" },
          { tip: "5.点击【终止测试】退出测试" }
        ],
        testItems: "stop,reversal,turnReversal",
        processId: "3",
        isEnd: "false",
        stepButtons: [
          { label: "终止测试", instruction: "stopTest" },
          { label: "下一动作", instruction: "nextStep" }
        ],
        operateButtons: [{ label: "风机反转", instruction: "turnReversal" }]
      },
      {
        idx: 4,
        processName: "关闭风机反转",
        tipsTitle: "关闭风机反转",
        tips: [
          { tip: "1.请点击【关闭风机】按钮关闭风机" },
          { tip: "2.风机正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        tankTips: [
          { tip: "1.请使用柜控操作关闭风机" },
          { tip: "2.风机正常关闭后，请点击【获取结果】查看结果分析" },
          { tip: "3.点击【终止测试】退出测试" }
        ],
        testItems: "reversal,stop,turnOff",
        processId: "4",
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
