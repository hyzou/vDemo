<template>
  <div class="form-group">
    <el-form
      :ref="formGroupSettings.formName || 'formItems'"
      :model="formGroupSettings.formGroupValues"
      :rules="formGroupSettings.rules"
      label-width="80px"
      style="overflow: hidden;"
    >
      <el-row>
        <!-- <el-col v-if="formGroupSettings.fullScreen" :span="24"> -->
        <el-col :span="formGroupSettings.fullScreen ? 24 : 20">
          <el-col
            v-for="formItem in formGroupSettings.formGroupList"
            :key="formItem.name"
            :span="formItem.span"
          >
            <!-- item:transfer -->
            <el-form-item
              v-if="formItem.type == 'transfer'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-transfer
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :props="formItem.transferProps"
                :data="formItem.data"
                filterable
                :titles="formItem.titles"
                :button-texts="formItem.buttons"
                :filter-method="filterMethod"
                :filter-placeholder="formItem.placeholder"
              ></el-transfer>
            </el-form-item>
            <!-- item:input -->
            <el-form-item
              v-if="formItem.type == 'input' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-input
                v-if="formItem.password"
                :show-password="formItem.password"
                :disabled="formItem.disabled"
                :placeholder="formItem.placeholder"
                autocomplete="new-password"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
              <el-input
                v-else
                :disabled="formItem.disabled"
                :placeholder="formItem.placeholder"
                autocomplete="off"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
            </el-form-item>
            <!-- item:inputHidden -->
            <el-form-item
              v-if="formItem.type == 'inputHidden'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
              class="displayNone"
            >
              <el-input
                :show-password="formItem.password"
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
            </el-form-item>
            <!-- item:stepInput -->
            <el-form-item
              v-if="formItem.type == 'stepInput' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-input-number
                class="width100"
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :step="formItem.step"
                :precision="formItem.precision"
                :placeholder="formItem.placeholder"
                :min="formItem.min"
                :max="formItem.max"
                @change="
                  handleChangeSelect(
                    formItem.linkName,
                    formGroupSettings.formGroupValues[formItem.name]
                  )
                "
              ></el-input-number>
            </el-form-item>
            <!-- item:textarea -->
            <el-form-item
              v-if="formItem.type == 'textarea'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-input
                :disabled="formItem.disabled"
                type="textarea"
                :placeholder="formItem.placeholder"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
              ></el-input>
            </el-form-item>
            <!-- item:html -->
            <el-form-item
              v-if="formItem.type == 'html'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <div
                style="line-height:40px;"
                v-html="formGroupSettings.formGroupValues[formItem.name]"
              ></div>
            </el-form-item>
            <!-- item:rate -->
            <el-form-item
              v-if="formItem.type == 'rate'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-rate
                class="pt10 pb10"
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :colors="formItem.colors"
              >
              </el-rate>
            </el-form-item>
            <!-- item:date -->
            <el-form-item
              v-if="formItem.type == 'date'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-date-picker
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :type="formItem.dateType"
                :range-separator="formItem.dateRangeSeparator"
                :start-placeholder="formItem.dateStartPlaceholder"
                :end-placeholder="formItem.dateEndPlaceholder"
                :format="formItem.format"
                :value-format="formItem.valueFormat"
                :disabled="formItem.disabled"
              ></el-date-picker>
            </el-form-item>
            <!-- item:select -->
            <el-form-item
              v-if="formItem.type == 'select' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-select
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :placeholder="formItem.placeHolder"
                :disabled="formItem.disabled"
                :filterable="formItem.filterable"
                :multiple="formItem.multiple"
                :defaultFirstOption="formItem.multiple"
                :clearable="!formItem.cannotClear"
                auto-complete="off"
                @change="
                  handleChangeSelect(
                    formItem.linkName,
                    formGroupSettings.formGroupValues[formItem.name]
                  )
                "
              >
                <el-option
                  v-for="opt in formItem.data"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- item:elTreeSelect -->
            <el-form-item
              v-if="formItem.type == 'elTreeSelect'"
              :label="formItem.label"
              :label-width="formItem.width || '0px'"
              :prop="formItem.name"
            >
              <elTreeSelect
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :props="formItem.props"
                :modelName="formItem.name"
                :options="formItem.data"
              />
            </el-form-item>
            <!-- item:elCheckbox -->
            <el-form-item
              v-if="formItem.type == 'elCheckbox'"
              :label="formItem.label"
              :label-width="formItem.width || '0px'"
              :prop="formItem.name"
            >
              <elCheckbox
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :data="formItem.data"
                @handleChangeBox="handleChangeBox"
              />
            </el-form-item>
            <!-- item:elCheckboxArea -->
            <el-form-item
              v-if="formItem.type == 'elCheckboxArea'"
              :label="formItem.label"
              :label-width="formItem.width || '0px'"
              :prop="formItem.name"
            >
              <elCheckboxArea
                class="width100"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :areadata="formItem.data"
                @handleChangeBoxArea="handleChangeBoxArea"
              />
            </el-form-item>
            <!-- item:group -->
            <el-form-item
              v-if="formItem.type == 'group'"
              :label-width="formItem.width || '0px'"
            >
              <commonTitleWithBorder :title="formItem.title" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="formGroupSettings.fullScreen ? 24 : 4">
          <el-form-item label-width="0" class="textAlignRight">
            <!-- :class="
              formGroupSettings.fullScreen
                ? 'textAlignCenter'
                : 'textAlignRight'
            " -->
            <el-button
              v-for="formBtn in formGroupSettings.formButtonList"
              :key="formBtn.flag"
              :type="formBtn.styleType"
              :size="formBtn.size"
              :icon="formBtn.icon"
              @click="
                onSubmit(formBtn, formGroupSettings.formName || 'formItems')
              "
            >
              {{ formBtn.label }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import elTreeSelect from "@/components/elTreeSelect";
import elCheckbox from "./checkbox";
import elCheckboxArea from "./checkboxArea";
export default {
  name: "formGroup",
  props: {
    formGroupSettings: Object
  },
  components: {
    commonTitleWithBorder,
    elTreeSelect,
    elCheckbox,
    elCheckboxArea
  },
  data() {
    return {
      fileList: [],
      upddata: {},
      uploadForm: new FormData(),
      updfileParamName: this.formGroupSettings.formGroupTypeUploadName,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
    };
  },
  beforeMount() {
    let that = this;
    this.fileList = [];
    this.formGroupSettings.formGroupList.map(item => {
      if (item.type == "editor") {
        item.config.serverUrl = that.$global.ueEditorServerUrl;
        item.config.UEDITOR_HOME_URL = that.$global.ueEditorUrl;
      }
    });
  },
  methods: {
    handleChangeBox(val) {
      console.log(val, "checkbox");
    },
    handleChangeBoxArea(val) {
      console.log(val, "handleChangeBoxArea");
    },
    // 下拉关联其他项目
    handleChangeSelect(linkname, data) {
      if (!linkname) {
        return false;
      }
      this.$emit("linkSelect", linkname, data);
    },
    // 提交表单
    onSubmit(formBtn, formName) {
      if (formBtn.flag == "cancle") {
        this.$emit("formGroupSubmit", formBtn, {});
        return false;
      }
      let that = this,
        postDatas = {};
      this.$refs[formName].fields.map(filed => {
        if (filed.labelFor != "viewfiles" && filed.labelFor != "flowComments")
          postDatas[filed.labelFor] = filed.fieldValue;
      });
      if (formBtn.flag == "reset") {
        this.$refs[formName].resetFields();
        return false;
      }
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.$emit(
            "formGroupSubmit",
            formBtn,
            postDatas
            // that.formGroupSettings.formGroupValues
          );
        } else {
          return false;
        }
      });
    }
  }
};
</script>
