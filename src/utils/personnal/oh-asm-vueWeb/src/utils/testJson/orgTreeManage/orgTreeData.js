let orgTreeData = [
  {
    id: "0",
    text: "组织机构树",
    parentId: null,
    checked: false,
    state: "open",
    level: "1",
    children: [
      {
        id: "1000",
        parentId: "0",
        state: "open",
        text: "浙江省考核办",
        level: "2",
        children: [
          {
            id: "10001",
            text: "浙江省农业农村厅",
            orgCode: "nct",
            orgType: "",
            status: "启用",
            parentId: "1000",
            state: "closed"
          },
          {
            id: "10002",
            text: "浙江省粮食和物资储备局",
            orgCode: "cbj",
            orgType: "",
            status: "启用",
            parentId: "1000",
            state: "closed"
          },
          {
            id: "10003",
            text: "浙江省生态环境厅",
            orgCode: "stt",
            orgType: "",
            status: "启用",
            parentId: "1000",
            state: "closed"
          },
          {
            id: "10004",
            parentId: "0",
            state: "open",
            text: "市考核办",
            level: "2",
            children: [
              {
                id: "100041",
                text: "杭州市考核办",
                parentId: "10004",
                state: "closed",
                orgCode: "sk",
                orgType: "考核办",
                status: "启用",
                children: [
                  {
                    id: "1000411",
                    text: "杭州市农业农村局",
                    parentId: "100041",
                    state: "closed",
                    orgCode: "ncj",
                    orgType: "",
                    status: "启用"
                  },
                  {
                    id: "1000412",
                    text: "杭州市商务局",
                    parentId: "100041",
                    state: "closed",
                    orgCode: "swj",
                    orgType: "",
                    status: "启用"
                  },
                  {
                    id: "1000413",
                    text: "杭州市市场监督管理局",
                    parentId: "100041",
                    state: "closed",
                    orgCode: "jdj",
                    orgType: "",
                    status: "启用"
                  }
                ]
              }
            ]
          },
          {
            id: "10005",
            parentId: "0",
            state: "open",
            text: "抽查组",
            level: "2",
            children: [
              {
                id: "100051",
                text: "抽查组1",
                parentId: "10005",
                state: "closed",
                orgCode: "hzcc",
                orgType: "抽查组",
                status: "启用"
              },
              {
                id: "100052",
                text: "抽查组2",
                parentId: "10005",
                state: "closed",
                orgCode: "hzcc",
                orgType: "抽查组",
                status: "启用"
              },
              {
                id: "100053",
                text: "抽查组3",
                parentId: "10005",
                state: "closed",
                orgCode: "jhcc",
                orgType: "抽查组",
                status: "启用"
              },
              {
                id: "100054",
                text: "抽查组4",
                parentId: "10005",
                state: "closed",
                orgCode: "lscc",
                orgType: "抽查组",
                status: "启用"
              },
              {
                id: "100055",
                text: "抽查组5",
                parentId: "10005",
                state: "closed",
                orgCode: "nbcc",
                orgType: "抽查组",
                status: "启用"
              },
              {
                id: "100056",
                text: "抽查组6",
                parentId: "10005",
                state: "closed",
                orgCode: "qzcc",
                orgType: "抽查组",
                status: "启用"
              }
            ]
          }
        ]
      }
    ]
  }
];
export default orgTreeData;
