<template>
  <div id="app">

    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    if(localStorage.getItem("appUserInfo")) {
      this.$store.dispatch('setUserInfos', JSON.parse(localStorage.getItem("appUserInfo")));
      this.$store.dispatch('setPointInfos', JSON.parse(localStorage.getItem("appPointInfo")));
      
      // localStorage.removeItem("appUserInfo");
      // localStorage.removeItem("appPointInfo");
    }
    if(localStorage.getItem("appPage")){
      this.$store.dispatch('setPage', localStorage.getItem("appPage"));
    }
    if(localStorage.getItem("appEcolorInfos")){
      this.$store.dispatch('setEcolorInfos', JSON.parse(localStorage.getItem("appEcolorInfos")));
    }
  }
}
</script>

