import axios from "axios";
import { Indicator, Toast } from "mint-ui";
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
    // return response.data;
    if (response.data.success) {
      return Promise.resolve(response.data);
    } else {
      Toast({
        message: response.data.msg,
        iconClass: "mintui mintui-field-error"
      });
      return Promise.reject(response.data);
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 配置线上生产环境打包项目地址
var proxyUrl = process.env.NODE_ENV === "production" ? "/oh-scada/" : "/admin/";
const httpServer = function(opts, data, type, token) {
  let publicParams = {
    v: "1.0.0",
    _jwt:
      "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJNT0JJTEVfTE9HSU4iLCJhdWQiOiJjcmsiLCJpc3MiOiJPTkhPTkVTVCIsInVkaWQiOiJjcmstZGVmYXVsdCIsImV4cCI6MTU5MDU2OTA3MywidXNlciI6IntcInVzZXJJZFwiOlwiMjMwNVwiLFwibG9naW5OYW1lXCI6XCJjcmtcIixcIm5hbWVcIjpcIum7hOaIkOWNjlwiLFwiZGlzdHJpbmN0XCI6XCIzMzAzMDBcIixcIm9yZ0lkXCI6XCIxMDAwMlwiLFwib3JnVHlwZVwiOlwiU1RPUkVfUE9JTlRcIixcIm9yZ0xldmVsQ29kZVwiOlwiOTk5OTkuMTAwMDAuMTUuMTAwMDEuMTAwMDIuXCIsXCJncmFpbkFkbWluXCI6XCIxMDAwMFwiLFwiZ3JhaW5Pd25lclwiOlwiMTVcIixcImdyYWluU3RvcmVcIjpcIjEwMDAyXCIsXCJzdG9yZVBvaW50SWRcIjpcIjI3MVwiLFwiYXV0aG9yaXR5TmFtZXNcIjpbXCJkZW1vXCIsXCJzdG9yZUJneVwiLFwiZXZlcnlvbmVcIixcInByb2Nlc3NBdXRoXCJdfSIsImlhdCI6MTU4Nzk3NzA3M30.KmzhB0V3XzGDqxiRonhr63N5SbKysF8CU8jz7AYNseFhIIFBsZECA7oGYRCA57RRQYuzgrWVBUGOoI4Dj-iW53X3sNn_krrP7haahpz71x5BKldyYHqR1FMHUoDJ_eotsIxmG6jHg5Gc8ZEBxf0WM1SaqzNKwVNv8eSrp32sCliRyO4wW2bU6UTKgDuJL9UPoVK1PgDxmo-1vlvYCUu0jrhD-IUMq3hKty3CPwRs2ygtp5inPmCkvQGsWevpIp-E_z6uRih4wK4Y87COnoJgIkeFKkbRxsseE4owv8jsc3qbmaKgpe9x_m0Gq8snzA7DpRBdiEL8XpM5jET9SrJ0JQ"
  };
  let httpDefaultOptions = {
    baseURL: opts.hasOwnUrl ? "" : proxyUrl,
    method: opts.method,
    // url: opts.isMuti
    //   ? opts.url
    //   : opts.url + "?v=" + publicParams.v + "&_jwt=" + publicParams._jwt,
    url:
      process.env.NODE_ENV === "production"
        ? opts.url
        : opts.url + "?v=" + publicParams.v + "&_jwt=" + publicParams._jwt,
    params: data, //Object.assign(publicParams, data),
    data: data, //Object.assign(publicParams, data),
    headers: {
      token: token || "",
      authorization: "Bearer"
    }
  };
  if (opts.method == "get") {
    delete httpDefaultOptions.data;
  } else {
    if (opts.isMuti) {
      delete httpDefaultOptions.params;
    }
    // if (httpDefaultOptions.url == "_data/testConfig/config/connectController") {
    //   httpDefaultOptions.url =
    //     "_data/testConfig/config/connectController?v=" +
    //     publicParams.v +
    //     "&_jwt=" +
    //     publicParams._jwt;

    // }
    // if (type) {
    //   httpDefaultOptions.headers["Content-Type"] =
    //     "application/x-www-form-urlencoded; charset=UTF-8";
    // } else {
    //   delete httpDefaultOptions.params;
    // }
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
