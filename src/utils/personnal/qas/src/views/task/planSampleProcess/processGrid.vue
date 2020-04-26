<template>
  <div class="common_table_container">
    <div class="tool-bar">
      <!--<el-button type="primary" class="s-tool-btn" @click="show_dialog">
        导出进度表
      </el-button>-->
    </div>
    <template>
      <tableList
        :tablelistSettings="processTableSettings"
        @handleTableRowButton="handleTableRowButton"
        @handleTableMutiChecked="handleSelectionChange"
      />
    </template>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSizeSet"
          :layout="$constants.paginationlayout"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </template>
    <template>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        @opened="pieInit"
      >
        <div ref="processPie" style="width: 100%;height: 400px"></div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import tableHeader from "@/utils/formSettingsJson/task/sampleProcess/processTableHeader.json";

export default {
  name: "processGrid",
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      qasPlanId: "",
      processTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "processTable",
          rowKey: "id",
          tooltipEffect: "dark",
          border: false,
          headerOptions: tableHeader,
          isMultipleTable: false,
          rowClassName: "process-table",
          isShowIndex: true,
          showIndexHeader: "序号"
        }
      },
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage //每页的数量
    };
  },
  methods: {
    show_dialog() {},
    selectionRowsChange() {},
    pieInit() {
      this.$get({
        url: "/_data/task/samplingTask/findTaskStatusCount",
        fnc: data => {
          let legs = [];
          data.data.map(function(arg) {
            legs.push(arg.label);
            arg.name = arg.label;
          });
          let processPie = this.$echarts.init(this.$refs.processPie);
          processPie.setOption({
            title: {
              text: "任务进度",
              x: "left"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}:{c}({d}%)"
            },
            legend: {
              orient: "vertical",
              x: "right",
              data: legs
            },
            series: [
              {
                name: "任务状态",
                type: "pie",
                radius: ["60%", "78%"],
                label: {
                  /* normal: {
                    show: false,
                    position: "center",
                    formatter: "{b}\n {c}({d}%)"
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  },*/
                  formatter:
                    "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                  backgroundColor: "#eee",
                  borderColor: "#aaa",
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },
                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: data.data
              }
            ],
            color: ["#3AA0FF", "#975FE4", "#F2637B", "#FAD337", "#4DCB73"]
          });
        },
        param: { qasPlanId: this.qasPlanId }
      });
    },
    handleTableRowButton(rowData, button) {
      this.dialogTitle = rowData.text; //更换弹窗标题
      this.qasPlanId = rowData.qasPlanId;
      this.dialogVisible = true;
    },
    handleSelectionChange() {},
    //窗口关闭事件
    handleClose(done) {
      done();
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSizeSet = val;
      this.transfPagParam();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.transfPagParam();
    },
    transfPagParam() {
      let pageParam = {
        pageSizeNum: this.pageSizeSet,
        currentPageNum: this.currentPage
      };
      //传递值给父页面变化后的信息
      this.$emit(this.$constants.EMIT_TRANSFPAGPARAM, pageParam);
    }
  },
  watch: {
    "$store.state.process.table_data"(val) {
      this.processTableSettings.tableDatas = val;
    },
    isHideColumn: {
      handler(val) {
        let gridColumn = this.processTableSettings.tableSettingOptions
          .headerOptions;
        for (let i in gridColumn) {
          if (gridColumn[i].prop != "grainBreed__dsp") {
            continue;
          }
          gridColumn[i].isHide = val;
        }
        this.processTableSettings.tableSettingOptions.headerOptions = gridColumn;
      },
      immediate: true
    }
  },
  props: {
    totalNum: {
      type: Number,
      default: 0
    },
    isHideColumn: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
