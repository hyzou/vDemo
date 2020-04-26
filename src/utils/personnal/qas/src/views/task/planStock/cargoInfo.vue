<!-- 货位信息 -->
<template>
  <div>
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
      @handleTableMutiChecked="cargoHandleTableMutiChecked"
      class="maxHeight400"
    ></tableList>
    <pagination
      :paginationSettings="cargoPaginationSettings"
      @handlePaginationPagenumber="cargoHandlePaginationPagenumber"
    >
    </pagination>
  </div>
</template>

<script>
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/task/plan/stock/cargoInfoTableHeader.json";
export default {
  name: "cargoInfo",
  data() {
    return {
      disabledBtn: true,

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

      cargoPaginationSettings: {
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
      $this.findCargoInfo($this);
    },
    findCargoInfo(vm) {
      if (!vm.storeHouseId) {
        return false;
      }
      /*  let urlParam =
        "pages=" +
        vm.cargoPaginationSettings.currentPage +
        "&rows=" +
        vm.cargoPaginationSettings.pageSize +
        "&storeHouse=" +
        vm.storeHouseId;*/
      let param = {
        pages: vm.cargoPaginationSettings.currentPage,
        rows: vm.cargoPaginationSettings.pageSize,
        storeHouse: vm.storeHouseId
      };
      if (vm.selectGrainBreeds) {
        /*  vm.selectGrainBreeds.forEach(item => {
          urlParam += "&grainBreedIds=" + item;
        });*/
        param.grainBreedIds = vm.selectGrainBreeds.join(",");
      }
      vm.$get({
        url: "/_data/stock/storestockDetail/pageByorg",
        fnc: data => {
          if (data && data.success) {
            vm.tablelistSettings.tableDatas = data.rows;
            vm.cargoPaginationSettings.totalNumbers = data.total;
            vm.tablelistSettings.tableDatas.map(function(arg) {
              arg.storeHouseName = vm.storeHouseName;
              arg.storeHouseCode = vm.storeHouseCode;
              arg.storeHouseId = vm.storeHouseId;
              arg.stackId = arg.stackid;
              arg.stackName = arg.stackid__dsp;
              arg.grainBreed__dsp =
                arg.storeStock && arg.storeStock.grainBreed__dsp
                  ? arg.storeStock.grainBreed__dsp
                  : "";
            });
          }
        },
        param: param
      });
    },
    cargoHandlePaginationPagenumber(num) {
      this.cargoPaginationSettings.currentPage = num;
      this.doSearch();
    },
    cargoHandleTableMutiChecked(val) {
      this.disabledBtn = val.length > 0 ? false : true;
      this.selectRowArray = val;
    },

    sureSelected() {
      //确认勾选
      this.$emit(
        this.$constants.EMIT_POINTLAYOUT_SUREDATA,
        this.selectRowArray
      );
    }
  },
  props: {
    storeHouseId: {
      type: String,
      default: ""
    },
    storeHouseName: {
      type: String,
      default: ""
    },
    storeHouseCode: {
      type: String,
      default: ""
    },
    selectGrainBreeds: {
      type: Array
    }
  },
  watch: {
    storeHouseId: {
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
