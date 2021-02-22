/**
 * mutations
 * 方法命名：驼峰命名 setState(前缀)+appName(state中变量名)=>commitAppName
 */
const mutations = {
  setWorkProgress(state, info) {
    let flag;
    if (state.workProgress.length) {
      state.workProgress.forEach((item, index) => {
        if (item.id === info.id) {
          state.workProgress.splice(index, 1, info);
          flag = true;
        }
      });
      if (!flag) {
        state.workProgress.push(info);
      }
    } else {
      state.workProgress.push(info);
    }
  },
  deleteWorkProgress(state, id) {
    state.workProgress.forEach((item, index) => {
      if (item.id === id) {
        state.workProgress.splice(index, 1);
      }
    });
  },
  setProgressResult(state, info) {
    let copydata = JSON.parse(JSON.stringify(info));
    let progressResult = { ...copydata.formData },
      action = copydata.action;
    if (progressResult.targetId) {
      if (!state.progressResult[progressResult.targetId]) {
        state.progressResult[progressResult.targetId] = {};
        state.progressResult[progressResult.targetId][action] = {};
      }
      state.progressResult[progressResult.targetId][action] = progressResult;
    }
  },
  setSpecialProgressResult(state, info) {
    let copydata = JSON.parse(JSON.stringify(info));
    let progressResult = { ...copydata.formData },
      action = copydata.action;
    if (progressResult.targetId) {
      if (!state.specialProgressResult[progressResult.targetId]) {
        state.specialProgressResult[progressResult.targetId] = {};
        state.specialProgressResult[progressResult.targetId][action] = {};
      }
      state.specialProgressResult[progressResult.targetId][
        action
      ] = progressResult;
    }
  }
};
export default mutations;
