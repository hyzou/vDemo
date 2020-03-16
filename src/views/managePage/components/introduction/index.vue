<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.目前项目中用的常用组件已在导航中用“*”标出，目前考虑可能不全面，后续使用当中有好的方法，请及时提交意见，框架作持续更新操作，组件为基础设置，可根据项目自行调整，项目特殊调整部分通用性不强可不用提交。
            </p>
          </li>
          <li>
            <p>
              2.项目特有样式组件，为方便调用，项目私有组件自行封装，简单组件且不重要可不用提交。
            </p>
          </li>
          <li class="text-danger">
            <p>
              3.组件的提交，更新意见需单独写明更新文档，组件当中请做好注释。
            </p>
          </li>
          <el-divider></el-divider>
          <li class="text-danger">
            <p>
              4.原则上，组件内部不处理业务逻辑，只用于数据展示与传递，逻辑处理通通放于主界面统一处理。
            </p>
          </li>
          <li>
            <p>5.需要组件回调函数直接在组件上绑定事件传递，如</p>
            <pre>
                <code>
                  &lt;tabCard
                    class="tab-container"
                    :tabSettings="tabSettings"
                    @handleTabChange="handleTabChange"
                    @handleTabsEdit="handleTabsEdit"
                  />
                </code>
              </pre>

            <p>不需要回调函数，应取消绑定事件应写成如下形式</p>
            <pre>
                <code>
                  &lt;tabCard
                    class="tab-container"
                    :tabSettings="tabSettings"
                  />
                </code>
              </pre>
          </li>
          <li>
            <p>
              6.此外，自行封装组件进行数据绑定时，绑定的数据尽量不超过两个，<span
                class="text-danger"
                >有多个变量用对象或者数组形式传递</span
              >，繁杂的数据传值不利于管理。
            </p>
          </li>
          <li>
            <p class="text-danger">
              7.考虑到部分页面为后端同事自行添加，前端人员在编写组件时，
              应注意组件的复用性和可读性，相关注释填写好，同时在本文档同步更新。
              组件的创建统一由前端人员编写修改，尽量不要给非前端同事的使用造成额外负担。
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "introduction"
};
</script>
