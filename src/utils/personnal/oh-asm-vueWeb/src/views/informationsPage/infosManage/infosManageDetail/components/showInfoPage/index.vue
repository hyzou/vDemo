<template>
  <div>
    <h1 class="fontSize30 mb20 textAlignCenter">{{ mainData.title }}</h1>
    <div style="color: #777;">
      <span class="mr20">{{ mainData.updated }}</span>
      <span>{{ mainData.publishByName }}</span>
    </div>
    <div class="fontSize18 lheight30 mt20" v-html="mainData.contentText"></div>
    <template v-if="mainData.files && mainData.files.length > 0">
      <h2 class="mt30">下载附件：</h2>
      <div class="mt10 mb10" v-for="file in mainData.files" :key="file.fileId">
        <el-link
          type="primary"
          :key="file.fileId"
          @click="handleDownloadFile(file)"
          >{{ file.fileName }}</el-link
        >
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "showInfoPage",
  props: {
    mainData: Object
  },
  methods: {
    handleDownloadFile(fileItem) {
      this.$emit("handleDownloadFile", fileItem);
    }
  }
};
</script>
