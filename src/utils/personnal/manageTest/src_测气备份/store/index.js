import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

import states from "./states";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default new Vuex.Store({
  state: states,
  getters: getters,
  mutations: mutations,
  actions: actions,
  plugins: [persistedState({ storage: window.sessionStorage })]
});
