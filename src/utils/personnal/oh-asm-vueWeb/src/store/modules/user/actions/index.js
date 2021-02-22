import router, {
  staticRouterMap,
  asyncRouterChildren,
  createRouter
} from "@/router/index";
import { initRouter } from "@/router/initRouter";
import api from "@/axios/httpApi";
import axios from "@/axios";
import global from "@/axios/global_variable";

/**
 * actions
 * 方法命名：驼峰命名 commit(前缀)+appName(state中变量名)=>commitAppName
 */
const actions = {
  commitUserSession({ commit }) {
    return new Promise(relsove => {
      axios({ url: api.getUserSession_user, method: "get" }, {}).then(
        sessionData => {
          axios(
            { url: api.getOrgSelectList, method: "get" },
            { orgid: sessionData.data.orgId }
          ).then(userdata => {
            sessionData.data.orgname = userdata.data.orgname;
            commit("setStateUserInfos", sessionData.data);
          });

          // 11.9 王永杰 报表地址使用上下文地址，不再使用接口获取方式
          commit(
            "setReportServerUrl",
            window.location.origin + `/${global.projectName}/ReportServer`
            // window.location.origin + `/${global.projectName}/WebReport/ReportServer`
          );
          // axios({ url: api.getBasicReportServer, method: "get" }, {}).then(
          //   res => {
          //     commit("setReportServerUrl", res + "/WebReport/ReportServer");
          //     // commit("setReportServerUrl", res + "/ReportServer");
          //   }
          // );
          // 在线查看文件地址
          axios({ url: api.getBasicFileViewerServer, method: "get" }, {}).then(
            res => {
              commit("setFileViewerUrl", res);
            }
          );
          relsove();
        }
      );
    });
  },
  commitClearRouter({ commit }) {
    commit("setAsyncRouterslist", []);
  },
  commitMenuTree({ commit }, type) {
    if (type) {
      commit("setSysType", type);
    }
    return new Promise((relsove, reject) => {
      axios(
        { url: api.getMenuTreeByUser_user, method: "get" },
        { sysType: type || "oh-asm-province" }
      ).then(menuData => {
        if (!menuData.length) {
          reject();
          return false;
        }
        let asyncRouter = initRouter(menuData[0].children[0].children);
        let newObj = asyncRouterChildren.concat(asyncRouter);
        let newAsync = [
            {
              path: "/informationsPage",
              hidden: false,
              name: "informationsPage",
              component: () => import("@/views/informationsPage/index"),
              redirect: "/informationsPage/homePage",
              children: []
            }
          ],
          notFound = {
            path: "*",
            redirect: "/404",
            hidden: true
          };
        newAsync[0].children = newObj;
        newAsync.push(notFound);
        staticRouterMap.push(newAsync[0]);
        staticRouterMap.push(notFound);
        router.matcher = createRouter().matcher;
        router.addRoutes(newAsync);
        commit("setAsyncRouterslist", staticRouterMap);
        relsove(newAsync);
      });
    });
  },
  commitUserInfos({ commit }, userInfos) {
    return new Promise(relsove => {
      commit("setStateUserInfos", userInfos);
      relsove();
    });
  },
  commitClearUserInfos({ commit }) {
    return new Promise(relsove => {
      commit("setStateClearUserInfos");
      relsove();
    });
  },
  commitToken({ commit }, data) {
    return new Promise(relsove => {
      commit("setStateToken", data);
      relsove();
    });
  },
  commitClearToken({ commit }) {
    return new Promise(relsove => {
      commit("setStateClearToken");
      relsove();
    });
  }
};
export default actions;
