<template>
  <div class="sider-nav">
    <el-col :span="24">
      <!-- @open="handleOpen"
        @close="handleClose" -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#222"
        active-text-color="#222"
        unique-opened
        router
      >
        <template v-for="(menuItem, indexNum) in sidebarData">
          <template v-if="!menuItem.hidden">
            <template v-if="!menuItem.children">
              <el-menu-item
                :index="menuItem.path"
                :route="menuItem.path"
                :key="menuItem.path"
              >
                <!-- <i class="el-icon-menu"></i> -->
                <span style="color:#0091FF" slot="title">{{
                  menuItem.meta.title
                }}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu :index="indexNum + ''" :key="menuItem.path">
                <template v-if="!menuItem.hidden" slot="title">
                  <i :class="menuItem.meta.icon" style="color:#0091FF"></i>
                  <span style="color:#0091FF">{{ menuItem.meta.title }}</span>
                </template>
                <template v-if="!menuItem.hidden">
                  <template v-for="(childMenuItem, idx) in menuItem.children">
                    <el-menu-item-group
                      :key="childMenuItem.path"
                      v-if="!childMenuItem.hidden"
                    >
                      <!-- <template slot="title">分组一</template> -->
                      <template v-if="!childMenuItem.children">
                        <template v-if="!childMenuItem.hidden">
                          <el-menu-item
                            class="child"
                            :index="childMenuItem.path"
                            :route="childMenuItem.path"
                          >
                            {{ childMenuItem.meta.title }}
                          </el-menu-item>
                        </template>
                      </template>
                      <template v-else>
                        <el-submenu
                          :index="indexNum + '-' + idx"
                          :key="childMenuItem.path"
                        >
                          <template v-if="!childMenuItem.hidden" slot="title">
                            <i
                              :class="childMenuItem.meta.icon"
                              style="color:#0091FF"
                            ></i>
                            <span style="color:#0091FF">{{
                              childMenuItem.meta.title
                            }}</span>
                          </template>
                          <template v-if="!childMenuItem.hidden">
                            <template
                              v-for="gradeChildMenuItem in childMenuItem.children"
                            >
                              <el-menu-item-group
                                :key="gradeChildMenuItem.path"
                                v-if="!gradeChildMenuItem.hidden"
                              >
                                <!-- <template slot="title">分组一</template> -->
                                <el-menu-item
                                  v-if="!gradeChildMenuItem.hidden"
                                  :index="gradeChildMenuItem.path"
                                  :route="gradeChildMenuItem.path"
                                >
                                  {{ gradeChildMenuItem.meta.title }}
                                </el-menu-item>
                              </el-menu-item-group>
                            </template>
                          </template>
                        </el-submenu>
                      </template>
                    </el-menu-item-group>
                  </template>
                </template>
              </el-submenu>
            </template>
          </template>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: "siderNav",
  props: {
    sidebarData: Array
  }
};
</script>
