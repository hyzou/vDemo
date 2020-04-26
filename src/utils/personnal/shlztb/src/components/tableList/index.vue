<template>
  <div class="table-list">
    <!-- <tableOperationBtns /> -->
    <el-table
      :ref="tablelistSettings.tableSettingOptions.ref"
      :data="tablelistSettings.tableDatas"
      :tooltip-effect="tablelistSettings.tableSettingOptions.tooltipEffect"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-key="tablelistSettings.tableSettingOptions.rowKey"
      :border="tablelistSettings.tableSettingOptions.border"
      :default-expand-all="
        tablelistSettings.tableSettingOptions.defaultExpandAll
      "
      :tree-props="tablelistSettings.tableSettingOptions.treeProps"
    >
      <el-table-column
        v-if="tablelistSettings.tableSettingOptions.ref == 'multipleTable'"
        type="selection"
        width="55"
      >
      </el-table-column>

      <el-table-column
        v-if="tablelistSettings.tableSettingOptions.hasExpandContent"
        type="expand"
      >
        <template slot-scope="expandDataRow">
          <div class="table-list-expandbox">
            <el-form
              label-position="left"
              class="table-list-expandbox-item"
              v-for="expandItemdata in expandDataRow.row[
                tablelistSettings.tableSettingOptions.expandContent
              ]"
              :key="expandItemdata.sysId"
            >
              <el-form-item
                v-for="expandItemlab in tablelistSettings.tableSettingOptions
                  .expandContentLables"
                :key="expandItemlab.key"
                :label="expandItemlab.value"
              >
                <span>{{ expandItemdata[expandItemlab.key] }}</span>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>

      <template
        v-for="head in tablelistSettings.tableSettingOptions.headerOptions"
      >
        <el-table-column
          :key="head.prop"
          :label="head.lable"
          :width="head.width"
          :show-overflow-tooltip="
            !tablelistSettings.tableSettingOptions.hidelongItem
          "
        >
          <template slot-scope="scope">
            <a
              v-if="head.clickable"
              class="cursor textColorLightBlue"
              @click="
                handleItemName(
                  scope.row[head.clickVarKey],
                  head.clickType || ''
                )
              "
              >{{ scope.row[head.prop] }}</a
            >
            <p v-else>
              <template v-if="head.prop == 'operateBtns'">
                <el-button
                  v-for="operateBtn in scope.row[head.prop]"
                  :key="operateBtn.type"
                  v-show="!operateBtn.showflag || operateBtn.showflag == 'true'"
                  @click.native.prevent="
                    handleRowButton(operateBtn.id, operateBtn.type)
                  "
                  type="text"
                >
                  <span v-if="operateBtn.text == '修改'" class="text-warning">{{
                    operateBtn.text
                  }}</span>
                  <span
                    v-else-if="operateBtn.text == '删除'"
                    class="text-danger"
                    >{{ operateBtn.text }}</span
                  >
                  <span
                    v-else-if="
                      operateBtn.text == '查看流程' ||
                        operateBtn.text == '查看' ||
                        operateBtn.text == '查看成交确认书'
                    "
                    class="text-success"
                    >{{ operateBtn.text }}</span
                  >
                  <span v-else class="text-primary">{{ operateBtn.text }}</span>
                </el-button>
              </template>
              <template v-else>
                <el-rate
                  v-if="head.type && head.type == 'rate'"
                  v-model="scope.row[head.prop]"
                  disabled
                  show-score
                  text-color="#ff9900"
                >
                  <!-- score-template="{scope.row[head.prop]}" -->
                </el-rate>
                <span v-else>{{ scope.row[head.prop] }}</span>
              </template>
            </p>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tablelistSettings.tableDatas[1], tablelistSettings.tableDatas[2]])">
        切换第二、第三行的选中状态
      </el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div> -->
  </div>
</template>
<script>
// import tableOperationBtns from "@/components/tableList/tableOperationBtns";
export default {
  name: "tableList",
  props: {
    tablelistSettings: Object
  },
  components: {
    // tableOperationBtns
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.$emit("handleTableMutiChecked", val);
    },
    handleRowButton(id, type) {
      this.$emit("handleTableRowButton", id, type);
    },
    handleItemName(id, type) {
      this.$emit("handleTableItem", id, type);
    }
  }
};
</script>
