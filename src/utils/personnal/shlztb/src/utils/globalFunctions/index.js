import SockJS from "sockjs-client";
import Stomp from "stompjs";
import globalVariable from "../../axios/global_variable";
import { getSessionId } from "../auth";
import store from "../../store";
import fileFormat from "./fileFormat";
import dateStampFormat from "./dateStampFormat";
import renderSize from "./renderSize";
import arrayToFormDropdown from "./arrayToFormDropdown";
import postArrtoString from "./postArrtoString";
import parseNumberToCnMoney from "./parseNumberToCnMoney";
import cnwordToCharCode from "./cnwordToCharCode";

const globalFncs = {
  // 文件格式转换
  fileFormat: fileFormat,
  // 时间戳转日期
  dateStampFormat: dateStampFormat,
  //  格式化文件大小
  renderSize: renderSize,
  // 获取接口数据下拉转换成可用的的下拉组建数据 label待转化显示的汉字 value待转化的提交的值
  arrayToFormDropdown: arrayToFormDropdown,
  // 格式化接口参数：数组->数组字符串
  postArrtoString: postArrtoString,
  // 格式化数字为人民币单位
  parseNumberToCnMoney: parseNumberToCnMoney,
  //汉字转 Unicode 编码
  cnwordToCharCode: cnwordToCharCode,
  //socket连接
  socketConnect: () => {
    let promise = new Promise((resolve, reject) => {
      let wsurl = globalVariable.baseSocketUrl;
      if (window.WebSocket) {
        globalVariable.websocketObj = new SockJS(wsurl);
        globalVariable.stompClient = Stomp.over(globalVariable.websocketObj);
        globalVariable.stompClient.connect(
          {
            // _jwt: getToken()
          },
          function() {
            resolve();
          },
          function() {
            //console.log(data)
          }
        );
      } else {
        reject();
      }
    });
    return promise;
  },
  socketDescribNotice() {
    let promise = new Promise((resolve, reject) => {
      let socketUrl = "/_user/" + store.getters.userInfo.loginName + "/03";
      if (globalVariable.websocketObj) {
        globalVariable.commonObjects.noticeTopic = globalVariable.stompClient.subscribe(
          socketUrl,
          function(response) {
            resolve(response);
          }
        );
      } else {
        reject();
      }
    });
    return promise;
  },
  socketDescribOffline() {
    let promise = new Promise((resolve, reject) => {
      let sessionid = getSessionId();
      if (!sessionid) {
        return false;
      }
      let socketUrl =
        "/_user/" +
        store.getters.userInfo.loginName +
        "/sessionExpired/" +
        sessionid;
      if (globalVariable.websocketObj) {
        globalVariable.commonObjects.offlineTopic = globalVariable.stompClient.subscribe(
          socketUrl,
          function(response) {
            resolve(response);
          }
        );
      } else {
        reject();
      }
    });
    return promise;
  }
};
export default globalFncs;
