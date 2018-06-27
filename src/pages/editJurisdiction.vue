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
                    <label class="requireredstar">角色名称：</label>
                    <input type="text" name="roleName" v-model="addroleName">
                    <span style="color: red" v-show="updateRolespan">角色名称不能为空</span>
                </div>
                <div class="form_line">
                    <label class="float-left">角色描述：</label>
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
                <div class="permission" v-for="(item,index) in allPermissions" :key="'level1-'+index">
                    <div class="level1">
                        <label>
                            <input type="checkbox" level="1" @click="ckeckBoxAll">
                            <b>{{item.level1}}</b>
                        </label>
                    </div>
                    <div class="level2">
                        <div v-for="(list,index) in item.permisions" :key="'level2-'+index">
                            <label>
                                <input type="checkbox" level="2" @click="checkBoxLevelTwo">
                                <b>{{list.level2}}</b>
                            </label>
                            <div class="level3" v-for="permision in list.permisions" :key="'level3-'+permision.id">
                                <label>
                                    <input type="checkbox" :code="permision.id" @click="checkBoxLevelThree">{{permision.name}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getAllPermissions} from '@/api/api';
    export default {
        data:function () {
            return {
                updateRolespan:false,
                addroleName:'',
                addrolecomment:'',
                allPermissions:[],
            }
        },
        created:function(){
            // 取得编辑行数
            this.getIndex();
            // 获取所有权限列表
            this.getAllPermissions();
        },
        methods:{
            // 获取所有权限列表
            getAllPermissions: async function () {
                let response = await getAllPermissions();
                if(response.meta.code === 0){
                    let data = response.data;
                    let arr = [];
                    for(let key1 in data){
                        let arr2 = [];
                        for(let key2 in data[key1]){
                            arr2.push({
                                level2: key2,
                                permisions: data[key1][key2]
                            });
                        }
                        arr.push({
                            level1: key1,
                            permisions: arr2
                        });
                    }
                    this.allPermissions = arr;
                }
            },
             // 选中事件
            ckeckBoxAll: function (e) {
                let targetNode = e.target.parentNode.parentNode.parentNode.getElementsByTagName('input');
                if(e.target.checked === true){
                    for(var i=1;i<targetNode.length;i++){
                        targetNode[i].checked = true;
                    }
                }else{
                    for(var i=1;i<targetNode.length;i++){
                        targetNode[i].checked = false;
                    }
                }
            },
            checkBoxLevelTwo: function (e) {
                let targetNode = e.target.parentNode.parentNode.getElementsByTagName('input');
                if(e.target.checked === true){
                    for(var i=1;i<targetNode.length;i++){
                        targetNode[i].checked = true;
                    }
                }else{
                    for(var i=1;i<targetNode.length;i++){
                        targetNode[i].checked = false;
                    }
                }
            },
            checkBoxLevelThree: function (e) {
                let targetNode = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input');
                if(e.target.checked === false){
                    targetNode[0].checked=false;
                    targetNode[1].checked=false;
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
                    this.$router.push({
                        name:'Role',
                        params:{
                            roleName:this.addroleName,
                            description:this.addrolecomment,
                            index:this.index
                        }
                    });
                    this.updateRolespan=false;
                    this.addroleName='';
                    this.addrolecomment='';
                }
            },
            //取得传递值index
            getIndex:function(){
                this.index=this.$route.params.index;
            }
        }
    }

</script>
<style scoped>
    @import '../assets/css/index.css';
</style>