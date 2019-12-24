import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// import Home from "../views/Home.vue";

export const staticRouterMap = [
  {
    path: "/",
    redirect: "/informationsPage"
  },
  {
    path: "/404",
    component: () => import("@/views/404")
  },
  {
    path: "/informationsPage",
    hidden: false,
    name: "informationsPage",
    component: () => import("@/views/informationsPage/index"),
    redirect: "/informationsPage/informationHomePage",
    children: [
      {
        path: "/informationsPage/informationHomePage",
        hidden: false,
        component: () => import("@/views/informationsPage/informationHomePage"),
        meta: {
          title: "网站首页"
        }
      },
      {
        path: "/informationsPage/informationDetailListPage",
        name: "informationsPage/informationDetailListPage",
        hidden: true,
        component: () =>
          import("@/views/informationsPage/informationDetailListPage"),
        meta: {
          title: "列表"
        }
      },
      {
        path: "/informationsPage/informationDetailPage",
        name: "informationsPage/informationDetailPage",
        hidden: true,
        component: () =>
          import("@/views/informationsPage/informationDetailPage"),
        meta: {
          title: "详情"
        }
      },
      {
        path: "/informationsPage/contractUs",
        hidden: false,
        name: "informationsPage/contractUs",
        component: () => import("@/views/informationsPage/contractUs"),
        meta: {
          title: "联系我们"
        }
      },
      {
        path: "/informationsPage/signUp",
        hidden: true,
        name: "informationsPage/signUp",
        component: () => import("@/views/informationsPage/signUp"),
        meta: {
          title: "会员注册"
        }
      },
      {
        path: "/informationsPage/login",
        hidden: true,
        name: "informationsPage/login",
        component: () => import("@/views/informationsPage/login"),
        meta: {
          title: "登陆"
        }
      }
    ]
  }
];

