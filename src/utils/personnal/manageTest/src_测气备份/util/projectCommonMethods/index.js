import axios from "../../axios";
import requestInterface from "../../axios/request";

export default {
  install: _Vue => {
    /* 获取接口数据 */
    _Vue.prototype.$vueCopy = data => {
      return JSON.parse(JSON.stringify(data));
    };
    /* 获取接口数据get方法 */
    _Vue.prototype.$getData = (urlstr, params, isFormdata) => {
      let formflag = isFormdata ? isFormdata : false;
      return new Promise(resolve => {
        axios(requestInterface["getMethod"](urlstr, formflag), params).then(
          xhr => {
            resolve(xhr);
          }
        );
      });
    };
    /* 获取接口数据post方法 */
    _Vue.prototype.$postData = (urlstr, params, isFormdata, hasOwnUrl) => {
      let formflag = isFormdata ? isFormdata : false;
      return new Promise((resolve, reject) => {
        axios(
          requestInterface["postMethod"](urlstr, formflag, hasOwnUrl),
          params
        )
          .then(xhr => {
            resolve(xhr);
          })
          .catch(err => {
            reject(err);
          });
      });
    };
    /* 获取接口数据所有方法 */
    _Vue.prototype.$methodData = (type, urlstr, params, isFormdata) => {
      let formflag = isFormdata ? isFormdata : false,
        method = type ? type : "get";
      return new Promise(resolve => {
        axios(requestInterface["kindMethod"](method, urlstr, formflag), params)
          .then(xhr => {
            resolve(xhr);
          })
          .catch(() => {});
      });
    };
  }
};
