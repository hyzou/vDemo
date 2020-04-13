import Vue from "vue";
// import eruda from "eruda";
// import echarts from  "echarts";
// import "echarts-gl";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "./axios";
import api from "./axios/httpApi";
import "./styles/global.less";
import "@/assets/iconfont/iconfont.js";
import "@/assets/iconfont/iconfont.css";
import common from "@/util/commonJs";

import iconSvg from "@/components/iconFontSvg";

Vue.config.productionTip = true;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$common = common;
Vue.use(MintUI);
// Vue.use(eruda);
Vue.component("iconSvg", iconSvg);

// if (/eruda=true/.test(window.location) || localStorage.getItem('active-eruda') == 'true'){
//   eruda.init();
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
