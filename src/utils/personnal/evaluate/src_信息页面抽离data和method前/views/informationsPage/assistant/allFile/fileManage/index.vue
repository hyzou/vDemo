<template>
  <div class="pt10 pr10 pl10 width100">
    <el-col class="mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mb20" :span="24">
      <formGroup
        :formGroupSettings="fileManageSearchFormItems"
        @formGroupSubmit="handleSearchFormBtn"
      />
    </el-col>
    <el-row class="mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button type="primary" @click="handleNoFile">暂不处理</el-button>
        <el-button type="primary" @click="handleBatchFile">批量办理</el-button>
      </el-col>
    </el-row>
    <tabCard
      class="tab-container"
      :tabSettings="tabSettings"
      @handleTabChange="handleTabChange"
    />
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
      @handlePaginationPagesize="handleSizeChange"
    />
  </div>
</template>

<script>
// 搜索
import fileManageFormItems from "@/utils/formSettingsJson/assistant/fileManage/fileManageFormItems.json";
import fileManageFormBtns from "@/utils/formSettingsJson/assistant/fileManage/fileManageFormBtns.json";
// 表格
import fileManageTableHeader from "@/utils/formSettingsJson/assistant/fileManage/fileManageTableHeader.json";
import fileManageTableData from "@/utils/formSettingsJson/assistant/fileManage/fileManageTableData.json";
export default {
  name: "fileManage",
  data() {
    return {
      // 搜索
      fileManageSearchFormItems: {
        fullScreen: false,
        formGroupList: fileManageFormItems,
        formGroupValues: {},
        formButtonList: fileManageFormBtns
      },
      // 表格设置
      tableSettings: {
        tableDatas: fileManageTableData,
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "assessmentId",
          border: true,
          headerOptions: fileManageTableHeader,
          isShowIndex: true,
          showIndexHeader: "序号"
        }
      },
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      tabSettings: {
        stretch: false,
        position: "top",
        tabCardData: [
          {
            label: "列表",
            id: "1"
          },
          {
            label: "按类型",
            id: "2"
          },
          {
            label: "按缓急",
            id: "3"
          },
          {
            label: "暂不处理",
            id: "4"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 点击事件名称命名：handle(前缀)+Function（功能名称）
     */
    // 搜索
    handleSearchFormBtn() {},
    // 批量处理
    handleBatchFile() {},
    // 暂不处理
    handleNoFile() {},
    // 表格事件
    handleTableRowButton() {},
    // 分页
    handlePaginationPagenumber() {},
    handleSizeChange() {},
    handleTabChange() {}
  },
  mounted() {
    this.paginationSettings.totalNumbers = fileManageTableData.length;
  }
};
</script>
