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
    /* 处理搜索栏数据，并发起列表搜索 */
    _Vue.prototype.$searchformBtnAction = searchformBtnAction;
    /* 处理对话框按钮事件 */
    _Vue.prototype.$dialogformBtnAction = dialogformBtnAction;
  }
};
