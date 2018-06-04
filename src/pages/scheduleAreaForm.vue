<template>
    <div class="container">
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
                <span>站区：</span>
                <Select v-model="stationArea" style="width:200px">
                    <Option v-for="item in stationAreaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
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
                <table>
                    <tr>
                        <th rowspan="2">姓名</th>
                        <th rowspan="2">岗位</th>
                        <th>5.29</th>
                        <th>5.30</th>
                        <th>5.31</th>
                        <th>6.1</th>
                        <th>6.2</th>
                        <th>6.3</th>
                        <th>6.4</th>
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
                    <tr v-for="item in weekdata" :key="item.userId">
                        <td>{{item.userName}}</td>
                        <td>{{item.postName}}</td>
                        <td v-for="(list, index) in item.schedule" :key="'aa'+index">
                            {{list.name}}
                        </td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                    <!--<tr><td>许迪萌</td><td>站务员</td><td>3I2</td><td>休</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>-->
                    <!--<tr><td>郭冬云</td><td>站务员</td><td>5I</td><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>-->
                    <!--<tr><td>那孟超</td><td>站务员</td><td>1H1</td><td>5I</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>-->
                    <!--<tr><td>王伟</td><td>站务员</td><td>2A1</td><td>1G</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>-->
                    <!--<tr><td>李珊珊</td><td>站务员</td><td>6</td><td>休</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>-->
                </table>
            </div>
            <div class="postformtable" v-show="!showTabItem">
              <table>
                <tr>
                  <th rowspan="2">姓名</th>
                  <th rowspan="2">岗位</th>
                  <th>5.1</th>
                  <th>5.2</th>
                  <th>5.3</th>
                  <th>5.4</th>
                  <th>5.5</th>
                  <th>5.6</th>
                  <th>5.7</th>
                  <th>5.8</th>
                  <th>5.9</th>
                  <th>5.10</th>
                  <th>5.11</th>
                  <th>5.12</th>
                  <th>5.13</th>
                  <th>5.14</th>
                  <th>5.15</th>
                  <th>5.16</th>
                  <th>5.17</th>
                  <th>5.18</th>
                  <th>5.19</th>
                  <th>5.20</th>
                  <th>5.21</th>
                  <th>5.22</th>
                  <th>5.23</th>
                  <th>5.24</th>
                  <th>5.25</th>
                  <th>5.26</th>
                  <th>5.27</th>
                  <th>5.28</th>
                  <th>5.29</th>
                  <th>5.30</th>
                  <th>5.31</th>
                  <th colspan="3">总计：31天</th>
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
                  <th>四</th>
                  <th>计划工时</th>
                  <th>实际工时</th>
                  <th>结余</th>
                </tr>
                <tr><td>许迪萌</td><td>站务员</td><td>3I2</td><td>休</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>郭冬云</td><td>站务员</td><td>5I</td><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>那孟超</td><td>站务员</td><td>1H1</td><td>5I</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>王伟</td><td>站务员</td><td>2A1</td><td>1G</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>李珊珊</td><td>站务员</td><td>6</td><td>休</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              </table>
            </div>
        </div>
        <!--假期编辑-->
        <Modal
                v-model="modal.editVocation"
                title="假期编辑"
                @on-ok=""
                @on-cancel="">
            <Form :model="editVocationForm" :label-width="80">
                <FormItem label="假期类型">
                    <Select v-model="editVocationForm.select">
                        <Option value="sickLeave">病假/病</Option>
                        <Option value="compassionateLeave">事假/事</Option>
                        <Option value="marryLeave">婚假/婚</Option>
                        <Option value="bereavement">丧假/丧</Option>
                        <Option value="homeLeave">探亲假/探</Option>
                        <Option value="bordLeave">生育津贴假/产1</Option>
                        <Option value="extendLeave">企业延长产假/产2</Option>
                        <Option value="sickLeave">男方陪产假/产陪</Option>
                        <Option value="maternityLeave">计生假/计</Option>
                        <Option value="injureLeave">工伤假/工</Option>
                        <Option value="AbsenteeismLeave">旷工假/旷</Option>
                        <Option value="homeMoveLeave">搬家假/搬</Option>
                        <Option value="businessTravelLeave">出差假/差</Option>
                        <Option value="lateLeave">迟到/迟</Option>
                        <Option value="earlyRetreatLeave">早退/早退</Option>
                        <Option value="breakDownLeave">调休/调</Option>
                    </Select>
                </FormItem>
                <FormItem label="假期时间">
                    <DatePicker type="date" placeholder="" style="width: 190px"></DatePicker>至
                    <DatePicker type="date" placeholder="" style="width: 190px" class="float-right"></DatePicker>
                </FormItem>
                <FormItem label="备注">
                    <textarea name="remark" class="vocationRemark"></textarea>
                </FormItem>
            </Form>
        </Modal>
        <!--班次变更-->
        <Modal
                v-model="modal.shiftChange"
                title="班次变更"
                >
            <Form :model="shiftChangeForm" :label-width="80">
                <FormItem label="班次">
                    <Input v-model="shiftChangeForm.input" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注">
                    <textarea name="remark" class="vocationRemark"></textarea>
                </FormItem>
            </Form>
        </Modal>
        <!--临时安排-->
        <Modal
                v-model="modal.provisionalDisposition"
                title="临时安排"
                >
            <Form :model="provisionalDispositionForm" :label-width="100">
                <FormItem label="临时安排类型">
                    <Select v-model="provisionalDispositionForm.select">
                        <Option value="">培训</Option>
                        <Option value="">演练</Option>
                        <Option value="">会议</Option>
                        <Option value="">活动</Option>
                        <Option value="">考试</Option>
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
                    <textarea name="remark" class="vocationRemark"></textarea>
                </FormItem>
            </Form>
        </Modal>
        <!--旷工缺勤-->
        <Modal
                v-model="modal.absenteeism"
                title="旷工缺勤"
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
                <textarea name="remark" class="vocationRemark"></textarea>
            </FormItem>
            </Form>
        </Modal>
        <!--补班加班-->
        <Modal
                v-model="modal.overtime"
                title="补班加班"
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
                <textarea name="remark" class="vocationRemark"></textarea>
            </FormItem>
            </Form>
        </Modal>
        <!--替班-->
        <Modal
                v-model="modal.substitute"
                title="替班"
                >
            <Form :model="substituteForm" :label-width="80">
                <FormItem label="站区">
                    <Select v-model="substituteForm.stationArea">
                        <Option value="xizhimen">西直门</Option>
                        <Option value="chegongzhuang">车公庄</Option>

                    </Select>
                </FormItem>
                <FormItem label="站点">
                    <Select v-model="substituteForm.station">
                        <Option value="xizhimen">西直门</Option>
                        <Option value="chegongzhuang">车公庄</Option>
                    </Select>
                </FormItem>
                <FormItem label="替班人员">
                    <Select v-model="substituteForm.substitutePeople">
                        <Option value="1">工号：60508169 姓名：申毅</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注">
                    <textarea name="remark" class="vocationRemark"></textarea>
                </FormItem>
            </Form>
        </Modal>
        <!--调离-->
        <Modal
                v-model="modal.transfer"
                title="调离"
                >
            <Form :model="transferForm" :label-width="80">
                <FormItem label="站区">
                    <Select v-model="transferForm.stationArea">
                        <Option value="xizhimen">西直门</Option>
                        <Option value="chegongzhuang">车公庄</Option>

                    </Select>
                </FormItem>
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
</template>
<script>

