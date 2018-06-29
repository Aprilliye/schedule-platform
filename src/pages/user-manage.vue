<template>
    <div class="container">
        <form id="userForm">
            <div class="content-header">
                <div class="float-left">
                    <button class="btnDefault bgGreen mansgebutton" type="button" @click="addPersonModal = true">新增人员</button>
                    <a class="btnDefault" href="#" data-toggle="modal" data-target="#export">导入</a>
                    <a class="btnDefault">模板</a>
                </div>
                <div class=" float-right">
                    <div class="search-input float-left">
                        <span class="icon-5"></span>
                        <input type="text" placeholder="按员工卡号查询" name="roleName" v-model="fuzzyQueryModal">
                    </div>
                    <a class="btnDefault bgBlue queryBtn" @click="fuzzyQuery">查询</a>
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
                            <th width="80">是否备班</th>
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
                        <tr v-for="(item,index) in personList" :key='index' :id="index+'-'+item.id">
                            <td><a style="margin-right: 5px; color: #0000FF" @click="removeLine">删除</a><a style="color: #0000FF" @click="editPersonMethod">修改</a></td>
                            <td>{{item.employeeCard}}</td>
                            <td>{{item.userName}}</td>
                            <td>{{item.gender}}</td>
                            <td>{{item.phoneNumber}}</td>
                            <td>{{item.birthday}}</td>
                            <td>{{item.positionName}}</td>
                            <td>{{item.stationName}}</td>
                            <td>{{item.districtName}}</td>
                            <td>{{item.backup}}</td>
                            <td v-show="tableItem[0].ifShow">{{item.idCardNumber}}</td>
                            <td v-show="tableItem[1].ifShow">{{item.entryDate}}</td>
                            <td v-show="tableItem[2].ifShow">{{item.isMarried}}</td>
                            <td v-show="tableItem[3].ifShow">{{item.hasChild}}</td>
                            <td v-show="tableItem[4].ifShow">{{item.eduBackGround}}</td>
                            <td v-show="tableItem[5].ifShow">{{item.partyMember}}</td>
                            <td v-show="tableItem[6].ifShow">{{item.joinDate}}</td>
                            <td v-show="tableItem[7].ifShow">{{item.homeAddress}}</td>
                            <td v-show="tableItem[8].ifShow">{{item.certNo}}</td>
                            <td v-show="tableItem[9].ifShow">{{item.certLevel}}</td>
                            <td v-show="tableItem[10].ifShow">{{item.employeeCode}}</td>
                            <td v-show="tableItem[11].ifShow">{{item.xfzNo}}</td>
                            <td v-show="tableItem[12].ifShow">{{item.zwyNo}}</td>
                            <td v-show="tableItem[13].ifShow">{{item.zwyLevel}}</td>
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
                    <FormItem label="人员编码" prop="employeeCode" class="userModal">
                        <Input  v-model="addPerson.employeeCode"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop="userName" class="userModal">
                        <Input v-model="addPerson.userName"></Input>
                    </FormItem>
                     <FormItem label="站区" prop="district" class="userModal"  v-show="showDistrict">
                        <Select v-model="addPerson.district" @on-change="getAllStations">
                            <Option v-for="(item,index) in districts" :value="item.id+'-'+item.districtName" :key="index">{{item.districtName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="密码" prop="password" class="userModal">
                        <Input v-model="addPerson.password"></Input>
                        <span class="orange">请记录此密码作为下次登录用</span>
                    </FormItem>
                    <FormItem label="站点" prop="station" class="userModal">
                        <Select v-model="addPerson.station" @on-change="getAllPosts">
                             <Option v-for="(item,index) in stations " :value="item.id+'-'+item.stationName" :key="index">{{item.stationName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="角色" prop="plan" class="userModal">
                        <Select v-model="addPerson.plan">
                        <Option v-for="(item,index) in roles" :value="item.id+'-'+item.name" :key="index">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="岗位" prop="post" class="userModal">
                        <Select v-model="addPerson.post">
                            <Option v-for="(item,index) in position" :value="item.id+'-'+item.positionName" :key="index">{{item.positionName}}</Option>
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
                            <Option value="1">已婚</Option>
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
                    <FormItem label="是否为备班人员" prop="backup" class="userModal">
                        <Select  v-model ="addPerson.backup" placeholder="请选择">
                            <Option value = 1>是</Option>
                            <Option value = 0>否</Option>
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
                    <FormItem label="人员编码" prop="employeeCode" class="userModal">
                        <Input  v-model="editPerson.employeeCode"></Input>
                    </FormItem>
                    <FormItem label="姓名" prop="userName" class="userModal">
                        <Input v-model="editPerson.userName"></Input>
                    </FormItem>
                     <FormItem label="站区" prop="district" class="userModal" v-show="showDistrict">
                        <Select v-model="editPerson.district" @on-change="getAllStations">
                            <Option v-for="(item,index) in districts" :value="item.id+'-'+item.districtName" :key="index">{{item.districtName}}</Option>
                        </Select>
                    </FormItem>
                     <FormItem label="密码" prop="password" class="userModal">
                        <Input v-model="editPerson.password"></Input>
                        <span class="orange">请记录此密码作为下次登录用</span>
                    </FormItem>
                    <FormItem label="站点" prop="station" class="userModal">
                        <Select v-model="editPerson.station" @on-change="getAllPosts">
                             <Option v-for="(item,index) in stations " :value="item.id+'-'+item.stationName" :key="index">{{item.stationName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="岗位" prop="post" class="userModal">
                        <Select v-model="editPerson.post">
                            <Option v-for="(item,index) in position" :value="item.id+'-'+item.positionName" :key="index">{{item.positionName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="角色" prop="plan" class="userModal">
                        <Select v-model="editPerson.plan">
                            <Option v-for="(item,index) in roles" :value="item.id+'-'+item.name" :key="index">{{item.name}}</Option>
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
                            <Option value="1">已婚</Option>
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
                    <FormItem label="是否备班人员" prop="backup" class="userModal">
                        <Select  v-model ="editPerson.backup" placeholder="请选择">
                            <Option value = '1'>是</Option>
                            <Option value = '0'>否</Option>
                        </Select>
                    </FormItem>
                    <div class="clear"></div>
                </Form>
        </Modal>
    </div>
</template>
<script>
    import {getAllPost} from '@/api/api';
    import {stationAreaList, getStations, addUser, getRole, updateUser, getUser, deleteUser} from '@/api/commonAPI';
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
                // 角色列表
                roles:[],
                // 当前角色
                role:this.$store.get('role'),
                // 修改用户当前id
                EditId:null,
                fuzzyQueryModal:'',
                showDistrict:false,
                addPersonModal: false,
                editPersonModal: false,
                districtId: this.$store.get('districtId'),
                stationId: this.$store.get('stationId'),
                positionId: this.$store.get('positionId'),
                districtName: this.$store.get('districtName'),
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
                   employeeCode: [{required: true, message: '人员编码不能为空', trigger: 'blur' }],
                   userName: [{required: true, message: '姓名不能为空', trigger: 'blur' }],
                   post: [{required: true, message: '岗位不能为空', trigger: 'change' }],
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
                   entryDate: [{required: true, message: '入职时间不能为空', trigger: 'blur' }],
                   homeAddress: [{required: true, message: '住址不能为空', trigger: 'blur' }],
                   backup: [{required: true, message: '是否备班不能为空', trigger: 'change' }],
                   
                },
                personList:[
                    // {
                    //     userId:1,
                    //     action:['删除','修改'],
                    //     workNumber:60502868,
                    //     name:'梅松',
                    //     sex:'男',
                    //     phoneNumber:13810582556,
                    //     birthday:'1990-12-12',
                    //     post:'站区长',
                    //     station:'西直门',
                    //     stationArea:'西直门',
                    //     manager:'是',
                    //     idCard:'110108198212142712',
                    //     entryTime:'1990-12-12',
                    //     maritalStatus:'已婚',
                    //     childrenHave:'未育',
                    //     education:'高中以下',
                    //     political:'群众',
                    //     partyTime:'2008-05-01',
                    //     address:'北京市石景山区古城南路19号楼',
                    //     stationCertificateNumber:'1401061060501034',
                    //     stationCertificateLevel:'站务初级',
                    //     peopleCode:'5963265595466658',
                    //     fireCertificateNumber:'156598965236566',
                    //     controllerNumber:'1401061060501034',
                    //     controllerLevel:'站务初级'
                    // },
                    // {
                    //     userId:2,
                    //     action:['删除','修改'],
                    //     workNumber:60506796,
                    //     name:'伊坤',
                    //     sex:'男',
                    //     phoneNumber:13785663247,
                    //     birthday:'1992-10-6',
                    //     post:'站务员',
                    //     station:'西直门',
                    //     stationArea:'西直门',
                    //     manager:'否',
                    //     idCard:'110106199210060344',
                    //     entryTime:'1990-12-12',
                    //     maritalStatus:'已婚',
                    //     childrenHave:'未育',
                    //     education:'本科',
                    //     political:'共产党员',
                    //     partyTime:'2006-10-11',
                    //     address:'北京市丰台区花乡羊坊花园西院1',
                    //     stationCertificateNumber:'1701061060500643',
                    //     stationCertificateLevel:'站务初级',
                    //     peopleCode:'7852632594125789',
                    //     fireCertificateNumber:'1458962574123658',
                    //     controllerNumber:'1752695213699541',
                    //     controllerLevel:'站务初级'
                    // },
                    //  {
                    //     userId:3,
                    //     action:['删除','修改'],
                    //     workNumber:60508808,
                    //     name:'李璇',
                    //     sex:'女',
                    //     phoneNumber:13051679861,
                    //     birthday:'1994-02-12',
                    //     post:'站务员',
                    //     station:'西直门',
                    //     stationArea:'西直门',
                    //     manager:'否',
                    //     idCard:'110108199402123410',
                    //     entryTime:'2015-2-12',
                    //     maritalStatus:'未婚',
                    //     childrenHave:'未育',
                    //     education:'大专',
                    //     political:'共青团员',
                    //     partyTime:'2010-01-1',
                    //     address:'北京市丰台区青塔蔚园10号楼101',
                    //     stationCertificateNumber:'5269541236985423',
                    //     stationCertificateLevel:'站务初级',
                    //     peopleCode:'4152956325841256',
                    //     fireCertificateNumber:'5962354852695412',
                    //     controllerNumber:'5963258412596584',
                    //     controllerLevel:'站务初级'
                    // },
                    // {
                    //     userId:4,
                    //     action:['删除','修改'],
                    //     workNumber:60507613,
                    //     name:'黄旭',
                    //     sex:'男',
                    //     phoneNumber:13051679861,
                    //     birthday:'1994-02-12',
                    //     post:'站务员',
                    //     station:'西直门',
                    //     stationArea:'西直门',
                    //     manager:'否',
                    //     idCard:'131002199401282015',
                    //     entryTime:'2015-07-03',
                    //     maritalStatus:'未婚',
                    //     childrenHave:'未育',
                    //     education:'大专',
                    //     political:'共青团员',
                    //     partyTime:'2015-12-11',
                    //     address:'北京市西城区寿长街2号',
                    //     stationCertificateNumber:'5952362515895255',
                    //     stationCertificateLevel:'站务初级',
                    //     peopleCode:'985625412695459',
                    //     fireCertificateNumber:'595213695845258',
                    //     controllerNumber:'596235158745953',
                    //     controllerLevel:'站务初级'
                    // },
                    //    {
                    //     userId:5,
                    //     action:['删除','修改'],
                    //     workNumber:60502986,
                    //     name:'薛婷婷',
                    //     sex:'女',
                    //     phoneNumber:13811580959,
                    //     birthday:'1990-05-07',
                    //     post:'站务员',
                    //     station:'西直门',
                    //     stationArea:'西直门',
                    //     manager:'否',
                    //     idCard:'110224199005073822',
                    //     entryTime:'1997-01-07',
                    //     maritalStatus:'未婚',
                    //     childrenHave:'未育',
                    //     education:'大专',
                    //     political:'共青团员',
                    //     partyTime:'2012-08-23',
                    //     address:'北京市大兴区安定镇杜庄屯十一条',
                    //     stationCertificateNumber:'5956321478952695',
                    //     stationCertificateLevel:'站务初级',
                    //     peopleCode:'5236598451259635',
                    //     fireCertificateNumber:'5963251489562359',
                    //     controllerNumber:'5956321584596325',
                    //     controllerLevel:'站务初级'
                    // },
                ],
                selectedItmes: [],
                addPerson: {
                    employeeCard: '',
                    employeeCode: '',
                    userName: '',
                    district: '',
                    station: '',
                    post: '',
                    manager: '',
                    password: '',
                    plan: '',
                    gender: '',
                    phoneNumber: '',
                    birthday: '',
                    idCardNumber: '',
                    entryDate: '',
                    isMarried: '',
                    hasChild: '',
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
                    employeeCode: '',
                    userName: '',
                    district: '',
                    station: '',
                    post: '',
                    manager: '',
                    password: '',
                    plan: '',
                    gender: '',
                    phoneNumber: '',
                    birthday: '',
                    idCardNumber: '',
                    entryDate: '',
                    isMarried: '',
                    hasChild: '',
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
            // 获取站区
            this.request();
            // 获取角色
            this.getRole();
            // 获取用户列表
            this.getUserList();
        },
        methods:{
            //  获取用户列表
            getUserList: async function () {
                let data = {
                   districtId: this.districtId,
                   stationId: this.stationId,
                   positionId: this.positionId
                }
                let response = await getUser(data);
                if (response.meta.code !== 0) {
                    this.$Loading.error();
                    this.$Message.error(response.meta.message);
                }else{
                    this.$Loading.finish();
                    this.personList = response.data;
                    for(let i=0;i<response.data.length;i++){
                        this.personList[i].gender = response.data[i].gender==="0" ? "女":"男";
                        this.personList[i].isMarried = response.data[i].isMarried==="0" ? "未婚":"已婚";
                        this.personList[i].hasChild = response.data[i].hasChild==="0" ? "未育":"已育";
                        this.personList[i].backup = response.data[i].backup=== 0 ? "否":"是";
                    }
                }
            },
            // 模糊查询
            fuzzyQuery: async function (){
                let data = {
                    districtId: this.districtId,
                    stationId: this.stationId,
                    positionId: this.positionId,
                    employeeCard: this.fuzzyQueryModal
                }
                let response = await getUser(data);
                if (response.meta.code !== 0) {
                    this.$Loading.error();
                    this.$Message.error(response.meta.message);
                }else{
                    this.$Loading.finish();
                    this.personList = response.data;
                }
                this.fuzzyQueryModal='';
            },
            //  获取站区/站点
            request: async function(){
                if(this.role === 1){
                    this.showDistrict = true;
                    let response = await stationAreaList();
                    if (response.meta.code !== 0) {
                        this.$Loading.error();
                        this.$Message.error(response.meta.message);
                    }else{
                        this.$Loading.finish();
                        this.districts = response.data;
                    }
                }else if(this.role === 2){
                    this.showDistrict = false;
                    let id = this.districtId;
                    let response = await getStations(id);
                    let message = response.meta.message;
                    if(response.meta.code === 0){
                        this.stations = response.data;
                        return;
                    }
                    this.$Message.error(message);
                    }
            },
            // 获取角色
            getRole: async function (){
                let response = await getRole();
                if (response.meta.code !== 0) {
                this.$Loading.error();
                this.$Message.error(response.meta.message);
                }else{
                this.$Loading.finish();
                this.roles = response.data;
                }
            },
              // 获取站点
             getAllStations: async function () {
                this.addPerson.station = '';
                this.editPerson.station = ''
                if (this.addPerson.district) {
                let currentDistrict = this.addPerson.district.split('-');
                let id = parseInt(currentDistrict[0]);
                let response = await getStations(id);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.stations = response.data;
                    return;
                }
                this.$Message.error(message);
                }else if(this.editPerson.district){
                let currentDistrict = this.editPerson.district.split('-');
                let id = parseInt(currentDistrict[0]);
                let response = await getStations(id);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.stations = response.data;
                    return;
                }
                this.$Message.error(message);
                }
            },
              //  获取所有岗位
            getAllPosts: async function () {
                this.addPerson.post = '';
                this.editPerson.post = '';
                if (this.addPerson.station) {
                    let stationCurrent = this.addPerson.station.split('-');
                    let id =parseInt(stationCurrent[0]);
                    let response = await getAllPost(id);
                    let message = response.meta.message;
                    if(response.meta.code === 0){
                        this.position = response.data;
                        return;
                    }
                    this.$Message.error(message);
                    }else if (this.editPerson.station){
                        let stationCurrent = this.editPerson.station.split('-');
                        let id =parseInt(stationCurrent[0]);
                        let response = await getAllPost(id);
                        let message = response.meta.message;
                        if(response.meta.code === 0){
                            this.position = response.data;
                            return;
                        }
                    }
            },
            //  删除一行
            removeLine: async function(){
                var e = e || window.event;
                var target = e.target || e.srcElement;
                var currentId=e.target.parentNode.parentNode.id.split("-");
                var id = parseInt(currentId[1]);
                let response = await deleteUser(id);
                if (response.meta.code !== 0) {
                    this.$Loading.error();
                    this.$Message.error(response.meta.message);
                }else{
                    this.$Loading.finish();
                    this.personList = response.data;
                    for(let i=0;i<response.data.length;i++){
                        this.personList[i].gender = response.data[i].gender==="0" ? "女":"男";
                        this.personList[i].isMarried = response.data[i].isMarried==="0" ? "未婚":"已婚";
                        this.personList[i].hasChild = response.data[i].hasChild==="0" ? "未育":"已育";
                        this.personList[i].backup = response.data[i].backup=== 0 ? "否":"是";
                    }
                    this.$Message.success("删除人员成功")
                } 
            },
             //编辑人员提交验证
            editPersonModalMethod: function(name){
                let that = this;
                  this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.editPersonModal = false;
                        this.$options.methods.beforeEditPersonModalMethod(that);
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('编辑人员失败');
                    }
                })
            },
            beforeEditPersonModalMethod: async function (that) {
                let currentDistrict = that.editPerson.district.split('-');
                let currentStation = that.editPerson.station.split('-');
                let currentPosition = that.editPerson.post.split('-');
                let currentRole = that.addPerson.plan.split('-');
                let data = {
                    id: that.EditId,
                    districtId: null,
                    districtName: '',
                    stationId: parseInt(currentStation[0]),
                    stationName: currentStation[1],
                    positionId: parseInt(currentPosition[0]),
                    positionName: currentPosition[1],
                    employeeCard: that.editPerson.employeeCard,
                    employeeCode: that.editPerson.employeeCode,
                    userName: that.editPerson.userName,
                    password: that.editPerson.password,
                    roleId: parseInt(currentRole[0]),
                    gender: that.editPerson.gender,
                    phoneNumber: that.editPerson.phoneNumber,
                    birthday: that.editPerson.birthday,
                    idCardNumber: that.editPerson.idCardNumber,
                    entryDate: that.editPerson.entryDate,
                    isMarried: that.editPerson.isMarried,
                    hasChild: that.editPerson.hasChild,
                    eduBackGround: that.editPerson.eduBackGround,
                    partyMember: that.editPerson.partyMember,
                    joinDate: that.editPerson.joinDate,
                    certNo: that.editPerson.certNo,
                    certLevel: that.editPerson.certLevel,
                    homeAddress: that.editPerson.homeAddress,
                    xfzNo: that.editPerson.xfzNo,
                    zwyNo: that.editPerson.zwyNo,
                    zwyLevel: that.editPerson.zwyLevel,
                    backup:that.addPerson.backup === '0' ? 0:1,
                }
                if(that.role === 2){
                    data.districtId = that.districtId;
                    data.districtName = that.districtName;
                }else if(that.role === 1){
                    data.districtId = parseInt(currentDistrict[0]);
                    data.districtName = currentDistrict[1];
                }
                let response = await updateUser(data);
                if (response.meta.code !== 0) {
                    that.$Loading.error();
                    that.$Message.error(response.meta.message);
                }else{
                    that.$Loading.finish();
                    that.personList = response.data;
                    for(let i=0;i<response.data.length;i++){
                    that.personList[i].gender = response.data[i].gender==="0" ? "女":"男";
                    that.personList[i].isMarried = response.data[i].isMarried==="0" ? "未婚":"已婚";
                    that.personList[i].hasChild = response.data[i].hasChild==="0" ? "未育":"已育";
                    that.personList[i].backup = response.data[i].backup=== 0 ? "否":"是";
                    }
                    that.$Message.success("修改人员成功")
                } 
            },
            // 编辑人员
            editPersonMethod:function (e) {
                var currentId=e.target.parentNode.parentNode.id.split("-");
                this.EditId = parseInt(currentId[1]);
                this.editPersonModal=true;
                var currentId=e.target.parentNode.parentNode.id.split("-");
                var id = parseInt(currentId[0]);
                let obj = this.personList[id]; 
                for(let key in obj){
                    this.editPerson[key] = obj[key];
                }
            },
            // 新增人员前进行验证
            beforeAddUser:function (name) {
                let that = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addPersonModal = false;
                        this.$options.methods.addUser(that);
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('新增人员失败');
                    }
                })
            },
            addUser: async function (that) {
                let currentDistrict = that.addPerson.district.split('-');
                let currentStation = that.addPerson.station.split('-');
                let currentPosition = that.addPerson.post.split('-');
                let currentRole = that.addPerson.plan.split('-');
                let data = {
                   // districtId: parseInt(currentDistrict[0]),
                   // districtName: currentDistrict[1],
                    stationId: parseInt(currentStation[0]),
                    stationName: currentStation[1],
                    positionId: parseInt(currentPosition[0]),
                    positionName: currentPosition[1],
                    employeeCard: that.addPerson.employeeCard,
                    employeeCode: that.addPerson.employeeCode,
                    userName: that.addPerson.userName,
                    password: that.addPerson.password,
                    roleId: parseInt(currentRole[0]),
                    gender: that.addPerson.gender,
                    phoneNumber: that.addPerson.phoneNumber,
                    birthday: that.addPerson.birthday,
                    idCardNumber: that.addPerson.idCardNumber,
                    entryDate: that.addPerson.entryDate,
                    isMarried: that.addPerson.isMarried,
                    hasChild: that.addPerson.hasChild,
                    eduBackGround: that.addPerson.eduBackGround,
                    partyMember: that.addPerson.partyMember,
                    joinDate: that.addPerson.joinDate,
                    certNo: that.addPerson.certNo,
                    certLevel: that.addPerson.certLevel,
                    homeAddress: that.addPerson.homeAddress,
                    xfzNo: that.addPerson.xfzNo,
                    zwyNo: that.addPerson.zwyNo,
                    zwyLevel: that.addPerson.zwyLevel,
                    backup:that.addPerson.backup === '0' ? 0:1,
                }
                if(that.role === 2){
                    data.districtId = that.districtId;
                    data.districtName = that.districtName;
                }else if(that.role === 1){
                    data.districtId = parseInt(currentDistrict[0]);
                    data.districtName = currentDistrict[1];
                }
                let response = await addUser(data);
                if (response.meta.code !== 0) {
                    that.$Loading.error();
                    that.$Message.error(response.meta.message);
                }else{
                    that.$Loading.finish();
                    that.personList = response.data;
                    for(let i=0;i<response.data.length;i++){
                    that.personList[i].gender = response.data[i].gender==="0" ? "女":"男";
                    that.personList[i].isMarried = response.data[i].isMarried==="0" ? "未婚":"已婚";
                    that.personList[i].hasChild = response.data[i].hasChild==="0" ? "未育":"已育";
                    that.personList[i].backup = response.data[i].backup=== 0 ? "否":"是";
                    }
                    that.$Message.success("新增人员成功");
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