<template>
  <div class="Cold_Left">
    <el-row>
      <el-col :span="24">
        <inputTable
          :tableDefaultData="tableOpt"
          @getTableData="getTableData"
        ></inputTable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import inputTable from "@/components/inputTable";
export default {
  name: "demo",
  components: { inputTable },
  data() {
    return {
      columns: [
        {
          prop: "OutdoorTDB",
          label: "室外计算温度(℃)"
        },
        {
          prop: "IndoorTDB",
          label: "室内计算温度(℃)"
        },
        {
          prop: "TdbStartTime",
          label: "运行开始时间"
        },
        {
          prop: "TdbEndTime",
          label: "运行结束时间"
        }
      ],
      tableOpt: {
        type: "activTable",
        label: "综合分评定规则",
        name: "scoreListStr",
        hideItem: false,
        span: 24,
        width: "150px",
        useType: "add",
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
      }
    };
  },
  methods: {
    getTableData(data) {
      console.log(data, "data");
    }
  }
};
</script>
