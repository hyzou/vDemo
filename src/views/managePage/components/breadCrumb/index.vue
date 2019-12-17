<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <breadCrumb :breadArray="breadSettings" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;breadCrumb :breadArray="breadSettings" />
                  breadSettings: this.$route.matched,
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
import breadCrumb from "@/components/breadCrumb";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/breadCrumbMng/tableData.json";

export default {
  name: "breadCrumbMng",
  components: {
    breadCrumb,
    tableList
  },
  data() {
    return {
      /**
       * breadCrumb 基本数据配置
       */
      breadSettings: this.$route.matched,
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
