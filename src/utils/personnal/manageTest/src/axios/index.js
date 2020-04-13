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
    v: "1.0.0",
    _jwt:
      "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJNT0JJTEVfTE9HSU4iLCJhdWQiOiJjcmsiLCJpc3MiOiJPTkhPTkVTVCIsInVkaWQiOiJjcmstZGVmYXVsdCIsImV4cCI6MTU4OTM1MzQ4NywidXNlciI6IntcInVzZXJJZFwiOlwiMjMwNVwiLFwibG9naW5OYW1lXCI6XCJjcmtcIixcIm5hbWVcIjpcImNya1wiLFwiZGlzdHJpbmN0XCI6XCIzMzAzMDBcIixcIm9yZ0lkXCI6XCIxMDAwMlwiLFwib3JnVHlwZVwiOlwiU1RPUkVfUE9JTlRcIixcIm9yZ0xldmVsQ29kZVwiOlwiOTk5OTkuMTAwMDAuMTUuMTAwMDEuMTAwMDIuXCIsXCJncm91cFwiOlwiT1JHX0FETUlOXCIsXCJncmFpbkFkbWluXCI6XCIxMDAwMFwiLFwiZ3JhaW5Pd25lclwiOlwiMTVcIixcImdyYWluU3RvcmVcIjpcIjEwMDAyXCIsXCJzdG9yZVBvaW50SWRcIjpcIjI3MVwiLFwiYXV0aG9yaXR5TmFtZXNcIjpbXCJwcm9jZXNzQXV0aFwiLFwic3RvcmVCZ3lcIixcImV2ZXJ5b25lXCJdfSIsImlhdCI6MTU4Njc2MTQ4N30.QK472tJHn-oVmdYtWqip8rknzFwXKiWB7kb_SuPd4ieayk1T4WZTlwkW5r_AHNdalLpblk6J3IqabLj-pK3nnF24UDahGaOFNguArAZQLGfDO66rnKd3AzHrk1uZS4rm_Xk4_h89zaPPoNNMRAE_J4j7ff3rqiwpQh2OBtiAkU-pn9gplsEqCzzN_0bft-C_jUJvcLjXhZXdyWqrVjdzq6Gb2BIHf_Jf88D5NoA5PXhRftqx8qeR0Rubs9mud6uBmUnzx7TPdu3HtlUqs76IIKppTmkSTA-A6s0nxDIsvXsDgVygeL3LQi8ZbuDf-hfHNBMWiR7nFmDisdzJQGTQvw"
  };
  let httpDefaultOptions = {
    baseURL: proxyUrl,
    method: opts.method,
    url: opts.url,
    params: Object.assign(publicParams, data),
    data: Object.assign(publicParams, data),
    headers: {
      token: token || ""
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
