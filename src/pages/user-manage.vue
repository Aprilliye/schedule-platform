<template>
    <div>
        <form id="userForm">
            <div class="content-header">
                <div class="float-left">
                    <button class="btnDefault bgGreen mansgebutton" type="button" @click="modal8 = true"><span>新增人员</span></button>
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
            <div class="wrapper" style="overflow: scroll;">
                <div class="choicebox">
                    <table id="column-boxes" style="margin:20px auto">
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
                    </table>
                </div>
                <table class="table" id="userTable">
                    <thead>
                    <tr>
                        <th>操作</th>
                        <th>员工卡号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>电话</th>
                        <th>生日</th>
                        <th>岗位</th>
                        <th>站点</th>
                        <th>管理员</th>
                        <th class="idcard float-left">身份证</th>
                        <th class="entrytime float-left">入职时间</th>
                        <th class="marriage float-left">婚姻状况</th>
                        <th class="childhas float-left">有无子女</th>
                        <th class="education float-left">学历</th>
                        <th class="political float-left">政治面貌</th>
                        <th class="partytime float-left">入党时间</th>
                        <th class="homeaddress float-left">住址</th>
                        <th class="certificatenumber float-left">站务员证书编号</th>
                        <th class="certificategrade float-left">站务员证书等级</th>
                        <th class="crewcode float-left">人员编码</th>
                        <th class="certificatenumber float-left">消防证书编号</th>
                        <th class="certificatenumber float-left">综控员证书编号</th>
                        <th class="certificategrade float-left">综控员证书级别</th>
                    </tr>
                    </thead>
                    <tbody id="userDataTable">
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>33</th>
                        <th>44</th>
                        <th>55</th>
                        <th>66</th>
                        <th>77</th>
                        <th>88</th>
                        <th class="idcard float-left">4</th>
                        <th class="entrytime float-left">5</th>
                        <th class="marriage float-left">6</th>
                        <th class="childhas float-left">7</th>
                        <th class="education float-left">8</th>
                        <th class="political float-left">9</th>
                        <th class="partytime float-left">0</th>
                        <th class="homeaddress float-left">22</th>
                        <th class="certificatenumber float-left">33</th>
                        <th class="certificategrade float-left">44</th>
                        <th class="crewcode float-left">55</th>
                        <th class="certificatenumber float-left">66</th>
                        <th class="certificatenumber float-left">77</th>
                        <th class="certificategrade float-left">88</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 表格 end -->
        </form>
        <!--新增人员-->
        <Modal class="usermanage-model"
                title="新增人员"
                v-model="modal8"
                :mask-closable="false">
            <p>
                <input id="editUserId" name="userId" type="hidden">
                <label>员工卡号</label>
                <input id="editUserCode" name="userCode" type="text">
            </p>
            <p>
                <label>人员编码</label>
                <input id="editStaffCode" name="staffCode" type="text">
            </p>
            <p>
                <label class="require">姓名</label>
                <input id="editUserName" name="userName" type="text">
            </p>
            <p>
                <label>站区/站点</label>
                <select name="station" id="editStation" class=" reset-input">
                    <option value="">请选择</option>
                    <option value="$!group.groupCode">$!group.groupName</option>
                </select>
            </p>
            <p>
                <label class="require">岗位</label>
                <select id="editUserJob" name="userJob">
                    <option value="">请选择</option>
                    <option value="$!post.postCode">$!post.postName</option>
                </select>
            </p>
            <p>
                <label>管理员</label>
                <select id="editIsAdmin" name="isAdmin" onchange="selectAdmin(this.options[this.options.selectedIndex].value)">
                    <option value="0" selected="selected">否</option>
                    <option value="1">是</option>
                </select>
            </p>
            <p>
                <label class="red">密码</label>
                <input type="text" id="editPassword" name="password">
                <span class="orange">请记录此密码作为下次登录用</span>
            </p>
            <p>
                <label>权限方案</label>
                <select id="editRoleIds" name="roleIds">
                    <option value="">请选择</option>
                    <option value="$!role.roleId">$!role.roleName</option>
                </select>
            </p>
            <p>
                <label class="require">性别</label>
                <select id="editGender" name="gender">
                    <option value="">请选择</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </p>
            <p>
                <label class="require">手机号</label>
                <input id="editPhoneNumber" name="phoneNumber" type="text">
            </p>
            <p class="managep">
                <label class="require"id="heightp">生日 例:1990-12-12</label>
                <input id="editBirthday" name="birthday" type="text">
            </p>
            <p>
                <label class="require">身份证</label>
                <input id="editIdCode" name="idCode" type="text">
            </p>
            <p class="managep">
                <label class="require" id="heightpp">入职时间 例:1990-12-12</label>
                <input id="editOnBoardDate" name="onBoardDate" type="text">
            </p>
            <p>
                <label class="require">婚否</label>
                <select id="editIsMarried" name="isMarried">
                    <option value="">请选择</option>
                    <option value="已婚">已婚</option>
                    <option value="未婚">未婚</option>
                </select>
            </p>
            <p>
                <label class="require">生育</label>
                <select id="editHasChild" name="hasChild">
                    <option value="">请选择</option>
                    <option value="已育">已育</option>
                    <option value="未育">未育</option>
                </select>
            </p>
            <p>
                <label class="require">学历</label>
                <select id="editEduBackGround" name="eduBackGround">
                    <option value="">请选择</option>
                    <option value="高中以下">高中以下</option>
                    <option value="大专">大专</option>
                    <option value="本科">本科</option>
                    <option value="硕士">硕士</option>
                    <option value="博士以上">博士以上</option>
                </select>
            </p>
            <p>
                <label class="require">政治面貌</label>
                <select id="editIsPartyMember" name="isPartyMember">
                    <option value="">请选择</option>
                    <option value="群众">群众</option>
                    <option value="共青团员">共青团员</option>
                    <option value="共产党员">共产党员</option>
                    <option value="民主党派">民主党派</option>
                </select>
            </p>
            <p>
                <label>入党时间</label>
                <input id="editJoinDate" name="joinDate" type="text">
            </p>
            <p>
                <label class="require">住址</label>
                <input id="editHomeAddress" name="homeAddress" type="text">
            </p>
            <p>
                <label>证书编号</label>
                <input id="editCertNo" name="certNo" type="text">
            </p>
            <p>
                <label>证书类型</label>
                <input id="editCertLevel" name="certLevel" type="text">
            </p>
        </Modal>
    </div>
