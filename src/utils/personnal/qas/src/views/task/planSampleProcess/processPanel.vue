<template>
  <div style="width: calc(100% - 30px)">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-form label-width="80px" :inline="true">
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
                <el-form-item label="计划性质">
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
  </div>
</template>

<script>
export default {
  name: "processPanel",
  data() {
    return {
      activeName: "1",
      search: {
        adminLevel: "",
        link: "1", //监管环节
        nature: "", //计划性质
        createdS: "",
        createdE: ""
      },
      links: [],
      natures: []
    };
  },
  methods: {
    //面板初始化
    init() {
      const vm = this;
      //获取监管环节
      vm.$Api.getDic("qas_plan_link").then(data => {
        vm.links = data;
      });
      this.findNature(this);
      vm.$store.dispatch("set_processData", []); //清空公共存储
      this.do_search();
    },
    //监管级别下拉事件
    changeNature() {
      this.findNature(this);
      let isHideColumn = false;
      if (this.search.link != this.$constants.LINK_REAP) {
        isHideColumn = true;
      }
      this.$emit("isHideColumn", isHideColumn);
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
    do_search() {
      let param = {
        page: this.currentPageNum === 0 ? 1 : this.currentPageNum,
        rows: this.pageSizeNum
      };
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
      if (this.search.link) {
        param.link = this.search.link;
      }
      let vm = this;
      this.$get({
        url: "/_data/task/plan/findProcessPage",
        fnc: data => {
          //添加操作按钮
          data.rows.map(function(row) {
            row.operateBtns = [
              { type: "cargo", styleType: "text", text: "查看进度" }
            ];
          });
          //提交到公共存储
          vm.$store.dispatch("set_processData", data);
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
    value() {
      this.$refs.cascader.toggleDropDownVisible(); //监听值发生变化就关闭它
    },
    pageSizeNum: {
      handler(val) {
        this.do_search();
      },
      immediate: true
    },
    currentPageNum: {
      handler(val) {
        this.do_search();
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

<style scoped></style>
