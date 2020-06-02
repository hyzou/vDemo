<template>
  <div>
    <el-form
      label-width="110px"
      :inline="true"
      ref="summarySearchForm"
      :model="search"
    >
      <el-row>
        <el-col :span="21">
          <el-col :span="8">
            <el-form-item label="品种">
              <el-select
                v-model="search.productBreeds"
                placeholder="请选择"
                multiple
                clearable
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
          <el-col :span="8">
            <el-form-item
              label="储备粮性质"
              prop="nature"
              :rules="{
                required: true,
                message: '请选择储备粮性质',
                trigger: 'change'
              }"
            >
              <el-select
                v-model="search.grainProperty"
                placeholder="请选择"
                multiple
              >
                <el-option
                  v-for="item in grainPropertySource"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                />
              </el-select>
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
            <el-form-item label="分库点统计" prop="nature">
              <el-select
                v-model="search.storePointCount"
                placeholder="请选择"
                @change="changeDORS"
              >
                <el-option label="是" value="Y" />
                <el-option label="否" value="N" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库点名称" v-if="showPointName">
              <el-input
                v-model="search.storePointName"
                placeholder="请输入库点名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="扦样区域" v-if="showDistrict">
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
  name: "stockSearchPanel04",
  data() {
    return {
      search: {
        createdS: this.$dateUtl.getFullYear() + "",
        createdE: this.$dateUtl.getFullYear() + "",
        district: "",
        productBreeds: "",
        link: "2",
        menuId: "",
        productGrainBreed: "",
        grainProperty: [],
        passResult: [],
        storePointCount: "N",
        storePointName: ""
      },
      grainPropertySource: [],
      district: "",
      regions: [],
      rules: [],
      passResultSource: [],
      showPointName: false,
      showDistrict: true,
      products: []
    };
  },
  methods: {
    findProductLevel1() {
      const $this = this;
      this.$Api.gradeLevel().then(data => {
        $this.products = data;
      });
    },
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.search.district = areas[0] && areas[0].value ? areas[0].value : "";
    },
    findGrainPropertySource() {
      const $this = this;
      this.$Api.getDic("wms_store_grainproperty").then(data => {
        $this.grainPropertySource = data;
      });
    },
    findPassResultSource() {
      const $this = this;
      this.$Api.getDic("wms_bas_qualcheckresult").then(data => {
        $this.passResultSource = data;
      });
    },
    changeDORS(newValue) {
      this.search.storePointName = "";
      this.search.district = "";
      //按库点统计
      if ("Y" == newValue) {
        this.showPointName = true;
        this.showDistrict = false;
      } else {
        this.showPointName = false;
        this.showDistrict = true;
      }
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
          if ($this.search.productBreeds) {
            url += "&productBreeds=" + $this.search.productBreeds;
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
          if (
            $this.search.grainProperty &&
            $this.search.grainProperty.length > 0
          ) {
            url += "&grainPropertys=" + $this.search.grainProperty.join(",");
          }
          if ($this.search.passResult && $this.search.passResult.length > 0) {
            url += "&passResults=" + $this.search.passResult.join(",");
          }
          if ($this.search.storePointCount) {
            url += "&storePointTag=" + $this.search.storePointCount;
          }
          if ($this.search.storePointName) {
            url += "&storePointName=" + $this.search.storePointName;
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
      this.findGrainPropertySource();
      this.findPassResultSource();
      this.findProductLevel1();
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
