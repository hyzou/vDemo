<template>
  <div>
    <dialog-form :dialogFormSettings="dialogFormSettings" />
    <el-dialog
      title="在线预览"
      :visible.sync="showFileDialog"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      width="60%"
    >
      <pdfView v-if="showFileDialog" :basePdfSrc="fileSrc"></pdfView>
    </el-dialog>
  </div>
</template>

<script>
import pdfView from "./pdfFileView";
export default {
  name: "fileReview",
  data() {
    return {
      //预览图片配置参数
      dialogFormSettings: {
        dialogFormTitle: "预览",
        dialogFormVisible: false,
        dialogType: "image",
        imgSrc: ""
      },
      showFileDialog: false,
      fileSrc: ""
    };
  },
  components: {
    pdfView: pdfView
  },
  methods: {
    //预览
    review(scopeRow) {
      const $this = this;
      if (!scopeRow || !scopeRow.fileId) {
        return false;
      }
      let callbackParam = {
        imageCallback: function() {
          $this.dialogFormSettings.dialogFormVisible = true;
          $this.dialogFormSettings.imgSrc = scopeRow.showUrl;
        },
        pdfCallback: function() {
          $this.fileSrc = scopeRow.showUrl;
          $this.showFileDialog = true;
        }
      };
      this.$Api.reviewFile(this.$constants.baseURL, scopeRow, callbackParam);
    }
  },
  props: {
    scopeRow: Object
  },
  watch: {
    scopeRow: {
      handler(val) {
        this.review(val);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