</template>
<script>
    export default {
        data:function () {
            return {
                modal8: false,
                single1: false,
                single3: false,
                single4: false,
                single5: false,
                single2: false,
                single6: false,
                single7: false,
                single8: false,
                single9: false,
                single10: false,
                single11: false
            }
        },
        methods:{
            checkcheckbox1:function(){
                if(this.single1){
                    $(".idcard").css("display","block");
                }else{
                   $(".idcard").css("display","none");
                }
            },
            checkcheckbox2:function(){
                if(this.single2){
                    $(".entrytime").css("display","block");
                }else{
                    $(".entrytime").css("display","none");
                }
            },
            checkcheckbox3:function(){
                if(this.single3){
                    $(".marriage").css("display","block");
                }else{
                    $(".marriaged").css("display","none");
                }
            },
            checkcheckbox4:function(){
                if(this.single4){
                    $(".childhas").css("display","block");
                }else{
                    $(".childhas").css("display","none");
                }
            },
            checkcheckbox5:function(){
                if(this.single5){
                    $(".education").css("display","block");
                }else{
                    $(".education").css("display","none");
                }
            },
            checkcheckbox6:function(){
                if(this.single6){
                    $(".political").css("display","block");
                }else{
                    $(".political").css("display","none");
                }
            },
            checkcheckbox7:function(){
                if(this.single7){
                    $(".partytime").css("display","block");
                }else{
                    $(".partytime").css("display","none");
                }
            },
            checkcheckbox8:function(){
                if(this.single8){
                    $(".homeaddress").css("display","block");
                }else{
                    $(".homeaddress").css("display","none");
                }
            },
            checkcheckbox9:function(){
                if(this.single9){
                    $(".certificatenumber").css("display","block");
                }else{
                    $(".certificatenumber").css("display","none");
                }
            },
            checkcheckbox10:function(){
                if(this.single10){
                    $(".certificategrade").css("display","block");
                }else{
                    $(".certificategrade").css("display","none");
                }
            },
            checkcheckbox11:function(){
                if(this.single11){
                    $(".crewcode").css("display","block");
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