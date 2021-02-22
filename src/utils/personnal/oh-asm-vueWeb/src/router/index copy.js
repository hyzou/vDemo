import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

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
    path: "/signUp",
    hidden: false,
    name: "signUp",
    component: () => import("@/views/signUp")
  },
  {
    path: "/informationsPage",
    hidden: false,
    name: "informationsPage",
    component: () => import("@/views/informationsPage/index"),
    redirect: "/informationsPage/homePage",
    children: [
      {
        path: "/informationsPage/homePage",
        name: "homePage",
        hidden: false,
        component: () => import("@/views/informationsPage/homePage"),
        meta: {
          title: "门户首页"
        }
      },
      {
        path: "/informationsPage/infosManage",
        name: "infosManage",
        hidden: false,
        redirect: "/informationsPage/infosManage/indexInfosDistribution",
        component: () => import("@/views/informationsPage/infosManage"),
        meta: {
          title: "信息管理"
        },
        children: [
          {
            path: "/informationsPage/infosManage/indexInfosDistribution",
            name: "indexInfosDistribution",
            hidden: true,
            component: () =>
              import(
                "@/views/informationsPage/infosManage/allInfos/workReports"
              ),
            meta: {
              title: "信息报送"
            }
          },
          {
            path: "/informationsPage/infosManage/setNewInfo",
            name: "setNewInfo",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/infosManage/setNewInfo"),
            meta: {
              title: "新建信息",
              icon: "el-icon-edit-outline"
            }
          },
          {
            path: "/informationsPage/infosManage/stuff",
            name: "stuff",
            hidden: false,
            component: () =>
              import(
                "@/views/informationsPage/infosManage/allInfos/workReports"
              ),
            meta: {
              title: "草稿箱",
              icon: "el-icon-document-remove"
            }
          },
          {
            path: "/informationsPage/infosManage/allInfos",
            name: "allInfos",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/infosManage/allInfos"),
            meta: {
              title: "所有信息",
              icon: "el-icon-folder"
            },
            children: [
              {
                path: "/informationsPage/infosManage/allInfos/notification",
                name: "notification",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/infosManage/allInfos/workReports"
                  ),
                meta: {
                  title: "通知公告"
                }
              },
              {
                path: "/informationsPage/infosManage/allInfos/dataDownload",
                name: "dataDownload",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/infosManage/allInfos/workReports"
                  ),
                meta: {
                  title: "资料下载"
                }
              },
              {
                path: "/informationsPage/infosManage/allInfos/dynamic",
                name: "dynamic",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/infosManage/allInfos/workReports"
                  ),
                meta: {
                  title: "工作动态"
                }
              },
              {
                path: "/informationsPage/infosManage/allInfos/inspectionFile",
                name: "inspectionFile",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/infosManage/allInfos/workReports"
                  ),
                meta: {
                  title: "考核文件"
                }
              },
              {
                path:
                  "/informationsPage/infosManage/allInfos/infosDistribution",
                name: "infosDistribution",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/infosManage/allInfos/workReports"
                  ),
                meta: {
                  title: "信息报送"
                }
              },
              {
                path: "/informationsPage/infosManage/allInfos/inspectionReport",
                name: "inspectionReport",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/infosManage/allInfos/workReports"
                  ),
                meta: {
                  title: "考核通报"
                }
              }
            ]
          },
          {
            path: "/informationsPage/infosManage/myIssue",
            name: "myIssue",
            hidden: false,
            component: () =>
              import(
                "@/views/informationsPage/infosManage/allInfos/workReports"
              ),
            meta: {
              title: "我的发布",
              icon: "el-icon-document-checked"
            }
          },
          {
            path: "/informationsPage/infosManage/myCheckout",
            name: "myCheckout",
            hidden: store.getters["user/userInfos"].userId !== "1000",
            component: () =>
              import(
                "@/views/informationsPage/infosManage/allInfos/workReports"
              ),
            meta: {
              title: "待我审核",
              icon: "el-icon-document-checked"
            }
          },
          {
            path: "/informationsPage/infosManage/infosManageDetail",
            name: "infosManageDetail",
            hidden: true,
            component: () =>
              import("@/views/informationsPage/infosManage/infosManageDetail"),
            meta: {
              title: "信息详情",
              icon: "el-icon-document-checked"
            }
          }
        ]
      },
      {
        path: "/informationsPage/targetManage",
        name: "targetManage",
        hidden:
          store.getters["user/userInfos"].userId === "1000" ||
          store.getters["user/userInfos"].userId === "1001" ||
          store.getters["user/userInfos"].userId === "1004"
            ? false
            : true,
        redirect:
          store.getters["user/userInfos"].userId === "1000"
            ? "/informationsPage/targetManage/targetSetManage/checkTargetMng"
            : store.getters["user/userInfos"].userId === "1001"
            ? "/informationsPage/targetManage/targetConsultation/suggestConsultation"
            : "/informationsPage/targetManage/targetConsultation/officeConsultation",
        component: () => import("@/views/informationsPage/targetManage"),
        meta: {
          title: "考核方案"
        },
        children: [
          {
            path: "/informationsPage/targetManage/process",
            name: "process",
            hidden: true,
            component: () =>
              import("@/views/informationsPage/targetManage/process"),
            meta: {
              title: "指标管理主页面"
            }
          },
          {
            path: "/informationsPage/targetManage/targetSetManage",
            name: "targetSetManage",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ? false : true,
            component: () =>
              import("@/views/informationsPage/targetManage/targetSetManage"),
            meta: {
              title: "考核方案",
              icon: "el-icon-setting"
            },
            children: [
              {
                path:
                  "/informationsPage/targetManage/targetSetManage/checkTargetMng",
                name: "checkTargetMng",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/targetManage/targetSetManage/checkTargetMng"
                  ),
                meta: {
                  title: "年度考核方案"
                }
              },
              {
                path:
                  "/informationsPage/targetManage/targetSetManage/specialTargetMng",
                name: "specialTargetMng",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/targetManage/targetSetManage/specialTargetMng"
                  ),
                meta: {
                  title: "专项考核方案"
                }
              }
            ]
          },
          {
            path: "/informationsPage/targetManage/targetConsultation",
            name: "targetConsultation",
            hidden: false,
            component: () =>
              import(
                "@/views/informationsPage/targetManage/targetConsultation"
              ),
            meta: {
              title: "指标征询",
              icon: "el-icon-notebook-2"
            },
            children: [
              {
                path:
                  "/informationsPage/targetManage/targetConsultation/suggestConsultationSummary",
                name: "suggestConsultationSummary",
                hidden:
                  store.getters["user/userInfos"].userId === "1000"
                    ? false
                    : true,
                component: () =>
                  import(
                    "@/views/informationsPage/targetManage/targetConsultation/suggestConsultationSummary"
                  ),
                meta: {
                  title: "意见征询汇总"
                }
              },
              // {
              //   path:
              //     "/informationsPage/targetManage/targetConsultation/suggestSetSummary",
              //   name: "suggestSetSummary",
              //   hidden:
              //     store.getters["user/userInfos"].userId === "1000"
              //       ? false
              //       : true,
              //   component: () =>
              //     import(
              //       "@/views/informationsPage/targetManage/targetConsultation/suggestSetSummary"
              //     ),
              //   meta: {
              //     title: "市级建言献策汇总"
              //   }
              // },
              {
                path:
                  "/informationsPage/targetManage/targetConsultation/officeConsultation",
                name: "officeConsultation",
                hidden:
                  store.getters["user/userInfos"].userId === "1004"
                    ? false
                    : true,
                component: () =>
                  import(
                    "@/views/informationsPage/targetManage/targetConsultation/officeConsultation"
                  ),
                meta: {
                  title: "意见征询"
                }
              },
              {
                path:
                  "/informationsPage/targetManage/targetConsultation/suggestConsultation",
                name: "suggestConsultation",
                hidden:
                  store.getters["user/userInfos"].userId === "1001"
                    ? false
                    : true,
                component: () =>
                  import(
                    "@/views/informationsPage/targetManage/targetConsultation/suggestConsultation"
                  ),
                meta: {
                  title: "意见征询"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/informationsPage/supervision",
        name: "supervision",
        redirect:
          store.getters["user/userInfos"].userId === "1000"
            ? "/informationsPage/supervision/progressAccountSummary"
            : store.getters["user/userInfos"].userId === "1001"
            ? "/informationsPage/supervision/reviewProgress"
            : store.getters["user/userInfos"].userId === "1004"
            ? "/informationsPage/supervision/progressItemAccount"
            : "/informationsPage/supervision/progressAccount/department",
        component: () => import("@/views/informationsPage/supervision"),
        hidden: store.getters["user/userInfos"].userId === "1005",
        meta: {
          title: "日常监督"
        },
        children: [
          {
            path: "/informationsPage/supervision/process",
            name: "process",
            hidden: true,
            component: () =>
              import("@/views/informationsPage/supervision/process"),
            meta: {
              title: "日常监督主页面"
            }
          },
          {
            path: "/informationsPage/supervision/progressAccountSummary",
            name: "progressAccountSummary",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ? false : true,
            component: () =>
              import("@/views/informationsPage/infosManage/allInfos"),
            meta: {
              title: "考核办落实考核进展",
              icon: "el-icon-document-copy"
            },
            children: [
              {
                path: "/informationsPage/supervision/progressAccountSummary",
                name: "progressAccountSummary",
                hidden:
                  store.getters["user/userInfos"].userId === "1000"
                    ? false
                    : true,
                component: () =>
                  import(
                    "@/views/informationsPage/supervision/progressAccountSummary"
                  ),
                meta: {
                  title: "地方考核办落实年度考核进展情况",
                  icon: "el-icon-document-copy"
                }
              }
              // {
              //   path:
              //     "/informationsPage/supervision/specialProgressAccountSummary",
              //   name: "specialProgressAccountSummary",
              //   hidden:
              //     store.getters["user/userInfos"].userId === "1000"
              //       ? false
              //       : true,
              //   component: () =>
              //     import(
              //       "@/views/informationsPage/supervision/progressAccountSummary"
              //     ),
              //   meta: {
              //     title: "地方考核办落实专项考核进展情况",
              //     icon: "el-icon-document-copy"
              //   }
              // }
            ]
          },
          {
            path: "/informationsPage/supervision/progressItemAccount",
            name: "progressItemAccount",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ||
              store.getters["user/userInfos"].userId === "1004"
                ? false
                : true,
            component: () =>
              import("@/views/informationsPage/infosManage/allInfos"),
            meta: {
              title: "指标落实进展台账",
              icon: "el-icon-document-copy"
            },
            children: [
              {
                path: "/informationsPage/supervision/progressItemAccount",
                name: "progressItemAccount",
                hidden:
                  store.getters["user/userInfos"].userId === "1000" ||
                  store.getters["user/userInfos"].userId === "1004"
                    ? false
                    : true,
                component: () =>
                  import(
                    "@/views/informationsPage/supervision/progressItemAccount"
                  ),
                meta: {
                  title: "年度指标落实进展台账",
                  icon: "el-icon-document-copy"
                }
              },
              {
                path:
                  "/informationsPage/supervision/progressSpecialItemAccount",
                name: "progressSpecialItemAccount",
                hidden:
                  store.getters["user/userInfos"].userId === "1000" ||
                  store.getters["user/userInfos"].userId === "1004"
                    ? false
                    : true,
                component: () =>
                  import(
                    "@/views/informationsPage/supervision/progressSpecialItemAccount"
                  ),
                meta: {
                  title: "专项指标落实进展台账",
                  icon: "el-icon-document-copy"
                }
              }
            ]
          },

          {
            path: "/informationsPage/supervision/provinceProgressItemAccount",
            name: "provinceProgressItemAccount",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ? false : true,
            component: () =>
              import(
                "@/views/informationsPage/supervision/provinceProgressItemAccount"
              ),
            meta: {
              title: "省长考核指标进展台账",
              icon: "el-icon-document-copy"
            }
          },
          {
            path:
              "/informationsPage/supervision/provinceProgressItemAccountSet",
            name: "provinceProgressItemAccountSet",
            hidden:
              store.getters["user/userInfos"].userId === "1004" ? false : true,
            component: () =>
              import(
                "@/views/informationsPage/supervision/provinceProgressItemAccountSet"
              ),
            meta: {
              title: "省长考核指标进展台账填报",
              icon: "el-icon-document-copy"
            }
          },
          {
            path: "/informationsPage/supervision/reviewProgressYear",
            name: "reviewProgressYear",
            hidden:
              store.getters["user/userInfos"].userId === "1001" ? false : true,
            component: () =>
              import("@/views/informationsPage/infosManage/allInfos"),
            meta: {
              title: "考核办工作进展汇报",
              icon: "el-icon-folder"
            },
            children: [
              {
                path: "/informationsPage/supervision/reviewProgress",
                name: "reviewProgress",
                hidden:
                  store.getters["user/userInfos"].userId === "1001"
                    ? false
                    : true,
                component: () =>
                  import("@/views/informationsPage/supervision/reviewProgress"),
                meta: {
                  title: "年度考核工作进展情况汇报",
                  icon: "el-icon-tickets"
                }
              }
              // {
              //   path: "/informationsPage/supervision/reviewSpecialProgress",
              //   name: "reviewSpecialProgress",
              //   hidden:
              //     store.getters["user/userInfos"].userId === "1001"
              //       ? false
              //       : true,
              //   component: () =>
              //     import("@/views/informationsPage/supervision/reviewProgress"),
              //   meta: {
              //     title: "专项考核工作进展情况汇报",
              //     icon: "el-icon-tickets"
              //   }
              // }
            ]
          },
          {
            path: "/informationsPage/supervision/reviewProgressSpecial",
            name: "reviewProgressSpecial",
            hidden:
              store.getters["user/userInfos"].userId === "1001" ? false : true,
            component: () =>
              import("@/views/informationsPage/infosManage/allInfos"),
            meta: {
              title: "考核办落实进展台账",
              icon: "el-icon-folder"
            },
            children: [
              {
                path: "/informationsPage/supervision/progressAccount",
                name: "progressAccount",
                hidden: store.getters["user/userInfos"].userId !== "1001",
                component: () =>
                  import(
                    "@/views/informationsPage/supervision/progressAccount"
                  ),
                meta: {
                  title: "年度考核落实进展台账",
                  icon: "el-icon-document-copy"
                }
              },
              {
                path: "/informationsPage/supervision/progressAccountSpecial",
                name: "progressAccountSpecial",
                hidden: store.getters["user/userInfos"].userId !== "1001",
                component: () =>
                  import(
                    "@/views/informationsPage/supervision/progressAccountSpecial"
                  ),
                meta: {
                  title: "专项任务落实进展台账",
                  icon: "el-icon-document-copy"
                }
              }
            ]
          },
          {
            path: "/informationsPage/supervision/progressAccount/department",
            name: "department",
            hidden:
              store.getters["user/userInfos"].userId === "1002" ||
              store.getters["user/userInfos"].userId === "1003"
                ? false
                : true,
            component: () =>
              import(
                "@/views/informationsPage/supervision/progressAccount/department"
              ),
            meta: {
              title: "年度考核落实进展台账填报",
              icon: "el-icon-tickets"
            }
          },
          {
            path:
              "/informationsPage/supervision/progressAccountSpecial/department",
            name: "departmentSpecialAssess",
            hidden:
              store.getters["user/userInfos"].userId === "1002" ||
              store.getters["user/userInfos"].userId === "1003"
                ? false
                : true,
            component: () =>
              import(
                "@/views/informationsPage/supervision/progressAccountSpecial/department"
              ),
            meta: {
              title: "专项任务落实进展台账填报",
              icon: "el-icon-tickets"
            }
          },
          {
            path: "/informationsPage/supervision/progressAccount/office",
            name: "office",
            hidden:
              store.getters["user/userInfos"].userId === "1002001" ||
              store.getters["user/userInfos"].userId === "1003002"
                ? false
                : true,
            component: () =>
              import(
                "@/views/informationsPage/supervision/progressAccount/office"
              ),
            meta: {
              title: "处落实进展台账填报",
              icon: "el-icon-tickets"
            }
          }
        ]
      },
      {
        path: "/informationsPage/assessment",
        name: "assessment",
        redirect:
          store.getters["user/userInfos"].userId === "1000"
            ? "/informationsPage/assessment/distributeSupervise"
            : store.getters["user/userInfos"].userId === "1001"
            ? "/informationsPage/assessment/distributeSupervise"
            : store.getters["user/userInfos"].userId === "1004"
            ? "/informationsPage/assessment/departmentEvaluation"
            : store.getters["user/userInfos"].userId === "1005"
            ? "/informationsPage/assessment/spotCheckEvaluation"
            : "/informationsPage/assessment/provinceSelfEvaluation/departmentSelf",
        component: () => import("@/views/informationsPage/assessment"),
        meta: {
          title: "年度考核"
        },
        children: [
          {
            path: "/informationsPage/assessment/process",
            name: "process",
            hidden: true,
            component: () =>
              import("@/views/informationsPage/assessment/process"),
            meta: {
              title: "年度考核主页面"
            }
          },
          {
            path: "/informationsPage/assessment/distributeSupervise",
            name: "distributeSupervise",
            hidden:
              store.getters["user/userInfos"].userId == "1000" ||
              store.getters["user/userInfos"].userId == "1001"
                ? false
                : true,
            component: () =>
              import("@/views/informationsPage/assessment/distributeSupervise"),
            meta: {
              title: "年度考核指标分配及督察",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/assessment/departmentEvaluation",
            name: "departmentEvaluation",
            hidden: store.getters["user/userInfos"].userId !== "1004",
            component: () =>
              import(
                "@/views/informationsPage/assessment/departmentEvaluation"
              ),
            meta: {
              title: "部门评审",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/assessment/spotCheckEvaluation",
            name: "departmentEvaluation",
            hidden: store.getters["user/userInfos"].userId !== "1005",
            component: () =>
              import("@/views/informationsPage/assessment/spotCheckEvaluation"),
            meta: {
              title: "抽查评审",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/assessment/provinceSelfEvaluation",
            name: "provinceSelfEvaluation",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ||
              store.getters["user/userInfos"].userId === "1001" ||
              store.getters["user/userInfos"].userId === "1005" ||
              store.getters["user/userInfos"].userId === "1004",
            component: () =>
              import(
                "@/views/informationsPage/assessment/provinceSelfEvaluation"
              ),
            meta: {
              title: "市县级自评",
              icon: "el-icon-receiving"
            },
            children: [
              {
                path:
                  "/informationsPage/assessment/provinceSelfEvaluation/departmentSelf",
                name: "departmentSelf",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002" &&
                  store.getters["user/userInfos"].userId !== "1003",
                component: () =>
                  import(
                    "@/views/informationsPage/assessment/provinceSelfEvaluation/departmentSelf"
                  ),
                meta: {
                  title: "自评工作"
                }
              },
              {
                path:
                  "/informationsPage/assessment/provinceSelfEvaluation/departmentCoordination",
                name: "departmentCoordination",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002" &&
                  store.getters["user/userInfos"].userId !== "1003",
                component: () =>
                  import(
                    "@/views/informationsPage/assessment/provinceSelfEvaluation/departmentCoordination"
                  ),
                meta: {
                  title: "配合工作"
                }
              },
              {
                path:
                  "/informationsPage/assessment/provinceSelfEvaluation/officeSelf",
                name: "officeSelf",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002001" &&
                  store.getters["user/userInfos"].userId !== "1003002",
                component: () =>
                  import(
                    "@/views/informationsPage/assessment/provinceSelfEvaluation/officeSelf"
                  ),
                meta: {
                  title: "处室自评工作"
                }
              },
              {
                path:
                  "/informationsPage/assessment/provinceSelfEvaluation/officeCoordination",
                name: "officeCoordination",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002001" &&
                  store.getters["user/userInfos"].userId !== "1003002",
                component: () =>
                  import(
                    "@/views/informationsPage/assessment/provinceSelfEvaluation/officeCoordination"
                  ),
                meta: {
                  title: "处室配合工作"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/informationsPage/specialAssess",
        name: "specialAssess",
        redirect:
          store.getters["user/userInfos"].userId === "1000"
            ? "/informationsPage/specialAssess/distributeSupervise"
            : store.getters["user/userInfos"].userId === "1001"
            ? "/informationsPage/specialAssess/distributeSupervise"
            : store.getters["user/userInfos"].userId === "1004"
            ? "/informationsPage/specialAssess/departmentEvaluation"
            : "/informationsPage/specialAssess/provinceSelfEvaluation/departmentSelf",
        component: () => import("@/views/informationsPage/specialAssess"),
        meta: {
          title: "专项考核"
        },
        hidden: store.getters["user/userInfos"].userId === "1005",
        children: [
          {
            path: "/informationsPage/specialAssess/process",
            name: "process",
            hidden: true,
            component: () =>
              import("@/views/informationsPage/specialAssess/process"),
            meta: {
              title: "专项考核主页面"
            }
          },
          {
            path: "/informationsPage/specialAssess/distributeSupervise",
            name: "distributeSupervise",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ||
              store.getters["user/userInfos"].userId === "1001"
                ? false
                : true,
            component: () =>
              import(
                "@/views/informationsPage/specialAssess/distributeSupervise"
              ),
            meta: {
              title: "专项考核指标分配及督察",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/specialAssess/departmentEvaluation",
            name: "departmentEvaluation",
            hidden: store.getters["user/userInfos"].userId !== "1004",
            component: () =>
              import(
                "@/views/informationsPage/specialAssess/departmentEvaluation"
              ),
            meta: {
              title: "部门评审",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/specialAssess/provinceSelfEvaluation",
            name: "provinceSelfEvaluation",
            hidden:
              store.getters["user/userInfos"].userId === "1000" ||
              store.getters["user/userInfos"].userId === "1001" ||
              store.getters["user/userInfos"].userId === "1004",
            component: () =>
              import(
                "@/views/informationsPage/specialAssess/provinceSelfEvaluation"
              ),
            meta: {
              title: "市县级自评",
              icon: "el-icon-receiving"
            },
            children: [
              {
                path:
                  "/informationsPage/specialAssess/provinceSelfEvaluation/departmentSelf",
                name: "departmentSelf",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002" &&
                  store.getters["user/userInfos"].userId !== "1003",
                component: () =>
                  import(
                    "@/views/informationsPage/specialAssess/provinceSelfEvaluation/departmentSelf"
                  ),
                meta: {
                  title: "自评工作"
                }
              },
              {
                path:
                  "/informationsPage/specialAssess/provinceSelfEvaluation/departmentCoordination",
                name: "departmentCoordination",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002" &&
                  store.getters["user/userInfos"].userId !== "1003",
                component: () =>
                  import(
                    "@/views/informationsPage/specialAssess/provinceSelfEvaluation/departmentCoordination"
                  ),
                meta: {
                  title: "配合工作"
                }
              },
              {
                path:
                  "/informationsPage/specialAssess/provinceSelfEvaluation/officeSelf",
                name: "officeSelf",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002001" &&
                  store.getters["user/userInfos"].userId !== "1003002",
                component: () =>
                  import(
                    "@/views/informationsPage/specialAssess/provinceSelfEvaluation/officeSelf"
                  ),
                meta: {
                  title: "处室自评工作"
                }
              },
              {
                path:
                  "/informationsPage/specialAssess/provinceSelfEvaluation/officeCoordination",
                name: "officeCoordination",
                hidden:
                  store.getters["user/userInfos"].userId !== "1002001" &&
                  store.getters["user/userInfos"].userId !== "1003002",
                component: () =>
                  import(
                    "@/views/informationsPage/specialAssess/provinceSelfEvaluation/officeCoordination"
                  ),
                meta: {
                  title: "处室配合工作"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/informationsPage/poolAnalysis",
        name: "poolAnalysis",
        redirect: "/informationsPage/poolAnalysis/distributeSuperviseSummary",
        component: () => import("@/views/informationsPage/poolAnalysis"),
        hidden: store.getters["user/userInfos"].userId !== "1000",
        meta: {
          title: "统计分析"
        },
        children: [
          {
            path: "/informationsPage/poolAnalysis/taskImplementAnalysis",
            name: "taskImplementAnalysis",
            component: () =>
              import(
                "@/views/informationsPage/poolAnalysis/taskImplementAnalysis"
              ),
            meta: {
              title: "任务落实进度分析",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/poolAnalysis/distributeSuperviseSummary",
            name: "distributeSuperviseSummary",
            component: () =>
              import(
                "@/views/informationsPage/poolAnalysis/distributeSuperviseSummary"
              ),
            meta: {
              title: "年度考核总分分析",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/poolAnalysis/deductionScoreSummary",
            name: "deductionScoreSummary",
            component: () =>
              import(
                "@/views/informationsPage/poolAnalysis/deductionScoreSummary"
              ),
            meta: {
              title: "年度考核失分项分析",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/poolAnalysis/itemParamsSummary",
            name: "itemParamsSummary",
            component: () =>
              import("@/views/informationsPage/poolAnalysis/itemParamsSummary"),
            meta: {
              title: "年度指标数据项汇总分析",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/poolAnalysis/previousScoreSummary",
            name: "previousScoreSummary",
            component: () =>
              import(
                "@/views/informationsPage/poolAnalysis/previousScoreSummary"
              ),
            meta: {
              title: "历年评分汇总分析",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/poolAnalysis/cityRateHistory",
            name: "cityRateHistory",
            component: () =>
              import("@/views/informationsPage/poolAnalysis/cityRateHistory"),
            meta: {
              title: "各市县历年排名趋势分析",
              icon: "el-icon-files"
            }
          }
        ]
      },
      {
        path: "/informationsPage/systemSetting",
        name: "systemSetting",
        redirect: "/informationsPage/systemSetting/targetSetManage",
        component: () => import("@/views/informationsPage/systemSetting"),
        hidden: store.getters["user/userInfos"].userId !== "1000",
        meta: {
          title: "系统设置"
        },
        children: [
          {
            path: "/informationsPage/systemSetting/targetSetManage",
            name: "targetSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/targetSetManage"),
            meta: {
              title: "年度考核指标管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/specialTargetSetManage",
            name: "specialTargetSetManage",
            component: () =>
              import(
                "@/views/informationsPage/systemSetting/specialTargetSetManage"
              ),
            meta: {
              title: "专项考核指标管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/provinceTargetSetManage",
            name: "provinceTargetSetManage",
            component: () =>
              import(
                "@/views/informationsPage/systemSetting/provinceTargetSetManage"
              ),
            meta: {
              title: "省长年度考核指标管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/orgTreeSetManage",
            name: "orgTreeSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/orgTreeSetManage"),
            meta: {
              title: "组织机构管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/userSetManage",
            name: "userSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/userSetManage"),
            meta: {
              title: "机构人员管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/menuSetManage",
            name: "menuSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/menuSetManage"),
            meta: {
              title: "菜单管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/roleSetManage",
            name: "roleSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/roleSetManage"),
            meta: {
              title: "角色权限管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/areaSetManage",
            name: "areaSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/areaSetManage"),
            meta: {
              title: "行政区划管理",
              icon: "el-icon-files"
            }
          },
          {
            path: "/informationsPage/systemSetting/dictSetManage",
            name: "dictSetManage",
            component: () =>
              import("@/views/informationsPage/systemSetting/dictSetManage"),
            meta: {
              title: "字典表管理",
              icon: "el-icon-files"
            }
          }
        ]
      },
      {
        path: "/informationsPage/mail",
        name: "mail",
        hidden: true,
        redirect: "/informationsPage/mail/mainPage",
        component: () => import("@/views/informationsPage/mail"),
        meta: {
          title: "邮件"
        },
        children: [
          {
            path: "/informationsPage/mail/mainPage",
            name: "mainPage",
            hidden: true,
            component: () => import("@/views/informationsPage/mail/mainPage"),
            meta: {
              title: "邮件主页面"
            }
          },
          {
            path: "/informationsPage/mail/emailPage",
            name: "emailPage",
            hidden: false,
            component: () => import("@/views/informationsPage/mail/mainPage"),
            meta: {
              title: "邮件",
              icon: "el-icon-message"
            },
            children: [
              {
                path: "/informationsPage/mail/emailPage/writeEmail",
                name: "writeEmail",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "写信"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/receiveEmail",
                name: "receiveEmail",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "收件箱"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/unreadMessages",
                name: "unreadMessages",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "未读邮件"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/drafts",
                name: "drafts",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "草稿箱"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/outbox",
                name: "outbox",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "发件箱"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/dustbin",
                name: "dustbin",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "废件箱"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/originalBox",
                name: "originalBox",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "原件箱"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/searchEmail",
                name: "searchEmail",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "搜邮件"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/folder",
                name: "folder",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "文件夹"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/folderManage",
                name: "folderManage",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "文件夹管理"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/setting",
                name: "setting",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "设置"
                }
              },
              {
                path: "/informationsPage/mail/emailPage/historyEmail",
                name: "historyEmail",
                hidden: false,
                component: () =>
                  import("@/views/informationsPage/mail/mainPage"),
                meta: {
                  title: "历史邮件"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/informationsPage/assistant",
        name: "assistant",
        hidden: true,
        redirect: "/informationsPage/assistant/fileManage",
        component: () => import("@/views/informationsPage/assistant"),
        meta: {
          title: "工作助手"
        },
        children: [
          {
            path: "/informationsPage/assistant/allFile",
            name: "allFile",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/assistant/allFile"),
            meta: {
              title: "文件办理",
              icon: "el-icon-menu"
            },
            children: [
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "代办文件"
                }
              },
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "已办文件"
                }
              },
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "我的文件"
                }
              }
            ]
          },
          {
            path: "/informationsPage/assistant/mineFile",
            name: "mineFile",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/assistant/mineFile"),
            meta: {
              title: "我的文档",
              icon: "el-icon-s-order"
            },
            children: [
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "我的文档"
                }
              },
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "共享的文档"
                }
              },
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "回收站"
                }
              }
            ]
          },
          {
            path: "/informationsPage/assistant/mineTool",
            name: "mineTool",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/assistant/mineTool"),
            meta: {
              title: "个人工具",
              icon: "el-icon-s-tools"
            },
            children: [
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "便笺"
                }
              },
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "笔记本"
                }
              }
            ]
          },
          {
            path: "/informationsPage/assistant/mineSet",
            name: "mineSet",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/assistant/mineSet"),
            meta: {
              title: "个人设置",
              icon: "el-icon-setting"
            },
            children: [
              {
                path: "/informationsPage/assistant/fileManage",
                name: "fileManage",
                hidden: false,
                component: () =>
                  import(
                    "@/views/informationsPage/assistant/allFile/fileManage"
                  ),
                meta: {
                  title: "修改密码"
                }
              }
            ]
          },
          {
            path: "/informationsPage/assistant/fileManage",
            name: "fileManage",
            hidden: false,
            component: () =>
              import("@/views/informationsPage/assistant/allFile/fileManage"),
            meta: {
              title: "通讯录",
              icon: "el-icon-user-solid"
            }
          }
        ]
      }
    ]
  },
  {
    path: "*",
    redirect: "/404"
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  // mode: "history", // 去掉路由地址的#
  routes: staticRouterMap
});
