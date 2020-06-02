<template>
  <div>
    <el-collapse v-model="activeName" accordion class="pl15 pr15">
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
                <!-- <label class="search_label">任务性质</label>
            <el-select
              v-model="search.nature"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in natures"
                :key="item.text"
                :label="item.text"
                :value="item.value"
              >
              </el-option>
            </el-select>-->
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
              <el-col :span="6">
                <el-form-item label="样品编号">
                  <el-input v-model="search.sampleCode"></el-input>
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
      <div class="tool-bar"></div>
      <div class="mt20 ml20 mr20">
        <el-table
          ref="multipleTable"
          :data="sampleDataArray"
          stripe
          :border="true"
          style="width: 100%"
          @selection-change="selectionRowsChange"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="样品名称"> </el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="nature" label="计划性质"> </el-table-column>
          <el-table-column prop="testCode" label="检测编号"> </el-table-column>
          <el-table-column prop="isBackup__dsp" label="样品用途" width="80px">
          </el-table-column>
          <el-table-column prop="status__dsp" label="检测状态" width="100px">
          </el-table-column>
          <el-table-column prop="samplingDt" label="扦样时间" width="100px">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="sampleDetail(scope.row)"
              >
                查询样品
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="resultEnter(scope.row)"
              >
                录入结果
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="successSample(scope.row)"
              >
                完成
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </div>

    <el-dialog
      title="质检结果录入"
      :close-on-click-modal="false"
      :visible.sync="dialogResultEnterVisible"
      v-if="dialogResultEnterVisible"
      :width="$constants.dialog_width"
      top="2%"
    >
      <resultEnter
        ref="resultEnter"
        :resultEnterObject="resultEnterObject"
        class="height650"
      ></resultEnter>
      <div slot="footer" class="dialog-footer" style="margin-top: 40px;">
        <el-button type="primary" @click="saveSampleInfo">
          确定
        </el-button>
        <el-button @click="dialogResultEnterVisible = false">
          关闭
        </el-button>
      </div>
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
        :qasSampleId="qasSampleId"
        @closeSampleDetailShow="closeSampleDetailShow"
      ></sampleDetail>
    </el-dialog>

    <!-- 选择审批人员弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      title="完成"
      :visible.sync="dialog_sampleOverShow"
      v-if="dialog_sampleOverShow"
      width="40%"
      :top="$constants.dialog_margin_top"
      :append-to-body="true"
    >
      <!-- 指定审批人员 -->
      <approval ref="approval"></approval>
      <div slot="footer" class="dialog-footer" style="margin-top: 10px">
        <el-button type="primary" @click="approvalYes">
          确定
        </el-button>
        <el-button @click="dialog_sampleOverShow = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import resultEnter from "./resultEnter";
