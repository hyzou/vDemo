import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app/index";
import user from "./modules/user/index";
import supervision from "./modules/supervision/index";
import assessment from "./modules/assessment/index";
import persistedState from "vuex-persistedstate";
import createLogger from "vuex/dist/logger";
const vuexPersisted = new persistedState({
  key: "myVuex",
  storage: window.localStorage
  // reducer: state => ({
  //   app: state.app,
  //   assessment: state.assessment,
  //   supervision: state.supervision,
  //   user: state.user
  // })
});
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    user,
    assessment,
    supervision
  },
  plugins: [createLogger(), vuexPersisted]
  // plugins: [vuexPersisted]
});

export default store;
