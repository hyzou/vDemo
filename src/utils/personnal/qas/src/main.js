// 框架类结构引入
import Vue from "vue";
import echarts from "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "video.js/dist/video-js.css";
// 项目内部结构引入
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import constants from "./axios/global_variable";
import "./permission";
import "./styles/global.less";
import Api from "./axios/common_api";
import dateUtl from "./utils/projectCommonMethods/utls";
import globalFnc from "./utils/globalFunctions";
// 组件
import vueComponent from "@/components";
import "@/components/treeSelect/kt-select-tree";

Vue.prototype.$echarts = echarts;
Vue.prototype.$Api = Api;
Vue.prototype.$dateUtl = dateUtl;
Vue.prototype.$globalFnc = globalFnc;
Vue.prototype.$constants = constants;

Vue.use(ElementUI);
Vue.use(vueComponent);

Vue.config.productionTip = false;

//=====nprogress进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});
//路由执行之前方法
router.beforeEach((to, form, next) => {
  NProgress.start();
  next();
});
//路由执行之后
router.afterEach(() => {
  NProgress.done();
});
//===========nprogress进度条配置结束
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
