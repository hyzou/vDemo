const opinionFormBtns = [
  {
    flag: "submit",
    label: "提交",
    styleType: "primary",
    postUrl: "_data/shemeAssess/comment/addComment"
  },
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/comment/addComment"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const opinionFormItems = [
  {
    type: "inputHidden",
    label: "方案流程ID",
    name: "asmShemeAssessId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "意见ID",
    name: "asmShemeAssessCommentId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "意见状态",
    name: "status",
    span: 12,
    width: "150px"
  },
  {
    title: "配合处室意见",
    type: "block",
    span: 24,
    name: "officeOpinion",
    children: [
      {
        type: "inputTable",
        label: "处室意见",
        name: "officeOpinionList",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "cooperateOrgId__dsp",
            title: "相关处室",
            disabled: true,
            inputType: "input"
          },
          {
            key: "comment",
            title: "配合部门意见",
            disabled: true,
            inputType: "input"
          },
          {
            key: "fileName",
            title: "配合材料",
            disabled: true,
            inputType: "input"
          },
          {
            key: "reportBy",
            title: "意见填报人",
            disabled: true,
            inputType: "input"
          },
          {
            key: "auditBy",
            title: "意见审核人",
            disabled: true,
            inputType: "input"
          }
        ],
        tableItems: {
          cooperateOrgId__dsp: "",
          comment: "",
          files: "",
          reportBy: "",
          auditBy: ""
        }
      }
    ]
  },
  {
    title: "意见填写",
    type: "block",
    span: 24,
    name: "opinion",
    children: [
      {
        type: "textarea",
        label: "配合意见",
        name: "comment",
        span: 24,
        width: "150px",
        rows: 3
      },
      {
        type: "upload",
        label: "配合材料",
        name: "material",
        span: 24,
        width: "150px",
        choseBtn: "上传文件"
      },
      {
        type: "fileshowList",
        label: "配合材料列表",
        name: "files",
        span: 24,
        width: "150px",
        fileSettings: {
          hidedelete: true,
          hideFileSize: true,
          hideFileTime: true
        }
      },
      {
        type: "select",
        label: "配合单位",
        name: "cooperateOrgId",
        span: 12,
        width: "150px",
        disabled: true,
        data: []
      },
      {
        type: "input",
        label: "意见填报人",
        name: "reportBy",
        span: 12,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "auditBy",
        span: 12,
        width: "150px"
      }
    ]
  }
];
export { opinionFormBtns, opinionFormItems };
