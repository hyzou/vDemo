<template>
  <div class="layout-manage">
    <el-container style="width: 100%;height: 100%;">
      <el-header v-show="!isOnlyContent">
        <el-row :gutter="20">
          <!--菜单收缩按钮-->
          <el-col :span="6" class="lheight60 text-white fontSize20">
            <i
              class="el-icon-s-fold cursor"
              @click="isCollapse = !isCollapse"
            ></i>
            <span>
              江西省粮食质量监管系统
            </span>
          </el-col>
          <!--顶部导航-->
          <el-col :span="18" class="clearfix">
            <span
              class="headerToolbar-icon el-icon-switch-button cursor floatRight lheight60 text-white"
              @click="logout"
            ></span>
            <span class="mr20 floatRight lheight60 text-white">
              {{ userName }}
            </span>
            <span
              class="mr5 headerToolbar-icon el-icon-s-custom currentUser floatRight lheight60 text-white"
            ></span>
            <el-menu
              :default-active="activeIndex"
              class="borderNone floatRight topMenu mr110"
              mode="horizontal"
              @select="handleSelect"
              :unique-opened="true"
              background-color="#336CDE"
              text-color="#fff"
              active-text-color="#ffd04b"
              ref="elMenuTop"
            >
              <el-menu-item :index="$constants.DEF_MENU_INDEX_INDEX">
                首页
              </el-menu-item>
              <top-menu
                v-for="menuItem in menuItemArray"
                :key="menuItem.id"
                :menu="menuItem"
              />
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="layout-manage-container">
        <el-aside v-show="!isOnlyContent" id="left_menu" style="width:220px">
          <!--左侧菜单栏-->
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="left_menu_select"
            background-color="#ffffff"
            text-color="#3D4966"
            :collapse-transition="true"
            :default-active="current_active"
            :collapse="isCollapse"
            active-text-color="#3377FF"
          >
            <!--最外层模板循环-->
            <template v-for="item in current_menu" @topselect="menuChange">
              <leftMenu :menu="item" :key="item.id"></leftMenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="mainContainer" id="mainContent">
          <!--面包屑菜单-->
          <el-breadcrumb
            v-show="!isOnlyContent"
            separator-class="el-icon-arrow-right"
            class="pb15"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbNameArray"
              :key="index"
              >{{ item }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <!--页面视图 绑定key值,同路由参数改变时路由刷新-->
          <router-view
            :key="$route.path + $route.params"
            @transfBreadcrumb="getBreadcrumbName"
          ></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import topMenu from './views/Navi/topMenu'
import leftMenu from './views/Navi/leftMenu'
export default {
  name: "app",
  data() {
    return {
      activeIndex: this.$constants.DEF_MENU_INDEX_INDEX,
      current_active: 'qas-sample0101',
      is_toggle: false,
      isCollapse: false,
      showRouterView: true,
      menuItemArray: [],
      current_menu: {},
      userName: '',
      breadcrumbNameArray: [],
      isOnlyContent: false
    }
  },
  components: {
    topMenu: topMenu,//顶部菜单
      leftMenu
  },
  methods: {
    handleOpen() {
      //console.log(key, keyPath);
    },
    handleClose() {
      //console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      //更改激活目录
      this.current_active = key;

      //点击首页
      if (this.$constants.DEF_MENU_INDEX_INDEX == key) {
        this.$router.push({
          name: "index"
        });
        return false;
      }
      //更改当前使用目录
      if (keyPath[0]) {
        let menus = this.menuItemArray;
        for (let i = 0; i < menus.length; i++) {
          if (keyPath[0] == menus[i].id && menus[i].children && menus[i].children.length) {
            this.current_menu = menus[i].children;
            break;
          }
        }
      }
      let path = key.split('/');
      //路由跳转
      if (path[1]) {
        let name = path[1].split('_');
        this.$router.push({
          name: name[0],
          params: {
            id: name[1]
          }
        });
      } else {
        console.error("菜单路径配置错误,无法解析!")
      }
    },
    left_menu_select(key) {
      this.current_active = key;
      this.activeIndex = key;
      let path = key.split('/');
      //路由跳转
      if (path[1]) {
        let name = path[1].split('_');
        this.$router.push({
          name: name[0],
          params: {
            id: name[1]
          }
        });
      } else {
        console.error("菜单路径配置错误,无法解析!")
      }
    },
    //顶部导航选择 当前目录变更监听
    menuChange(newMenu) {
      this.current_menu = newMenu;
    },
    logout() {
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          window.location.href = this.$constants.logout;
      })
    },
    //面包屑导航
    getBreadcrumbName(obj) {
      this.breadcrumbNameArray = obj;
    },
    getMenu() {
        const $this = this;
      //获取菜单
      this.$get({
        url: "/_data/base/menu/getMenuTreeByUser?sysType=oh-qas",
        fnc: data => {
          if (data) {
            //要用的菜单
              $this.menuItemArray = data[0].children[0].children;
            //hash模式下解析当前路径,并手动跳转
              $this.$dateUtl.refresh(this);
            //遍历菜单找出当前目录
            let menus = $this.menuItemArray;
            let find = $this.setMenu(menus);
            //没有匹配的目录时则使用菜单第一条数据
            if (!find) {
                $this.current_menu = $this.menuItemArray[0].children;
            }
          }
        },
      });
    },
    getBasicData() {
      const  $this = this;
      //获取基础数据 产品品种数据
      this.$get({
        url: "/_data/basic/grainbreed/tree",
        fnc: data => {
            $this.$store.dispatch('set_products', data[0].children);//保存到全局供其他子组件调用
        }
      });
      //获取基础数据 监测级别数据
      this.$get({
        url: "/_data/frame/ref/list?_refKey=dict&busintypeid=qas_adminLevel",
        fnc: data => {
            $this.$store.dispatch('set_admins', data);//保存到全局供其他子组件调用
        }
      });
      //获取当前登录人员的行政区域
        this.$get({
            url: "/_data/basic/district2/treeByUser",
            fnc: data => {
                $this.$store.dispatch("set_areaLevel",data && data.length > 0 ? data[0].children : []);
            }
        });
    },
      setMenu(menus){
          let find = false;
          for (let i = 0; i < menus.length; i++) {
              //如果当前对象没有子菜单 则判断当前对象是否有链接 有的话判断是否和当前活动路径相同 相同的话赋值为父菜单的子菜单信息
              let menuObject = menus[i];
              if (!menuObject.children || menuObject.children.length == 0){
                  continue;
              }
              //有子对象 则循环子对象判断是否相等
              find = this.doSetMenu(menuObject.children,menuObject);
              if (find){
                  break;
              }
          }
          return find;
      },
      doSetMenu(menus,parentMenu){
        let find = false;
          for (let j = 0; j < menus.length; j++) {
              let menuObject = menus[j];
              //先判断是否符合
              if (this.current_active == menuObject.menuaction) {
                  this.current_menu =parentMenu.children;
                  find = true;
                  break;
              }
              //不符合的话 判断是否有子项
              //没有的话
              if (!menuObject.children || menuObject.children == 0){
                  if (menuObject.menuaction) {
                      if (this.current_active == menuObject.menuaction) {
                          this.current_menu =parentMenu.children;
                          find = true;
                          break;
                      }
                  }
                  continue;
              }

              let childrenObject = menuObject.children;
              find = this.doSetMenu(childrenObject,parentMenu == null ? menuObject : parentMenu);
              //如果找到了就跳出循环
              if (find){
                  break;
              }
          }
          return find;
      }
  },
  created() {
    this.isOnlyContent = (window.location.hash.indexOf("isOnlyContent") > -1) ? true:false;
    const $this = this;
    this.$get({
      url: "/_data/base/operator/getUserSeesion",
      fnc: data => {
        //失败或者没有用户信息
        if (!data || !data.success || !data.data) {
          return false;
        }
        //存储用户信息
        if (data && data.success) {
          let userData = data.data;
            $this.$store.dispatch('set_userInfo', userData);
            $this.userName = userData.name;
        }
      },
      rej: () => {
        //调到登录页面
        //this.toLogin();
      }
    });

    this.getMenu();
    this.getBasicData();

  }
}
</script>
