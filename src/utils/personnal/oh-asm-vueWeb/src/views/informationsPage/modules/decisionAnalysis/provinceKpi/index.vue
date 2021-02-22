<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="4" :offset="14" class="mb10 textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="lheight40">
        <Status status="incomplete" />失分项
        <Status class="ml10" status="complete" />满分项
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <!-- <pagination :paginationSettings="paginationSettings" /> -->
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
    />
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";
import Status from "@/components/circleDot";

export default {
  name: "index",
  data() {
    return dataFnc(this);
  },
  components: {
    Status
  },
  methods: {
    ...methods
  },
  mounted() {
    this.getDropdownlistData().then(data => {
      this.searchSettings.formGroupValues.asmSchemeId = this.$route.query
        .asmSchemeId
        ? this.$route.query.asmSchemeId
        : data.length > 0
        ? data[0].businessKey
        : "";
      this.initPageData();
    });
  }
};
</script>
