import axios from "axios";
import QS from "qs";
import { Loading, Message, MessageBox } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { getToken } from "@/utils/auth";
import globalVariables from "./global_variable";

let loadingInstance,
  connet = 0;
const baseURL =
  process.env.NODE_ENV === "production"
    ? globalVariables.mainPrefix + "/"
    : "/admin";
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      body: false,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.3)"
    });
    connet += 1;
    let url = config.url;
    // get参数编码
    if (config.method === "get" && config.params) {
      url += "?";
      let keys = Object.keys(config.params);
      for (let key of keys) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
    }
    config.url = url;
    return config;
  },
  function(error) {
    Message({
      type: "error",
      message: "接口提交信息失败"
    });
    connet -= 1;
    if (loadingInstance && connet === 0) {
      loadingInstance.close();
    }
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    connet -= 1;
    if (loadingInstance && connet === 0) {
      loadingInstance.close();
    }
    const res = response.data ? response.data : response;
    if (res.code && res.code !== "0") {
      Message({
        showClose: true,
        message: res.msg,
        type: "error"
      });
      return Promise.reject(res);
    } else {
      if (typeof res === "string" && res.search("noscript") != -1) {
        // console.log("页面出错，请重新登录");
        MessageBox.alert("当前会话已过期，请重新登录！", "会话过期提示", {
          confirmButtonText: "确定",
          callback: () => {
            location.href = globalVariables.logout;
          }
        });
      }
      return res;
    }
  },
  error => {
    connet -= 1;
    if (loadingInstance && connet === 0) {
      loadingInstance.close();
    }
    if (error.response.status == "601") {
      MessageBox.alert(error.response.data.msg, "会话过期提示", {
        confirmButtonText: "确定",
        callback: () => {
          location.href = globalVariables.logout;
        }
      });
    } else {
      Message({
        message: error.message,
        type: "error",
        duration: 5000
      });
    }
    // 返回错误信息
    return Promise.reject(error);
  }
);

const httpServer = function(opts, data) {
  let publicParams = {
    // v: "1.0.0"
  };
  if (getToken() && process.env.NODE_ENV !== "production") {
    publicParams["_jwt"] = getToken();
  }
  let httpDefaultOptions = {
    baseURL: baseURL,
    method: opts.method,
    url: opts.url,
    params: Object.assign(publicParams, data),
    data: QS.stringify(Object.assign(publicParams, data)),
    headers: {
      // token: getToken() || ""
    }
  };
  if (opts.isMuti) {
    httpDefaultOptions.data = data;
    // if (opts.enctype) {
    //   httpDefaultOptions["Content-Type"] = "application/x-www-form-urlencoded";
    // }
  }
  if (opts.method == "get") {
    delete httpDefaultOptions.data;
  } else {
    delete httpDefaultOptions.params;
  }
  let promise = new Promise((resolve, reject) => {
    axios(httpDefaultOptions)
      .then(res => {
        resolve(res);
      })
      .catch(response => {
        reject(response);
      });
  });
  return promise;
};
export default httpServer;