export default {
  data: function() {
    return {
        beginValue:BeforeDate,
        endValue:afterWeekDate,
        showTable:true,
        showTabItem: true,
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
        stationArea: "",
        station: "",
        post: "",
        modal:{
            editVocation:false,
            shiftChange:false,
            provisionalDisposition:false,
            absenteeism:false,
            overtime:false,
            substitute:false,
            transfer:false
        },
        editVocationForm:{
          select:''
        },
        shiftChangeForm:{
            input:''
        },
        provisionalDispositionForm:{
            select:'',
            selectTime:''
        },
        absenteeismForm:{
            selectTime:''
        },
        overtimeForm:{
            selectTime:''
        },
        substituteForm:{
            stationArea:'',
            station:'',
            substitutePeople:''
        },

        transferForm:{
            stationArea:'',
            station:'',
            substitutePeople:''
      },
        stationAreaList: [
        {
          value: "1",
          label: "西直门"
        }
      ],
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
        weekdata: [
            {
                userName: 'Lily',
                postName: '站务员',
                userId: 1,
                schedule: [
                    {
                        date: '6.1',
                        name: '早班'
                    },
                    {
                        date: '6.2',
                        name: '早班'
                    },
                    {
                        date: '6.3',
                        name: '早班'
                    },
                    {
                        date: '6.4',
                        name: '早班'
                    },
                    {
                        date: '6.5',
                        name: '早班'
                    },
                    {
                        date: '6.6',
                        name: '早班'
                    },
                    {
                        date: '6.7',
                        name: '早班'
                    },
                ]
            }
        ]
    };
  },
  methods: {}
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
