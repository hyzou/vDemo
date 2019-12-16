<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <pagination
          :paginationSettings="paginationSettings"
          @handlePaginationPagenumber="handlePaginationPagenumber"
          @handlePaginationPagesize="handleSizeChange"
        />
      </el-col>
      <el-col :span="24">
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
import pagination from "@/components/pagination";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/paginationMng/tableData.json";
// 引入本地图片
import imgUrl from "@/assets/logo.png";
import imgUrl2 from "@/assets/register_bg_bak2.png";

export default {
  name: "paginationMng",
  components: {
    pagination,
    tableList
  },
  data() {
    return {
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        pageSize: 20,
        layout: "sizes, prev, pager, next, jumper, ->, total, slot",
        totalNumbers: 30,
        pageSizeChangeList: ["100","200"]
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
  methods:{
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      console.log(num)
    },
    handleSizeChange(size){
      console.log(size)
    }
  }
};
</script>
