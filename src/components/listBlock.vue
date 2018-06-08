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
        <Modal
               title="设置管理员"
               v-model="setUserManager"
               width="800px"
               :loading="true"
               @on-ok="setUserManagerMethod('setManager')"
               @on-cancel="cancelSet('setManager')"
                >
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
    export default {
        data:function(){
            return{
                renameStation:false,
                addStation:false,
                setUserManager:false,
                managerName:'',
                blockSpanList:[],
                addStationName:'',
                stationAreaName:'',
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
        props:['title'],
        methods:{
            //删除站区
            removestation:function() {
                var e = e || window.event;
                var targetBlock = e.target || e.srcElement;
                targetBlock.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
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
            },
//            编辑站点
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
            //设置管理员
            setUserManagerMethod:function(name){
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
            //取消设置
            cancelSet:function(name){
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>