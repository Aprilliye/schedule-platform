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
                        <DatePicker :value="beginValue" type="date" placeholder="请选择时间" style="width: 200px;"></DatePicker> 至
                        <DatePicker :value="endValue" type="date" placeholder="请选择时间" style="width: 200px;"></DatePicker>
                    </div>
                    <div class="tabItem" v-show="!showTabItem">
                        <span>时间段：</span>
                        <DatePicker type="month" placeholder="请选择时间" style="width: 200px"></DatePicker>
                    </div>
                </div>
                <div style="margin-top: 20px">
                    <span>站点：</span>
                    <Select v-model="station" style="width:200px" placeholder="西直门">
                        <Option v-for="item in stationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <span>岗位：</span>
                    <Select v-model="post" style="width:200px" placeholder="替班员">
                        <Option v-for="item in postList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="selectbutton">
                        <span class="icon-5" ></span>
                        <input type="text" placeholder="姓名/编号" style="border: 0">
                    </p>
                    <button type="button" class="btnDefault bgBlue">查询</button>
                    <button type="button" class="btnDefault">导出</button>
                    <button type="button" class="btnDefault">导出个人</button>
                    <button type="button" class="btnDefault" @click="modal.importAnnualLeave = true">导入年假</button>
                </div>
            </div>
            <div class="panel-body">
                <div class="float-right" style="margin-top: 20px">
                    <span><i class="colori" style="background-color: #fffc00;"></i>假期</span>
                    <span><i class="colori" style="background-color: #ff9191;"></i>班次变更</span>
                    <span><i class="colori" style="background-color: #3A6BCE;"></i>临时安排</span>
                    <span><i class="colori" style="background-color: #b10000;"></i>旷工缺勤</span>
                    <span><i class="colori" style="background-color: #00d537;"></i>补班加班</span>
                    <span><i class="colori" style="background-color: #008121;"></i>替班</span>
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
                            <td v-for="(list, index) in item.schedule" :key="'aa'+index" :id="list.id" @click="clickTd" @mouseenter="showMessage" @mouseleave="hideMessage":style="{'background-color':list.color}">
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
                    <div @click="annualLeaveModal">年假</div>
                    <div @click="editVocationModal">假期编辑</div>
                    <div @click="shiftChangeModal">班次变更</div>
                    <div @click="provisionalDispositionModal">临时安排</div>
                    <div @click="absenteeismModal">旷工缺勤</div>
                    <div @click="overtimeModal">加班补班</div>
                    <div @click="substituteModal">替班</div>
                    <div @click="transferModal">调离</div>
                    <div @click="smallVocationModal">零星假</div>
                    <div @click="otherModal" >其它</div>
                    <div @click="revoke">撤销</div>
                </div>
                <!--个人信息悬浮框-->
                <div class="peopleMessage">
                    <span>电话</span><span>住址</span>
                    <span>{{datatr.phoneName}}</span><span>{{datatr.address}}</span>
                    <div class="clear"></div>
                </div>
                <!--请假信息悬浮框-->
                <div class="tdMessage">
                    <div v-for="(item,index) in datatd" :key="'cc'+index">
                        <hr>
                        <p>{{item.type}}</p>
                        <p>备注：{{item.remark}}</p>
                        <p>创建时间：{{item.setUpTime}}</p>
                        <p>创建人：{{item.setUpPerson}}</p>
                    </div>
                </div>
            </div>
            <!-- 年假模态框 -->
               <Modal
                v-model="modal.annualLeave"
                title="年假"
                @on-ok="annualLeaveMethod">
                <Form :model="annualLeaveForm" :label-width="80">
                    <FormItem label="选择日期">
                        <DatePicker type="date" placeholder="请选择日期" style="width: 190px"  v-model="beginTime"></DatePicker><span> 至 </span>
                        <DatePicker type="date" placeholder="请选择日期" style="width: 190px"  v-model="endTime"></DatePicker>
                    </FormItem>
                    <FormItem label="替班人员">
                        <Select v-model="substituteForm.substitutePeople" style="width: 400px;">
                            <Option value="工号：60508169 姓名：申毅">工号：60508169 姓名：申毅</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="替班人">
                        <Select v-model="annualLeaveForm.substitutePeople">
                            <Option value="lishanshan">李珊珊</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注">
                        <textarea  name="remark" class="vocationRemark"  v-model="annualLeaveForm.remark"></textarea>
                    </FormItem>
                </Form>
            </Modal>
            <!--假期编辑-->
            <Modal
                    v-model="modal.editVocation"
                    title="假期编辑"
                    @on-ok="editVocationMethod">
                <Form :model="editVocationForm" :label-width="80">
                    <FormItem label="假期类型">
                        <Select v-model="editVocationForm.select"  style="width: 400px;">
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
                            <Option value="调休/调">调休/调</Option>
                        </Select>
                        <p class="balance red" v-show="editVocationForm.select === '病假/病'">你的病假剩余可用 {{editVocationForm.balanceNum}} 天</p>
                    </FormItem>
                    <FormItem label="替班人员">
                        <Select v-model="substituteForm.substitutePeople" style="width: 400px;">
                            <Option value="工号：60508169 姓名：申毅">工号：60508169 姓名：申毅</Option>
                        </Select>
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
                    @on-ok="shiftChangeMethod">
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
                    @on-ok="provisionalDispositionMethod">
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
                    @on-ok="absenteeismMethod">
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
                    @on-ok="overtimeMethod">
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
                @on-ok="substituteMethod">
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
                    @on-ok="otherMethod">
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
                    @on-ok="smallVocationMethod">
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
                    @on-ok="transferMothod">
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
            <!-- 导入年假 -->
            <Modal
                    v-model="modal.importAnnualLeave"
                    title="导入年假"
                    @on-ok="overtimeMethod">
                <Form :model="overtimeForm" :label-width="80">
                    <FormItem label="选择年份">
                        <DatePicker type="year" placeholder="选择年份"></DatePicker>
                    </FormItem>
                    <FormItem label="选择文件">
                        <Upload action="xxx">
                            <Button type="ghost" icon="ios-cloud-upload-outline" class="btnDefault">选择文件</Button>
                        </Upload>
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
                beginTime:'',
                endTime:'',
                endValue:afterWeekDate,
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
                    other:false,
                    annualLeave:false,
                    importAnnualLeave: false
                },
                annualLeaveForm:{
                    select:'',
                    textarea:'',
                    substitutePeople:''
                },
                editVocationForm:{
                    select:'',
                    textarea:'',
                    balanceNum: 3
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
                ],
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
            };
        },
        created: function () {
            this.weekdata = weekdata;
            this.monthdata = monthdata;
            this.clickHide();
        },
        methods: {
            clickHide:function(){
                $(document).click(function(e){
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
               var totalWidth=$(".container").width();
               var totalHeight=$(".container").height();
               var bodyWidth=$("body").width();
               var bodyHeight=$("body").height();
                var x=e.clientX;
                var y=e.clientY;
                $(".vocationDiv").css({
                    "top":y,
                    "left":x
                });
                $(".vocationDiv").css("display","block");
                var target = e.target || e.srcElement;
                this.currentTd=target;
                //取当前被点击的元素
                this.target=target;
                //防止点击自己弹框消失
                event.stopPropagation();
            },
               changeLastOneColor:function(targetHtml,targetInner){
                    if(targetInner===0){
                    targetHtml.style.backgroundColor="#DCDEE0";
                }else if (targetInner>0){
                    targetHtml.style.backgroundColor="#00d537";
                }else{
                    targetHtml.style.backgroundColor="#b10000";
                }
            },
            //周表人员信息显示
            showNameMessage:function(e){
                $(".peopleMessage").css("display","block");
                var target = e.target.parentNode.id;
                this.datatr= this.weekdata[target-1];
                var totalWidth=$("#app").width()*1/8;
                var x=e.clientX;
                var y=e.clientY+10;
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
                var x=e.clientX;
                var y=e.clientY+10;
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
                    var x=e.clientX;
                    var y=e.clientY+10;
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
                    var x=e.clientX;
                    var y=e.clientY+10;
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
            //年假编辑模态框出现
            annualLeaveModal:function(){
                this.modal.annualLeave=true;
            },
            //年假模态框确定提交
            annualLeaveMethod:function(){
                var beginTime=this.beginTime;
                var endTime=this.endTime;
                var beginDay=beginTime.getDate();
                var endDay=endTime.getDate();
                var differDay=endDay-beginDay+1;
                var totalDay=this.weekdata[this.clicktr-1].schedule.length;
                var leaveDay=differDay+parseInt(this.clicktd);
                var tdCurenet=parseInt(this.clicktd)-1;
                //数组拷贝
                var arr=this.weekdata[this.clicktr-1].schedule.slice(0);
                var objDeepCopy = function (source) {
                var sourceCopy = source instanceof Array ? [] : {};
                for (var item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
                }
                return sourceCopy;
                }
                var objCopy = objDeepCopy(arr);
                if(totalDay>=leaveDay){
                    for(var i=tdCurenet;i<tdCurenet+differDay;i++){
                        this.weekdata[this.clicktr-1].schedule[i].color="#fffc00";
                        this.weekdata[this.clicktr-1].schedule[i].annualLeaveCode=1;
                    }
                    if(tdCurenet!==0){
                        for(var d = 0;d < tdCurenet;d++){
                        objCopy[d].name='';
                        }
                    }
                    for(var t = differDay+tdCurenet;t <= totalDay-1;t++){
                        objCopy[t].name='';
                    }
                }else{
                    for(var i=tdCurenet;i<totalDay-tdCurenet;i++){
                        this.weekdata[this.clicktr-1].schedule[i].color="#fffc00";
                        this.weekdata[this.clicktr-1].schedule[i].annualLeaveCode=1;
                    }
                }
               
                //添加替班员
                this.substitutePeople.schedule=objCopy;
                this.weekdata[this.clicktr-1].substitutePeopleId=this.weekdata.length+1;
                this.substitutePeople.userId=this.weekdata.length+1;
                this.substitutePeople.planWorkHour=differDay*5;
                this.substitutePeople.actualWorkHour=differDay*5;
                this.weekdata.push(this.substitutePeople);
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour-10*differDay;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance-10*differDay;
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime-10*differDay;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                targetInner=this.weekdata[this.clicktr-1].balance;
                var message={};
                message.type='年假:'+differDay+"天  替班员：李珊珊" ;
                message.remark=this.editVocationForm.textarea;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
            },
            //假期编辑模态框出现去掉气泡提示框
            editVocationModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.editVocation=true;
            },
            //假期编辑模态框确定提交
            editVocationMethod:function(event){
                this.currentTd.style.backgroundColor='#fffc00';
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                if(this.editVocationForm.select==='年假'){
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour-5+8;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance-5+8;
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime-5+8;
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                }else{
                    this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour-10;
                    this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance-10;
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime-10;
                    this.$options.methods.changeLastOneColor(targetHtml,targetInner);;
                    targetInner=this.weekdata[this.clicktr-1].balance;
                }
                var message={};
                message.type='假期编辑:'+this.editVocationForm.select ;
                message.remark=this.editVocationForm.textarea;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
            },
            //班次变更模态框出现去掉气泡提示框
            shiftChangeModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.shiftChange=true;
            },
            //班次变更背景
            shiftChangeMethod:function(){
                this.currentTd.style.backgroundColor='#ff9191';
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
                this.currentTd.style.backgroundColor='#3A6BCE';
                var message={};
                message.type='临时安排:'+this.provisionalDispositionForm.select+'占用工时'+this.provisionalDispositionForm.selectTime+'小时';
                message.remark=this.provisionalDispositionForm.remark;
                message.setUpTime=new Date().toLocaleString();
                message.setUpPerson='admin';
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages){
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages.push(message);
                }else{
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                    this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages[0]=message;
                }
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                var differTime=parseInt(this.provisionalDispositionForm.selectTime);
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour+differTime;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance+differTime;
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime+differTime;
            },
            //旷工缺勤模态框出现去掉气泡提示框
            absenteeismModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.absenteeism=true;
            },
            //旷工缺勤背景
            absenteeismMethod:function(){
                this.currentTd.style.backgroundColor='#b10000';
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
                var differTime=parseInt(this.absenteeismForm.selectTime);
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour-differTime;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance-differTime;
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime-differTime;
            },
            //加班补班模态框出现去掉气泡提示框
            overtimeModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal. overtime=true;
            },
            //补班加班背景
            overtimeMethod:function(){
                this.currentTd.style.backgroundColor='#00d537';
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
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                var differTime=parseInt(this.overtimeForm.selectTime);
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour+differTime;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance+differTime;
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime+differTime;
            },
            //替班模态框出现去掉气泡提示框
            substituteModal:function(){
                $(".vocationDiv").css("display","none");
                this.modal.substitute=true;
            },
            //替班背景
            substituteMethod:function(){
                this.currentTd.style.backgroundColor='#008121';
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
            //调离模态框提交
            transferMothod:function(){
                //被调离位置清空
                var length=this.weekdata[this.clicktr-1].schedule.length-this.clicktd;
                this.weekdata[this.clicktr-1].planWorkHour=(this.clicktd-1)*5;
                this.weekdata[this.clicktr-1].actualWorkHour=(this.clicktd-1)*5;
                var arr=this.weekdata[this.clicktr-1].schedule.slice(0);
                var objDeepCopy = function (source) {
                var sourceCopy = source instanceof Array ? [] : {};
                for (var item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
                }
                return sourceCopy;
                }
                var objCopy = objDeepCopy(arr)
                for(var currentId=this.clicktd - 1;currentId<=this.clicktd - 1+length;currentId++){
                    objCopy[currentId].name=''
                }
                //上岗人员取值
                var str = objDeepCopy(this.weekdata[this.clicktr-1].schedule);
                var trLength=this.weekdata.length;
                var crrentTr=this.clicktr;
                for(var i=crrentTr;i<trLength;i++){
                     this.weekdata[i].userId=this.weekdata[i].userId+1;
                }
                var tdLength=this.weekdata[this.clicktr-1].schedule.length;
                var newary=str;
                if(this.clicktd-1!==0){
                    for(var i=0;i<this.clicktd-1;i++){
                      newary[i].name=''
                    }
                }
                var newUserId=parseInt(this.clicktr);
                var obj={
                userName:this.substitutePerson.userName,
                postName:this.substitutePerson.postName,
                userId:newUserId+1,
                phoneName:this.substitutePerson.phoneName,
                address:this.substitutePerson.address,
                planWorkHour:(tdLength-this.clicktd+1)*5,
                actualWorkHour:(tdLength-this.clicktd+1)*5,
                balance:0,
                schedule:[],
                };
                obj.schedule=newary;
                this.weekdata.splice(this.clicktr,0,obj);
                this.weekdata[this.clicktr-1].schedule=objCopy;
               },
            //零星假模态框
            smallVocationModal:function(){
                this.modal.smallVocation=true;
            },
            //零星假模态框提交
            smallVocationMethod:function(){
                this.currentTd.style.backgroundColor='#fffc00';
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
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                var differTime=parseInt(this.smallVocationForm.selectTime);
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour-differTime;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance-differTime;
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime-differTime;
            },
            //其它模态框
            otherModal:function(){
                this.modal.other=true;
            },
            //其它模态框提交
            otherMethod:function(){
                this.currentTd.style.backgroundColor='#00d537';
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
                var targetHtml =this.target.parentNode.lastChild;
                var targetInner;
                var differTime=parseInt(this.otherForm.selectTime);
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour+differTime;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance+differTime;
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime=this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime+differTime;
            },
            //撤销操作
            revoke:function(){
                  //计算每行实际工时和结余
                var targetHtml =this.target.parentNode.lastChild;  
                var targetInner;
                var calculationActualWorkHour=7*5;
                this.weekdata[this.clicktr-1].actualWorkHour=this.weekdata[this.clicktr-1].actualWorkHour-this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime;
                this.weekdata[this.clicktr-1].balance=this.weekdata[this.clicktr-1].balance-this.weekdata[this.clicktr-1].schedule[this.clicktd-1].changetime;
                this.weekdata[this.clicktr-1].schedule[this.clicktd-1].messages=[];
                this.target.style.backgroundColor="#DCDEE0";
                this.target.parentNode.lastChild.style.backgroundColor="#DCDEE0";
                targetInner=this.weekdata[this.clicktr-1].balance;
                this.$options.methods.changeLastOneColor(targetHtml,targetInner);
                if(this.weekdata[this.clicktr-1].schedule[this.clicktd-1].annualLeaveCode===1){
                    var id=this.weekdata[this.clicktr-1].substitutePeopleId;
                    this.weekdata.splice(id-1);
                    for (var i=0;i<this.weekdata[this.clicktr-1].schedule.length;i++){
                        this.weekdata[this.clicktr-1].schedule[this.clicktd-1].annualLeaveCode=0;
                        this.weekdata[this.clicktr-1].schedule[i].color='';
                    }
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
