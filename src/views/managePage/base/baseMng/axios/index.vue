<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="10">
        <img src="@/assets/axios.png" alt="" width="100%">
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li><p>1.global_variable.js用于存放全局变量，直接在集合中添加即可</p></li>
          <li><p>2.httpApi.js中保存数据接口列表，保存所有接口地址。</p></li>
          <li><p>3.index.js中封装了axios，拦截更改数据，按需修改相应参数，不需要大幅改动。</p></li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <img src="@/assets/httpApi.png" alt="" width="100%">
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li><p>1.每个接口地址需添加注释，注明接口调用所在模块及功能名称，如左图：功能模块名称为资料下载，接口功能为新增资料</p></li>
          <li><p>2.需接口命名不能重复，即apiInterface.addDownFile中，addDownFile有且只有1个。</p></li>
          <li><p>3.url对应接口路径</p></li>
          <li><p>4.method对应接口请求方式</p></li>
          <li><p class="text-danger">5.isMuti对应接口传递方式为表单提交，需表单提交时要添加此配置</p></li>
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
