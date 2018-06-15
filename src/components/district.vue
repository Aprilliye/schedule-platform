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
        <Modal v-model="showUserModal"
            id="usersModal"
            title="选择管理员" 
            width="600"
            @on-ok="selectUser"
            @on-cancel="cancel">
            <!-- <button type="button" class="btnDefault bgBlue" @click="handleCancel">重置</button> -->
            <div class="userList">
                <span  v-for="(item,index) in users" :key="index" @click="clickUser" :id="item.id">{{item.name}}</span>
            </div>
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
                users:[
                    {
                        id:1,
                        name:'李璇'
                    },
                     {
                        id:2,
                        name:'黄旭'
                    },
                     {
                        id:3,
                        name:'薛婷婷'
                    },
                     {
                        id:4,
                        name:'王宇'
                    },
                     {
                        id:5,
                        name:'刘琦'
                    },
                     {
                        id:6,
                        name:'周志强'
                    },
                     {
                        id:7,
                        name:'王静'
                    },
                     {
                        id:8,
                        name:'马圆'
                    },
                     {
                        id:9,
                        name:'王梦心'
                    },
                     {
                        id:10,
                        name:'康羽丰'
                    },
                       {
                        id:11,
                        name:'付文辉'
                    },
                     {
                        id:12,
                        name:'郭娜'
                    },
                ]
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
            // 设置管理员
            cancel: function () {
                $('.userList').find('.activeSpan').removeClass('activeSpan');
                this.currentId ='';
            },
            clickUser: function (e) {
                $('.userList').find('.activeSpan').removeClass('activeSpan');
                var id = e.target.id;
                e.target.className="activeSpan";
                this.currentId=id;
            },
            selectUser: function (name) {
                if (this.currentId !==''){
                    this.managerName=this.users[this.currentId-1].name;
                    this.$Message.success('设置成功');
                }else{
                    this.managerName='';
                    this.$Message.error('修改失败请选择管理员');
                }
                $('.userList').find('.activeSpan').removeClass('activeSpan');
                this.currentId ='';
            },
            // 取消设置
            cancelSet: function (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>