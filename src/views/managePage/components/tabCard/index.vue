<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <tabCard
          class="tab-container"
          :tabSettings="tabSettings"
          @handleTabChange="handleTabChange"
        />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下所示：</p>
            <pre>
                <code>
                  &lt;tabCard
                    class="tab-container"
                    :tabSettings="tabSettings"
                    @handleTabChange="handleTabChange" //切换tab回调函数
                  />
                  tabSettings: {
                    editable: true,
                    stretch: false,
                    position: "top",
                    newTabName: 2,
                    tabCardType: "card",
                    tabModel: "tabModel",
                    tabCardData: [
                      {
                        label: "标签1",
                        id: "1"
                      },
                      {
                        label: "标签2",
                        id: "2"
                      }
                    ]
                  },
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
import tabCard from "@/components/tabCard";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/tabCardMng/tableData.json";

export default {
  name: "tabCardMng",
  components: {
    tabCard,
    tableList
  },
  data() {
    return {
      // tab数据设置
      tabSettings: {
        editable: true,
        stretch: false,
        position: "top",
        tabCardType: "card",
        tabModel: "tabModel",
        tabCardData: [
          {
            label: "标签1",
            id: "1"
          },
          {
            label: "标签2",
            id: "2"
          }
        ]
      },
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
  },
  methods: {
    handleTabChange(tab) {
      console.log(tab);
    }
  }
};
</script>
