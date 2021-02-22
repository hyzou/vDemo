import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export const staticRouterMap = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/404",
    component: () => import("@/views/404")
  },
  {
    path: "/login",
    hidden: false,
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/choseSystem",
    name: "choseSystem",
    hidden: false,
    component: () => import("@/views/choseSystem")
  }
];

export const asyncRouterMap = [
  {
    path: "/informationsPage",
    hidden: false,
    name: "informationsPage",
    component: () => import("@/views/informationsPage/index"),
    redirect: "/informationsPage/homePage",
    children: []
  }
];
export const asyncRouterChildren = [
  {
    path: "/informationsPage/homePage",
    name: "homePage",
    hidden: false,
    component: () => import("@/views/informationsPage/homePage"),
    meta: {
      title: "门户首页",
      icon: "iconkucunjianguan fontSize20"
    }
  },
  {
    path: "/informationsPage/infosManage/infosManageDetail",
    hidden: true,
    name: "infosManageDetail",
    component: () =>
      import("@/views/informationsPage/infosManage/infosManageDetail"),
    meta: {
      title: "信息详情",
      icon: "iconkucunjianguan fontSize20"
    }
  },
  {
    path: "/informationsPage/modules/decisionAnalysis/index",
    hidden: true,
    name: "decisionAnalysisindex",
    component: () =>
      import("@/views/informationsPage/modules/decisionAnalysis"),
    children: [
      {
        path:
          "/informationsPage/modules/decisionAnalysis/provinceKpiDataOverview",
        hidden: true,
        name: "provinceKpiDataOverview",
        component: () =>
          import(
            "@/views/informationsPage/modules/decisionAnalysis/provinceKpiDataOverview"
          )
      },
      {
        path:
          "/informationsPage/modules/decisionAnalysis/provinceKpiDataMakeUp",
        hidden: true,
        name: "provinceKpiDataMakeUp",
        component: () =>
          import(
            "@/views/informationsPage/modules/decisionAnalysis/provinceKpiDataMakeUp"
          )
      }
    ]
  }
];

export const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: staticRouterMap
  });
const router = createRouter();
export default router;
