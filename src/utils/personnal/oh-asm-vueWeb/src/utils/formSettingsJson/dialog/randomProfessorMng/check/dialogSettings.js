const checkRandomItemDialogBtns = [];
const checkRandomItemDialogItems = [
  {
    type: "inputHidden",
    label: "id",
    name: "chkDefItemId",
    span: 24,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "姓名",
    name: "peopName",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "性别",
    name: "peopSex",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "身份证号码",
    name: "peopIdcard",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "手机号",
    name: "peopMphone",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    // label: "是否专业检查人员",
    label: "是否双随机专家",
    name: "isCheckMan",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "双随机专家级别",
    name: "checkerLevel",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "是否为持证人员",
    name: "iscardkeeper",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "是否行政执法人员",
    name: "isAdmMan",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "政治面貌",
    name: "peopPolity",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "民族",
    name: "peopNationality",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "婚姻状况",
    name: "peopMarital",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "date",
    label: "出生日期",
    name: "peopBirthday",
    span: 12,
    disabled: true,
    // valueFormat: "yyyy-MM-dd",
    // format: "yyyy-MM-dd",
    width: "150px",
    dateType: "date"
  },
  {
    type: "textarea",
    label: "现居住地址",
    name: "peopAddr",
    span: 24,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "单位名称",
    name: "entName",
    span: 24,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "办公电话",
    name: "peopPhone",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "行政职务",
    name: "peopDutyname",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "技术职称",
    name: "peopJobrank",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "用工性质",
    name: "naturePersonnel",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  // {
  //   type: "select",
  //   label: "是否双随机专家",
  //   name: "isCheckMan",
  //   data: [],
  //   span: 12,
  // disabled:true,
  //   width: "150px"
  // },
  {
    type: "select",
    label: "专业",
    multiple: true,
    name: "peopMajor",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "date",
    label: "参加工作时间",
    name: "peopJoinworkdate",
    span: 12,
    disabled: true,
    // valueFormat: "yyyy-MM-dd",
    // format: "yyyy-MM-dd",
    width: "150px",
    dateType: "date"
  },
  {
    type: "select",
    label: "学历",
    name: "peopEducation",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "date",
    label: "毕业时间",
    name: "graduateDate",
    span: 12,
    disabled: true,
    // valueFormat: "yyyy-MM-dd",
    // format: "yyyy-MM-dd",
    width: "150px",
    dateType: "date"
  },
  {
    type: "input",
    label: "毕业院校",
    name: "graduateSchool",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "毕业学校专业",
    name: "schoolMajor",
    span: 12,
    disabled: true,
    width: "150px"
  }
];
export { checkRandomItemDialogBtns, checkRandomItemDialogItems };
