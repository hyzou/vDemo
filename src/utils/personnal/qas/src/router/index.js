import Vue from "vue";
import Router from "vue-router";
import def from "../views/def";

Vue.use(Router);
// const routerPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location);
// };
// if (this.toPath) {
//   this.$router.push({ path: this.toPath });
// }

const data_table = () => import("../views/datalist/data_table");
const search_panel = () => import("../views/common/search_panel");
const data_grid = () => import("../views/common/data_grid");
const newPlan = () => import("../views/task/planReap/newPlan");
const newPlanStock = () => import("../views/task/planStock/newPlanStock");
const newPlanMarket = () => import("../views/task/planMarket/newPlanMarket");
// const standarSearch = () =>
//   import("../views/std/standardManager/standarSearch");
const standarGrid = () => import("../views/std/standardManager/standarGrid");
// const itemManagerSearch = () =>
//   import("../views/base/itemManager/itemManagerSearch");
const itemManagerGrid = () =>
  import("../views/base/itemManager/itemManagerGrid");
// const conditionManagerSearch = () =>
//   import("../views/base/conditionManager/conditionManagerSearch");
const conditionManagerGrid = () =>
  import("../views/base/conditionManager/conditionManagerGrid");
const processPanel = () =>
  import("../views/task/planSampleProcess/processPanel");
const processGrid = () => import("../views/task/planSampleProcess/processGrid");
//=====质检管理========
//===收样
const receiveSearch_panel = () =>
  import("../views/sample/receiveSample/receiveSearch_panel");
const reveiveData_grid = () =>
  import("../views/sample/receiveSample/receiveData_grid");
//已收样
const receivedSearch_panel = () =>
  import("../views/sample/receivedSample/receivedSearch_panel");
const receivedData_grid = () =>
  import("../views/sample/receivedSample/receivedData_grid");
//质检结果录入
const resultEnterData_grid = () =>
  import("../views/sample/resultEnter/resultEnterData_grid");
//质检结果审批
const resultApprovalData_grid = () =>
  import("../views/sample/resultApproval/resultApprovalData_grid");
//质检结果查看
const resultSearchIndex = () =>
  import("../views/sample/resultSearch/resultSearchIndex");
//========== 质检管理end======
//扦样管理
const sampleManagerIndex = () =>
  import("../views/task/sampleManager/sampleManagerIndex");
//扦样管理end
//==============统计管理
const statisticalChartIndex = () =>
  import("../views/statisticalAnalysis/statistical/chart/chartIndex");
const statisticalSummaryIndex = () =>
  import("../views/statisticalAnalysis/statistical/summary/summaryIndex");
const statisticalSummarySettingIndex = () =>
  import(
    "../views/statisticalAnalysis/statistical/summarySetting/settingIndex"
  );
//=============统计管理end
const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: def
    },
    {
      path: "/sampling",
      component: data_table,
      meta: {
        title: "计划管理"
      },
      children: [
        {
          path: "dataList/:id",
          name: "dataList",
          components: {
            search: search_panel,
            dataGrid: data_grid
          },
          children: [
            {
              path: "/sampling/dataList/:id",
              name: "newPlan",
              components: {
                newPlan: newPlan //新建计划
              }
            },
            {
              path: "/sampling/dataList/:id",
              name: "newPlanStock",
              components: {
                newPlanStock: newPlanStock //新建计划
              }
            },
            {
              path: "/sampling/dataList/:id",
              name: "newPlanMarket",
              components: {
                newPlanMarket: newPlanMarket //新建计划
              }
            }
          ]
        }
      ]
    },
    //质检管理
    {
      path: "/quality",
      component: data_table,
      meta: {
        title: ""
      },
      children: [
        {
          path: "receiveSample/:id",
          name: "receiveSample", //收样
          components: {
            search: receiveSearch_panel,
            dataGrid: reveiveData_grid
          },
          meta: {
            title: "样品收样"
          }
        }
      ]
    },
    //质检结果录入 因为页面不一样所以 要重新设置
    {
      path: "/quality/resultEnter/:id",
      name: "resultEnter", //结果录入
      component: resultEnterData_grid,
      meta: {
        title: "质检结果录入"
      }
    },
    //质检结果审批
    {
      path: "/quality/resultApproval/:id",
      name: "resultApproval",
      component: resultApprovalData_grid,
      meta: {
        title: "质检结果审批"
      }
    },
    //基础数据
    {
      path: "/baseManager",
      component: data_table,
      children: [
        {
          path: "standardManager/:id",
          name: "standardManager", //标准管理
          components: {
            // search: standarSearch,
            dataGrid: standarGrid
          },
          meta: {
            title: "标准管理"
          }
        },
        {
          path: "itemManager/:id",
          name: "itemManager", //指标管理
          components: {
            // search: itemManagerSearch,
            dataGrid: itemManagerGrid
          },
          meta: {
            title: "指标管理"
          }
        },
        {
          path: "criteriaTagManager/:id",
          name: "criteriaTagManager", //分类条件管理
          components: {
            // search: conditionManagerSearch,
            dataGrid: conditionManagerGrid
          },
          meta: {
            title: "分类条件管理"
          }
        }
      ]
    },
    //扦样管理

    {
      path: "/qas/sampleManager/:id",
      name: "sampleManager",
      component: sampleManagerIndex,
      meta: {
        title: "扦样管理"
      }
    },
    //====统计管理
    //统计图表
    {
      path: "/statistical/statisticalChart/:id",
      name: "statisticalChart",
      component: statisticalChartIndex,
      meta: {
        title: "统计管理",
        title2: "统计图表"
      }
    },
    //===统计汇总
    {
      path: "/statistical/statisticalSummary/:id",
      name: "statisticalSummary",
      component: statisticalSummaryIndex,
      meta: {
        title: "统计管理",
        title2: "统计汇总"
      }
    },
    {
      path: "/statistical/statisticalSummarySetting/:id",
      name: "statisticalSummarySetting",
      component: statisticalSummarySettingIndex,
      meta: {
        title: "统计管理",
        title2: "统计汇总设置"
      }
    },
    //=====统计管理end
    //====查询结果管理
    {
      path: "/sampling",
      component: data_table,
      children: [
        {
          path: "sampleProcess/:id", //进度管理
          name: "sampleProcess",
          components: {
            search: processPanel,
            dataGrid: processGrid
          },
          meta: {
            title: "进度管理"
          }
        }
      ]
    },
    {
      path: "/quality",
      component: data_table,
      children: [
        {
          path: "receivedSample/:id",
          name: "receivedSample", //已收样管理
          components: {
            search: receivedSearch_panel,
            dataGrid: receivedData_grid
          },
          meta: {
            title: "已收样管理"
          }
        }
      ]
    },
    {
      path: "/quality/resultSearch/:id",
      name: "resultSearch",
      component: resultSearchIndex,
      meta: {
        title: "质检结果查看"
      }
    }
    //=====查询结果管理end
  ]
});
export default router;
