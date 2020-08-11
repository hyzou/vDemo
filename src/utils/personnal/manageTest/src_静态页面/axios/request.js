/**
 * params:{}
 * params.url:接口地址
 * params.method:接口请求方式
 * params.isMuti：如果是表单提交需传值为true
 *  */
const requestInterface = {
  getMethod: function(url, muti) {
    var p = {
      url: url,
      method: "get",
      isMuti: muti || false
    };
    return p;
  },
  postMethod: function(url, muti, hasOwnUrl) {
    var p = {
      url: url,
      method: "post",
      isMuti: muti || false,
      hasOwnUrl: hasOwnUrl
    };
    return p;
  },
  kindMethod: function(method, url, muti) {
    var p = {
      url: url,
      method: method,
      isMuti: muti || false
    };
    return p;
  }
};

export default requestInterface;
