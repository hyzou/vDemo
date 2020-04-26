import axios from "axios";
import Vue from "vue";
import { Message, MessageBox } from "element-ui";
import globalVariables from "./global_variable";
const axiosInstance = axios.create({
  baseURL: globalVariables.baseURL,
  headers: { "Content-Type": "application/JSON;charset=utf-8" }, // 设置传输内容的类型和编码
  withCredentials: true // 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
});
// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading;
let needLoadingRequestCount = 0; // 声明一个对象用于存储请求个数
function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "加载中...",
    // background: 'rgba(0,0,0,0.5)',
    target: document.querySelector(".loading-area") // 设置加载动画区域
  });
}
function endLoading() {
  loading.close();
}
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
// 如果当前已经登录，调用时自动携带JWT
// request拦截器
axiosInstance.interceptors.request.use(
  config => {
    showFullScreenLoading();
    return config;
  },
  error => {
    hideFullScreenLoading();
    return Promise.reject(error);
  }
);

// 如果返回值中有JWT，自动更新系统的JWT和用户信息
// respone拦截器
axiosInstance.interceptors.response.use(
  response => {
    hideFullScreenLoading();
    if (response.data.httpStatus && response.data.httpStatus != "200") {
      Message({
        type: "error",
        message: response.data.msg
      });
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  },
  error => {
    hideFullScreenLoading();
    if (error.response.status == "601") {
      MessageBox.alert("当前会话已过期，请重新登录！", "会话过期提示", {
        confirmButtonText: "确定",
        callback: () => {
          //刷新当前页面
          window.location.reload();
        }
      });
    }
    return Promise.reject(error);
  }
);

export function get({
  url = "",
  responseType,
  param = {},
  fnc = () => {},
  rej = () => {}
}) {
  let requestParam = {
    method: "get",
    url: url,
    params: param
  };
  if (responseType) {
    requestParam.responseType = responseType;
  }
  axiosInstance(requestParam)
    .then(resp => {
      fnc(resp.data);
    })
    .catch(resp => {
      console.error("请求失败：" + resp.status + "," + resp.statusText);
      rej(resp);
    });
}

export function post({ url = "", param = {}, fnc = () => {} }) {
  axiosInstance({
    method: "post",
    url: url,
    data: param
  })
    .then(resp => {
      fnc(resp.data);
    })
    .catch(resp => {
      console.error("请求失败：" + resp.status + "," + resp.statusText);
    });
}
