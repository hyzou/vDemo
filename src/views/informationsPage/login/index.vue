<template>
  <div class="detailPage">
    <div class="memberSignup">
      <div class="mainRegContainer">
        <section class="home-mainbord">
          <headerBar :headInfos="headInfos" />
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
import headerBar from "@/components/headerBar";
import loginZone from "@/components/loginZone";

export default {
  name: "login",
  components: {
    headerBar,
    loginZone
  },
  data() {
    return {
      headInfos: {
        title: "demo示例",
        style: {
          "text-color": "#005192",
          height: "100px",
          "line-height": "100px",
          "font-weight": "600",
          "font=size": "40px"
        },
        operate: false
      }
    };
  }
};
</script>
