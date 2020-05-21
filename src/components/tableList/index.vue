<template>
  <div class="table-list">
    <el-table
      :ref="tablelistSettings.tableSettingOptions.ref"
      :data="tablelistSettings.tableDatas"
      :tooltip-effect="
        tablelistSettings.tableSettingOptions.tooltipEffect || 'dark'
      "
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-key="tablelistSettings.tableSettingOptions.rowKey"
      :row-class-name="tablelistSettings.tableSettingOptions.rowClassName"
      :header-row-class-name="
        tablelistSettings.tableSettingOptions.headerRowClassName
      "
      :border="tablelistSettings.tableSettingOptions.border || true"
      :default-expand-all="
        tablelistSettings.tableSettingOptions.defaultExpandAll || false
      "
      :tree-props="tablelistSettings.tableSettingOptions.treeProps"
    >
      <el-table-column
        v-if="tablelistSettings.tableSettingOptions.isMultipleTable"
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        v-if="tablelistSettings.tableSettingOptions.isShowIndex || false"
        type="index"
        width="50"
        :label="tablelistSettings.tableSettingOptions.showIndexHeader || ''"
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
          v-if="!head.isHide"
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
              <template v-if="head.propType == 'operateBtns'">
                <el-button
                  v-for="operateBtn in scope.row[head.prop]"
                  :class="operateBtn.className"
                  :key="operateBtn.type"
                  size="mini"
                  :type="operateBtn.styleType"
                  v-show="!operateBtn.showflag || operateBtn.showflag == 'true'"
                  @click.native.prevent="handleRowButton(scope.row, operateBtn)"
                >
                  {{ operateBtn.text }}
                </el-button>
              </template>
              <template v-else>
                {{ scope.row[head.prop] || "—" }}
              </template>
            </p>
          </template>
        </el-table-column>
      </template>
    </el-table>
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
