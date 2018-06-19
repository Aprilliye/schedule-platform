<template>
    <div class="container">
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
                            <DropdownItem><a @click="renameStation = true">修改站区名称</a></DropdownItem>
                            <DropdownItem><a @click="showUserModal = true">设置管理员</a></DropdownItem>
                            <DropdownItem><a @click="addStation = true">添加站点</a></DropdownItem>
                            <DropdownItem><a class="red" @click="removestation">删除站区</a></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="blockcontent">
                <ul class="blockul">
                    <li v-for="(item,index) in blockSpanList" :key="index">
                        <span class="blockspan" >{{item}}</span>
                        <a class="icon-1 delete" @click="removeLine"></a>
                        <a class="icon-4 edit" @click="editLine"></a>
                    </li>
                </ul>
            </div>
        </div>
        <!--修改站区弹框-->
        <Modal
                @on-ok="renameStationMethod"
                @on-cancel="canselAdd"
                :loading="true"
                title="修改站区名称"
                v-model="renameStation"
                >
            <p>
                站区名称
                <input  name="userCode" type="text" v-model="stationAreaName" >
                <span class="turnRed stationAreaNameRed">站区名称不能为空</span>
            </p>
        </Modal>
        <!--添加站点弹框-->
        <Modal
               @on-ok="addStationMethod"
               @on-cancel="canselAdd"
               :loading="true"
               title="添加站点"
               v-model="addStation"
                >
            <p>
                站点名称
                <input  name="userCode" type="text" v-model="addStationName" >
                <span class="turnRed stationNameRed">站点名称不能为空</span>
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
    export default {
        data:function(){
            return{
                renameStation:false,
                addStation:false,
                showUserModal:false,
                managerName:'',
                blockSpanList:[],
                addStationName:'',
                stationAreaName:'',
                currentId:'',
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
                ],
            }
        },
        props:['title'],
        methods:{
            // 删除站区
            removestation:function() {
                var e = e || window.event;
                var targetBlock = e.target || e.srcElement;
                targetBlock.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
            },
            // 添加站点
            addStationMethod:function(){
                if(this.addStationName){
                    this.blockSpanList.push(this.addStationName);
                    this.addStationName='';
                    $(".stationNameRed").css("display","none");
                    this.addStation=false;
                }else{
                    $(".stationNameRed").css("display","inline-block");
                    return false;
                }

            },
            // 取消添加
            canselAdd:function(){
                $(".stationNameRed").css("display","none");
                this.addStationName='';
                $(".stationAreaNameRed").css("display","none");
                this.stationAreaName='';
            },
            // 修改站区名称
            renameStationMethod:function(){
                if(this.stationAreaName){
                    $(".changeStationName").text(this.stationAreaName);
                    this.stationAreaName='';
                    $(".stationAreaNameRed").css("display","none");
                    this.renameStation=false;
                }else{
                    $(".stationAreaNameRed").css("display","inline-block");
                    return false;
                }
            },
            // 删除站点
            removeLine:function(){
                var e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.parentNode.tagName.toLowerCase() == "li") {
                     target.parentNode.remove();
                }
            },
           // 编辑站点
            editLine:function(){
                var e = e || window.event;
                var targetBlock = e.target || e.srcElement;
                var innerText=targetBlock.parentNode.firstChild.innerHTML;
                var check=$("#n").length;
                if(check<=0){
                    targetBlock.parentNode.firstChild.innerHTML ='<input type="text" id="n" value='+innerText+' />';
                    $("#n").blur(function(){
                        var value=$("#n").val();
                        targetBlock.parentNode.firstChild.innerHTML=value;
                    });
                }else{
                    return false
                }
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