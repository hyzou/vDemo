<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1" title="查询条件">
        <el-row>
          <el-col :span="8">
            <label class="search_label fir_label">名称:</label>
            <el-input v-model="search.name" class="dialog_input"></el-input>
            <el-button type="primary" class="search_btn" @click="do_search()">
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="tool-bar bgfff">
      <el-button
        type="primary"
        class="s-tool-btn"
        :disabled="disabledBtn"
        @click="selectSure"
      >
        确认勾选
      </el-button>
    </div>
    <el-table
      :data="tableListSettings.tableDatas"
      style="width: 100%"
      @selection-change="handleTableMutiChecked"
      max-height="440px"
      height="440px"
    >
      <el-table-column type="selection" width="80"> </el-table-column>
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="code" label="编码" width="220"> </el-table-column>
      <el-table-column prop="munit" label="计量单位" width="220">
      </el-table-column>
    </el-table>
    <!-- <tableList
      :tablelistSettings="tableListSettings"
      @handleTableMutiChecked="handleTableMutiChecked"
      style="max-height: 500px;"
    ></tableList>-->
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="pointHandlePaginationPagenumber"
      @handlePaginationPagesize="pointHandleSizeChange"
    >
    </pagination>
  </div>
</template>

<script>
export default {
  name: "qaCheckItemChoose",
  data() {
    return {
      activeName: "1",
      qasPlanSampleRequestId: 0,
      search: {
        name: ""
      },
      disabledBtn: true,
      selectedCheckItemRow: [],

      tableListSettings: {
        tableDatas: []
      },

      paginationSettings: {
        currentPage: 1,
        pageSize: 10,
        layout: "total,sizes, prev, pager, next, jumper",
        totalNumbers: 0,
        pageSizeChangeList: ["10", "20", "30"]
      }
    };
  },
  methods: {
    handleTableMutiChecked(val) {
      this.disabledBtn = val.length > 0 ? false : true;
      this.selectedCheckItemRow = [];
      const $this = this;
      val.map(item => {
        item.qasPlanSampleRequestId = $this.qasPlanSampleRequestId;
        $this.selectedCheckItemRow.push(item);
      });
    },
    pointHandlePaginationPagenumber(num) {
      this.paginationSettings.currentPage = num;
      this.do_search();
    },
    pointHandleSizeChange(num) {
      this.paginationSettings.pageSize = num;
      this.do_search();
    },
    do_search() {
      const $this = this;
      let param = {
        page: $this.paginationSettings.currentPage,
        rows: $this.paginationSettings.pageSize
      };
      if (this.search.name) {
        param.name = encodeURIComponent(this.search.name);
      }
      this.$get({
        url: "/_data/base/item/pageItems",
        param: param,
        fnc: data => {
          if (!data && !data.success) {
            $this.tableListSettings.tableDatas = [];
            $this.paginationSettings.totalNumbers = 0;
            return false;
          }
          $this.tableListSettings.tableDatas = data.rows;
          $this.paginationSettings.totalNumbers = data.total;
        }
      });
    },
    selectSure() {
      if (!this.selectedCheckItemRow) {
        return false;
      }
      const $this = this;
      this.$post({
        url: "/_data/task/planQaItem/insertItems",
        param: this.selectedCheckItemRow,
        fnc: data => {
          if (!data || !data.success) {
            $this.$message({
              type: "error",
              message: "操作失败"
            });
            return false;
          }
          //插入成功通知父页面刷新列表
          $this.$emit("reloadCheckItem", "Y");
        }
      });
    }
  },
  props: {
    selectedQasPlanSampleRequestId: {
      type: String
    }
  },
  watch: {
    selectedQasPlanSampleRequestId: {
      handler(val) {
        this.qasPlanSampleRequestId = val;
        this.do_search();
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
