<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-row>
          <el-col :span="24">
            <label class="search_label">扦样时间</label>
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
            <label class="search_label">产品品种</label>
            <el-select
              v-model="search.product"
              placeholder="请选择"
              class="search_input"
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
            <label class="search_label">计划</label>
            <!-- 是否禁用渐变动画 是的话设置参数为disable-transitions="true" -->
            <el-tag
              v-for="tag in selectPlans"
              :key="tag.qasPlanId"
              closable
              @close="clearPlan(tag)"
              disable-transitions="false"
            >
              {{ tag.name }}
            </el-tag>
            <el-button
              icon="el-icon-search"
              @click="choosePlan"
              style=" margin-left: 10px;"
              round
            >
              选择计划
            </el-button>
            <el-button type="primary" class="search_btn" @click="do_search()">
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      title="选择计划"
      :visible.sync="dialog_choosePlan"
      :width="dialogWidth"
      :top="$constants.dialog_margin_top"
      v-if="dialog_choosePlan"
    >
      <searchPlan
        ref="searchPlan"
        @btnShowCallback="btnShowCallback"
      ></searchPlan>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="choosePlanSure"
          :disabled="sureBtnDisabled"
          v-if="dialog_choosePlan"
        >
          确定
        </el-button>
        <el-button @click="dialog_choosePlan = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchPlan from "../resultSearch/searchPlan";
export default {
  name: "searchPanel",
  data() {
    return {
      activeName: "1",
      search: {
        product: "",
        productName: "",
        qasPlanId: "",
        planName: "",
        createdS: "",
        createdE: ""
      },
      products: [],
      currentPageNum: 1,
      pageSizeNum: 10,
      dialog_choosePlan: false,
      dialogWidth: "50%",
      selectPlans: [],
      sureBtnDisabled: true
    };
  },
  components: {
    searchPlan: searchPlan
  },
  methods: {
    do_search() {
      let param = {
        page: this.currentPageNum === 0 ? 1 : this.currentPageNum,
        rows: this.pageSizeNum
      };
      if (this.search.productName) {
        param.productName = encodeURIComponent(this.search.productName);
      }
      if (this.search.createdS) {
        param.createdS = this.search.createdS;
      }
      if (this.search.createdE) {
        param.createdE = this.search.createdE;
      }
      if (this.search.qasPlanId) {
        param.qasPlanId = this.search.qasPlanId;
      }
      /*if (this.search.planName) {
        param.qasPlanName = encodeURIComponent(this.search.planName);
      }*/
      this.$get({
        url: "/_data/sample/sample/pageApprovalOrEndSample",
        fnc: data => {
          this.$store.dispatch("set_data", data);
          //传递给父页面 总数量
          this.$emit(this.$constants.EMIT_TRANSFTOALNUM, data.total);
        },
        param: param
      });
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
    choosePlan() {
      this.dialog_choosePlan = true;
    },
    //选择计划
    choosePlanSure() {
      //关闭
      this.dialog_choosePlan = false;
      this.selectPlans = [];
      if (!this.$refs.searchPlan.choosePlanData) {
        return false;
      }
      //获取选中的值
      this.search.qasPlanId = this.$refs.searchPlan.choosePlanData.qasPlanId;
      this.search.planName = this.$refs.searchPlan.choosePlanData.qasPlanName;
      this.selectPlans.push({
        qasPlanId: this.search.qasPlanId,
        name: this.search.planName
      });
    },
    btnShowCallback(val) {
      this.sureBtnDisabled = val;
    },
    clearPlan(tag) {
      this.search.qasPlanId = 0;
      this.search.planName = "";
      this.selectPlans.splice(this.selectPlans.indexOf(tag), 1);
    }
  },
  created() {
    const $this = this;
    this.$Api.gradeLevel().then(data => {
      $this.products = data;
    });
  },
  watch: {
    pageObject: {
      handler(val) {
        this.currentPageNum = val.currentPageNum;
        this.pageSizeNum = val.pageSizeNum;
        this.do_search();
      },
      immediate: true
    }
  },
  props: {
    pageObject: {
      type: Object
    }
  }
};
</script>
