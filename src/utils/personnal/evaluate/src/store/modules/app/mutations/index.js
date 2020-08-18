/**
 * mutations
 * 方法命名：驼峰命名 setState(前缀)+appName(state中变量名)=>commitAppName
 */
const mutations = {
  setStateClearAllInfosList: (state, data) => {
    state.allInfosList = [];
  },
  setStateAddInfoToAllInfosList: (state, info) => {
    state.allInfosList.push({ ...info });
  },
  setStateRemoveInfoFromAllInfosList: (state, id) => {
    state.allInfosList.map((item, idx) => {
      if (item.id == id) {
        state.allInfosList.splice(idx, 1);
      }
    });
  },
  setStateEditInfoFromAllInfosList: (state, info) => {
    let existFlag = false,
      existIndex = 0;
    state.allInfosList.map((item, idx) => {
      if (item.id == info.id) {
        existFlag = true;
        existIndex = idx;
      }
    });
    if (existFlag) {
      state.allInfosList.splice(existIndex, 1, { ...info });
    } else {
      state.allInfosList.push({ ...info });
    }
  },
  setStateClearStuffList: state => {
    state.stuffList = [];
  },
  setStateAddInfoToStuffList: (state, info) => {
    state.stuffList.push({ ...info });
  },
  setStateRemoveInfoFromStuffList: (state, id) => {
    state.stuffList.map((item, idx) => {
      if (item.id == id) {
        state.stuffList.splice(idx, 1);
      }
    });
  },
  setStateEditInfoFromStuffList: (state, info) => {
    state.stuffList.map((item, idx) => {
      if (item.id == info.id) {
        state.stuffList.splice(idx, 1, { ...info });
      }
    });
  }
};
export default mutations;
