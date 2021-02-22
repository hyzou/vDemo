/**
 * getters
 * 变量命名风格：驼峰命名,直接引用state中的变量名称即可
 */
const getters = {
  assessmentBaseData: state => {
    return state.assessmentBaseData;
  },
  chosedItemDetaillist: state => {
    return state.chosedItemDetaillist;
  },
  getAssessmentList: state => {
    return state.assessmentList;
  },
  getSpecialAssessmentList: state => {
    return state.specialAssessmentList;
  },
  getTargetList: state => {
    return state.targetList;
  },
  getSpecialTargetList: state => {
    return state.specialTargetList;
  },
  menuTreeList: state => {
    return state.menuTreeList;
  },
  targetTreeList: state => {
    return state.targetTreeList;
  },
  specialTargetTreeData: state => {
    return state.specialTargetTreeData;
  },
  specialTargetTreeDemoData: state => {
    return state.specialTargetTreeDemoData;
  },
  orgTreeList: state => {
    return state.orgTreeList;
  },
  getAssessmentResult: state => {
    return state.assessmentResult;
  },
  getSpecialAssessmentResult: state => {
    return state.specialAssessmentResult;
  },
  getAssessmentOpen: state => {
    return state.assessmentOpen;
  },
  getSpecialAssessmentOpen: state => {
    return state.specialAssessmentOpen;
  },
  getIndexList: state => {
    return state.indexList;
  }
};
export default getters;
