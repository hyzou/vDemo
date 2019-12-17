<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="10">
        <img src="@/assets/axios.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>1.global_variable.js用于存放全局变量，直接在集合中添加即可</p>
          </li>
          <li><p>2.httpApi.js中保存数据接口列表，保存所有接口地址。</p></li>
          <li>
            <p>
              3.index.js中封装了axios，拦截更改数据，按需修改相应参数，不需要大幅改动。
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <p>
          axios/httpApi接口表，用于存放所有的接口列表信息，接口的增删在
          <span class="text-danger">apiInterface</span>对象中维护即可
        </p>
        <pre>
          <code>
            const apiInterface = {
              //样例接口1
              gettablelist: "_data/web/webPortalNews/gettablelist",
              //样例接口2
              gettablist: "_data/web/webPortalNews/gettablelist"
            };
          </code>
        </pre>
      </el-col>
      <el-col :span="24">
        <p class="lheight30 mt30">
          页面中的接口调用方法如下,一般情况下，使用get,post方法居多，
          使用前两种调用方式即可，如果出现其他请求方式，应用第三种方法，
          并且，第三种调用方式，第一个参数为请求方式，
          <span class="text-danger">支持所有请求方式</span>， 按需传值即可。
        </p>
        <pre>
          <code>
            mounted() {
              let formData = {
                name: "zhy"
              };
              this.$postData(this.$api.gettablelist, formData).then(xhr => {
                console.log(xhr);
              });
              this.$getData(this.$api.gettablelist, formData).then(xhr => {
                console.log(xhr);
              });
              this.$methodData("put", this.$api.gettablelist, formData).then(xhr => {
                console.log(xhr);
              });
            }
          </code>
        </pre>
        <p class="lheight30 mt30">
          <span class="text-danger">注意！！！</span>
          当所传数据为formdata类型，需要在参数后面设置
          <span class="text-danger">true</span>
          上面的传值方法应改成下列形式
        </p>
        <pre>
          <code>
            mounted() {
              let formData = {
                name: "zhy"
              };
              this.$postData(this.$api.gettablelist, formData, true).then(xhr => {
                console.log(xhr);
              });
              this.$getData(this.$api.gettablelist, formData, true).then(xhr => {
                console.log(xhr);
              });
              this.$methodData("put", this.$api.gettablelist, formData, true).then(xhr => {
                console.log(xhr);
              });
            }
          </code>
        </pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dealAnnouncement",
  data() {
    return {};
  }
};
</script>