import sampleDetail from "../receiveSample/sampleDetail";
import approval from "./approvalPerson";
export default {
  name: "sampleData",
  data() {
    return {
      activeName: "first",
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage,
      totalNum: 0,
      search: {
        nature: "",
        product: "",
        productName: "",
        sampleCode: "",
        link: "1",
        qasPlanId: ""
      },
      natures: [],
      products: [],
      sampleDataArray: [],
      dialogResultEnterVisible: false,
      resultEnterObject: null,
      dialog_detailshow: false,
      qasSampleId: 0,
      selectionSampleIdRows: [],
      dialog_sampleOverShow: false,
      links: [],
      plans: []
    };
  },
  components: {
    sampleDetail: sampleDetail,
    resultEnter: resultEnter,
    approval: approval
  },
  methods: {
    do_search() {
      /* if (!this.search.qasPlanId) {
        return;
      }*/
      const $this = this;
      let param = {
        page: this.currentPage,
        rows: this.pageSizeSet,
        qasPlanId: this.search.qasPlanId,
        link: this.search.link
      };
      if (this.search.nature) {
        param.nature = this.search.nature;
      }
      if (this.search.sampleCode) {
        param.code = this.search.sampleCode;
      }
      if (this.search.productName) {
        param.productName = this.search.productName;
      }
      this.$get({
        url: "/_data/sample/sample/pageSample",
        fnc: data => {
          if (!data || !data.success) {
            return false;
          }
          data.rows.map(function(arg) {
            arg.samplingDt = $this.$dateUtl.getTime(arg.samplingDt);
            arg.receiveDt = $this.$dateUtl.getTime(arg.receiveDt);
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
    /* findNatures() {
      if (!this.search.link) {
        return [];
      }
      let type = this.search.link
        ? this.search.link === "1"
          ? "qas_nature_reap"
          : this.search.link === "2"
          ? "qas_nature_stock"
          : this.search.link === "3"
          ? "qas_nature_stock"
          : ""
        : "";
      if (!type) {
        return [];
      }
      const $this = this;
      this.$Api.getDic(type).then(data => {
        $this.natures = data;
      });
    },*/
    resultEnter(scopeRow) {
      this.resultEnterObject = null;
      this.resultEnterObject = scopeRow;
      this.dialogResultEnterVisible = true;
    },
    //样品详情
    sampleDetail(scopeRow) {
      this.qasSampleId = scopeRow.qasSampleId;
      this.dialog_detailshow = true;
    },
    selectionRowsChange(val) {
      this.selectionSampleIdRows = [];
      const $this = this;
      val.map(item => {
        $this.selectionSampleIdRows.push({ qasSampleId: item.qasSampleId });
      });
    },
    //完成录入样品
    successSample(scopeRow) {
      this.selectionSampleIdRows = [];
      this.selectionSampleIdRows.push({ qasSampleId: scopeRow.qasSampleId });
      this.enterSampleOVer();
    },
    enterSampleOVer() {
      //先弹出选择指定审批人员  选择完毕之后 执行方法
      this.dialog_sampleOverShow = true;
    },
    approvalYes() {
      //参数里包括制定审批的人员
      const $this = this;
      this.$refs.approval.$refs["approvalForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        if (
          !$this.selectionSampleIdRows ||
          $this.selectionSampleIdRows.length == 0
        ) {
          return false;
        }

        let param = {
          qasSampleColumnVoList: $this.selectionSampleIdRows,
          auditBy: $this.$refs.approval.dataSourceForm.auditBy
        };
        $this.$post({
          url: "/_data/sample/sample/enterSampleOver",
          param: param,
          fnc: data => {
            if (!data.success) {
              $this.$message({
                type: "error",
                message: "操作失败"
              });
              return false;
            }
            $this.do_search();
            $this.dialog_sampleOverShow = false;
          }
        });
      });
    },
    closeSampleDetailShow(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.dialog_detailshow = false;
    },
    saveSampleInfo() {
      const $this = this;
      this.$refs.resultEnter.$refs["sampleInfoForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        let param = {
          qasSample: $this.$refs.resultEnter.dataSource.sampleInfo,
          qasTestVoList:
            $this.$refs.resultEnter.dataSource.sampleCheckItemsDataArray,
          stdSuitList: $this.$refs.resultEnter.dataSource.sampleInfo.stdSuitList
        };
        $this.$post({
          url: "/_data/sample/sample/enterSampleSave",
          param: param,
          fnc: data => {
            if (!data.success) {
              $this.$message({
                type: "error",
                message: "操作失败"
              });
              return false;
            }
            $this.dialogResultEnterVisible = false;
          }
        });
      });
    },
    findLinks() {
      const $this = this;
      this.$Api.getDic("qas_plan_link").then(data => {
        $this.links = data;
        $this.search.link = data && data.length > 0 ? data[0].value : "";
        //$this.findNatures($this.search.link);
      });
    },
    findPlan() {
      const $this = this;
      let param = {
        link: this.search.link
      };
      this.$get({
        url: "/_data/task/plan/listNeedSampleEnterPlan",
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
        let oldLink = this.search.link;
        this.search.link = val.link;
        this.search.qasPlanId = val.qasPlanId;
        //查询任务性质
        if (oldLink != this.search.link) {
          this.findNatures();
        }
        this.do_search();
      },
      immediate: true
    }
  },*/
  mounted() {
    this.findPlan();
  },
  created() {
    const $this = this;
    this.$Api.gradeLevel().then(data => {
      $this.products = data;
    });
    this.findLinks();
    this.do_search();
  }
};
</script>
