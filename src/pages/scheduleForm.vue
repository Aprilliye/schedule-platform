<template>
    <div class="container" >
        <div class="page">
            <div class="content-header">
                <div>
                    <button class="btnDefault" :class="{'bgBlue': showTabItem }" @click="showTabItem=true,showTable=true">周表</button>
                    <button class="btnDefault" :class="{'bgBlue': !showTabItem }" @click="showTabItem=false,showTable=false">月表</button>
                    <div class="tabItem" v-show="showTabItem">
                        <span>时间段：</span>
                        <Select v-model="timeQuantum" style="width:200px">
                            <Option v-for="item in timeQuantumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <DatePicker :value="beginValue" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker> 至
                        <DatePicker :value="endValue" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                    </div>
                    <div class="tabItem" v-show="!showTabItem">
                        <span>时间段：</span>
                        <DatePicker type="month" placeholder="请选择时间" style="width: 200px"></DatePicker>
                    </div>
                </div>
                <div style="margin-top: 20px">
                    <span>站点：</span>
                    <Select v-model="station" style="width:200px">
                        <Option v-for="item in stationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <span>岗位：</span>
                    <Select v-model="post" style="width:200px">
                        <Option v-for="item in postList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="selectbutton">
                        <span class="icon-5" ></span>
                        <input type="text" placeholder="姓名/编号" style="border: 0">
                    </p>
                    <button type="button" class="btnDefault bgBlue">查询</button>
                    <button type="button" class="btnDefault">导出</button>
                    <button type="button" class="btnDefault">导出个人</button>
                </div>
            </div>
            <div class="panel-body">
                <div class="float-right" style="margin-top: 20px">
                    <a class="btnDefault bgGreen " ><span>切换颜色</span></a>
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
                            <th>6.1</th>
                            <th>6.2</th>
                            <th>6.3</th>
                            <th>6.4</th>
                            <th>6.5</th>
                            <th>6.6</th>
                            <th>6.7</th>
                            <th colspan="3">总计：7天</th>
                        </tr>
                        <tr>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>计划工时</th>
                            <th>实际工时</th>
                            <th>结余</th>
                        </tr>
                        <tr v-for="item in weekdata" :key="item.userId" :id="item.userId">
                            <td class="scheduleName" @mouseenter="showNameMessage" @mouseleave="hideNameMessage">{{item.userName}}</td>
                            <td>{{item.postName}}</td>
                            <!--周表点击事件-->
                            <td v-for="(list, index) in item.schedule" :key="'aa'+index" :id="list.id" @click="clickTd" @mouseenter="showMessage" @mouseleave="hideMessage">
                                {{list.name}}
                            </td>
                            <td>{{item.planWorkHour}}</td>
                            <td>{{item.actualWorkHour}}</td>
                            <td>{{item.balance}}</td>
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
                            <td class="scheduleName" @mouseenter="showNameMessageMonth" @mouseleave="hideNameMessage">{{item.userName}}</td>
                            <td>{{item.postName}}</td>
                            <td v-for="(list, index) in item.schedule" :id="list.id" :key="'bb'+index" @click="clickTd"  @mouseenter="showMessageMonth" @mouseleave="hideMessage">{{list.name}}</td>
                            <td>{{item.planWorkHour}}</td>
                            <td>{{item.actualWorkHour}}</td>
                            <td>{{item.balance}}</td>
                        </tr>
                    </table>
                </div>
                <!--假期悬浮框-->
                <div class="vocationDiv">
                    <div @click="editVocationModal">假期编辑</div>
                    <div @click="shiftChangeModal">班次变更</div>
                    <div @click="provisionalDispositionModal">临时安排</div>
                    <div @click="absenteeismModal">旷工缺勤</div>
                    <div @click="overtimeModal">加班补班</div>
                    <div @click="substituteModal">替班</div>
                    <div >调离</div>
                    <div @click="smallVocationModal">零星假</div>
                    <div @click="otherModal" >其它</div>
                    <div>撤销</div>
                </div>
                <!--个人信息悬浮框-->
                <div class="peopleMessage">
                    <span>电话</span><span>住址</span>
                    <span>{{datatr.phoneName}}</span><span>{{datatr.address}}</span>
                    <div class="clear"></div>
                </div>
                <!--请假信息悬浮框-->
                <div class="tdMessage">
                    <div v-for="item in datatd">
                        <hr>
                        <p>{{item.type}}</p>
                        <p>备注：{{item.remark}}</p>
                        <p>创建时间：{{item.setUpTime}}</p>
                        <p>创建人：{{item.setUpPerson}}</p>
                    </div>
                </div>
            </div>
            <!--假期编辑-->
            <Modal
                    v-model="modal.editVocation"
                    title="假期编辑"
                    @on-ok="editVocationMethod"
                    @on-cancel="">
                <Form :model="editVocationForm" :label-width="80">
                    <FormItem label="假期类型">
                        <Select v-model="editVocationForm.select">
                            <Option value="病假/病">病假/病</Option>
                            <Option value="事假/事">事假/事</Option>
                            <Option value="婚假/婚">婚假/婚</Option>
                            <Option value="丧假/丧">丧假/丧</Option>
                            <Option value="探亲假/探">探亲假/探</Option>
                            <Option value="生育津贴假/产1">生育津贴假/产1</Option>
                            <Option value="企业延长产假/产2">企业延长产假/产2</Option>
                            <Option value="男方陪产假/产陪">男方陪产假/产陪</Option>
                            <Option value="计生假/计">计生假/计</Option>
                            <Option value="工伤假/工">工伤假/工</Option>
                            <Option value="旷工假/旷">旷工假/旷</Option>
                            <Option value="搬家假/搬">搬家假/搬</Option>
                            <Option value="出差假/差">出差假/差</Option>
                            <Option value="迟到/迟">迟到/迟</Option>
                            <Option value="早退/早退">早退/早退</Option>
                            <Option value="调休/调">调休/调</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="假期时间">
                        <DatePicker v-model="editVocationForm.begin" type="date" placeholder="" style="width: 190px"></DatePicker>至
                        <DatePicker v-model="editVocationForm.finish" type="date" placeholder="" style="width: 190px" class="float-right"></DatePicker>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea v-model="editVocationForm.textarea" name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--班次变更-->
            <Modal
                    v-model="modal.shiftChange"
                    title="班次变更"
                    @on-ok="shiftChangeMethod"
                    @on-cancel=""
                    >
                <Form :model="shiftChangeForm" :label-width="80">
                    <FormItem label="班次">
                        <Select v-model="shiftChangeForm.select">
                            <Option value="西直门替班员">西直门替班员</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea v-model="shiftChangeForm.remark" name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--临时安排-->
            <Modal
                    v-model="modal.provisionalDisposition"
                    title="临时安排"
                    @on-ok="provisionalDispositionMethod"
                    @cancel=""
                    >
                <Form :model="provisionalDispositionForm" :label-width="100">
                    <FormItem label="临时安排类型">
                        <Select v-model="provisionalDispositionForm.select">
                            <Option value="培训">培训</Option>
                            <Option value="演练">演练</Option>
                            <Option value="会议">会议</Option>
                            <Option value="活动">活动</Option>
                            <Option value="考试">考试</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="额外占用工时">
                        <Select v-model="provisionalDispositionForm.selectTime">
                            <Option value="1">1小时</Option>
                            <Option value="2">2小时</Option>
                            <Option value="3">3小时</Option>
                            <Option value="4">4小时</Option>
                            <Option value="5">5小时</Option>
                            <Option value="6">6小时</Option>
                            <Option value="7">7小时</Option>
                            <Option value="8">8小时</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea v-model="provisionalDispositionForm.remark" name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--旷工缺勤-->
            <Modal
                    v-model="modal.absenteeism"
                    title="旷工缺勤"
                    @on-ok="absenteeismMethod"
                    @on-cancel=""
                    >
                <Form :model="absenteeismForm" :label-width="80">
                    <FormItem label="缺勤工时">
                        <Select v-model="absenteeismForm.selectTime">
                            <Option value="1">1小时</Option>
                            <Option value="2">2小时</Option>
                            <Option value="3">3小时</Option>
                            <Option value="4">4小时</Option>
                            <Option value="5">5小时</Option>
                            <Option value="6">6小时</Option>
                            <Option value="7">7小时</Option>
                            <Option value="8">8小时</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea  name="remark" class="vocationRemark"  v-model="absenteeismForm.remark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--补班加班-->
            <Modal
                    v-model="modal.overtime"
                    title="补班加班"
                    @on-ok="overtimeMethod"
                    @on-cancel=""
                    >
                <Form :model="overtimeForm" :label-width="80">
                    <FormItem label="加班工时">
                        <Select v-model="overtimeForm.selectTime">
                            <Option value="1">1小时</Option>
                            <Option value="2">2小时</Option>
                            <Option value="3">3小时</Option>
                            <Option value="4">4小时</Option>
                            <Option value="5">5小时</Option>
                            <Option value="6">6小时</Option>
                            <Option value="7">7小时</Option>
                            <Option value="8">8小时</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model="overtimeForm.remark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--替班-->
            <Modal
                    v-model="modal.substitute"
                    title="替班"
                    @on-ok="substituteMethod"
                    @on-cancel=""
                    >
                <Form :model="substituteForm" :label-width="80">
                    <FormItem label="站点">
                        <Select v-model="substituteForm.station">
                            <Option value="西直门">西直门</Option>
                            <Option value="车公庄">车公庄</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="替班人员">
                        <Select v-model="substituteForm.substitutePeople">
                            <Option value="工号：60508169 姓名：申毅">工号：60508169 姓名：申毅</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model="substituteForm.remark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--其它-->
            <Modal
                    v-model="modal.other"
                    title="其它"
                    @on-ok="otherMethod"
                    @on-cancel=""
                    >
                <Form :model="otherForm" :label-width="80">
                    <FormItem label="工时">
                        <Select v-model="otherForm.selectTime">
                            <Option value="1">1小时</Option>
                            <Option value="2">2小时</Option>
                            <Option value="3">3小时</Option>
                            <Option value="4">4小时</Option>
                            <Option value="5">5小时</Option>
                            <Option value="6">6小时</Option>
                            <Option value="7">7小时</Option>
                            <Option value="8">8小时</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model="otherForm.remark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--零星假-->
            <Modal
                    v-model="modal.smallVocation"
                    title="零星假"
                    @on-ok="smallVocationMethod"
                    @on-cancel=""
                    >
                <Form :model="smallVocationForm" :label-width="80">
                    <FormItem label="工时">
                        <Select v-model="smallVocationForm.selectTime">
                            <Option value="1">1小时</Option>
                            <Option value="2">2小时</Option>
                            <Option value="3">3小时</Option>
                            <Option value="4">4小时</Option>
                            <Option value="5">5小时</Option>
                            <Option value="6">6小时</Option>
                            <Option value="7">7小时</Option>
                            <Option value="8">8小时</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark" v-model="smallVocationForm.remark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--调离-->
            <Modal
                    v-model="modal.transfer"
                    title="调离"
                    >
                <Form :model="transferForm" :label-width="80">
                    <FormItem label="站点">
                        <Select v-model="transferForm.station">
                            <Option value="xizhimen">西直门</Option>
                            <Option value="chegongzhuang">车公庄</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="上岗人员">
                        <Select v-model="transferForm.transferPeople">
                            <Option value="1">工号：60508169 姓名：申毅</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea name="remark" class="vocationRemark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
        </div>

    </div>
