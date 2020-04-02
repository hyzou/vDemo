<template>
  <div class="navbar-group">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">选项一</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div v-for="n in 10" :key="n">
          {{ n }}
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import VueEvent from "../model/VueEvent.js";

export default {
  name: "navbarGroup",
  props: {
    topButtonsArray: Array
  },
  data() {
    return {
      selected: ""
    }
  },
  methods: {
    menuTap(index, key) {
      this.$emit("topNavTap", index, key);
    }
  }
};
</script>
