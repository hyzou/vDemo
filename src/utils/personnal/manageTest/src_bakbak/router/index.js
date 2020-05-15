import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home")
    },
    {
      path: "/addEquipment",
      name: "addEquipment",
      component: () => import("@/views/addEquipment")
    },
    {
      path: "/equipmentList",
      name: "equipmentList",
      component: () => import("@/views/equipmentList")
    },
    {
      path: "/addEqpExt",
      name: "addEqpExt",
      component: () => import("@/views/addEqpExt")
    },
    {
      path: "/equipmentInfo",
      name: "equipmentInfo",
      component: () => import("@/views/equipmentInfo")
    },
    {
      path: "/selectTest",
      name: "selectTest",
      component: () => import("@/views/selectTest")
    },
    {
      path: "/preTestEqp",
      name: "preTestEqp",
      component: () => import("@/views/preTestEqp")
    },
    // {
    //   path: "/testEqp",
    //   name: "testEqp",
    //   component: () => import("@/views/testEqp")
    // },
    {
      path: "/testResult",
      name: "testResult",
      component: () => import("@/views/testResult")
    }
  ]
});
