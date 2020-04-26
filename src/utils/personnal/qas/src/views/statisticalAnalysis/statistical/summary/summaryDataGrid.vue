<template>
  <div>
    <!-- 查询条件：基本查询条件扦样时间、扦样区域、品种、规则(必选，只有一个则选中，多个则下拉框选择) -->
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="first">
        <template slot="title">
          <span class="panel_tit">汇总条件</span>
        </template>
        <el-row>
          <el-col :span="24">
            <el-form
              label-width="100px"
              :inline="true"
              ref="summarySearchForm"
              :model="search"
            >
              <el-form-item label="扦样时间">
                <el-date-picker
                  v-model="search.createdS"
                  type="year"
                  placeholder="请选择"
                  value-format="yyyy"
                  :clearable="false"
                >
                </el-date-picker>
                <label class="search_label">-</label>
                <el-date-picker
                  v-model="search.createdE"
                  type="year"
                  placeholder="请选择"
                  value-format="yyyy"
                  :clearable="false"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="扦样区域">
                <el-cascader
                  :options="regions"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'text',
                    value: 'id',
                    checkStrictly: true
                  }"
                  :clearable="false"
                  v-model="district"
                  ref="searchArea"
                  placeholder="选择区域"
                  @change="districtChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="品种">
                <el-cascader
                  v-model="search.grainBreed"
                  :options="$store.getters.products"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'text',
                    value: 'id'
                  }"
                  ref="productGrainBreedCascader"
                  class="dialog_input"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item
                label="规则"
                prop="ruleId"
                :rules="{
                  required: true,
                  message: '请选择规则',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="search.ruleId"
                  placeholder="请选择"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in rules"
                    :key="item.qasStatRuleId"
                    :label="item.title"
                    :value="item.qasStatRuleId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="计划性质"
                prop="nature"
                :rules="{
                  required: true,
                  message: '请选择计划性质',
                  trigger: 'change'
                }"
                v-if="showParam.showNature"
              >
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
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="search_btn"
                  @click="searchData()"
                >
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="common_table_container">
      <div class="tool-bar"></div>
      <!-- 报表 -->
      <div>
        <iframe
          scrolling="auto"
          frameborder="0"
          v-bind:src="reportUrl"
          style="width:100%;height:600px;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "summaryDataGrid",
  data() {
    return {
      activeName: "first",
      search: {
        createdS: this.$dateUtl.getFullYear() + "",
        createdE: this.$dateUtl.getFullYear() + "",
        district: "",
        grainBreed: "",
        ruleId: "",
        nature: ""
      },
      district: "",
      regions: [],
      rules: [],
      natures: [],
      showParam: {
        showNature: false
      },
      reportUrl: ""
    };
  },
  methods: {
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.search.district = areas[0] && areas[0].value ? areas[0].value : "";
    },
    //获取创建好的规则
    listRules() {
      if (!this.menuData.menuid) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/statistical/ruleSetting/listRulePage",
        param: { menuId: this.menuData.menuid },
        fnc: data => {
          if (!data.success) {
            $this.rules = [];
            return false;
          }
          $this.search.ruleId =
            data.data && data.data.length == 1
              ? data.data[0].qasStatRuleId
              : "";
          $this.rules = data.data;
        }
      });
    },
    findNatures(val) {
      //新粮收获且是质量调查、品质测报检测结果汇总表
      this.showParam.showNature = false;
      if (
        this.$constants.LINK_REAP == val &&
        "4qas_plan_reap_statistical_catalog" == this.menuData.menuid
      ) {
        this.showParam.showNature = true;
      }
      if (!val) {
        return false;
      }
      const $this = this;
      let natureType = "qas_nature_reap"; //默认新粮收获
      if (this.$constants.LINK_STOCK == val) {
        natureType = "qas_nature_stock";
      } else if (this.$constants.LINK_MARKET == val) {
        natureType = "qas_nature_market";
      }
      this.search.link = val;
      this.$Api.getDic(natureType).then(data => {
        $this.natures = data;
      });
    },
    searchData() {
      const $this = this;
      //没有选择规则
      this.$refs["summarySearchForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        $this.$Api.getReportServer().then(data => {
          //  this.reportDialogSetting.title = "新粮收获报表";
          let reportName = $this.menuData.menuid;
          let baseUrl = this.$constants.baseURL;
          let url =
            data +
            "/WebReport/ReportServer?reportlet=statiscal/" +
            reportName +
            "&contextPath=" +
            baseUrl.substr(baseUrl.indexOf("://") + 3);
          //选择的规则
          if ($this.search.ruleId) {
            url += "&qasStatRuleId=" + $this.search.ruleId;
          }
          if ($this.search.grainBreed) {
            url += "&productBreed=" + $this.search.grainBreed;
          }
          if ($this.menuData.selectedLink) {
            url += "&link=" + $this.menuData.selectedLink;
          }
          if ($this.search.nature) {
            url += "&nature=" + $this.search.nature;
          }
          if ($this.search.createdS) {
            url += "&beginYear=" + $this.search.createdS;
          }
          if ($this.search.createdE) {
            url += "&endYear=" + $this.search.createdE;
          }
          if ($this.search.district) {
            url += "&district=" + $this.search.district;
          }
          url += "&op=view";
          $this.reportUrl = url;
        });
      });
    }
  },
  mounted() {
    //不清楚为什么会出现长度为0的情况 在App.vue里设置的
    if (this.$store.getters.get_areaLevel.length == 0) {
      const $this = this;
      this.$get({
        url: "/_data/basic/district2/treeByUser",
        fnc: data => {
          $this.$store.dispatch(
            "set_areaLevel",
            data && data.length > 0 ? data[0].children : []
          );
          $this.regions = $this.$store.getters.get_areaLevel;
          $this.district = $this.$store.getters.get_areaLevel[0].id;
          $this.search.district = $this.district;
        }
      });
    } else {
      this.regions = this.$store.getters.get_areaLevel;
      this.district = this.$store.getters.get_areaLevel[0].id;
      this.search.district = this.district;
    }
  },
  props: {
    menuData: {
      type: Object
    }
  },
  watch: {
    menuData: {
      handler(val) {
        this.findNatures(val.selectedLink);
        this.listRules();
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
