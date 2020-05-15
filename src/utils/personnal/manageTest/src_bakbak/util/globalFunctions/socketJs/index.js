import { Toast } from "mint-ui";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const socket = {};

/* socket连接 */
socket.socketConnect = json => {
  let stompClient = null,
    wsurl = json.url,
    userName = json.userName,
    callback = json.callback,
    flag = true;

  if ((!userName && userName !== 0) || !wsurl) {
    flag = false;
  }
  if (window.WebSocket && flag) {
    let websocketObj = new SockJS(wsurl);

    stompClient = Stomp.over(websocketObj);
    stompClient.connect(
      {
        password: "",
        username: userName
      },
      // eslint-disable-next-line
      function(frame) {
        if (typeof callback == "function") {
          callback(stompClient);
        }
      }
    );
  } else {
    if (flag) {
      Toast({
        message: "websocket通信连接失败！",
        iconClass: "icon icon-success"
      });
    } else {
      Toast({
        message: "连接需要的用户ID和用户名不能为空",
        iconClass: "icon icon-success"
      });
    }
    if (typeof callback == "function") {
      callback(false);
    }
  }
};
//向socket发送数据
socket.socketSend = json => {
  let stompClient = json.stompClient,
    wsurl = json.url,
    param = json.param || {};
  if (!stompClient || !wsurl) {
    return false;
  } else {
    stompClient.send(wsurl, param, "");
  }
};
/* 开启订阅 */
socket.openSubscribe = json => {
  let stompClient = json.stompClient,
    wsurl = json.url,
    callback = json.callback;

  let subscribeObj = stompClient.subscribe(wsurl, response => {
    callback(response);
  });
  return subscribeObj;
};
/* 关闭订阅 */
socket.closeSubscribe = subscribeObjs => {
  if (subscribeObjs) {
    if (subscribeObjs instanceof Array) {
      subscribeObjs.map(function(subscribeObj) {
        subscribeObj.unsubscribe();
      });
    } else {
      subscribeObjs.unsubscribe();
    }
  } else {
    Toast({
      message: "未找到订阅对象！",
      iconClass: "icon icon-success"
    });
  }
};
/* 断开socket */
socket.socketDisconnect = stompClient => {
  stompClient.disconnect();
};

export default socket;
