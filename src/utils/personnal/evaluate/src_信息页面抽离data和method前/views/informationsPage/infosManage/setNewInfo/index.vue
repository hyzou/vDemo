<template>
  <div class="home">
    <div class="pt20">
      <formGroup
        :formGroupSettings="formGroupSettings"
        @formGroupSubmit="handleFormButtons"
        @linkSelect="handleSelectChange"
        @inlineFncs="inlineFncs"
      />
    </div>
  </div>
</template>

<script>
// 配置项数据
import newInfoFormItems from "@/utils/formSettingsJson/infosManage/setNewInfo/newInfoFormItems.json";
import newInfoFormBtns from "@/utils/formSettingsJson/infosManage/setNewInfo/newInfoFormBtns.json";
import ueEditorToolbarSettings from "@/utils/formSettingsJson/infosManage/setNewInfo/ueEditorToolbarSettings.js";
// 配置校验规则
import newInfoFormRule from "@/utils/formRulesJson/infosManage/setNewInfo/newInfoFormRule";

export default {
  name: "setNewInfo",
  data() {
    return {
      // 表单配置
      formGroupSettings: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: false,
        //做文件上传时，文件流的name值，一定要设置
        formGroupTypeUploadName: "uploadName",
        // 是否全屏显示，true:全屏，按钮位于下方；false:占据容器5/6，按钮位于右侧
        fullScreen: true,
        // 表单项配置
        formGroupList: newInfoFormItems,
        // 表单值初始化
        formGroupValues: {
          template: "1",
          editType: "1"
        },
        // 表单按钮配置
        formButtonList: newInfoFormBtns,
        // 表单各项校验规则
        rules: newInfoFormRule.rule
      }
    };
  },
  methods: {
    /**
     * 表单按钮点击事件
     */
    handleFormButtons(btn, data) {
      data.updateTime = "";
      data.userId = this.$store.getters["user/userInfos"].userId;
      data.author = this.$store.getters["user/userInfos"].userName;
      data.clickTimes = "0";
      data.comment = "0";
      if (!data.id) {
        data.id =
          btn.flag == "saveStuff"
            ? this.$store.getters["app/stuffList"].length + 1
            : this.$store.getters["app/allInfosList"].length + 1;
        data.addTime = this.$globalFnc.dateStampFormat(new Date().getTime());
      } else {
        data.updateTime = this.$globalFnc.dateStampFormat(new Date().getTime());
      }
      if (btn.flag == "saveStuff") {
        this.$store.dispatch("app/commitAddInfoToStuffList", data).then(() => {
          this.$router.push("/informationsPage/infosManage/stuff");
        });
      } else {
        this.$store
          .dispatch("app/commitAddInfoToAllInfosList", data)
          .then(() => {
            if (btn.flag == "saveQuit") {
              this.$router.push(
                "/informationsPage/infosManage/allInfos/" + data.subColumn
              );
            }
          });
      }
    },
    /**
     * 下拉框表单联动事件
     */
    handleSelectChange(linkName, data) {
      if (linkName == "editType") {
        newInfoFormItems.map(item => {
          switch (data) {
            case "1":
              if (
                item.name == "relatePics" ||
                item.name == "relateFiles" ||
                item.name == "editoStr"
              ) {
                item.hideItem = false;
              }
              if (
                item.name == "textStr" ||
                item.name == "urlRelative" ||
                item.name == "fileRelative"
              ) {
                item.hideItem = true;
              }
              break;
            case "2":
              if (
                item.name == "relatePics" ||
                item.name == "relateFiles" ||
                item.name == "textStr"
              ) {
                item.hideItem = false;
              }
              if (
                item.name == "editoStr" ||
                item.name == "urlRelative" ||
                item.name == "fileRelative"
              ) {
                item.hideItem = true;
              }
              break;
            case "3":
              if (item.name == "urlRelative") {
                item.hideItem = false;
              }
              if (
                item.name == "textStr" ||
                item.name == "relatePics" ||
                item.name == "fileRelative" ||
                item.name == "relateFiles" ||
                item.name == "editoStr"
              ) {
                item.hideItem = true;
              }
              break;
            case "4":
              if (item.name == "fileRelative") {
                item.hideItem = false;
              }
              if (
                item.name == "textStr" ||
                item.name == "urlRelative" ||
                item.name == "relatePics" ||
                item.name == "relateFiles" ||
                item.name == "editoStr"
              ) {
                item.hideItem = true;
              }
              break;
            default:
            // if (
            //   item.name == "relatePics" ||
            //   item.name == "relateFiles" ||
            //   item.name == "editoStr"
            // ) {
            //   item.hideItem = false;
            // }
            // if (
            //   item.name == "textStr" ||
            //   item.name == "urlRelative" ||
            //   item.name == "fileRelative"
            // ) {
            //   item.hideItem = true;
            // }
          }
        });
      }
    },
    /**
     * item内行间按钮联动事件
     */
    inlineFncs(flag) {
      console.log(flag);
    }
  },
  mounted() {
    newInfoFormItems.map(item => {
      if (item.name == "editoStr") {
        item.config.toolbars = ueEditorToolbarSettings;
      }
    });
  }
};
</script>
