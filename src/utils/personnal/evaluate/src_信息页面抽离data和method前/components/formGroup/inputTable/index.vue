<template>
  <div>
    <div :class="['inputTable', formItem.tableName]">
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
            <template v-if="item.inputTypeByDate">
              <el-select
                v-if="scope.row.inputType == 'select'"
                size="mini"
                :disabled="scope.row.disabled"
                :placeholder="scope.row.placeHolder || '请选择'"
                v-model="scope.row[item.key]"
                class="width100"
                auto-complete="off"
              >
                <el-option
                  v-for="opt in scope.row.data"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                ></el-option>
              </el-select>
              <el-input
                v-else-if="scope.row.inputType == 'input'"
                size="mini"
                :disabled="scope.row.disabled"
                placeholder="请输入内容"
                v-model="scope.row[item.key]"
              ></el-input>
              <el-input-number
                v-else-if="scope.row.inputType == 'number'"
                size="mini"
                class="width100"
                :precision="scope.row.precision || 0"
                :disabled="scope.row.disabled"
                v-model="scope.row[item.key]"
                :step="scope.row.step || 1"
                :min="scope.row.min"
                :max="scope.row.max"
              ></el-input-number>
              <el-input
                v-else
                type="textarea"
                size="mini"
                :autosize="true"
                :disabled="scope.row.disabled"
                placeholder="请输入内容"
                v-model="scope.row[item.key]"
              ></el-input>
            </template>
            <template v-else>
              <el-select
                v-if="item.inputType == 'select'"
                size="mini"
                :disabled="item.disabled"
                :placeholder="item.placeHolder || '请选择'"
                v-model="scope.row[item.key]"
                class="width100"
                auto-complete="off"
              >
                <el-option
                  v-for="opt in item.data"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                ></el-option>
              </el-select>
              <el-input
                v-else-if="item.inputType == 'input'"
                size="mini"
                :disabled="item.disabled"
                placeholder="请输入内容"
                v-model="scope.row[item.key]"
              ></el-input>
              <el-input-number
                v-else-if="item.inputType == 'number'"
                size="mini"
                class="width100"
                :precision="item.precision || 0"
                :disabled="item.disabled"
                v-model="scope.row[item.key]"
                :step="item.step || 1"
                :min="item.min"
                :max="item.max"
              ></el-input-number>
              <el-input
                v-else
                type="textarea"
                size="mini"
                :autosize="true"
                :disabled="item.disabled"
                placeholder="请输入内容"
                v-model="scope.row[item.key]"
              ></el-input>
            </template>
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
    </div>
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
  </div>
</template>
<script>
export default {
  name: "inputTable",
  props: {
    defaultdatas: {
      type: Object
    }
  },
  model: {
    value: "val",
    event: "inputVal"
  },
  data() {
    console.log(this.defaultdata);
    return {
      val: this.defaultdata
    };
  },
  methods: {
    postValue() {
      this.$emit("inputVal", this.val);
    }
  }
};
</script>
