<template>
  <div class="manage">
    <ahheader :headerOption="headerOption" @backFunc="backFunc"/>
    <div class="mainLogoOnGrid"></div>
    <gridItems :gridList="gridList" />
    <router-view />
  </div>
</template>

<script>
import ahheader from "@/components/ahheader.vue";
import gridItems from "@/components/gridItems.vue";

export default {
  name: "manage",
  components: {
    ahheader,
    gridItems
  },
  data() {
    return {
      /* 头部导航配置信息 */
      headerOption: {
        title: "智能管控",
        routePath: "/",
        func: true
      },
      /* 初始化菜单栏功能列表数据 */
      gridList: [
        // {
        //   name: "库区场景",
        //   icon: "xitongshouye",
        //   id: 0,
        //   routePath: "/scene"
        // },
        {
          name: "温湿度检测",
          icon: "wendu",
          id: 1,
          routePath: "/choseHouse",
          page: "/detectionTemperature"
        },
        {
          name: "智能通风",
          icon: "tongfengjing",
          id: 2,
          routePath: "/choseHouse",
          page: "/manualControl?manualType=ventilate"
        },
        {
          name: "智能控温",
          icon: "kongtiao",
          id: 3,
          routePath: "/choseHouse",
          page: "/manualControl?manualType=temperature"
        },
        // {
        //     name: "智能气调",
        //     icon: "guandaoshujuico_hui",
        //     id: 4,
        //     routePath: "/choseHouse",
        //     page: "/manualControl?manualType=gas"
        // },
        // {
        //     name: "环流熏蒸",
        //     icon: "huanliu",
        //     id: 5,
        //     routePath: "/choseHouse",
        //     page: "/manualControl?manualType=circular"
        // },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        },
        {
          id: 9
        }
      ]
    };
  },
  methods: {
    backFunc(){
      try {
        window.postMessage('goBack');
      } catch (error) {
        this.$router.push("/");
      }
    }
  }
};
</script>
