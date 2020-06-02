import Vue from "vue";
import Vuex from "vuex";
import process from "./modules/process";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    process
  },
  state: {
    table_data: [],
    admins: [], //查询面板通用数据对象，监测级别
    products: [], //查询面板通用数据对象，监测级别
    natures: [],
    userInfo: null, //用户信息
    areaLevel: [] //当前用户有权限的行政区划
  },
  getters: {
    userInfo: function(state) {
      return state.userInfo;
    },
    get_tableData: function(state) {
      return state.table_data;
    },
    //检测级别
    admins: function(state) {
      return state.admins;
    },
    //产品品种
    products: function(state) {
      return state.products;
    },
    //计划性质
    natures: function(state) {
      return state.natures;
    },
    get_userInfo: function(state) {
      return state.userInfo;
    },
    get_areaLevel: function(state) {
      return state.areaLevel;
    }
  },
  mutations: {
    set_data(state, rows) {
      state.table_data = rows;
    },
    set_admins(state, data) {
      state.admins = data;
    },
    set_products(state, data) {
      state.products = data;
    },
    set_natures(state, data) {
      state.natures = data;
    },
    set_userInfo(state, data) {
      state.userInfo = data;
    },
    set_areaLevel(state, data) {
      state.areaLevel = data;
    }
  },
  actions: {
    set_data(context, data) {
      let rows = data.rows;
      context.commit("set_data", rows);
    },
    set_admins(context, data) {
      context.commit("set_admins", data);
    },
    set_products(context, data) {
      context.commit("set_products", data);
    },
    set_natures(context, data) {
      context.commit("set_natures", data);
    },
    set_userInfo(context, data) {
      context.commit("set_userInfo", data);
    },
    set_areaLevel(context, data) {
      context.commit("set_areaLevel", data);
    }
  }
});
export default store;
