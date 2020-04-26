import Vue from "vue";

import "normalize.css/normalize.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueUeditorWrap from "vue-ueditor-wrap";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios";
import api from "./axios/httpApi";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
import globalVariable from "./axios/global_variable";
import qs from "qs";
import "./registerServiceWorker";
import "./styles/global.less";
import "./permission";
import globalFunctions from "./utils/globalFunctions";
import globalMethods from "./utils/commonMethods";
import * as filters from "./utils/filters";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$api = api;
// Vue.prototype.$global = globalVariable;
Vue.prototype.$global = globalVariable;
Vue.prototype.$globalFnc = globalFunctions;

// Vue.use(SockJS);
// Vue.use(Stomp);
Vue.use(ElementUI);
Vue.prototype.$qs = qs;
Vue.component("vue-ueditor-wrap", VueUeditorWrap);
Vue.use(globalMethods);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
document.title = "社会贸易粮公共交易平台";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
