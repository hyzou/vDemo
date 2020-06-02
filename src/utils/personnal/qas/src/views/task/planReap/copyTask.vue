<template>
  <div>
    <el-form label-width="80px" :inline="true">
      <el-form-item label="计划环节 :">
        <el-select v-model="link" disabled placeholder="计划环节">
          <el-option
            v-for="item in planLink"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划性质 :">
        <el-select v-model="nature" placeholder="计划性质" clearable>
          <el-option
            v-for="item in planNature"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品品种 :">
        <el-select
          v-model="product"
          placeholder="产品品种"
          clearable
          @change="handChange"
          ref="productSelected"
        >
          <el-option
            v-for="item in $store.getters.products"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份 :">
        <el-date-picker
          v-model="date_year"
          type="year"
          class="year-picker"
          placeholder="选择年"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="do_search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="copyTask_table"
      :border="true"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="nature__dsp" label="计划性质"> </el-table-column>
      <el-table-column prop="name" label="计划标题"> </el-table-column>
      <el-table-column prop="productName" label="产品品种"> </el-table-column>
      <el-table-column prop="deadlineDt" label="要求完成时间">
      </el-table-column>
    </el-table>
    <tinyPage
      @transfTinyPagParam="getTransfTinyPagParam"
      :total="total"
      :selectedNum="selectedNum"
    ></tinyPage>
    <div class="tool-bar">
      <el-button type="primary" v-if="showCopyBtn" @click="copySelected"
        >确认勾选</el-button
      >
    </div>
  </div>
</template>

<script>
import tiny_page from "../../common/tiny_page";

export default {
  name: "copyTask",
  data() {
    return {
      planLink: [], //计划环节
      planNature: [], //计划性质
      nature: "",
      product: "",
      productName: "",
      date_year: "",
      tableData: [],
      currentPage: 1,
      pageSize: this.$constants.numberPerpage,
      total: 0,
      selectedNum: 0,
      showCopyBtn: false,
      selectedCopyRows: []
    };
  },
  components: {
    tinyPage: tiny_page
  },
  methods: {
    //获取计划环节
    getLink(vm) {
      vm.$get({
        url: "/_data/frame/ref/list?_refKey=dict&busintypeid=qas_plan_link",
        fnc: data => {
          vm.planLink = data;
          vm.getNature(vm);
        }
      });
    },
    //获取计划性质
    getNature(vm) {
      let nature =
        vm.link == this.$constants.LINK_REAP
          ? "qas_nature_reap"
          : vm.link == this.$constants.LINK_STOCK
          ? "qas_nature_stock"
          : "qas_nature_market";
      vm.$get({
        url: "/_data/frame/ref/list?_refKey=dict&busintypeid=" + nature,
        fnc: data => {
          vm.planNature = data;
          if (data) {
            vm.nature = data[0].value;
          }
        }
      });
    },
    do_search() {
      let param = {
        page: this.currentPage === 0 ? 1 : this.currentPage,
        rows: this.pageSize
      };
      if (this.link) {
        param.link = this.link;
      }
      if (this.nature) {
        param.nature = this.nature;
      }
      if (this.productName) {
        param.productName = this.productName;
      }
      if (this.date_year) {
        param.dateStr = this.date_year;
      }
      this.$get({
        url: "/_data/task/plan/pageCanCopyPlanVo",
        fnc: data => {
          this.tableData = data.rows;
          this.total = data.total;
        },
        param: param
      });
      this.tableData.map(function(arg) {
        arg.deadlineDt = this.$dateUtl.getTime(arg.deadlineDt);
      });
    },
    handChange(value) {
      let obj = {};
      obj = this.$store.getters.products.find(item => {
        //这里的userList就是上面遍历的数据源
        return item.id === value; //筛选出匹配数据
      });
      this.productName = obj.text;
    },
    getTransfTinyPagParam(obj) {
      this.currentPage = obj.currentPageNum;
      this.pageSize = obj.pageSizeNum;
    },
    selectionChange(val) {
      this.selectedNum = val.length;
      this.showCopyBtn = val.length == 1 ? true : false;
      this.selectedCopyRows = val.length == 1 ? val : [];
    },
    copySelected() {
      this.$post({
        url: "/_data/task/samplingTask/findCommonTaskList",
        param: { qasPlanId: this.selectedCopyRows[0].qasPlanId },
        fnc: data => {
          let showtype = "success";
          let message = "保存成功";
          if (!data.success) {
            showtype = "warn";
            message = "保存失败";
          }
          this.$message({
            type: showtype,
            message: message
          });
          if (data.success) {
            //获取性质区划信息
            this.showCopyBtn = false;
            this.selectedCopyRows = [];
            //返回消息通知父对象
            this.$emit(this.$constants.COPY_EMIT_DISTRICT, data.rows);
          }
        }
      });
    }
  },
  created() {
    const $this = this;
    this.getLink($this);
    //执行查询列表
    this.do_search();
  },
  props: {
    link: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.year-picker {
  width: 120px;
}
.copyTask_table {
  height: 505px;
}
</style>
