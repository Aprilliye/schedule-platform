<template>
  <div>
      <div class="navbar header">
          <Row>
              <Col span="3">
                <div class="logo">
                    <img class="logoimg" src="../assets/img/logo.png" alt="北京地铁">
                </div>
              </Col>
              <Col span="21">
                <p>运三公司新班制辅助管理系统</p>
                <!-- <div class="dropdown">
                    <Dropdown class="btn float-right">
                        <a href="">
                            <span class="caret">admin</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><a href="">退出</a></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div> -->
                  <div class="right">
                      <span class="username">admin</span>
                      <a class="logout" @click="doLogout">退出</a>
                  </div>
              </Col>
          </Row>
      </div>
      <div class="left-div">
          <Row>
              <Col span="3" style="position:fixed;left:0;top:60px;">
                <Menu class="main-menu">
                    <Submenu name="1">
                        <template slot="title">
                            系统设置
                        </template>
                        <router-link to="./user-manage" id="indexRouter">
                            <MenuItem name="1-1" class="active">
                                <span class="icon-19"></span>
                                人员管理
                            </MenuItem>
                        </router-link>
                        <router-link to="./grouping" >
                            <MenuItem name="1-2">
                                <span class="icon-18"></span>
                                站区设置
                            </MenuItem>
                        </router-link>
                        <router-link to="./role" >
                            <MenuItem name="1-3">
                                <span class="icon-17"></span>
                                权限管理
                            </MenuItem>
                        </router-link>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            排班管理
                        </template>
                        <router-link to="./scheduleForm" >
                            <MenuItem name="2-1">
                                <span class="icon-16"></span>
                                排班表格
                            </MenuItem>
                        </router-link>
                        <router-link to="./autoSchedule" >
                            <MenuItem name="2-2">
                                <span class="icon-6"></span>
                                新增排班
                            </MenuItem>
                        </router-link>
                        <router-link :to="{name: 'candidateSchedule'}" >
                            <MenuItem name="2-3">
                                <Icon  type="clipboard" class="iconsize"></Icon>
                                备班排班
                            </MenuItem>
                        </router-link>
                        
                        <router-link to="./workflow" >
                            <MenuItem name="2-4">
                                <Icon type="code-working" class="iconsize"></Icon>
                                工作流程
                            </MenuItem>
                        </router-link>
                        <router-link to="/mySchedule" >
                            <MenuItem name="2-5">
                                <Icon  type="ios-paper" class="iconsize"></Icon>
                                我的排班
                            </MenuItem>
                        </router-link>
                        
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            排班设置
                        </template>
                        <router-link to="./shiftsSetting" >
                            <MenuItem name="3-1">
                                <span class="icon-7"></span>
                                班次设置
                            </MenuItem>
                        </router-link>
                        <router-link to="./postSetting" >
                            <MenuItem name="3-2">
                                <span class="icon-8"></span>
                                岗位设置
                            </MenuItem>
                        </router-link>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            统计报表
                        </template>
                        <MenuItem name="3-1">
                            <span class="icon-15"></span>
                            工时报表
                        </MenuItem>
                        <MenuItem name="3-2">
                            <span class="icon-16"></span>
                            临时报表
                        </MenuItem>
                    </Submenu>
                </Menu>
              </Col>
              <Col span="21" style="margin-left:12.5%;">
                <div class="right-div">
                    <router-view></router-view>
                </div>
              </Col>
          </Row>
      </div>
  </div>
</template>
<script>
    export default {
        methods: {
            doLogout: async function () {
                // TODO
                this.$router.replace({name: 'Login'});
            },
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>