<template>
    <div>
        <div class="navbar header">
            <div class="header-left">
                <div class="logo">
                    <img class="logoimg"src="../assets/img/logo.png" alt="北京地铁">
                </div>
                <p>运三公司新班制辅助管理系统</p>
            </div>
            <div class="dropdown">
                <Dropdown class="btn">
                    <a href="javascript:void(0)">
                        <span class="caret">admin</span>
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem><a href="">退出</a></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="left-div">
            <Row>
                <Col span="4">
                <Menu class="main-menu">
                    <Submenu name="1">
                        <template slot="title">
                            系统设置
                        </template>
                        <router-link to="./user-manage" >
                            <MenuItem name="1-1" active-name>
                                <Icon type="person"></Icon>
                              人员管理
                            </MenuItem>
                        </router-link>
                        <MenuItem name="1-2">站区设置</MenuItem>
                        <MenuItem name="1-3">权限管理</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            排班管理
                        </template>
                        <MenuItem name="2-1">排班表格</MenuItem>
                        <MenuItem name="2-2">自动排班</MenuItem>
                        <MenuItem name="2-3">备班排班</MenuItem>
                        <MenuItem name="2-4">工作流程</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            排班设置
                        </template>
                            <MenuItem name="3-1">班次设置</MenuItem>
                            <MenuItem name="3-2">岗位设置</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            统计报表
                        </template>
                        <MenuItem name="3-1">工时报表</MenuItem>
                        <MenuItem name="3-2">临时报表</MenuItem>
                    </Submenu>
                </Menu>
                </Col>
            </Row>
        </div>
        <div class="right-div">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>