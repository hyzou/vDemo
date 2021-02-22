## 安装依赖 yarn install

## 启动执行 yarn serve

## 打包生产版本执行 yarn build

## 请注意，在开发中提交代码时，请把依赖包（node_modules文件夹）添加到svn忽略列表中

## 更新日志 2020/12/30

  ### 表单中添加级联选择器，配置如下
      ```javascript
        {
        type: "cascader",
        label: "级联",
        name: "cascader",
        linkName: "abc",
        data: [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致"
                  },
                  {
                    value: "fankui",
                    label: "反馈"
                  },
                  {
                    value: "xiaolv",
                    label: "效率"
                  },
                  {
                    value: "kekong",
                    label: "可控"
                  }
                ]
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航"
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航"
                  }
                ]
              }
            ]
          },
          {
            value: "zujian",
            label: "组件",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout 布局"
                  },
                  {
                    value: "color",
                    label: "Color 色彩"
                  },
                  {
                    value: "typography",
                    label: "Typography 字体"
                  },
                  {
                    value: "icon",
                    label: "Icon 图标"
                  },
                  {
                    value: "button",
                    label: "Button 按钮"
                  }
                ]
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio 单选框"
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框"
                  },
                  {
                    value: "input",
                    label: "Input 输入框"
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器"
                  },
                  {
                    value: "select",
                    label: "Select 选择器"
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器"
                  },
                  {
                    value: "switch",
                    label: "Switch 开关"
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块"
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器"
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器"
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器"
                  },
                  {
                    value: "upload",
                    label: "Upload 上传"
                  },
                  {
                    value: "rate",
                    label: "Rate 评分"
                  },
                  {
                    value: "form",
                    label: "Form 表单"
                  }
                ]
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table 表格"
                  },
                  {
                    value: "tag",
                    label: "Tag 标签"
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条"
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件"
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页"
                  },
                  {
                    value: "badge",
                    label: "Badge 标记"
                  }
                ]
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert 警告"
                  },
                  {
                    value: "loading",
                    label: "Loading 加载"
                  },
                  {
                    value: "message",
                    label: "Message 消息提示"
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框"
                  },
                  {
                    value: "notification",
                    label: "Notification 通知"
                  }
                ]
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu 导航菜单"
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页"
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑"
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单"
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条"
                  }
                ]
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog 对话框"
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示"
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框"
                  },
                  {
                    value: "card",
                    label: "Card 卡片"
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯"
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板"
                  }
                ]
              }
            ]
          },
          {
            value: "ziyuan",
            label: "资源",
            children: [
              {
                value: "axure",
                label: "Axure Components"
              },
              {
                value: "sketch",
                label: "Sketch Templates"
              },
              {
                value: "jiaohu",
                label: "组件交互文档"
              }
            ]
          }
        ],
        props: {
          children: "children",
          disabled: "disabled",
          label: "label",
          value: "value",
          multiple: false
        },
        filterable: true,
        disabled: false,
        clearable: true,
        debounce: 300,
        span: 8,
        width: "100px"
      }
      ```
  ### 添加资源控制项目公共方法，目录 utils/projectCommonMethods/fomateButtonToShow
      ```用法如下
      this.$fomateButtonToShow(this.operateButtonsSettings.buttonListData).then(
        data => {
          this.operateButtonsSettings.buttonListData = data;
        }
      );
      data.rows.map(item => {
        // do sth.
        item.operateBtns = this.$globalFnc.deepCopy(this.tableOperateBtns);
        if (item.maintainanceMode == "S") {
          /**
          * 行间按钮显示方式两种，一种直接循环数组，另一种通过公用方法
          * **/
          // 方法一
          // item.operateBtns.map(optBtn=>{
          //   if(optBtn.type=="delete"){
          //     optBtn.showFlag = false
          //   }
          // })
          // 方法二
          this.$fomateButtonToShow(item.operateBtns, {
            target: "delete",//待获取的值   对照下面按钮配置情况
            prop: "type",//待获取值字段名称
            flag: "showFlag",//判断按钮是否显示的字段
            action: "false"//判断按钮是否显示字段的值
          }).then(operateBtns => {
            item.operateBtns = operateBtns;
          });
        }
      });
      //按钮配置情况
        tableOperateBtns = [
          {
            text: "业务代码",
            type: "add",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-folder-add",
            isIcon: true,
            postUrl: "",
            id: "menu_3",
            showFlag: "true"
          },
          {
            text: "删除",
            type: "delete",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-delete",
            isIcon: true,
            postUrl: "",
            id: "menu_4",
            showFlag: "false"
          }
        ],
      ```
      





## 更新日志 2021/01/06
  ### table表头添加无限多级表头，在原配置中添加如下children配置
  ```
  {
    prop: "enabled_dsp",
    lable: "主题"
    // children: [
    //   {
    //     prop: "enabled_dsp",
    //     lable: "主题1"
    //   },
    //   {
    //     prop: "enabled_dsp",
    //     lable: "主题2"
    //   }
    // ],
    // isHide: false
  },
  ```
  ### 动态切换table表头，切换多级表头会出现bug，导致表头渲染混乱，可用如下方式解决
  ```
  <tableList
      v-if="tableVisible" //table用v-if做判断，切换表头的同时，重新渲染table
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
  handleChangeTableHeader() {
    this.tableSettings.tableSettingOptions.headerOptions.map(item => {
      if (item.prop == "enabled_dsp") {
        item.isHide = !item.isHide;
      }
    });//切换表头显示
    this.tableVisible = false;//销毁table
    this.$nextTick(() => {
      this.tableVisible = true;//数据更新后再重新渲染table
    });
  },  
  ```