<template>
    <div class="container">
        <div class="content-header">
            <Select v-model="modelpost" placeholder="请选择岗位" style="width:200px;margin: 0px 0px 4px 20px " :on-change="chiocepost">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <a class="btnDefault bgGreen" @click="modal.addShift=true" >新增班制</a>
        </div>
        <Tabs value="name1" :animated="false">
            <TabPane label="西直门五班制" name="name1">
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
                                    <span>{{info.name}}</span>
                                </li>
                                <li>
                                    <label>站区：</label>
                                    <span>{{info.stationArea}}</span>
                                </li>
                                <li>
                                    <label>站点：</label>
                                    <span>{{info.station}}</span>
                                </li>
                                <li>
                                    <label>周工时下限：</label>
                                    <span>{{info.minWeekHours}}</span>
                                </li>
                                <li>
                                    <label>周工时上限：</label>
                                    <span>{{info.maxWeekHours}}</span>
                                </li>
                                <li>
                                    <label>每周最少休班：</label>
                                    <span>{{info.minWeekOffDuty}}</span>
                                </li>
                                <li>
                                    <label>每周最多休班：</label>
                                    <span>{{info.maxWeekOffDuty}}</span>
                                </li>
                                <li>
                                    <label>月工时上限：</label>
                                    <span>{{info.maxMonthOffDuty}}</span>
                                </li>
                                <li>
                                    <label>年工时上限：</label>
                                    <span>{{info.maxYearOffDuty}}</span>
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
                            <Table :columns="shiftColumns" :data="shiftData"></Table>
                        </div>
                    </div>
                    
                </div>
            </TabPane>
            <TabPane label="标签二" name="name2">标签二的内容</TabPane>
            <TabPane label="标签三" name="name3">标签三的内容</TabPane>
        </Tabs>
        <!-- 新增班次表 -->
        <Modal title="新增班次"
               v-model="modal.addClass"
                @on-ok="handleSubmit('addFormValidateClass')"
               @on-cancel="handleCancel('addFormValidateClass')"
               :loading="true"
            >
            <Form ref="addFormValidateClass" :model="addFormValidateClass" :rules="ruleValidate1" :label-width="80">
                <FormItem label="班次名称" prop="name">
                    <Input v-model="addFormValidateClass.name" placeholder=""/>
                </FormItem>
                <FormItem label="起止时间" prop="timeSlot"element-id="timeSlot">
                    <TimePicker  v-model="addFormValidateClass.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm"></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="addFormValidateClass.ifTimeSlot">时间段不能为空</div>
                </FormItem>
                <FormItem label="本班工时" prop="shifttime">
                    <Input v-model="addFormValidateClass.shifttime" placeholder=""/>
                </FormItem>
                <FormItem label="班次间隔" prop="shiftspace">
                    <Input v-model="addFormValidateClass.shiftspace" placeholder=""/>
                </FormItem>
                <FormItem label="班次关联" prop="shiftrele">
                    <Input v-model="addFormValidateClass.shiftrele" placeholder=""/>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople">
                    <Input v-model="addFormValidateClass.shiftpeople" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑班次表 -->
        <Modal title="编辑班次"
               v-model="modal.editShifyClass"
               :loading="true"
               @on-ok="handleSubmit('addFormValidateClass')"
               @on-cancel="handleCancel('addFormValidateClass')"
                >
            <Form ref="addFormValidateClass" :model="addFormValidateClass" :rules="ruleValidate1" :label-width="80">
                <FormItem label="班次名称" prop="name">
                    <Input v-model="addFormValidateClass.name" placeholder=""/>
                </FormItem>
                <FormItem label="起止时间" prop="timeSlot" element-id="timeSlot">
                    <TimePicker  v-model="addFormValidateClass.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm"></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="addFormValidateClass.ifTimeSlot">时间段不能为空</div>
                </FormItem>
                <FormItem label="本班工时" prop="shifttime">
                    <Input v-model="addFormValidateClass.shifttime" placeholder=""/>
                </FormItem>
                <FormItem label="班次间隔" prop="shiftspace">
                    <Input v-model="addFormValidateClass.shiftspace" placeholder=""/>
                </FormItem>
                <FormItem label="班次关联" prop="shiftrele">
                    <Input v-model="addFormValidateClass.shiftrele" placeholder=""/>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople">
                    <Input v-model="addFormValidateClass.shiftpeople" placeholder=""/>
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
                <FormItem label="班制名称：" prop="name">
                    <Input v-model="formValidate.name" placeholder=""/>
                </FormItem>
                <FormItem label="站区：" prop="stationArea">
                    <Select v-model="formValidate.stationArea" placeholder="请选择">
                        <Option value="xizhimen">西直门</Option>
                        <Option value="chegongzhuang">车公庄</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station">
                    <Select v-model="formValidate.station" placeholder="请选择">
                        <Option value="xizhimenstation">西直门</Option>
                    </Select>
                </FormItem>
                <FormItem label="周工时下限：" prop="minWeekHours">
                    <Input v-model="formValidate.minWeekHours" placeholder=""/>
                </FormItem>
                <FormItem label="周工时上限：" prop="maxWeekHours">
                    <Input v-model="formValidate.maxWeekHours" placeholder=""/>
                </FormItem>
                <FormItem label="每周最少休班：" prop="minWeekOffDuty">
                    <Input v-model="formValidate.minWeekOffDuty" placeholder=""/>
                </FormItem>
                <FormItem label="每周最多休班：" prop="maxWeekOffDuty">
                    <Input v-model="formValidate.maxWeekOffDuty" placeholder=""/>
                </FormItem>
                <FormItem label="月工时上限：" prop="maxMonthOffDuty">
                    <Input v-model="formValidate.maxMonthOffDuty" placeholder=""/>
                </FormItem>
                <FormItem label="年工时上限：" prop="maxYearOffDuty">
                    <Input v-model="formValidate.maxYearOffDuty" placeholder=""/>
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
                <FormItem label="班制名称：" prop="name" :rules="{required:true,message:'班制名称不能为空'}">
                    <Input v-model="addFormValidate.name" placeholder=""/>
                </FormItem>
                <FormItem label="站区：" prop="stationArea" :rules="{required:true,message:'站区不能为空'}">
                    <Select v-model="addFormValidate.stationArea" placeholder="请选择">
                        <Option value="xizhimenstation">西直门</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station" :rules="{required:true,message:'站点不能为空'}">
                    <Select v-model="addFormValidate.station" placeholder="请选择">
                        <Option value="xizhimen">西直门</Option>
                    </Select>
                </FormItem>
                <FormItem label="周工时下限：" prop="minWeekHours" :rules="{required:true,message:'周工时下限不能为空不能为空'}">
                    <Input v-model="addFormValidate.minWeekHours" placeholder=""/>
                </FormItem>
                <FormItem label="周工时上限：" prop="maxWeekHours" :rules="{required:true,message:'周工时上限不能为空'}">
                    <Input v-model="addFormValidate.maxWeekHours" placeholder=""/>
                </FormItem>
                <FormItem label="每周最少休班：" prop="minWeekOffDuty" :rules="{required:true,message:'每周最少休班不能为空'}">
                    <Input v-model="addFormValidate.minWeekOffDuty" placeholder=""/>
                </FormItem>
                <FormItem label="每周最多休班：" prop="maxWeekOffDuty" :rules="{required:true,message:'每周最多休班不能为空'}">
                    <Input v-model="addFormValidate.maxWeekOffDuty" placeholder=""/>
                </FormItem>
                <FormItem label="月工时上限：" prop="maxMonthOffDuty" :rules="{required:true,message:'月工时上限不能为空'}">
                    <Input v-model="addFormValidate.maxMonthOffDuty" placeholder=""/>
                </FormItem>
                <FormItem label="年工时上限：" prop="maxYearOffDuty" :rules="{required:true,message:'年工时上限不能为空'}">
                    <Input v-model="addFormValidate.maxYearOffDuty" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!-- 新增时间段 -->
        <Modal title="新增时间段"
            v-model="modal.addTimeSlot"
            :loading="true"
            @on-ok="handleSubmit2('addTimeValidate')"
            @on-cancel="handleCancel('addTimeValidate')">
            <Form ref="addTimeValidate" :model="addTimeValidate" :rules="ruleAddTimeValidate" :label-width="80">
                <FormItem label="时间段" prop="timeSlot" element-id="timeSlot">
                    <TimePicker  v-model="addTimeValidate.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm"></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="addTimeValidate.ifTimeSlot">时间段不能为空</div>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople">
                    <Input v-model="addTimeValidate.shiftpeople" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!--编辑时间段-->
        <Modal title="编辑时间段"
               v-model="modal.editTimeSlot"
               :loading="true"
               @on-ok="handleSubmit2('addTimeValidate')"
               @on-cancel="handleCancel('addTimeValidate')">
            <Form ref="addTimeValidate" :model="addTimeValidate" :rules="ruleAddTimeValidate" :label-width="80">
                <FormItem label="时间段" prop="timeSlot" element-id="timeSlot">
                    <TimePicker  v-model="addTimeValidate.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm"></TimePicker>
                    <div class="ivu-form-item-error-tip" v-if="addTimeValidate.ifTimeSlot">时间段不能为空</div>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople">
                    <Input v-model="addTimeValidate.shiftpeople" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script >
