<template>
    <div class="container">
        <div class="content-header">
            <Select v-model="position.current" placeholder="请选择岗位" style="width:200px;margin: 0px 0px 4px 20px " @on-change="getChangeSuite">
                <Option v-for="item in position.data" :value="item.id+'-'+item.backupPosition+'-'+item.positionName" :key="item.id">{{ item.positionName }}</Option>
            </Select>
            <a class="btnDefault bgGreen" @click="modal.addShift=true" >新增班制</a>
        </div>
        <Tabs type="card"  :animated="false" v-model="tabModel" closable @on-tab-remove="handleClose"  @on-click="choseTab">
            <TabPane :label="item.dutyName"  v-for="(item,index) in suites" :key="index" :id="item.id">
                <div class="panel-body">
                    <div class="buttonblock"></div>
                    <div class="shifts-content">
                        <!--班制表-->
                        <div class="shiftform">
                            <div class="title">
                                <b>班制表</b>
                                <div class="btn-group">
                                    <a class="btnDefault bgGreen" href="javascript:;" @click="beforeEditShift">编辑班制</a>
                                </div>
                            </div>
                            <ul class="info">
                                <li>
                                    <label>班制名称：</label>
                                    <span>{{info.dutyName}}</span>
                                </li>
                                <li>
                                    <label>站区：</label>
                                    <span>{{info.districtName}}</span>
                                </li>
                                <li>
                                    <label>站点：</label>
                                    <span>{{info.stationName}}</span>
                                </li>
                                <li>
                                    <label>周工时下限：</label>
                                    <span>{{info.minWorkingHour}}</span>
                                </li>
                                <li>
                                    <label>周工时上限：</label>
                                    <span>{{info.maxWorkingHour}}</span>
                                </li>
                                <li>
                                    <label>每周最少休班：</label>
                                    <span>{{info.minWeeklyRestDays}}</span>
                                </li>
                                <li>
                                    <label>每周最多休班：</label>
                                    <span>{{info.maxWeeklyRestDays}}</span>
                                </li>
                                <li>
                                    <label>月工时上限：</label>
                                    <span>{{info.monthlyWorkingHourLimit}}</span>
                                </li>
                                <li>
                                    <label>年工时上限：</label>
                                    <span>{{info.yearlyWorkingHourLimit}}</span>
                                </li>
                            </ul>
                        </div>
                        <!--24小时值班人数表-->
                        <div class="twentyfourform">
                            <div id="echart" v-show="showEchart"></div>
                            <div class="title">
                                <b>24小时值班人数表</b>
                                <div class="btn-group">
                                    <a class="btnDefault bgGreen" @click="modal.addTimeSlot=true">新增时间段</a>
                                    <a class="btnDefault bgBlue" style="margin-left:10px;" @click="initEchart">方案验算</a>
                                </div>
                            </div>
                            <Table :columns="onDutyColumns" :data="onDutyData"></Table>
                        </div>
                        <!--班次表-->
                        <div class="banciform">
                            <div class="title">
                                <b>班次表</b>
                                <div class="btn-group">
                                    <a class="btnDefault bgGreen" @click="modal.addClass=true">新增班次</a>
                                </div>
                            </div>
                            <Table :columns="shiftColumns" :data="shiftData" class="shiftTableColor"></Table>
                        </div>
                    </div>
                </div>
            </TabPane>
            
        </Tabs>
        <!-- 新增班次表 -->
        <Modal title="新增班次"
               v-model="modal.addClass"
                @on-ok="addClassMethods('addFormValidateClass')"
               @on-cancel="handleCancel('addFormValidateClass')"
               :loading="true"
            >
            <Form ref="addFormValidateClass" :model="addFormValidateClass" :rules="ruleValidate1" :label-width="80">
                <FormItem label="班次名称" prop="dutyName">
                    <Input v-model="addFormValidateClass.dutyName" placeholder=""/>
                </FormItem>
                <FormItem label="班次代号" prop="dutyCode">
                    <Input v-model="addFormValidateClass.dutyCode" placeholder=""/>
                </FormItem>
                <FormItem label="班次颜色" prop="classColor">
                    <Poptip trigger="click" content="content">
                        <div class="shiftColor"></div>
                        <div class="shiftColorBox" slot="content">
                            <a style="background-color:rgb(110, 121, 190) " value="rgb(110, 121, 190)" @click="getBackColor"></a>
                            <a style="background-color:rgb(227, 82, 140) " value="rgb(227, 82, 140)" @click="getBackColor"></a>
                            <a style="background-color:rgb(228, 121, 121) " value="rgb(228, 121, 121)" @click="getBackColor"></a>
                            <a style="background-color:rgb(198, 65, 222) " value="rgb(198, 65, 222)" @click="getBackColor"></a>
                            <a style="background-color:rgb(62, 152, 175) " value="rgb(62, 152, 175)" @click="getBackColor"></a>
                            <a style="background-color:rgb(41, 173, 125) " value="rgb(41, 173, 125)" @click="getBackColor"></a>
                            <a style="background-color:rgb(119, 85, 247) " value="rgb(119, 85, 247)" @click="getBackColor"></a>
                            <a style="background-color:rgb(59, 199, 85) " value="rgb(59, 199, 85)" @click="getBackColor"></a>
                            <a style="background-color:rgb(214, 129, 73) " value="rgb(214, 129, 73)" @click="getBackColor"></a>
                            <a style="background-color:rgb(196, 167, 68) " value="rgb(196, 167, 68)" @click="getBackColor"></a>
                            <a style="background-color:rgb(199, 191, 65) " value="rgb(199, 191, 65)" @click="getBackColor"></a>
                            <a style="background-color:rgb(103, 188, 57) " value="rgb(103, 188, 57)" @click="getBackColor"></a>
                        </div>
                    </Poptip>
                </FormItem>
                <FormItem label="起止时间" prop="timeSlot" element-id="timeSlot">
                    <!-- <TimePicker  v-model="addFormValidateClass.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm" :value='addShiftValue'  @on-change="getsectionTime"></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="addFormValidateClass.ifTimeSlot">时间段不能为空</div> -->
                    <TimePicker  v-model="addFormValidateClass.timeSlotBegin" placeholder="选择开始时间" format="HH:mm" @on-change="getsectionTime"></TimePicker>至
                    <TimePicker  v-model="addFormValidateClass.timeSlotEnd" placeholder="选择结束时间" format="HH:mm" @on-change="getsectionTime"></TimePicker>
                </FormItem>
                <FormItem label="本班工时" prop="workingLength">
                    <Input v-model="addFormValidateClass.workingLength" placeholder="" readonly/>
                </FormItem>
                <FormItem label="班次间隔" prop="restMinutes">
                    <Input v-model="addFormValidateClass.restMinutes" placeholder=""/>
                </FormItem>
                <FormItem label="值班人数" prop="userCount">
                    <Input v-model="addFormValidateClass.userCount" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑班次表 -->
        <Modal title="编辑班次"
               v-model="modal.editShifyClass"
               :loading="true"
               @on-ok="editShifyClassMethods('editFormValidateClass')"
               @on-cancel="handleCancel('editFormValidateClass')"
                >
            <Form ref="editFormValidateClass" :model="editFormValidateClass" :rules="ruleValidate1" :label-width="80">
                <FormItem label="班次名称" prop="dutyName">
                    <Input v-model="editFormValidateClass.dutyName" placeholder=""/>
                </FormItem>
                <FormItem label="班次代号" prop="dutyCode">
                    <Input v-model="editFormValidateClass.dutyCode" placeholder=""/>
                </FormItem>
                <FormItem label="班次颜色" prop="classColor">
                    <Poptip trigger="click" content="content">
                        <div class="shiftColor"></div>
                        <div class="shiftColorBox" slot="content">
                            <a style="background-color:rgb(110, 121, 190) " value="rgb(110, 121, 190)" @click="getBackColor"></a>
                            <a style="background-color:rgb(227, 82, 140) " value="rgb(227, 82, 140)" @click="getBackColor"></a>
                            <a style="background-color:rgb(228, 121, 121) " value="rgb(228, 121, 121)" @click="getBackColor"></a>
                            <a style="background-color:rgb(198, 65, 222) " value="rgb(198, 65, 222)" @click="getBackColor"></a>
                            <a style="background-color:rgb(62, 152, 175) " value="rgb(62, 152, 175)" @click="getBackColor"></a>
                            <a style="background-color:rgb(41, 173, 125) " value="rgb(41, 173, 125)" @click="getBackColor"></a>
                            <a style="background-color:rgb(119, 85, 247) " value="rgb(119, 85, 247)" @click="getBackColor"></a>
                            <a style="background-color:rgb(59, 199, 85) " value="rgb(59, 199, 85)" @click="getBackColor"></a>
                            <a style="background-color:rgb(214, 129, 73) " value="rgb(214, 129, 73)" @click="getBackColor"></a>
                            <a style="background-color:rgb(196, 167, 68) " value="rgb(196, 167, 68)" @click="getBackColor"></a>
                            <a style="background-color:rgb(199, 191, 65) " value="rgb(199, 191, 65)" @click="getBackColor"></a>
                            <a style="background-color:rgb(103, 188, 57) " value="rgb(103, 188, 57)" @click="getBackColor"></a>
                        </div>
                    </Poptip>
                </FormItem>
                <FormItem label="起止时间" prop="timeSlot" element-id="timeSlot" >
                    <!-- <TimePicker  v-model="editFormValidateClass.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm"  @on-change="getsectionTime" :value='editShiftValue'></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="editFormValidateClass.ifTimeSlot">时间段不能为空</div> -->
                    <TimePicker  v-model="editFormValidateClass.timeSlotBegin" placeholder="选择开始时间" format="HH:mm" ></TimePicker>至
                    <TimePicker  v-model="editFormValidateClass.timeSlotEnd" placeholder="选择结束时间" format="HH:mm" ></TimePicker>
                </FormItem>
                <FormItem label="本班工时" prop="workingLength">
                    <Input v-model="editFormValidateClass.workingLength" placeholder=""/>
                </FormItem>
                <FormItem label="班次间隔" prop="restMinutes">
                    <Input v-model="editFormValidateClass.restMinutes" placeholder=""/>
                </FormItem>
                <FormItem label="班次关联" prop="relevantClassId">
                    <!-- <Input v-model="editFormValidateClass.relevantClassId" placeholder="" readonly/> -->
                </FormItem>
                <FormItem label="值班人数" prop="userCount">
                    <Input v-model="editFormValidateClass.userCount" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑班制 -->
        <Modal title="编辑班制"
                v-model="modal.editShift"
                :loading="true"
                @on-ok="editShift('formValidate')"
                @on-cancel="handleCancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <FormItem label="班制名称：" prop="dutyName">
                    <Input v-model="formValidate.dutyName" placeholder=""/>
                </FormItem>
                <FormItem label="是否启用：" prop="active" :rules="{required:true,message:'是否启用不能为空'}">
                    <Select v-model="formValidate.active" placeholder="请选择">
                        <Option :value="1">是</Option>
                        <Option :value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="站区：" prop="stationArea" :rules="{required:true,message:'站区不能为空'}">
                    <Select v-model="formValidate.stationArea" placeholder="请选择" @on-change="getEditStation">
                        <Option v-for="(item,index) in districts" :value="item.id+'-'+item.districtName" :key="index">{{item.districtName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station" :rules="{required:true,message:'站点不能为空'}">
                    <Select v-model="formValidate.station" placeholder="请选择">
                        <Option v-for="(item,index) in stations " :value="item.id+'-'+item.stationName" :key="index">{{item.stationName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="周工时下限：" prop="minWorkingHour">
                    <Input v-model="formValidate.minWorkingHour" placeholder=""/>
                </FormItem>
                <FormItem label="周工时上限：" prop="maxWorkingHour">
                    <Input v-model="formValidate.maxWorkingHour" placeholder=""/>
                </FormItem>
                <FormItem label="每周最少休班：" prop="minWeeklyRestDays">
                    <Input v-model="formValidate.minWeeklyRestDays" placeholder=""/>
                </FormItem>
                <FormItem label="每周最多休班：" prop="maxWeeklyRestDays">
                    <Input v-model="formValidate.maxWeeklyRestDays" placeholder=""/>
                </FormItem>
                <FormItem label="月工时上限：" prop="monthlyWorkingHourLimit">
                    <Input v-model="formValidate.monthlyWorkingHourLimit" placeholder=""/>
                </FormItem>
                <FormItem label="年工时上限：" prop="yearlyWorkingHourLimit">
                    <Input v-model="formValidate.yearlyWorkingHourLimit" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!--新增班制弹框-->
        <Modal title="新增班制"
               v-model="modal.addShift"
               :loading="true"
               @on-ok="addShift('addFormValidate')"
               @on-cancel="handleCancel('addFormValidate')">
            <Form ref="addFormValidate" :model="addFormValidate" :label-width="110">
                <FormItem label="班制名称：" prop="dutyName" :rules="{required:true,message:'班制名称不能为空'}">
                    <Input v-model="addFormValidate.dutyName" placeholder=""/>
                </FormItem>
                <FormItem label="是否启用：" prop="active" :rules="{required:true,message:'是否启用不能为空'}">
                    <Select v-model="addFormValidate.active" placeholder="请选择">
                        <Option :value="1">是</Option>
                        <Option :value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="站区：" prop="stationArea" :rules="{required:true,message:'站区不能为空'}">
                    <Select v-model="addFormValidate.stationArea" placeholder="请选择" @on-change="getStations">
                        <Option v-for="(item,index) in districts" :value="item.id+'-'+item.districtName" :key="index">{{item.districtName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station" :rules="{required:true,message:'站点不能为空'}">
                    <Select v-model="addFormValidate.station" placeholder="请选择">
                        <Option v-for="(item,index) in stations " :value="item.id+'-'+item.stationName" :key="index">{{item.stationName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="周工时下限：" prop="minWorkingHour" :rules="{required:true,message:'周工时下限不能为空不能为空'}">
                    <Input v-model="addFormValidate.minWorkingHour" placeholder=""/>
                </FormItem>
                <FormItem label="周工时上限：" prop="maxWorkingHour" :rules="{required:true,message:'周工时上限不能为空'}">
                    <Input v-model="addFormValidate.maxWorkingHour" placeholder=""/>
                </FormItem>
                <FormItem label="每周最少休班：" prop="minWeeklyRestDays" :rules="{required:true,message:'每周最少休班不能为空'}">
                    <Input v-model="addFormValidate.minWeeklyRestDays" placeholder=""/>
                </FormItem>
                <FormItem label="每周最多休班：" prop="maxWeeklyRestDays" :rules="{required:true,message:'每周最多休班不能为空'}">
                    <Input v-model="addFormValidate.maxWeeklyRestDays" placeholder=""/>
                </FormItem>
                <FormItem label="月工时上限：" prop="monthlyWorkingHourLimit" :rules="{required:true,message:'月工时上限不能为空'}">
                    <Input v-model="addFormValidate.monthlyWorkingHourLimit" placeholder=""/>
                </FormItem>
                <FormItem label="年工时上限：" prop="yearlyWorkingHourLimit" :rules="{required:true,message:'年工时上限不能为空'}">
                    <Input v-model="addFormValidate.yearlyWorkingHourLimit" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!-- 新增时间段 -->
        <Modal title="新增时间段"
            v-model="modal.addTimeSlot"
            :loading="true"
            @on-ok="addTimeSlotMethods('addTimeValidate')"
            @on-cancel="handleCancelTime('addTimeValidate')">
            <Form ref="addTimeValidate" :model="addTimeValidate" :rules="ruleAddTimeValidate" :label-width="80">
                <FormItem label="时间段" prop="timeSlot" element-id="timeSlot">
                    <TimePicker  v-model="addTimeValidate.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm" :value='addTime'></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="addTimeValidate.ifTimeSlot">时间段不能为空</div>
                </FormItem>
                <FormItem label="值班人数" prop="userCount">
                    <Input v-model="addTimeValidate.userCount" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!--编辑时间段-->
        <Modal title="编辑时间段"
               v-model="modal.editTimeSlot"
               :loading="true"
               @on-ok="editTimeSlotMethods('editTimeValidate')"
               @on-cancel="handleCancel('editTimeValidate')">
            <Form ref="editTimeValidate" :model="editTimeValidate" :rules="ruleAddTimeValidate" :label-width="80">
                <FormItem label="时间段" prop="timeSlot" element-id="timeSlot">
                    <TimePicker  v-model="editTimeValidate.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm" :value='editTime'></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="editTimeValidate.ifTimeSlot">时间段不能为空</div>
                </FormItem>
                <FormItem label="值班人数" prop="userCount">
                    <Input v-model="editTimeValidate.userCount" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script >
import {getAllPost, getSuites, addSuites, getClass, addClass, deteleSuites, deteleClass, updateClass, updateSuites, addPeriod, updatePeriod, detelePeriod} from '@/api/api';
import {stationAreaList, getStations} from '@/api/commonAPI';
let echarts = require('echarts');
export default {
    data:function () {
        return {
            suiteName:null,
            tabModel:null,
            suiteId:null,
            //  岗位
            position: {
                data: [],
                id: null,
                current: '2-1-站务员'
            },
            // 当前站区id
            dutyDistrictId:null,
            // 当前站区名
            dutyDistrictName:'',
           // 当前站点id
            dutyStationId:null,
            // 当前站点名
            dutyStationName:'',
            districtId: this.$store.get('districtId'),
            stationId: this.$store.get('stationId'),
            // 当前班次id
            classId:null,
            // 当前时间段id
            currentPeriod: null,
            //  班制
            suites: [],
            //  站区
            districts: [],
            //  站点
            stations: [],
            // 当前tab标签name值
            tabName: 0,
            // 当前关联班次
            CurrentRelevantClassId:null,
            modal3:false,
            currentIndex:'',
            addShiftValue:[],
            editTime:[],
            addTime:[],
            modal: {
                editShift:false,
                addShift:false,
                addTimeSlot:false,
                editTimeSlot:false,
                editShifyClass:false,
                addClass:false
            },
            positions: [],
            info: {
                dutyName: '',
                districtName: '',
                stationName: '',
                minWorkingHour: '',
                maxWorkingHour: '',
                minWeeklyRestDays: '', 
                maxWeeklyRestDays: '', 
                monthlyWorkingHourLimit: '',
                yearlyWorkingHourLimit: ''                 
            },
            formValidate: {
                dutyName: '',
                districtName: '',
                stationName: '',
                minWorkingHour: '',
                maxWorkingHour: '',
                minWeeklyRestDays: '', 
                maxWeeklyRestDays: '', 
                monthlyWorkingHourLimit: '',
                yearlyWorkingHourLimit: ''   
            },
            addTimeValidate:{
                timeSlot: [],
                userCount: null,
                ifTimeSlot: false
            },
            editTimeValidate: {
                timeSlot: [],
                userCount: null,
                ifTimeSlot: false
            },
            addFormValidateClass:{
                timeSlot: [],
                dutyName:'',
                dutyCode:'',
                totalTime:'',
                notice:'',
                workingLength:null,
                restMinutes:null,
                relevantClassId:null,
                userCount:null,
                ifTimeSlot:false,
                timeSlotBegin:'',
                timeSlotEnd:'',
            },
            editFormValidateClass:{
            timeSlot: [],
            dutyName:'',
            dutyCode:'',
            totalTime:'',
            notice:'',
            workingLength:null,
            restMinutes:null,
            relevantClassId:null,
            userCount:null,
            ifTimeSlot:false,
            timeSlotBegin:'',
            timeSlotEnd:'',
            },
            addFormValidate:{
                name: '',
                active: null,
                stationArea: null,
                station:'',
                minWeekHours:'',
                maxWeekHours:'',
                minWeekOffDuty:'',
                maxWeekOffDuty:'',
                maxMonthOffDuty:'',
                maxYearOffDuty:''
            },
            //  新增班制弹框验证
            ruleValidate: {
                dutyName: [
                    { required: true, message: '班制名称不能为空', trigger: 'blur' }
                ],
                stationArea: [
                    { required: true, message: '站区不能为空', trigger: 'change' }
                ],
                station: [
                    { required: true, message: '站点不能为空', trigger: 'change' }
                ],
                minWorkingHour: [
                    { required: true, message: '周工时下限不能为空', trigger: 'blur' }
                ],
                maxWorkingHour: [
                    { required: true, message: '周工时上限不能为空', trigger: 'blur' }
                ],
                minWeeklyRestDays: [
                    { required: true, message: '每周最少修班不能为空', trigger: 'blur' }
                ],
                maxWeeklyRestDays: [
                    { required: true, message: '每周最多休班不能为空', trigger: 'blur' }
                ],
                monthlyWorkingHourLimit: [
                    { required: true, message: '月工时上限不能为空', trigger: 'blur' }
                ],
                yearlyWorkingHourLimit: [
                    { required: true, message: '年工时上限不能为空', trigger: 'blur' }
                ]
            },
            //  新增时间段弹框
            ruleAddTimeValidate: {
                timeSlot: [
                    { required: true, type: 'array', min: 1, message: '时间段不能为空', trigger: 'blur' },
                ],
                shiftpeople: [
                    { required: true, message: '值班人数不能为空', trigger: 'blur' }
                ]
            },
            //  新增班次弹框
            ruleValidate1: {
                dutyName: [
                    { required: true, message: '班次名称不能为空', trigger: 'blur' }
                ],
                dutyCode:[
                    { required: true, message: '班制代号不能为空', trigger: 'blur' }
                ],
                workingLength: [
                    { required: true, message: '本班工时不能为空', trigger: 'blur' }
                ],
                restMinutes: [
                    { required: true, message: '班次间隔不能为空', trigger: 'blur' }
                ],
                relevantClassId: [
                    { required: true, message: '班次关联不能为空', trigger: 'blur' }
                ],
                userCount: [
                    { required: true, message: '值班人数不能为空', trigger: 'blur' }
                ]
            },
            data: [
                {
                    name: '西直门替班员',
                    stion:'西直门',
                    site:'西直门',
                    weektime1:'1',
                    weektime2:'1',
                    weekdayoff1:'1',
                    weekdayoff2:'1',
                    monthtime:'1',
                    yeartime:'1'
                }
            ],
            //班次表
            shiftColumns: [
                         {
                        title: '班制名称',
                        align: 'center',
                        key: 'dutyName',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                        color:params.row.classColor
                                    },
                                    },params.row.dutyName ),
                            ]);
                        }
                    },
                    {
                        title: '起止时间',
                        align: 'center',
                        key: 'timeSlot',
                              render: (h, params) => {
                        let beginTimeSlot=params.row.startTimeStr;
                        let endTimeSlot=params.row.endTimeStr;
                        return h('div', [
                            h('span', beginTimeSlot),
                            h('span', '-'),
                            h('span', endTimeSlot),
                        ]);
                    }
                    },
                    {
                        title: '本班工时',
                        align: 'center',
                        key: 'workingLength'
                    },
                    {
                        title: '班次间隔',
                        align: 'center',
                        key: 'restMinutes'
                    },
                    {
                        title: '班次关联',
                        align: 'center',
                        key: 'relevantClassId'
                    },
                    {
                        title: '值班人数',
                        align: 'center',
                        key: 'userCount'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edite(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.remove1(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            shiftData:[
                // {name: '早班', timeSlot: ['07:00','14:00'], shiftTime: '7小时', shiftSpace: '12小时', shiftRele: '--', shiftPeople: 4,color:'rgb(110, 121, 190)'},
                // {name: '晚班', timeSlot: ['14:00','21:00'], shiftTime: '7小时', shiftSpace: '12小时', shiftRele: '--', shiftPeople: 1,color:'rgb(41, 173, 125)'},
                // {name: '白班', timeSlot: ['07:00','17:00'], shiftTime: '10小时', shiftSpace: '12小时', shiftRele: '--', shiftPeople: 1,color:'rgb(59, 199, 85)'}
            ],
            onDutyColumns: [
                {
                    title: '时间段',
                    align: 'center',
                    key: 'timeSlot',
                    render: (h, params) => {
                        let beginTimeSlot=params.row.startTimeStr;
                        let endTimeSlot=params.row.endTimeStr;
                        return h('div', [
                            h('span', beginTimeSlot),
                            h('span', '-'),
                            h('span', endTimeSlot),
                        ]);
                    }
                },
                {
                    title: '值班人数',
                    align: 'center',
                    key: 'userCount'
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.editpeoplenumber(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.remove2(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            onDutyData:[
                // {timeSlot:['00:00','07:00'], shiftPeople: 2 },
                // {timeSlot:['07:00','09:00'], shiftPeople: 8 },
                // {timeSlot:['09:00','11:00'], shiftPeople: 4 },
                // {timeSlot:['11:00','13:00'], shiftPeople: 4 },
                // {timeSlot:['13:00','17:00'], shiftPeople: 4 },
                // {timeSlot:['17:00','19:00'], shiftPeople: 4 },
                // {timeSlot:['19:00','24:00'], shiftPeople: 2 },
            ],
            showEchart: false
        }
    },
    mounted: function () {
        //  获取岗位
        this.getAllPost();
        // 获取班制
        this.getSuites();
        // 获取站区
        this.request();
    },
    methods:{
        //  获取所有岗位
        getAllPost: async function () {
            let response = await getAllPost(this.stationId);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.position.data = response.data;
                return;
            }
            this.$Message.error(message);
        },
        // 切换岗位获取班制
        getChangeSuite: async function () {
            this.showEchart = false;
            this.suiteName = 0;
            let that = this;
            let currentPosition = this.position.current.split('-');
            let data = {
                districtId: this.districtId,
                stationId: this.stationId,
                positionId: parseInt(currentPosition[0]),
                backup: parseInt(currentPosition[1])
            }
            let response = await getSuites(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.suites = response.data;
                if(response.data.length>0){
                    this.suiteId = response.data[0].id;
                    this.dutyDistrictId = response.data[0].districtId;
                    this.dutyDistrictName = response.data[0].districtName;
                    this.dutyStationId = response.data[0].stationId;
                    this.dutyStationName = response.data[0].stationName;
                }else{
                    this.suiteId = null;
                    this.dutyDistrictId = null;
                    this.dutyDistrictName = null;
                    this.dutyStationId = null;
                    this.dutyStationName = null;
                }
                // 显示班制内容
                let obj = this.suites[0]; 
                for(let key in obj){
                this.info[key] = obj[key];
                }
                this.$options.methods.getClass(that);
                return;
            }
            this.$Message.error(message);
        },
        //  获取班制
        getSuites: async function () {
            this.suiteName = 0;
            let that = this;
            let currentPosition = this.position.current.split('-');
            let data = {
                districtId: this.districtId,
                stationId: this.stationId,
                positionId: parseInt(currentPosition[0]),
                backup: parseInt(currentPosition[1])
            }
            let response = await getSuites(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.suites = response.data;
                if (response.data.length>0){
                    this.suiteId = response.data[0].id;
                    this.dutyDistrictId = response.data[0].districtId;
                    this.dutyDistrictName = response.data[0].districtName;
                    this.dutyStationId = response.data[0].stationId;
                    this.dutyStationName = response.data[0].stationName;
                }else{
                    this.suiteId = null;
                    this.dutyDistrictId = null;
                    this.dutyDistrictName = null;
                    this.dutyStationId = null;
                    this.dutyStationName = null;
                }
                // 显示班制内容
                let obj = this.suites[0]; 
                for(let key in obj){
                this.info[key] = obj[key];
                }
                this.$options.methods.getClass(that);
                return;
            }
            this.$Message.error(message);
        },
        choseTab: async function (name) {
            this.showEchart = false;
            this.tabName = name;
            let that = this;
            if (this.suites.length>0){
                let obj = this.suites[name]; 
                for(let key in obj){
                this.info[key] = obj[key];
                }
                this.suiteId = this.suites[name].id;
                this.dutyDistrictId = this.suites[name].districtId;
                this.dutyDistrictName = this.suites[name].districtName;
                this.dutyStationId = this.suites[name].stationId;
                this.dutyStationName = this.suites[name].stationName;
                this.$options.methods.getClass(that);
            }
        },
        //  获取站区
        request: async function(){
            let response = await stationAreaList();
            if (response.meta.code !== 0) {
                this.$Loading.error();
                this.$Message.error(response.meta.message);
            }else{
                this.$Loading.finish();
                this.districts = response.data;
            }
        },
        //  获取站点
        getStations: async function () {
            if (this.addFormValidate.stationArea) {
            let currentDistrict = this.addFormValidate.stationArea.split('-');
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
        getEditStation: async function () {
            if (this.formValidate.stationArea) {
            let currentDistrict = this.formValidate.stationArea.split('-');
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
        // 获取班次
        getClass: async function (that) {
            if ( that.suiteId){
                let suiteId = that.suiteId;
                let response = await getClass(suiteId);
                if (response.meta.code !== 0) {
                    that.$Loading.error();
                    that.$Message.error(response.meta.message);
                }else{
                    that.shiftData = response.data.dutyclass;
                    //获取时间段
                    that.onDutyData=response.data.dutyperiodchecking
                    that.$Loading.finish();
                }
            }
        },
        //删除班制
        handleClose: async function (name) {
            let id = this.suites[name].id;
            let response = await deteleSuites(id);
            if (response.meta.code !== 0) {
                this.$Loading.error();
                this.$Message.error(response.meta.message);
            }else{
                this.$Loading.finish();
                this.suites = response.data;
                console.log(response);
                if (this.tabName == name && name!=0){
                    console.log("1111")
                    this.showEchart = false;
                    let that = this;
                    let obj = this.suites[name-1]; 
                    for(let key in obj){
                    this.info[key] = obj[key];
                    }
                    this.suiteId = this.suites[name-1].id;
                    this.dutyDistrictId = this.suites[name-1].districtId;
                    this.dutyDistrictName = this.suites[name-1].districtName;
                    this.dutyStationId = this.suites[name-1].stationId;
                    this.dutyStationName = this.suites[name-1].stationName;
                    this.$options.methods.getClass(that);
                    this.tabName =name;
                }else if (name==0){
                    console.log("22222");
                    this.showEchart = false;
                    if (this.suites.length>0){
                        console.log("33333");
                        console.log(this.suites);
                    let that = this;
                    let obj = this.suites[name];
                    console.log(this.suites[name]);
                    for(let key in obj){
                    this.info[key] = obj[key];
                    }
                    this.dutyDistrictId = this.suites[name].districtId,
                    this.dutyDistrictName = this.suites[name].districtName,
                    this.dutyStationId  = this.suites[name].stationId,
                    this.dutyStationName = this.suites[name].stationName,
                    this.suiteId = this.suites[name].id
                    this.$options.methods.getClass(that);
                    }else{
                        console.log("44444");
                        this.showEchart = false;
                        this.info=[];
                        this.dutyDistrictId = null,
                        this.dutyDistrictName = null,
                        this.dutyStationId  = null,
                        this.dutyStationName = null,
                        this.suiteId =null
                    }
                }
             
                this.$Message.success("删除班制成功");
            }
        },
        //编辑班制验证
        editShift: function (name) {
            this.$refs[name].validate((valid) => {
                let that = this;
                if (valid) {
                    this.$options.methods.beforeEditShiftMethod(that);
                    this.$refs[name].resetFields();
                    this.modal.editShift=false;
                } else {
                    this.$Message.error('修改失败');
                }
            })
        },
        beforeEditShiftMethod: async function (that) {
            let currentPosition = that.position.current.split('-');
            let currentDistrict = that.formValidate.stationArea.split('-');
            let currentStation = that.formValidate.station.split('-');
            let data = {
                id: that.suiteId,
                dutyName: that.formValidate.dutyName,
                active: that.formValidate.active,
                districtId: parseInt(currentDistrict[0]),
                districtName:currentDistrict[1],
                stationId: parseInt(currentStation[0]),
                stationName: currentStation[1],
                positionId: parseInt(currentPosition[0]), 
                positionName:currentPosition[2],
                maxWorkingHour: that.formValidate.maxWorkingHour,
                minWorkingHour: that.formValidate.minWorkingHour,
                maxWeeklyRestDays: that.formValidate.maxWeeklyRestDays,
                minWeeklyRestDays: that.formValidate.minWeeklyRestDays,
                monthlyWorkingHourLimit: that.formValidate.monthlyWorkingHourLimit,
                yearlyWorkingHourLimit: that.formValidate.yearlyWorkingHourLimit,
                backup: parseInt(currentPosition[1])
            }
            let response = await updateSuites(data);   
                let message = response.meta.message;
                if(response.meta.code === 0){
                    that.info = response.data.dutysuite;
                    that.suites[that.suiteName] =  response.data.dutysuite; 
                    that.$Message.success("编辑班制成功");
                }else{
                    that.$Message.error(message);
                }
        },
        //新增时间段验证
        addTimeSlotMethods: function (name) {
            let arr = this.addTimeValidate.timeSlot;
            for(let i=0;i<arr.length;i++){
                if(arr[i] === ''){
                    this.addTimeValidate.ifTimeSlot = true;
                    $('[element-id="timeSlot"]').addClass('ivu-form-item-error');
                    return;
                } else {
                    $('[element-id="timeSlot"]').removeClass('ivu-form-item-error');
                    this.addTimeValidate.ifTimeSlot = false;
                }
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let that = this;
                   this.$options.methods.beforeAddTimeSlotMethods(that);
                    this.modal.addTimeSlot = false;
                    this.$refs[name].resetFields();
                } else {
                    this.$Message.error('新增失败');
                }
                this.addTimeValidate.timeSlot = [];
                this.addTimeValidate.ifTimeSlot = false;
            })
        },
        beforeAddTimeSlotMethods: async function (that) {
            let currentPosition = that.position.current.split('-');
            let data={
                districtId: that.dutyDistrictId,
                stationId: that.dutyStationId,
                positionId: parseInt(currentPosition[0]),
                suiteId: that.suiteId,
                startTimeStr: that.addTimeValidate.timeSlot[0],
                endTimeStr: that.addTimeValidate.timeSlot[1],
                userCount: that.addTimeValidate.userCount,
            }
            let response = await addPeriod(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                that.$Message.success("新增时间段成功");
                that.onDutyData = response.data.dutyperiodchecking;
                return;
            }else{
                that.$Message.error(message);
            }
        },
        //编辑时间段验证
        editTimeSlotMethods:function(name){
            let arr = this.editTimeValidate.timeSlot;
            for(let i=0;i<arr.length;i++){
                if(arr[i] === ''){
                    this.editTimeValidate.ifTimeSlot = true;
                    $('[element-id="timeSlot"]').addClass('ivu-form-item-error');
                    return;
                } else {
                    $('[element-id="timeSlot"]').removeClass('ivu-form-item-error');
                    this.editTimeValidate.ifTimeSlot = false;
                }
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let that = this;
                    this.$options.methods.beforeEditTimeSlotMethods(that);
                    this.modal.editTimeSlot = false;
                    this.$refs[name].resetFields();
                } else {
                    this.$Message.error('修改失败');
                }
                this.editTimeValidate.timeSlot = [];
                this.editTimeValidate.ifTimeSlot = false;
            })
        },
        beforeEditTimeSlotMethods: async function (that) {
            let currentPosition = that.position.current.split('-');
            let data={
                id: that.currentPeriod,
                districtId: that.dutyDistrictId,
                stationId: that.dutyStationId,
                positionId: parseInt(currentPosition[0]),
                suiteId: that.suiteId,
                startTimeStr: that.editTimeValidate.timeSlot[0],
                endTimeStr: that.editTimeValidate.timeSlot[1],
                userCount: that.editTimeValidate.userCount,
            }
            let response = await updatePeriod(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                that.$Message.success("编辑时间段成功");
                that.onDutyData = response.data.dutyperiodchecking;
                return;
            }else{
                that.$Message.error(message);
             }
        },
        //编辑时间段
        editpeoplenumber:function(index){
            let arry = [];
            this.currentPeriod = this.onDutyData[index].id;
            arry.push(this.onDutyData[index].startTimeStr);
            arry.push(this.onDutyData[index].endTimeStr);
            this.currentIndex=index;
            this.modal.editTimeSlot=true;
            this.editTimeValidate.timeSlot=arry;
            this.editTime=this.onDutyData[index].timeSlot;
            this.editTimeValidate.userCount=this.onDutyData[index].userCount;
        },
        // 删除时间段
        remove2: async function (index) {
            let id = this.onDutyData[index].id;
            let response = await detelePeriod(id);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.$Message.success("删除时间段成功");
                this.onDutyData.splice(index, 1);
                return;
            }else{
                this.$Message.error(message);
            }
        },
        //新增班次验证
        addClassMethods:function(name){
            let that = this;
            let arr = this.addFormValidateClass.timeSlot;
            for(let i=0;i<arr.length;i++){
                if(arr[i]===''){
                    this.addFormValidateClass.ifTimeSlot = true;
                    $('[element-id="timeSlot"]').addClass('ivu-form-item-error');
                    return;
                }else{
                    $('[element-id="timeSlot"]').removeClass('ivu-form-item-error');
                    this.addTimeValidate.ifTimeSlot = false;
                }
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$options.methods.beforeAddClassMethods(that);
                    this.modal.addClass=false
                    this.modal.editShifyClass=false
                    this.$refs[name].resetFields();
                    $(".shiftColor").css("background-color","white");
                } else {
                    this.$Message.error('修改失败');
                }
                this.addFormValidateClass.timeSlot = [];
                this.addFormValidateClass.ifTimeSlot = false;
            })
        },
        beforeAddClassMethods: async function  (that) {
            let currentPosition = that.position.current.split('-');
            let data={
                dutyName: that.addFormValidateClass.dutyName,
                dutyCode: that.addFormValidateClass.dutyCode,
                districtId: that.dutyDistrictId,
                districtName: that.dutyDistrictName,
                stationId: that.dutyStationId,
                stationName: that.dutyStationName,
                restMinutes: that.addFormValidateClass.restMinutes,
                positionId: parseInt(currentPosition[0]),
                backup: parseInt(currentPosition[1]),
                positionName:currentPosition[2],
                suiteId: that.suiteId,
                userCount: that.addFormValidateClass.userCount,
                classColor: $(".shiftColor").css('background-color'),
                startTimeStr: that.addFormValidateClass.timeSlotBegin,
                endTimeStr: that.addFormValidateClass.timeSlotEnd,
                workingLength: that.addFormValidateClass.workingLength,
            }
             let dataBegin={
                dutyName: that.addFormValidateClass.dutyName,
                dutyCode: that.addFormValidateClass.dutyCode,
                districtId: that.dutyDistrictId,
                districtName: that.dutyDistrictName,
                stationId: that.dutyStationId,
                stationName: that.dutyStationName,
                restMinutes: that.addFormValidateClass.restMinutes,
                relevantClassId: that.CurrentRelevantClassId,
                positionId: parseInt(currentPosition[0]),
                backup: parseInt(currentPosition[1]),
                positionName:currentPosition[2],
                suiteId: that.suiteId,
                userCount: that.addFormValidateClass.userCount,
                classColor: $(".shiftColor").css('background-color'),
                startTimeStr: that.addFormValidateClass.timeSlotBegin,
                endTimeStr: '24:00',
                workingLength: that.addFormValidateClass.workingLength,
            }
            let dataEnd={
                dutyName: '下夜班',
                dutyCode: that.addFormValidateClass.dutyCode,
                districtId: that.dutyDistrictId,
                districtName: that.dutyDistrictName,
                stationId: that.dutyStationId,
                stationName: that.dutyStationName,
                restMinutes: that.addFormValidateClass.restMinutes,
                positionId: parseInt(currentPosition[0]),
                backup: parseInt(currentPosition[1]),
                positionName:currentPosition[2],
                suiteId: that.suiteId,
                userCount: that.addFormValidateClass.userCount,
                classColor: $(".shiftColor").css('background-color'),
                startTimeStr: '00:00',
                endTimeStr: that.addFormValidateClass.timeSlotEnd,
                workingLength: that.addFormValidateClass.workingLength,
            }
            let beginTime = that.addFormValidateClass.timeSlotBegin.split(':');
            let endTime = that.addFormValidateClass.timeSlotEnd.split(':');
            let arrBegin = [];
            let arrEnd = [];
            arrBegin.push(parseInt(beginTime[0]));
            arrBegin.push(parseInt(beginTime[1]));
            arrEnd.push(parseInt(endTime[0]));
            arrEnd.push(parseInt(endTime[1]));
            let response = {};
            if (arrBegin[0]==arrEnd[0] && arrBegin[0]>arrEnd[0]){
                let result = await addClass(dataEnd);
                 if(result.meta.code === 0){
                    dataBegin.relevantClassId = result.data.dutyclass[result.data.dutyclass.length-1].id;
                    response = await addClass(dataBegin);
                }else{
                    that.$Message.error(message);
                }
            }else if (arrBegin[0]==arrEnd[0] && arrBegin[0]==arrEnd[0]){
                let result = await addClass(dataEnd);
                if(result.meta.code === 0){
                    dataBegin.relevantClassId = result.data.dutyclass[result.data.dutyclass.length-1].id;
                    response = await addClass(dataBegin);
                }else{
                    that.$Message.error(message);
                }
            }else if (arrBegin[0]>arrEnd[0]){
                let result = await addClass(dataEnd);
                 if(result.meta.code === 0){
                    dataBegin.relevantClassId = result.data.dutyclass[result.data.dutyclass.length-1].id;
                    response = await addClass(dataBegin);
                }else{
                    that.$Message.error(message);
                };
            }else {
                 response = await addClass(data);
            }
            let message = response.meta.message;
             if(response.meta.code === 0){
                 that.$Message.success("新增班次成功");
                 that.shiftData = response.data.dutyclass;
                return;
            }else{
                that.$Message.error(message);
            }
        },
        //编辑班次验证提交
        editShifyClassMethods:function(name){
             let arr = this.editFormValidateClass.timeSlot;
             for(let i=0;i<arr.length;i++){
                if(arr[i]===''){
                    this.editFormValidateClass.ifTimeSlot = true;
                    $('[element-id="timeSlot"]').addClass('ivu-form-item-error');
                    return;
                }else{
                    $('[element-id="timeSlot"]').removeClass('ivu-form-item-error');
                    this.addTimeValidate.ifTimeSlot = false;
                }
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let that = this;
                    this.$options.methods.beforeEditShifyClassMethods(that);
                    this.modal.addClass=false
                    this.modal.editShifyClass=false
                    this.$refs[name].resetFields();
                    $(".shiftColor").css("background-color","white");
                } else {
                    this.$Message.error('修改失败');
                }
                this.editFormValidateClass.timeSlot = [];
                this.editFormValidateClass.ifTimeSlot = false;
            })
        },
        beforeEditShifyClassMethods: async function (that) {
            this.currentIndex
                let currentPosition = that.position.current.split('-');
                let data={
                    id: that.classId,
                    dutyName: that.editFormValidateClass.dutyName,
                    dutyCode: that.editFormValidateClass.dutyCode,
                    districtId: that.dutyDistrictId,
                    districtName: that.dutyDistrictName,
                    stationId: that.dutyStationId,
                    stationName: that.dutyStationName,
                    restMinutes: that.editFormValidateClass.restMinutes,
                    relevantClassId: that.editFormValidateClass.relevantClassId,
                    positionId: parseInt(currentPosition[0]),
                    backup: parseInt(currentPosition[1]),
                    positionName:currentPosition[2],
                    suiteId: that.suiteId,
                    userCount: that.editFormValidateClass.userCount,
                    classColor: $(".shiftColor").css('background-color'),
                    startTimeStr: that.editFormValidateClass.timeSlotBegin,
                    endTimeStr: that.editFormValidateClass.timeSlotEnd,
                    workingLength: that.editFormValidateClass.workingLength,
                    restMinutes: that.editFormValidateClass.restMinutes,
                }
                let response = await updateClass(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                that.$Message.success("编辑班次成功");
                that.shiftData = response.data.dutyclass;
                return;
                }else{
                    that.$Message.error(message);
                }
        },
        //编辑班制
        beforeEditShift: function () {
            let obj = this.info; 
            for(let key in obj){
                this.formValidate[key] = obj[key];
            }
            this.modal.editShift = true;
        },
        //编辑班次
        edite: function(index){
            this.currentIndex=index;
            this.classId= this.shiftData[index].id;
            this.modal.editShifyClass=true;
            this.editFormValidateClass.dutyName = this.shiftData[index].dutyName;
            this.editFormValidateClass.dutyCode = this.shiftData[index].dutyCode;
            this.editFormValidateClass.workingLength = this.shiftData[index].workingLength;
            this.editFormValidateClass.restMinutes = this.shiftData[index].restMinutes;
            this.editFormValidateClass.relevantClassId = this.shiftData[index].relevantClassId;
            this.editFormValidateClass.userCount = this.shiftData[index].userCount;
            var color=this.shiftData[index].classColor;
            this.editFormValidateClass.timeSlotEnd = this.shiftData[index].endTimeStr
            this.editFormValidateClass.timeSlotBegin = this.shiftData[index].startTimeStr
            $(".shiftColor").css("background-color",color);
        },
        // 删除班次
        remove1:async function (index) {
            let id = this.shiftData[index].id;
            let suiteId = this.suiteId;
            let response = await deteleClass(id,suiteId);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.$Message.success("删除班次成功");
                this.shiftData = response.data.dutyclass;
            return;
            }else{
                this.$Message.error(message);
            }
        },
        del:function(){
            this.modal3=false;
        },
        //  选择时间段
        selectTime: function (arr) {
            if(arr[1] === ''){
                arr = [];
            }
            this.addTimeValidate.timeSlot = arr;
        },
        handleCancel: function (name) {
            this.$refs[name].resetFields();
            this.addTimeValidate.ifTimeSlot = false;
            $('[element-id="timeSlot"]').removeClass('ivu-form-item-error');
            $(".shiftColor").css("background-color","white");
        },
        handleCancelTime:function(name){
            this.$refs[name].resetFields();
            this.addTimeValidate.ifTimeSlot = false;
            $('[element-id="timeSlot"]').removeClass('ivu-form-item-error');
            $(".shiftColor").css("background-color","white");
        },
        //  图表
        initEchart: function () {
            let myChart = echarts.init(document.getElementById('echart'));
            let arr = [];
            for(let i=1;i<=24;i++){
                let str = i<10 ? '0'+i+':00' : i+':00'
                arr.push(str);
            }
            // 指定图表的配置项和数据
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['值班人数表','班次表']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: arr
                },
                yAxis: {
                    type: 'value',
                    splitLine:{show: false}
                },
                series: [
                    {
                        name:'值班人数表',
                        type:'line',
                        data: this.countOnDutyNum(this.onDutyData)
                    },
                    {
                        name: '班次表',
                        type: 'line',
                        data: this.countOnDutyNum(this.shiftData)
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表
            myChart.setOption(option, true);
            this.showEchart = true;
        },
        //  计算各时间段值班人数
        countOnDutyNum: function (array) {
            let map = new Map();
            for(var i=1;i<=24;i++){
                map.set(i, 0);
            }
            for(let obj of array){
                let arr = [];
                arr.push(obj.startTimeStr);
                arr.push(obj.endTimeStr);
                let n = obj.userCount;
                if(arr[1]<arr[0]){
                    for(let i = parseInt(arr[0])+1;i<=24;i++){
                        map.set(i, map.get(i)+n);
                    }
                    for(let i=1;i<=parseInt(arr[1]);i++){
                        map.set(i, map.get(i)+n);
                    }
                } else {
                    for(let i=parseInt(arr[0])+1;i<=parseInt(arr[1]);i++){
                        map.set(i, map.get(i)+n);
                    }
                }
            }
            let arr = [];
            for(let i=1;i<=24;i++){
                arr.push(map.get(i));
            }
            return arr;
        },
        //新增班制
        addShift:  function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let that=this;
                    this.$options.methods.beforeAddShift(that);
                    this.modal.addShift=false;
                    this.$refs[name].resetFields();
                } else {
                    this.$Message.error('新增班制失败');
                    return false;
                }
            })
        },
        beforeAddShift:async function(that){
            let currentPosition = that.position.current.split('-');
            let currentDistrict = that.addFormValidate.stationArea.split('-');
            let currentStation = that.addFormValidate.station.split('-');
            let data = {
                dutyName: that.addFormValidate.dutyName,
                active: that.addFormValidate.active,
                districtId: parseInt(currentDistrict[0]),
                districtName:currentDistrict[1],
                stationId: parseInt(currentStation[0]),
                stationName: currentStation[1],
                positionId: parseInt(currentPosition[0]), 
                positionName:currentPosition[2],
                maxWorkingHour: that.addFormValidate.maxWorkingHour,
                minWorkingHour: that.addFormValidate.minWorkingHour,
                maxWeeklyRestDays: that.addFormValidate.maxWeeklyRestDays,
                minWeeklyRestDays: that.addFormValidate.minWeeklyRestDays,
                monthlyWorkingHourLimit: that.addFormValidate.monthlyWorkingHourLimit,
                yearlyWorkingHourLimit: that.addFormValidate.yearlyWorkingHourLimit,
                backup: parseInt(currentPosition[1])
            }
            let response = await addSuites(data);   
                let message = response.meta.message;
                if(response.meta.code === 0){
                    if (that.suites.length===0){
                        that.suites.push(response.data.dutysuite);
                        that.dutyDistrictId = response.data.dutysuite.districtId,
                        that.dutyDistrictName = response.data.dutysuite.districtName,
                        that.dutyStationId  = response.data.dutysuite.stationId,
                        that.dutyStationName = response.data.dutysuite.stationName,
                        that.suiteId = response.data.dutysuite.id
                    }else{
                        that.suites.push(response.data.dutysuite);
                    }
                    // 显示班制内容
                      let obj = that.suites[0]; 
                        for(let key in obj){
                        that.info[key] = obj[key];
                        }
                    that.$Message.success("新增班制成功");
                }else{
                    that.$Message.error(message);
                }
        },
        //班次选择颜色
        getBackColor:function(){
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var backgroundColor=target.getAttribute("value");
            $(".shiftColor").css("background-color",backgroundColor);
        },
        //取得工时
        getsectionTime:function(){
            if (this.addFormValidateClass.timeSlotBegin && this.addFormValidateClass.timeSlotEnd){
                let beginTime=parseInt(this.addFormValidateClass.timeSlotBegin.split(":")[0])*60+parseInt(this.addFormValidateClass.timeSlotBegin.split(":")[1]);
                let endTime=parseInt(this.addFormValidateClass.timeSlotEnd.split(":")[0])*60+parseInt(this.addFormValidateClass.timeSlotEnd.split(":")[1]);
                let total=0;
                if (endTime>beginTime){
                    total=endTime-beginTime;
                }else if (endTime<beginTime) {
                    total=endTime-beginTime+1440;
                }
                let totalTime='';
                let totalHour;
                let totalMinute;
                if(total>0){
                    totalHour=parseInt(total/60);
                    totalMinute=total%60;
                    totalTime=totalHour+'小时'+totalMinute+'分钟';
                }else{
                    totalTime=0+'小时'+0+'分钟';
                }
                this.addFormValidateClass.workingLength=totalTime;
            }
            
        },
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>