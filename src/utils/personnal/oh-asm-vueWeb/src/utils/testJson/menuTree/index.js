const menuTree = [
  {
    id: "0",
    text: "所有菜单",
    parentId: null,
    checked: false,
    state: "open",
    code: "0.",
    type: "root",
    refValue: "",
    menuLevel: 1,
    children: [
      {
        id: "100",
        text: "基础数据",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "100.",
        type: "check_content",
        refValue: "考核内容",
        menuLevel: 2,
        children: [
          {
            id: "1001",
            text: "菜单设置",
            parentId: "100",
            checked: false,
            state: "open",
            code: "100.1001.",
            type: "check_main_item",
            menuLevel: 3,
            refValue: "重点考核事项"
          }
        ]
      },
      {
        id: "200",
        text: "信息管理",
        parentId: "0",
        checked: false,
        state: "closed",
        code: "200.",
        type: "check_content",
        refValue: "考核内容",
        menuLevel: 2,
        children: [
          {
            id: "2001",
            text: "考核通报",
            parentId: "200",
            checked: false,
            state: "open",
            code: "200.2001.",
            type: "check_main_item",
            menuLevel: 3,
            refValue: "重点考核事项"
          },
          {
            id: "2002",
            text: "工作进度",
            parentId: "200",
            checked: false,
            state: "open",
            code: "200.2002.",
            type: "check_main_item",
            menuLevel: 3,
            refValue: "重点考核事项"
          }
        ]
      }
    ]
  }
];
export default menuTree;
