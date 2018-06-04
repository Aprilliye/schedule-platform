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
                <!--周表-->
                <table>
                    <tr>
                        <th rowspan="2">姓名</th>
                        <th rowspan="2">岗位</th>
                        <th>6.1</th>
                        <th>6.1</th>
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
                    <tr v-for="item in weekdata" :key="item.userId">
                        <!--周表人物信息气泡提示-->
                        <td>
                        <Poptip trigger="hover" placement="right" width="400">
                            {{item.userName}}
                            <div class="showMessage" slot="content">
                                <table class="messageTable">
                                    <thead>
                                    <tr>
                                        <th>电话</th>
                                        <th>住址</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{messageData[0].phoneName}}</td>
                                        <td>{{messageData[0].address}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Poptip>
                        </td>
                        <td>{{item.postName}}</td>
                        <!--周表点击事件-->
                        <td v-for="(list, index) in item.schedule" :key="'aa'+index">
                        <Poptip trigger="click" placement="bottom" width="60">
                            <span style="margin: 20px">{{list.name}}</span>
                            <div class="showAddClick" slot="content">
                                <table class="addClickTable">
                                    <tr><td @click="editVocationModal">假期编辑</td></tr>
                                    <tr><td @click="shiftChangeModal">班次变更</td></tr>
                                    <tr><td @click="provisionalDispositionModal">临时安排</td></tr>
                                    <tr><td @click="absenteeismModal">旷工缺勤</td></tr>
                                    <tr><td @click="overtimeModal">补班加班</td></tr>
                                    <tr><td @click="substituteModal">替班</td></tr>
                                    <tr><td @click="transferModal">调离</td></tr>
                                    <tr><td>撤销</td></tr>
                                </table>
                            </div>
                        </Poptip>
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
                <tr v-for="item in monthdata" :key="item.userId">
                    <td>
                        <!--月表人物信息气泡提示-->
                        <Poptip trigger="hover" placement="right" width="400">
                            {{item.userName}}
                            <div class="showMessage" slot="content">
                                <table class="messageTable">
                                    <thead>
                                    <tr>
                                        <th>电话</th>
                                        <th>住址</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{messageData[0].phoneName}}</td>
                                        <td>{{messageData[0].address}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Poptip>
                    </td>
                    <td>{{item.postName}}</td>
                    <!--月表点击事件-->
                    <td v-for="(list, index) in item.schedule" :key="'aa'+index">
                        <Poptip trigger="click" placement="bottom" width="60">
                            <span style="margin: 20px">{{list.name}}</span>
                            <div class="showAddClick" slot="content">
                                <table class="addClickTable">
                                    <tr><td @click="editVocationModal">假期编辑</td></tr>
                                    <tr><td @click="shiftChangeModal">班次变更</td></tr>
                                    <tr><td @click="provisionalDispositionModal">临时安排</td></tr>
                                    <tr><td @click="absenteeismModal">旷工缺勤</td></tr>
                                    <tr><td @click="overtimeModal">补班加班</td></tr>
                                    <tr><td @click="substituteModal">替班</td></tr>
                                    <tr><td @click="transferModal">调离</td></tr>
                                    <tr><td>撤销</td></tr>
                                </table>
                            </div>
                        </Poptip>
                    </td>
                    <td>{{item.planWorkHour}}</td>
                    <td>{{item.actualWorkHour}}</td>
                    <td>{{item.balance}}</td>
                </tr>
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
                userName: '许迪萌',
                postName: '站务员',
                userId: 1,
                planWorkHour:46,
                actualWorkHour:46,
                balance:0,
                schedule: [
                    {
                        date: '6.1',
                        name: '6'
                    },
                    {
                        date: '6.2',
                        name: '休'
                    },
                    {
                        date: '6.3',
                        name: '1I'
                    },
                    {
                        date: '6.4',
                        name: '4c'
                    },
                    {
                        date: '6.5',
                        name: '5I'
                    },
                    {
                        date: '6.6',
                        name: '6'
                    },
                    {
                        date: '6.7',
                        name: '休'
                    },
                ]
            },
            {
                userName: '郭冬云',
                postName: '站务员',
                userId: 2,
                planWorkHour:38,
                actualWorkHour:38,
                balance:0,
                schedule: [
                    {
                        date: '6.1',
                        name: '1c'
                    },
                    {
                        date: '6.2',
                        name: '1B2'
                    },
                    {
                        date: '6.3',
                        name: '3A3'
                    },
                    {
                        date: '6.4',
                        name: '休'
                    },
                    {
                        date: '6.5',
                        name: '1H1'
                    },
                    {
                        date: '6.6',
                        name: '5I'
                    },
                    {
                        date: '6.7',
                        name: '6'
                    },
                ]
            },
            {
                userName:'龚紫腾',
                postName:'站务员',
                userId:3,
                planWorkHour:28,
                actualWorkHour:28,
                balance:0,
                schedule:[
                    {
                        date: '6.1',
                        name: '休'
                    },
                    {
                        date: '6.2',
                        name: '5D'
                    },
                    {
                        date: '6.3',
                        name: '6'
                    },
                    {
                        date: '6.4',
                        name: '休'
                    },
                    {
                        date: '6.5',
                        name: '2A1'
                    },
                    {
                        date: '6.6',
                        name: '1G'
                    },
                    {
                        date: '6.7',
                        name: '休'
                    },
                ]
            },
            {
                userName:'那孟超',
                postName:'站务员',
                userId:4,
                planWorkHour:36,
                actualWorkHour:36,
                balance:0,
                schedule:[
                    {
                        date: '6.1',
                        name: '3A1'
                    },
                    {
                        date: '6.2',
                        name: '3A2'
                    },
                    {
                        date: '6.3',
                        name: '休'
                    },
                    {
                        date: '6.4',
                        name: '5A1'
                    },
                    {
                        date: '6.5',
                        name: '6'
                    },
                    {
                        date: '6.6',
                        name: '休'
                    },
                    {
                        date: '6.7',
                        name: '2I1'
                    },
                ]
            },
            {
                userName:'王维',
                postName:'站务员',
                userId:5,
                planWorkHour:37,
                actualWorkHour:37,
                balance:0,
                schedule:[
                    {
                        date: '6.1',
                        name: '1D'
                    },
                    {
                        date: '6.2',
                        name: '4H'
                    },
                    {
                        date: '6.3',
                        name: '休'
                    },
                    {
                        date: '6.4',
                        name: '1B1'
                    },
                    {
                        date: '6.5',
                        name: '休'
                    },
                    {
                        date: '6.6',
                        name: '2A1'
                    },
                    {
                        date: '6.7',
                        name: '5B'
                    },
                ]
            }
        ],
        monthdata:[
            {
                userName: '许迪萌',
                postName: '站务员',
                userId: 1,
                planWorkHour:165,
                actualWorkHour:165,
                balance:0,
                schedule: [
                    {
                        date: '6.1',
                        name: '6'
                    },
                    {
                        date: '6.2',
                        name: '休'
                    },
                    {
                        date: '6.3',
                        name: '1I'
                    },
                    {
                        date: '6.4',
                        name: '4c'
                    },
                    {
                        date: '6.5',
                        name: '5I'
                    },
                    {
                        date: '6.6',
                        name: '6'
                    },
                    {
                        date: '6.7',
                        name: '休'
                    },
                    {
                        date: '6.8',
                        name: '1C'
                    },
                    {
                        date: '6.9',
                        name: '1B2'
                    },
                    {
                        date: '6.10',
                        name: '3A3'
                    },
                    {
                        date: '6.11',
                        name: '休'
                    },
                    {
                        date: '6.12',
                        name: '1H1'
                    },
                    {
                        date: '6.13',
                        name: '5I'
                    },
                    {
                        date: '6.14',
                        name: '6'
                    },
                    {
                        date: '6.15',
                        name: '休'
                    },
                    {
                        date: '6.16',
                        name: '5D'
                    },
                    {
                        date: '6.17',
                        name: '6'
                    },
                    {
                        date: '6.18',
                        name: '休'
                    },
                    {
                        date: '6.19',
                        name: '2A1'
                    },
                    {
                        date: '6.20',
                        name: '1G'
                    },
                    {
                        date: '6.21',
                        name: '休'
                    },
                    {
                        date: '6.22',
                        name: '3A1'
                    },
                    {
                        date: '6.23',
                        name: '3A2'
                    },
                    {
                        date: '6.24',
                        name: '休'
                    },
                    {
                        date: '6.25',
                        name: '5A1'
                    },
                    {
                        date: '6.26',
                        name: '6'
                    },
                    {
                        date: '6.27',
                        name: '休'
                    },
                    {
                        date: '6.28',
                        name: '2I1'
                    },
                    {
                        date: '6.29',
                        name: '1D'
                    },
                    {
                        date: '6.30',
                        name: '4H'
                    },
                ]
            },
            {
                userName: '郭冬云',
                postName: '站务员',
                userId: 2,
                planWorkHour:158,
                actualWorkHour:158,
                balance:0,
                schedule: [
                    {
                        date: '6.1',
                        name: '1c'
                    },
                    {
                        date: '6.2',
                        name: '1B2'
                    },
                    {
                        date: '6.3',
                        name: '3A3'
                    },
                    {
                        date: '6.4',
                        name: '休'
                    },
                    {
                        date: '6.5',
                        name: '1H1'
                    },
                    {
                        date: '6.6',
                        name: '5I'
                    },
                    {
                        date: '6.7',
                        name: '6'
                    },
                    {
                        date: '6.8',
                        name: '1C'
                    },
                    {
                        date: '6.9',
                        name: '休'
                    },
                    {
                        date: '6.10',
                        name: '5D'
                    },
                    {
                        date: '6.11',
                        name: '6'
                    },
                    {
                        date: '6.12',
                        name: '休'
                    },
                    {
                        date: '6.13',
                        name: '2A1'
                    },
                    {
                        date: '6.14',
                        name: '1G'
                    },
                    {
                        date: '6.15',
                        name: '休'
                    },
                    {
                        date: '6.16',
                        name: '3A1'
                    },
                    {
                        date: '6.17',
                        name: '3A2'
                    },
                    {
                        date: '6.18',
                        name: '休'
                    },
                    {
                        date: '6.19',
                        name: '5A1'
                    },
                    {
                        date: '6.20',
                        name: '6'
                    },
                    {
                        date: '6.21',
                        name: '休'
                    },
                    {
                        date: '6.22',
                        name: '2I1'
                    },
                    {
                        date: '6.23',
                        name: '1D'
                    },
                    {
                        date: '6.24',
                        name: '4H'
                    },
                    {
                        date: '6.25',
                        name: '休'
                    },
                    {
                        date: '6.26',
                        name: '1B1'
                    },
                    {
                        date: '6.27',
                        name: '休'
                    },
                    {
                        date: '6.28',
                        name: '2A1'
                    },
                    {
                        date: '6.29',
                        name: '5B'
                    },
                    {
                        date: '6.30',
                        name: '6'
                    }
                ]
            },
            {
                userName:'龚紫腾',
                postName:'站务员',
                userId:3,
                planWorkHour:148,
                actualWorkHour:148,
                balance:0,
                schedule:[
                    {
                        date: '6.1',
                        name: '休'
                    },
                    {
                        date: '6.2',
                        name: '5D'
                    },
                    {
                        date: '6.3',
                        name: '6'
                    },
                    {
                        date: '6.4',
                        name: '休'
                    },
                    {
                        date: '6.5',
                        name: '2A1'
                    },
                    {
                        date: '6.6',
                        name: '1G'
                    },
                    {
                        date: '6.7',
                        name: '休'
                    },
                    {
                        date: '6.8',
                        name: '1D'
                    },
                    {
                        date: '6.9',
                        name: '4H'
                    },
                    {
                        date: '6.10',
                        name: '休'
                    },
                    {
                        date: '6.11',
                        name: '1B1'
                    },
                    {
                        date: '6.12',
                        name: '休'
                    },
                    {
                        date: '6.13',
                        name: '2A1'
                    },
                    {
                        date: '6.14',
                        name: '5B'
                    },
                    {
                        date: '6.15',
                        name: '6'
                    },
                    {
                        date: '6.16',
                        name: '休'
                    },
                    {
                        date: '6.17',
                        name: '5I'
                    },
                    {
                        date: '6.18',
                        name: '6'
                    },
                    {
                        date: '6.19',
                        name: '休'
                    },
                    {
                        date: '6.20',
                        name: '1H2'
                    },
                    {
                        date: '6.21',
                        name: '1B2'
                    },
                    {
                        date: '6.22',
                        name: '3A2'
                    },
                    {
                        date: '6.23',
                        name: '休'
                    },
                    {
                        date: '6.24',
                        name: '4H'
                    },
                    {
                        date: '6.25',
                        name: '休'
                    },
                    {
                        date: '6.26',
                        name: '1B1'
                    },
                    {
                        date: '6.27',
                        name: '休'
                    },
                    {
                        date: '6.28',
                        name: '2A1'
                    },
                    {
                        date: '6.29',
                        name: '5B'
                    },
                    {
                        date: '6.30',
                        name: '6'
                    }
                ]
            },
            {
                userName:'那孟超',
                postName:'站务员',
                userId:4,
                planWorkHour:164,
                actualWorkHour:164,
                balance:0,
                schedule:[
                    {
                        date: '6.1',
                        name: '3A1'
                    },
                    {
                        date: '6.2',
                        name: '3A2'
                    },
                    {
                        date: '6.3',
                        name: '休'
                    },
                    {
                        date: '6.4',
                        name: '5A1'
                    },
                    {
                        date: '6.5',
                        name: '6'
                    },
                    {
                        date: '6.6',
                        name: '休'
                    },
                    {
                        date: '6.7',
                        name: '2I1'
                    },
                    {
                        date: '6.8',
                        name: '6'
                    },
                    {
                        date: '6.9',
                        name: '休'
                    },
                    {
                        date: '6.10',
                        name: '5I'
                    },
                    {
                        date: '6.11',
                        name: '6'
                    },
                    {
                        date: '6.12',
                        name: '休'
                    },
                    {
                        date: '6.13',
                        name: '1H2'
                    },
                    {
                        date: '6.14',
                        name: '1B2'
                    },
                    {
                        date: '6.15',
                        name: '3A2'
                    },
                    {
                        date: '6.16',
                        name: '休'
                    },
                    {
                        date: '6.17',
                        name: '1G'
                    },
                    {
                        date: '6.18',
                        name: '2I1'
                    },
                    {
                        date: '6.19',
                        name: '5F'
                    },
                    {
                        date: '6.20',
                        name: '6'
                    },
                    {
                        date: '6.21',
                        name: '休'
                    },
                    {
                        date: '6.22',
                        name: '2A2'
                    },
                    {
                        date: '6.23',
                        name: '1H2'
                    },
                    {
                        date: '6.24',
                        name: '4B'
                    },
                    {
                        date: '6.25',
                        name: '3I1'
                    },
                    {
                        date: '6.26',
                        name: '休'
                    },
                    {
                        date: '6.27',
                        name: '2A2'
                    },
                    {
                        date: '6.28',
                        name: '休'
                    },
                    {
                        date: '6.29',
                        name: '5G'
                    },
                    {
                        date: '6.30',
                        name: '6'
                    }
                ]
            },
            {
                userName:'王维',
                postName:'站务员',
                planWorkHour:164,
                actualWorkHour:164,
                balance:0,
                userId:5,
                schedule:[
                    {
                        date: '6.1',
                        name: '1D'
                    },
                    {
                        date: '6.2',
                        name: '4H'
                    },
                    {
                        date: '6.3',
                        name: '休'
                    },
                    {
                        date: '6.4',
                        name: '1B1'
                    },
                    {
                        date: '6.5',
                        name: '休'
                    },
                    {
                        date: '6.6',
                        name: '2A1'
                    },
                    {
                        date: '6.7',
                        name: '5B'
                    },
                    {
                        date: '6.8',
                        name: '3A2'
                    },
                    {
                        date: '6.9',
                        name: '休'
                    },
                    {
                        date: '6.10',
                        name: '1G'
                    },
                    {
                        date: '6.11',
                        name: '2I1'
                    },
                    {
                        date: '6.12',
                        name: '5F'
                    },
                    {
                        date: '6.13',
                        name: '6'
                    },
                    {
                        date: '6.14',
                        name: '休'
                    },
                    {
                        date: '6.15',
                        name: '2A2'
                    },
                    {
                        date: '6.16',
                        name: '1H2'
                    },
                    {
                        date: '6.17',
                        name: '4B'
                    },
                    {
                        date: '6.18',
                        name: '3I1'
                    },
                    {
                        date: '6.19',
                        name: '休'
                    },
                    {
                        date: '6.20',
                        name: '2A2'
                    },
                    {
                        date: '6.21',
                        name: '休'
                    },
                    {
                        date: '6.22',
                        name: '5G'
                    },
                    {
                        date: '6.23',
                        name: '6'
                    },
                    {
                        date: '6.24',
                        name: '2A1'
                    },
                    {
                        date: '6.25',
                        name: '休'
                    },
                    {
                        date: '6.26',
                        name: '1B2'
                    },
                    {
                        date: '6.27',
                        name: '5A2'
                    },
                    {
                        date: '6.28',
                        name: '6'
                    },
                    {
                        date: '6.29',
                        name: '休'
                    },
                    {
                        date: '6.30',
                        name: '5A1'
                    },
                ]
            }
        ],
        messageData:[
            {
                phoneName:"13683618528",
                address:'北京市石景山区古城南路19号楼'
            },
            {
                phoneName:"13785663247",
                address:'北京市丰台区花乡羊坊花园西院1-5-404'
            },
            {
                phoneName:"13051679861",
                address:'北京市丰台区青塔蔚园10号楼101'
            },
            {
                phoneName:"13811914821",
                address:'北京市西城区寿长街2号'
            },
            {
                phoneName:"13581550834",
                address:'北京市门头沟区王平镇东王平村55-4'
            },
        ]
    };
  },
  methods: {
      //模态框出现去掉气泡提示框
      editVocationModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal.editVocation=true;
      },
      shiftChangeModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal.shiftChange=true;
      },
      provisionalDispositionModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal.provisionalDisposition=true;
      },
      absenteeismModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal.absenteeism=true;
      },
      overtimeModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal. overtime=true;
      },
      substituteModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal.substitute=true;
      },
      transferModal:function(){
          $(".ivu-poptip-popper").css("display","none");
          this.modal.transfer=true;
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
