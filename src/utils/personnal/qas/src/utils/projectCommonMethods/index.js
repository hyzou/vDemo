import axios from "../../axios";
import requestInterface from "../../axios/request";

/* 获取列表统一处理列表数据 */
import dealData from "./dealData";
/* 搜索栏点击事件通用方法 searchformBtnAction */
import searchformBtnAction from "./searchformBtnAction";
/* 对话框操作按钮点击事件通用方法 */
import dialogformBtnAction from "./dialogformBtnAction";

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
    _Vue.prototype.$postData = (urlstr, params, isFormdata) => {
      let formflag = isFormdata ? isFormdata : false;
      return new Promise(resolve => {
        axios(requestInterface["postMethod"](urlstr, formflag), params).then(
          xhr => {
            resolve(xhr);
          }
        );
      });
    };
    /* 获取接口数据所有方法 */
    _Vue.prototype.$methodData = (type, urlstr, params, isFormdata) => {
      let formflag = isFormdata ? isFormdata : false,
        method = type ? type : "get";
      return new Promise(resolve => {
        axios(
          requestInterface["kindMethod"](method, urlstr, formflag),
          params
        ).then(xhr => {
          resolve(xhr);
        });
      });
    };
    /* 处理接口数据 */
    _Vue.prototype.$dealData = dealData;
    /* 处理搜索栏数据，并发起列表搜索 */
    _Vue.prototype.$searchformBtnAction = searchformBtnAction;
    /* 处理搜索栏数据，并发起列表搜索 */
    _Vue.prototype.$dialogformBtnAction = dialogformBtnAction;
  }
};
