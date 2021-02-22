// 分配指标
const assignKpiItem = [
  {
    type: "input",
    label: "期号",
    name: "issueNo",
    span: 12,
    width: "150px",
    disabled: true
  },
  {
    type: "input",
    label: "市县",
    name: "orgname",
    span: 12,
    width: "150px",
    disabled: true
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "elTree",
    label: "指标类目",
    name: "kpiIndextree",
    span: 24,
    width: "150px",
    treeSettings: {
      treeData: [],
      expandAll: false,
      nodeKey: "id",
      nodeExpand: false,
      defaultProps: {
        children: "children",
        label: "text"
      }
    }
  },
  {
    type: "input",
    label: "名称",
    name: "kpiName",
    span: 24,
    width: "150px",
    disabled: true
  },
  {
    type: "textarea",
    label: "评分标准",
    name: "kpiCriteria",
    span: 24,
    width: "150px",
    rows: 4
  },
  {
    type: "select",
    label: "牵头部门",
    name: "manageOrg",
    span: 12,
    width: "150px",
    data: [],
    filterable: true
  },
  {
    type: "select",
    label: "配合部门",
    name: "cooprateOrgs",
    span: 12,
    width: "150px",
    data: [],
    multiple: true,
    filterable: true
  }
];
const assignKpiButton = [
  {
    flag: "assignKpiSave",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/updateKpiAssign"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "退出",
    styleType: "",
    postUrl: ""
  }
];
export {
  assignKpiItem,
  assignKpiButton
};
