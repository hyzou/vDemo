<template>
  <div class="width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-show="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchFormGroupSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row class="reviewProgress-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="信息统计" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <iframe
          title="报表"
          style="display:block;width:100%;height:600px;border:1px solid #ccc;"
          :src="url"
        ></iframe>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "infoStaticDetail",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.initPageData();
    window.addEventListener("message", eve => {
      if (eve.data.type && eve.data.type == "infoDetail") {
        this.$router.push({
          path: "/informationsPage/infosManage/infosManageDetail",
          query: {
            cmsContentId: event.data.cmsContentId,
            fromPage: this.$route.fullPath
          }
        });
      }
      if (eve.data.type && eve.data.type == "queryList") {
        this.handleSearchFormBtn(
          {},
          this.searchFormGroupSettings.formGroupValues
        );
      }
    });
  }
};
</script>
