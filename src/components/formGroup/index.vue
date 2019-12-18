<template>
  <div class="form-group">
    <el-form
      ref="formItems"
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
            <!-- item:image -->
            <el-form-item
              v-if="formItem.type == 'image'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <template
                v-for="(imgItem, index) in formGroupSettings.formGroupValues[
                  formItem.name
                ]"
              >
                <el-col :span="6" :key="index">
                  <img
                    v-if="imgItem.viewPic"
                    :src="imgItem.imgSrc"
                    width="100%"
                  />
                  <a
                    v-else
                    @click="return false;"
                    class="file displayBlock textEllipsis pl6"
                    :href="imgItem.imgSrc"
                    target="_blank"
                  >
                    <!-- :href="imgItem.imgSrc" -->
                    <i
                      class="el-icon-picture-outline"
                      v-if="imgItem.isImage == 'true'"
                    ></i>
                    <i class="el-icon-files" v-else></i>
                    <span class="ml10">{{ imgItem.fileName }}</span>
                  </a>
                </el-col>
              </template>
            </el-form-item>
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
            <!-- item:inputTable -->
            <el-form-item
              v-if="formItem.type == 'inputTable' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-table
                size="mini"
                :data="formGroupSettings.formGroupValues[formItem.name]"
                border
                style="width: 100%;margin:auto;"
                highlight-current-row
              >
                <el-table-column
                  v-for="(item, index) in formItem.headers"
                  :label="item.title"
                  :prop="item.key"
                  :width="item.width"
                  :key="index"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-if="item.inputType !== 'number'"
                      type="textarea"
                      size="mini"
                      :autosize="true"
                      :disabled="item.disabled"
                      placeholder="请输入内容"
                      v-model="scope.row[item.key]"
                    ></el-input>
                    <el-input-number
                      v-else
                      size="mini"
                      class="width100"
                      :precision="2"
                      :disabled="item.disabled"
                      v-model="scope.row[item.key]"
                      :step="1"
                      :min="1"
                    ></el-input-number>
                    <!-- <div v-else v-html="scope.row[item.key]"></div> -->
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  class="textAlignCenter"
                  v-if="formItem.useType == 'add'"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      size="mini"
                      @click="removeDomain(scope.row, formItem.name)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-row v-if="formItem.useType && formItem.useType == 'add'">
                <el-col :span="6" :offset="18" class="textAlignCenter mt10">
                  <el-button
                    type="success"
                    size="mini"
                    @click="addDomain(formItem.tableItems, formItem.name)"
                  >
                    新增
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- item:activTable 弃置，用inputTable -->
            <el-form-item
              class="scorelist"
              v-if="formItem.type == 'activTable' && !formItem.hideItem"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-row class="scorelist-header">
                <template v-for="itemhead in formItem.headers">
                  <el-col
                    class="scorelist-header-title textAlignCenter"
                    :span="24 / formItem.headers.length"
                    v-if="itemhead.key && !itemhead.hiddenItem"
                    :key="itemhead.name"
                    >{{ itemhead.title }}</el-col
                  >
                </template>
              </el-row>
              <el-row class="scorelist-body">
                <el-form label-width="100px" class="scorelist-body-content">
                  <el-form-item
                    v-for="(domain, index) in formGroupSettings.formGroupValues[
                      formItem.name
                    ] || formItem.tableItems"
                    label-width="0"
                    :key="index"
                  >
                    <template v-for="itemhead in formItem.headers">
                      <el-col
                        v-if="itemhead.key !== 'btnOpt'"
                        :key="itemhead.key"
                        class="scorelist-body-content-item"
                        :span="6"
                      >
                        <el-input
                          :disabled="itemhead.disabled"
                          class="scorelist-body-content-item-input"
                          :title="domain[itemhead.key]"
                          v-model="domain[itemhead.key]"
                        ></el-input>
                      </el-col>
                    </template>
                    <el-col
                      v-if="formItem.useType == 'add'"
                      class="scorelist-body-content-item"
                      :span="6"
                    >
                      <template v-if="formItem.useType == 'add'">
                        <el-button
                          class="scorelist-body-content-item-button"
                          :disabled="
                            formGroupSettings.formGroupValues[formItem.name]
                              .length == 1
                          "
                          type="danger"
                          size="mini"
                          @click.prevent="removeDomain(domain, formItem.name)"
                          >删除</el-button
                        >
                      </template>
                    </el-col>
                  </el-form-item>
                  <el-form-item
                    label-width="0"
                    class="textAlignRight"
                    v-if="formItem.useType == 'add'"
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="addDomain(formItem.tableItems[0], formItem.name)"
                      >新增</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-row>
            </el-form-item>
            <!-- item:activTableChange 弃置，用inputTable -->
            <el-form-item
              class="scorelist"
              v-if="formItem.type == 'activTableChange'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-row class="scorelist-header">
                <template v-for="itemhead in formItem.headers">
                  <el-col
                    class="scorelist-header-title textAlignCenter"
                    :span="24 / formItem.headers.length"
                    :key="itemhead.name"
                    v-if="!itemhead.hiddenItem"
                    >{{ itemhead.title }}
                  </el-col>
                </template>
              </el-row>
              <el-row class="scorelist-body">
                <el-form label-width="100px" class="scorelist-body-content">
                  <el-form-item
                    v-for="(domain, index) in formGroupSettings.formGroupValues[
                      formItem.name
                    ] || formItem.tableItems"
                    label-width="0"
                    :key="index"
                  >
                    <template v-for="(itemhead, idx) in formItem.headers">
                      <el-col
                        class="scorelist-body-content-item"
                        v-if="!itemhead.hiddenItem"
                        :key="idx"
                        :span="24 / formItem.headers.length"
                      >
                        <el-input
                          class="scorelist-body-content-item-input"
                          :title="domain[itemhead.key]"
                          v-model="domain[itemhead.key]"
                          :disabled="itemhead.disabled"
                        ></el-input>
                      </el-col>
                    </template>
                  </el-form-item>
                </el-form>
              </el-row>
            </el-form-item>
            <!-- item:flowComment -->
            <el-form-item
              class="scorelist"
              v-if="
                formItem.type == 'flowComment' &&
                  formGroupSettings.formGroupValues[formItem.name] &&
                  formGroupSettings.formGroupValues[formItem.name].length > 0
              "
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-row class="scorelist-body">
                <el-table
                  size="mini"
                  :data="formGroupSettings.formGroupValues[formItem.name]"
                  border
                  style="width: 100%;margin:auto;"
                >
                  <el-table-column
                    v-for="(itemhead, index) in formItem.headers"
                    :label="itemhead.title"
                    :prop="itemhead.key"
                    :width="itemhead.width"
                    :key="index"
                  >
                    <template slot-scope="scope">
                      <template v-if="itemhead.type && itemhead.type == 'rate'">
                        <el-rate
                          disabled
                          v-model="scope.row[itemhead.key]"
                          :colors="itemhead.colors"
                        >
                        </el-rate>
                      </template>
                      <template v-else>
                        <template v-if="itemhead.key == 'time'">
                          {{ scope.row[itemhead.key] | normalTime("-") }}
                        </template>
                        <template v-else>
                          {{ scope.row[itemhead.key] }}
                        </template>
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
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
            <!-- item:editor -->
            <el-form-item
              class="formItemLh editor"
              v-if="formItem.type == 'editor'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <vue-ueditor-wrap
                :disabled="formItem.disabled"
                v-model="formGroupSettings.formGroupValues[formItem.name]"
                :config="formItem.config"
              ></vue-ueditor-wrap>
            </el-form-item>
            <!-- item:upload -->
            <el-form-item
              v-if="formItem.type == 'upload'"
              :label="formItem.label"
              :label-width="formItem.width"
              :prop="formItem.name"
            >
              <el-upload
                class="upload-demo"
                ref="fileUpd"
                :accept="formItem.acceptType"
                action="123"
                :data="upddata"
                :multiple="formItem.multiple"
                :on-change="handleChange"
                :on-preview="handlePreview"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :on-success="handleUpdSuccess"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary">
                  <i class="el-icon-plus"></i>
                  {{ formItem.choseBtn }}
                </el-button>
              </el-upload>
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
          <el-form-item
            label-width="0"
            :class="
              formGroupSettings.fullScreen
                ? 'textAlignCenter'
                : 'textAlignRight'
            "
          >
            <el-button
              v-for="formBtn in formGroupSettings.formButtonList"
              :key="formBtn.flag"
              :type="formBtn.styleType"
              :size="formBtn.size"
              :icon="formBtn.icon"
              @click="onSubmit(formBtn, 'formItems')"
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
// import inputTable from "@/components/inputTable";
export default {
  name: "formGroup",
  props: {
    formGroupSettings: Object
  },
  components: {
    commonTitleWithBorder
    // inputTable
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
      // if (item.type == "upload") {
      //   that.updfileParamName = item.name ? item.name : "files";
      // }
    });
  },
  // updated() {
  //   this.fileList = [];
  // },
  methods: {
    //inputtable取值
    getTableData(data) {
      console.log(data, "data");
    },
    // 文件上传相关钩子
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 ${files.length} 个文件`);
      console.log(files, fileList);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      // console.log(file, fileList);
    },
    submitUpload() {
      this.$refs.fileUpd[0].submit();
    },
    handleUpdSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      // that.$emit("formGroupSubmit", formBtn, "updType");
    },
    // 添加删除打分项
    removeDomain(item, flag) {
      if (this.formGroupSettings.formGroupValues[flag].length <= 1) {
        return false;
      }
      var index = this.formGroupSettings.formGroupValues[flag].indexOf(item);
      if (index !== -1) {
        this.formGroupSettings.formGroupValues[flag].splice(index, 1);
      }
    },
    addDomain(item, flag) {
      let newObj = JSON.parse(JSON.stringify(item));
      this.formGroupSettings.formGroupValues[flag].push(newObj);
    },
    // 下拉关联其他项目
    handleChangeSelect(linkname, data) {
      if (!linkname) {
        return false;
      }
      this.$emit("linkSelect", linkname, data);
    },
    updDataChange(data) {
      let that = this;
      return new Promise(resolve => {
        that.uploadForm = new FormData();
        let postParams = JSON.parse(JSON.stringify(data)),
          updstrName = that.updfileParamName;
        postParams = that.$globalFnc.postArrtoString(postParams);
        // if (that.fileList.length == 1) {
        //   updstrName = "file";
        // }
        // if (that.fileList.length > 1) {
        //   updstrName = "files";
        // }
        let keys = Object.keys(postParams);
        for (let key of keys) {
          if (key != "viewfiles" && key != "flowComments")
            that.uploadForm.append(key, postParams[key]);
        }
        if (that.fileList.length > 0) {
          for (var i = 0; i < that.fileList.length; i++) {
            that.uploadForm.append(updstrName, that.fileList[i].raw);
          }
        }
        resolve(that.uploadForm);
      });
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
          if (that.formGroupSettings.formGroupTypeUpload) {
            that
              // .updDataChange(that.formGroupSettings.formGroupValues)
              .updDataChange(postDatas)
              .then(data => {
                // that.submitUpload();
                that.fileList = [];
                that.$emit("formGroupSubmit", formBtn, data, postDatas);
              });
          } else {
            that.$emit(
              "formGroupSubmit",
              formBtn,
              postDatas
              // that.formGroupSettings.formGroupValues
            );
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
