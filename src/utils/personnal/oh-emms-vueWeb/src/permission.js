import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (sessionStorage.getItem("isNotreload") == "true") {
    next();
  } else {
    getDefaultDatas().then(() => {
      next();
    });
  }
});
router.afterEach(() => {
  NProgress.done();
});
function getDefaultDatas() {
  return new Promise(rel => {
    async function doDefaultAction() {
      await store.dispatch("user/commitUserSession");
      await store.dispatch("user/commitMenuTree");
      await store.dispatch("user/commitUserButtons");
      await store.dispatch("user/commitBaseInfos");
      await rel();
    }
    doDefaultAction();
  });
}
