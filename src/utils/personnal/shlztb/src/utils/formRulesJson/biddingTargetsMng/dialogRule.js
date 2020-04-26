let rule = {
  sysParentid: [{ required: true, message: "请选择专场", trigger: "change" }],
  no: [{ required: true, message: "请填写标的号", trigger: "blur" }],
  name: [{ required: true, message: "请填写品名", trigger: "blur" }],
  num: [{ required: true, message: "请填写数量", trigger: "blur" }],
  // deposit: [
  //   { required: true, message: '请填写需保证金数量(元)', trigger: 'blur' }
  // ],
  delay: [{ required: true, message: "请填写延时秒数", trigger: "blur" }],
  delayscreen: [
    { required: true, message: "请填写等待期秒数", trigger: "blur" }
  ],
  highestprice: [
    { required: true, message: "请填写最高限价(元/单位)", trigger: "blur" }
  ],
  lowestprice: [
    { required: true, message: "请填写最低限价(元/单位)", trigger: "blur" }
  ],
  rangeprice: [{ required: true, message: "请填写价差", trigger: "blur" }]
};

export default {
  rule
};
