<template>
    <div class="container">
        <form id="userForm">
            <div class="content-header">
                <div class="float-left">
                    <button class="btnDefault bgGreen mansgebutton" type="button" @click="addPersonModal = true">新增人员</button>
                    <a class="btnDefault" href="#" data-toggle="modal" data-target="#export">导入</a>
                    <a class="btnDefault" href="javascript:void(0)" onclick="printUserTemplate()">模板</a>
                </div>
                <div class=" float-right">
                    <div class="search-input float-left">
                        <span class="icon-5"></span>
                        <input type="text" placeholder="姓名" name="roleName">
                    </div>
                    <a class="btnDefault bgBlue queryBtn" href="javascript:;" onclick="getTableData()">查询</a>
                </div>
                <div class="clear"></div>
            </div>
            <!-- 表格 start -->
            <div class="wrapper">
                <div class="choicebox">
                    <CheckboxGroup>
                        <Checkbox  v-for="(item,index) in tableItem" :key="index" :label="item.name" v-model="item.ifShow"></Checkbox>
                    </CheckboxGroup>
                    <!-- <table id="column-boxes" style="margin:20px auto">
                        <tr>
                            <td>身份证</td>
                            <td>入职时间</td>
                            <td>婚姻状况</td>
                            <td>有无子女</td>
                            <td>学历</td>
                            <td>政治面貌</td>
                            <td>入党时间</td>
                            <td>住址</td>
                            <td>证书编号</td>
                            <td>证书类别</td>
                            <td>人员编码</td>
                        </tr>
                        <tr>
                            <td>
                                <Checkbox v-model="single1" @on-change="checkcheckbox1"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single2" @on-change="checkcheckbox2"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single3" @on-change="checkcheckbox3"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single4" @on-change="checkcheckbox4"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single5" @on-change="checkcheckbox5"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single6" @on-change="checkcheckbox6"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single7" @on-change="checkcheckbox7"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single8" @on-change="checkcheckbox8"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single9" @on-change="checkcheckbox9"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single10" @on-change="checkcheckbox10"></Checkbox>
                            </td>
                            <td>
                                <Checkbox v-model="single11" @on-change="checkcheckbox11"></Checkbox>
                            </td>
                        </tr>
                    </table> -->
                </div>
                <div class="table">
                    <table id="userTable">
                        <thead>
                        <tr>
                            <th width="120">操作</th>
                            <th width="80">员工卡号</th>
                            <th width="80">姓名</th>
                            <th width="80">性别</th>
                            <th width="80">电话</th>
                            <th width="80">生日</th>
                            <th width="80">岗位</th>
                            <th width="80">站点</th>
                            <th width="80">管理员</th>
                            <th width="80" v-show="tableItem[0].ifShow">身份证</th>
                            <th width="120" v-show="tableItem[1].ifShow">入职时间</th>
                            <th width="80" v-show="tableItem[2].ifShow">婚姻状况</th>
                            <th width="80" v-show="tableItem[3].ifShow">有无子女</th>
                            <th width="80" v-show="tableItem[4].ifShow">学历</th>
                            <th width="80" v-show="tableItem[5].ifShow">政治面貌</th>
                            <th width="120" v-show="tableItem[6].ifShow">入党时间</th>
                            <th width="200" v-show="tableItem[7].ifShow">住址</th>
                            <th width="80" v-show="tableItem[8].ifShow">站务员证书编号</th>
                            <th width="80" v-show="tableItem[9].ifShow">站务员证书等级</th>
                            <th width="80" v-show="tableItem[10].ifShow">人员编码</th>
                            <th width="80" v-show="tableItem[11].ifShow">消防证书编号</th>
                            <th width="80" v-show="tableItem[12].ifShow">综控员证书编号</th>
                            <th width="80" v-show="tableItem[13].ifShow">综控员证书级别</th>
                        </tr>
                        </thead>
                        <tbody id="userDataTable">
                        <tr>
                            <td>11</td>
                            <td>2</td>
                            <td>3</td>
                            <td>33</td>
                            <td>44</td>
                            <td>55</td>
                            <td>66</td>
                            <td>77</td>
                            <td>88</td>
                            <td v-show="tableItem[0].ifShow">--</td>
                            <td v-show="tableItem[1].ifShow">--</td>
                            <td v-show="tableItem[2].ifShow">--</td>
                            <td v-show="tableItem[3].ifShow">--</td>
                            <td v-show="tableItem[4].ifShow">--</td>
                            <td v-show="tableItem[5].ifShow">--</td>
                            <td v-show="tableItem[6].ifShow">--</td>
                            <td v-show="tableItem[7].ifShow">--</td>
                            <td v-show="tableItem[8].ifShow">--</td>
                            <td v-show="tableItem[9].ifShow">--</td>
                            <td v-show="tableItem[10].ifShow">--</td>
                            <td v-show="tableItem[11].ifShow">--</td>
                            <td v-show="tableItem[12].ifShow">--</td>
                            <td v-show="tableItem[13].ifShow">--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 表格 end -->
        </form>
        <!--新增人员-->
        <Modal class="usermanage-model"
                title="新增人员"
                v-model="addPersonModal"
                width="800"
                :mask-closable="false">
                <ul class="form">
                    <li>
                        <label>员工卡号</label>
                        <input name="cardNum" type="text" v-model="addPerson.cardNum">
                    </li>
                    <li>
                        <label>人员编码</label>
                        <input name="code" type="text" v-model="addPerson.code">
                    </li>
                    <li class="require">
                        <label class="require">姓名</label>
                        <input name="name" type="text" v-model="addPerson.name">
                    </li>
                    <li>
                        <label>站区/站点</label>
                        <select name="station" class=" reset-input" v-model="addPerson.station">
                            <option value="">请选择</option>
                            <option value="$!group.groupCode">$!group.groupName</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">岗位</label>
                        <select name="postName" v-model="addPerson.post">
                            <option value="">请选择</option>
                            <option value="$!post.postCode">$!post.postName</option>
                        </select>
                    </li>
                    <li>
                        <label>管理员</label>
                        <select name="manager" v-model="addPerson.manager">
                            <option value="0" selected="selected">否</option>
                            <option value="1">是</option>
                        </select>
                    </li>
                    <li> 
                        <label class="red">密码</label>
                        <input type="text" name="password" v-model="addPerson.psw">
                        <span class="orange">请记录此密码作为下次登录用</span>
                    </li>
                    <li>
                        <label>权限方案</label>
                        <select name="plan" v-model="addPerson.plan">
                            <option value="">请选择</option>
                            <option value="$!role.roleId">$!role.roleName</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">性别</label>
                        <select name="sex" v-model="addPerson.sex">
                            <option value="">请选择</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">手机号</label>
                        <input name="phoneNumber" type="text" v-model="addPerson.phoneNumber">
                    </li>
                    <li class="require">
                        <label class="require" id="heightp">生日</label>
                        <input name="birthday" type="text" v-model="addPerson.birthday">
                    </li>
                    <li class="require">
                        <label class="require">身份证</label>
                        <input name="idCode" type="text" v-model="addPerson.idCode">
                    </li>
                    <li class="require">
                        <label class="require" id="heightpp">入职时间</label>
                        <input name="onBoardDate" type="text" placeholder="例2015-03-06" v-model="addPerson.onBoardDate">
                    </li>
                    <li class="require">
                        <label class="require">婚否</label>
                        <select name="isMarried" v-model="addPerson.isMarried">
                            <option value="">请选择</option>
                            <option value="已婚">已婚</option>
                            <option value="未婚">未婚</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">生育</label>
                        <select name="hasChild" v-model="addPerson.hasChild">
                            <option value="">请选择</option>
                            <option value="已育">已育</option>
                            <option value="未育">未育</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">学历</label>
                        <select name="eduBackGround" v-model="addPerson.eduBackGround">
                            <option value="">请选择</option>
                            <option value="高中以下">高中以下</option>
                            <option value="大专">大专</option>
                            <option value="本科">本科</option>
                            <option value="硕士">硕士</option>
                            <option value="博士以上">博士以上</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">政治面貌</label>
                        <select name="isPartyMember" v-model="addPerson.isPartyMember">
                            <option value="">请选择</option>
                            <option value="群众">群众</option>
                            <option value="共青团员">共青团员</option>
                            <option value="共产党员">共产党员</option>
                            <option value="民主党派">民主党派</option>
                        </select>
                    </li>
                    <li>
                        <label>入党时间</label>
                        <input name="joinDate" type="text" v-model="addPerson.joinDate">
                    </li>
                    <li>
                        <label class="require">站务员证书编号</label>
                        <input name="stationCertificateNum" type="text" v-model="addPerson.stationCertificateNum">
                    </li>
                    <li>
                        <label class="require">站务员证等级</label>
                        <input name="stationCertificateGrade" type="text" v-model="addPerson.stationCertificateGrade">
                    </li>
                    <li class="lang require">
                        <label class="require">住址</label>
                        <input name="address" type="text" v-model="addPerson.address">
                    </li>
                    <li>
                        <label class="require">消防证书编号</label>
                        <input name="fireControlCertificateNum" type="text" v-model="addPerson.fireControlCertificateNum">
                    </li>
                    <li>
                        <label class="require">综控员证书编号</label>
                        <input name="controllerCertificateNum" type="text" v-model="addPerson.controllerCertificateNum">
                    </li>
                    <li>
                        <label class="require">综控员证书级别</label>
                        <input name="controllerCertificateGrade" type="text" v-model="addPerson.controllerCertificateGrade">
                    </li>
                    <li class="clear"></li>
                </ul>
        </Modal>
    </div>
