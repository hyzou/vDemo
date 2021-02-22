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
  userId: state => {
    return state.userId;
  },
  userIdForName: state => {
    return state.userIdForName;
  },
  userIdForIdentities: state => {
    return state.userIdForIdentities;
  },
  userIdentities: state => {
    return state.userIdentities;
  },
  provinceOrgTree: state => {
    return state.provinceOrgTree;
  },
  orgTree: state => {
    return state.orgTree;
  },
  citylist: state => {
    return state.citylist;
  },
  token: state => {
    return state.token;
  },
  sysType: state => {
    return state.sysType;
  },
  asyncRouterslist: state => {
    return state.asyncRouterslist;
  },
  reportServerUrl: state => {
    return state.reportServerUrl;
  },
  fileViewerUrl: state => {
    return state.fileViewerUrl;
  }
};
export default getters;
