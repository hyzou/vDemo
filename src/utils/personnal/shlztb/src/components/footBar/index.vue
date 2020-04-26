<template>
  <div class="foot-bar">
    <el-row class="foot-bar-content">
      <el-col :span="24">
        <div>
          <a class="link cursor" @click="$router.push('signUp')">会员注册</a>|
          <a class="link cursor" @click="$router.push('login')">
            <!-- @click.prevent="custormAnchor('firstAnchor')" -->
            会员登录</a
          >|
          <a class="link cursor" @click="$router.push('contractUs')"
            >关于我们</a
          >
        </div>
        <div>
          <span>版权所有: 杭州粮油物流中心批发交易市场有限公司</span>
          <span>技术支持：杭州安鸿科技股份有限公司</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "footBar",
  methods: {
    custormAnchor(anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView();
      } else {
        this.$router.push({
          path: "/informationsPage/informationHomePage"
        });
      }
    }
  }
};
</script>
