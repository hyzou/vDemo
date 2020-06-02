<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <span class="panel_tit">查询条件</span>
      </template>
      <el-form label-width="auto" :inline="true">
        <el-row>
          <el-col :span="21">
            <el-col :span="6">
              <el-form-item label="监测级别">
                <el-select
                  v-model="search.adminLevel"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in $store.getters.admins"
                    :key="item.text"
                    :label="item.text"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="完成状态">
                <el-select
                  v-model="search.overFlag"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in search.overFlags"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="search.createdS"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  class="search_date"
                >
                </el-date-picker>
                <label class="search_label">至</label>
                <el-date-picker
                  v-model="search.createdE"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  class="search_date"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="showVisiable">
              <el-form-item label="产品品种">
                <el-cascader
                  v-model="search.product"
                  :options="$store.getters.products"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'text',
                    value: 'id',
                    checkStrictly: true
                  }"
                  ref="productLabel"
                  @change="handChange"
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划性质">
                <el-select
                  v-model="search.nature"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in search.natures"
                    :key="item.text"
                    :label="item.text"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="3" class="textAlignRight">
            <el-button type="primary" class="search_btn" @click="do_search()"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "search_panel",
  data() {
    return {
      activeName: "1", //默认激活面板
      //查询面板数据模型
      search: {
        adminLevel: "", //监测级别model
        nature: "", //计划性质model
        natures: [], //计划性质下拉数据
        overFlag: "0", //完成状态model,默认未完成
        overFlags: [], //完成状态下拉数据
        product: "", //产品种类Model
        productName: "", //产品种类名称
        createdS: "", //创建开始时间model
        createdE: "" //创建结束时间model
      },
      showVisiable: true,
      oldCurrentPage: 0
    };
  },
  //计算属性,依赖缓存
  computed: {},
  methods: {
    //面板初始化
    init() {
      const vm = this;
      this.initCommonMethod(vm);
      this.do_search();
    },
    initCommonMethod(vm) {
      //获取计划性质
      let type = "";
      if (this.$constants.ROUTEID_SAMPLEREAP == this.$route.params.id) {
        type = "qas_nature_reap";
      } else if (this.$constants.ROUTEID_SAMPLESTOCK == this.$route.params.id) {
        type = "qas_nature_stock";
      } else if (
        this.$constants.ROUTEID_SAMPLEMARKET == this.$route.params.id
      ) {
        type = "qas_nature_market";
      }
      this.$Api.getDic(type).then(data => {
        vm.search.natures = data;
        this.$store.dispatch("set_natures", data); //保存到全局供其他子组件调用
      });
      this.$Api.getOverFlag().then(data => {
        vm.search.overFlags = data;
      });
    },
    //查询按钮点击事件
    do_search() {
      let param = {
        page: this.currentPageNum === 0 ? 1 : this.currentPageNum,
        rows: this.pageSizeNum
      };
      if (1 < this.search.product.length) {
        param.grainBreed = this.search.product[this.search.product.length - 1];
      } else if (this.search.productName) {
        param.productName = this.search.productName;
      }
      if (this.search.createdS) {
        param.createdS = this.search.createdS;
      }
      if (this.search.createdE) {
        param.createdE = this.search.createdE;
      }
      if (this.search.adminLevel) {
        param.adminLevel = this.search.adminLevel;
      }
      if (this.search.nature) {
        param.nature = this.search.nature;
      }
      if (this.search.overFlag) {
        param.overFlag = this.search.overFlag;
      }
      this.$get({
        url: this.get_ulr(),
        fnc: data => {
          this.$store.dispatch("set_data", data);
          //传递给父页面 总数量
          this.$emit(this.$constants.EMIT_TRANSFTOALNUM, data.total);
        },
        param: param
      });
    },
    handChange() {
      let name = this.$refs["productLabel"].getCheckedNodes();
      this.search.productName = name[0] ? name[0].label : "";
    },
    //根据路由参数获取请求路径
    get_ulr() {
      let route_param_id = this.$route.params.id;
      switch (route_param_id) {
        case this.$constants.ROUTEID_SAMPLESTOCK:
          return "/_data/task/plan/findStockPageVo";
        case this.$constants.ROUTEID_SAMPLEMARKET:
          return "/_data/task/plan/findMarketPageVo";
        default:
          return "/_data/task/plan/findReapPageVo";
      }
    }
  },
  created() {
    this.showVisiable =
      this.$route.params.id === this.$constants.ROUTEID_SAMPLEREAP
        ? true
        : false;
    this.init();
  },
  watch: {
    value() {
      this.$refs.cascader.toggleDropDownVisible(); //监听值发生变化就关闭它
    },
    pageSizeNum: {
      handler(val) {
        //if (this.pageSizeNum != val) {
        this.do_search();
        // }
      },
      immediate: true
    },
    currentPageNum: {
      handler() {
        // if (this.oldCurrentPage != val) {
        this.do_search();
        // }
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
