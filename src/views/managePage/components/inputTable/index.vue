<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <inputTable
          :tableDefaultData="tableOpt"
          @getTableData="getTableData"
        ></inputTable>
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：
              <pre>
                <code>
                  &lt;pagination
                    :paginationSettings="paginationSettings"
                    @handlePaginationPagenumber="handlePaginationPagenumber"
                    @handlePaginationPagesize="handleSizeChange"
                  />
                  paginationSettings: {
                    currentPage: 1,
                    pageSize: 20,
                    layout: "sizes, prev, pager, next, jumper, ->, total, slot",
                    totalNumbers: 30,
                    pageSizeChangeList: ["100","200"]
                  },
                </code>
              </pre>
            </p>
          </li>
          <li>
            <tableList
              :tablelistSettings="tablelistSettings"
            />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import inputTable from "@/components/inputTable";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/paginationMng/tableData.json";
// 引入本地图片
import imgUrl from "@/assets/logo.png";
import imgUrl2 from "@/assets/register_bg_bak2.png";

export default {
  name: "inputTableMng",
  components: {
    inputTable,
    tableList
  },
  data() {
    return {
      /**
       * pagination 分页器基本数据配置
       */
      tableOpt: {
        type: "activTable",
        label: "综合分评定规则",
        name: "scoreListStr",
        hideItem: false,
        span: 24,
        width: "150px",
        useType: "add",
        data:[
          {
            itemName: "",
            itemStandard: "",
            itemScore: ""
          }
        ],
        headers: [
          {
            title: "打分项",
            key: "itemName",
            disabled: false
          },
          {
            title: "评分标准",
            key: "itemStandard",
            disabled: false
          },
          {
            title: "分值",
            key: "itemScore",
            disabled: false
          }
        ],
        tableItems: {
          index: "",
          itemName: "",
          itemStandard: "",
          itemScore: "",
          isSet: true
        }
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: tableData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      },
    };
  },
  methods: {
    getTableData(data) {
      console.log(data, "data");
    }
  }
};
</script>
