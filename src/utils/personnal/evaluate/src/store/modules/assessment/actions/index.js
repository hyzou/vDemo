/**
 * actions
 * 方法命名：驼峰命名 commit(前缀)+appName(state中变量名)=>commitAppName
 */
const actions = {
  commitIndexList({ commit }, info) {
    return new Promise(relsove => {
      commit("setIndexList", info);
      relsove();
    });
  },
  commitDeleteIndexList({ commit }, id) {
    return new Promise(relsove => {
      commit("deleteIndexList", id);
      relsove();
    });
  },
  commitAssessmentInfo({ commit }, info) {
    return new Promise(relsove => {
      commit("setAssessmentInfo", info);
      relsove();
    });
  },
  commitTargetInfo({ commit }, info) {
    return new Promise(relsove => {
      commit("setTargetInfo", info);
      relsove();
    });
  },
  //action -- 市级自评(citySelf),处室自评(officeSelf), 市级意见(cityOpinion),处室意见(officeOpinion)
  commitAssessmentResult({ commit }, info) {
    return new Promise(relsove => {
      commit("setAssessmentResult", info);
      relsove();
    });
  },
  commitAssessmentOpen({ commit }, info) {
    return new Promise(relsove => {
      commit("setAssessmentOpen", info);
      relsove();
    });
  }
};
export default actions;
