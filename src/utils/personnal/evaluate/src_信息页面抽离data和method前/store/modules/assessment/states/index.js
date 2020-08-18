/**
 * state
 * 变量命名风格：驼峰命名
 */
import { assessmentBaseData } from "@/utils/testJson/assessment/previewExport";
import { targetBaseData } from "@/utils/testJson/targetManage/targetManage";
import cityScoreList from "@/utils/testJson/assessment/cityScoreList";
const state = {
  cityScoreList: cityScoreList,
  assessmentList: assessmentBaseData,
  assessmentResult: {},
  assessmentOpen: {},
  targetList: targetBaseData,
  indexList: targetBaseData
};
export default state;
