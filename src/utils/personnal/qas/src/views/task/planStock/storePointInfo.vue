<template>
  <div>
    <!-- 查询条件 -->
    <el-form label-width="80px" :inline="true">
      <el-row>
        <el-col :span="21">
          <el-col :span="6">
            <el-form-item label="库点名称:">
              <el-input
                class="dialog_input"
                v-model="searchForm.storePointName"
                placeholder="库点名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行政区域:">
              <el-cascader
                v-model="distinct"
                :options="area_tableData"
                :props="{
                  expandTrigger: 'hover',
                  label: 'text',
                  value: 'id',
                  checkStrictly: true
                }"
                clearable
                placeholder="行政区域"
                ref="searchArea"
                @change="districtChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="3" class="textAlignRight">
          <el-button type="primary" class="search_btn" @click="doSearch">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 列表信息 -->
    <div class="tool-bar bgfff">
      <el-button
        type="primary"
        class="s-tool-btn"
        :disabled="disabledBtn"
        @click.native.prevent="sureSelected"
      >
        确认勾选所属库点仓房
      </el-button>
    </div>
    <tableList
      :tablelistSettings="tablelistSettings"
      @handleTableRowButton="handleTableRowButton"
      @handleTableMutiChecked="handleTableMutiChecked"
      class="maxHeight400"
    ></tableList>
    <pagination
      :paginationSettings="storePointPaginationSettings"
      @handlePaginationPagenumber="storePointHandlePaginationPagenumber"
      @handlePaginationPagesize="storePointHandleSizeChange"
    >
    </pagination>
  </div>
</template>

<script>
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/task/plan/stock/storePointInfoTableHeader.json";

export default {
  name: "storePointInfo",
  data() {
    return {
      collapseActiveName: "1",
      searchForm: {
        storePointName: "",
        distinct: ""
      },
      disabledBtn: true,
      area_tableData: [],
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "light",
          border: true,
          headerOptions: tableHeaderOpts,
          isMultipleTable: true
        }
      },

      storePointPaginationSettings: {
        currentPage: 1,
        pageSize: 10,
        layout: "total,sizes, prev, pager, next, jumper",
        totalNumbers: 0,
        pageSizeChangeList: ["10", "20", "30"]
      },
      selectRowArray: [], //列表选中的数据
      selectPointIdArray: [], //选中的库点id集合
      distinct: ""
    };
  },
  methods: {
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.searchForm.distinct =
        areas[0] && areas[0].value ? areas[0].value : "";
    },
    doSearch() {
      //执行查询
      const $this = this;
      $this.findStorePointInfo($this);
    },
    findStorePointInfo(vm) {
      //参数拼接
      /* let urlParam =
        "pages=" +
        vm.storePointPaginationSettings.currentPage +
        "&rows=" +
        vm.storePointPaginationSettings.pageSize;*/
      let param = {
        pages: vm.storePointPaginationSettings.currentPage,
        rows: vm.storePointPaginationSettings.pageSize
      };
      if (vm.selectGrainBreeds) {
        /*vm.selectGrainBreeds.forEach(item => {
          urlParam += "&grainBreedIds=" + item;
        });*/
        param.grainBreedIds = vm.selectGrainBreeds.join(",");
      }
      if (vm.searchForm.distinct) {
        //urlParam += "&district=" + vm.searchForm.distinct;
        param.district = vm.searchForm.distinct;
      }
      if (vm.searchForm.storePointName) {
        //urlParam += "&name=" + vm.searchForm.storePointName;
        param.name = vm.searchForm.storePointName;
      }
      vm.$get({
        url: "/_data/bsi/storepoint/storepointByStock",
        fnc: data => {
          if (data && data.success) {
            vm.tablelistSettings.tableDatas = data.rows;
            vm.storePointPaginationSettings.totalNumbers = data.total;
            //处理操作添加按钮信息
            vm.tablelistSettings.tableDatas.map(function(arg) {
              arg.operateBtns = [
                { type: "storeHouse", styleType: "text", text: "查看仓房/油罐" }
              ];
            });
          }
        },
        param: param
      });
    },
    handleTableRowButton(scopeRow, type) {
      this.$emit(this.$constants.EMIT_POINTLAYOUT_SHOWTAB, {
        scopeRow: scopeRow,
        type: type
      });
    },
    storePointHandlePaginationPagenumber(num) {
      this.storePointPaginationSettings.currentPage = num;
      this.doSearch();
    },
    storePointHandleSizeChange(num) {
      this.storePointPaginationSettings.pageSize = num;
      this.doSearch();
    },
    handleTableMutiChecked(val) {
      this.disabledBtn = val.length > 0 ? false : true;
      const $this = this;
      $this.selectRowArray = [];
      $this.selectPointIdArray = [];
      if (val.length > 0) {
        val.map(item => {
          let pointId = item.sysId;
          $this.selectRowArray[pointId] = item;
          $this.selectPointIdArray.push(pointId);
        });
      }
    },
    sureSelected() {
      const $this = this;
      //获取勾选库点的所有仓房
      this.$get({
        url: "/_data/bsi/storehouse/listByTypes",
        fnc: data => {
          if (data) {
            let returnArray = [];
            data.map(item => {
              //根据库点id获取已经保存的库点信息
              let pointObject = $this.selectRowArray[item.spId];
              //仓房id
              $this.$set(item, "storeHouseId", item.sysId);
              $this.$set(item, "storeHouseName", item.name);
              //添加库点信息
              $this.$set(item, "storePointId", pointObject.sysId);
              $this.$set(item, "storePointName", pointObject.name);
              //承储企业信息
              $this.$set(item, "district", pointObject.district);
              $this.$set(item, "districtName", pointObject.districtName);
              //区域信息
              $this.$set(item, "storeOrgId", pointObject.orgId);
              $this.$set(item, "storeOrgName", pointObject.orgname);
              returnArray.push(item);
            });
            //确认勾选
            $this.$emit(
              $this.$constants.EMIT_POINTLAYOUT_SUREDATA,
              returnArray
            );
          }
        },
        param: {
          storepointIds: this.selectPointIdArray.join(","),
          grainBreedIds: this.selectGrainBreeds.join(",")
        },
        rej: error => {
          console.log(error);
        }
      });
    }
  },
  created() {
    this.area_tableData = this.$store.getters.get_areaLevel;
    //获取数据源
    this.doSearch();
  },
  props: {
    selectGrainBreeds: {
      type: Array
    }
  }
};
</script>
