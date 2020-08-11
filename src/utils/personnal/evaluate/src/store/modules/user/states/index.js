/**
 * state
 * 变量命名风格：驼峰命名
 */
const state = {
  userInfos: {
    userName: "",
    userId: "",
    loginName: "",
    password: ""
  },
  userName: {
    skb: "浙江省考核办",
    sk: "杭州市考核办",
    ncj: "杭州市农业农村局",
    ncc: "杭州市农业农村局农田建设管理处",
    swj: "杭州市商务局",
    swc: "杭州市商务局储备监管处"
  },
  userId: {
    skb: "1000",
    sk: "1001",
    ncj: "1002",
    ncc: "1002001",
    swj: "1003",
    swc: "1003002"
  },
  userIdForName: {
    1000: "浙江省考核办",
    1001: "杭州市考核办",
    1002: "杭州市农业农村局",
    1002001: "杭州市农业农村局农田建设管理处",
    1003: "杭州市商务局",
    1003002: "杭州市商务局储备监管处"
  },
  orgTree: [
    {
      orgId: "1002",
      orgName: "杭州市农业农村局",
      children: [
        {
          orgId: "1002001",
          orgName: "杭州市农业农村局农田建设管理处"
        }
      ]
    },
    {
      orgId: "1003",
      orgName: "杭州市商务局",
      children: [
        {
          orgId: "1003002",
          orgName: "杭州市商务局储备监管处"
        }
      ]
    }
  ]
};
export default state;
