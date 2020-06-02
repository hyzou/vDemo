<template>
  <div>
    <el-collapse v-model="activeName" class="pl15 pr15" accordion>
      <el-collapse-item name="first">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-form label-width="auto" :inline="true">
          <el-row>
            <el-col :span="21">
              <el-col :span="6">
                <el-form-item label="监管环节">
                  <el-select
                    v-model="search.link"
                    placeholder="请选择"
                    @change="findPlan"
                  >
                    <template v-for="item in links">
                      <el-option
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                        v-if="item.value != 9"
                      >
                      </el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属计划">
                  <el-select
                    v-model="search.qasPlanId"
                    placeholder="请选择"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in plans"
                      :key="item.qasPlanId"
                      :label="item.name"
                      :value="item.qasPlanId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扦样时间">
                  <el-date-picker
                    v-model="search.createdS"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                  <label class="search_label">-</label>
                  <el-date-picker
                    v-model="search.createdE"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品品种">
                  <el-select
                    v-model="search.product"
                    placeholder="请选择"
                    clearable
                    @change="selectChange"
                  >
                    <el-option
                      v-for="item in products"
                      :key="item.sysId"
                      :label="item.name"
                      :value="item.sysId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="3" class="textAlignRight">
              <el-button type="primary" class="search_btn" @click="do_search()">
                查询
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="common_table_container">
      <div class="tool-bar">
        <!--<el-dropdown @command="doSampleAction">
          <el-button class="s-tool-btn">
            批量操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="disabledItem" command="successful"
              >完成审批</el-dropdown-item
            >
            <el-dropdown-item :disabled="disabledItem" command="back" divided
              >回退检测</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>-->
      </div>
      <template>
        <el-table
          ref="multipleTable"
          :data="sampleDataArray"
          stripe
          style="width: 100%"
          :border="true"
          @selection-change="selectionRowsChange"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="name" label="样品名称"> </el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="nature" label="计划性质"> </el-table-column>
          <el-table-column prop="code" label="扦样编号"> </el-table-column>
          <el-table-column prop="isBackup__dsp" label="样品用途" width="80px">
          </el-table-column>
          <el-table-column prop="samplingDt" label="扦样时间" width="100px">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showReceiveSampleDetail(scope.row)"
              >
                详情
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="doReceiveSample(scope.row)"
              >
                收样
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSizeSet"
            :layout="$constants.paginationlayout"
            :total="totalNum"
          >
          </el-pagination>
        </div>
      </template>
    </div>
    <!-- 样品信息弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="确认收样"
      :visible.sync="dialog_show"
      v-if="dialog_show"
      :top="mg_top"
      :width="dialogWith"
      :append-to-body="true"
    >
      <receiveSampleDetail
        ref="receiveSampleDetail"
        :sampleDataObject="sampleObject"
        @successfulReceive="successfulReceive"
        @closeReceive="closeReceive"
      ></receiveSampleDetail>
    </el-dialog>
    <!-- 样品详情 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看样品"
      :visible.sync="dialog_detailshow"
      v-if="dialog_detailshow"
      :width="$constants.dialog_width"
      :top="$constants.dialog_margin_top"
      :append-to-body="true"
    >
      <sampleDetail
        ref="sampleDetail"
        :qasSampleId="sampleObject.qasSampleId"
        @closeSampleDetailShow="closeSampleDetailShow"
      ></sampleDetail>
    </el-dialog>
  </div>
</template>

