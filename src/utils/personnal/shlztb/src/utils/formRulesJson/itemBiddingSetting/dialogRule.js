let validateAge = (rule, value, callback) => {
  value.forEach(element => {
    if (!element.detailName) {
      callback(new Error("请填写属性名称"));
    }
    if (!element.detailCode) {
      callback(new Error("请填写属性编码"));
    }
  });
  callback();
};
let rule = {
  sysCode: [{ required: true, message: "请填写编码", trigger: "blur" }],
  name: [{ required: true, message: "请选择名称", trigger: "blur" }],
  sortSeq: [{ required: true, message: "请选择排序", trigger: "blur" }],
  detailListStr: [{ validator: validateAge }, { required: true }]
  // detailListStr: {
  //   type: "array",
  //   required: true,
  //   fields: {
  //     0: {
  //       type: "object",
  //       required: true,
  //       fields: {
  //         detailName: {
  //           required: true,
  //           message: "请至少填写一条完整标的属性",
  //           trigger: "blur"
  //         },
  //         detailCode: {
  //           required: true,
  //           message: "请至少填写一条完整标的属性",
  //           trigger: "blur"
  //         }
  //       }
  //     }
  //   },
  //   message: "请至少填写一条标的属性设置"
  // }
};

export default {
  rule
};
