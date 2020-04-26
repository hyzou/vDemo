<template>
  <el-dialog
    :title="dialogFormSettings.dialogFormTitle"
    :visible.sync="dialogFormSettings.dialogFormVisible"
  >
    <img />
  </el-dialog>
</template>
<script>
export default {
  name: "dialogForm",
  props: {
    dialogData: Object
  }
};
</script>