</template>
<script>
    export default {
        data:function () {
            return {
                addPersonModal: false,
                tableItem: [
                    {
                        name: '身份证',
                        ifShow: false
                    },
                    {
                        name: '入职时间',
                        ifShow: false
                    },
                    {
                        name: '婚姻状况',
                        ifShow: false
                    },
                    {
                        name: '有无子女',
                        ifShow: false
                    },
                    {
                        name: '学历',
                        ifShow: false
                    },
                    {
                        name: '政治面貌',
                        ifShow: false
                    },
                    {
                        name: '入党时间',
                        ifShow: false
                    },
                    {
                        name: '住址',
                        ifShow: false
                    },
                    {
                        name: '站务员证书编号',
                        ifShow: false
                    },
                    {
                        name: '站务员证书等级',
                        ifShow: false
                    },
                    {
                        name: '人员编码',
                        ifShow: false
                    },
                    {
                        name: '消防证书编号',
                        ifShow: false
                    },
                    {
                        name: '综控员证书编号',
                        ifShow: false
                    },
                    {
                        name: '综控员证书级别',
                        ifShow: false
                    },
                ],   
                selectedItmes: [],
                addPerson: {
                    cardNum: '',
                    code: '',
                    name: '',
                    station: '',
                    postName: '',
                    manager: '',
                    password: '',
                    plan: '',
                    sex: '',
                    phoneNumber: '',
                    birthday: '',
                    idCode: '',
                    onBoardDate: '',
                    isMarried: '',
                    hasChild: '',
                    eduBackGround: '',
                    isPartyMember: '',
                    joinDate: '',
                    stationCertificateNum: '',
                    stationCertificateGrade: '',
                    address: '',
                    fireControlCertificateNum: '',
                    controllerCertificateNum: '',
                    controllerCertificateGrade: ''
                }
                    
            }
        },
        methods:{
            handleSelected: function () {
                console.log(1111)
                console.log(this.selectedItmes)
            },
            checkcheckbox1:function(){
                if(this.single1){
                    $(".idcard").css("display","inline-block");
                }else{
                   $(".idcard").css("display","none");
                }
            },
            checkcheckbox2:function(){
                if(this.single2){
                    $(".entrytime").css("display","inline-block");
                }else{
                    $(".entrytime").css("display","none");
                }
            },
            checkcheckbox3:function(){
                if(this.single3){
                    $(".marriage").css("display","inline-block");
                }else{
                    $(".marriaged").css("display","none");
                }
            },
            checkcheckbox4:function(){
                if(this.single4){
                    $(".childhas").css("display","inline-block");
                }else{
                    $(".childhas").css("display","none");
                }
            },
            checkcheckbox5:function(){
                if(this.single5){
                    $(".education").css("display","inline-block");
                }else{
                    $(".education").css("display","none");
                }
            },
            checkcheckbox6:function(){
                if(this.single6){
                    $(".political").css("display","inline-block");
                }else{
                    $(".political").css("display","none");
                }
            },
            checkcheckbox7:function(){
                if(this.single7){
                    $(".partytime").css("display","inline-block");
                }else{
                    $(".partytime").css("display","none");
                }
            },
            checkcheckbox8:function(){
                if(this.single8){
                    $(".homeaddress").css("display","inline-block");
                }else{
                    $(".homeaddress").css("display","none");
                }
            },
            checkcheckbox9:function(){
                if(this.single9){
                    $(".certificatenumber").css("display","inline-block");
                }else{
                    $(".certificatenumber").css("display","none");
                }
            },
            checkcheckbox10:function(){
                if(this.single10){
                    $(".certificategrade").css("display","inline-block");
                }else{
                    $(".certificategrade").css("display","none");
                }
            },
            checkcheckbox11:function(){
                if(this.single11){
                    $(".crewcode").css("display","inline-block");
                }else{
                    $(".crewcode").css("display","none");
                }
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>