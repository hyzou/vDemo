<template>
  <div>
    <!--<el-button type="primary" @click="printPDF()" style="float: right"
      >
      打印
    </el-button>

    <button @click="$refs.pdf.print()">print</button>-->
    <div style="width: 100%;max-height: 500px;overflow-y: auto">
      <pdf v-for="i in numPages" :key="i" ref="pdf" :src="src" :page="i"></pdf>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "pdfFileView",
  data() {
    return {
      src: {},
      page: 1,
      numPages: []
    };
  },
  components: { pdf },
  methods: {
    printPDF() {
      this.$refs.pdf.print();
    }
  },
  props: {
    basePdfSrc: {
      type: String
    }
  },
  watch: {
    basePdfSrc: {
      handler(val) {
        this.src = pdf.createLoadingTask(val);
        this.src.then(pdf => {
          this.numPages = pdf.numPages;
        });
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
