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
                        <input type="text" placeholder="" name="roleName">
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
                            <th width="80">站区</th>
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
                        <tr v-for="(item,index) in personList" :key='index' :id="item.userId">
                            <td><a style="margin-right: 5px; color: #0000FF" @click="removeLine">{{item.action[0]}}</a><a style="color: #0000FF" @click="editPersonMethod">{{item.action[1]}}</a></td>
                            <td>{{item.workNumber}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.sex}}</td>
                            <td>{{item.phoneNumber}}</td>
                            <td>{{item.birthday}}</td>
                            <td>{{item.post}}</td>
                            <td>{{item.station}}</td>
                            <td>{{item.stationArea}}</td>
                            <td>{{item.manager}}</td>
                            <td v-show="tableItem[0].ifShow">{{item.idCard}}</td>
                            <td v-show="tableItem[1].ifShow">{{item.entryTime}}</td>
                            <td v-show="tableItem[2].ifShow">{{item.maritalStatus}}</td>
                            <td v-show="tableItem[3].ifShow">{{item.childrenHave}}</td>
                            <td v-show="tableItem[4].ifShow">{{item.education}}</td>
                            <td v-show="tableItem[5].ifShow">{{item.political}}</td>
                            <td v-show="tableItem[6].ifShow">{{item.partyTime}}</td>
                            <td v-show="tableItem[7].ifShow">{{item.address}}</td>
                            <td v-show="tableItem[8].ifShow">{{item.stationCertificateNumber}}</td>
                            <td v-show="tableItem[9].ifShow">{{item.stationCertificateLevel}}</td>
                            <td v-show="tableItem[10].ifShow">{{item.peopleCode}}</td>
                            <td v-show="tableItem[11].ifShow">{{item.fireCertificateNumber}}</td>
                            <td v-show="tableItem[12].ifShow">{{item.controllerNumber}}</td>
                            <td v-show="tableItem[13].ifShow">{{item.controllerLevel}}</td>
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
                :loading="true"
                @on-ok="beforeAddUser('addPerson')"
                @on-cancel="beforeCancel('addPerson')"
                :mask-closable="false">
                <Form ref="addPerson" :model="addPerson" :label-width="120" :rules="rule">
                    <FormItem label="员工卡号" prop="employeeCard" class="userModal">
                        <Input v-model="addPerson.employeeCard"></Input>
                    </FormItem>
                    <FormItem label="人员编码" prop="peopleCode" class="userModal">
                        <Input  v-model="addPerson.peopleCode"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop="userName" class="userModal">
                        <Input v-model="addPerson.userName"></Input>
                    </FormItem>
                     <FormItem label="站区" prop="district" class="userModal" >
                        <Select v-model="addPerson.district" @on-change="getAllStations">
                            <Option v-for="(item,index) in districts" :value="item.id+'-'+item.districtName" :key="index">{{item.districtName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="岗位" prop="post" class="userModal">
                        <Select v-model="addPerson.post">
                            <Option v-for="(item,index) in position" :value="item.id+'-'+item.positionName" :key="index">{{item.positionName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="站点" prop="station" class="userModal">
                        <Select v-model="addPerson.station">
                             <Option v-for="(item,index) in stations " :value="item.id+'-'+item.stationName" :key="index">{{item.stationName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="管理员" prop="manager" class="userModal">
                        <Select v-model="addPerson.manager">
                            <Option value="0">否</Option>
                            <Option value="1">是</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="密码" prop="password" class="userModal">
                        <Input v-model="addPerson.password"></Input>
                        <span class="red">请记录此密码作为下次登录用</span>
                    </FormItem>
                    <FormItem label="权限方案" prop="plan" class="userModal">
                        <Select  v-model="addPerson.plan">
                        <Option value="超级管理员">超级管理员</Option>
                        <Option value="系统管理员">系统管理员</Option>
                        <Option value="管理员">管理员</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别" prop="gender" class="userModal">
                        <Select v-model="addPerson.gender">
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phoneNumber" class="userModal">
                        <Input v-model="addPerson.phoneNumber"></Input>
                    </FormItem>
                    <FormItem label="生日" prop="birthday" class="userModal">
                        <Input v-model="addPerson.birthday"></Input>
                    </FormItem>
                    <FormItem label="身份证" prop="idCardNumber" class="userModal">
                        <Input  v-model="addPerson.idCardNumber"></Input>
                    </FormItem>
                    <FormItem label="入职时间" prop="entryDate" class="userModal">
                        <Input placeholder="例2015-03-06" v-model="addPerson.entryDate"></Input>
                    </FormItem>
                    <FormItem label="婚否" prop="isMarried" class="userModal">
                        <Select  v-model="addPerson.isMarried">
                            <Option value="0">已婚</Option>
                            <Option value="0">未婚</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="生育" prop="hasChild" class="userModal">
                        <Select v-model="addPerson.hasChild">
                            <Option value="1">已育</Option>
                            <Option value="0">未育</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="学历" prop="eduBackGround" class="userModal">
                        <Select v-model="addPerson.eduBackGround">
                            <Option value="高中以下">高中以下</Option>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士以上">博士以上</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="政治面貌" prop="partyMember" class="userModal">
                        <Select v-model="addPerson.partyMember">
                            <Option value="群众">群众</Option>
                            <Option value="共青团员">共青团员</Option>
                            <Option value="共产党员">共产党员</Option>
                            <Option value="民主党派">民主党派</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="入党时间" prop="joinDate" class="userModal">
                        <Input  v-model="addPerson.joinDate"></Input>
                    </FormItem>
                    <FormItem label="站务员证书编号" prop="certNo" class="userModal">
                        <Input v-model="addPerson.certNo"></Input>
                    </FormItem>
                    <FormItem label="站务员证等级" prop="certLevel" class="userModal">
                        <Input v-model="addPerson.certLevel"></Input>
                    </FormItem>
                    <FormItem label="住址" prop="homeAddress" class="userModal">
                        <Input  v-model="addPerson.homeAddress"></Input>
                    </FormItem>
                    <FormItem label="消防证书编号" prop="xfzNo" class="userModal">
                        <Input  v-model="addPerson.xfzNo"></Input>
                    </FormItem>
                    <FormItem label="综控员证书编号" prop="zwyNo" class="userModal">
                        <Input v-model="addPerson.zwyNo"></Input>
                    </FormItem>
                    <FormItem label="综控员证书级别" prop="zwyLevel" class="userModal">
                        <Input v-model="addPerson.zwyLevel"></Input>
                    </FormItem>
                    <FormItem label="是否为补位人员" prop="backup" class="userModal">
                        <Select  v-model ="addPerson.backup" placeholder="请选择">
                            <Option value = "1">是</Option>
                            <Option value = "0">否</Option>
                        </Select>
                    </FormItem>
                    <div class="clear"></div>
                </Form>
        </Modal>
        <!--编辑人员-->
        <Modal class="usermanage-model"
               title="编辑人员"
               v-model="editPersonModal"
               width="800"
               @on-ok="editPersonModalMethod('editPerson')"
               @on-cancel="beforeCancel('editPerson')"
               :loading="true"
               :mask-closable="false">
            <Form ref="editPerson" :model="editPerson" :label-width="120" :rules="rule">
                    <FormItem label="员工卡号" prop="employeeCard" class="userModal">
                        <Input v-model="editPerson.employeeCard"></Input>
                    </FormItem>
                    <FormItem label="人员编码" prop="peopleCode" class="userModal">
                        <Input  v-model="editPerson.peopleCode"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop="userName" class="userModal">
                        <Input v-model="editPerson.userName"></Input>
                    </FormItem>
                     <FormItem label="站区" prop="district" class="userModal" >
                        <Select v-model="editPerson.district" @on-change="getAllStations">
                            <Option v-for="(item,index) in districts" :value="item.id+'-'+item.districtName" :key="index">{{item.districtName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="岗位" prop="post" class="userModal">
                        <Select v-model="editPerson.post">
                            <Option v-for="(item,index) in position" :value="item.id+'-'+item.positionName" :key="index">{{item.positionName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="站点" prop="station" class="userModal">
                        <Select v-model="editPerson.station">
                             <Option v-for="(item,index) in stations " :value="item.id+'-'+item.stationName" :key="index">{{item.stationName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="管理员" prop="manager" class="userModal">
                        <Select v-model="editPerson.manager">
                            <Option value="0">否</Option>
                            <Option value="1">是</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="密码" prop="password" class="userModal">
                        <Input v-model="editPerson.password"></Input>
                        <span class="red">请记录此密码作为下次登录用</span>
                    </FormItem>
                    <FormItem label="权限方案" prop="plan" class="userModal">
                        <Select  v-model="editPerson.plan">
                        <Option value="超级管理员">超级管理员</Option>
                        <Option value="系统管理员">系统管理员</Option>
                        <Option value="管理员">管理员</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别" prop="gender" class="userModal">
                        <Select v-model="editPerson.gender">
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="手机号" prop="phoneNumber" class="userModal">
                        <Input v-model="editPerson.phoneNumber"></Input>
                    </FormItem>
                    <FormItem label="生日" prop="birthday" class="userModal">
                        <Input v-model="editPerson.birthday"></Input>
                    </FormItem>
                    <FormItem label="身份证" prop="idCardNumber" class="userModal">
                        <Input  v-model="editPerson.idCardNumber"></Input>
                    </FormItem>
                    <FormItem label="入职时间" prop="entryDate" class="userModal">
                        <Input placeholder="例2015-03-06" v-model="editPerson.entryDate"></Input>
                    </FormItem>
                    <FormItem label="婚否" prop="isMarried" class="userModal">
                        <Select  v-model="editPerson.isMarried">
                            <Option value="0">已婚</Option>
                            <Option value="0">未婚</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="生育" prop="hasChild" class="userModal">
                        <Select v-model="editPerson.hasChild">
                            <Option value="1">已育</Option>
                            <Option value="0">未育</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="学历" prop="eduBackGround" class="userModal">
                        <Select v-model="editPerson.eduBackGround">
                            <Option value="高中以下">高中以下</Option>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士以上">博士以上</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="政治面貌" prop="partyMember" class="userModal">
                        <Select v-model="editPerson.partyMember">
                            <Option value="群众">群众</Option>
                            <Option value="共青团员">共青团员</Option>
                            <Option value="共产党员">共产党员</Option>
                            <Option value="民主党派">民主党派</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="入党时间" prop="joinDate" class="userModal">
                        <Input  v-model="editPerson.joinDate"></Input>
                    </FormItem>
                    <FormItem label="站务员证书编号" prop="certNo" class="userModal">
                        <Input v-model="editPerson.certNo"></Input>
                    </FormItem>
                    <FormItem label="站务员证等级" prop="certLevel" class="userModal">
                        <Input v-model="editPerson.certLevel"></Input>
                    </FormItem>
                    <FormItem label="住址" prop="homeAddress" class="userModal">
                        <Input  v-model="editPerson.homeAddress"></Input>
                    </FormItem>
                    <FormItem label="消防证书编号" prop="xfzNo" class="userModal">
                        <Input  v-model="editPerson.xfzNo"></Input>
                    </FormItem>
                    <FormItem label="综控员证书编号" prop="zwyNo" class="userModal">
                        <Input v-model="editPerson.zwyNo"></Input>
                    </FormItem>
                    <FormItem label="综控员证书级别" prop="zwyLevel" class="userModal">
                        <Input v-model="editPerson.zwyLevel"></Input>
                    </FormItem>
                    <FormItem label="是否为补位人员" prop="backup" class="userModal">
                        <Select  v-model ="editPerson.backup" placeholder="请选择">
                            <Option value = "1">是</Option>
                            <Option value = "0">否</Option>
                        </Select>
                    </FormItem>
                    <div class="clear"></div>
                </Form>
        </Modal>
    </div>
</template>
<script>
    import {getAllPost} from '@/api/api';
    import {stationAreaList, getStations, addUser} from '@/api/commonAPI';
    export default {
        data: function () {
            return {
                // 站区
                districts:[],
                // 岗位
                position:[],
                // 站点
                stations:[],
                // 当前站区
                currentDistrict:'',
                // 当前站点
                currentStation:'',
                // 当前岗位
                currentPosition:'',
                stationId: this.$store.get('stationId'),
                addPersonModal: false,
                editPersonModal: false,
                targetId:'',
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
                rule:{
                   employeeCard: [{required: true, message: '员工卡号不能为空', trigger: 'blur' }],
                   peopleCode: [{required: true, message: '人员编码不能为空', trigger: 'blur' }],
                   userName: [{required: true, message: '姓名不能为空', trigger: 'blur' }],
                   station: [{required: true, message: '站点不能为空', trigger: 'change' }],
                   district: [{required: true, message: '站区不能为空', trigger: 'change' }],
                   post: [{required: true, message: '岗位不能为空', trigger: 'change' }],
                   manager: [{required: true, message: '管理员不能为空', trigger: 'change' }],
                   password: [{required: true, message: '密码不能为空', trigger: 'blur' }],
                   plan: [{required: true, message: '权限方案不能为空', trigger: 'change' }],
                   gender: [{required: true, message: '性别不能为空', trigger: 'change' }],
                   phoneNumber: [{required: true, message: '手机号不能为空', trigger: 'blur' }],
                   birthday: [{required: true, message: '生日不能为空', trigger: 'blur' }],
                   idCardNumber: [{required: true, message: '身份证不能为空', trigger: 'blur' }],
                   isMarried: [{required: true, message: '婚否不能为空', trigger: 'change' }],
                   hasChild: [{required: true, message: '生育不能为空', trigger: 'change' }],
                   eduBackGround: [{required: true, message: '学历不能为空', trigger: 'change' }],
                   partyMember: [{required: true, message: '政治面貌不能为空', trigger: 'change' }],
                   joinDate: [{required: true, message: '入党时间不能为空', trigger: 'blur' }],
                   certNo: [{required: true, message: '站务员证书编号不能为空', trigger: 'blur' }],
                   certLevel: [{required: true, message: '站务员证等级不能为空', trigger: 'blur' }],
                   xfzNo: [{required: true, message: '消防证书编号不能为空', trigger: 'blur' }],
                   zwyNo: [{required: true, message: '综控员证书编号不能为空', trigger: 'blur' }],
                   zwyLevel: [{required: true, message: '综控员证书级别不能为空', trigger: 'blur' }],
                   entryDate: [{required: true, message: '入职时间不能为空', trigger: 'blur' }],
                   homeAddress: [{required: true, message: '住址不能为空', trigger: 'blur' }],
                   backup: [{required: true, message: '是否为补位人员不能为空', trigger: 'change' }],
                   
                },
                personList:[
                    {
                        userId:1,
                        action:['删除','修改'],
                        workNumber:60502868,
                        name:'梅松',
                        sex:'男',
                        phoneNumber:13810582556,
                        birthday:'1990-12-12',
                        post:'站区长',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'是',
                        idCard:'110108198212142712',
                        entryTime:'1990-12-12',
                        maritalStatus:'已婚',
                        childrenHave:'未育',
                        education:'高中以下',
                        political:'群众',
                        partyTime:'2008-05-01',
                        address:'北京市石景山区古城南路19号楼',
                        stationCertificateNumber:'1401061060501034',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'5963265595466658',
                        fireCertificateNumber:'156598965236566',
                        controllerNumber:'1401061060501034',
                        controllerLevel:'站务初级'
                    },
                    {
                        userId:2,
                        action:['删除','修改'],
                        workNumber:60506796,
                        name:'伊坤',
                        sex:'男',
                        phoneNumber:13785663247,
                        birthday:'1992-10-6',
                        post:'站务员',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'否',
                        idCard:'110106199210060344',
                        entryTime:'1990-12-12',
                        maritalStatus:'已婚',
                        childrenHave:'未育',
                        education:'本科',
                        political:'共产党员',
                        partyTime:'2006-10-11',
                        address:'北京市丰台区花乡羊坊花园西院1',
                        stationCertificateNumber:'1701061060500643',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'7852632594125789',
                        fireCertificateNumber:'1458962574123658',
                        controllerNumber:'1752695213699541',
                        controllerLevel:'站务初级'
                    },
                     {
                        userId:3,
                        action:['删除','修改'],
                        workNumber:60508808,
                        name:'李璇',
                        sex:'女',
                        phoneNumber:13051679861,
                        birthday:'1994-02-12',
                        post:'站务员',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'否',
                        idCard:'110108199402123410',
                        entryTime:'2015-2-12',
                        maritalStatus:'未婚',
                        childrenHave:'未育',
                        education:'大专',
                        political:'共青团员',
                        partyTime:'2010-01-1',
                        address:'北京市丰台区青塔蔚园10号楼101',
                        stationCertificateNumber:'5269541236985423',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'4152956325841256',
                        fireCertificateNumber:'5962354852695412',
                        controllerNumber:'5963258412596584',
                        controllerLevel:'站务初级'
                    },
                    {
                        userId:4,
                        action:['删除','修改'],
                        workNumber:60507613,
                        name:'黄旭',
                        sex:'男',
                        phoneNumber:13051679861,
                        birthday:'1994-02-12',
                        post:'站务员',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'否',
                        idCard:'131002199401282015',
                        entryTime:'2015-07-03',
                        maritalStatus:'未婚',
                        childrenHave:'未育',
                        education:'大专',
                        political:'共青团员',
                        partyTime:'2015-12-11',
                        address:'北京市西城区寿长街2号',
                        stationCertificateNumber:'5952362515895255',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'985625412695459',
                        fireCertificateNumber:'595213695845258',
                        controllerNumber:'596235158745953',
                        controllerLevel:'站务初级'
                    },
                       {
                        userId:5,
                        action:['删除','修改'],
                        workNumber:60502986,
                        name:'薛婷婷',
                        sex:'女',
                        phoneNumber:13811580959,
                        birthday:'1990-05-07',
                        post:'站务员',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'否',
                        idCard:'110224199005073822',
                        entryTime:'1997-01-07',
                        maritalStatus:'未婚',
                        childrenHave:'未育',
                        education:'大专',
                        political:'共青团员',
                        partyTime:'2012-08-23',
                        address:'北京市大兴区安定镇杜庄屯十一条',
                        stationCertificateNumber:'5956321478952695',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'5236598451259635',
                        fireCertificateNumber:'5963251489562359',
                        controllerNumber:'5956321584596325',
                        controllerLevel:'站务初级'
                    },
                ],
                selectedItmes: [],
                addPerson: {
                    employeeCard: '',
                    peopleCode: '',
                    userName: '',
                    district: '',
                    station: '',
                    post: '',
                    manager: '',
                    password: '',
                    plan: '',
                    gender: null,
                    phoneNumber: '',
                    birthday: '',
                    idCardNumber: '',
                    entryDate: '',
                    isMarried: null,
                    hasChild: null,
                    eduBackGround: '',
                    partyMember: '',
                    joinDate: '',
                    certNo: '',
                    certLevel: '',
                    homeAddress: '',
                    xfzNo: '',
                    zwyNo: '',
                    zwyLevel: '',
                    backup:null
                },
                editPerson: {
                    employeeCard: '',
                    peopleCode: '',
                    userName: '',
                    district: '',
                    station: '',
                    post: '',
                    manager: '',
                    password: '',
                    plan: '',
                    gender: null,
                    phoneNumber: '',
                    birthday: '',
                    idCardNumber: '',
                    entryDate: '',
                    isMarried: null,
                    hasChild: null,
                    eduBackGround: '',
                    partyMember: '',
                    joinDate: '',
                    certNo: '',
                    certLevel: '',
                    homeAddress: '',
                    xfzNo: '',
                    zwyNo: '',
                    zwyLevel: '',
                    backup:null
                }

            }
        },
        mounted: function () {
            //  获取岗位
            this.getAllPost();
            // 获取站区
            this.request();
        },
        methods:{
              //  获取站区
            request: async function(){
                let response = await stationAreaList();
                if (response.meta.code !== 0) {
                    this.$Loading.error();
                    this.$Message.error(response.meta.message);
                }else{
                    this.$Loading.finish();
                    this.districts = response.data;
                    console.log(this.districts);
                }
            },
              // 获取站点
             getAllStations: async function () {
                if (this.addPerson.district) {
                let currentDistrict = this.addPerson.district.split('-');
                let id = parseInt(currentDistrict[0]);
                let response = await getStations(id);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.stations = response.data;
                    console.log(response);
                    return;
                }
                this.$Message.error(message);
                }
            },
              //  获取所有岗位
            getAllPost: async function () {
                console.log(this.stationId);
                let response = await getAllPost(this.stationId);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.position = response.data;
                    console.log(response);
                    return;
                }
                this.$Message.error(message);
            },
            //  删除一行
            removeLine:function(){
                var e = e || window.event;
                var target = e.target || e.srcElement;
                target.parentNode.parentNode.remove();
            },
            //  编辑人员提交验证
            editPersonModalMethod:function(name){
                console.log(name);
                  this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('新增人员成功!');
                        this.addPersonModal = false;
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('新增人员失败');
                    }
                })
                // this.editPersonModal=true;
                // var id=e.target.parentNode.parentNode.id-1;
                // let obj = this.personList[id]; 
                // for(let key in obj){
                //     this.editPerson[key] = obj[key];
                // }
            },
            // 编辑人员
            editPersonMethod:function () {
                this.editPersonModal=true;
            },
            // 新增人员前进行验证
            beforeAddUser:function (name) {
                   this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('编辑人员成功!');
                        this.addPersonModal = false;
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('编辑人员失败');
                    }
                })
            },
            addUser: function (that) {
                let currentDistrict = this.addPerson.district;
                let currentStation = this.addPerson.station;
                let currentPosition = this.addPerson.post;
                let data = {
                    districtId: parseInt(currentDistrict[0]),
                    districtName: parseInt(currentDistrict[1]),
                    stationId: parseInt(currentStation[0]),
                    stationName: parseInt(currentStation[1]),
                    positionId: parseInt(currentPosition[0]),
                    positionName: parseInt(currentPosition[1]),
                    employeeCard: addPerson.employeeCard,
                    peopleCode: addPerson.peopleCode,
                    userName: addPerson.userName,
                    manager: addPerson.manager,
                    password: addPerson.password,
                    plan: addPerson.plan,
                    gender: addPerson.gender,
                    phoneNumber: addPerson.phoneNumber,
                    birthday: addPerson.birthday,
                    idCardNumber: addPerson.idCardNumber,
                    entryDate: addPerson.entryDate,
                    isMarried: ddPerson.isMarried,
                    hasChild: addPerson.hasChild,
                    eduBackGround: addPerson.eduBackGround,
                    partyMember: addPerson.partyMember,
                    joinDate: addPerson.joinDate,
                    certNo: addPerson.certNo,
                    certLevel: addPerson.certLevel,
                    homeAddress: addPerson.homeAddress,
                    xfzNo: addPerson.xfzNo,
                    zwyNo: addPerson.zwyNo,
                    zwyLevel: addPerson.zwyLevel,
                    backup:addPerson.backup
                }
            },
            // 取消提交清空验证信息
            beforeCancel:function (name){
                this.$refs[name].resetFields();
            }
        }
       
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>