<template>
  <div class="table-container">
    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-collapse-transition>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :collapse-transition="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-collapse-transition>
      </el-col>
    </el-row>
    <el-row class="mb20">
      <el-col :span="24">
        <ul class="contentText">
          <li><p>1.siderNav示例即左侧导航，</p></li>
          <li><p>2.数据即为格式化之后的路由对象。</p></li>
          <li><p>3.详情参考router路由定义</p></li>
          <li>
            <p>4.代码情况样例如下所示：</p>
            <pre>
              <code>
                &lt;siderNav :sidebarData="sidebarData" />

                data() {
                  var routerData = this.$store.getters.routerAsyncList[0].children;
                  return {
                    sidebarData: routerData,
                  }
                }  
              </code>
            </pre>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "siderNav",
  data() {
    return {
      isCollapse: true
    };
  }
};
</script>
