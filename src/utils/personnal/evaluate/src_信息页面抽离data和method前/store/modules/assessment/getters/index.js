/**
 * getters
 * 变量命名风格：驼峰命名,直接引用state中的变量名称即可
 */
const getters = {
  getAssessmentList: state => {
    return state.assessmentList;
  },
  getTargetList: state => {
    return state.targetList;
  },
  getAssessmentResult: state => {
    return state.assessmentResult;
  },
  getAssessmentOpen: state => {
    return state.assessmentOpen;
  },
  getIndexList: state => {
    return state.indexList;
  }
};
export default getters;
