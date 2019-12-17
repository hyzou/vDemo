<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <commonTitleWithBorder :title="titleSettings" />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;commonTitleWithBorder :title="titleSettings" />
                  titleSettings: "标题",
                </code>
              </pre>
          </li>
          <li>
            <tableList :tablelistSettings="tablelistSettings" />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/commonTitleWithBorderMng/tableData.json";

export default {
  name: "commonTitleWithBorderMng",
  components: {
    commonTitleWithBorder,
    tableList
  },
  data() {
    return {
      /**
       * commonTitleWithBorder 基本数据配置
       */
      titleSettings: "标题",
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: tableData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      }
    };
  }
};
</script>
