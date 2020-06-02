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
                v-model="productGrainBreed"
                :options="$store.getters.products"
                :props="{
                  expandTrigger: 'hover',
                  label: 'text',
                  value: 'id',
                  multiple: true
                }"
                ref="productGrainBreedCascader"
                clearable
                :show-all-levels="false"
                @change="productGrainBreedChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="达标率"
              prop="nature"
              :rules="{
                required: true,
                message: '请选择达标率',
                trigger: 'change'
              }"
            >
              <el-select
                v-model="search.passResult"
                placeholder="请选择"
                multiple
              >
                <el-option
                  v-for="item in passResultSource"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
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
  name: "marketSearchPanel05",
  data() {
    return {
      search: {
        createdS: this.$dateUtl.getFullYear() + "",
        createdE: this.$dateUtl.getFullYear() + "",
        district: "",
        //productBreed: "",
        // ruleId: "",
        product: "",
        link: "2",
        menuId: "",
        passResult: [],
        productBreeds: ""
      },
      district: "",
      regions: [],
      rules: [],
      passResultSource: [],
      productGrainBreed: []
    };
  },
  methods: {
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.search.district = areas[0] && areas[0].value ? areas[0].value : "";
    },
    findPassResultSource() {
      const $this = this;
      this.$Api.getDic("wms_bas_qualcheckresult").then(data => {
        $this.passResultSource = data;
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
          if ($this.search.productBreeds) {
            url += "&productBreeds=" + $this.search.productBreeds.join(",");
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
          if ($this.search.passResult && $this.search.passResult.length > 0) {
            url += "&passResults=" + $this.search.passResult.join(",");
          }
          url += "&op=view";
          //返回父页面拼装好的链接
          $this.$emit("doSearch", url);
        });
      });
    },
    productGrainBreedChange(val) {
      this.search.productBreeds = "";
      if (val.length == 0) {
        return false;
      }
      let array = [];
      for (let i in val) {
        let object = val[i];
        array.push(object[1]);
      }
      //length == 1 则只赋值product
      /*   if (val.length == 1) {
        this.search.product = val[0];
        return false;
      }
      this.search.product = val[0];
      this.search.productBreed = val[val.length - 1];*/
      this.search.productBreeds = array.join(",");
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
      this.findPassResultSource();
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
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
