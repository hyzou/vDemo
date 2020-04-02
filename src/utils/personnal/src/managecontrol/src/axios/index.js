import axios from 'axios';
import { Indicator } from "mint-ui";
import 'mint-ui/lib/style.css';

axios.interceptors.request.use (
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject (error);
    }
);

axios.interceptors.response.use (
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
        return Promise.reject (error);
    }
);
// 配置线上生产环境打包项目地址
var proxyUrl = process.env.NODE_ENV === 'production'
    ? '/oh-scada/'
    : '/admin/';
const httpServer = function(opts, data, type, token) {
    //jwt生成时间：2019-01-08
    let publicParams = {
        v: '1.0.0',
        // _jwt:'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNT0JJTEVfTE9HSU4iLCJhdWQiOiJjcmsiLCJpc3MiOiJPTkhPTkVTVCIsInVkaWQiOiJjcmstZGVmYXVsdCIsImV4cCI6MTU4MTA0NjI0MiwidXNlciI6IntcclxuICBcInVzZXJJZFwiIDogXCIyMzA1XCIsXHJcbiAgXCJsb2dpbk5hbWVcIiA6IFwiY3JrXCIsXHJcbiAgXCJuYW1lXCIgOiBcIum7hOaIkOWNjlwiLFxyXG4gIFwiZGlzdHJpbmN0XCIgOiBcIjMzMDMwMFwiLFxyXG4gIFwib3JnSWRcIiA6IFwiMTAwMDJcIixcclxuICBcIm9yZ1R5cGVcIiA6IFwiU1RPUkVfUE9JTlRcIixcclxuICBcIm9yZ0xldmVsQ29kZVwiIDogXCI5OTk5OS4xMDAwMC4xNS4xMDAwMS4xMDAwMi5cIixcclxuICBcImdyYWluQWRtaW5cIiA6IFwiMTAwMDBcIixcclxuICBcImdyYWluT3duZXJcIiA6IFwiMTVcIixcclxuICBcImdyYWluU3RvcmVcIiA6IFwiMTAwMDJcIixcclxuICBcInN0b3JlUG9pbnRJZFwiIDogXCIyNzFcIixcclxuICBcImF1dGhvcml0eU5hbWVzXCIgOiBbIFwiZGVtb1wiLCBcInN0b3JlQmd5XCIsIFwiZXZlcnlvbmVcIiwgXCJwcm9jZXNzQXV0aFwiIF1cclxufSIsImlhdCI6MTU3ODQ1NDI0Mn0.HPNMOZbSzsh050lq9kSZ3s4vCBbAxoa7gSUxsmxvlRE'
    };
    if(process.env.NODE_ENV === 'production'){
        delete publicParams._jwt
    }

    let httpDefaultOptions = {
        baseURL: proxyUrl,
        method: opts.method,
        url: opts.url,
        params: Object.assign (publicParams, data),
        data: Object.assign (publicParams, data),
        headers: {
            token: token || ''
        }
    };
    if (opts.method == 'get') {
        delete httpDefaultOptions.data;
    } else {
        if (type) {
            httpDefaultOptions.headers['Content-Type'] =
                'application/x-www-form-urlencoded; charset=UTF-8';
        } else {
            delete httpDefaultOptions.params;
        }
    }
    let promise = new Promise (function(resolve, reject) {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        })
        axios (httpDefaultOptions)
            .then (function(res) {
                resolve (res);
                Indicator.close()
            })
            .catch (function(response) {
                reject (response);
                Indicator.close()
            });
    });
    return promise;
};
export default httpServer;
