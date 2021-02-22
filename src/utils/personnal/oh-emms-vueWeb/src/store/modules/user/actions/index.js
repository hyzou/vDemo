import router, {
  staticRouterMap,
  asyncRouterMap,
  asyncRouterChildren,
  createRouter
} from "@/router/index";
import { initRouter } from "@/router/initRouter";
import api from "@/axios/httpApi";
import axios from "@/axios";
import globalFncs from "@/utils/globalFunctions";

/**
 * actions
 * 方法命名：驼峰命名 commit(前缀)+appName(state中变量名)=>commitAppName
 */
const actions = {
  // 获取用户信息
  commitUserSession({ commit }) {
    return new Promise(relsove => {
      axios({ url: api.getUserSession_user, method: "get" }, {}).then(
        sessionData => {
          commit("setStateUserInfos", sessionData.data);
          relsove();
        }
      );
    });
  },
  // 获取资源控制按钮信息
  commitUserButtons({ commit }) {
    return new Promise(relsove => {
      let userButtons = [
        { buttonId: "menu_1" },
        { buttonId: "menu_2" },
        { buttonId: "menu_3" },
        { buttonId: "menu_4" }
      ];
      commit("setUserButtons", userButtons);
      relsove();
      // 接口获取资源控制按钮
      // axios({ url: api.getUserSession_user, method: "get" }, {}).then(
      //   sessionData => {
      //     commit("setUserButtons", sessionData.data);
      //     relsove();
      //   }
      // );
    });
  },
  // 获取通用基础信息
  commitBaseInfos({ commit }) {
    return new Promise(relsove => {
      let baseInfosObj = {};
      getBaseInfos();

      async function getBaseInfos() {
        // 获取组织结构树
        await axios({ url: api.getOrgList, method: "get" }, {}).then(
          orgList => {
            baseInfosObj.orgList = orgList;
          }
        );
        // 获取物资类别树
        await axios(
          { url: api.getMaterialTypeTree, method: "get" },
          {
            disabled: "N"
          }
        ).then(materialTypeList => {
          let materialTypeRootList = [
            {
              children: materialTypeList.data,
              disabled: "N",
              id: "0",
              parentId: null,
              state: "open",
              text: "物资类别",
              treeLevel: "0"
            }
          ];
          baseInfosObj.materialTypeList = materialTypeRootList;
        });
        // 获取 计量单位
        await axios({ url: api.getUnitSelect, method: "get" }, {}).then(
          unitList => {
            unitList.data.forEach(item => {
              if (item.disabled === "Y") {
                item.disabled = true;
              }
            });
            baseInfosObj.unitList = globalFncs.arrayToFormDropdown(
              unitList.data,
              "name",
              "emmsBasUnitId"
            );
          }
        );
        // 获取供应商列表
        await axios(
          { url: api.getEnableSupplierList_common, method: "get" },
          { disabled: "N" }
        ).then(supplierList => {
          baseInfosObj.supplierList = globalFncs.arrayToFormDropdown(
            supplierList.data,
            "name",
            "emmsBasSupplierId"
          );
        });
        // 获取入库单的来源类型
        await axios(
          { url: api.dictList_common, method: "get" },
          { _refKey: "dict", busintypeid: "emms_doc_source_type1" }
        ).then(xhr => {
          baseInfosObj.sourceTypeList = globalFncs.arrayToFormDropdown(
            xhr,
            "text",
            "value"
          );
        });
        // 获取出库单库单的来源类型
        await axios(
          { url: api.dictList_common, method: "get" },
          { _refKey: "dict", busintypeid: "emms_doc_source_type2" }
        ).then(xhr => {
          baseInfosObj.outSourceTypeList = globalFncs.arrayToFormDropdown(
            xhr,
            "text",
            "value"
          );
        });
        // 获取储备性质
        await axios(
          { url: api.dictList_common, method: "get" },
          { _refKey: "dict", busintypeid: "wms_store_grainproperty" }
        ).then(xhr => {
          baseInfosObj.grainpropertyList = globalFncs.arrayToFormDropdown(
            xhr,
            "text",
            "value"
          );
        });
        // 获取单据类型
        await axios(
          { url: api.dictList_common, method: "get" },
          { _refKey: "dict", busintypeid: "emms_doc_inout_type" }
        ).then(xhr => {
          baseInfosObj.inoutTypeList = globalFncs.arrayToFormDropdown(
            xhr,
            "text",
            "value"
          );
        });
        await commit("setBaseInfos", baseInfosObj);
        await relsove();
      }
    });
  },
  // 清空路由表
  commitClearRouter({ commit }) {
    commit("setAsyncRouterslist", []);
  },
  // 组建路由表
  commitMenuTree({ commit }) {
    return new Promise(relsove => {
      axios({ url: api.getMenuTreeByUser_common, method: "get" }, {}).then(
        menuData => {
          console.log(menuData, "router");
          // let asyncRouter = initRouter(menuData[0].children[0].children);
          // let newObj = asyncRouterChildren.concat(asyncRouter);
          // let newAsync = asyncRouterMap,
          //   notFound = {
          //     path: "*",
          //     redirect: "/404",
          //     hidden: true
          //   };
          // newAsync[0].children = newObj;
          // newAsync.push(notFound);
          // staticRouterMap.push(newAsync[0]);
          // staticRouterMap.push(notFound);
          // router.matcher = createRouter().matcher;
          // router.addRoutes(newAsync);
          // commit("setAsyncRouterslist", menuData);
          relsove(menuData);
        }
      );
    });
  },
  // 获取用户信息
  commitUserInfos({ commit }, userInfos) {
    return new Promise(relsove => {
      commit("setStateUserInfos", userInfos);
      relsove();
    });
  },
  // 清空用户信息
  commitClearUserInfos({ commit }) {
    return new Promise(relsove => {
      commit("setStateClearUserInfos");
      relsove();
    });
  },
  // 获取token信息
  commitToken({ commit }, data) {
    return new Promise(relsove => {
      commit("setStateToken", data);
      relsove();
    });
  },
  // 清除token信息
  commitClearToken({ commit }) {
    return new Promise(relsove => {
      commit("setStateClearToken");
      relsove();
    });
  }
};
export default actions;
