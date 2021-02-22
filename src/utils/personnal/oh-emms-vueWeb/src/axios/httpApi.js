import baseApi from "./apiModules/base";
import userApi from "./apiModules/user";
import certifySetting from "./apiModules/certifySetting";
import planApi from "./apiModules/plan";
import common from "./apiModules/common";
import reportSetting from "./apiModules/reportSetting";
import globalVariables from "./global_variable";
/**
 * 接口列表
 *  */
const apiInterface = {
  // 报表
  reportServer:
    window.location.origin +
    `/${globalVariables.projectName}/ReportServer?contextpath=`,
  // 通用接口
  ...common,
  // 基础数据
  ...baseApi,
  // 登录验证
  ...userApi,
  // 单证管理
  ...certifySetting,
  // 计划管理
  ...planApi,
  // 报表管理
  ...reportSetting
};

export default apiInterface;
