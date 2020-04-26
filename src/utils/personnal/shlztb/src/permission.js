import router from "./router";
import {
  // asyncRouterMap_Manager,
  asyncRouterMap_Member,
  asyncRouterMap_Client
} from "./router";
import store from "./store";
import { getToken, removeToken, removeSessionId } from "./utils/auth";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { MessageBox } from "element-ui";
// import axios from "./axios";
// import api from "./axios/httpApi";
// import { initRouter } from "./router/initRouter";
import globalVariables from "./axios/global_variable";
import globalFncs from "./utils/globalFunctions";
// import { debuglog } from "util";

const whiteList = [
  "/",
  "/informationsPage",
  "/informationsPage/informationHomePage",
  "/informationsPage/informationDetailListPage",
  "/informationsPage/informationDetailPage",
  "/informationsPage/contractUs",
  "/informationsPage/helpPage",
  "/informationsPage/signUp",
  "/informationsPage/login"
]; //白名单列表
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (whiteList.indexOf(to.path) === -1) {
      if (store.getters.hasGotRouters) {
        next();
      } else {
        gotoRouter(to, next);
      }
    } else {
      // Message({
      //   message: "您已经登录",
      //   type: "info"
      // });
      removeToken();
      removeSessionId();
      store.dispatch("setGotRouterStatus", false);
      next();
    }
  } else {
    store.dispatch("setGotRouterStatus", false);
    if (whiteList.indexOf(to.path) !== -1) {
      //路由在白名单中，直接进入
      next();
    } else {
      next("/");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

function gotoRouter(to, next) {
  const postdata = {};
  store.dispatch("setUserInfo", postdata, true).then(() => {
    store.dispatch("setUnreadNotice");
    store.dispatch("setRouterList", postdata, true).then(routerObj => {
      let roleStatus = localStorage.getItem("roleStatus"),
        asyncRouter;
      if (roleStatus == "member") {
        asyncRouter = asyncRouterMap_Member;
      } else if (roleStatus == "client") {
        asyncRouter = asyncRouterMap_Client;
      } else if (roleStatus == "manager") {
        asyncRouter = routerObj.asyncrouter;
        // asyncRouter = asyncRouterMap_Manager;
      }
      asyncRouter.push({
        path: "*",
        redirect: "/404",
        hidden: true
      });
      router.addRoutes(asyncRouter); //vue-router提供的添加路由的方法
      store.dispatch("setGotRouterStatus", true);
      store.dispatch("setAsyncRouterList", asyncRouter);
      if (roleStatus == "member" || roleStatus == "client") {
        router.push({ name: "memberPage" });
      } else {
        router.push({ name: routerObj.index });
        // router.push({ name: "biddingInformation" });
      }
      globalFncs.socketConnect().then(() => {
        globalFncs.socketDescribNotice().then(notice => {
          store.dispatch("setNoticeStatus", notice);
        });
        globalFncs.socketDescribOffline().then(offline => {
          if (offline && offline.body) {
            if (typeof offline.body == "string") {
              offline.body = JSON.parse(offline.body);
            }
            MessageBox.alert(offline.body.msg, "下线提示", {
              confirmButtonText: "确定",
              callback: () => {
                if (globalVariables.commonObjects.noticeTopic) {
                  globalVariables.commonObjects.noticeTopic.unsubscribe();
                }
                if (globalVariables.commonObjects.offlineTopic) {
                  globalVariables.commonObjects.offlineTopic.unsubscribe();
                }
                location.href = globalVariables.logout;
              }
            });
          }
        });
        next({ ...to, replace: true });
      });
      // router.push({ name: "memberPage" });
    });
  });
}
