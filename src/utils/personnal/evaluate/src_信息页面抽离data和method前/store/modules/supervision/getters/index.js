/**
 * getters
 * 变量命名风格：驼峰命名,直接引用state中的变量名称即可
 */
const getters = {
  workProgress: state => {
    return state.workProgress;
  },
  getProgressResult: state => {
    return state.progressResult;
  }
};
export default getters;
