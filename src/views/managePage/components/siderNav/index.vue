<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <ul class="contentText">
          <li><p>1.siderNav示例即左侧导航，</p></li>
          <li><p>2.数据即为格式化之后的路由对象。</p></li>
          <li><p>3.详情参考router路由定义</p></li>
          <li><p>4.代码情况样例如下所示：
            <pre>
              <code>
                &lt;siderNav :sidebarData="sidebarData" />

                data() {
                  var routerData = this.$store.getters.routerAsyncList[0].children;
                  return {
                    sidebarData: routerData,
                  }
                }  
              </code>
            </pre>
          </p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "siderNav",
  data() {
    return {
    };
  }
};
</script>
