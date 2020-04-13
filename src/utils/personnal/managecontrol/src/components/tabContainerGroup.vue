<template>
  <div class="tab-container-group">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 10" :key="n" :title="'内容 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :key="n" :title="'选项 ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import VueEvent from "../model/VueEvent.js"
export default {
  name: "tabContainerGroup",
  props: {
    topButtonsArray: Array
  },
  data() {
    selected: ""
  },
  mounted() {
    VueEvent.$on("to-news", function(data){
      this.selected = data;
      console.log( data );
    })
  },
  methods: {
    menuTap(index, key) {
      this.$emit("topNavTap", index, key);
    }
  }
};
</script>
