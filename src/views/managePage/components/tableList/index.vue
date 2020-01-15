<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <tableList
          :tablelistSettings="demoTableSettings"
          @handleTableRowButton="handleTableRowButton"
          @handleTableItem="handleTableItem"
          @handleTableMutiChecked="handleSelectionChange"
        />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.table的功能很强大，目前只封装了一些项目目前用到的基本属性，更多属性可参考elementUI
              table模块。
            </p>
          </li>
          <li>
            <p>2.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;tableList
                    :tablelistSettings="demoTableSettings"
                    @handleTableRowButton="handleTableRowButton"
                    @handleTableItem="handleTableItem"
                    @handleTableMutiChecked="handleSelectionChange"
                  />
                  demoTableSettings: {
                    tableDatas: demotableData,
                    tableSettingOptions: {
                      ref:"demo",
                      headerRowClassName: "text-danger",
                      rowClassName: "text-warning",
                      rowKey: "id",
                      tooltipEffect: "dark",
                      border: true,
                      headerOptions: demotableHeader,
                      isMultipleTable: "true",
                      hasExpandContent: true,
                      defaultExpandAll: false,
                      expandContent: "expandList",
                      expandContentLables: [
                        {
                          key: "firstName",
                          value: "姓"
                        },
                        {
                          key: "lastName",
                          value: "名"
                        }
                      ],
                      treeProps: {
                        children: 'children', 
                        hasChildren: 'hasChildren'
                      }
                    }
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
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/tableListMng/tableData.json";
import demotableData from "@/utils/formSettingsJson/tableListMng/demotableData.json";
import demotableHeader from "@/utils/formSettingsJson/tableListMng/demotableHeader.json";

export default {
  name: "tableListMng",
  components: {
    tableList
  },
  data() {
    return {
      /**
       * table 顶部demo表格配置
       */
      demoTableSettings: {
        tableDatas: demotableData,
        tableSettingOptions: {
          ref: "demo",
          headerRowClassName: "text-danger",
          rowClassName: "text-warning",
          rowKey: "id",
          tooltipEffect: "dark",
          border: true,
          headerOptions: demotableHeader,
          isShowIndex: true,
          showIndexHeader: "序号",
          isMultipleTable: "true",
          hasExpandContent: true,
          defaultExpandAll: false,
          expandContent: "expandList",
          expandContentLables: [
            {
              key: "firstName",
              value: "姓"
            },
            {
              key: "lastName",
              value: "名"
            }
          ],
          treeProps: {
            children: "children",
            hasChildren: "hasChildren"
          }
        }
      },
      /**
       * table 说明文档表格配置
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
    handleTableRowButton(id, type) {
      console.log(id);
      console.log(type);
    },
    handleTableItem(id, type) {
      console.log(id);
      console.log(type);
    },
    handleSelectionChange(data) {
      console.log(data);
    }
  }
};
</script>
