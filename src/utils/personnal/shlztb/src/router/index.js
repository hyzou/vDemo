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
        name: "informationHomePage",
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
        name: "contractUs",
        component: () => import("@/views/informationsPage/contractUs"),
        meta: {
          title: "联系我们"
        }
      },
      {
        path: "/informationsPage/helpPage",
        hidden: false,
        name: "informationsPage/helpPage",
        component: () => import("@/views/informationsPage/helpPage"),
        meta: {
          title: "帮助中心"
        }
      },
      {
        path: "/informationsPage/signUp",
        hidden: true,
        name: "signUp",
        component: () => import("@/views/informationsPage/signUp"),
        meta: {
          title: "会员注册"
        }
      },
      {
        path: "/informationsPage/login",
        hidden: true,
        name: "login",
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
    redirect: "/managePage/systemSettings",
    children: [
      {
        path: "/managePage/biddingMng",
        hidden: false,
        name: "biddingMng",
        redirect: "/managePage/biddingMng/biddingInformation",
        component: () => import("@/views/managePage/biddingMng"),
        meta: {
          title: "交易中心"
        },
        children: [
          {
            path: "/managePage/biddingMng/biddingInformation",
            hidden: false,
            name: "biddingInformation",
            redirect:
              "/managePage/biddingMng/biddingInformation/dealAnnouncement",
            component: () =>
              import("@/views/managePage/biddingMng/biddingInformation"),
            meta: {
              title: "信息管理"
            },
            children: [
              {
                path:
                  "/managePage/biddingMng/biddingInformation/dealAnnouncement",
                hidden: false,
                name: "dealAnnouncement",
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingInformation/dealAnnouncement"
                  ),
                meta: {
                  title: "交易公告"
                }
              },
              {
                path: "/managePage/biddingMng/biddingInformation/dealResults",
                name: "dealResults",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingInformation/dealResults"
                  ),
                meta: {
                  title: "交易结果"
                }
              } /* ,
              {
                path: "/managePage/biddingMng/biddingInformation/dealAnnouncementReview",
                component: () =>
                  import("@/views/managePage/biddingMng/biddingInformation/dealAnnouncementReview"),
                meta: {
                  title: "交易公告审核"
                }
              } */
            ]
          },
          {
            path: "/managePage/biddingMng/projectObjectMng",
            hidden: false,
            name: "projectObjectMng",
            redirect:
              "/managePage/biddingMng/projectObjectMng/biddingProjectMng",
            component: () =>
              import("@/views/managePage/biddingMng/projectObjectMng"),
            meta: {
              title: "专场标的管理"
            },
            children: [
              {
                path:
                  "/managePage/biddingMng/projectObjectMng/biddingProjectMng",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/projectObjectMng/biddingProjectMng"
                  ),
                name: "biddingProjectMng",
                meta: {
                  title: "专场管理"
                }
              },
              {
                path:
                  "/managePage/biddingMng/projectObjectMng/biddingTargetsMng",
                hidden: false,
                name: "biddingTargetsMng",
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/projectObjectMng/biddingTargetsMng"
                  ),
                meta: {
                  title: "标的管理"
                }
              }
            ]
          },
          {
            path: "/managePage/biddingMng/biddingSignMng",
            hidden: false,
            name: "biddingSignMng",
            redirect: "/managePage/biddingMng/biddingSignMng/signReview",
            component: () =>
              import("@/views/managePage/biddingMng/biddingSignMng"),
            meta: {
              title: "报名管理"
            },
            children: [
              {
                path: "/managePage/biddingMng/biddingSignMng/signReview",
                name: "signReview",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingSignMng/signReview"
                  ),
                meta: {
                  title: "报名审核"
                }
              }
              //todo {
              //   path: "/managePage/biddingMng/biddingSignMng/biddingSignStatistics",
              //   component: () =>
              //     import("@/views/managePage/biddingMng/biddingSignMng/biddingSignStatistics"),
              //   meta: {
              //     title: "交易报名统计"
              //   }
              // }
            ]
          },
          {
            path: "/managePage/biddingMng/biddingControlMng",
            hidden: false,
            name: "biddingControlMng",
            redirect:
              "/managePage/biddingMng/biddingControlMng/biddingControlSpecial",
            component: () =>
              import("@/views/managePage/biddingMng/biddingControlMng"),
            meta: {
              title: "控制管理"
            },
            children: [
              {
                path:
                  "/managePage/biddingMng/biddingControlMng/itemBiddingSetting",
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingControlMng/itemBiddingSetting"
                  ),
                meta: {
                  title: "项目交易设置"
                }
              },
              {
                path:
                  "/managePage/biddingMng/biddingControlMng/biddingControlSpecial",
                hidden: false,
                name: "biddingControlSpecial",
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingControlMng/biddingControlSpecial"
                  ),
                meta: {
                  title: "交易控制台"
                }
              },
              {
                path: "/managePage/biddingMng/biddingControlMng/biddingControl",
                hidden: true,
                name: "biddingControl",
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingControlMng/biddingControl"
                  ),
                meta: {
                  title: "交易控制台"
                }
              }
            ]
          },
          {
            path: "/managePage/biddingMng/biddingOpenMng",
            hidden: false,
            name: "biddingOpenMng",
            redirect:
              "/managePage/biddingMng/biddingOpenMng/biddingApproveTargerList",
            component: () =>
              import("@/views/managePage/biddingMng/biddingOpenMng"),
            meta: {
              title: "开标管理"
            },
            children: [
              {
                path:
                  "/managePage/biddingMng/biddingOpenMng/biddingApproveTargerList",
                name: "biddingApproveTargerList",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingOpenMng/biddingApproveTargerList"
                  ),
                meta: {
                  title: "评标"
                }
              },
              {
                path: "/managePage/biddingMng/biddingOpenMng/biddingApprove",
                name: "biddingApprove",
                hidden: true,
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingOpenMng/biddingApprove"
                  ),
                meta: {
                  title: "交易评标"
                }
              },
              // {
              //   path:
              //     "/managePage/biddingMng/biddingOpenMng/biddingSureTargerList",
              //   name: "biddingSureTargerList",
              //   hidden: false,
              //   component: () =>
              //     import(
              //       "@/views/managePage/biddingMng/biddingOpenMng/biddingSureTargerList"
              //     ),
              //   meta: {
              //     title: "交易定标"
              //   }
              // },
              {
                path: "/managePage/biddingMng/biddingOpenMng/biddingSure",
                name: "biddingSure",
                hidden: true,
                component: () =>
                  import(
                    "@/views/managePage/biddingMng/biddingOpenMng/biddingSure"
                  ),
                meta: {
                  title: "交易定标"
                }
              }
            ]
          },
          {
            path: "/managePage/biddingMng/salesConfirmation",
            component: () =>
              import("@/views/managePage/biddingMng/salesConfirmation"),
            meta: {
              title: "成交确认书管理"
            }
          }
        ]
      },
      {
        path: "/managePage/moneyMng",
        hidden: false,
        name: "moneyMng",
        redirect: "/managePage/moneyMng/accountMng",
        component: () => import("@/views/managePage/moneyMng"),
        meta: {
          title: "资金管理"
        },
        children: [
          {
            path: "/managePage/moneyMng/accountMng",
            hidden: false,
            component: () => import("@/views/managePage/moneyMng/accountMng"),
            meta: {
              title: "账户管理"
            },
            children: [
              {
                path: "/managePage/moneyMng/accountMng/memberAccontQuery",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/moneyMng/accountMng/memberAccontQuery"
                  ),
                meta: {
                  title: "会员账户查询"
                }
              },
              {
                path: "/managePage/moneyMng/accountMng/accontBidRecord",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/moneyMng/accountMng/accontBidRecord"
                  ),
                meta: {
                  title: "账户交易记录"
                }
              },
              {
                path: "/managePage/moneyMng/accountMng/accountTotalfunds",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/moneyMng/accountMng/accountTotalfunds"
                  ),
                meta: {
                  title: "账户资金总额"
                }
              }
            ]
          },
          {
            path: "/managePage/moneyMng/tradeMng",
            hidden: false,
            component: () => import("@/views/managePage/moneyMng/tradeMng"),
            meta: {
              title: "交易管理"
            },
            children: [
              {
                path: "/managePage/moneyMng/tradeMng/marginPayment",
                hidden: false,
                component: () =>
                  import("@/views/managePage/moneyMng/tradeMng/marginPayment"),
                meta: {
                  title: "保证金缴纳"
                }
              },
              {
                path: "/managePage/moneyMng/tradeMng/handleChargeFee",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/moneyMng/tradeMng/handleChargeFee"
                  ),
                meta: {
                  title: "手续费收取"
                }
              },
              {
                path: "/managePage/moneyMng/tradeMng/accountFundAdjustment",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/moneyMng/tradeMng/accountFundAdjustment"
                  ),
                meta: {
                  title: "账户资金调整"
                }
              }
            ]
          },
          {
            path: "/managePage/moneyMng/tradeApplyMng",
            hidden: false,
            component: () =>
              import("@/views/managePage/moneyMng/tradeApplyMng"),
            meta: {
              title: "交易申请管理"
            },
            children: [
              {
                path: "/managePage/moneyMng/tradeApplyMng/moneyBack",
                hidden: false,
                component: () =>
                  import("@/views/managePage/moneyMng/tradeApplyMng/moneyBack"),
                meta: {
                  title: "可用金退回"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/managePage/memberMng",
        hidden: false,
        name: "systemSettings",
        redirect: "/managePage/memberMng/memberRegist",
        component: () => import("@/views/managePage/memberMng"),
        meta: {
          title: "会员管理"
        },
        children: [
          {
            path: "/managePage/memberMng/memberRegist",
            hidden: false,
            component: () =>
              import("@/views/managePage/memberMng/memberRegist"),
            meta: {
              title: "会员注册"
            }
          },
          {
            path: "/managePage/memberMng/memberControl",
            hidden: false,
            component: () =>
              import("@/views/managePage/memberMng/memberControl"),
            meta: {
              title: "会员管理"
            }
          },
          {
            path: "/managePage/memberMng/memberYearCheck",
            hidden: false,
            component: () =>
              import("@/views/managePage/memberMng/memberYearCheck"),
            meta: {
              title: "会员年审"
            }
          },
          {
            path: "/managePage/memberMng/principalMng",
            hidden: false,
            component: () =>
              import("@/views/managePage/memberMng/principalMng"),
            meta: {
              title: "委托方管理"
            }
          }
        ]
      },
      {
        path: "/managePage/statisticalAnalysis",
        hidden: false,
        name: "statisticalAnalysis",
        redirect: "/managePage/statisticalAnalysis/balanceAnalysis",
        component: () => import("@/views/managePage/statisticalAnalysis"),
        meta: {
          title: "统计分析"
        },
        children: [
          {
            path: "/managePage/statisticalAnalysis/balanceAnalysis",
            name: "balanceAnalysis",
            hidden: false,
            component: () =>
              import("@/views/managePage/statisticalAnalysis/balanceAnalysis"),
            meta: {
              title: "账户余额统计"
            }
          },
          {
            path: "/managePage/statisticalAnalysis/accontBidRecordAnalysis",
            name: "accontBidRecordAnalysis",
            hidden: false,
            component: () =>
              import(
                "@/views/managePage/statisticalAnalysis/accontBidRecordAnalysis"
              ),
            meta: {
              title: "交易记录统计"
            }
          },
          {
            path: "/managePage/statisticalAnalysis/memberRegistAnalysis",
            name: "memberRegistAnalysis",
            hidden: false,
            component: () =>
              import(
                "@/views/managePage/statisticalAnalysis/memberRegistAnalysis"
              ),
            meta: {
              title: "会员注册统计"
            }
          },
          {
            path: "/managePage/statisticalAnalysis/auctionAnalysis",
            name: "auctionAnalysis",
            hidden: false,
            component: () =>
              import("@/views/managePage/statisticalAnalysis/auctionAnalysis"),
            meta: {
              title: "竞价交易统计"
            }
          },
          {
            path: "/managePage/statisticalAnalysis/dealAnalysis",
            name: "dealAnalysis",
            hidden: false,
            component: () =>
              import("@/views/managePage/statisticalAnalysis/dealAnalysis"),
            meta: {
              title: "成交情况统计"
            }
          }
        ]
      },
      {
        path: "/managePage/contractTracking",
        hidden: false,
        name: "contractTracking",
        component: () => import("@/views/managePage/contractTracking"),
        meta: {
          title: "合同执行跟踪"
        }
      },
      {
        path: "/managePage/creditSystem",
        hidden: false,
        name: "creditSystem",
        component: () => import("@/views/managePage/creditSystem"),
        meta: {
          title: "信用系统"
        },
        children: [
          {
            path: "/managePage/creditSystem/memberCreditlist",
            hidden: true,
            name: "memberCreditlist",
            component: () =>
              import("@/views/managePage/creditSystem/memberCreditlist"),
            meta: {
              title: "会员综合评分"
            }
          },
          {
            path: "/managePage/creditSystem/memberCreditlistDetail",
            hidden: true,
            name: "memberCreditlistDetail",
            component: () =>
              import("@/views/managePage/creditSystem/memberCreditlistDetail"),
            meta: {
              title: "会员评分列表内页"
            }
          }
        ]
      },
      {
        path: "/managePage/messageMng",
        hidden: false,
        name: "messageMng",
        component: () => import("@/views/managePage/messageMng"),
        meta: {
          title: "短信管理"
        },
        children: [
          {
            path: "/managePage/messageMng/memberMsgMng",
            hidden: false,
            component: () =>
              import("@/views/managePage/messageMng/memberMsgMng"),
            meta: {
              title: "会员短信管理"
            }
          },
          {
            path: "/managePage/messageMng/principalMsgMng",
            hidden: false,
            component: () =>
              import("@/views/managePage/messageMng/principalMsgMng"),
            meta: {
              title: "委托方短信管理"
            }
          }
        ]
      },
      {
        path: "/managePage/personalCenter",
        hidden: false,
        name: "systemSettings",
        redirect: "/managePage/personalCenter/changePsw",
        component: () => import("@/views/managePage/personalCenter"),
        meta: {
          title: "个人中心"
        },
        children: [
          {
            path: "/managePage/personalCenter/changePsw",
            hidden: false,
            component: () =>
              import("@/views/managePage/personalCenter/changePsw"),
            meta: {
              title: "修改密码"
            }
          },
          {
            path: "/managePage/personalCenter/personalInfo",
            hidden: false,
            component: () =>
              import("@/views/managePage/personalCenter/personalInfo"),
            meta: {
              title: "个人信息"
            }
          },
          {
            path: "/managePage/personalCenter/infoCenter",
            name: "infoCenter",
            hidden: false,
            component: () =>
              import("@/views/managePage/personalCenter/infoCenter"),
            meta: {
              title: "消息中心"
            }
          }
        ]
      },
      {
        path: "/managePage/webInfoMng",
        hidden: false,
        name: "webInfoMng",
        redirect: "/managePage/webInfoMng/helpCenter",
        component: () => import("@/views/managePage/webInfoMng"),
        meta: {
          title: "网站管理"
        },
        children: [
          {
            path: "/managePage/webInfoMng/helpCenter",
            hidden: false,
            component: () => import("@/views/managePage/webInfoMng/helpCenter"),
            meta: {
              title: "帮助中心"
            },
            children: [
              {
                path: "/managePage/webInfoMng/helpCenter/tradeRule",
                hidden: false,
                component: () =>
                  import("@/views/managePage/webInfoMng/helpCenter/tradeRule"),
                meta: {
                  title: "交易规则"
                }
              },
              {
                path: "/managePage/webInfoMng/helpCenter/tradeGuide",
                hidden: false,
                component: () =>
                  import("@/views/managePage/webInfoMng/helpCenter/tradeGuide"),
                meta: {
                  title: "交易指南"
                }
              },
              {
                path: "/managePage/webInfoMng/helpCenter/tradeFlow",
                hidden: false,
                component: () =>
                  import("@/views/managePage/webInfoMng/helpCenter/tradeFlow"),
                meta: {
                  title: "交易流程"
                }
              },
              {
                path: "/managePage/webInfoMng/helpCenter/marketGuide",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/webInfoMng/helpCenter/marketGuide"
                  ),
                meta: {
                  title: "入市指南"
                }
              },
              {
                path: "/managePage/webInfoMng/helpCenter/dataDownload",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/webInfoMng/helpCenter/dataDownload"
                  ),
                meta: {
                  title: "资料下载"
                }
              }
            ]
          },
          {
            path: "/managePage/webInfoMng/webConfig",
            hidden: false,
            component: () => import("@/views/managePage/webInfoMng/webConfig"),
            meta: {
              title: "网站配置"
            },
            children: [
              {
                path: "/managePage/webInfoMng/webConfig/bannerConfig",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/webInfoMng/webConfig/bannerConfig"
                  ),
                meta: {
                  title: "轮播图配置"
                }
              },
              {
                path: "/managePage/webInfoMng/webConfig/friendLink",
                hidden: false,
                component: () =>
                  import("@/views/managePage/webInfoMng/webConfig/friendLink"),
                meta: {
                  title: "友情链接"
                }
              },
              {
                path: "/managePage/webInfoMng/webConfig/adConfig",
                hidden: false,
                component: () =>
                  import("@/views/managePage/webInfoMng/webConfig/adConfig"),
                meta: {
                  title: "广告管理"
                }
              },
              {
                path: "/managePage/webInfoMng/webConfig/contractUs",
                hidden: false,
                component: () =>
                  import("@/views/managePage/webInfoMng/webConfig/contractUs"),
                meta: {
                  title: "联系我们"
                }
              }
            ]
          },
          {
            path: "/managePage/webInfoMng/infoMng",
            hidden: false,
            component: () => import("@/views/managePage/webInfoMng/infoMng"),
            meta: {
              title: "信息管理"
            },
            children: [
              {
                path: "/managePage/webInfoMng/infoMng/importantNotice",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/webInfoMng/infoMng/importantNotice"
                  ),
                meta: {
                  title: "发布重要通知"
                }
              },
              {
                path: "/managePage/webInfoMng/infoMng/clientIntroduce",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/webInfoMng/infoMng/clientIntroduce"
                  ),
                meta: {
                  title: "优质供应商介绍"
                }
              }
            ]
          }
        ]
      },
      {
        path: "/managePage/systemSettings",
        hidden: false,
        name: "systemSettings",
        redirect: "/managePage/systemSettings/sysMenuMng",
        component: () => import("@/views/managePage/systemSettings"),
        meta: {
          title: "系统管理"
        },
        children: [
          {
            path: "/managePage/systemSettings/sysMenuMng",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/sysMenuMng"),
            meta: {
              title: "系统菜单管理"
            }
          },
          {
            path: "/managePage/systemSettings/dataDictMng",
            hidden: false,
            name: "dataDictMng",
            component: () =>
              import("@/views/managePage/systemSettings/dataDictMng"),
            meta: {
              title: "数据字典管理"
            }
          },
          {
            path: "/managePage/systemSettings/editDictMng",
            hidden: true,
            name: "editDictMng",
            component: () =>
              import("@/views/managePage/systemSettings/editDictMng"),
            meta: {
              title: "数据字典业务管理"
            }
          },
          {
            path: "/managePage/systemSettings/userRightsMng",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/userRightsMng"),
            meta: {
              title: "用户权限管理"
            },
            children: [
              {
                path: "/managePage/systemSettings/userRightsMng/orgPeopleMng",
                name: "orgPeopleMng",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/userRightsMng/orgPeopleMng"
                  ),
                meta: {
                  title: "机构人员管理"
                }
              },
              {
                path: "/managePage/systemSettings/userRightsMng/orgSubOrgs",
                name: "orgSubOrgs",
                hidden: true,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/userRightsMng/orgSubOrgs"
                  ),
                meta: {
                  title: "机构下属机构"
                }
              },
              {
                path: "/managePage/systemSettings/userRightsMng/orgSubPeople",
                name: "orgSubPeople",
                hidden: true,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/userRightsMng/orgSubPeople"
                  ),
                meta: {
                  title: "机构下属人员"
                }
              },
              {
                path: "/managePage/systemSettings/userRightsMng/sysRoleMng",
                name: "sysRoleMng",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/userRightsMng/sysRoleMng"
                  ),
                meta: {
                  title: "系统角色管理"
                }
              },
              {
                path:
                  "/managePage/systemSettings/userRightsMng/sysRoleAssignMenu",
                name: "sysRoleAssignMenu",
                hidden: true,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/userRightsMng/sysRoleAssignMenu"
                  ),
                meta: {
                  title: "角色菜单权限分配"
                }
              },
              {
                path:
                  "/managePage/systemSettings/userRightsMng/sysRoleAssignUser",
                name: "sysRoleAssignUser",
                hidden: true,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/userRightsMng/sysRoleAssignUser"
                  ),
                meta: {
                  title: "角色人员权限分配"
                }
              }
            ]
          },
          {
            path: "/managePage/systemSettings/sysBaseData",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/sysBaseData"),
            meta: {
              title: "业务基础数据"
            },
            children: [
              {
                path: "/managePage/systemSettings/sysBaseData/calcFormula",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/sysBaseData/calcFormula"
                  ),
                meta: {
                  title: "价格分表达式管理"
                }
              },
              {
                path: "/managePage/systemSettings/sysBaseData/measureUnitMng",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/sysBaseData/measureUnitMng"
                  ),
                meta: {
                  title: "计量单位管理"
                }
              },
              {
                path: "/managePage/systemSettings/sysBaseData/typeInfoSetting",
                hidden: false,
                component: () =>
                  import(
                    "@/views/managePage/systemSettings/sysBaseData/typeInfoSetting"
                  ),
                meta: {
                  title: "品种信息设置"
                }
              }
            ]
          },
          {
            path: "/managePage/systemSettings/codeRuleSetting",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/codeRuleSetting"),
            meta: {
              title: "编码规则设置"
            }
          },
          {
            path: "/managePage/systemSettings/sysParamSetting",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/sysParamSetting"),
            meta: {
              title: "系统参数设置"
            }
          },
          {
            path: "/managePage/systemSettings/businessParamSetting",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/businessParamSetting"),
            meta: {
              title: "业务参数设置"
            }
          },
          {
            path: "/managePage/systemSettings/sysTaskSetting",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/sysTaskSetting"),
            meta: {
              title: "系统任务设置"
            }
          },
          {
            path: "/managePage/systemSettings/sysLogCheck",
            hidden: false,
            component: () =>
              import("@/views/managePage/systemSettings/sysLogCheck"),
            meta: {
              title: "系统日志查看"
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
          },
          {
            path: "/memberPage/memberDataMng/changePsw",
            component: () =>
              import("@/views/memberPage/memberDataMng/changePsw"),
            meta: {
              title: "修改密码"
            }
          },
          {
            path: "/memberPage/memberDataMng/memMsgCenter",
            name: "memMsgCenter",
            component: () =>
              import("@/views/memberPage/memberDataMng/memMsgCenter"),
            meta: {
              title: "消息中心"
            }
          },
          {
            path: "/memberPage/memberDataMng/memberCareful",
            component: () =>
              import("@/views/memberPage/memberDataMng/memberCareful"),
            meta: {
              title: "会员年审"
            }
          }
        ]
      },
      {
        path: "/memberPage/moneyMng",
        name: "moneyMng",
        redirect: "/memberPage/moneyMng/accountQuery",
        component: () => import("@/views/memberPage/moneyMng"),
        meta: {
          title: "资金管理",
          icon: "el-icon-set-up"
        },
        children: [
          {
            path: "/memberPage/moneyMng/accountQuery",
            component: () => import("@/views/memberPage/moneyMng/accountQuery"),
            meta: {
              title: "账户查询"
            }
          },
          {
            path: "/memberPage/moneyMng/tradeRecord",
            component: () => import("@/views/memberPage/moneyMng/tradeRecord"),
            meta: {
              title: "交易记录"
            }
          },
          {
            path: "/memberPage/moneyMng/moneyReturn",
            component: () => import("@/views/memberPage/moneyMng/moneyReturn"),
            meta: {
              title: "可用金退回"
            }
          }
        ]
      },
      {
        path: "/memberPage/myDeal",
        name: "myDeal",
        redirect: "/memberPage/myDeal/myApply",
        component: () => import("@/views/memberPage/myDeal"),
        meta: {
          title: "我的交易",
          icon: "el-icon-set-up"
        },
        children: [
          {
            path: "/memberPage/myDeal/myApply",
            component: () => import("@/views/memberPage/myDeal/myApply"),
            meta: {
              title: "我的报名"
            }
          },
          {
            path: "/memberPage/myDeal/myBidding",
            component: () => import("@/views/memberPage/myDeal/myBidding"),
            meta: {
              title: "我的应价"
            }
          }
        ]
      },
      {
        path: "/memberPage/dealCenter",
        name: "dealCenter",
        redirect: "/memberPage/dealCenter/mySignUp",
        component: () => import("@/views/memberPage/dealCenter"),
        meta: {
          title: "交易中心",
          icon: "el-icon-set-up"
        },
        children: [
          {
            path: "/memberPage/dealCenter/mySignUp",
            name: "mySignUp",
            component: () => import("@/views/memberPage/dealCenter/mySignUp"),
            meta: {
              title: "我要报名"
            }
          },
          {
            path: "/memberPage/dealCenter/tradeSpecialList",
            name: "tradeSpecialList",
            component: () =>
              import("@/views/memberPage/dealCenter/tradeSpecialList"),
            meta: {
              title: "专场列表"
            }
          },
          {
            path: "/memberPage/dealCenter/specialList",
            hidden: true,
            name: "specialList",
            component: () =>
              import("@/views/memberPage/dealCenter/specialList"),
            meta: {
              title: "专场列表"
            }
          },
          // {
          //   path: "/memberPage/dealCenter/demo",
          //   hidden: true,
          //   name: "demo",
          //   component: () => import("@/views/memberPage/dealCenter/demo"),
          //   meta: {
          //     title: "测试"
          //   }
          // },
          {
            path: "/memberPage/dealCenter/salesConfirmation",
            component: () =>
              import("@/views/memberPage/dealCenter/salesConfirmation"),
            meta: {
              title: "成交确认书管理"
            }
          },
          {
            path: "/memberPage/dealCenter/contractTrackingMember",
            name: "contractTrackingMember",
            component: () =>
              import("@/views/memberPage/dealCenter/contractTrackingMember"),
            meta: {
              title: "合同追踪"
            }
          },
          {
            path: "/memberPage/dealCenter/contractTrackingConfirmList",
            hidden: true,
            name: "contractTrackingConfirmList",
            component: () =>
              import(
                "@/views/memberPage/dealCenter/contractTrackingConfirmList"
              ),
            meta: {
              title: "合同追踪待确认列表"
            }
          },
          {
            path: "/memberPage/dealCenter/creditSystem",
            hidden: false,
            name: "creditSystem",
            component: () => import("@/views/managePage/creditSystem"),
            meta: {
              title: "信用系统"
            },
            children: [
              {
                path: "/memberPage/dealCenter/creditSystem/memberCreditlist",
                hidden: false,
                name: "memberCreditlist",
                component: () =>
                  import("@/views/managePage/creditSystem/memberCreditlist"),
                meta: {
                  title: "会员综合评分"
                }
              },
              {
                path:
                  "/memberPage/dealCenter/creditSystem/memberCreditlistDetail",
                hidden: true,
                name: "memberCreditlistDetail",
                component: () =>
                  import(
                    "@/views/managePage/creditSystem/memberCreditlistDetail"
                  ),
                meta: {
                  title: "会员评分列表内页"
                }
              }
            ]
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
          title: "委托方资料管理",
          icon: "el-icon-user-solid"
        },
        children: [
          {
            path: "/memberPage/memberDataMng/memberInfoMng",
            component: () =>
              import("@/views/memberPage/memberDataMng/memberInfoMng"),
            meta: {
              title: "委托方信息管理"
            }
          },
          {
            path: "/memberPage/memberDataMng/changePsw",
            component: () =>
              import("@/views/memberPage/memberDataMng/changePsw"),
            meta: {
              title: "修改密码"
            }
          },
          {
            path: "/memberPage/memberDataMng/memMsgCenter",
            name: "memMsgCenter",
            component: () =>
              import("@/views/memberPage/memberDataMng/memMsgCenter"),
            meta: {
              title: "消息中心"
            }
          }
        ]
      },
      {
        path: "/memberPage/myDeal",
        name: "myDeal",
        redirect: "/memberPage/myDeal/myApply",
        component: () => import("@/views/memberPage/myDeal"),
        meta: {
          title: "我委托的交易",
          icon: "el-icon-set-up"
        },
        children: [
          {
            path: "/memberPage/myDeal/myBidding",
            component: () => import("@/views/memberPage/myDeal/myBidding"),
            meta: {
              title: "交易列表"
            }
          }
        ]
      },
      {
        path: "/memberPage/dealCenter",
        name: "dealCenter",
        redirect: "/memberPage/dealCenter/mySignUp",
        component: () => import("@/views/memberPage/dealCenter"),
        meta: {
          title: "交易管理",
          icon: "el-icon-set-up"
        },
        children: [
          {
            path: "/memberPage/dealCenter/tradeSpecialList",
            name: "tradeSpecialList",
            component: () =>
              import("@/views/memberPage/dealCenter/tradeSpecialList"),
            meta: {
              title: "交易观摩"
            }
          },
          {
            path: "/memberPage/dealCenter/inspectTrade",
            name: "inspectTrade",
            hidden: true,
            component: () =>
              import("@/views/memberPage/dealCenter/inspectTrade"),
            meta: {
              title: "交易观摩"
            }
          },
          {
            path: "/memberPage/dealCenter/biddingSureTargerList",
            name: "biddingSureTargerList",
            hidden: false,
            component: () =>
              import("@/views/memberPage/dealCenter/biddingSureTargerList"),
            meta: {
              title: "定标管理"
            }
            // children: [
            //   {
            //     path: "/memberPage/dealCenter/biddingSureTargerList/biddingSureTargetGpList",
            //     name: "biddingSureTargetGpList",
            //     component: () =>
            //       import("@/views/memberPage/dealCenter/biddingSureTargerList/biddingSureTargetGpList"),
            //     meta: {
            //       title: "挂牌模式定标管理"
            //     }
            //   },
            //   {
            //     path: "/memberPage/dealCenter/biddingSureTargerList/biddingSureTargetJjList",
            //     name: "biddingSureTargetJjList",
            //     component: () =>
            //       import("@/views/memberPage/dealCenter/biddingSureTargerList/biddingSureTargetJjList"),
            //     meta: {
            //       title: "竞价模式定标管理"
            //     }
            //   }
            // ]
          },
          {
            path: "/memberPage/dealCenter/biddingSure",
            name: "biddingSure",
            hidden: true,
            component: () =>
              import("@/views/memberPage/dealCenter/biddingSure"),
            meta: {
              title: "定标管理"
            }
          },
          {
            path: "/memberPage/dealCenter/salesConfirmation",
            component: () =>
              import("@/views/memberPage/dealCenter/salesConfirmation"),
            meta: {
              title: "成交确认书管理"
            }
          },
          {
            path: "/memberPage/dealCenter/contractTrackingPrincipal",
            component: () =>
              import("@/views/memberPage/dealCenter/contractTrackingPrincipal"),
            meta: {
              title: "合同追踪"
            }
          },
          {
            path: "/memberPage/dealCenter/contractTrackingConfirmList",
            hidden: true,
            name: "contractTrackingConfirmList",
            component: () =>
              import(
                "@/views/memberPage/dealCenter/contractTrackingConfirmList"
              ),
            meta: {
              title: "合同追踪待确认列表"
            }
          },
          {
            path: "/memberPage/dealCenter/creditSystem",
            hidden: false,
            name: "creditSystem",
            component: () => import("@/views/managePage/creditSystem"),
            meta: {
              title: "信用系统"
            },
            children: [
              {
                path: "/memberPage/dealCenter/creditSystem/memberCreditlist",
                hidden: false,
                name: "memberCreditlist",
                component: () =>
                  import("@/views/managePage/creditSystem/memberCreditlist"),
                meta: {
                  title: "会员综合评分"
                }
              },
              {
                path:
                  "/memberPage/dealCenter/creditSystem/memberCreditlistDetail",
                hidden: true,
                name: "memberCreditlistDetail",
                component: () =>
                  import(
                    "@/views/managePage/creditSystem/memberCreditlistDetail"
                  ),
                meta: {
                  title: "会员评分列表内页"
                }
              }
            ]
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
