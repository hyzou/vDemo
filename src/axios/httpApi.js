const apiInterface = {};

/**
 * params:{}
 * params.url:接口地址
 * params.method:接口请求方式
 * params.isMuti：如果是表单提交需传值为true
 *  */

/* ********接口请求，get方法demo******** */
apiInterface.getMethodDemo = function(muti) {
  var p = {
    url: "_data/web/webPortalNews/saveNews",
    method: "get",
    isMuti: muti
  };
  return p;
};
/* ********接口请求，post方法demo******** */
apiInterface.postMethodDemo = function(muti) {
  var p = {
    url: "_data/web/webPortalNews/flowNews",
    method: "post",
    isMuti: muti
  };
  return p;
};

//const Apisetting = {...apiInterface };

export default apiInterface;
