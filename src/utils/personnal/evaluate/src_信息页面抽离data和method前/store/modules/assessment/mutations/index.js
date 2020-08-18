/**
 * mutations
 * 方法命名：驼峰命名 setState(前缀)+appName(state中变量名)=>commitAppName
 */
const mutations = {
  setAssessmentInfo: (state, assessmentInfo) => {
    if (assessmentInfo instanceof Array) {
      state.assessmentList = assessmentInfo;
    } else if (
      typeof assessmentInfo === "object" &&
      Object.keys(assessmentInfo).length > 0
    ) {
      let assState = state.assessmentList.map(assessment => {
        if (assessment.assessmentId === assessmentInfo.assessmentId) {
          assessment = assessmentInfo;
        }
        return assessment;
      });
      state.assessmentList = assState;
    }
  },
  setTargetInfo: (state, targetInfo) => {
    if (targetInfo instanceof Array) {
      state.targetList = targetInfo;
    } else if (
      typeof targetInfo === "object" &&
      Object.keys(targetInfo).length > 0
    ) {
      let targetState = state.targetList.map(target => {
        if (target.targetId === targetInfo.targetId) {
          target = targetInfo;
        }
        return target;
      });
      state.assessmentList = targetState;
    }
  },
  setAssessmentResult: (state, assessmentInfo) => {
    let copydata = JSON.parse(JSON.stringify(assessmentInfo));
    let assessment = { ...copydata.formData },
      action = copydata.action;
    if (assessment.assessmentId) {
      if (!state.assessmentResult[assessment.assessmentId]) {
        state.assessmentResult[assessment.assessmentId] = {};
        state.assessmentResult[assessment.assessmentId][action] = {};
      }
      state.assessmentResult[assessment.assessmentId][action] = assessment;
    }
  },
  setAssessmentOpen: (state, assessmentOpen) => {
    state.assessmentOpen = assessmentOpen;
  },
  setIndexList: (state, info) => {
    let flag;
    if (state.indexList.length) {
      state.indexList.forEach((item, index) => {
        if (item.targetId === info.targetId) {
          state.indexList.splice(index, 1, info);
          flag = true;
        }
      });
      if (!flag) {
        state.indexList.push(info);
      }
    } else {
      state.indexList.push(info);
    }
  },
  deleteIndexList: (state, id) => {
    state.indexList.forEach((item, index) => {
      if (item.targetId === id) {
        state.indexList.splice(index, 1);
      }
    });
  }
};
export default mutations;
