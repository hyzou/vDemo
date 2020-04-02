<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <operateButtonsGroup
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
          @handleDropItemButton="handleDropItemButton"
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
            flag: "duplicateOperation",
            label: "批量操作",
            isDropBtn: true,
            styleType: "primary",
            size: "small",
            className: "mr10",
            postUrl: "flowTradeInformation",
            dropData: [
              {
                icon: "el-icon-plus",
                label: "删除",
                value: "remove"
              }
            ]
          },
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
    },
    /* operateButtons下拉点击事件 */
    handleDropItemButton(id) {
      console.log(id.value, "id");
      if (id.value == "remove") {
        this.$confirm("此操作将删除您已选择的数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message.success("删除成功!");
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    }
  }
};
</script>
