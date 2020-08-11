const globalFncs = {
  // 时间戳转日期
  dateStampFormat: import("./dateStampFormat"),
  //  格式化文件大小
  renderSize: import("./renderSize"),
  // 获取接口数据下拉转换成可用的的下拉组建数据 label待转化显示的汉字 value待转化的提交的值
  arrayToFormDropdown: import("./arrayToFormDropdown"),
  // 格式化接口参数：数组->数组字符串
  postArrtoString: import("./postArrtoString"),
  // 格式化数字为人民币单位
  parseNumberToCnMoney: import("./parseNumberToCnMoney"),
  //汉字转 Unicode 编码
  cnwordToCharCode: import("./cnwordToCharCode"),
  //socket连接
  socketConnect: import("./socketJs"),
  //touchFnc
  touchFnc: import("./touchJs")
};
export default globalFncs;
