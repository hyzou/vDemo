<template>
  <div class="ah-header-group">
    <mt-header :title="headerOption.title">
      <div
          @click="backFunc"
          slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "ahheader",
  props: {
    headerOption: Object
  },
  methods:{
    backFunc(){
      let flag = this.headerOption.func;
      let page = this.headerOption.routePath;
      if(flag){
        this.$emit("backFunc");
      }else{
         this.$router.push(page);
      }
    }
  }
};
</script>
