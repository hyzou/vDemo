/**
 * state
 * 变量命名风格：驼峰命名
 */
import { assessmentBaseData } from "@/utils/testJson/assessment/previewExport";
import menuTree from "@/utils/testJson/menuTree";
import targetTreeData from "@/utils/testJson/targetManage/targetTreeData";
import specialTargetTreeData from "@/utils/testJson/targetManage/specialTargetTreeData";

import { targetBaseData } from "@/utils/testJson/targetManage/targetManage";
import targetlist from "@/utils/testJson/targetManage/targetlist";
import specialTargetlist from "@/utils/testJson/targetManage/specialTargetlist";
import specialTargetTreeDemoData from "@/utils/testJson/targetManage/specialTargetTreeDemoData";
import cityScoreList from "@/utils/testJson/assessment/cityScoreList";
import orgTreeData from "@/utils/testJson/orgTreeManage/orgTreeData";

const state = {
  assessmentBaseData: assessmentBaseData,
  chosedItemDetaillist: {},
  cityScoreList: cityScoreList,
  assessmentList: targetlist,
  assessmentResult: {},
  specialAssessmentList: specialTargetlist,
  specialAssessmentResult: {},
  assessmentOpen: {},
  specialAssessmentOpen: {},
  targetList: targetlist,
  specialTargetList: specialTargetlist,
  targetTreeList: targetTreeData,
  menuTreeList: menuTree,
  specialTargetTreeData: specialTargetTreeData,
  indexList: targetBaseData,
  orgTreeList: orgTreeData,
  specialTargetTreeDemoData: specialTargetTreeDemoData
};
export default state;
