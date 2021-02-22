var assessmentBaseData = {
  total: 100, //如有分页，显示数据总条数
  data: {
    totalScore: "100", //总分
    deductionScore: "0.5", //总失分
    list: [
      {
        taskId: "100", //年度考核目标任务id
        assessmentId: "100001", //id
        standardId: "1", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "1.耕地保有量；基本农田保护", //年度考核目标任务
        scoreStandard:
          "（1）2018年末耕地面积大于或等于规划下达的耕地保有量的，产区得4分，非产区得3分，否则不得分。", //评分标准
        targetDataList: [
          {
            id: "100.1.1",
            parentAssessmentId: "100001",
            name: "耕地保有量",
            planVal: "2818",
            completeVal: "2818",
            unit: "万亩",
            completeElement: [
              {
                id: "100.1.1.1",
                parentAssessmentId: "100001",
                name: "耕地保有量",
                value: "2818",
                unit: "万亩",
                itemElement: [
                  {
                    id: "100.1.1.1.1",
                    parentAssessmentId: "100001",
                    name: "杭州",
                    value: "309.77",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.2",
                    parentAssessmentId: "100001",
                    name: "宁波",
                    value: "323.31",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.3",
                    parentAssessmentId: "100001",
                    name: "温州",
                    value: "330.48",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.4",
                    parentAssessmentId: "100001",
                    name: "湖州",
                    value: "220.64",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.5",
                    parentAssessmentId: "100001",
                    name: "嘉兴",
                    value: "298.19",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.6",
                    parentAssessmentId: "100001",
                    name: "绍兴",
                    value: "288.53",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.7",
                    parentAssessmentId: "100001",
                    name: "金华",
                    value: "313.53",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.8",
                    parentAssessmentId: "100001",
                    name: "衢州",
                    value: "203.79",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.9",
                    parentAssessmentId: "100001",
                    name: "舟山",
                    value: "35.04",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.10",
                    parentAssessmentId: "100001",
                    name: "台州",
                    value: "270.88",
                    unit: "万亩"
                  },
                  {
                    id: "100.1.1.1.11",
                    parentAssessmentId: "100001",
                    name: "丽水",
                    value: "223.84",
                    unit: "万亩"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "3", //分值
        selfScore: "3", //自评分
        provinceLeadDepartment: "浙江省自然资源厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "100", //年度考核目标任务id
        assessmentId: "100002", //id
        standardId: "2", //评分标准id
        isDeduction: "true", //是否减分
        assessmentTarget: "1.耕地保有量；基本农田保护", //年度考核目标任务
        scoreStandard:
          "（2）2018年末永久基本农田中耕地面积大于等于规划下达的永久基本农田保护面积考核指标的，得3分；永久基本农田中耕地面积加上可调整地类面积大于等于规划下达的永久基本农田保护面积考核指标的，得2分；否则不得分。", //评分标准
        targetDataList: [
          {
            id: "100.2.1",
            parentAssessmentId: "100002",
            name: "永久基本农田保护面积",
            planVal: "2398",
            completeVal: "2399.5",
            unit: "万亩",
            completeElement: [
              {
                id: "100.2.1.1",
                parentAssessmentId: "100002",
                name: "耕地面积",
                value: "2304.8",
                unit: "万亩",
                itemElement: [
                  {
                    id: "100.2.1.1.1",
                    parentAssessmentId: "100002",
                    name: "杭州",
                    value: "254.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.2",
                    parentAssessmentId: "100002",
                    name: "宁波",
                    value: "276.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.3",
                    parentAssessmentId: "100002",
                    name: "温州",
                    value: "290.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.4",
                    parentAssessmentId: "100002",
                    name: "湖州",
                    value: "180",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.5",
                    parentAssessmentId: "100002",
                    name: "嘉兴",
                    value: "259.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.6",
                    parentAssessmentId: "100002",
                    name: "绍兴",
                    value: "240",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.7",
                    parentAssessmentId: "100002",
                    name: "金华",
                    value: "271.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.8",
                    parentAssessmentId: "100002",
                    name: "衢州",
                    value: "178.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.9",
                    parentAssessmentId: "100002",
                    name: "舟山",
                    value: "25.5",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.10",
                    parentAssessmentId: "100002",
                    name: "台州",
                    value: "234",
                    unit: "万亩"
                  },
                  {
                    id: "100.2.1.1.11",
                    parentAssessmentId: "100002",
                    name: "丽水",
                    value: "187.5",
                    unit: "万亩"
                  }
                ]
              },
              {
                id: "100.2.1.2",
                parentAssessmentId: "100002",
                name: "可调整地类面积",
                value: "94.7",
                unit: "万亩",
                itemElement: []
              }
            ]
          }
        ], //数据项
        targetScore: "3", //分值
        selfScore: "2.5", //自评分
        provinceLeadDepartment: "浙江省自然资源厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省农业农村厅", //省配合部门
        reason:
          "规划下达我省永久基本农田保护面积为2398万亩。2018年底，我省共划定永久基本农田2399.5万亩，其中耕地面积2304.8万亩，可调整地类面积94.7万亩。永久基本农田中耕地面积为规划下达的永久基本农田保护面积考核指标的96.11%，永久基本农田中耕地面积加上可调整地类面积为规划下达的永久基本农田保护面积考核指标的100.06%，扣0.5分", //减分原因
        measures:
          "我省将按照自然资源部 农业农村部《关于加强和改进永久基本农田保护工作的通知》（自然资规〔2019〕 1号）要求，结合我省开展的全域土地综合整治与生态修复工程等工作，进行核实、整改、补划。" //整改措施
      },
      {
        taskId: "101", //年度考核目标任务id
        assessmentId: "101003", //id
        standardId: "3", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "2.耕地质量保护与提升；耕地质量监测网络", //年度考核目标任务
        scoreStandard:
          "（3）按计划组织实施国家耕地质量保护与提升规划或方案的，产区得1.3分，非产区得0.8分；在此基础上，编制并组织实施省级耕地质量保护与提升规划或方案的，得0.2分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "101", //年度考核目标任务id
        assessmentId: "101004", //id
        standardId: "4", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "2.耕地质量保护与提升；耕地质量监测网络", //年度考核目标任务
        scoreStandard:
          "（4）耕地质量保护与提升技术推广实现全覆盖的省份，得1分。未实现全覆盖的省份，耕地质量保护与提升技术推广面积比上一年有增加的，得0.8分；在此基础上，推广面积增加10%以上的，得0.2分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "101", //年度考核目标任务id
        assessmentId: "101005", //id
        standardId: "5", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "2.耕地质量保护与提升；耕地质量监测网络", //年度考核目标任务
        scoreStandard:
          "（5）建立省级耕地质量监测网络的，产区得1.8分，非产区得1.3分；在此基础上，耕地质量监测网点比上一年有增加的，得0.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "101", //年度考核目标任务id
        assessmentId: "101006", //id
        standardId: "6", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "2.耕地质量保护与提升；耕地质量监测网络", //年度考核目标任务
        scoreStandard:
          "（6）编制发布本行政区域年度耕地质量监测报告的，得0.5分,否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "102", //年度考核目标任务id
        assessmentId: "102007", //id
        standardId: "7", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "3.耕地质量等级情况", //年度考核目标任务
        scoreStandard:
          "（7）耕地质量等级与上一年度相比有提高的，产区得3分，非产区得2分；持平的，产区得2.7分，非产区得1.8分；降低的，每降低0.1等，在产区3分、非产区2分的基础上扣分，产区扣0.9分，非产区扣0.6分，扣完为止。", //评分标准
        targetDataList: [], //数据项
        targetScore: "2", //分值
        selfScore: "2", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "103", //年度考核目标任务id
        assessmentId: "103008", //id
        standardId: "8", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "4.粮食生产科技水平", //年度考核目标任务
        scoreStandard:
          "（8）农业主推技术到位率不低于95%的，产区得2.5分,非产区得1.5分；每减少1个百分点，产区扣0.5分，非产区扣0.3分；低于90%不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "103", //年度考核目标任务id
        assessmentId: "103009", //id
        standardId: "9", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "4.粮食生产科技水平", //年度考核目标任务
        scoreStandard:
          "（9）省级人民政府强化促进农业机械化发展支持政策，深入实施主要农作物生产全程机械化推进行动，目标明确，措施具体，加快补齐机械化高效种植、收获、植保、烘干等短板，有明显成效的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "103", //年度考核目标任务id
        assessmentId: "103010", //id
        standardId: "10", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "4.粮食生产科技水平", //年度考核目标任务
        scoreStandard:
          "（10）小麦、水稻、玉米作物耕种收综合机械化率，对上一年度达到85%以上，2018年维持原有水平或提升的，产区得2分，非产区得1分；对上一年度在85%以下，2018年至少提升1个百分点的，产区得2分，非产区得1分，否则按完成情况酌情减分。各省（区、市）主要粮食作物机械化率考核范围参照《农业部办公厅关于印发2017年度各省（区、市）主要粮食作物耕种收综合机械化率发展指标的函》（农办机函〔2017〕7号）。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "104", //年度考核目标任务id
        assessmentId: "104011", //id
        standardId: "11", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "5.粮食种植面积；粮食总产量", //年度考核目标任务
        scoreStandard:
          "（11）粮食播种面积稳定在前10年或5年（具体年限由各省区市结合粮食生产和农业供给侧结构性改革的实际确定）平均水平以上的，产区得2分，非产区得0.8分；低于平均水平的，每减少1个百分点(小数点四舍五入)，产区扣0.5分，非产区扣0.2分，扣完为止；低于最低水平的不得分（未使用法定统计数据的不得分；符合国家规划要求的政策性调减，比如耕地轮作休耕制度试点省份，以及受自然灾害等不可抗力因素影响的不扣分）。", //评分标准
        targetDataList: [
          {
            id: "104.11.1",
            parentAssessmentId: "104011",
            name: "粮食播种面积",
            planVal: "976",
            completeVal: "976",
            unit: "千公顷",
            completeElement: [
              {
                id: "104.11.1.1",
                parentAssessmentId: "104011",
                name: "粮食播种面积",
                value: "976",
                unit: "千公顷",
                itemElement: []
              }
            ]
          }
        ], //数据项
        targetScore: "0.8", //分值
        selfScore: "0.8", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "国家统计局浙江调查总队", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "104", //年度考核目标任务id
        assessmentId: "104012", //id
        standardId: "12", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "5.粮食种植面积；粮食总产量", //年度考核目标任务
        scoreStandard:
          "（12）粮食产量稳定在前10年或5年（具体年限由各省区市结合粮食生产和农业供给侧结构性改革的实际确定）平均水平以上的，产区得2分，非产区得1.2分；低于平均水平的，每减少1个百分点(小数点四舍五入)，产区扣0.5分，非产区扣0.3分，扣完为止；低于最低水平的不得分（未使用法定统计数据的不得分；符合国家规划要求的政策性调减，比如耕地轮作休耕制度试点省份，以及受自然灾害等不可抗力因素影响的不扣分）。", //评分标准
        targetDataList: [
          {
            id: "104.12.1",
            parentAssessmentId: "104012",
            name: "粮食产量",
            planVal: "599",
            completeVal: "599",
            unit: "万吨",
            completeElement: [
              {
                id: "104.12.1.1",
                parentAssessmentId: "104012",
                name: "粮食产量",
                value: "599",
                unit: "万吨",
                itemElement: []
              }
            ]
          }
        ], //数据项
        targetScore: "1.2", //分值
        selfScore: "1.2", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "国家统计局浙江调查总队", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "104", //年度考核目标任务id
        assessmentId: "104013", //id
        standardId: "13", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "5.粮食种植面积；粮食总产量", //年度考核目标任务
        scoreStandard:
          "（13）根据《国务院关于建立粮食生产功能区和重要农产品生产保护区的指导意见》（国发〔2017〕24号）和《农业部 国土资源部 国家发展改革委关于做好粮食生产功能区和重要农产品生产保护区划定工作的通知》（农计发〔2017〕99号），将本省（区、市）粮食生产功能区和重要农产品生产保护区划定任务逐级分解到县一级，并明确工作组织和责任机制的，得0.2分，否则不得分。", //评分标准
        targetDataList: [
          {
            id: "104.13.1",
            parentAssessmentId: "104013",
            name: "粮食生产功能区提标改造年度任务数",
            planVal: "50",
            completeVal: "50",
            unit: "万亩",
            completeElement: [
              {
                id: "104.13.1.1",
                parentAssessmentId: "104013",
                name: "粮食生产功能区提标改造年度任务数",
                value: "50",
                unit: "万亩",
                itemElement: [
                  {
                    id: "104.13.1.1.1",
                    parentAssessmentId: "104013",
                    name: "杭州",
                    value: "4.5",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.2",
                    parentAssessmentId: "104013",
                    name: "宁波",
                    value: "10",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.3",
                    parentAssessmentId: "104013",
                    name: "温州",
                    value: "3.2",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.4",
                    parentAssessmentId: "104013",
                    name: "湖州",
                    value: "4.2",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.5",
                    parentAssessmentId: "104013",
                    name: "嘉兴",
                    value: "4.8",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.6",
                    parentAssessmentId: "104013",
                    name: "绍兴",
                    value: "3.5",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.7",
                    parentAssessmentId: "104013",
                    name: "金华",
                    value: "5.5",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.8",
                    parentAssessmentId: "104013",
                    name: "衢州",
                    value: "5.7",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.9",
                    parentAssessmentId: "104013",
                    name: "舟山",
                    value: "0.1",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.10",
                    parentAssessmentId: "104013",
                    name: "台州",
                    value: "4.1",
                    unit: "万亩"
                  },
                  {
                    id: "104.13.1.1.11",
                    parentAssessmentId: "104013",
                    name: "丽水",
                    value: "4.4",
                    unit: "万亩"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "0.2", //分值
        selfScore: "0.2", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "国家统计局浙江调查总队", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "104", //年度考核目标任务id
        assessmentId: "104014", //id
        standardId: "14", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "5.粮食种植面积；粮食总产量", //年度考核目标任务
        scoreStandard:
          "（14）全部完成本省（区、市）水稻、小麦生产功能区划定任务的（落到具体地块、划定足额面积、完成上图入库、按要求报送数据），得0.8分，任务完成90%以上、不到100%的，得0.6分，任务完成90%以下的，不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.8", //分值
        selfScore: "0.8", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "国家统计局浙江调查总队", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "105", //年度考核目标任务id
        assessmentId: "105015", //id
        standardId: "15", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "6.产粮大县等粮食核心产区和育制种大县建设", //年度考核目标任务
        scoreStandard:
          "（15）省级人民政府制定支持产粮大县等粮食核心产区建设的政策措施，并纳入省政府重点事项督导考核的，产区得2分，非产区得1分，否则不得分。对没有产粮大县的省份，省级人民政府制定扶持粮食生产的政策措施，产区得2分，非产区得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省自然资源厅,浙江省水利厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "105", //年度考核目标任务id
        assessmentId: "105016", //id
        standardId: "16", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "6.产粮大县等粮食核心产区和育制种大县建设", //年度考核目标任务
        scoreStandard:
          "（16）各省（区、市）承担的高标准农田建设任务集中投向粮食生产功能区的，得0.5分，否则不得分。", //评分标准
        targetDataList: [
          {
            id: "105.16.1",
            parentAssessmentId: "105016",
            name: "高标准农田建设任务数",
            planVal: "193.68",
            completeVal: "193.68",
            unit: "万亩",
            completeElement: [
              {
                id: "105.16.1.1",
                parentAssessmentId: "105016",
                name: "高标准农田建设任务数",
                value: "193.68",
                unit: "万亩",
                itemElement: [
                  {
                    id: "105.16.1.1.1",
                    parentAssessmentId: "105016",
                    name: "杭州",
                    value: "19.4",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.2",
                    parentAssessmentId: "105016",
                    name: "宁波",
                    value: "22.6",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.3",
                    parentAssessmentId: "105016",
                    name: "温州",
                    value: "28.08",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.4",
                    parentAssessmentId: "105016",
                    name: "湖州",
                    value: "11.4",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.5",
                    parentAssessmentId: "105016",
                    name: "嘉兴",
                    value: "19.4",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.6",
                    parentAssessmentId: "105016",
                    name: "绍兴",
                    value: "17.2",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.7",
                    parentAssessmentId: "105016",
                    name: "金华",
                    value: "21.6",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.8",
                    parentAssessmentId: "105016",
                    name: "衢州",
                    value: "12.8",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.9",
                    parentAssessmentId: "105016",
                    name: "舟山",
                    value: "2.6",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.10",
                    parentAssessmentId: "105016",
                    name: "台州",
                    value: "20",
                    unit: "万亩"
                  },
                  {
                    id: "105.16.1.1.11",
                    parentAssessmentId: "105016",
                    name: "丽水",
                    value: "18.6",
                    unit: "万亩"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省自然资源厅,浙江省水利厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "105", //年度考核目标任务id
        assessmentId: "105017", //id
        standardId: "17", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "6.产粮大县等粮食核心产区和育制种大县建设", //年度考核目标任务
        scoreStandard:
          "（17）除中央财政资金外，安排省级财政资金支持粮食生产功能区建设的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省自然资源厅,浙江省水利厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "105", //年度考核目标任务id
        assessmentId: "105018", //id
        standardId: "18", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "6.产粮大县等粮食核心产区和育制种大县建设", //年度考核目标任务
        scoreStandard:
          "（18）除海南省以外其他有育制种大县的省份：省级人民政府制定落实扶持育制种大县、区域性特色良种繁育基地建设的政策措施，并纳入省政府重点事项督导考核的，得1.5分，否则不得分；上级指定的基地种子违法案件全部查处的，得0.5分，查处率每降低10个百分点，得分减少0.1分，扣完为止。除海南省以外没有育制种大县的省份：省级人民政府制定区域性特色良种繁育基地建设等加快现代种业发展的政策措施，并纳入省政府重点事项督导考核的，得2分，否则不得分。除海南省以外在南繁基地有育制种业务的省份：未有效发挥南繁领导小组作用，推进落实本省份规划落实方案不力的，倒扣0.5分；对有南繁新增用地需求的省份，未完成核心区土地流转任务的，倒扣0.5分；未落实核心区新基地和科研生产生活服务设施建设项目资金的，倒扣0.5分；南繁管理服务职责履行不到位的，倒扣0.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "2", //分值
        selfScore: "2", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省自然资源厅,浙江省水利厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "106", //年度考核目标任务id
        assessmentId: "106019", //id
        standardId: "19", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "7.高标准农田建设", //年度考核目标任务
        scoreStandard:
          "（19）根据农业农村部等部门制定的2018年度高标准农田建设考核工作方案确定的评分标准执行。", //评分标准
        targetDataList: [], //数据项
        targetScore: "4", //分值
        selfScore: "4", //自评分
        provinceLeadDepartment: "浙江省自然资源厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省水利厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "107", //年度考核目标任务id
        assessmentId: "107020", //id
        standardId: "20", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "8.1.（任务一）农田水利设施建设；农业节水重大工程建设", //年度考核目标任务
        scoreStandard:
          "（20）动员部署农田水利设施建设，明确部门责任分工的，产区得0.7分，非产区得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省水利厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "107", //年度考核目标任务id
        assessmentId: "107021", //id
        standardId: "21", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "8.1.（任务一）农田水利设施建设；农业节水重大工程建设", //年度考核目标任务
        scoreStandard:
          "（21）落实农田水利设施管护主体和管护机制的，产区得0.6分，非产区得0.4分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.4", //分值
        selfScore: "0.4", //自评分
        provinceLeadDepartment: "浙江省水利厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "107", //年度考核目标任务id
        assessmentId: "107022", //id
        standardId: "22", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "8.1.（任务一）农田水利设施建设；农业节水重大工程建设", //年度考核目标任务
        scoreStandard:
          "（22）建立健全绩效考核和奖惩约束激励机制的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省水利厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "107", //年度考核目标任务id
        assessmentId: "107023", //id
        standardId: "23", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "8.1.（任务一）农田水利设施建设；农业节水重大工程建设", //年度考核目标任务
        scoreStandard:
          "（23）大型灌区续建配套与节水改造项目完成当年中央投资计划90%以上，其他项目完成当年中央投资计划80%的，产区得1分，非产区得0.6分，否则不得分。", //评分标准
        targetDataList: [
          {
            id: "107.23.1",
            parentAssessmentId: "107023",
            name: "标准农田质量提升面积(续建)",
            planVal: "66.906",
            completeVal: "66.906",
            unit: "万亩",
            completeElement: [
              {
                id: "107.23.1.1",
                parentAssessmentId: "107023",
                name: "标准农田质量提升面积(续建)",
                value: "66.906",
                unit: "万亩",
                itemElement: [
                  {
                    id: "107.23.1.1.1",
                    parentAssessmentId: "107023",
                    name: "杭州",
                    value: "7.3",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.2",
                    parentAssessmentId: "107023",
                    name: "宁波",
                    value: "1.2",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.3",
                    parentAssessmentId: "107023",
                    name: "温州",
                    value: "4.25",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.4",
                    parentAssessmentId: "107023",
                    name: "湖州",
                    value: "4",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.5",
                    parentAssessmentId: "107023",
                    name: "嘉兴",
                    value: "4.5",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.6",
                    parentAssessmentId: "107023",
                    name: "绍兴",
                    value: "0.42",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.7",
                    parentAssessmentId: "107023",
                    name: "金华",
                    value: "23.5365",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.8",
                    parentAssessmentId: "107023",
                    name: "衢州",
                    value: "16.1695",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.9",
                    parentAssessmentId: "107023",
                    name: "舟山",
                    value: "0.38",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.10",
                    parentAssessmentId: "107023",
                    name: "台州",
                    value: "4.71",
                    unit: "万亩"
                  },
                  {
                    id: "107.23.1.1.11",
                    parentAssessmentId: "107023",
                    name: "丽水",
                    value: "0.44",
                    unit: "万亩"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "0.6", //分值
        selfScore: "0.6", //自评分
        provinceLeadDepartment: "浙江省水利厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "107", //年度考核目标任务id
        assessmentId: "107024", //id
        standardId: "24", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "8.1.（任务一）农田水利设施建设；农业节水重大工程建设", //年度考核目标任务
        scoreStandard:
          "（24）完成年度高效节水灌溉面积目标任务的，得0.8分，否则不得分。", //评分标准
        targetDataList: [
          {
            id: "107.24.1",
            parentAssessmentId: "107024",
            name: "新增高效节水灌溉面积",
            planVal: "25",
            completeVal: "25",
            unit: "万亩",
            completeElement: [
              {
                id: "107.24.1.1",
                parentAssessmentId: "107024",
                name: "新增高效节水灌溉面积",
                value: "25",
                unit: "万亩",
                itemElement: [
                  {
                    id: "107.24.1.1.1",
                    parentAssessmentId: "107024",
                    name: "杭州",
                    value: "2.51",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.2",
                    parentAssessmentId: "107024",
                    name: "宁波",
                    value: "1.5",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.3",
                    parentAssessmentId: "107024",
                    name: "温州",
                    value: "2.02",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.4",
                    parentAssessmentId: "107024",
                    name: "湖州",
                    value: "3.77",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.5",
                    parentAssessmentId: "107024",
                    name: "嘉兴",
                    value: "5.65",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.6",
                    parentAssessmentId: "107024",
                    name: "绍兴",
                    value: "1.14",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.7",
                    parentAssessmentId: "107024",
                    name: "金华",
                    value: "1",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.8",
                    parentAssessmentId: "107024",
                    name: "衢州",
                    value: "2.55",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.9",
                    parentAssessmentId: "107024",
                    name: "舟山",
                    value: "0.14",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.10",
                    parentAssessmentId: "107024",
                    name: "台州",
                    value: "1.7",
                    unit: "万亩"
                  },
                  {
                    id: "107.24.1.1.11",
                    parentAssessmentId: "107024",
                    name: "丽水",
                    value: "3.02",
                    unit: "万亩"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "0.8", //分值
        selfScore: "0.8", //自评分
        provinceLeadDepartment: "浙江省水利厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "108", //年度考核目标任务id
        assessmentId: "108025", //id
        standardId: "25", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "8.2.（任务二）农田水利设施建设；农业节水重大工程建设", //年度考核目标任务
        scoreStandard:
          "（25）推进农业水价综合改革。根据国家发展改革委、财政部、水利部、农业农村部制定的2018年度农业水价综合改革绩效评价办法有关规定执行，产区1.4分，非产区1.2分。", //评分标准
        targetDataList: [
          {
            id: "108.25.1",
            parentAssessmentId: "108025",
            name: "实施农业水价综合改革面积",
            planVal: "300.31",
            completeVal: "300.31",
            unit: "万亩",
            completeElement: [
              {
                id: "108.25.1.1",
                parentAssessmentId: "108025",
                name: "实施农业水价综合改革面积",
                value: "300.31",
                unit: "万亩",
                itemElement: [
                  {
                    id: "108.25.1.1.1",
                    parentAssessmentId: "108025",
                    name: "杭州",
                    value: "28",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.2",
                    parentAssessmentId: "108025",
                    name: "宁波",
                    value: "25",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.3",
                    parentAssessmentId: "108025",
                    name: "温州",
                    value: "18.46",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.4",
                    parentAssessmentId: "108025",
                    name: "湖州",
                    value: "50.21",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.5",
                    parentAssessmentId: "108025",
                    name: "嘉兴",
                    value: "65.1",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.6",
                    parentAssessmentId: "108025",
                    name: "绍兴",
                    value: "16.54",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.7",
                    parentAssessmentId: "108025",
                    name: "金华",
                    value: "26.78",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.8",
                    parentAssessmentId: "108025",
                    name: "衢州",
                    value: "14.42",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.9",
                    parentAssessmentId: "108025",
                    name: "舟山",
                    value: "3.35",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.10",
                    parentAssessmentId: "108025",
                    name: "台州",
                    value: "32.63",
                    unit: "万亩"
                  },
                  {
                    id: "108.25.1.1.11",
                    parentAssessmentId: "108025",
                    name: "丽水",
                    value: "19.82",
                    unit: "万亩"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "1.2", //分值
        selfScore: "1.2", //自评分
        provinceLeadDepartment: "浙江省水利厅", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省农业农村厅,浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "109", //年度考核目标任务id
        assessmentId: "109026", //id
        standardId: "26", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "9.落实粮食补贴政策", //年度考核目标任务
        scoreStandard:
          "（26）按国家规定及时足额发放粮食相关补贴的，产区得4分，非产区得1分，否则不得分。出现挤占、截留、挪用和套取补贴等违规行为的，此项不得分，同时倒扣产区4分，非产区1分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省财政厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "110", //年度考核目标任务id
        assessmentId: "110027", //id
        standardId: "27", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "10.培育新型粮食生产经营主体及社会化服务体系", //年度考核目标任务
        scoreStandard:
          "（27）加大粮食类新型农业经营主体和服务主体扶持力度，完成农业生产发展项目中农民合作社、家庭农场年度任务的，产区得1分，非产区得0.4分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.4", //分值
        selfScore: "0.4", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "110", //年度考核目标任务id
        assessmentId: "110028", //id
        standardId: "28", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "10.培育新型粮食生产经营主体及社会化服务体系", //年度考核目标任务
        scoreStandard:
          "（28）完成农业生产发展项目中农业生产社会化服务年度任务的，产区得0.5分，非产区得0.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.2", //分值
        selfScore: "0.2", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "110", //年度考核目标任务id
        assessmentId: "110029", //id
        standardId: "29", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "10.培育新型粮食生产经营主体及社会化服务体系", //年度考核目标任务
        scoreStandard:
          "（29）完成农业生产发展项目中新型职业农民培育年度任务的，产区得1.5分，非产区得0.4分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.4", //分值
        selfScore: "0.4", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "111", //年度考核目标任务id
        assessmentId: "111030", //id
        standardId: "30", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "11.执行收购政策；安排收购网点", //年度考核目标任务
        scoreStandard:
          "（30）省级人民政府下发文件或召开会议安排部署粮食收购工作的，产区得2分，非产区得1分；省级人民政府未召开会议或发文部署，省级部门下发文件并召开会议安排部署粮食收购工作的，产区得1分，非产区得0.3分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "111", //年度考核目标任务id
        assessmentId: "111031", //id
        standardId: "31", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "11.执行收购政策；安排收购网点", //年度考核目标任务
        scoreStandard:
          "（31）省级人民政府负责同志对粮食收购工作开展调研或作出批示的，产区得1.5分，非产区得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "111", //年度考核目标任务id
        assessmentId: "111032", //id
        standardId: "32", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "11.执行收购政策；安排收购网点", //年度考核目标任务
        scoreStandard:
          "（32）全面落实国家粮食收购政策，建立健全粮食收购部门协调工作机制，确保“有人收粮”“有钱收粮”“有仓装粮”“有车运粮”，未出现农民“卖粮难”的，产区得1.5分，非产区得0.5分，否则不得分，同时倒扣产区1.5分，非产区0.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "112", //年度考核目标任务id
        assessmentId: "112033", //id
        standardId: "33", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "12.组织落实收购资金", //年度考核目标任务
        scoreStandard:
          "（33）主动协调农发行和辖区内其他金融机构，有效落实政策性粮食收储和轮换等资金，满足地方粮食储备等需要，并严格执行政策性资金管理要求，有效化解风险贷款的，产区得1分，非产区得0.25分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.3", //分值
        selfScore: "0.25", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "中国农业发展银行浙江省分行", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "112", //年度考核目标任务id
        assessmentId: "112034", //id
        standardId: "34", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "12.组织落实收购资金", //年度考核目标任务
        scoreStandard:
          "（34）主动协调农发行及商业银行等辖区内金融机构，同时主产区按市场化方式建立健全粮食收购贷款信用保证基金融资担保机制，鼓励其他地区因地制宜建立健全粮食收购贷款信用保证基金融资担保机制，多渠道筹措市场化收购资金的，产区得1分，非产区得0.25分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.3", //分值
        selfScore: "0.25", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "中国农业发展银行浙江省分行", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "112", //年度考核目标任务id
        assessmentId: "112035", //id
        standardId: "35", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "12.组织落实收购资金", //年度考核目标任务
        scoreStandard:
          "（35）收购资金支付及时，未出现挤占挪用收购资金的，产区得1分，非产区得0.5分，否则不得分；对给售粮农民“打白条”问题不及时解决导致群体性上访的，此项不得分，同时倒扣产区1分，非产区0.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "中国农业发展银行浙江省分行", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "113", //年度考核目标任务id
        assessmentId: "113036", //id
        standardId: "36", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "13.仓储物流设施建设", //年度考核目标任务
        scoreStandard:
          "（36）筹集资金安排建设粮食仓储和物流等基础设施，基本满足本地区粮食收储需要的，产区得3分，非产区得4分，否则不得分。对于有中央预算内投资补助项目的省份，未按期报送投资分解计划，扣0.5分；未按期通过重大项目库报送项目建设进度，扣0.5分；未按期完成项目建设任务，按未完成项目的占比扣分，最多扣2分；存在分解投资计划下达后超过一年以上未开工项目，扣0.5分；发生重大工程质量安全事故或其他重大违法违规等问题的，发现一起扣1分；发现项目申报不及时不严谨、项目申报材料造假、在分解投资计划下达后随意调整建设项目等情况的，发现一起扣0.5分；本项赋分扣完为止。", //评分标准
        targetDataList: [], //数据项
        targetScore: "4", //分值
        selfScore: "4", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "114", //年度考核目标任务id
        assessmentId: "114037", //id
        standardId: "37", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "14.1.（任务一）仓储设施维修改造升级", //年度考核目标任务
        scoreStandard:
          "（37）积极推动粮库智能化升级改造和省级粮食管理平台建设（包括成立领导和实施机构、制定方案措施、开展检查督导考核等工作）的,得1分，否则不得分。未按期完成项目年度建设任务的，按未完成项目的占比扣分，最多扣1分；未按期报送项目月度进展情况的，扣0.2分；未按要求筹集资金到位的，扣0.2分；发生重大工程质量安全事故或其他重大违法违规等问题的，扣1分。本项赋分扣完为止。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "114", //年度考核目标任务id
        assessmentId: "114038", //id
        standardId: "38", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "14.1.（任务一）仓储设施维修改造升级", //年度考核目标任务
        scoreStandard:
          "（38）对近三年有中央财政补助的政策性应急供应粮食仓储设施维修改造项目的省份：实际到位资金达到规划投资85%（含）以上的，得0.5分；达到60%(含)-85%的，得0.3分；60%以下的，不得分。项目完成的，得0.5分，否则不得分。其他省份：自行开展政策性应急供应粮食仓储设施维修改造工作，有实质性内容的，得0.5分；能够满足应急供应需要的，得0.5分；否则不得分。出现违规使用资金、设施设备闲置、资金浪费、工程质量不达标等问题的，此项不得分；问题严重的，倒扣1分。", //评分标准
        targetDataList: [
          {
            id: "114.38.1",
            parentAssessmentId: "114038",
            name: "应急供应网点数",
            planVal: "1984",
            completeVal: "1984",
            unit: "个",
            completeElement: [
              {
                id: "114.38.1.1",
                parentAssessmentId: "114038",
                name: "高标准农田建设任务数",
                value: "1984",
                unit: "个",
                itemElement: [
                  {
                    id: "114.38.1.1.1",
                    parentAssessmentId: "114038",
                    name: "杭州",
                    value: "301",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.2",
                    parentAssessmentId: "114038",
                    name: "宁波",
                    value: "261",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.3",
                    parentAssessmentId: "114038",
                    name: "温州",
                    value: "285",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.4",
                    parentAssessmentId: "114038",
                    name: "湖州",
                    value: "99",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.5",
                    parentAssessmentId: "114038",
                    name: "嘉兴",
                    value: "130",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.6",
                    parentAssessmentId: "114038",
                    name: "绍兴",
                    value: "166",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.7",
                    parentAssessmentId: "114038",
                    name: "金华",
                    value: "182",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.8",
                    parentAssessmentId: "114038",
                    name: "衢州",
                    value: "112",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.9",
                    parentAssessmentId: "114038",
                    name: "舟山",
                    value: "69",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.10",
                    parentAssessmentId: "114038",
                    name: "台州",
                    value: "202",
                    unit: "个"
                  },
                  {
                    id: "114.38.1.1.11",
                    parentAssessmentId: "114038",
                    name: "丽水",
                    value: "177",
                    unit: "个"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "114", //年度考核目标任务id
        assessmentId: "114039", //id
        standardId: "39", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "14.1.（任务一）仓储设施维修改造升级", //年度考核目标任务
        scoreStandard:
          "（39）本年度有国家支持的粮食产后服务体系建设任务的省份：按实施方案计划推进项目建设进度的，得0.5分，否则不得分；发生项目质量安全事故或资金管理违法违规的，不得分。其他省份：推进粮食四散化运输、优质粮食分仓储存、绿色仓储及粮油适度加工等流通各环节节粮减损工作有具体政策措施并取得明显成效的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "115", //年度考核目标任务id
        assessmentId: "115040", //id
        standardId: "40", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "14.2.（任务二）仓储设施维修改造升级", //年度考核目标任务
        scoreStandard:
          "（40）开展爱粮节粮宣传教育等有具体措施的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "116", //年度考核目标任务id
        assessmentId: "116041", //id
        standardId: "41", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "15.落实国有粮食仓储物流设施保护制度", //年度考核目标任务
        scoreStandard:
          "（41）建立粮油仓储物流设施备案管理制度并实施动态管理的，产区得0.6分，非产区得1.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.2", //分值
        selfScore: "1.2", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "116", //年度考核目标任务id
        assessmentId: "116042", //id
        standardId: "42", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "15.落实国有粮食仓储物流设施保护制度", //年度考核目标任务
        scoreStandard:
          "（42）未出现违规拆除、迁移粮油仓储物流设施，以及非法侵占、损坏粮油仓储物流设施，或者擅自改变其用途或其他保护不力等情况的，产区得0.4分，非产区得0.8分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.8", //分值
        selfScore: "0.8", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "117", //年度考核目标任务id
        assessmentId: "117043", //id
        standardId: "43", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "16.落实地方粮食储备；完善轮换管理和库存监管机制", //年度考核目标任务
        scoreStandard:
          "（43）地方储备粮食和食用植物油（粮权属于地方人民政府）规模库存不低于国家有关部门核定下达的规模，实际库存数量不低于国家核定规模的70%，实际库存和规模库存差额部分处于正常轮空期内（正常轮空期原则上不超过4个月，最长不超过6个月，超过正常轮空期的需提供省级人民政府批准同意的文件，并且理由合理），产区得2分，非产区得3分，否则不得分，同时倒扣产区4分，非产区5分。", //评分标准
        targetDataList: [
          {
            id: "117.43.1",
            parentAssessmentId: "117043",
            name: "储备粮规模",
            planVal: "400",
            completeVal: "400",
            unit: "万吨",
            completeElement: [
              {
                id: "117.43.1.1",
                parentAssessmentId: "117043",
                name: "储备粮规模",
                value: "400",
                unit: "万吨",
                itemElement: [
                  {
                    id: "117.43.1.1.1",
                    parentAssessmentId: "117043",
                    name: "杭州",
                    value: "72.66",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.2",
                    parentAssessmentId: "117043",
                    name: "宁波",
                    value: "59.45",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.3",
                    parentAssessmentId: "117043",
                    name: "温州",
                    value: "63.54",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.4",
                    parentAssessmentId: "117043",
                    name: "湖州",
                    value: "19.24",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.5",
                    parentAssessmentId: "117043",
                    name: "嘉兴",
                    value: "26.98",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.6",
                    parentAssessmentId: "117043",
                    name: "绍兴",
                    value: "38.56",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.7",
                    parentAssessmentId: "117043",
                    name: "金华",
                    value: "39.34",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.8",
                    parentAssessmentId: "117043",
                    name: "衢州",
                    value: "15.05",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.9",
                    parentAssessmentId: "117043",
                    name: "舟山",
                    value: "11.97",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.10",
                    parentAssessmentId: "117043",
                    name: "台州",
                    value: "38.83",
                    unit: "万吨"
                  },
                  {
                    id: "117.43.1.1.11",
                    parentAssessmentId: "117043",
                    name: "丽水",
                    value: "14.38",
                    unit: "万吨"
                  }
                ]
              }
            ]
          }
        ],
        targetScore: "3", //分值
        selfScore: "3", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "117", //年度考核目标任务id
        assessmentId: "117044", //id
        standardId: "44", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "16.落实地方粮食储备；完善轮换管理和库存监管机制", //年度考核目标任务
        scoreStandard:
          "（44）省级人民政府负责同志对落实地方粮油储备、加强管理和监管等开展调研或作出批示的，得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "117", //年度考核目标任务id
        assessmentId: "117045", //id
        standardId: "45", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "16.落实地方粮食储备；完善轮换管理和库存监管机制", //年度考核目标任务
        scoreStandard:
          "（45）建立地方储备粮食和食用植物油管理办法，下达轮换计划，轮换计划完成率达到100%的，得1分，否则酌情扣分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "118", //年度考核目标任务id
        assessmentId: "118046", //id
        standardId: "46", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "17.落实储备费用、利息补贴和轮换补贴", //年度考核目标任务
        scoreStandard:
          "（46）制定地方储备粮保管费用、贷款利息和轮换费用补贴管理办法的，产区得1分，非产区得2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "2", //分值
        selfScore: "2", //自评分
        provinceLeadDepartment: "浙江省财政厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "118", //年度考核目标任务id
        assessmentId: "118047", //id
        standardId: "47", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "17.落实储备费用、利息补贴和轮换补贴", //年度考核目标任务
        scoreStandard:
          "（47）按规定标准足额落实地方储备粮保管费用、贷款利息和轮换费用补贴的，产区得1分，非产区得2分，否则不得分，同时倒扣产区1分，非产区3分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "2", //分值
        selfScore: "2", //自评分
        provinceLeadDepartment: "浙江省财政厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119048", //id
        standardId: "48", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（48）出台省级粮食供应应急预案，且近三年内组织过省级培训和演练的，产区得0.5分，非产区得2分，否则不得分。", //评分标准
        targetDataList: [
          {
            id: "119.48.1",
            parentAssessmentId: "119048",
            name: "应急加工能力",
            planVal: "18420",
            completeVal: "18420",
            unit: "吨/日",
            completeElement: [
              {
                id: "119.48.1.1",
                parentAssessmentId: "119048",
                name: "应急加工能力",
                value: "18420",
                unit: "吨/日",
                itemElement: [
                  {
                    id: "119.48.1.1.1",
                    parentAssessmentId: "119048",
                    name: "杭州",
                    value: "3395",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.2",
                    parentAssessmentId: "119048",
                    name: "宁波",
                    value: "3190",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.3",
                    parentAssessmentId: "119048",
                    name: "温州",
                    value: "2300",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.4",
                    parentAssessmentId: "119048",
                    name: "湖州",
                    value: "900",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.5",
                    parentAssessmentId: "119048",
                    name: "嘉兴",
                    value: "1600",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.6",
                    parentAssessmentId: "119048",
                    name: "绍兴",
                    value: "1570",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.7",
                    parentAssessmentId: "119048",
                    name: "金华",
                    value: "1400",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.8",
                    parentAssessmentId: "119048",
                    name: "衢州",
                    value: "1480",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.9",
                    parentAssessmentId: "119048",
                    name: "舟山",
                    value: "385",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.10",
                    parentAssessmentId: "119048",
                    name: "台州",
                    value: "1400",
                    unit: "吨/日"
                  },
                  {
                    id: "119.48.1.1.11",
                    parentAssessmentId: "119048",
                    name: "丽水",
                    value: "800",
                    unit: "吨/日"
                  }
                ]
              }
            ]
          }
        ], //数据项
        targetScore: "2", //分值
        selfScore: "2", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119049", //id
        standardId: "49", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（49）加强粮油市场体系建设，当年有实际投入或政策支持的，产区得0.25分，非产区得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119050", //id
        standardId: "50", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（50）加强粮油应急体系建设，当年有实际投入或政策支持的，产区得0.25分，非产区得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119051", //id
        standardId: "51", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（51）合理组织调度粮源，做好重点时段重点区域粮油市场供应，36个大中城市和其他价格易波动地区的地方成品粮油储备达到当地10-15天市场供应量，辖区内粮油市场未出现异常波动的，产区得1分，非产区得3分，否则不得分，同时倒扣产区1分，非产区3分。", //评分标准
        targetDataList: [
          {
            id: "119.51.1",
            parentAssessmentId: "119051",
            name: "成品粮储备规模",
            planVal: "74340",
            completeVal: "74340",
            unit: "吨",
            completeElement: [
              {
                id: "119.51.1.1",
                parentAssessmentId: "119051",
                name: "成品粮储备规模",
                value: "74340",
                unit: "吨",
                itemElement: [
                  {
                    id: "119.51.1.1.1",
                    parentAssessmentId: "119051",
                    name: "杭州",
                    value: "21190",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.2",
                    parentAssessmentId: "119051",
                    name: "宁波",
                    value: "13040",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.3",
                    parentAssessmentId: "119051",
                    name: "温州",
                    value: "12750",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.4",
                    parentAssessmentId: "119051",
                    name: "湖州",
                    value: "2170",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.5",
                    parentAssessmentId: "119051",
                    name: "嘉兴",
                    value: "3190",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.6",
                    parentAssessmentId: "119051",
                    name: "绍兴",
                    value: "4290",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.7",
                    parentAssessmentId: "119051",
                    name: "金华",
                    value: "5260",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.8",
                    parentAssessmentId: "119051",
                    name: "衢州",
                    value: "1230",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.9",
                    parentAssessmentId: "119051",
                    name: "舟山",
                    value: "2310",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.10",
                    parentAssessmentId: "119051",
                    name: "台州",
                    value: "7650",
                    unit: "吨"
                  },
                  {
                    id: "119.51.1.1.11",
                    parentAssessmentId: "119051",
                    name: "丽水",
                    value: "1260",
                    unit: "吨"
                  }
                ]
              }
            ]
          }
        ],
        targetScore: "3", //分值
        selfScore: "3", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119052", //id
        standardId: "52", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（52）省级人民政府或有关部门出台促进粮食产销合作的指导意见，并且有具体支持政策措施的，产区得0.2分，非产区得1.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.2", //分值
        selfScore: "1.2", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119053", //id
        standardId: "53", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（53）省级人民政府或部门间签订长期稳定的粮食产销合作战略协议，积极组织企业参加产销合作洽谈会，签订并认真履行购销合同的，产区得0.2分，非产区得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119054", //id
        standardId: "54", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（54）创新粮食产销合作形式，通过建设粮油生产和收储基地、仓储物流设施、加工园区、营销网络等，开展深度合作的，产区得0.1分，非产区得0.8分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.8", //分值
        selfScore: "0.8", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119055", //id
        standardId: "55", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（55）军粮供应队伍稳定，及时对接部队按时完成军粮供应任务的，得0.4分；建立军粮供应军民融合发展联席工作机制并开展工作的，得0.2分；推进军粮供应融入国民经济动员体系的，得0.3分；严格执行军粮供应政策的，得0.3分；落实军粮统筹要求，军粮质量符合要求的，得0.3分；否则不得分。出现非正常断供、漏供，不安全军粮供应部队，套取军粮差价补贴款等问题的，此项不得分；问题严重的，倒扣1.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119056", //id
        standardId: "56", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（56）地方储备粮等政策性粮食购销、轮换采取联网公开竞价交易或买卖双方在线协商交易的，产区得0.4分，非产区得1.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119057", //id
        standardId: "57", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（57）地方储备粮轮换通过国家粮食电子交易平台公开竞价交易或买卖双方在线协商交易达到60%及以上的，产区得0.4分，非产区得1.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "119", //年度考核目标任务id
        assessmentId: "119058", //id
        standardId: "58", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备", //年度考核目标任务
        scoreStandard:
          "（58）有效利用国家粮食电子交易平台服务功能，设立平台交收库，服务农民促进粮食交易，产区得0.2分，非产区得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省发展和改革委员会,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120059", //id
        standardId: "59", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（59）按照“双随机一公开”要求，采取突击检查、暗查暗访等有效方式，开展粮食收购市场专项检查，及时查处通报损害农民利益和违反国家粮食收购政策案件的，产区得1分，非产区得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120060", //id
        standardId: "60", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（60）辖区内出现违反质价政策、掺杂使假、以次充好、欺行霸市、拖欠售粮款、收“转圈粮”“人情粮”等违法违规行为，未及时有效处置的，倒扣2分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0", //分值
        selfScore: "0", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120061", //id
        standardId: "61", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（61）按照“双随机一公开”要求，采取突击检查、暗查暗访等方式，开展政策性粮食销售出库专项检查的，产区得0.5分，非产区得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120062", //id
        standardId: "62", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（62）畅通粮食销售出库问题反映渠道，敦促承储库履行出库义务，并及时协调处理出库纠纷的，产区得0.5分，非产区得1.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120063", //id
        standardId: "63", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（63）对出库中的违法违规行为查处不力，或协调处理出库纠纷不力，导致政策性粮食“出库难”问题突出，影响政策性粮食库存消化工作的，倒扣3分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0", //分值
        selfScore: "0", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120064", //id
        standardId: "64", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（64）开展全国政策性粮食库存数量和质量大清查试点的省份：按照国家试点方案，保质保量按时完成相关工作任务的，得1分，否则不得分；其他省份：结合本地实际，创新库存检查方法，采取多种形式对辖区内粮食库存进行监管的，得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120065", //id
        standardId: "65", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（65）针对粮食库存检查发现的安全隐患问题，建立问题台账，落实各方责任，严肃追责问责，确保及时整改到位的，产区得1分，非产区得3分，否则不得分，同时倒扣产区1分，非产区3分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "3", //分值
        selfScore: "3", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "120", //年度考核目标任务id
        assessmentId: "120066", //id
        standardId: "66", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "19.维护粮食市场秩序，确保粮食市场基本稳定", //年度考核目标任务
        scoreStandard:
          "（66）辖区内粮食企业出现严重违法违规行为、重特大粮油储存事故、重特大食品安全和安全生产事故等，造成恶劣社会影响的，倒扣3分，未及时有效处置的，倒扣3分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0", //分值
        selfScore: "0", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "121", //年度考核目标任务id
        assessmentId: "121067", //id
        standardId: "67", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "20.落实粮食流通统计制度；加强粮食市场监测，及时发布粮食市场信息", //年度考核目标任务
        scoreStandard:
          "（67）根据《粮食流通统计工作考核评分标准》执行，产区1.8分，非产区3.8分。粮食流通统计工作或统计分析报告得到省委省政府领导批示肯定的，得0.2分，否则不得分。出现统计造假、弄虚作假问题并导致恶劣影响的，此项不得分，同时倒扣产区1分，非产区2分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "4", //分值
        selfScore: "4", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省统计局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122068", //id
        standardId: "68", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（68）培育董事会制度健全有效、法人治理结构完善、企业资产质量和信誉度高、综合实力强、经营有活力、辐射带动作用大的跨区域（包括跨市、县）骨干国有粮食企业有成效的，得0.4分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.4", //分值
        selfScore: "0.4", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122069", //id
        standardId: "69", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（69）发展混合所有制粮食经济有成效的，得0.1分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.1", //分值
        selfScore: "0.1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122070", //id
        standardId: "70", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（70）在促进粮食科技创新、成果推广和创新体系建设中开展相关工作的，得0.5分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122071", //id
        standardId: "71", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（71）在培育壮大龙头企业，营造产业良好发展环境等方面，出台具体政策措施及提供资金支持的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122072", //id
        standardId: "72", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（72）在加强品牌建设，促进产业集聚发展等方面，出台具体政策措施及提供资金支持的，得0.3分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.3", //分值
        selfScore: "0.3", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122073", //id
        standardId: "73", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（73）在发展特色产业，创新产业发展模式等方面，开展积极探索并取得明显成效的，得0.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.2", //分值
        selfScore: "0.2", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "122", //年度考核目标任务id
        assessmentId: "122074", //id
        standardId: "74", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业", //年度考核目标任务
        scoreStandard:
          "（74）重点支持省份：推进“中国好粮油”行动计划，目标明确、政策措施具体、组织落实到位、实施效果良好，定期发布优质粮油品质测报测评报告的，得1分；其他省份：积极开展“中国好粮油”行动计划的，得1分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "123", //年度考核目标任务id
        assessmentId: "123075", //id
        standardId: "75", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "22.耕地土壤污染防治", //年度考核目标任务
        scoreStandard:
          "（75）完成农用地土壤污染状况详查数据上报的，得0.9分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.9", //分值
        selfScore: "0.9", //自评分
        provinceLeadDepartment: "浙江省生态环境厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "123", //年度考核目标任务id
        assessmentId: "123076", //id
        standardId: "76", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "22.耕地土壤污染防治", //年度考核目标任务
        scoreStandard:
          "（76）完成农用地土壤污染状况详查报告上报的，得0.1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.1", //分值
        selfScore: "0.1", //自评分
        provinceLeadDepartment: "浙江省生态环境厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "123", //年度考核目标任务id
        assessmentId: "123077", //id
        standardId: "77", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "22.耕地土壤污染防治", //年度考核目标任务
        scoreStandard:
          "（77）根据生态环境部总体工作安排，开展涉镉等重金属重点行业企业排查整治，并按时报送工作进展的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省生态环境厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "123", //年度考核目标任务id
        assessmentId: "123078", //id
        standardId: "78", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "22.耕地土壤污染防治", //年度考核目标任务
        scoreStandard:
          "（78）12月底前确定污染源整治清单并报送生态环境部，对问题突出、群众反映强烈的，及时开展整治工作的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省生态环境厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省自然资源厅,浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "124", //年度考核目标任务id
        assessmentId: "124079", //id
        standardId: "79", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "23.粮食生产禁止区划定", //年度考核目标任务
        scoreStandard:
          "（79）对主要耕地土壤污染状况和农产品进行监测，制定监测方案，并完成样品测试的，得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省生态环境厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "124", //年度考核目标任务id
        assessmentId: "124080", //id
        standardId: "80", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget: "23.粮食生产禁止区划定", //年度考核目标任务
        scoreStandard:
          "（80）纳入耕地土壤环境质量类别划分试点的省份（江苏、河南、湖南）：组织试点县开展耕地土壤环境质量类别划分，制定耕地分类清单并编制粮食生产禁止区划定方案的，得1分；重点省份（河北、辽宁、浙江、江西、湖北、广东、广西、四川、贵州、云南、陕西）：编制水稻或小麦生产禁止区划定方案的，得1分；其他省份：积极开展粮食生产禁止区划定研究，收集整理相关背景资料，在拟定工作区域开展土壤—农产品协同调查的，得1分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省农业农村厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省生态环境厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "125", //年度考核目标任务id
        assessmentId: "125081", //id
        standardId: "81", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.1.（任务一）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（81）采取有效措施，保障全省（区、市）粮食质量安全检验监测机构正常运行的，得1分，否则酌情扣分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "125", //年度考核目标任务id
        assessmentId: "125082", //id
        standardId: "82", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.1.（任务一）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（82）各检验监测机构按要求完成粮食质量安全检验监测任务，履行检验监测职责的，得0.5分，否则酌情扣分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "125", //年度考核目标任务id
        assessmentId: "125083", //id
        standardId: "83", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.1.（任务一）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（83）国家有关部门监测抽检或其他途径发现不符合食品安全标准粮食流入口粮市场或用于食品生产的，粮食流出地扣1分；口粮市场流入地或者食品生产地，处置不到位的扣1分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0", //分值
        selfScore: "0", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省发展和改革委员会,浙江省财政厅,浙江省农业农村厅,浙江省市场监督管理局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "126", //年度考核目标任务id
        assessmentId: "126084", //id
        standardId: "84", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.1.（任务一）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（84）省级人民政府组织海关、粮食、农业等部门建立进口粮食疫情联防联控等制度，且运作良好的，得0.5分，否则不得分；未能及时发现进口粮食入库、出库、运输、加工等环节疫情扩散风险的、辖区内出现粮食疫情但未能及时有效控制的，发现一起扣0.1分；省级人民政府支持鼓励进口粮食口岸现代化建设，省内年进口粮食量超过100万吨的口岸中，配备自动取样系统的口岸达到70%的，加0.1分。该项满分0.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "杭州海关", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省农业农村厅,浙江省粮食和物资储备局,宁波海关,中国储备粮管理总公司浙江分公司", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "126", //年度考核目标任务id
        assessmentId: "126085", //id
        standardId: "85", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.1.（任务一）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（85）督促进口粮食储备、加工企业落实安全风险和疫情防控相关制度，运作良好的，得0.5分，否则不得分。制度落实不到位，发现辖区企业网络上非法销售进口粮食信息泛滥未及时查处的；发现辖区内企业存在非法流向等问题，未及时按规定处罚的，发现一起扣0.1分，0.5分封顶。该项满分0.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "杭州海关", //省牵头部门
        provinceCoordinationDepartment:
          "浙江省农业农村厅,浙江省粮食和物资储备局,宁波海关,中国储备粮管理总公司浙江分公司", //省配合部门
        reason: "无减分。", //减分原因
        measures: "不涉及。" //整改措施
      },
      {
        taskId: "127", //年度考核目标任务id
        assessmentId: "127086", //id
        standardId: "86", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.3.（任务三）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（86）省级人民政府对粮油商标品牌发展有明确规划或作出工作部署的，得0.1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.1", //分值
        selfScore: "0.1", //自评分
        provinceLeadDepartment: "浙江省市场监督管理局", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "127", //年度考核目标任务id
        assessmentId: "127087", //id
        standardId: "87", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.3.（任务三）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（87）省域粮油地理标志商标或区域商标品牌注册量排名全国前列或增幅较大的，得0.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.2", //分值
        selfScore: "0.2", //自评分
        provinceLeadDepartment: "浙江省市场监督管理局", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "127", //年度考核目标任务id
        assessmentId: "127088", //id
        standardId: "88", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "24.3.（任务三）严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制", //年度考核目标任务
        scoreStandard:
          "（88）通过粮油地理标志商标或区域商标品牌运用，保证产品品质，提升产品信誉，维护市场秩序效果明显的，得0.2分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.2", //分值
        selfScore: "0.2", //自评分
        provinceLeadDepartment: "浙江省市场监督管理局", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "128", //年度考核目标任务id
        assessmentId: "128089", //id
        standardId: "89", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "25.粮食质量安全监管机构及质量监测机构建设；粮食质量安全监管执法装备配备及检验监测业务经费保障；库存粮油质量监管", //年度考核目标任务
        scoreStandard:
          "（89）有“优质粮食工程”建设任务的省份：按要求完成国家“优质粮食工程”检验监测体系建设任务的，得3分；完成任务量超过任务总量50%的，得1.5分，否则不得分。无“优质粮食工程”建设任务的省份：支持区域内粮食检验监测能力建设有具体措施并取得实际成效的，视情况得0.5-3分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "3", //分值
        selfScore: "3", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "129", //年度考核目标任务id
        assessmentId: "129090", //id
        standardId: "90", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "26.非产区及时足额安排粮食风险基金；粮食风险基金使用管理", //年度考核目标任务
        scoreStandard:
          "（90）产区将原粮食风险基金地方配套部分继续用于保障粮食安全相关支出，非产区及时足额安排粮食风险基金地方配套的，得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省财政厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "129", //年度考核目标任务id
        assessmentId: "129091", //id
        standardId: "91", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "26.非产区及时足额安排粮食风险基金；粮食风险基金使用管理", //年度考核目标任务
        scoreStandard:
          "（91）粮食风险基金使用符合国家有关规定的，得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省财政厅", //省牵头部门
        provinceCoordinationDepartment: "浙江省粮食和物资储备局", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130092", //id
        standardId: "92", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（92）制定推动粮食行业人才队伍建设政策文件，积极推进《关于“人才兴粮”的实施意见》各项重点任务，注重宣传粮食行业人才工作和优秀人才事迹的，得1分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130093", //id
        standardId: "93", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（93）出台粮食安全保障地方性法规或者省级政府规章的，得0.5分；未出台粮食安全保障地方性法规或者省级政府规章，粮食安全保障地方性法规或者省级政府规章已列入立法计划的，得0.3分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130094", //id
        standardId: "94", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（94）省级人民政府省长（主席、市长）主持研究粮食安全工作的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130095", //id
        standardId: "95", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（95）省级人民政府省长（主席、市长）对粮食安全工作进行专题调研的，得0.5分，否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130096", //id
        standardId: "96", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（96）按照发改粮食〔2018〕561号文件要求制定并报送2018年贯彻落实粮食安全省长责任制工作方案的，得0.5分，否则不得分，同时倒扣1分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130097", //id
        standardId: "97", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（97）落实农业、粮食等相关行政主管部门职责任务，并将行政经费足额列入同级财政预算的，得0.5分，否则不得分，同时倒扣0.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "0.5", //分值
        selfScore: "0.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省农业农村厅,浙江省财政厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130098", //id
        standardId: "98", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（98）落实地市以下（含）农业、粮食监管职责、监管力量、监管经费、执法装备的，得1.5分，否则不得分，同时倒扣2.5分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1.5", //分值
        selfScore: "1.5", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "浙江省农业农村厅", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      },
      {
        taskId: "130", //年度考核目标任务id
        assessmentId: "130098", //id
        standardId: "98", //评分标准id
        isDeduction: "false", //是否减分
        assessmentTarget:
          "27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制", //年度考核目标任务
        scoreStandard:
          "（99）加大12325全国粮食流通监管热线宣传力度。在辖区内所有粮食行政管理部门和从事政策性粮食业务的企业门口显著位置悬挂12325标识的，得0.6分；组织开展现场宣传活动的，得0.4分；否则不得分。", //评分标准
        targetDataList: [], //数据项
        targetScore: "1", //分值
        selfScore: "1", //自评分
        provinceLeadDepartment: "浙江省粮食和物资储备局", //省牵头部门
        provinceCoordinationDepartment: "", //省配合部门
        reason: "", //减分原因
        measures: "" //整改措施
      }
    ]
  }
};
export { assessmentBaseData };
