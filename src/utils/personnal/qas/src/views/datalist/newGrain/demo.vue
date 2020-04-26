<template>
  <el-form
    label-width="110px"
    :inline="true"
    :model="planForm"
    :rules="rules"
    ref="planForm"
  >
    <!--表单第一行-->
    <el-form-item label="计划性质:" prop="nature">
      <el-radio-group v-model="planForm.nature" @change="planClick">
        <el-radio-button
          v-for="name in nameGroup"
          :key="name.value"
          :label="name.value"
          name="nature"
        >
          {{ name.text }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <br />
    <!--表单第二行-->
    <el-form-item label="计划标题:" prop="name">
      <el-input v-model="planForm.name" class="dialog_input"></el-input>
    </el-form-item>
    <el-form-item label="品种分类:" prop="grainBreed">
      <el-cascader
        v-model="planForm.grainBreed"
        :options="$store.getters.products"
        :props="{
          expandTrigger: 'hover',
          label: 'text',
          value: 'id'
        }"
        ref="productLabel2"
        @change="handChange"
        class="dialog_input"
        clearable
      ></el-cascader>
    </el-form-item>
    <el-form-item label="产品品种:" prop="sampleRequest[0].productName">
      <el-select
        v-model="planForm.sampleRequest[0].productName"
        :disabled="true"
        class="dialog_input"
      >
      </el-select>
    </el-form-item>

    <el-form-item label="监测级别:" prop="adminLevel">
      <el-select
        v-model="planForm.adminLevel"
        @change="admin_change"
        class="dialog_input"
      >
        <el-option
          v-for="item in $store.getters.admins"
          :key="item.text"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <br />
    <!--表单第三行-->
    <el-form-item label="扦样方式:" prop="sampleWay">
      <el-select
        v-model="planForm.sampleWay"
        placeholder="扦样方式"
        class="dialog_input"
      >
        <el-option
          v-for="item in data.modes"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="判定等级:" prop="sampleRequest[0].requiredGrade">
      <el-select
        v-model="planForm.sampleRequest[0].requiredGrade"
        placeholder="判定等级"
        class="dialog_input"
      >
        <el-option
          v-for="item in data.grades"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下发时间:" prop="publishDtStr">
      <el-date-picker
        v-model="planForm.publishDtStr"
        type="date"
        value-format="yyyy-MM-dd"
        class="dialog_input"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="扦样要求:" prop="sampleRequest[0].samplingRequire">
      <el-input
        v-model="planForm.sampleRequest[0].samplingRequire"
        class="dialog_input"
      ></el-input>
    </el-form-item>
    <br />
    <!--表单第四行-->
    <el-form-item label="样品重量:" prop="sampleRequest[0].sampleWeight">
      <el-input
        v-model.number="planForm.sampleRequest[0].sampleWeight"
        class="input-with-select dialog_input"
      >
        <template slot="append"
          >kg</template
        >
      </el-input>
    </el-form-item>
    <el-form-item label="一式份数:" prop="sampleRequest[0].sampleCopyNum">
      <el-input-number
        v-model="planForm.sampleRequest[0].sampleCopyNum"
        @change="handleChange"
        :min="1"
        :max="10"
        class="dialog_input"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="开始时间:" prop="startDtStr">
      <el-date-picker
        v-model="planForm.startDtStr"
        type="date"
        value-format="yyyy-MM-dd"
        class="dialog_input"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="要求完成日期:" prop="deadlineDtStr">
      <el-date-picker
        v-model="planForm.deadlineDtStr"
        type="date"
        value-format="yyyy-MM-dd"
        class="dialog_input"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <br />
    <!--表单第五行-->
    <el-form-item label="文件上传:">
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :auto-upload="false"
        name="fileList"
        :on-change="loadFiles"
        :on-remove="loadFiles"
        :file-list="planForm.fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
