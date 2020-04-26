<template>
  <el-submenu
    v-if="menu && menu.children && menu.children.length > 0"
    :index="menu.id"
    :popper-append-to-body="popperAppendToBody"
    :show-timeout="timeOut"
    :hide-timeout="timeOut"
  >
    <template slot="title">
      <i :class="menu.menuview"></i>{{ menu.text }}
    </template>
    <top-menu
      v-for="itemMenu in menu.children"
      :menu="itemMenu"
      :key="itemMenu.id"
    />
  </el-submenu>
  <el-menu-item v-else :index="menu.menuaction">
    <template slot="title">
      <i :class="menu.menuview"></i>{{ menu.text }}
    </template>
  </el-menu-item>
</template>

<script>
export default {
  name: "topMenu",
  data() {
    return {
      popperAppendToBody: false, //设置为true 会报栈内存溢出 为false则选中的上一级也会有下划线
      timeOut: 0
    };
  },
  methods: {},
  props: {
    menu: {
      type: Object,
      required: true,
      default: null
    }
  }
};
</script>
