import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

import manage from "../views/manage.vue";
import choseZone from "../views/choseZone.vue";
import choseHouse from "../views/choseHouse.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "home",
      component: Home
    },
    {
      path: "/manage",
      name: "manage",
      component: manage
    },
    {
      path: "/scene",
      name: "scene",
      component: () => import("../views/scene.vue")
    },
    {
      path: "/choseZone",
      name: "choseZone",
      component: choseZone
    },
    {
      path: "/choseHouse",
      name: "choseHouse",
      component: choseHouse
    },
    {
      path: "/manualControl",
      name: "manualControl",
      component: () => import("../views/manualControl.vue")
    },
    {
      path: "/detectionTemperature",
      name: "detectionTemperature",
      component: () => import("../views/detectionTemperature.vue")
    }
  ]
});
