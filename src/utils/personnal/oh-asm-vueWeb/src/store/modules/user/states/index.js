/**
 * state
 * 变量命名风格：驼峰命名
 */
import citiesList from "@/utils/testJson/citiesList";
import hzCityOrgTree from "@/utils/testJson/hzCityOrgTree";
import zjProvinceOrgTree from "@/utils/testJson/zjProvinceOrgTree";
import userIdentities from "@/utils/testJson/userIdentities";

const state = {
  userInfos: {
    userName: "",
    userId: "",
    loginName: "",
    password: ""
  },
  userName: {
    skb: "浙江省考核办",
    nct: "浙江省农业农村厅",
    sk: "杭州市考核办",
    scc: "抽查组1",
    ncj: "杭州市农业农村局",
    ncc: "杭州市农业农村局农田建设管理处",
    swj: "杭州市商务局",
    swc: "杭州市商务局储备监管处"
  },
  userId: {
    skb: "1000",
    nct: "1004",
    sk: "1001",
    scc: "1005",
    ncj: "1002",
    ncc: "1002001",
    swj: "1003",
    swc: "1003002"
  },
  userIdForName: {
    1000: "浙江省考核办",
    1004: "浙江省农业农村厅",
    1001: "杭州市考核办",
    1005: "抽查组1",
    1002: "杭州市农业农村局",
    1002001: "杭州市农业农村局农田建设管理处",
    1003: "杭州市商务局",
    1003002: "杭州市商务局储备监管处"
  },
  userIdForIdentities: {
    1000: "provinceIdList",
    1004: "provinceIdList",
    1001: "cityIdList",
    1005: "cityIdList",
    1002: "cityIdList",
    1002001: "cityIdList",
    1003: "cityIdList",
    1003002: "cityIdList"
  },
  userIdentities: userIdentities,
  provinceOrgTree: zjProvinceOrgTree,
  orgTree: hzCityOrgTree,
  citylist: citiesList,
  token: "",
  sysType: "",
  asyncRouterslist: [],
  reportServerUrl: "",
  fileViewerUrl: ""
};
export default state;
