import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.name !== "login") {
    if (store.getters["user/userInfos"].userId) {
      next();
    } else {
      gotoRouter(to, from, next);
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

function gotoRouter(to, from, next) {
  if (from.name !== "login" && to.name !== "login") {
    let systype = sessionStorage.getItem("sysType");
    store.dispatch("user/commitUserSession").then(() => {
      if (systype && from.name !== "choseSystem" && to.name !== "choseSystem") {
        store.dispatch("user/commitMenuTree", systype);
      }
    });
  }
  next();
}
