import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "./axios";
import api from "./axios/httpApi";
import "./styles/global.less";
import globalFunctions from "./util/globalFunctions";
import globalMethods from "./util/projectCommonMethods";

Vue.config.productionTip = true;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$globalFnc = globalFunctions;
Vue.use(MintUI);
Vue.use(globalMethods);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
