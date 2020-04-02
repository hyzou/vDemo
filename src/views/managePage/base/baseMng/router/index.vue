<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="10">
        <img src="@/assets/router.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li><p>1.path用于配置路由路径</p></li>
          <li>
            <p>
              2.hidden用于配置菜单是否需要隐藏，如内页等需要写在路由中，又不需要显示。
            </p>
          </li>
          <li><p>3.name别名，用于路由跳转。</p></li>
          <li><p>4.redirect用于部分页面的重定向</p></li>
          <li><p>5.component用于引入页面组件</p></li>
          <li>
            <p>
              4.meta中用于配置路由中文名称显示和icon,title对应名称，icon对应图标
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <img src="@/assets/initRouter.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.当需动态路由，可引入initRouter.js，用来格式化当前路由，具体字段需自行比对。
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "router",
  data() {
    return {};
  }
};
</script>
