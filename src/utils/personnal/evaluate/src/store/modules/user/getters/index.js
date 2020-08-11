/**
 * getters
 * 变量命名风格：驼峰命名,直接引用state中的变量名称即可
 */
const getters = {
  userInfos: state => {
    return state.userInfos;
  },
  userName: state => {
    return state.userName;
  },
  userIdForName: state => {
    return state.userIdForName;
  },
  orgTree: state => {
    return state.orgTree;
  },
  userText: state => {
    return state.userText;
  }
};
export default getters;
