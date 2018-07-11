<template>
    <div class="container" >
        <div class="page">
            <div class="content-header">
                <div>
                    <button class="btnDefault" :class="{'bgBlue': showTabItem }" @click="showTabItem=true,showTable=true">周表</button>
                    <button class="btnDefault" :class="{'bgBlue': !showTabItem }" @click="showTabItem=false,showTable=false">月表</button>
                    <div class="tabItem" v-show="showTabItem">
                        <span>时间段：</span>
                        <Select v-model="timeQuantum" style="width:200px" @on-change="changeForm">
                            <Option v-for="item in timeQuantumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <DatePicker v-model="startDateStr" type="date" placeholder="请选择时间" style="width: 200px" @on-change="changeDate('start')"></DatePicker> 至
                        <DatePicker v-model="endDateStr" type="date" placeholder="请选择时间" style="width: 200px" @on-change="changeDate('end')"></DatePicker>
                    </div>
                    <div class="tabItem" v-show="!showTabItem">
                        <span>时间段：</span>
                        <DatePicker type="month" placeholder="请选择时间" style="width: 200px"></DatePicker>
                    </div>
                </div>
                <div style="margin-top: 20px">
                    <span>站点：</span>
                    <Select v-model="station" style="width:200px" clearable>
                        <Option v-for="item in stationList" :value="item.id" :key="item.id">{{ item.stationName }}</Option>
                    </Select>
                    <span>岗位：</span>
                    <Select v-model="post" style="width:200px" clearable>
                        <Option v-for="item in postList" :value="item.id" :key="item.id">{{ item.positionName }}</Option>
                    </Select>
                    <p class="selectbutton">
                        <span class="icon-5" ></span>
                        <input type="text" v-model.trim="userName" placeholder="姓名/编号" style="border: 0">
                    </p>
                    <button type="button" class="btnDefault bgBlue" @click="getScheduleInfo">查询</button>
                    <button type="button" class="btnDefault">导出</button>
                    <button type="button" class="btnDefault">导出个人</button>
                </div>
            </div>
            <div class="panel-body">
                <div class="float-right" style="margin-top: 20px">
                    <span><i class="colori" style="background-color: #fffc00;"></i>假期</span>
                    <span><i class="colori" style="background-color: #ff9191"></i>班次变更</span>
                    <span><i class="colori" style="background-color: #3A6BCE"></i>临时安排</span>
                    <span><i class="colori" style="background-color: #b10000"></i>旷工缺勤</span>
                    <span><i class="colori" style="background-color: #00d537"></i>补班加班</span>
                    <span><i class="colori" style="background-color: #008121"></i>替班</span>
                </div>
                <div class="clear"></div>
                <div class="postformtable" v-show="showTable">
                    <!--周表-->
                    <table>
                        <tr>
                            <th rowspan="2">姓名</th>
                            <th rowspan="2">岗位</th>
                            <th v-for="(item, index) in dateArr" :key="'th-0-'+ index">{{item}}</th>
                            <th colspan="3">总计：{{timeQuantum}}天</th>
                        </tr>
                        <tr>
                            <th v-for="(item, index) in weekArr" :key="'th-1-'+ index">{{item}}</th>
                            <th>计划工时</th>
                            <th>实际工时</th>
                            <th>结余</th>
                        </tr>
                        <tr v-for="item in weekdata" :key="item.id">
                            <td  :id="item.id" class="scheduleName" @mouseover="showUserInfo(item)" @mouseout="showInfo=false">{{item.userName}}</td>
                            <td>{{item.positionName}}</td>
                            <!--周表点击事件-->
                            <td v-for="(item, index) in dateArr" :code="item" :key="'aa'+ index" @click="clickTd" ></td>
                            <td class="planWorkHour">0</td>
                            <td class="actualWorkHour">0</td>
                            <td class="balance">0</td>
                        </tr>
                    </table>
                </div>
                <div class="postformtable" v-show="!showTabItem">
                    <!--月表-->
                    <table class="monthTable">
                        <tr>
                            <th rowspan="2">姓名</th>
                            <th rowspan="2">岗位</th>
                            <th>6.1</th>
                            <th>6.2</th>
                            <th>6.3</th>
                            <th>6.4</th>
                            <th>6.5</th>
                            <th>6.6</th>
                            <th>6.7</th>
                            <th>6.8</th>
                            <th>6.9</th>
                            <th>6.10</th>
                            <th>6.11</th>
                            <th>6.12</th>
                            <th>6.13</th>
                            <th>6.14</th>
                            <th>6.15</th>
                            <th>6.16</th>
                            <th>6.17</th>
                            <th>6.18</th>
                            <th>6.19</th>
                            <th>6.20</th>
                            <th>6.21</th>
                            <th>6.22</th>
                            <th>6.23</th>
                            <th>6.24</th>
                            <th>6.25</th>
                            <th>6.26</th>
                            <th>6.27</th>
                            <th>6.28</th>
                            <th>6.29</th>
                            <th>6.30</th>
                            <th colspan="3">总计：30天</th>
                        </tr>
                        <tr>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>计划工时</th>
                            <th>实际工时</th>
                            <th>结余</th>
                        </tr>
                        <tr v-for="item in monthdata" :key="item.userId" :id="item.userId">
                            <td class="scheduleName" @mouseenter="showUserInfo(item)" @mouseleave="showInfo = false">{{item.userName}}</td>
                            <td>{{item.postName}}</td>
                            <td v-for="(list, index) in item.schedule" :id="list.id" :key="'bb'+index" @click="clickTd"></td>
                            <td>{{item.planWorkHour}}</td>
                            <td>{{item.actualWorkHour}}</td>
                            <td>{{item.balance}}</td>
                        </tr>
                    </table>
                </div>
                <!--假期悬浮框-->
                <div class="vocationDiv" v-show="showMenu">
                    <div @click="modal.annualLeave = true; leaveType = 1" code="1">年假</div>
                    <div @click="modal.editVocation = true; leaveType = 2" code="2">假期编辑</div>
                    <div @click="modal.shiftChange; leaveType = 3" code="3">班次变更</div>
                    <div @click="modal.provisionalDisposition = true; leaveType = 4" code="4">临时安排</div>
                    <div @click="modal.absenteeism = true; leaveType = 5" code="5">旷工缺勤</div>
                    <div @click="modal.overtime = true; leaveType = 6" code="6">加班补班</div>
                    <div @click="modal.substitute; leaveType = 7" code="7">替班</div>
                    <div @click="modal.transfer = true; leaveType = 8" code="8">调离</div>
                    <div @click="modal.smallVocation = true; leaveType = 9" code="9">零星假</div>
                    <div @click="modal.other = true; leaveType = 10" code="10">其它</div>
                    <div code="11">撤销</div>
                </div>
                <!--个人信息悬浮框-->
                <div class="peopleMessage" v-show="showInfo">
                    <span>电话</span><span>住址</span>
                    <span>{{phoneNumber}}</span><span>{{homeAddress}}</span>
                    <div class="clear"></div>
                </div>
                <!--请假信息悬浮框-->
                <div class="tdMessage">
                    <div v-for="(item,index) in datatd" :key="'cc'+index">
                        <hr>
                        <p></p>
                        <p>备注：</p>
                        <p>创建时间：</p>
                        <p>创建人：</p>
                    </div>
                </div>
            </div>
            <!-- 年假模态框 -->
            <Modal
                v-model="modal.annualLeave"
                title="年假"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="年假天数">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="替班人">
                        <Select v-model="instead">
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{item.userName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea  name="remark" class="content"  v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--假期编辑-->
            <Modal
                v-model="modal.editVocation"
                title="假期编辑"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="假期类型">
                        <Select v-model="subType">
                            <Option value="1">病假/病</Option>
                            <Option value="2">事假/事</Option>
                            <Option value="3">婚假/婚</Option>
                            <Option value="4">丧假/丧</Option>
                            <Option value="5">探亲假/探</Option>
                            <Option value="6">生育津贴假/产1</Option>
                            <Option value="7">企业延长产假/产2</Option>
                            <Option value="8">男方陪产假/产陪</Option>
                            <Option value="9">计生假/计</Option>
                            <Option value="10">工伤假/工</Option>
                            <Option value="11">旷工假/旷</Option>
                            <Option value="12">搬家假/搬</Option>
                            <Option value="13">出差假/差</Option>
                            <Option value="14">调休/调</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="请假天数">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="替班人">
                        <Select v-model="instead">
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{item.userName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea v-model.trim="content" name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--班次变更-->
            <Modal
                v-model="modal.shiftChange"
                title="班次变更"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="班次">
                        <Select v-model="instead">
                            <Option value="西直门替班员">西直门替班员</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea v-model.trim="content" name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--临时安排-->
            <Modal
                v-model="modal.provisionalDisposition"
                title="临时安排"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="100">
                    <FormItem label="临时安排类型">
                        <Select>
                            <Option value="培训">培训</Option>
                            <Option value="演练">演练</Option>
                            <Option value="会议">会议</Option>
                            <Option value="活动">活动</Option>
                            <Option value="考试">考试</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="额外占用工时">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea v-model.trim="content" name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--旷工缺勤-->
            <Modal
                v-model="modal.absenteeism"
                title="旷工缺勤"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="缺勤工时">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea  name="remark" class="vocationRemark"  v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--补班加班-->
            <Modal
                v-model="modal.overtime"
                title="补班加班"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="加班工时">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--替班-->
            <Modal
                v-model="modal.substitute"
                title="替班"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="替班人员">
                        <Select v-model="instead">
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{item.userName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--其它-->
            <Modal
                v-model="modal.other"
                title="其它"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="工时">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--零星假-->
            <Modal
                v-model="modal.smallVocation"
                title="零星假"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="工时">
                        <i-input v-model.trim="leaveCount" :required="true" clearable></i-input>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--调离-->
            <Modal
                v-model="modal.transfer"
                title="调离"
                @on-ok="askForLeave"
                @on-cancel="cancel"
                :loading="true">
                <Form :label-width="80">
                    <FormItem label="上岗人员">
                        <Select v-model="instead">
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{item.userName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model.trim="content"></textarea>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>
<script>
    import {getScheduleInfo, getAllPost, askForLeave} from '@/api/api';
    import {getStations, getBackupUser} from '@/api/commonAPI';
    export default {
        data: function() {
            return {
                districtId: this.$store.get('districtId'),
                weekdata: [],
                monthdata: [],
                startDateStr: new Date(),
                endDateStr: null,
                beginTime:'',
                endTime:'',
                showTable:true,
                showTabItem: true,
                currentTd:'',
                datatr:{},
                datatd:[],
                clicktr:'',
                clicktd:'',
                target:'',
                targetModal:{
                    targetVocation:'',
                    targetShiftChange:'',
                    targetArrange:'',
                    targetAbsenteeism:'',
                    targetOvertime:'',
                    targetSubstitute:''
                },
                timeQuantumList: [
                    {
                        value: 7,
                        label: "一周"
                    },
                    {
                        value: 14,
                        label: "两周"
                    }
                ],
                timeQuantum: 7,
                station: null,
                post: null,
                userName: '',
                modal:{
                    editVocation:false,
                    shiftChange:false,
                    provisionalDisposition:false,
                    absenteeism:false,
                    overtime:false,
                    substitute:false,
                    transfer:false,
                    smallVocation:false,
                    other:false,
                    annualLeave:false,
                },
                stationList: [],
                postList: [],
                substitutePerson:   {
                    userName: '申毅',
                    postName: '站务员',
                    phoneName:"13873778520",
                    address:'北京市海淀区复兴路32号院',
                    planWorkHour:'46',
                    balance:'0',
                    actualWorkHour:'46'

                },
                substitutePeople:   {
                    userName: '李珊珊',
                    postName: '替班员',
                    phoneName:"13873778520",
                    address:'北京市门头沟区龙门新区B4-1号楼',
                    planWorkHour:'5',
                    balance:'0',
                    actualWorkHour:'5'
                },
                dateArr: [],
                weekArr: [],
                weekMap: new Map([
                    [0, '日'],
                    [1, '一'],
                    [2, '二'],
                    [3, '三'],
                    [4, '四'],
                    [5, '五'],
                    [6, '六'],
                ]),
                phoneNumber: '',
                homeAddress: '',
                showInfo: false,
                scheduleInfoId: null,
                leaveType: null,
                showMenu: false,
                subType: null,
                leaveCount: 0,
                content: '',
                userList: [],
                instead: null,
            };
        },
        created: function () {
            this.clickHide();
            this.getStations();
            this.getAllPost();
            this.changeForm();
            this.getBackupUser();
            this.endDateStr = new Date(this.startDateStr.getTime() + 6*24*60*60*1000);
        },
        methods: {
            //  获取站点
            getStations: async function () {
                let response = await getStations(this.districtId);
                if(response.meta.code === 0){
                    this.stationList = response.data;
                    return;
                }
                this.$Message.error(response.meta.message);
            },
            //  获取岗位
            getAllPost: async function () {
                let response = await getAllPost(this.districtId);
                if(response.meta.code === 0){
                    this.postList = response.data;
                    return;
                }
                this.$Message.error(response.meta.message);
            },
            // 获取站务员
            getBackupUser: async function () {
                let response = await getBackupUser(this.districtId);
                console.log(response);
                if(response.meta.code === 0){
                    this.userList = response.data;
                    return;
                }
                this.$Message.error('站务员请求失败');
            },
            //  周表月表切换
            changeForm: function () {
                this.dateArr = [];
                this.weekArr = [];
                for(let i=0;i<this.timeQuantum;i++){
                    let date = new Date(this.startDateStr.getTime() + i*24*60*60*1000);
                    let weekDay = this.weekMap.get(date.getDay());
                    this.weekArr.push(weekDay);
                    this.dateArr.push(this.$conversion(date).substring(5));
                }
            },
            //  获取排班计划
            getScheduleInfo: async function () {
                if(!this.startDateStr || !this.endDateStr){
                    this.$Message.warning('开始日期和结束日期不能为空');
                    return;
                }
                let startDateStr = this.$conversion(this.startDateStr);
                let endDateStr = this.$conversion(this.endDateStr);
                let data = {
                    startDateStr: startDateStr,
                    endDateStr: endDateStr
                };
                if(this.station){
                    data.stationId = this.station;
                }
                if(this.post){
                    data.positionId = this.post;
                }
                if(this.userName){
                    data.userName = this.userName;
                }
                let response = await getScheduleInfo(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    let data = response.data
                    this.weekdata = data;
                    this.$nextTick(function () {
                        for(let obj of data){
                            let list = obj.scheduleInfoList;
                            for(let schedule of list){
                                let date = schedule.dateStr.substring(5);
                                $('#'+obj.id).siblings().filter('[code="'+ date +'"]').html(schedule.dutyName).attr('id', schedule.id).attr('hours', schedule.workingHours);
                            }
                        }
                        $('.planWorkHour').each(function () {
                            let total = 0;
                            $(this).siblings('[hours]').each(function () {
                                total += parseInt($(this).attr('hours'));
                            })
                            $(this).html(total);
                        })
                    })
                    return;
                } 
                this.$Message.error(message);
            },
            //  选择日期
            changeDate: function (str) {
                if(str === 'start'){
                    this.endDateStr = new Date(this.startDateStr.getTime() + (this.timeQuantum-1)*24*60*60*1000);
                } else {
                    this.startDateStr = new Date(this.endDateStr.getTime() - (this.timeQuantum-1)*24*60*60*1000);
                }
            },
            //  请假
            askForLeave: async function () {
                let scheduleInfoId = this.scheduleInfoId;
                let leaveType = this.leaveType;
                if(!scheduleInfoId){
                    return;
                }
                if(leaveType !== 2 || leaveType !== 4){
                    this.subType = 1;
                }
                if(!this.subType){
                    let mes = '请选择请假类型';
                    if(leaveType === 4){
                        mes = '请选择临时安排类型';
                    }
                    this.$Message.warning(mes);
                    return;
                }
                let data = {
                    scheduleInfoId: scheduleInfoId,
                    leaveType: leaveType,
                    subType: this.subType,
                    leaveCount: parseInt(this.leaveCount),
                }
                let instead = this.instead;
                if(instead !== null){
                    data.instead = instead;
                }
                if(this.content){
                    data.content = this.content;
                }
                console.log(data)
                // instead
                let response = await askForLeave(data);
                console.log(response);
                
                this.scheduleInfoId = null;
                this.substring = null;
                this.subType = null;
                this.leaveCount = 0;
                this.content = '';
                this.instead = null;
            },
            clickHide:function(){
                let self = this;
                $(document).click(function(e){
                    self.showMenu = false;
                });
            },
            clickTd:function(e){
                let obj = $(e.target);
                let id = parseInt(obj.attr('id'));
                if(!id){
                    return;
                }
                let scrollTop = $(window).scrollTop();
                this.scheduleInfoId = id;
                let left = obj.offset().left + 15;
                let top = obj.offset().top - scrollTop + 40;
                $('.vocationDiv').css({'left': left + 'px', 'top': top + 'px'});                
                //防止点击自己弹框消失
                e.stopPropagation();
                this.showMenu = true;
            },
            //  显示站务员信息
            showUserInfo: function (item) {
                let obj = $(window.event.target);
                let scrollTop = $(window).scrollTop();
                let left = obj.offset().left + 100;
                let top = obj.offset().top - scrollTop + 30;
                
                $('.peopleMessage').css({'left': left + 'px', 'top': top + 'px'});

                this.phoneNumber = item.phoneNumber;
                this.homeAddress = item.homeAddress;
                this.showInfo = true;
            },
            //  模态框取消事件
            cancel: function () {
                this.scheduleInfoId = null;
                this.substring = null;
                this.subType = null;
                this.leaveCount = 0;
                this.content = '';
                this.instead = null;
            },
        }
    };
</script>
<style scoped>
    @import "../assets/css/index.css";
</style>
