import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import getters from "./getters";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  plugins: [persistedState({ storage: window.sessionStorage })]
});

export default store;
