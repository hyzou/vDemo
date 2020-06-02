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
        <el-dropdown @command="sampleBatchAction">
          <el-button class="s-tool-btn">
            批量操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="disabledItem" command="successful">
              完成审批
            </el-dropdown-item>
            <el-dropdown-item :disabled="disabledItem" command="back" divided>
              回退检测
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
                @click="showReceiveSampleDetail(scope.row)"
              >
                查看样品
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="showResult(scope.row)"
              >
                查看结果
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="sucessOrBack(scope.row, 'successful')"
              >
                完成
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="sucessOrBack(scope.row, 'back')"
              >
                回退
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
    <!-- 查看结果 -->
    <el-dialog
      title="查看质检结果"
      :close-on-click-modal="false"
      :visible.sync="dialogResultEnterVisible"
      v-if="dialogResultEnterVisible"
      :width="$constants.dialog_width"
      :top="$constants.dialog_margin_top"
    >
      <resultEnterDetail
        ref="resultEnterDetail"
        :resultEnterObject="resultEnterObject"
        class="height600"
      ></resultEnterDetail>
      <div slot="footer" class="dialog-footer" style="margin-top: 40px">
        <el-button @click="dialogResultEnterVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sampleDetail from "../receiveSample/sampleDetail";
import resultEnterDetail from "../resultEnter/resultEnterDetail";
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
      dialog_detailshow: false,
      qasSampleId: 0,
      dialogResultEnterVisible: false,
      resultEnterObject: null,
      links: [],
      plans: []
    };
  },
  components: {
    sampleDetail: sampleDetail,
    resultEnterDetail: resultEnterDetail
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
    sampleBatchAction(commond) {
      let url = "";
      let successText = "操作成功";
      let content = "";
      //批量完成
      if ("successful" == commond) {
        url = "/_data/sample/sample/sampleApprovalSuccess";
        successText = "完成审批成功";
        content = "确认完成已选择的样品？";
      }
      //回退检测
      else if ("back" == commond) {
        url = "/_data/sample/sample/sampleApprovalBack";
        successText = "回退样品成功";
        content = "确认回退该样品？";
      }
      if (!url) {
        return false;
      }
      //弹窗
      let param = {
        content: content,
        url: url,
        sucessText: successText,
        errorText: "操作失败",
        cancelText: "已取消操作",
        qasSampleColumnVoList: {
          qasPlanId: this.search.qasPlanId,
          qasSampleColumnVoList: this.selectSampleRows
        }
      };
      this.toSampleAction(param);
    },
    toSampleAction(param) {
      const $this = this;
      //弹窗
      this.$confirm(param.content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $this.$post({
            url: param.url,
            param: param.qasSampleColumnVoList,
            fnc: data => {
              let showtype = "success";
              let message = param.sucessText;
              if (!data.success) {
                showtype = "warn";
                message = param.errorText;
              }
              $this.$message({
                type: showtype,
                message: message
              });
              if (data.success) {
                //重新查询
                $this.currentPage = 1;
                $this.do_search();
              }
            }
          });
        })
        .catch(() => {
          $this.$message({
            type: "info",
            message: param.cancelText
          });
        });
    },
    do_search() {
      /* if (!this.search.qasPlanId) {
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
        url: "/_data/sample/sample/pageSampleToApproval",
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
    //回退或是完成
    sucessOrBack(scopeRow, type) {
      let url = "";
      let successText = "操作成功";
      let content = "";
      switch (type) {
        case "successful":
          url = "/_data/sample/sample/sampleApprovalSuccess";
          successText = "完成审批成功";
          content = "确认完成已选择的样品？";
          break;
        case "back":
          url = "/_data/sample/sample/sampleApprovalBack";
          successText = "回退样品成功";
          content = "确认回退该样品？";
          break;
        default:
          break;
      }
      if (!url) {
        return false;
      }
      let qasObject = { qasSampleId: scopeRow.qasSampleId };
      let qasSampleArray = [];
      qasSampleArray.push(qasObject);
      //弹窗
      let param = {
        content: content,
        url: url,
        sucessText: successText,
        errorText: "操作失败",
        cancelText: "已取消操作",
        qasSampleColumnVoList: {
          qasPlanId: scopeRow.qasPlanId,
          qasSampleColumnVoList: qasSampleArray
        }
      };
      this.toSampleAction(param);
    },
    showReceiveSampleDetail(scopeRow) {
      this.qasSampleId = scopeRow.qasSampleId;
      this.dialog_detailshow = true;
    },
    closeSampleDetailShow(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.dialog_detailshow = false;
    },
    showResult(scopeRow) {
      this.resultEnterObject = { qasSampleId: scopeRow.qasSampleId };
      this.dialogResultEnterVisible = true;
    },
    findLinks() {
      const $this = this;
      this.$Api.getDic("qas_plan_link").then(data => {
        $this.links = data;
        $this.search.link = data && data.length > 0 ? data[0].value : "";
        $this.findPlan();
        // $this.do_search();
      });
    },
    findPlan() {
      const $this = this;
      let param = {
        link: this.search.link
      };
      this.$get({
        url: "/_data/task/plan/listNeedSampleApprovalPlan",
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
  }
};
</script>
