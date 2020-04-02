<template>
  <div class="left-btn-box">
    <div class="left-btn-list">
      <div
        class="left-btn"
        :class="{ 'left-btn-disable': leftBtn.isDisabled }"
        v-for="leftBtn in leftButtonsArray"
        :key="leftBtn.type"
        :data-type="leftBtn.type"
        @click="actionMethodsTap(leftBtn)"
      >
        <div v-if="leftBtn.icon" class="icon-box">
          <iconSvg :iconClass="leftBtn.icon" :iconStyle="{'font-size': '1.5em'}" />
        </div>

        <span class="span-box" v-if="leftBtn.text">{{ leftBtn.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftButtonsGroup",
  props: {
    leftButtonsArray: Array
  },
  methods: {
    actionMethodsTap(leftBtn) {
      this.$emit("leftBtnOperate", leftBtn);
    }
  }
};
</script>
<style lang="less" scoped>
@unit : 60px;
.left-btn-box {
  position: absolute;
  width: @unit;
  height: 100%;
  background: #24aa57;
  box-shadow: inset 0px 0px 5px 1px #35de61;
  .left-btn-list {
    box-shadow: inset 1px 0px 5px 0px #383c39;
    .left-btn {
      width: @unit;
      height: @unit;
      color: #fff;
      padding: @unit * 0.1 0 @unit * 0.1 0;
      border-bottom: 1px solid #5bff332e;
      .icon-box {
        width: 100%;
        height: @unit * 0.5;
        line-height: @unit * 0.5;
        text-align: center;
      }
      .span-box {
        font-size: 0.5em;
        width: 100%;
        height: @unit * 0.3;
        line-height: @unit * 0.3;
        display: inline-block;
        text-align: center;
      }
    }
    .left-btn-disable{
        background: #67d491;
    }
  }
}
</style>