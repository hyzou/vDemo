<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="10">
        <img src="@/assets/getters.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li><p>1.模块化使用vuex</p></li>
          <li>
            <p>
              2.getters统一取值，但是注意getters取值命名与模块中命名需保持一致，以便查找和更改。
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <img src="@/assets/vuex.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.注意命名方式统一，state中定义语义化名称（英文名称）,mutations添加前缀"set_"并将state中状态名首字母大写，最后actions中使用驼峰命名，供页面调用。
            </p>
          </li>
          <li>
            <p class="text-danger">
              2.页面中使用状态是，读取用"this.$store.getters.xxx"，提交更新状态只使用异步提交方式"this.$store.dispatch('xxx',xxx)"，不是用其他同步方式，如需同步，定义promise函数来解决。
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dealAnnouncement",
  data() {
    return {};
  }
};
</script>
