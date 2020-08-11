export default {
  year: [{ required: true, message: "请选择年份", trigger: "blur" }],
  enable: [{ required: true, message: "请选择是否开启", trigger: "blur" }],
  leadStartTime: [
    { required: true, message: "牵头部门开启时间", trigger: "blur" }
  ],
  leadEndTime: [
    { required: true, message: "牵头部门截至时间", trigger: "blur" }
  ],
  coordinationStartTime: [
    { required: true, message: "配合部门开启时间", trigger: "blur" }
  ],
  coordinationEndTime: [
    { required: true, message: "配合部门截至时间", trigger: "blur" }
  ]
};
