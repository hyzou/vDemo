<template>
  <div class="pt10 pr10 pl10 width100">
    <formGroup
      :formGroupSettings="suggestSetFormItems"
      @formGroupSubmit="handleSearchFormBtn"
      @linkSelect="handleFormGroup"
    />
  </div>
</template>

<script>
import ueEditorToolbarSettings from "@/utils/formSettingsJson/infosManage/setNewInfo/ueEditorToolbarSettings.js";

import suggestSetFormItems from "@/utils/formSettingsJson/informationsPage/targetManage/suggestSet/suggestSetItems.json";
import suggestSetFormBtns from "@/utils/formSettingsJson/informationsPage/targetManage/suggestSet/suggestSetBtns.json";
import suggestSetFormRules from "@/utils/formRulesJson/targetManage/suggestSetRule";
import formGroup from "@/components/formGroup";
export default {
  name: "index",
  components: {
    formGroup
  },
  data() {
    return {
      // 搜索栏
      suggestSetFormItems: {
        fullScreen: true,
        formGroupList: suggestSetFormItems,
        formGroupValues: {
          sendType: [],
          format: "html"
        },
        formButtonList: suggestSetFormBtns,
        rules: suggestSetFormRules
      }
    };
  },
  methods: {
    handleSearchFormBtn(btns, formData) {
      console.log(btns, formData);
    },
    handleFormGroup(linkName, flag) {
      let formItem = null;
      let formItemIndex = null;
      this.suggestSetFormItems.formGroupList.forEach((item, index) => {
        if (item["linkName"] && item["linkName"] === linkName) {
          formItem = item;
          formItemIndex = index;
        }
      });
      if (!formItem) {
        return;
      }
      if (linkName === "sendCCButton") {
        //抄送，密送处理
        switch (flag) {
          case "ccOn": {
            //显示抄送人
            formItem.data.map(btn => {
              if (btn.flag === "ccOn") {
                btn.flag = "ccOff";
                btn.label = "隐藏抄送";
              }
              return btn;
            });
            this.suggestSetFormItems.formGroupList.map(item => {
              if (item["name"] === "ccName") {
                item.hideItem = false;
              }
              return item;
            });
            this.suggestSetFormItems.formGroupList[formItemIndex] = formItem;
            break;
          }
          case "ccOff": {
            //隐藏抄送人
            formItem.data.map(btn => {
              if (btn.flag === "ccOff") {
                btn.flag = "ccOn";
                btn.label = "显示抄送";
              }
              return btn;
            });
            this.suggestSetFormItems.formGroupList.map(item => {
              if (item["name"] === "ccName") {
                item.hideItem = true;
              }
            });
            this.suggestSetFormItems.formGroupList[formItemIndex] = formItem;
            break;
          }
          case "bccOn": {
            //显示密送人
            formItem.data.map(btn => {
              if (btn.flag === "bccOn") {
                btn.flag = "bccOff";
                btn.label = "隐藏密送";
              }
              return btn;
            });
            this.suggestSetFormItems.formGroupList.map(item => {
              if (item["name"] === "bccName") {
                item.hideItem = false;
              }
            });
            this.suggestSetFormItems.formGroupList[formItemIndex] = formItem;
            break;
          }
          case "bccOff": {
            //隐藏密送人
            formItem.data.map(btn => {
              if (btn.flag === "bccOff") {
                btn.flag = "bccOn";
                btn.label = "显示密送";
              }
              return btn;
            });
            this.suggestSetFormItems.formGroupList.map(item => {
              if (item["name"] === "bccName") {
                item.hideItem = true;
              }
            });
            this.suggestSetFormItems.formGroupList[formItemIndex] = formItem;
            break;
          }
        }
      } else if (linkName === "formatType") {
        if (flag === "text") {
          this.suggestSetFormItems.formGroupList.map(item => {
            if (item["name"] === "formatTextarea") {
              item.hideItem = false;
            }
            if (item["name"] === "formatEditor") {
              item.hideItem = true;
            }
            return item;
          });
        } else if (flag === "html") {
          this.suggestSetFormItems.formGroupList.map(item => {
            if (item["name"] === "formatTextarea") {
              item.hideItem = true;
            }
            if (item["name"] === "formatEditor") {
              item.hideItem = false;
            }
            return item;
          });
        }
      }
    }
  },
  mounted() {
    suggestSetFormItems.map(item => {
      if (item.name == "formatEditor") {
        item.config.toolbars = ueEditorToolbarSettings;
      }
    });
    const orgTree = [
      {
        id: "1002",
        text: "杭州市农业农村局",
        parentId: null,
        checked: false,
        state: "open",
        code: "1001.1002",
        refValue: "",
        children: [
          {
            id: "1002001",
            text: "杭州市农业农村局农田建设管理处",
            parentId: "1002",
            checked: false,
            state: "closed",
            code: "1001.1002.1002001",
            refValue: ""
          }
        ]
      },
      {
        id: "1003",
        text: "杭州市农业农村局",
        parentId: null,
        checked: false,
        state: "open",
        code: "1001.1003",
        refValue: "",
        children: [
          {
            id: "1003002",
            text: "杭州市商务局储备监管处",
            parentId: "1003",
            checked: false,
            state: "closed",
            code: "1001.1003.1003002",
            refValue: ""
          }
        ]
      }
    ];
    this.suggestSetFormItems.formGroupList.map(item => {
      if (
        item.name === "receivedName" ||
        item.name === "ccName" ||
        item.name === "bccName"
      ) {
        item.data = orgTree;
      }
      return item;
    });
  }
};
</script>

<style scoped></style>
