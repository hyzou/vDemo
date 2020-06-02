<template>
  <div>
    <!-- 查询条件 -->
    <el-form label-width="110px" :inline="true">
      <el-row>
        <el-col :span="21">
          <el-col :span="6">
            <el-form-item label="仓房/油罐名称:">
              <el-input
                class="dialog_input"
                v-model="searchForm.name"
                placeholder="仓房/油罐名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="仓房/油罐编号:">
              <el-input
                class="dialog_input"
                v-model="searchForm.code"
                placeholder="仓房/油罐编号"
              ></el-input>
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
        >确认勾选</el-button
      >
    </div>
    <tableList
      :tablelistSettings="tablelistSettings"
      @handleTableRowButton="storeHouseHandleTableRowButton"
      @handleTableMutiChecked="storeHandleTableMutiChecked"
      class="maxHeight400"
    ></tableList>
    <pagination
      :paginationSettings="storeHousePaginationSettings"
      @handlePaginationPagenumber="storeHouseHandlePaginationPagenumber"
    >
    </pagination>
  </div>
</template>

<script>
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/task/plan/stock/storeHouseInfoTableHeader.json";
export default {
  name: "storeHouseInfo",
  data() {
    return {
      disabledBtn: true,
      searchForm: {
        name: "",
        code: ""
      },
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

      storeHousePaginationSettings: {
        currentPage: 1,
        pageSize: 10,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      selectRowArray: [] //列表选中的数据
    };
  },
  methods: {
    doSearch() {
      //执行查询
      const $this = this;
      $this.findStoreHouseInfo($this);
    },
    findStoreHouseInfo(vm) {
      if (!vm.storePointId) {
        return false;
      }
      //参数拼接
      /*   let urlParam =
        "pages=" +
        vm.storeHousePaginationSettings.currentPage +
        "&rows=" +
        vm.storeHousePaginationSettings.pageSize +
        "&spId=" +
        vm.storePointId;*/
      let param = {
        pages: vm.storeHousePaginationSettings.currentPage,
        rows: vm.storeHousePaginationSettings.pageSize,
        spId: vm.storePointId
      };
      if (vm.selectGrainBreeds) {
        /*vm.selectGrainBreeds.forEach(item => {
          urlParam += "&grainBreedIds=" + item;
        });*/
        param.grainBreedIds = vm.selectGrainBreeds.join(",");
      }
      if (vm.searchForm.name) {
        //urlParam += "&name=" + vm.searchForm.name;
        param.name = vm.searchForm.name;
      }
      if (vm.searchForm.code) {
        //urlParam += "&code=" + vm.searchForm.code;
        param.code = vm.searchForm.code;
      }
      vm.$get({
        url: "/_data/bsi/storehouse/storehouseByStock",
        fnc: data => {
          if (data && data.success) {
            vm.tablelistSettings.tableDatas = data.rows;
            vm.storeHousePaginationSettings.totalNumbers = data.total;
            //处理操作添加按钮信息
            vm.tablelistSettings.tableDatas.map(function(arg) {
              arg.storePointName = vm.storePointName;
              arg.operateBtns = [
                { type: "cargo", styleType: "text", text: "查看货位" }
              ];
            });
          }
        },
        param: param
      });
    },
    storeHouseHandlePaginationPagenumber(num) {
      this.storeHousePaginationSettings.currentPage = num;
      this.doSearch();
    },
    storeHouseHandleTableRowButton(scopeRow, type) {
      this.$emit(this.$constants.EMIT_POINTLAYOUT_SHOWTAB, {
        scopeRow: scopeRow,
        type: type
      });
    },
    storeHandleTableMutiChecked(val) {
      this.disabledBtn = val.length > 0 ? false : true;
      this.selectRowArray = val;
    },

    sureSelected() {
      this.selectRowArray.map(function(arg) {
        arg.storeHouseCode = arg.code;
        arg.storeHouseId = arg.sysId;
        arg.storeHouseName = arg.name;
      });
      //确认勾选
      this.$emit(
        this.$constants.EMIT_POINTLAYOUT_SUREDATA,
        this.selectRowArray
      );
    }
  },
  created() {
    //this.doSearch();
  },
  props: {
    storePointId: {
      type: String,
      default: ""
    },
    storePointName: {
      type: String,
      default: ""
    },
    selectGrainBreeds: {
      type: Array
    }
  },
  watch: {
    storePointId: {
      handler: function(newVal) {
        if (!newVal) {
          return false;
        }
        this.doSearch();
      },
      immediate: true
    }
  }
};
</script>