</template>
<script>
    import {monthdata, weekdata} from '@/assets/data/scheduleAreaForm'
    export default {
        data: function() {
            return {
                weekdata: [],
                monthdate: [],
                beginValue:BeforeDate,
                endValue:afterWeekDate,
                showTable:true,
                showTabItem: true,
                currentTd:'',
                datatr:{},
                datatd:[],
                clicktr:'',
                clicktd:'',
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
                        value: "1",
                        label: "一周"
                    },
                    {
                        value: "2",
                        label: "两周"
                    }
                ],
                timeQuantum: "1",
                station: "",
                post: "",
                modal:{
                    editVocation:false,
                    shiftChange:false,
                    provisionalDisposition:false,
                    absenteeism:false,
                    overtime:false,
                    substitute:false,
                    transfer:false,
                    smallVocation:false,
                    other:false
                },
                editVocationForm:{
                    select:'',
                    begin:'',
                    finish:'',
                    textarea:''
                },
                shiftChangeForm:{
                    select:'',
                    remark:''
                },
                provisionalDispositionForm:{
                    select:'',
                    selectTime:'',
                    remark:''
                },
                absenteeismForm:{
                    selectTime:'',
                    remark:''
                },
                overtimeForm:{
                    selectTime:'',
                    remark:''
                },
                substituteForm:{
                    station:'',
                    substitutePeople:'',
                    remark:''
                },
                smallVocationForm:{
                    remark:'',
                    selectTime:''
                },
                otherForm:{
                    remark:'',
                    selectTime:''
                },
                transferForm:{
                    station:'',
                    substitutePeople:''
                },
                stationList: [
                    {
                        value: "1",
                        label: "西直门"
                    }
                ],
                postList: [
                    {
                        value: "1",
                        label: "替班员"
                    }
                ]
            };
        },
        created: function () {
            this.weekdata = weekdata;
            this.monthdata = monthdata;
            this.clickHide();
        },
        methods: {
            clickHide:function(){
                $(document).click(function(){
                    $(".vocationDiv").hide();
                });
            },
            clickTd:function(e){
                //每次点击确定点击行数列数
                var targettd = e.target.id;
                var targettr = e.target.parentNode.id;
                this.clicktr=targettr;
                this.clicktd=targettd;
                //取鼠标点击位置
               var totalWidth=$("#app").width()*1/8;
                var x=e.screenX-272-totalWidth;
                var y=e.screenY-185;
                $(".vocationDiv").css({
                    "top":y,
                    "left":x
                });
                $(".vocationDiv").css("display","block");
                var target = e.target || e.srcElement;
                this.currentTd=target;
                //防止点击自己弹框消失
                event.stopPropagation();
            },
            //周表人员信息显示
            showNameMessage:function(e){
                $(".peopleMessage").css("display","block");
                var target = e.target.parentNode.id;
                this.datatr= this.weekdata[target-1];
                var totalWidth=$("#app").width()*1/8;
                var x=e.screenX-272-totalWidth;
                var y=e.screenY-185;
                $(".peopleMessage").css({
                    "top":y,
                    "left":x
                });
            },
            //月表人员信息显示
            showNameMessageMonth:function(e){
                $(".peopleMessage").css("display","block");
                var target = e.target.parentNode.id;
                this.datatr= this.monthdata[target-1];
                var totalWidth=$("#app").width()*1/8;
                var x=e.screenX-272-totalWidth;
                var y=e.screenY-185;
                $(".peopleMessage").css({
                    "top":y,
                    "left":x
                });
            },
            hideNameMessage:function(){
                $(".peopleMessage").css("display","none");
            },
            //周表每天请假信息显示
            showMessage:function(e){
                var targettd = e.target.id;
                var targettr = e.target.parentNode.id;
                if(this.weekdata[targettr-1].schedule[targettd-1].messages){
                    $(".tdMessage").css("display","block");
                    var totalWidth=$("#app").width()*1/8;
                    var x=e.screenX-272-totalWidth;
                    var y=e.screenY-185;
                    $(".tdMessage").css({
                        "top":y,
                        "left":x
                    });
                    this.datatd= this.weekdata[targettr-1].schedule[targettd-1].messages;
                }
            },
            //月表每天请假信息显示
            showMessageMonth:function(e){
                var targettd = e.target.id;
                var targettr = e.target.parentNode.id;
                if(this.monthdata[targettr-1].schedule[targettd-1].messages){
                    $(".tdMessage").css("display","block");
                    this.datatd= this.monthdata[targettr-1].schedule[targettd-1].messages;
                    var totalWidth=$("#app").width()*1/8;
                    var x=e.screenX-272-totalWidth;
                    var y=e.screenY-185;
                    $(".tdMessage").css({
                        "top":y,
                        "left":x
                    });
                    this.datatd= this.weekdata[targettr-1].schedule[targettd-1].messages;
                }
            },
            hideMessage:function(){
                $(".tdMessage").css("display","none");
            },
            //假期编辑模态框出现去掉气泡提示框
            editVocationModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.editVocation=true;
            },
            //假期编辑模态框确定提交
            editVocationMethod:function(event){
                this.currentTd.className='yellow';
                var beginDay=this.editVocationForm.begin.toLocaleDateString();
                var endDay=this.editVocationForm.finish.toLocaleDateString();
                var message={};
                message.type='假期编辑:'+this.editVocationForm.select +' 时间'+beginDay+'至'+endDay ;
                message.remark=this.editVocationForm.textarea;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
                console.log(message.setUpperson);
                console.log(message.type);
                console.log(message.remark);
                console.log(message.setUpTime);


            },
            //班次变更模态框出现去掉气泡提示框
            shiftChangeModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.shiftChange=true;
            },
            //班次变更背景
            shiftChangeMethod:function(){
                this.currentTd.className='pink';
                var message={};
                message.type='班次变更为:'+this.shiftChangeForm.select ;
                message.remark=this.shiftChangeForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
            },
            //临时安排模态框出现去掉气泡提示框
            provisionalDispositionModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.provisionalDisposition=true;
            },
            //临时安排背景
            provisionalDispositionMethod:function(){
                this.currentTd.className='blue';
                var message={};
                message.type='临时安排:'+this.provisionalDispositionForm.select+'占用工时'+this.provisionalDispositionForm.selectTime;
                message.remark=this.provisionalDispositionForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
            },
            //旷工缺勤模态框出现去掉气泡提示框
            absenteeismModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.absenteeism=true;
            },
            //旷工缺勤背景
            absenteeismMethod:function(){
                this.currentTd.className='redBackground';
                var message={};
                message.type='旷工缺勤:'+this.absenteeismForm.selectTime+'小时';
                message.remark=this.absenteeismForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else {
                    this.weekdata[this.clicktr - 1].schedule[this.clicktd - 1].messages = [];
                    this.weekdata[this.clicktr - 1].schedule[this.clicktd - 1].messages[0] = message;
                }
            },
            //加班补班模态框出现去掉气泡提示框
            overtimeModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal. overtime=true;
            },
            //补班加班背景
            overtimeMethod:function(){
                this.currentTd.className='green';
                var message={};
                message.type='加班工时:'+this.overtimeForm.selectTime+'小时';
                message.remark=this.overtimeForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else {
                    this.weekdata[this.clicktr - 1].schedule[this.clicktd - 1].messages = [];
                    this.weekdata[this.clicktr - 1].schedule[this.clicktd - 1].messages[0] = message;
                }
            },
            //替班模态框出现去掉气泡提示框
            substituteModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.substitute=true;
            },
            //替班背景
            substituteMethod:function(){
                this.currentTd.className='darkGreen';

                var message={};
                message.type='站点:'+this.substituteForm.station+'替班人:'+this.substituteForm.substitutePeople;
                message.remark=this.substituteForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else {
                    this.weekdata[this.clicktr - 1].schedule[this.clicktd - 1].messages = [];
                    this.weekdata[this.clicktr - 1].schedule[this.clicktd - 1].messages[0] = message;
                }
            },
            //调离模态框出现去掉气泡提示框
            transferModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.transfer=true;
            },
            //零星假模态框
            smallVocationModal:function(){
                this.modal.smallVocation=true;
            },
            //零星假模态框提交
            smallVocationMethod:function(){
                this.currentTd.className='yellow';
                var message={};
                message.type='零星假 :'+this.smallVocationForm.selectTime+'小时' ;
                message.remark=this.smallVocationForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
            },
            //其它模态框
            otherModal:function(){
                this.modal.other=true;
            },
            otherMethod:function(){
                this.currentTd.className='green';
                var message={};
                message.type='其它 :'+this.otherForm.selectTime+'小时' ;
                message.remark=this.otherForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
            }
        }
    };
    //获取当前时间
    var myDate = new Date();
    function get(){
        var BeforeDate;
        var year = myDate.getFullYear();
        var month = myDate.getMonth()+1;
        var date = myDate.getDate();
        if(month<10){
            if(date<10){
                BeforeDate=year+'-0'+month+'-0'+date;
            }else{
                BeforeDate=year+'-0'+month+'-'+date;
            }
        }else{
            BeforeDate=year+'-'+month+'-'+date;
        }
        return BeforeDate;
    };
    //获取一周后时间
    function getAfterWeek(){
        var newDate;
        var AfterDate = new Date(myDate.getTime()+7*24*60*60*1000);
        var year = AfterDate.getFullYear();
        var month = AfterDate.getMonth()+1;
        var date = AfterDate.getDate();
        if(month<10){
            if(date<10){
                newDate=year+'-0'+month+'-0'+date;
            }else{
                newDate=year+'-0'+month+'-'+date;
            }
        }else{
            newDate=year+'-'+month+'-'+date;
        }
        return newDate;
    };
    var BeforeDate=get();
    var afterWeekDate=getAfterWeek();
</script>
<style scoped>
    @import "../assets/css/index.css";
</style>
