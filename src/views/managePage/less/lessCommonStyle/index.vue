<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              本页面对目前用到的通用样式进行介绍，后续用到<span
                class="text-danger"
                >通用样式</span
              >可添加到global.less中， 如果是<span class="text-danger"
                >项目单独个性化样式</span
              >请添加到projectStyle文件夹下common.less中
            </p>
            <p>
              以下为global.less通用样式的一些介绍
            </p>
            <pre>
                <code>
                  /* 通用样式 */
                  // 定位
                  .positionAbs{
                    position: absolute;
                  }
                  .positionRel{
                    position: relative;
                  }
                  .positionFix{
                    position: fixed;
                  }
                  // 显示相关
                  .displayBlock{
                    display: block;
                  }
                  .displayNone{
                    display: none;
                  }
                  .displayInlineBlock{
                    display: inline-block;
                  }
                  .displayInline{
                    display: inline;
                  }
                  // 元素显示为tabel可用到的竖直方向显示样式
                  .vAlignTop{
                    vertical-align: top;
                  }
                  .vAlignMid{
                    vertical-align: middle;
                  }
                  .vAlignBtm{
                    vertical-align: bottom;
                  }
                  // 浮动
                  .floatLeft{
                    float: left;
                  }
                  .floatRight{
                    float: right;
                  }
                  // 清除浮动（在浮动元素的父元素添加）
                  .clearfix{
                    &:before, &:after {
                      display: table;
                      content: "";
                    }
                    &:after {
                      clear: both
                    }
                  }
                  // 字体显示
                  .textAlignLeft{
                    text-align: left !important;
                  }
                  .textAlignRight{
                    text-align: right !important;
                  }
                  .textAlignCenter{
                    text-align: center !important;
                  }
                  // 文字溢出显示省略号
                  .textEllipsis{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                  }
                  // 无边框
                  .borderNone{
                    border: 0 !important;
                  }
                  // 字体颜色，使用方式：class="text-warning text-danger"
                  .text{
                    &-warning{
                      color: @warning;
                    }
                    &-danger{
                      color: @danger;
                    }
                    &-success{
                      color: @success;
                    }
                    &-primary{
                      color: @primary;
                    }
                  }
                  // 鼠标显示为手型👆
                  .cursor{
                    cursor: pointer;
                  }
                  // 自动边距（用于补充下方边距函数的短缺）
                  .mgAuto{
                    margin: auto;
                  }
                  // 宽度100%（用于补充下方宽度函数的短缺）
                  .width100{
                    .width(100%) !important;
                  }
                  // 样式函数主要用于less源码中的调用，不用于页面
                  // 待调用宽度样式函数，使用方式如上面宽度100%的样式
                  .width(@a:100px){
                      width: @a;
                  }
                  // 待调用行高样式函数，使用方式如上面宽度100%的样式
                  .lh(@a:100px){
                      line-height: @a;
                  }
                  // 待调用圆角样式函数，使用方式如上面宽度100%的样式
                  .borderRadius(@a:5px){
                      border-radius: @a;
                  }

                  //以下为less循环生成样式函数，篇幅问题，这里暂时不贴源码，感兴趣可以自行查看，这里只介绍用法

                  //背景色样式，调用时可直接在页面上使用class="bgfff"
                  //定义bg数组，生成样式名：bgfff，bgeee......
                  //需要添加新的背景色，在@bgList下追加即可，如添加色值为#333333，
                  //添加的值为色值代码（#后面的色值）@bgList: fff eee 333333;使用：class="bg333333"
                  @bgList: fff eee;

                  //循环生成圆角样式，单位px，调用时可直接在页面上使用class="borderR30"
                  //定义borderRadius数组，生成样式名：borderR1，borderR2,borderR10......
                  //需要添加新的圆角值，在@borderRadiusList
                  @borderRadiusList: 1 2 3 4 5 10 20 30 50;

                  //循环生成行高样式，单位px，调用时可直接在页面上使用class="lheight30"
                  //定义lineHeight数组，生成样式名：lheight20，lheight30,lheight40......
                  //需要添加新的行高值，在@lineHeightList
                  @lineHeightList: 20 30 40;

                  // 循环生成边距样式，单位px，调用时可直接在页面上使用class="pd30"
                  // pd30:padding:30px        
                  // pl30:padding-left:30px        
                  // pt30:padding-top:30px
                  // pb30:padding-bottom:30px
                  // pr30:padding-right:30px
                  // mg30:margin:30px
                  // ml30:margin-left:30px
                  // mr30:margin-right:30px
                  // mt30:margin-top:30px
                  // mb30:margin-bottom:30px
                  // 30可以替换成@distant中定义的任一个数字，对应的边框为该数字
                  //的数值，mb50:margin-bottom:50px
                  // 如需添加新的边距值，直接在@distant中添加即可，其他函数方法同样的处理即可
                  //定义要生成的class名称数组
                  @distantName:pd pl pr pt pb mg ml mr mt mb;
                  //定义要生成的边距距离数组
                  @distant:0 3 5 6 10 14 15 20 24 25 28 30 40 50;
                </code>
              </pre>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "lessCommonStyle",
  data() {
    return {};
  }
};
</script>
