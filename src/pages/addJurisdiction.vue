<template>
    <div class="container">
        <div class="content-header">
            <div class="float-left">
                <a class="btnDefault bgBlue" href="javascript:;" @click="updateRole">提交</a>
                <a class="btnback" @click="callback">返回</a>
            </div>
        </div>
        <div class="panel-body">
            <form id="roleForm2" class="form-container">
                <input type="hidden" id="permissionIds" name="permissionIds"/>
                <input type="hidden" name="roleId" id="roleId" value="$!role.roleId">
                <div class="form_line">
                    <label class="requireredstar">权限方案名称：</label>
                    <input type="text" name="roleName" v-model="addroleName">
                    <span class="updateRolespan" style="color: red;display: none">权限方案名称不能为空</span>
                </div>
                <div class="form_line">
                    <label class="float-left">权限方案描述：</label>
                    <textarea class="roleSchemedescription" name="comment"  v-model="addrolecomment"></textarea>
                </div>
                <div class="clear"></div>
            </form>
            <div class="thead">
                <span>模块名称</span>
                <span>职务</span>
                <span>职务描述</span>
            </div>
            <div class="tbody">
                <div class="rolesystemset clear">
                    <div class="rolecheckallbox">
                        <Checkbox @on-change="checkAllsystemset" v-model="checkAllsystemsetmodel">系统设置</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <CheckboxGroup>
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in systemItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="roledescribe">
                        <p v-for="item in systemItem">{{item.describe}}</p>
                    </div>
                </div>
                <div class="roleschedulmanage clear">
                    <div class="rolecheckallbox">
                        <Checkbox  @on-change="checkAllschedulmanage"  v-model="checkAllschedulmanagemodel">排班管理</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <CheckboxGroup>
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in schedulmanageItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div  class="roledescribe">
                        <p v-for="item in schedulmanageItem">{{item.describe}}</p>
                    </div>
                </div>
                <div class="roleschedulset clear">
                    <div class="rolecheckallbox">
                        <Checkbox  @on-change="checkAllschedulset"  v-model="checkAllschedulsetmodel">排班设置</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <CheckboxGroup>
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in schedulsetItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div  class="roledescribe">
                        <p v-for="item in schedulsetItem">{{item.describe}}</p>
                    </div>
                </div>
                <div class="rolereport clear">
                    <div class="rolecheckallbox">
                        <Checkbox  @on-change="checkAllreport"  v-model="checkAllreportmodel">统计报表</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <CheckboxGroup>
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in reportItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div  class="roledescribe">
                        <p v-for="item in reportItem">{{item.describe}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        created:function(){
            this.request();
        },
        data:function () {
            return {
                checkAllsystemsetmodel:false,
                checkAllschedulmanagemodel:false,
                checkAllschedulsetmodel:false,
                checkAllreportmodel:false,
                addroleName:'',
                addrolecomment:'',
                systemItem:[
                    {
                        name: '人员管理',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增人员',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '编辑人员',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '删除人员',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '导入人员',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '人员分组',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增站区',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '修改站区',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '删除站区',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增站点',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '修改站点',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '删除站点',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '权限管理',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增权限',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '修改权限',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '删除权限',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                ],
                schedulmanageItem:[
                    {
                        name: '排班表格',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增排班',
                        ifChecked: false,
                        describe:'暂无描述'
                    }
                ],
                schedulsetItem:[
                    {
                        name: '班次设置',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增班制',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '修改班制',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '删除班制',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '岗位设置',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '新增岗位',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '修改岗位',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '删除岗位',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                ],
                reportItem:[
                    {
                        name: '工时报表',
                        ifChecked: false,
                        describe:'暂无描述'
                    },
                    {
                        name: '临时报表',
                        ifChecked: false,
                        describe:'暂无描述'
                    }
                ]
            }
        },
        methods:{
            request:function(){
            },
            checkAllsystemset:function(){
                console.log(this.checkAllsystemsetmodel)
                if (this.checkAllsystemsetmodel){
                    for(var i=0;i<this.systemItem.length;i++){
                        this.systemItem[i].ifChecked=true;
                    }
                }else{
                    for(var i=0;i<this.systemItem.length;i++){
                        this.systemItem[i].ifChecked=false;
                    }
                }
            },
            checkAllschedulmanage:function(){
                if (this.checkAllschedulmanagemodel){
                    for(var i=0;i<this.schedulmanageItem.length;i++){
                        this.schedulmanageItem[i].ifChecked=true;
                    }
                }else{
                    for(var i=0;i<this.schedulmanageItem.length;i++){
                        this.schedulmanageItem[i].ifChecked=false;
                    }
                }

            },
            checkAllschedulset:function(){
                if (this.checkAllschedulsetmodel){
                    for(var i=0;i<this.schedulsetItem.length;i++){
                        this.schedulsetItem[i].ifChecked=true;
                    }
                }else{
                    for(var i=0;i<this.schedulsetItem.length;i++){
                        this.schedulsetItem[i].ifChecked=false;
                    }
                }
            },
            checkAllreport:function(){
                if (this.checkAllreportmodel){
                    for(var i=0;i<this.reportItem.length;i++){
                        this.reportItem[i].ifChecked=true;
                    }
                }else{
                    for(var i=0;i<this.reportItem.length;i++){
                        this.reportItem[i].ifChecked=false;
                    }
                }
            },
            callback:function(){
                this.$router.push('/role');

            },
            updateRole:function(){
                if(!this.addroleName){
                    $(".updateRolespan").css("display","inline-block")
                    return false;
                }
            }
        }
    }

</script>
<style scoped>
    @import '../assets/css/index.css';
</style>