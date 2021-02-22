let targetTree = [
  {
    id: "0",
    text: "202008",
    parentId: null,
    checked: false,
    state: "open",
    code: "0.",
    type: "root",
    refValue: "",
    children: [
      {
        id: "100",
        text: "一、特殊时期保证粮食可持续生产能力",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "100.",
        type: "check_content",
        refValue: "考核内容",
        children: [
          {
            id: "1001",
            text: "（一）保护特殊时期耕地保有量",
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
                    text: "（1）特殊时期耕地面积",
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
                          "①特殊时期耕地面积大于或等于常规时期规划下达的耕地保有量的得4分。",
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
      }
    ]
  }
];
export default targetTree;
