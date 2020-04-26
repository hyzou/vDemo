import axios from "axios";
import { Indicator } from "mint-ui";
import "mint-ui/lib/style.css";

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response.data;
    /* if (response.data.code == "0") {
          return response.data;
        } else {
          Toast({
            message: response.message,
            iconClass: "icon icon-success"
          });
        } */
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 配置线上生产环境打包项目地址
var proxyUrl = process.env.NODE_ENV === "production" ? "/" : "/admin/";
const httpServer = function(opts, data, type, token) {
  let publicParams = {
    v: "1.0.0"
    // _jwt: JSON.parse(localStorage.getItem("currentTestUserInfos"))
  };
  let httpDefaultOptions = {
    baseURL: opts.hasOwnUrl ? "" : proxyUrl,
    method: opts.method,
    url: opts.url,
    params: Object.assign(publicParams, data),
    data: Object.assign(publicParams, data),
    headers: {
      token: token || "",
      authorization: "Bearer"
    }
  };
  if (opts.method == "get") {
    delete httpDefaultOptions.data;
  } else {
    if (type) {
      httpDefaultOptions.headers["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
    } else {
      delete httpDefaultOptions.params;
    }
  }
  let promise = new Promise(function(resolve, reject) {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    axios(httpDefaultOptions)
      .then(function(res) {
        resolve(res);
        Indicator.close();
      })
      .catch(function(response) {
        reject(response);
        Indicator.close();
      });
  });
  return promise;
};
export default httpServer;
