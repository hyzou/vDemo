<template>
  <div>
    <el-form
      label-width="100px"
      :inline="true"
      ref="summarySearchForm"
      :model="search"
    >
      <el-row>
        <el-col :span="21">
          <el-col :span="8">
            <el-form-item label="品种">
              <el-cascader
                v-model="search.productGrainBreed"
                :options="$store.getters.products"
                :props="{
                  expandTrigger: 'hover',
                  label: 'text',
                  value: 'id',
                  checkStrictly: true
                }"
                ref="productGrainBreedCascader"
                clearable
                @change="productGrainBreedChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          </el-col>
          <el-col :span="8">
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
          </el-col>
          <el-col :span="8">
            <el-form-item label="扦样时间">
              <el-date-picker
                v-model="search.createdS"
                type="year"
                placeholder="请选择"
                value-format="yyyy"
                :clearable="false"
                class="dateCss"
              >
              </el-date-picker>
              <label class="search_label">-</label>
              <el-date-picker
                v-model="search.createdE"
                type="year"
                placeholder="请选择"
                value-format="yyyy"
                :clearable="false"
                class="dateCss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="3" class="textAlignRight">
          <el-button type="primary" class="search_btn" @click="searchData()">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "reapSearchPanel04",
  data() {
    return {
      search: {
        createdS: this.$dateUtl.getFullYear() + "",
        createdE: this.$dateUtl.getFullYear() + "",
        district: "",
        productBreed: "",
        ruleId: "",
        product: "",
        link: "1",
        menuId: "",
        productGrainBreed: ""
      },
      district: "",
      regions: [],
      rules: []
    };
  },
  methods: {
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.search.district = areas[0] && areas[0].value ? areas[0].value : "";
    },
    //获取创建好的规则
    listRules() {
      if (!this.search.menuId) {
        return false;
      }
      let param = this.search;
      const $this = this;
      this.$get({
        url: "/_data/statistical/ruleSetting/listRule",
        param: param,
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
    searchData() {
      const $this = this;
      //没有选择规则
      this.$refs["summarySearchForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        $this.$Api.getReportServer().then(data => {
          //  this.reportDialogSetting.title = "新粮收获报表";
          let menuId = $this.search.menuId;
          let reportName = menuId;
          reportName += ".cpt";
          let url =
            data.label +
            reportName +
            "&contextPath=" +
            data.value.substr(data.value.indexOf(":") + 3);
          //选择的规则
          if ($this.search.ruleId) {
            url += "&qasStatRuleId=" + $this.search.ruleId;
          }
          if ($this.search.productBreed) {
            url += "&grainBreed=" + $this.search.productBreed;
          }
          if ($this.search.product) {
            url += "&product=" + $this.search.product;
          }
          if ($this.search.link) {
            url += "&link=" + $this.search.link;
          }
          if ($this.search.createdS) {
            url += "&createdS=" + $this.search.createdS;
          }
          if ($this.search.createdE) {
            url += "&createdE=" + $this.search.createdE;
          }
          if ($this.search.district) {
            url += "&district=" + $this.search.district;
          }
          url += "&op=view";
          //返回父页面拼装好的链接
          $this.$emit("doSearch", url);
        });
      });
    },
    productGrainBreedChange(val) {
      if (val.length == 0) {
        this.search.product = "";
        this.search.grainBreed = "";
        return false;
      }
      //length == 1 则只赋值product
      if (val.length == 1) {
        this.search.product = val[0];
        return false;
      }
      this.search.product = val[0];
      this.search.productBreed = val[val.length - 1];
      this.listRules();
    },
    mountedData() {
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
    }
  },
  created() {
    this.mountedData();
  },
  props: {
    defaultSearchData: {
      type: Object
    }
  },
  watch: {
    defaultSearchData: {
      handler(val) {
        this.search.link = val.selectedLink;
        this.search.menuId = val.menuid;
        this.listRules();
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
