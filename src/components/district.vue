<template>
    <div class="stationArea">
        <div class="content-block">
            <div class="blockheader">
                <span class="listBlockSpan changeStationName">
                    {{title}}
                </span>
                <span class="listBlockSpan">
                    管理员：{{managerName}}
                </span>
                <div class="rgbutton">
                    <Dropdown>
                        <a>
                            <span class="white">操作</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><a @click="beforeUpdateDistrice">修改站区名称</a></DropdownItem>
                            <DropdownItem><a @click="modal.setUserManager = true">设置管理员</a></DropdownItem>
                            <DropdownItem><a @click="modal.addStation = true">添加站点</a></DropdownItem>
                            <DropdownItem><a class="red" @click="beforeDeleteDistrict">删除站区</a></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="blockcontent">
                <ul class="blockul">
                    <li v-for="(item, index) in stations" :key="index">
                        <span class="blockspan" v-show="!editStation">{{item.stationName}}</span>
                        <input type="text" v-model.trim="editStationName" v-show="editStation" @blur="updateStation(item.id)" style="margin-left:5px;"/>
                        <a class="icon-1 delete" @click="beforeDeleteStation(item.id)"></a>
                        <a class="icon-4 edit" @click="beforeUpdateStation(item.stationName)"></a>
                    </li>
                </ul>
            </div>
        </div>
        <!--修改站区弹框-->
        <Modal
            @on-ok="updateDistrict"
            :loading="true"
            title="修改站区名称"
            v-model="modal.updateDistrict">
            <p>
                站区名称：
                <input  name="userCode" type="text" v-model.trim="districtName" >
            </p>
        </Modal>
        <!--添加站点弹框-->
        <Modal
            @on-ok="addStation"
            :loading="true"
            title="添加站点"
            v-model="modal.addStation">
            <p>
                站点名称：
                <input  name="userCode" type="text" v-model.trim="addStationName">
            </p>
        </Modal>
        <!--设置管理员-->
        <Modal
               title="设置管理员"
               v-model="modal.setUserManager"
               width="800px"
               :loading="true"
               @on-ok="setUserManagerMethod('setManager')"
               @on-cancel="cancelSet('setManager')">
            <Form ref="setManager" :model="setManager" :rules="ruleValidate" :label-width="100">
                <FormItem label="员工卡号：" prop="cardNum" class="setWidth">
                    <Input v-model="setManager.cardNum" placeholder=""/>
                </FormItem>
                <FormItem label="人员编码：" prop="peopleNum" class="setWidth">
                    <Input v-model="setManager.peopleNum" placeholder=""/>
                </FormItem>
                <FormItem label="姓名：" prop="name" class="setWidth">
                    <Input v-model="setManager.name" placeholder=""/>
                </FormItem>
                <FormItem label="站区/站点：" prop="stationArea" class="setWidth">
                    <Select v-model="setManager.stationArea" placeholder="请选择">
                        <Option value="xizhimen">西直门</Option>
                    </Select>
                </FormItem>
                <FormItem label="岗位：" prop="post" class="setWidth">
                    <Select v-model="setManager.post" placeholder="请选择">
                        <Option value="zhanquyuan">站区员</Option>
                    </Select>
                </FormItem>
                <FormItem label="管理员：" prop="manager" class="setWidth">
                    <Select v-model="setManager.manager" placeholder="请选择">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="手机号：" prop="phoneNum" class="setWidth">
                    <Input v-model="setManager.phoneNum" placeholder=""/>
                </FormItem>
                <FormItem label="性别：" prop="sexuality" class="setWidth">
                    <Select v-model="setManager.sexuality" placeholder="请选择">
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="生日：" prop="birthday" class="setWidth">
                    <Input v-model="setManager.birthday" placeholder="例:1990-12-12"/>
                </FormItem>
                <FormItem label="身份证：" prop="idCard" class="setWidth">
                    <Input v-model="setManager.idCard" placeholder=""/>
                </FormItem>
                <FormItem label="入职时间：" prop="entryTime" class="setWidth">
                    <Input v-model="setManager.entryTime" placeholder="例：1990-12-12"/>
                </FormItem>
                <FormItem label="婚否：" prop="maritalStatus" class="setWidth">
                    <Select v-model="setManager.maritalStatus" placeholder="请选择">
                        <Option value="married">已婚</Option>
                        <Option value="unmarried">未婚</Option>
                    </Select>
                </FormItem>
                <FormItem label="生育：" prop="birthStatus" class="setWidth">
                    <Select v-model="setManager.birthStatus" placeholder="请选择">
                        <Option value="fertile">已育</Option>
                        <Option value="unfertile">未育</Option>
                    </Select>
                </FormItem>
                <FormItem label="学历：" prop="education" class="setWidth">
                    <Select v-model="setManager.education" placeholder="请选择">
                        <Option value="1">高中以下</Option>
                        <Option value="2">专科</Option>
                        <Option value="3">本科</Option>
                        <Option value="4">硕士</Option>
                        <Option value="5">博士以上</Option>
                    </Select>
                </FormItem>
                <FormItem label="政治面貌：" prop="politicalStatus" class="setWidth">
                    <Select v-model="setManager.politicalStatus" placeholder="请选择">
                        <Option value="1">群众</Option>
                        <Option value="2">共青团员</Option>
                        <Option value="3">共产党团</Option>
                        <Option value="4">民主党派</Option>
                    </Select>
                </FormItem>
                <FormItem label="入党时间：" prop="enterPartyTime" class="setWidth">
                    <Input v-model="setManager.enterPartyTime" placeholder=""/>
                </FormItem>
                <FormItem label="住址：" prop="address" class="setWidth">
                    <Input v-model="setManager.address" placeholder=""/>
                </FormItem>
                <FormItem label="证书编号：" prop="certificatesNum" class="setWidth">
                    <Input v-model="setManager.certificatesNum" placeholder=""/>
                </FormItem>
                <FormItem label="证书类型：" prop="certificatesType" class="setWidth">
                    <Input v-model="setManager.certificatesType" placeholder=""/>
                </FormItem>
                <p class="clear"></p>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import {deleteDistrict, getStations, addStation, updateDistrict, deleteStation, updateStation} from "../api/commonAPI";
    export default {
        data:function(){
            return{ 
                //  模态框显示状态
                modal: {
                    addStation: false,
                    updateDistrict: false,
                    setUserManager: false,
                },   
                editStation: false,
                stations: [],               //  站点
                stationObj: {
                    districtId: null,
                    stationName: ''
                },
                managerName:'',
                blockSpanList:[],
                addStationName:'',
                editStationName: '',
                districtName:'',
                setManager:{
                    cardNum:'',
                    peopleNum:'',
                    name:'',
                    stationArea:'',
                    post:'',
                    manager:'',
                    phoneNum:'',
                    sexuality:'',
                    birthday:'',
                    idCard:'',
                    entryTime:'',
                    maritalStatus:'',
                    birthStatus:'',
                    education:'',
                    politicalStatus:'',
                    enterPartyTime:'',
                    address:'',
                    certificatesNum:'',
                    certificatesType:''
                },
                ruleValidate:{
                    name:[{
                         required:true,message:'姓名不能为空'
                    }],
                    post:[{
                        required:true,message:'岗位不能为空'
                    }],
                    phxoneNum:[{
                        required:true,message:'手机号不能为空'
                    }],
                    sexuality:[{
                        required:true,message:'性别不能为空'
                    }],
                    birthday:[{
                        required:true,message:'生日不能为空'
                    }],
                    idCard:[{
                        required:true,message:'身份证不能为空'
                    }],
                    entryTime:[{
                        required:true,message:'入职时间不能为空'
                    }],
                    maritalStatus:[{
                        required:true,message:'婚否不能为空'
                    }],
                    birthStatus:[{
                        required:true,message:'生育不能为空'
                    }],
                    education:[{
                        required:true,message:'学历不能为空'
                    }],
                    politicalStatus:[{
                        required:true,message:'政治面貌不能为空'
                    }],
                    address:[{
                        required:true,message:'住址不能为空'
                    }]
                }
            }
        },
        props:['title', 'districtId'],
        created: function () {
            this.getStations(this.districtId);
        },
        methods:{
            //  修改站区名称
            beforeUpdateDistrice: function () {
                this.districtName = this.title;
                this.modal.updateDistrict = true;
            },
            updateDistrict: async function(){
                let name = this.districtName;
                if(name === ''){
                    this.$Message.warning('站区名称不能为空');
                    return;
                }
                let id = this.districtId;
                let data = {
                    districtName: name,
                    content: ''
                }
                let response = await updateDistrict(id, data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.modal.updateDistrict = false;
                    this.$Message.success(message);
                    this.title = this.districtName;
                    return;
                }
                this.$Message.error(message);
            },
            //  删除站区
            beforeDeleteDistrict: function () {
                this.$Modal.confirm({
                    content: '<p>确定删除该站区吗？</p>',
                    onOk: () => {
                        this.deleteDistrict(this.districtId);
                    }
                });
            },
            deleteDistrict: async function(id) {
                let response = await deleteDistrict(id);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    this.$emit('deleteDistrict', response.data);
                    return;
                }
                this.$Message.error(message);
            },
            //  获取站点
            getStations: async function (id) {
                let response = await getStations(id);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.stations = response.data;
                    return;
                }
                this.$Message.error(message);
            },
            //  添加站点
            addStation: async function () {
                let name = this.addStationName;
                if(name === ''){
                    this.$Message.warning('站点名称不能为空');
                    return;
                }
                let data = {
                    districtId: this.districtId,
                    stationName: name
                }
                let response = await addStation(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    this.stations = response.data;
                    this.modal.addStation = false;
                    return;
                }
                this.$Message.error(message);                
            },
            //  删除站点
            beforeDeleteStation: function(id){
                this.$Modal.confirm({
                    content: '<p>确定删除该站点吗？</p>',
                    onOk: () => {
                        this.deleteStation(id);
                    }
                });
            },
            deleteStation: async function (id) {
                let response = await deleteStation(id);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    this.stations = response.data;
                    return;
                }
                this.$Message.error(message);
            },
            //  编辑站点
            beforeUpdateStation: function(name){
                this.editStationName = name;
                this.editStation = true;
            },
            updateStation: async function (id) {
                let name = this.editStationName;
                if(name === ''){
                    this.$Message.warning('站点名称不能为空');
                    return;
                }
                let data = {
                    districtId: this.districtId,
                    stationName: name
                }
                let response = await updateStation(id, data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    this.stations = response.data;
                } else {
                    this.$Message.error(message);
                }
                this.editStation = false;
            },
            //  设置管理员
            setUserManagerMethod: function(name){
                this.managerName=this.setManager.name
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功');
                        this.$refs[name].resetFields();
                        this.setUserManager=false;
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            //  取消设置
            cancelSet:function(name){
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>