let echarts = require('echarts');
export default {
    data:function () {
        return {
            modal3:false,
            modal: {
                editShift:false,
                addShift:false,
                addTimeSlot:false,
                editTimeSlot:false,
                editShifyClass:false,
                addClass:false
            },
            cityList: [
                {
                    value: '1',
                    label: '站务员'
                },
                {
                    value: '2',
                    label: '管理员'
                },
                {
                    value: '3',
                    label: '站务员'
                },
                {
                    value: '4',
                    label: '值班站长'
                }
            ],
            info: {
                name: '西直门替班员',
                stationArea: '西直门',
                station: '西直门',
                minWeekHours: 30,
                maxWeekHours: 40,
                minWeekOffDuty: 1, 
                maxWeekOffDuty: 1, 
                maxMonthOffDuty: 180,
                maxYearOffDuty: 2000                 

            },
            modelpost:"",
            formValidate: {
                name: '',
                stationArea: '',
                station:'',
                minWeekHours:'',
                maxWeekHours:'',
                minWeekOffDuty:'',
                maxWeekOffDuty:'',
                maxMonthOffDuty:'',
                maxYearOffDuty:''
            },
            addTimeValidate:{
                timeSlot: [],
                shiftpeople: '',
                ifTimeSlot: false
            },
            addFormValidateClass:{
                timeSlot: [],
                name:'',
                shifttime:'',
                shiftspace:'',
                shiftrele:'',
                shiftpeople:"",
                ifTimeSlot:false
            },
            addFormValidate:{
                name: '',
                stationArea: '',
                station:'',
                minWeekHours:'',
                maxWeekHours:'',
                minWeekOffDuty:'',
                maxWeekOffDuty:'',
                maxMonthOffDuty:'',
                maxYearOffDuty:''
            },
            //  新增班制弹框
            ruleValidate: {
                name: [
                    { required: true, message: '班制名称不能为空', trigger: 'blur' }
                ],
                stationArea: [
                    { required: true, message: '站区不能为空', trigger: 'change' }
                ],
                station: [
                    { required: true, message: '站点不能为空', trigger: 'change' }
                ],
                minWeekHours: [
                    { required: true, message: '周工时下限不能为空', trigger: 'blur' }
                ],
                maxWeekHours: [
                    { required: true, message: '周工时上限不能为空', trigger: 'blur' }
                ],
                minWeekOffDuty: [
                    { required: true, message: '每周最少修班不能为空', trigger: 'blur' }
                ],
                maxWeekOffDuty: [
                    { required: true, message: '每周最多休班不能为空', trigger: 'blur' }
                ],
                maxMonthOffDuty: [
                    { required: true, message: '月工时上限不能为空', trigger: 'blur' }
                ],
                maxYearOffDuty: [
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
                name: [
                    { required: true, message: '班次名称不能为空', trigger: 'blur' }
                ],
                shifttime: [
                    { required: true, message: '本班工时不能为空', trigger: 'blur' }
                ],
                shiftspace: [
                    { required: true, message: '班次间隔不能为空', trigger: 'blur' }
                ],
                shiftrele: [
                    { required: true, message: '班次关联不能为空', trigger: 'blur' }
                ],
                shiftpeople: [
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
            shiftColumns: [
                    {
                        title: '班制名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '起止时间',
                        align: 'center',
                        key: 'timeSlot'
                    },
                    {
                        title: '本班工时',
                        align: 'center',
                        key: 'shiftHours'
                    },
                    {
                        title: '班次间隔',
                        align: 'center',
                        key: 'shiftSpace'
                    },
                    {
                        title: '班次关联',
                        align: 'center',
                        key: 'shiftRele'
                    },
                    {
                        title: '值班人数',
                        align: 'center',
                        key: 'shiftPeople'
                    },
                    {
                        title: '每周最多休班',
                        align: 'center',
                        key: 'maxWeekdayOff'
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
                {name: '早班', timeSlot: '07:00-14:00', shiftTime: '7小时', shiftSpace: '12小时', shiftRele: '--', shiftPeople: 4, maxWeekdayOff: '2天'},
                {name: '晚班', timeSlot: '14:00-21:00', shiftTime: '7小时', shiftSpace: '12小时', shiftRele: '--', shiftPeople: 1, maxWeekdayOff: '2天'},
                {name: '白班', timeSlot: '07:00-17:00', shiftTime: '10小时', shiftSpace: '12小时', shiftRele: '--', shiftPeople: 1, maxWeekdayOff: '2天'}
            ],
            onDutyColumns: [
                {
                    title: '时间段',
                    align: 'center',
                    key: 'timeSlot'
                },
                {
                    title: '值班人数',
                    align: 'center',
                    key: 'shiftPeople'
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
                {timeSlot:"00:00-07:00", shiftPeople: 2 },
                {timeSlot:"07:00-09:00", shiftPeople: 8 },
                {timeSlot:"09:00-11:00", shiftPeople: 4 },
                {timeSlot:"11:00-13:00", shiftPeople: 4 },
                {timeSlot:"13:00-17:00", shiftPeople: 4 },
                {timeSlot:"17:00-19:00", shiftPeople: 4 },
                {timeSlot:"19:00-24:00", shiftPeople: 2 },
            ],
            showEchart: false
        }
    },
    methods:{
        chiocepost: function(){

        },
        editShift: function (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('修改成功');
                    this.$refs[name].resetFields();
                    this.modal.editShift=false;
                } else {
                    this.$Message.error('修改失败');
                }
            })
        },
        handleSubmit2: function (name) {
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
                    this.$Message.success('修改成功');
                    this.modal.addTimeSlot = false;
                    this.$refs[name].resetFields();


                } else {
                    this.$Message.error('修改失败');
                }
                this.addTimeValidate.timeSlot = [];
                this.addTimeValidate.ifTimeSlot = false;
            })
        },
        handleSubmit:function(name){
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
                    this.$Message.success('修改成功');
                    this.modal.addClass=false
                    this.modal.editShifyClass=false
                    this.$refs[name].resetFields();

                } else {
                    this.$Message.error('修改失败');
                }
                this.addFormValidateClass.timeSlot = [];
                this.addFormValidateClass.ifTimeSlot = false;
            })
        },
        handleSubmit1: function (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('修改成功');
                } else {
                    this.$Message.error('修改失败');
                }
            })
        },
        beforeEditShift: function () {
            let obj = this.info; 
            for(let key in obj){
                this.formValidate[key] = obj[key];
            }
            this.modal.editShift = true;
        },
        editpeoplenumber:function(){
            this.modal.addTimeSlot=true;
        },
        remove2:function (index) {
            this.onDutyData.splice(index, 1);
        },
        edite:function(){
            this.modal.editShifyClass=true
        },
        remove1:function (index) {
            this.shiftData.splice(index, 1);
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
                let arr = obj.timeSlot.split('-');
                let n = obj.shiftPeople;
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
        addShift:function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('修改成功');
                    this.$refs[name].resetFields();
                    this.modal.addShift=false;
                } else {
                    this.$Message.error('修改失败');
                    return false;
                }
            })
        }
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>