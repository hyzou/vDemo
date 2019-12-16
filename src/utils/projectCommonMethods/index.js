import axios from "../../axios";
import api from "../../axios/httpApi";

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
    /* 获取接口数据 */
    _Vue.prototype.$getData = (urlstr, params) => {
      return new Promise(resolve => {
        axios(api[urlstr](), params).then(xhr => {
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
