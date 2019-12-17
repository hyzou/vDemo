<template>
  <div class="login-zone">
    <el-col :span="24">
      <div class="login-zone-title mt15 mb15">会员登录</div>
    </el-col>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-zone-ruleForm"
    >
      <el-col :span="24" class="pt15 pb15" :class="{ iptActive: loginNameIpt }">
        <el-form-item class="mb0" label-width="0" prop="loginName">
          <el-input
            v-model="ruleForm.loginName"
            @focus="inputLoginName"
            @blur="blurLoginName"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="pt15 pb15" :class="{ iptActive: loginPsdIpt }">
        <el-form-item class="mb0" label-width="0" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            @focus="inputLoginPsw"
            @blur="blurLoginPsw"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="login-zone-ruleForm-btns" label-width="0">
          <el-button class="register" type="text" @click="userRegister()">
            用户注册
          </el-button>
          <el-button
            class="login"
            type="primary"
            @click="submitForm('ruleForm')"
          >
            登录
          </el-button>
          <!-- <el-button @click="resetForm('ruleForm')">
            重置
          </el-button> -->
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { getToken, removeToken, removeSessionId } from "@/utils/auth";
// import { initRouter } from "@/router/initRouter";
import {
  asyncRouterMap_Manager,
  asyncRouterMap_Member,
  asyncRouterMap_Client
} from "@/router";

export default {
  name: "loginZone",
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("登录名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginNameIpt: false,
      loginPsdIpt: false,
      ruleForm: {
        pass: "",
        loginName: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        loginName: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    inputLoginName() {
      this.loginNameIpt = true;
    },
    inputLoginPsw() {
      this.loginPsdIpt = true;
    },
    blurLoginName() {
      this.loginNameIpt = false;
    },
    blurLoginPsw() {
      this.loginPsdIpt = false;
    },
    userRegister() {
      this.$router.push({ name: "informationsPage/signUp" });
    },
    submitForm(formName) {
      let that = this,
        postdata;
      that.$refs[formName].validate(valid => {
        if (valid) {
          postdata = {
            username: that.ruleForm.loginName.replace(/(^\s*)|(\s*$)/g, ""),
            password: that.ruleForm.pass
          };
          if (getToken()) {
            removeToken();
            removeSessionId();
          }
          let boolean = true;
          that.$store.dispatch("setTokenLogin", postdata).then(() => {
            that.$store.dispatch("setUserInfo", postdata).then(data => {
              that.$store.dispatch("setUnreadNotice");
              // that.$store.dispatch("setRouterList", {}).then(routerObj => {
              // 全局订阅函数
              // that.$globalFnc.socketConnect().then(xhr => {
              // that.$globalFnc.socketDescribNotice().then(notice => {
              //   that.$store.dispatch("setNoticeStatus", notice);
              // });
              // that.$globalFnc.socketDescribOffline().then(offline => {
              //   if (offline && offline.body) {
              //     if (typeof offline.body == "string") {
              //       offline.body = JSON.parse(offline.body);
              //     }
              //     that.$alert(offline.body.msg, "下线提示", {
              //       confirmButtonText: "确定",
              //       callback: () => {
              //         if (that.$global.commonObjects.noticeTopic) {
              //           that.$global.commonObjects.noticeTopic.unsubscribe();
              //         }
              //         if (that.$global.commonObjects.offlineTopic) {
              //           that.$global.commonObjects.offlineTopic.unsubscribe();
              //         }
              //         location.href = that.$global.logout;
              //       }
              //     });
              //   }
              // });
              let asyncRouter;
              if (data.type == "3") {
                localStorage.setItem("roleStatus", "client");
                asyncRouter = asyncRouterMap_Client;
              } else if (data.type == "2") {
                localStorage.setItem("roleStatus", "member");
                asyncRouter = asyncRouterMap_Member;
              } else if (data.type == "1") {
                localStorage.setItem("roleStatus", "manager");
                asyncRouter = asyncRouterMap_Manager;
                // asyncRouter = routerObj.asyncrouter;
              }
              asyncRouter.push({
                path: "*",
                redirect: "/404",
                hidden: true
              });
              that.$router.addRoutes(asyncRouter); //vue-router提供的添加路由的方法
              that.$store.dispatch("setGotRouterStatus", boolean);
              that.$store.dispatch("setAsyncRouterList", asyncRouter);
              if (data.type == "3" || data.type == "2") {
                that.$router.push({ name: "memberPage" });
              } else if (data.type == "1") {
                // that.$router.push({ name: routerObj.index });
                that.$router.push({ name: "demoMng" });
              }
              // });
              // });
            });
          });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
