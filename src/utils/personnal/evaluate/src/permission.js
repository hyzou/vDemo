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
      setTimeout(() => {
        next("/login");
      }, 0);
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  NProgress.done();
  setTimeout(() => {
    if (from.name == "login") {
      window.location.reload();
    }
  }, 0);
});
