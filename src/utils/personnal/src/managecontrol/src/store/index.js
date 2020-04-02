import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
         // tokenId: "hch1",
         // userName: "crk",
         // userId: '2305'
    },
    pointInfo: {
         // storePointId: "271",
         // storePointName: "测试库"
    },
    wholeParam: {
      page: null
    },
    ecolorInfo: {
      highTemp : 40,
      lowTemp : 0,
      highColor : "#ff0a00",
      lowColor : "#000aff"
    }
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_POINTINFO: (state, pointInfo) => {
      state.pointInfo = pointInfo;
    },
    SET_PAGE: (state, page) => {
      state.wholeParam.page = page;
    },
    SET_ECOLORINFO: (state, ecolorInfo) => {
      state.ecolorInfo = ecolorInfo;
    }
  },
  actions: {
    // 设置登录信息
    setUserInfos({ commit }, userInfo) {
      commit("SET_USERINFO", userInfo) 
    },
    // 设置库区信息
    setPointInfos({ commit }, pointInfo) {
      commit("SET_POINTINFO", pointInfo)
    },
    //  设置当前页面
    setPage({ commit }, page) {
      commit("SET_PAGE", page)
    },
    // 设置echarts的温度颜色范围
    setEcolorInfos({ commit }, ecolorInfo){
      commit("SET_ECOLORINFO", ecolorInfo)
    }
  }
});
