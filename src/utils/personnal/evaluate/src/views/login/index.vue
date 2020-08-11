<template>
  <div class="detailPage">
    <div class="memberSignup">
      <div class="mainRegContainer positionAbs positionCenterWrap">
        <div
          class="registerTitle positionAbs width100 textAlignCenter fontSize40"
        >
          浙江省粮食安全市县长责任制考核信息系统
        </div>
        <section class="registerBody">
          <el-row>
            <el-col :span="16" :offset="4">
              <loginZone @loginMethod="loginMethod" class="indexLogin" />
            </el-col>
          </el-row>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import loginZone from "./loginZone";

export default {
  name: "login",
  components: {
    loginZone
  },
  data() {
    return {};
  },
  methods: {
    loginMethod(data) {
      console.log(data);
      this.$store
        .dispatch("user/commitUserInfos", data)
        .then(() => {
          this.$router.push("informationsPage/homePage");
        })
        .catch(err => {
          this.$alert(err, "登录错误提示");
        });
    }
  }
};
</script>
