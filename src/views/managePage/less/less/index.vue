<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="10">
        <img src="@/assets/less.png" alt="" width="100%">
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li><p>1.样式文件目录如图，less语言高级用法可自行查阅相关资料，这里应用less主要目的是利用less语法的嵌套结构，清晰表述样式的关联关系。接下来简单介绍一下其中的文件。</p></li>
          <li><p>2.global.less为主入口文件，引入main.js即可,global.less中定义了模块less文件的引入及通用样式</p></li>
          <li><p>3.define.less为变量定义文件，文件中颜色，宽度等变量类型统一在该文件中定义。</p></li>
          <li><p>4.components文件夹用于存放组件的样式，每个组件对应一个less文件，样式做嵌套构造，颜色等使用统一标量操作。</p></li>
          <li><p>4.layout文件夹用于项目结构的样式，主结构用elementui样式布局组件，样式存放于此。</p></li>
          <li><p>4.projectStyle文件夹用于存放当前项目定制化样式。</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dealAnnouncement",
  data() {
    return {
    };
  }
};
</script>
