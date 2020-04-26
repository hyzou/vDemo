import { staticRouterMap } from "../../router/index";
import { initRouter } from "../../router/initRouter";
import { Message } from "element-ui";
import api from "../../axios/httpApi";
import global from "../../axios/global_variable";
import axios from "../../axios";
import { getToken, setToken, setSessionId } from "../../utils/auth";

const user = {
  state: {
    token: getToken() || "",
    userInfo: {},
    hasGotRouters: false,
    routerWhiteList: staticRouterMap,
    routerList: [],
    routerAsyncList: [],
    hasNewNotice: false,
    unreadNotice: 0
  },
  mutations: {
    set_Token: (state, token) => {
      state.token = token;
    },
    set_UserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    set_getrouterStatus: (state, flag) => {
      state.hasGotRouters = flag;
    },
    set_router: (state, routerlist) => {
      state.routerList = routerlist;
    },
    set_asyncRouter: (state, routerlist) => {
      state.routerAsyncList = routerlist;
    },
    set_newNotice: (state, flag) => {
      state.hasNewNotice = flag;
    },
    set_unreadNotice: (state, num) => {
      state.unreadNotice = num;
    }
  },
  actions: {
    // 修改登录用户身份状态
    setTokenLogin({ commit }, data) {
      return new Promise(resolve => {
        axios(api.login(), data).then(xhr => {
          setToken(xhr.data.jwt);
          commit("set_Token", xhr.data.token);
          axios(api.getSessionId(), {}).then(sessionId => {
            setSessionId(sessionId.data);
          });
          resolve(getToken());
        });
      });
    },
    // 修改登录用户身份状态
    setUserInfo({ commit }, data) {
      return new Promise(resolve => {
        let userInfo;
        axios(api.userInfo(), data).then(xhr => {
          if (xhr.data) {
            // userInfo = {
            //   role: xhr.data
            // };
            userInfo = xhr.data;
          } else {
            userInfo = {
              role: "user"
            };
          }
          axios(api.systemParamsDetail(), { code: "reportServer" }).then(
            host => {
              global.excelPost = host.data.value;
            }
          );
          commit("set_UserInfo", userInfo);
          resolve(userInfo);
        });
      });
    },
    // 获取后台路由信息，并合并路由到已有基础路由
    setRouterList({ commit }, data) {
      let that = this;
      return new Promise((resolve, reject) => {
        let responseRouter;
        // if (that.getters.userInfo.type == "1") {
        axios(api.getRouter(), data).then(xhr => {
          if (that.getters.userInfo.type == "1") {
            if (!xhr[0].children || xhr[0].children.length == 0) {
              Message({
                type: "error",
                message: "当前账号尚未分配菜单，请联系管理员"
              });
              reject();
            }
            xhr[0].menuaction = "/managePage";
            let routerArr = initRouter(xhr);
            responseRouter = {
              asyncrouter: routerArr,
              index: routerArr[0].children[0].name || ""
            };
            commit("set_router", staticRouterMap.concat(routerArr));
            resolve(responseRouter);
          } else {
            responseRouter = {
              asyncrouter: xhr
            };
            commit("set_router", staticRouterMap.concat(xhr));
            resolve(responseRouter);
          }
        });
        // } else {
        //   axios(api.getRouter(), data).then(xhr => {
        //     responseRouter = {
        //       asyncrouter: xhr
        //     };
        //     commit("set_router", staticRouterMap.concat(xhr));
        //     resolve(responseRouter);
        //   });
        // }
      });
    },
    // 修改已获取动态路由状态
    setGotRouterStatus({ commit }, flag) {
      commit("set_getrouterStatus", flag);
    },
    // 获取后台路由信息，修改动态路由
    setAsyncRouterList({ commit }, routerList) {
      commit("set_asyncRouter", routerList);
    },
    // 接收后台socket，修改右上角小红点
    setNoticeStatus({ commit }, data) {
      let flag = false;
      if (data) {
        flag = true;
      }
      Message({
        type: "success",
        message: "您收到一条新消息，请及时查看"
      });
      this.dispatch("setUnreadNotice");
      commit("set_newNotice", flag);
    },
    //记录未读消息数目
    setUnreadNotice({ commit }) {
      console.log("setUnread");
      axios(api.getUnreadMsgList(), {}).then(xhr => {
        commit("set_unreadNotice", xhr.data.length);
      });
    }
  }
};

export default user;
