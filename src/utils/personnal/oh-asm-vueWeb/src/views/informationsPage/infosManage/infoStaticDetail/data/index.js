// 搜索栏
import {
  infoStaticSearchBtns,
  infoStaticSearchItems
} from "@/utils/formSettingsJson/search/infosManage/infoStatic/index.js";

const data = function(vm) {
  let obj = {
    showSearchForm: true,
    // 搜索栏
    infoStaticSearchItems: infoStaticSearchItems,
    searchFormGroupSettings: {
      fullScreen: false,
      formGroupList: infoStaticSearchItems,
      formGroupValues: {
        publishYear: String(new Date().getFullYear()),
        cmsChannelId: ""
      },
      formButtonList: infoStaticSearchBtns
    },
    url: ""
  };
  return obj;
};
export default data;
