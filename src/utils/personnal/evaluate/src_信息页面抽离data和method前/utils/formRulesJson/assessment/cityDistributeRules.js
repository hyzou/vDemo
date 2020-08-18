export default {
  officeLeadDepartmentId: [
    { required: true, message: "责任处室不能为空", trigger: "blur" }
  ],
  officeCoordinationDepartmentId: [
    { required: true, message: "配合处室不能为空", trigger: "blur" }
  ]
};