<script>
import receiveSampleDetail from "./receiveSampleDetail";
import sampleDetail from "./sampleDetail";
export default {
  name: "approvalSampleData",
  data() {
    return {
      activeName: "first",
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage,
      totalNum: 0,
      search: {
        product: "",
        productName: "",
        link: "1",
        qasPlanId: "",
        createdS: "",
        createdE: ""
      },
      products: [],
      sampleDataArray: [],
      disabledItem: true,
      selectSampleRows: [],
      mg_top: "4%",
      dialogWith: "50%",
      dialog_show: false,
      dialog_detailshow: false,
      sampleObject: {
        qasSampleId: 0
      },
      links: [],
      plans: []
    };
  },
  components: {
    receiveSampleDetail: receiveSampleDetail,
    sampleDetail: sampleDetail
  },
  methods: {
    selectionRowsChange(val) {
      this.disabledItem = val.length > 0 ? false : true;
      const $this = this;
      this.selectSampleRows = [];
      val.map(item => {
        $this.selectSampleRows.push({ qasSampleId: item.qasSampleId });
      });
    },
    do_search() {
      /*if (!this.search.qasPlanId) {
        return;
      }*/
      const $this = this;
      let param = {
        page: this.currentPage,
        rows: this.pageSizeSet,
        link: this.search.link
      };
      if (this.search.qasPlanId) {
        param.qasPlanId = this.search.qasPlanId;
      }
      if (this.search.createdS) {
        param.createdS = this.search.createdS;
      }
      if (this.search.createdE) {
        param.createdE = this.search.createdE;
      }
      if (this.search.productName) {
        param.productName = this.search.productName;
      }
      this.$get({
        url: "/_data/sample/sample/pageSampleToReceive",
        fnc: data => {
          if (!data || !data.success) {
            return false;
          }
          data.rows.map(function(arg) {
            arg.samplingDt = $this.$dateUtl.getTime(arg.samplingDt);
            //arg.receiveDt = $this.$dateUtl.getTime(arg.receiveDt);
          });
          $this.sampleDataArray = data.rows;
          $this.totalNum = data.total;
        },
        param: param
      });
    },
    handleSizeChange(val) {
      this.pageSizeSet = val;
      this.do_search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.do_search();
    },
    selectChange() {
      const $this = this;
      let productObject = this.products.filter(item => {
        return item.sysId == $this.search.product;
      });
      this.search.productName =
        productObject && productObject[0] && productObject[0].name
          ? productObject[0].name
          : "";
    },
    doReceiveSample(scopeRow) {
      const $this = this;
      //查找数据 没找到提示:未找到指定样品！  找到信息则弹出信息框
      this.$get({
        url: "/_data/sample/sample/loadSample",
        fnc: data => {
          if (!data.success || !data.data.qasSampleId) {
            this.$message({
              type: "error",
              message: "未找到指定样品！"
            });
            return false;
          }
          let sampleObject = data.data;
          //状态不是待收样
          /* if ($this.$constants.SAMPESTATUE_WAIT_SAMPLE != sampleObject.status) {
            $this.$message({
              type: "warning",
              message: "该样品已经被收样了"
            });
            return false;
          }*/
          $this.$set(
            sampleObject,
            "receiveDt",
            $this.$dateUtl.getTime(sampleObject.receiveDt)
          );
          $this.sampleObject = sampleObject;
          //弹出信息框
          $this.dialog_show = true;
        },
        param: { qasSampleId: scopeRow.qasSampleId }
      });
    },
    successfulReceive(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.$message({
        type: "success",
        message: "收样成功"
      });
      this.dialog_show = false;
      this.do_search();
    },
    closeReceive(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.dialog_show = false;
    },
    showReceiveSampleDetail(scopeRow) {
      this.sampleObject.qasSampleId = scopeRow.qasSampleId;
      this.dialog_detailshow = true;
    },
    closeSampleDetailShow(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.dialog_detailshow = false;
    },
    findLinks() {
      const $this = this;
      this.$Api.getDic("qas_plan_link").then(data => {
        $this.links = data;
        $this.search.link = data && data.length > 0 ? data[0].value : "";
      });
    },
    findPlan() {
      const $this = this;
      let param = {
        link: this.search.link
      };
      this.$get({
        url: "/_data/task/plan/listNeedSampleReceivePlan",
        fnc: data => {
          if (!data || !data.success || !data.data) {
            $this.plans = [];
            return false;
          }
          $this.plans = data.data;
        },
        param: param
      });
    }
  },
  /*props: {
    planObject: {
      type: Object
    }
  },
  watch: {
    planObject: {
      handler(val) {
        if (!val) {
          return false;
        }
        this.search.link = val.link;
        this.search.qasPlanId = val.qasPlanId;
        this.do_search();
      },
      immediate: true
    }
  },*/
  mounted() {
    this.do_search();
  },
  created() {
    const $this = this;
    this.$Api.gradeLevel().then(data => {
      $this.products = data;
    });
    this.findLinks();
    this.findPlan();
  }
};
</script>
