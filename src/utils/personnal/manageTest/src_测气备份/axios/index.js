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
    if (
      response.data.success ||
      response.config.url.indexOf("_data/bsi/storepoint/listByorgId") > -1
    ) {
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
    Toast({
      message: error,
      iconClass: "mintui mintui-field-error"
    });
    return Promise.reject(error);
  }
);
// 配置线上生产环境打包项目地址
var proxyUrl = process.env.NODE_ENV === "production" ? "/oh-scada/" : "/admin/";
const httpServer = function(opts, data, type, token) {
  let publicParams = {
    v: "1.0.0",
    _jwt:
      "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJNT0JJTEVfTE9HSU4iLCJhdWQiOiJic2NyayIsImlzcyI6Ik9OSE9ORVNUIiwidWRpZCI6ImJzY3JrLWRlZmF1bHQiLCJleHAiOjE1OTY3ODE5NzgsInVzZXIiOiJ7XCJ1c2VySWRcIjpcIjU0NlwiLFwibG9naW5OYW1lXCI6XCJic2Nya1wiLFwibmFtZVwiOlwi55m95rC05L-d566h5ZGYXCIsXCJkaXN0cmluY3RcIjpcIjMzMDMwMFwiLFwib3JnSWRcIjpcIjEwMDAyXCIsXCJvcmdUeXBlXCI6XCJTVE9SRV9QT0lOVFwiLFwib3JnTGV2ZWxDb2RlXCI6XCI5OTk5OS4xMDAwMC4xNS4xMDAwMS4xMDAwMi5cIixcImdyYWluQWRtaW5cIjpcIjEwMDAwXCIsXCJncmFpbk93bmVyXCI6XCIxNVwiLFwiZ3JhaW5TdG9yZVwiOlwiMTAwMDJcIixcInN0b3JlUG9pbnRJZFwiOlwiNDMzXCIsXCJhdXRob3JpdHlOYW1lc1wiOltcImRkX0ludm9pY2VFeHBvcnRcIixcImRydWdCZ3lcIixcImx6XCIsXCJzdG9yZUZpbmFuY2VcIixcImVvc2FkbWluXCIsXCJzdG9yZVF1YWwyXCIsXCJhZG1pblRrQ3pcIixcImRlbW9cIixcInNjZ3NcIixcInNjZmdzXCIsXCJvcmdhZG1pblwiLFwib3duZXJDd1wiLFwic3RvcmVCZ3lcIixcInFjQWRtaW5cIixcInN0b3JlQ3pGelwiLFwiZHJ1Z1lzeVwiLFwic3RvcmVDY0piXCIsXCJzdG9yZUZoeVwiLFwic3RvcmVDY0t6XCIsXCJzdG9yZUNjSmxcIixcIm93bmVyQ2NKYlwiLFwib3duZXJDY0t6XCIsXCJvd25lckNjSmxcIixcIm93bmVyR3hKYlwiLFwib3duZXJHeEt6XCIsXCJvd25lckd4SmxcIixcIm93bmVyQ3dLelwiLFwib3duZXJKbFwiLFwiYWRtaW5DY0N6XCIsXCJhZG1pbkNjSnpcIixcImFkbWluR3hKelwiLFwiZmluSmJcIixcImZpbkN6XCIsXCJxY1F5eVwiLFwicWNKeXlcIixcInFjU2h5XCIsXCJxY1p6XCIsXCJxY0Z6WnpcIixcInN0b3JlWHRHbFwiLFwieWpHeWRYdFwiLFwiYWRtaW5DY0piXCIsXCJhZG1pbkd4SmJcIixcInN0b3JlR3VhcmRcIixcIm5maFwiLFwibHNqelwiLFwic3pmZnN6XCIsXCJ5akx5XCIsXCJ5amRHbFwiLFwiZXZlcnlvbmVcIixcImFkbWluWGdsXCIsXCJvd25lclhnbFwiLFwic3RvcmVRdWFsMVwiLFwibmZoSmdcIixcIm5oeHhzXCIsXCJhZG1pbjJDY0piXCIsXCJhZG1pbjJLelwiLFwiYWRtaW4yR3hKYlwiLFwiYWRtaW5DY0ZjelwiLFwiYWRtaW5HeEZjelwiLFwiZGNxeWpzeVwiLFwiY2d6eGN3a3pcIixcInN5c01haW50ZW5hbmNlXCIsXCJueWpcIixcInN5c0FkbWluXCIsXCJudFwiLFwic2FtcGxpbmdNZW1iZXJcIixcInFjZ2x5XCIsXCJxY01lbWJlclwiLFwicWNBcHByb3ZlTWVtYmVyXCIsXCJxY2JneVwiLFwicWN3eHJ5XCIsXCJ6ZGhjenJ5XCIsXCJxeXl3Y3pyeVwiLFwicWNQbGFuXCIsXCJwcm9jZXNzQXV0aFwiLFwiY2d6eGNja3pcIixcImNnenhneGt6XCIsXCJtYXJrZXRcIixcImNnenhmZ2Z6clwiLFwid21zd3JpdGVcIixcInF1YWxDaGVja0FkbWluXCJdfSIsImlhdCI6MTU5NDE4OTk3OH0.DNV12fGKb_GtJgXjKEIR6M4sQuOtb1uN665opvY0qE6sUUHF3Ou7eX82Ljhcl39bkd6pLJl6Ll_gbIcQEegAJd3xfhd7C2G99P7DdKQE1WBwdA_Tuh9Lr9zkQLi8mtsR6YgL579cJqeR_jwndGSbLzxP_Q6YVCQ7Dg0jTV3tKUcF4h5yKB2pfPdbFjYTtKRRRSZ-_MfsAdQ6_mmLHvvrJ21iVjZD8HagKfNDeI9lGtV4z-hxBZzsvWGZExWdhgZ048Na7vLAa21wMEZvWIN9d6TIEU9JirmX4pS1fYGsf6fgUwEqfpOtVbPrjEfw9i93sSZR8Zp2Mgy5yJl-w9bXEA"
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
