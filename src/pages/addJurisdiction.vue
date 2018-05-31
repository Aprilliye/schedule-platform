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
                    <span style="color: red" v-show="updateRolespan">权限方案名称不能为空</span>
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
                <!--系统设置部分-->
                <div class="rolesystemset clear">
                    <div class="rolecheckallbox">
                        <Checkbox class="checkboxtitle" @on-change="checkAllsystemset" v-model="checkAllsystemsetmodel">系统设置</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <Checkbox class="checkboxtitle" @on-change="checkUsermanage" v-model="checkUsermanagemodel">人员管理</Checkbox>

                        <CheckboxGroup @on-change="checkUserManageReverse">
                            <Checkbox  class="rolecheckbox"  v-for="(item,index) in managesystemItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                        <Checkbox class="checkboxtitle" @on-change="checkUsergroup" v-model="checkUsergroupmodel">人员分组</Checkbox>
                        <CheckboxGroup  @on-change="checkGroupModelReveser">
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in groupsystemItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                        <Checkbox class="checkboxtitle" @on-change="checkUserrole" v-model="checkUserrolemodel">权限设置</Checkbox>
                        <CheckboxGroup @on-change="checkUserRoleReverse">
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in rolesystemItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="roledescribe">
                        <p>暂无描述</p>
                        <p v-for="item in managesystemItem">{{item.describe}}</p>
                        <p>暂无描述</p>
                        <p v-for="item in groupsystemItem">{{item.describe}}</p>
                        <p>暂无描述</p>
                        <p v-for="item in rolesystemItem">{{item.describe}}</p>
                    </div>
                </div>
                <!--排班管理部分-->
                <div class="roleschedulmanage clear">
                    <div class="rolecheckallbox">
                        <Checkbox class="checkboxtitle"  @on-change="checkAllschedulmanage"  v-model="checkAllschedulmanagemodel">排班管理</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <CheckboxGroup  @on-change="checkSchedulManageReserve">
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in schedulmanageItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div  class="roledescribe">
                        <p v-for="item in schedulmanageItem">{{item.describe}}</p>
                    </div>
                </div>
                <!--排班设置部分-->
                <div class="roleschedulset clear">
                    <div class="rolecheckallbox">
                        <Checkbox class="checkboxtitle"  @on-change="checkAllschedulset"  v-model="checkAllschedulsetmodel">排班设置</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <Checkbox class="checkboxtitle"  @on-change="checkAllshift"  v-model="checkAllshiftmodel">班次设置</Checkbox>
                        <CheckboxGroup @on-change="checkSchedulSetReverse">
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in shiftschedulsetItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                        <Checkbox class="checkboxtitle"  @on-change="checkAllpost"  v-model="checkAllpostmodel">岗位设置</Checkbox>
                        <CheckboxGroup @on-change="checkAllPostReverse">
                            <Checkbox class="rolecheckbox"  v-for="(item,index) in postschedulsetItem" :key="index" :label="item.name" v-model="item.ifChecked"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div  class="roledescribe">
                        <p>暂无描述</p>
                        <p v-for="item in shiftschedulsetItem">{{item.describe}}</p>
                        <p>暂无描述</p>
                        <p v-for="item in postschedulsetItem">{{item.describe}}</p>
                    </div>
                </div>
                <!--统计报表部分-->
                <div class="rolereport clear">
                    <div class="rolecheckallbox">
                        <Checkbox class="checkboxtitle"  @on-change="checkAllreport"  v-model="checkAllreportmodel">统计报表</Checkbox>
                    </div>
                    <div class="rolecheckboxdiv">
                        <CheckboxGroup @on-change="checkAllReportReverse">
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
        data:function () {
            return {
                updateRolespan:false,
                checkAllsystemsetmodel:false,
                checkAllschedulmanagemodel:false,
                checkAllschedulsetmodel:false,
                checkAllreportmodel:false,
                checkUsermanagemodel:false,
                checkUsergroupmodel:false,
                checkUserrolemodel:false,
                checkAllshiftmodel:false,
                checkAllpostmodel:false,
                checkAllschedultablemodel:false,
                addroleName:'',
                addrolecomment:'',
                managesystemItem:[
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
                ],
                groupsystemItem:[
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
                    }
                ],
                rolesystemItem:[
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
                shiftschedulsetItem:[
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
                ],
                postschedulsetItem:[
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
            checkAllsystemset:function(){//系统设置全选
                if (this.checkAllsystemsetmodel){
                    this.checkUsermanagemodel=true;
                    this.checkUsergroupmodel=true;
                    this.checkUserrolemodel=true;
                    for(var i=0;i<this.managesystemItem.length;i++){
                        this.managesystemItem[i].ifChecked=true;
                    }
                    for(var i=0;i<this.groupsystemItem.length;i++){
                        this.groupsystemItem[i].ifChecked=true;
                    }
                    for(var i=0;i<this.rolesystemItem.length;i++){
                        this.rolesystemItem[i].ifChecked=true;
                    }
                }else{
                    this.checkUsermanagemodel=false;
                    this.checkUsergroupmodel=false;
                    this.checkUserrolemodel=false;
                    for(var i=0;i<this.managesystemItem.length;i++){
                        this.managesystemItem[i].ifChecked=false;
                    }
                    for(var i=0;i<this.groupsystemItem.length;i++){
                        this.groupsystemItem[i].ifChecked=false;
                    }
                    for(var i=0;i<this.rolesystemItem.length;i++){
                        this.rolesystemItem[i].ifChecked=false;
                    }
                }
            },
            checkAllschedulmanage:function(){//排班管理全选
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
            checkAllschedulset:function(){//排班设置全选
                if(this.checkAllschedulsetmodel){
                    this.checkAllshiftmodel=true;
                    this.checkAllpostmodel=true;
                    for(var i=0;i<this.shiftschedulsetItem.length;i++){
                        this.shiftschedulsetItem[i].ifChecked=true;
                    }
                    for(var i=0;i<this.postschedulsetItem.length;i++){
                        this.postschedulsetItem[i].ifChecked=true;
                    }
                }else{
                    this.checkAllshiftmodel=false;
                    this.checkAllpostmodel=false;
                    for(var i=0;i<this.shiftschedulsetItem.length;i++){
                        this.shiftschedulsetItem[i].ifChecked=false;
                    }
                    for(var i=0;i<this.postschedulsetItem.length;i++){
                        this.postschedulsetItem[i].ifChecked=false;
                    }
                }
            },
            checkAllreport:function(){
                if (this.checkAllreportmodel){//统计报表全选
                    for(var i=0;i<this.reportItem.length;i++){
                        this.reportItem[i].ifChecked=true;
                    }
                }else{
                    for(var i=0;i<this.reportItem.length;i++){
                        this.reportItem[i].ifChecked=false;
                    }
                }
            },
            checkUsermanage:function(){//人员管理全选
                if (this.checkUsermanagemodel){
                    for(var i=0;i<this.managesystemItem.length;i++){
                        this.managesystemItem[i].ifChecked=true;
                        this.checkAllsystemsetmodel=true;

                    }
                }else{
                    for(var i=0;i<this.managesystemItem.length;i++){
                        this.managesystemItem[i].ifChecked=false;
                    }
                }
            },
            checkUsergroup:function(){//人员分组全选
                if (this.checkUsergroupmodel){
                    for(var i=0;i<this.groupsystemItem.length;i++){
                        this.groupsystemItem[i].ifChecked=true;
                        this.checkAllsystemsetmodel=true;
                    }
                }else{
                    for(var i=0;i<this.groupsystemItem.length;i++){
                        this.groupsystemItem[i].ifChecked=false;
                    }
                }

            },
            checkUserrole:function(){//权限设置全选
                if (this.checkUserrolemodel){
                    for(var i=0;i<this.rolesystemItem.length;i++){
                        this.rolesystemItem[i].ifChecked=true;
                        this.checkAllsystemsetmodel=true;
                    }
                }else{
                    for(var i=0;i<this.rolesystemItem.length;i++){
                        this.rolesystemItem[i].ifChecked=false;
                    }
                }
            },
            checkAllshift:function(){//班次设置全选
                if (this.checkAllshiftmodel){
                    for(var i=0;i<this.shiftschedulsetItem.length;i++){
                        this.shiftschedulsetItem[i].ifChecked=true;
                        this.checkAllschedulsetmodel=true;
                    }
                }else{
                    for(var i=0;i<this.shiftschedulsetItem.length;i++){
                        this.shiftschedulsetItem[i].ifChecked=false;
                    }
                }
            },
            checkAllpost:function(){//岗位设置全选
                if (this.checkAllpostmodel){
                    for(var i=0;i<this.postschedulsetItem.length;i++){
                        this.postschedulsetItem[i].ifChecked=true;
                        this.checkAllschedulsetmodel=true;
                    }
                }else{
                    for(var i=0;i<this.postschedulsetItem.length;i++){
                        this.postschedulsetItem[i].ifChecked=false;
                    }
                }
            },
            //人员管理反选
            checkUserManageReverse:function(){
                for(var i=0;i<this.managesystemItem.length;i++){
                    if(this.managesystemItem[i].ifChecked){
                        this.checkUsermanagemodel=true;
                        this.checkAllsystemsetmodel=true;
                    }
                }
            },
            //人员分组反选
            checkGroupModelReveser:function(){
                for(var i=0;i<this.groupsystemItem.length;i++){
                    if(this.groupsystemItem[i].ifChecked){
                        this.checkUsergroupmodel=true;
                        this.checkAllsystemsetmodel=true;
                    }
                }
            },
            //权限设置反选
            checkUserRoleReverse:function(){
                for(var i=0;i<this.rolesystemItem.length;i++){
                    if(this.rolesystemItem[i].ifChecked){
                        this.checkUserrolemodel=true;
                        this.checkAllsystemsetmodel=true;
                    }
                }
            },
            //排班管理反选
            checkSchedulManageReserve:function(){
                for(var i=0;i<this.schedulmanageItem.length;i++){
                    if(this.schedulmanageItem[i].ifChecked){
                        this.checkAllschedulmanagemodel=true;
                    }
                }
            },
            //班次设置全选
            checkSchedulSetReverse:function(){
                for(var i=0;i<this.shiftschedulsetItem.length;i++){
                    if(this.shiftschedulsetItem[i].ifChecked){
                        this.checkAllshiftmodel=true;
                        this.checkAllschedulsetmodel=true;
                    }
                }
            },
            //岗位设置反选
            checkAllPostReverse:function(){
                for(var i=0;i<this.postschedulsetItem.length;i++){
                    if(this.postschedulsetItem[i].ifChecked){
                        this.checkAllpostmodel=true;
                        this.checkAllschedulsetmodel=true;
                    }
                }
            },
            //统计报表全选
            checkAllReportReverse:function(){
                for(var i=0;i<this.reportItem.length;i++){
                    if(this.reportItem[i].ifChecked){
                        this.checkAllreportmodel=true;
                    }
                }
            },
            callback:function(){
                this.$router.push('/role');

            },
            updateRole:function(){
                    if(!this.addroleName){
                        this.updateRolespan=true;
                        return false;
                    }else{
                        this.updateRolespan=false;
                    }
            }
        }
    }

</script>
<style scoped>
    @import '../assets/css/index.css';
</style>