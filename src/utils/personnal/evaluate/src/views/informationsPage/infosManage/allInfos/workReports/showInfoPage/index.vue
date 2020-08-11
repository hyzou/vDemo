<template>
  <div>
    <div class="fontSize30 mb20">{{ mainData.title }}</div>
    <div>
      <span class="mr20">{{ mainData.addTime }}</span>
      <span>发布人：{{ mainData.author }}</span>
      <span class="floatRight">点击：{{ mainData.clickTimes }}</span>
      <span class="floatRight mr20">评论：{{ mainData.comment }}</span>
    </div>
    <el-divider></el-divider>
    <div class="fontSize18 lheight30" v-html="mainData.editoStr"></div>
  </div>
</template>
<script>
export default {
  name: "showInfoPage",
  props: {
    mainData: Object
  }
};
</script>
