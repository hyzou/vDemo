<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <tree
          :treeSettings="treeSettings"
          @handleTreeNodeClick="handleTreeNodeClick"
          @handleGetCheckedKeys="handleGetCheckedKeys"
          @handleGetCheckedNodes="handleGetCheckedNodes"
        />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：
              <pre>
                <code>
                  &lt;tree
                    :treeSettings="treeSettings"
                    @handleTreeNodeClick="handleTreeNodeClick"
                    @handleGetCheckedKeys="handleGetCheckedKeys"
                    @handleGetCheckedNodes="handleGetCheckedNodes"
                  />
                  treeSettings: {
                    treeData: treeData,
                    expandAll: false,
                    nodeKey: "id",
                    nodeExpand: false,
                    defaultProps: {
                      children: "children",
                      label: "label"
                    },
                    treeWithCheckbox: true,
                    checkedTreeData:["1"],
                    treeButtons:[
                      { 
                        key: "getCheckedNodes",
                        text: "通过node获取已选节点",
                        styleType: "warning"
                      },
                      {
                        key: "getCheckedKeys",
                        text: "通过key值获取已选节点"
                      },
                      {
                        key: "resetChecked",
                        text: "清除已选菜单"
                      }
                    ]
                  },
                </code>
              </pre>
            </p>
          </li>
          <li>
            <tableList
              :tablelistSettings="tablelistSettings"
            />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import tree from "@/components/tree";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/treeMng/tableData.json";
import treeData from "@/utils/formSettingsJson/treeMng/treeData.json";

export default {
  name: "treeMng",
  components: {
    tree,
    tableList
  },
  data() {
    return {
      /**
       * tree 配置
       */
      treeSettings: {
        treeData: treeData,
        expandAll: false,
        nodeKey: "id",
        nodeExpand: false,
        defaultProps: {
          children: "children",
          label: "label"
        },
        treeWithCheckbox: true,
        checkedTreeData:["1"],
        treeButtons:[
          { 
            key: "getCheckedNodes",
            text: "通过node获取已选节点",
            styleType: "warning"
          },
          {
            key: "getCheckedKeys",
            text: "通过key值获取已选节点"
          },
          {
            key: "resetChecked",
            text: "清除已选菜单"
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
      },
    };
  },
  methods:{
    handleTreeNodeClick(node){
      console.log(node)
    },
    handleGetCheckedKeys(keys){
      console.log(keys)
    },
    handleGetCheckedNodes(nodes){
      console.log(nodes)
    }
  }
};
</script>
