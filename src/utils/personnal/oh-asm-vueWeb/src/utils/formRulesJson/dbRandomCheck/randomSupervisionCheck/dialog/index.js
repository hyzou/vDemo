export default {
  name: [{ required: true, message: "方案名称不能为空", trigger: "blur" }],
  year: [{ required: true, message: "年度不能为空", trigger: "blur" }],
  startDt: [{ required: true, message: "开始时间不能为空", trigger: "blur" }],
  endDt: [{ required: true, message: "结束时间不能为空", trigger: "blur" }],
  summary: [{ required: false, message: "检查总结不能为空", trigger: "blur" }],
  chkDefItemId: [
    { required: true, message: "检查事项不能为空", trigger: "change" }
  ],
  groupLeader: [{ required: true, message: "组长不能为空", trigger: "change" }],
  deputyGroupLeader: [
    { required: true, message: "副组长不能为空", trigger: "change" }
  ],
  groupMembers: [
    { required: true, message: "检查组不能为空", trigger: "change" }
  ],
  scopeTo: [
    { required: true, message: "检查最小范围不能为空", trigger: "change" }
  ],
  cityNum: [{ required: true, message: "行政市个数不能为空", trigger: "blur" }],
  countyNum: [
    { required: false, message: "区县个数不能为空", trigger: "blur" }
  ],
  townNum: [{ required: false, message: "乡/镇个数不能为空", trigger: "blur" }],
  villageNum: [{ required: false, message: "村个数不能为空", trigger: "blur" }]
};
