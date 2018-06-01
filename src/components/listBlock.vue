<template>
    <div class="container">
        <div class="content-block">
            <div class="blockheader">
                <span class="listBlockSpan changeStationName">
                    {{title}}
                </span>
                <span class="listBlockSpan">
                    <label>管理员：{{name}}</label>
                </span>
                <div class="rgbutton">
                    <Dropdown>
                        <a>
                            <span class="white">操作</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem><a @click="renameStation = true">修改站区名称</a></DropdownItem>
                            <DropdownItem><a @click="setUserManager = true">设置管理员</a></DropdownItem>
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
                        <a class="icon-4 edit"></a>
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
        <Modal
               title="设置管理员"
               v-model="setUserManager"
                >
        </Modal>
    </div>
</template>
<script>
    export default {
        data:function(){
            return{
                renameStation:false,
                addStation:false,
                setUserManager:false,
                blockSpanList:["西直门"],
                addStationName:'',
                stationAreaName:''

            }
        },
        props:['title','name'],
        methods:{
            //删除站区
            removestation:function(){
                var e = e || window.event;
                var targetBlock = e.target || e.srcElement;
                console.log(targetBlock.parentNode.parentNode.parentNode.parentNode);
//                if (target.parentNode.tagName.toLowerCase() == "li") {
//                   target.parentNode.remove();
//                }
            },
            //添加站点
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
            //取消添加
            canselAdd:function(){
                $(".stationNameRed").css("display","none");
                this.addStationName='';
                $(".stationAreaNameRed").css("display","none");
                this.stationAreaName='';
            },
            //修改站区名称
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
            //删除站点
            removeLine:function(){
                var e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.parentNode.tagName.toLowerCase() == "li") {
                     target.parentNode.remove();
                }
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>