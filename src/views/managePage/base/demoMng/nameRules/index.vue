<template>
  <div class="table-container">
    <el-row>
      <el-col :span="10">
        <img src="@/assets/nameRules.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.data中保存的变量，命名时，如果是组件配置，命名方式为：组件名+"Settings"；普通变量名称用英文名称并做好注释。
            </p>
          </li>
          <li>
            <p>
              2.methods中定义的函数，命名时应注意，如果是鼠标或者键盘动作触发类函数，命名方式为："handle"+要触发的功能（英文名称），并做好注释，如"handleTableBtn"；如果是接口请求类函数，统一命名方式为："get"+需获取的列表（英文名称），如"getTableData"；接口数据处理函数命名方式为："deal"+列表名称（英文），如"dealTableData"。
            </p>
          </li>
          <li>
            <p>
              3.此外，data中定义的变量，配置类放前面，普通变量放后面；methods中定义的函数，摆放位置为动作类在前，接口请求类在后，接口数据处理类放最后。
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
