<template>
  <div class="detailPage">
    <div class="memberSignup">
      <div class="mainRegContainer">
        <section class="home-mainbord">
          <mainTopLogo :headInfos="headInfos" />
        </section>
        <el-row>
          <el-col :span="24">
            <el-link
              type="danger"
              class="backToPrew mb20"
              href="#/informationsPage/informationHomePage"
            >
              <i class="el-icon-arrow-left"></i>
              返回首页
            </el-link>
          </el-col>
        </el-row>
        <section class="registerBody">
          <el-row>
            <el-col :span="12" :offset="6">
              <loginZone class="indexLogin" />
            </el-col>
          </el-row>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mainTopLogo from "@/components/mainTopLogo";
import loginZone from "@/components/loginZone";

export default {
  name: "login",
  components: {
    mainTopLogo,
    loginZone
  },
  data() {
    return {
      headInfos: {
        title: "浙江社会贸易粮公共交易平台",
        style: {
          textColor: "#005192",
          height: "100px",
          lineHeight: "100px",
          fontWeight: "600",
          fontSize: "40px"
        },
        operate: false
      }
    };
  }
};
</script>
