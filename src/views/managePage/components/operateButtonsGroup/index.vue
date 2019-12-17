<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <operateButtonsGroup
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;operateButtonsGroup
                    :operateButtonsSettings="operateButtonsSettings"
                    @handleOperateButton="handleOperateButton"
                  />
                  operateButtonsSettings: {
                    moduleName: "part1",
                    buttonListData: [
                      {
                        flag: "pass",
                        label: "通过",
                        styleType: "success",
                        size:"mini",
                        icon:"el-icon-circle-plus",
                        postUrl: "flowTradeInformation"
                      },
                      {
                        flag: "back",
                        label: "不通过",
                        styleType: "danger",
                        postUrl: "flowTradeInformation"
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/operateButtonsGroupMng/tableData.json";

export default {
  name: "operateButtonsGroupMng",
  components: {
    operateButtonsGroup,
    tableList
  },
  data() {
    return {
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "part1",
        buttonListData: [
          {
            flag: "pass",
            label: "通过",
            styleType: "success",
            size: "mini",
            icon: "el-icon-circle-plus",
            postUrl: "flowTradeInformation"
          },
          {
            flag: "back",
            label: "不通过",
            styleType: "danger",
            postUrl: "flowTradeInformation"
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
    /* operateButtons点击事件 */
    handleOperateButton(button, moduleName) {
      console.log(button, "button");
      console.log(moduleName, "moduleName");
    }
  }
};
</script>