// 管理员菜单
export const asyncRouterMap_Manager = [
  {
    path: "/managePage",
    name: "managePage",
    component: () => import("@/views/managePage/index"),
    redirect: "/managePage/base",
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/managePage/base",
        hidden: false,
        name: "base",
        redirect: "/managePage/base/demoMng",
        component: () => import("@/views/managePage/base"),
        meta: {
          title: "一级页面"
        },
        children: [
          {
            path: "/managePage/base/demoMng",
            hidden: false,
            name: "demoMng",
            redirect: "/managePage/base/demoMng/pageSet",
            component: () => import("@/views/managePage/base/demoMng"),
            meta: {
              title: "二级页面"
            },
            children: [
              {
                path: "/managePage/base/demoMng/pageSet",
                hidden: false,
                name: "pageSet",
                component: () =>
                  import("@/views/managePage/base/demoMng/pageSet"),
                meta: {
                  title: "页面结构"
                }
              },
              {
                path: "/managePage/base/demoMng/nameRules",
                hidden: false,
                name: "nameRules",
                component: () =>
                  import("@/views/managePage/base/demoMng/nameRules"),
                meta: {
                  title: "命名方式定义"
                }
              }
            ]
          },
          {
            path: "/managePage/base/baseMng",
            hidden: false,
            name: "baseMng",
            redirect: "/managePage/base/baseMng/axios",
            component: () => import("@/views/managePage/base/baseMng"),
            meta: {
              title: "应用基础封装"
            },
            children: [
              {
                path: "/managePage/base/baseMng/axios",
                hidden: false,
                name: "axios",
                component: () =>
                  import("@/views/managePage/base/baseMng/axios"),
                meta: {
                  title: "axios数据请求"
                }
              },
              {
                path: "/managePage/base/baseMng/router",
                hidden: false,
                name: "router",
                component: () =>
                  import("@/views/managePage/base/baseMng/router"),
                meta: {
                  title: "router路由定义"
                }
              },
              {
                path: "/managePage/base/baseMng/vuex",
                name: "vuex",
                component: () => import("@/views/managePage/base/baseMng/vuex"),
                meta: {
                  title: "vuex方法定义"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/managePage/components",
        hidden: false,
        name: "components",
        redirect: "/managePage/components/introduction",
        component: () => import("@/views/managePage/components"),
        meta: {
          title: "各组件使用方法"
        },
        children: [
          {
            path: "/managePage/components/introduction",
            name: "introduction",
            hidden: false,
            component: () =>
              import("@/views/managePage/components/introduction"),
            meta: {
              title: "组件介绍"
            }
          },
          {
            path: "/managePage/components/formGroup",
            name: "formGroup",
            hidden: false,
            component: () => import("@/views/managePage/components/formGroup"),
            meta: {
              title: "* formGroup 表单组件"
            }
          },
          {
            path: "/managePage/components/dialog",
            name: "dialog",
            hidden: false,
            component: () => import("@/views/managePage/components/dialog"),
            meta: {
              title: "* dialog 弹窗(自带和eleUI)"
            }
          },
          {
            path: "/managePage/components/siderNav",
            name: "siderNav",
            hidden: false,
            component: () => import("@/views/managePage/components/siderNav"),
            meta: {
              title: "* siderNav 菜单导航"
            }
          },
          {
            path: "/managePage/components/tabCard",
            name: "tabCard",
            hidden: false,
            component: () => import("@/views/managePage/components/tabCard"),
            meta: {
              title: "* tabCard 标签卡"
            }
          },
          {
            path: "/managePage/components/tableList",
            name: "tableList",
            hidden: false,
            component: () => import("@/views/managePage/components/tableList"),
            meta: {
              title: "* tableList table表格"
            }
          },
          {
            path: "/managePage/components/tree",
            name: "tree",
            hidden: false,
            component: () => import("@/views/managePage/components/tree"),
            meta: {
              title: "* tree 树"
            }
          },
          {
            path: "/managePage/components/carouselBanner",
            name: "carouselBanner",
            hidden: false,
            component: () =>
              import("@/views/managePage/components/carouselBanner"),
            meta: {
              title: "* carouselBanner 轮播图"
            }
          },
          {
            path: "/managePage/components/operateButtonsGroup",
            name: "operateButtonsGroup",
            hidden: false,
            component: () =>
              import("@/views/managePage/components/operateButtonsGroup"),
            meta: {
              title: "* operateButtonsGroup 按钮组"
            }
          },
          {
            path: "/managePage/components/pagination",
            name: "pagination",
            hidden: false,
            component: () => import("@/views/managePage/components/pagination"),
            meta: {
              title: "* pagination 分页器*"
            }
          },
          // {
          //   path: "/managePage/components/inputTable",
          //   name: "inputTable",
          //   hidden: false,
          //   component: () => import("@/views/managePage/components/inputTable"),
          //   meta: {
          //     title: "inputTable 可编辑table"
          //   }
          // }
          {
            path: "/managePage/components/card",
            name: "card",
            hidden: false,
            component: () => import("@/views/managePage/components/card"),
            meta: {
              title: "card 带标题卡片"
            }
          },
          {
            path: "/managePage/components/idCard",
            name: "idCard",
            hidden: false,
            component: () => import("@/views/managePage/components/idCard"),
            meta: {
              title: "idCard 身份卡"
            }
          },
          {
            path: "/managePage/components/breadCrumb",
            name: "breadCrumb",
            hidden: false,
            component: () => import("@/views/managePage/components/breadCrumb"),
            meta: {
              title: "breadCrumb 面包屑"
            }
          },
          {
            path: "/managePage/components/commonTitleWithBorder",
            name: "commonTitleWithBorder",
            hidden: false,
            component: () =>
              import("@/views/managePage/components/commonTitleWithBorder"),
            meta: {
              title: "commonTitleWithBorder 带下边框的标题"
            }
          },
          {
            path: "/managePage/components/paragraph",
            name: "paragraph",
            hidden: false,
            component: () => import("@/views/managePage/components/paragraph"),
            meta: {
              title: "paragraph 段落"
            }
          },
          {
            path: "/managePage/components/friendlink",
            name: "friendlink",
            hidden: false,
            component: () => import("@/views/managePage/components/friendlink"),
            meta: {
              title: "friendlink 友情链接"
            }
          },
          {
            path: "/managePage/components/headerBar",
            name: "headerBar",
            hidden: false,
            component: () => import("@/views/managePage/components/headerBar"),
            meta: {
              title: "headerBar 页眉"
            }
          },
          {
            path: "/managePage/components/footBar",
            name: "footBar",
            hidden: false,
            component: () => import("@/views/managePage/components/footBar"),
            meta: {
              title: "footBar 页脚"
            }
          },
          {
            path: "/managePage/components/echarts",
            name: "echarts",
            hidden: false,
            component: () => import("@/views/managePage/components/echarts"),
            meta: {
              title: "echarts 图表"
            }
          }
        ]
      },
      {
        path: "/managePage/less",
        hidden: false,
        name: "less",
        redirect: "/managePage/less/less",
        component: () => import("@/views/managePage/less"),
        meta: {
          title: "less使用方法"
        },
        children: [
          {
            path: "/managePage/less/less",
            name: "lessMng",
            hidden: false,
            component: () => import("@/views/managePage/less/less"),
            meta: {
              title: "less 定义使用"
            }
          }
        ]
      }
    ]
  }
];

// 会员菜单
export const asyncRouterMap_Member = [
  {
    path: "/memberPage",
    name: "memberPage",
    component: () => import("@/views/memberPage/index"),
    redirect: "/memberPage/memberDataMng",
    children: [
      {
        path: "/memberPage/memberDataMng",
        name: "memberDataMng",
        redirect: "/memberPage/memberDataMng/memberInfoMng",
        component: () => import("@/views/memberPage/memberDataMng"),
        meta: {
          title: "会员资料管理",
          icon: "el-icon-user-solid"
        },
        children: [
          {
            path: "/memberPage/memberDataMng/memberInfoMng",
            component: () =>
              import("@/views/memberPage/memberDataMng/memberInfoMng"),
            meta: {
              title: "会员信息管理"
            }
          }
        ]
      }
    ]
  }
];
// 委托方菜单
export const asyncRouterMap_Client = [
  {
    path: "/memberPage",
    name: "memberPage",
    component: () => import("@/views/memberPage/index"),
    redirect: "/memberPage/memberDataMng",
    children: [
      {
        path: "/memberPage/memberDataMng",
        name: "memberDataMng",
        redirect: "/memberPage/memberDataMng/memberInfoMng",
        component: () => import("@/views/memberPage/memberDataMng"),
        meta: {
          title: "客户端资料管理",
          icon: "el-icon-user-solid"
        },
        children: [
          {
            path: "/memberPage/memberDataMng/memberInfoMng",
            component: () =>
              import("@/views/memberPage/memberDataMng/memberInfoMng"),
            meta: {
              title: "客户端资料管理"
            }
          }
        ]
      }
    ]
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  // mode: "history", // 去掉路由地址的#
  routes: staticRouterMap
});
