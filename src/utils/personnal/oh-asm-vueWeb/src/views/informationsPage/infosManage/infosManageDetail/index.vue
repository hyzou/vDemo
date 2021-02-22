<template>
  <div class="home pt15 pl15">
    <div class="home home-mainbord overflowXhYa pd40">
      <div class="textAlignRight">
        <el-link
          :underline="false"
          :href="'#' + prevPath"
          icon="el-icon-arrow-left"
          >返回</el-link
        >
      </div>
      <infosManageDetail
        class="pl40 pr40"
        v-if="infoMessage"
        :mainData="infoMessage"
        @handleDownloadFile="handleDownloadFile"
      />
      <div class="textAlignCenter" v-if="this.checkOut">
        <el-button type="primary" size="small" @click="handleCheckoutMessage(6)"
          >审核通过</el-button
        >
        <el-button type="primary" size="small" @click="handleCheckoutMessage(3)"
          >驳回</el-button
        >
        <el-button size="small" @click="handleCheckoutMessage(undefined)"
          >返回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import infosManageDetail from "./components/showInfoPage";
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";
export default {
  name: "index",
  components: {
    infosManageDetail: infosManageDetail
  },
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.getInfoMessage();
  }
};
</script>
