<template>
  <div class="leftMenuDiv">
    <!-- 判断是否有子目录 -->
    <template v-if="menu.children && menu.children.length > 0">
      <el-submenu :index="menu.id" :key="menu.id">
        <template slot="title">
          <i :class="menu.menuview ? menu.menuview : ''"></i>
          <span class="left_text">{{ menu.text }}</span>
        </template>
        <left-menu
          v-for="itemMenu in menu.children"
          :menu="itemMenu"
          :key="itemMenu.id"
        ></left-menu>
      </el-submenu>
    </template>
    <!--无子目录时 作为导航-->
    <template v-else>
      <el-menu-item
        :index="menu.menuaction"
        :key="menu.id"
        class="leftMenuMenu"
      >
        <i :class="menu.menuview"></i>
        <span class="left_text" slot="title">{{ menu.text }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "leftMenu",

  props: {
    menu: {
      type: Object,
      required: true,
      default: null
    }
  }
};
</script>
