let targetTree = [
  {
    id: "0",
    text: "2020",
    parentId: null,
    checked: false,
    state: "open",
    code: "0.",
    type: "root",
    refValue: "",
    children: [
      {
        id: "100",
        text:
          "一、确保耕地面积基本稳定、质量不下降，粮食生产稳定发展,粮食可持续生产能力不断增强",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "100.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "1001",
            text: "（一）保护耕地",
            parentId: "100",
            checked: false,
            state: "open",
            code: "100.1001.",
            type: "check_main_item",
            refValue: "重点考核事项",
            children: [
              {
                id: "10001",
                text: "1.耕地保有量；",
                parentId: "1001",
                checked: false,
                state: "open",
                code: "100.1001.10001.",
                type: "check_Target",
                refValue: "考核指标",
                children: [
                  {
                    id: "100001",
                    text: "（1）2020年末耕地面积",
                    parentId: "10001",
                    checked: false,
                    state: "open",
                    code: "100.1001.10001.100001.",
                    type: "check_Task",
                    refValue: "年度考核任务",
                    children: [
                      {
                        id: "1000001",
                        text:
                          "①2020年末耕地面积大于或等于规划下达的耕地保有量的得4分。",
                        parentId: "100001",
                        checked: false,
                        state: "open",
                        code: "100.1001.10001.100001.1000001.",
                        type: "check_item_standard",
                        refValue: "评分标准"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "200",
        text:
          "二、保护种粮积极性，财政对扶持粮食生产和流通的投入合理增长，提高种粮比较收益，落实粮食收购政策，不出现卖粮难问题",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "200.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "2001",
            text: "（二）落实和完善粮食扶持政策",
            parentId: "200",
            checked: false,
            state: "open",
            code: "200.2001.",
            type: "check_main_item",
            refValue: "重点考核事项",
            children: [
              {
                id: "20001",
                text: "2.落实粮食补贴政策",
                parentId: "2001",
                checked: false,
                state: "open",
                code: "200.2001.20001.",
                type: "check_Target",
                refValue: "考核指标",
                children: [
                  {
                    id: "200001",
                    text: "（2）按国家规定发放耕地地力保护补贴",
                    parentId: "20001",
                    checked: false,
                    state: "open",
                    code: "200.2001.20001.200001.",
                    type: "check_Task",
                    refValue: "年度考核任务",
                    children: [
                      {
                        id: "2000001",
                        text:
                          "②按国家规定发放耕地地力保护补贴，且当年预算执行达到95%以上的得2分，否则不得分。出现挤占、截留、挪用和套取补贴等违规行为的，此项不得分，同时倒扣2分。",
                        parentId: "200001",
                        checked: false,
                        state: "open",
                        code: "200.2001.20001.200001.2000001.",
                        type: "check_item_standard",
                        refValue: "评分标准"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "300",
        text:
          "三、落实地方粮食储备，增强粮食仓储能力，加强监督管理，确保地方储备粮数量真实、质量安全",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "300.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "3001",
            text: "（三）加强粮食仓储物流设施建设和管理",
            parentId: "300",
            checked: false,
            state: "open",
            code: "300.3001.",
            type: "check_main_item",
            refValue: "重点考核事项",
            children: [
              {
                id: "30001",
                text: "3.仓储设施维修改造升级",
                parentId: "3001",
                checked: false,
                state: "open",
                code: "300.3001.30001.",
                type: "check_Target",
                refValue: "考核指标",
                children: [
                  {
                    id: "300001",
                    text: "（3）粮食产后服务中心建成数量",
                    parentId: "30001",
                    checked: false,
                    state: "open",
                    code: "300.3001.30001.300001.",
                    type: "check_Task",
                    refValue: "年度考核任务",
                    children: [
                      {
                        id: "3000001",
                        text:
                          "③获得粮食产后服务体系建设中央财政补助的省份：2018-2019年度（2018年下达中央投资）粮食产后服务中心建成数量占年度计划80%（含）以上的，得0.3分；60%（含）-80%的，得0.2分；60%以下的，得0.1分。因地制宜，积极研究、推广环保烘干等产后服务技术，按照环保要求建设、改造粮食烘干等设施的，得0.1分；积极协调落实粮食产后服务中心优惠电价等支持政策的，得0.1分；否则不得分。没有获得粮食产后服务体系建设中央财政补助的省份：积极开展粮食产后服务相关工作并取得良好效果的，得0.5分，否则不得分。",
                        parentId: "300001",
                        checked: false,
                        state: "open",
                        code: "300.3001.30001.300001.3000001.",
                        type: "check_item_standard",
                        refValue: "评分标准"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "400",
        text:
          "四、完善粮食调控和监管体系，保障粮食市场供应和价格基本稳定，不出现脱销断档，维护粮食市场秩序。完善粮食应急保障体系，及时处置突发事件，确保粮食应急供应",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "400.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "4001",
            text: "（四)保障粮食市场供应",
            parentId: "400",
            checked: false,
            state: "open",
            code: "400.4001.",
            type: "check_main_item",
            refValue: "重点考核事项",
            children: [
              {
                id: "40001",
                text:
                  "4.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备",
                parentId: "4001",
                checked: false,
                state: "open",
                code: "400.4001.40001.",
                type: "check_Target",
                refValue: "考核指标",
                children: [
                  {
                    id: "400001",
                    text: "（4）出台省级粮食供应应急预案",
                    parentId: "40001",
                    checked: false,
                    state: "open",
                    code: "400.4001.40001.400001.",
                    type: "check_Task",
                    refValue: "年度考核任务",
                    children: [
                      {
                        id: "4000001",
                        text:
                          "④出台省级粮食供应应急预案，且近三年内组织过省级培训和演练的得0.5分；",
                        parentId: "400001",
                        checked: false,
                        state: "open",
                        code: "400.4001.40001.400001.4000001.",
                        type: "check_item_standard",
                        refValue: "评分标准"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "500",
        text:
          "五、加强耕地污染防治，提高粮食质量安全检验监测能力和超标粮食处置能力，禁止不符合食品安全标准的粮食流入口粮市场",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "500.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "5001",
            text: "（五）健全粮食质量安全监管保障体系",
            parentId: "500",
            checked: false,
            state: "open",
            code: "500.5001.",
            type: "check_main_item",
            refValue: "重点考核事项",
            children: [
              {
                id: "50001",
                text:
                  "5.严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制",
                parentId: "5001",
                checked: false,
                state: "open",
                code: "500.5001.50001.",
                type: "check_Target",
                refValue: "考核指标",
                children: [
                  {
                    id: "500001",
                    text: "（5）出台本省份超标粮食处置管理办法",
                    parentId: "50001",
                    checked: false,
                    state: "open",
                    code: "500.5001.50001.500001.",
                    type: "check_Task",
                    refValue: "年度考核任务",
                    children: [
                      {
                        id: "5000001",
                        text:
                          "⑤以省级政府文件或部门联合文件形式出台本省份超标粮食处置管理办法的，得1分；制定本省份粮食收购和出库必检项目的，得0.5分；否则不得分。国家有关部门监测抽检或其他途径发现不符合食品安全标准粮食流入口粮市场或用于食品生产的，粮食流出地扣1分；口粮市场流入地或者食品生产地，处置不到位的扣1分。",
                        parentId: "500001",
                        checked: false,
                        state: "open",
                        code: "500.5001.50001.500001.5000001.",
                        type: "check_item_standard",
                        refValue: "评分标准"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "600",
        text:
          "六、按照保障粮食安全的要求，落实农业、粮食等相关行政主管部门的职责任务，确保责任落实、人员落实",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "600.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "6001",
            text: "（六）加强粮食风险基金管理",
            parentId: "600",
            checked: false,
            state: "open",
            code: "600.6001.",
            type: "check_main_item",
            refValue: "重点考核事项",
            children: [
              {
                id: "60001",
                text: "6.非产区及时足额安排粮食风险基金；粮食风险基金使用管理",
                parentId: "6001",
                checked: false,
                state: "open",
                code: "600.6001.60001.",
                type: "check_Target",
                refValue: "考核指标",
                children: [
                  {
                    id: "600001",
                    text: "（6）产区足额安排资金保障粮食安全相关支出",
                    parentId: "60001",
                    checked: false,
                    state: "open",
                    code: "600.6001.60001.600001.",
                    type: "check_Task",
                    refValue: "年度考核任务",
                    children: [
                      {
                        id: "6000001",
                        text:
                          "⑥产区足额安排资金保障粮食安全相关支出，非产区及时足额安排粮食风险基金地方分担部分的，得1分；粮食风险基金使用符合国家有关规定的，得1分，否则不得分。",
                        parentId: "600001",
                        checked: false,
                        state: "open",
                        code: "600.6001.60001.600001.6000001.",
                        type: "check_item_standard",
                        refValue: "评分标准"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
export default targetTree;
