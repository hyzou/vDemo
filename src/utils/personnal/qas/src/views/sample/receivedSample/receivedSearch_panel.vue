<template>
  <div>
    <el-collapse v-model="activeName" class="pl15 pr15" accordion>
      <el-collapse-item name="1">
        <el-form label-width="auto" :inline="true">
          <el-row>
            <el-col :span="21">
              <el-col :span="6">
                <el-form-item label="监管环节">
                  <el-select
                    v-model="search.link"
                    placeholder="请选择"
                    @change="changeNature"
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
                <el-form-item label="任务性质">
                  <el-select
                    v-model="search.nature"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in natures"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
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
                    filterable
                    clearable
                    @change="findProductName"
                  >
                    <el-option
                      v-for="item in products"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="所属计划">
                  <el-select
                    v-model="search.planId"
                    placeholder="请选择"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="item in plans"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
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
                <el-form-item label="状态">
                  <el-select
                    v-model="search.status"
                    placeholder="请选择"
                    clearable
                  >
                    <template v-for="item in statuss">
                      <el-option
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                        v-if="item.value != '0' && item.value != '9'"
                      >
                      </el-option>
                    </template>
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
  </div>
</template>

<script>
export default {
  name: "receivedSearch_panel",
  data() {
    return {
      activeName: "1", //默认激活面板
      //查询面板数据模型
      search: {
        createdS: "",
        createdE: "",
        link: "1", //默认新粮收获
        nature: "",
        product: "",
        productName: "",
        planId: "",
        status: ""
      },
      sampleObject: {
        qasSampleId: 0
      },
      links: [],
      natures: [],
      products: [],
      plans: [],
      statuss: [],
      currentPageSet: 0
    };
  },
  //计算属性,依赖缓存
  computed: {},
  components: {},
  methods: {
    //面板初始化
    init() {
      const vm = this;
      this.initCommonMethod(vm);
    },
    initCommonMethod(vm) {
      //获取监管环节
      vm.$Api.getDic("qas_plan_link").then(data => {
        vm.links = data;
      });
      //产品品种
      vm.products = vm.$store.getters.products;
      vm.findNature(vm);
      //状态
      vm.$Api.getDic("qas_sample_status").then(data => {
        vm.statuss = data;
      });
      //获取所属任务
      vm.$get({
        url: "/_data/sample/sample/findReceivedSamplePlanName",
        fnc: data => {
          vm.plans = data;
        }
      });
    },
    findNature(vm) {
      let natureType = "qas_nature_reap"; //默认新粮收获
      if (this.$constants.LINK_STOCK == vm.search.link) {
        natureType = "qas_nature_stock";
      } else if (this.$constants.LINK_MARKET == vm.search.link) {
        natureType = "qas_nature_market";
      }
      this.$Api.getDic(natureType).then(data => {
        vm.natures = data;
      });
    },
    changeNature() {
      this.findNature(this);
    },
    findProductName(val) {
      if (!val) {
        return false;
      }
      this.products.map(p => {
        if (p.id == this.search.product) {
          this.productName = p.text;
        }
      });
    },
    do_search() {
      let param = {
        page: this.currentPageNum === 0 ? 1 : this.currentPageNum,
        rows: this.pageSizeNum
      };
      if (this.search.productName) {
        param.productName = this.search.productName;
      }
      if (this.search.createdS) {
        param.createdS = this.search.createdS;
      }
      if (this.search.createdE) {
        param.createdE = this.search.createdE;
      }
      if (this.search.link) {
        param.link = this.search.link;
      }
      if (this.search.nature) {
        param.nature = this.search.nature;
      }
      if (this.search.planId) {
        param.qasPlanId = this.search.planId;
      }
      if (this.search.status) {
        param.status = this.search.status;
      }
      this.$get({
        url: "/_data/sample/sample/pageReceivedSample",
        fnc: data => {
          this.$store.dispatch("set_data", data);
          //传递给父页面 总数量
          this.$emit(this.$constants.EMIT_TRANSFTOALNUM, data.total);
        },
        param: param
      });
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageSizeNum: {
      handler(val) {
        if (this.pageSizeNum != val) {
          console.log("pageSizeNum:" + val);
          this.do_search();
        }
      },
      immediate: true
    },
    currentPageNum: {
      handler(val) {
        if (this.currentPageSet != val) {
          console.log("currentPageNum:" + val);
          this.do_search();
          this.currentPageSet = val;
        }
      },
      immediate: true
    }
  },
  props: {
    pageSizeNum: {
      type: Number,
      default: 10
    },
    currentPageNum: {
      type: Number,
      default: 1
    }
  }
};
</script>
<style>
.el-row {
  margin-bottom: 10px;
}
</style>
