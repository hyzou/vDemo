let validateAge = (rule, value, callback) => {
  value.forEach(element => {
    if (!element.itemName) {
      callback(new Error("请填写打分项"));
    }
    if (!element.itemStandard) {
      callback(new Error("请填写评分标准"));
    }
    if (!element.itemScore) {
      callback(new Error("请填写分值"));
    }
  });
  callback();
};

let rule = {
  name: [{ required: true, message: "请填写专场名称", trigger: "blur" }],
  clientid: [{ required: true, message: "请选择委托单位", trigger: "change" }],
  type: [{ required: true, message: "请选择专场模式", trigger: "change" }],
  munit: [{ required: true, message: "请选择计量单位", trigger: "change" }],
  flagWatch: [
    { required: true, message: "请选择是否允许观摩", trigger: "change" }
  ],
  registerEndtime: [
    { required: true, message: "请选择报名截止时间", trigger: "change" }
  ],
  contractDuedate: [
    { required: true, message: "请选择合同签订截止时间", trigger: "change" }
  ],
  tradeBegintime: [
    { required: true, message: "请选择交易开始时间", trigger: "change" }
  ],
  tradeEndtime: [
    { required: true, message: "请选择交易结束时间", trigger: "change" }
  ],
  deposit: [
    { required: true, message: "请填写保证金(元/单位)", trigger: "blur" }
  ],
  // calcScore: [
  //   { required: false },
  //   {
  //     type: "number",
  //     min: 0,
  //     max: 100,
  //     message: "请填写0-100之间的数字",
  //     trigger: "blur"
  //   }
  // ],
  calcExpCode: [
    { required: true, message: "请填写价格分表达式", trigger: "blur" }
  ],
  feerate: [{ required: true, message: "请填写手续费费率", trigger: "change" }],
  scoreListStr: [{ validator: validateAge }, { required: true }]
  // scoreListStr: {
  //   type: "array",
  //   required: true,
  //   fields: {
  //     0: {
  //       type: "object",
  //       required: true,
  //       fields: {
  //         itemName: { required: true, message: "请至少填写一条评分规则" },
  //         itemStandard: {
  //           required: true,
  //           message: "请至少填写一条评分规则"
  //         }
  //         // itemScore: { required: true, message: "请填写分值" }
  //       }
  //     }
  //   },
  //   message: "请至少填写一条评分规则"
  // }
};

export default {
  rule
};
