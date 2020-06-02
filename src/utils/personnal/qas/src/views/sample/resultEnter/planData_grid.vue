<template>
  <div>
    <el-table
      :data="
        tableDataArray.filter(
          data => !searchName || data.name.includes(searchName)
        )
      "
      :border="true"
      style="width: 100%;height: 760px;max-height: 760px;"
    >
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchName"
            size="small"
            placeholder="输入计划名称搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-link
            @click="showSample(scope.row)"
            v-bind:class="{ activefont: scope.row.isActive }"
            >{{ scope.row.name }}</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPlanPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagePlanSizeSet"
          :layout="$constants.paginationlayout"
          :total="totalPlanNum"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "planData_grid",
  data() {
    return {
      currentPlanPage: 1,
      pagePlanSizeSet: this.$constants.numberPerpage, //每页的数量
      totalPlanNum: 0,
      searchName: "",
      tableDataArray: [],
      selectedPlan: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagePlanSizeSet = val;
      this.findData();
    },
    handleCurrentChange(val) {
      this.currentPlanPage = val;
      this.findData();
    },
    findData() {
      const $this = this;
      let param = {
        page: this.currentPlanPage,
        rows: this.pagePlanSizeSet
      };
      this.$get({
        url: "/_data/task/plan/pageNeedSampleEnterPlan",
        fnc: data => {
          if (!data || !data.success || !data.rows) {
            return false;
          }
          data.rows.map(item => {
            item.isActive = false;
          });
          $this.tableDataArray = data.rows;
        },
        param: param
      });
    },
    showSample(scopeRow) {
      this.tableDataArray.map(item => {
        item.isActive = false;
      });
      scopeRow.isActive = true;
      this.$emit(
        this.$constants.EMIT_QUALITY_RESULT_ENTER_SAMPLE_SEARCH,
        scopeRow
      );
    }
  },
  created() {
    this.findData();
  }
};
</script>
