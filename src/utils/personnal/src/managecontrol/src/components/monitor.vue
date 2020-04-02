// 功能待定
<template>
  <div>
    <ahheader :headerOption="headerOption"></ahheader>
    <video id="audio" class="video-box" controls="controls" src="videoSrc"></video>
  </div>
</template>

<script>
import ahheader from "@/components/ahheader.vue";

export default {
  name: "monitor",
  components: {
    ahheader
  },
  props: {
    videoData: Object
  },
  data() {
    return {
      headerOption: {
        title: "监控",
        routePath: "/manage"
      },
      videoSrc: "",
      
    };
  },
  mounted() {
    this.headerOption = {
      title: this.videoData.storeHouseName + "监控",
      routePath: this.videoData.routePath
    };
  },
  methods: {

  }
};
</script>
