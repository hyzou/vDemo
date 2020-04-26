<template>
  <div class="horizen-nav">
    <el-menu
      :default-active="$route.path"
      class="horizen-nav-content"
      mode="horizontal"
      @select="handleSelect"
      background-color="#005192"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in headrouter">
        <el-menu-item
          class="horizen-nav-content-item"
          v-if="!item.hidden"
          :key="item.path"
          :route="item.path"
          :index="item.path"
          :to="item.path"
        >
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "horizenNav",
  props: {
    carouselSrcs: Array,
    headrouter: Array
  },
  data() {
    return {};
  },
  methods: {
    // eslint-disable-next-line
    handleSelect (key, keyPath) {
      // //console.log(key, keyPath);
      this.$router.push(key);
    }
  }
};
</script>
