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
                    <!--不同班制button位置-->
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
                            <div class="title">
                                <b>24小时值班人数表</b>
                                <div class="btn-group">
                                    <a class="btnDefault bgGreen" @click="modal.addTimeSlot=true">新增时间段</a>
                                    <a class="btnDefault bgGreen" @click="modal3=true">方案验算</a>
                                </div>
                            </div>
                            <Table :columns="columns2" :data="data2"></Table>
                        </div>
                        <!--班次表-->
                        <div class="banciform">
                            <div class="title">
                                <b>班次表</b>
                                <div class="btn-group">
                                    <a class="btnDefault bgGreen" @click="modal.addClass=true">新增班次</a>
                                </div>
                            </div>
                            <Table :columns="columns1" :data="data1"></Table>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane label="标签二" name="name2">标签二的内容</TabPane>
            <TabPane label="标签三" name="name3">标签三的内容</TabPane>
        </Tabs>
        <!--方案验算-->
        <Modal
            v-model="modal3"
            title="方案验算">
            <Form :label-width="90">
                <FormItem label="每日总工时" prop="totalHours">
                    <span>45小时</span>
                </FormItem>
                <FormItem label="总排班人数" prop="totalPerson" required>
                    <Input placeholder="请输入排班总人数" width="200"/>
                    <Button type="primary">开始验算</Button>
                </FormItem>
            </Form>
        </Modal>
        <!-- 新增班次表 -->
        <Modal title="新增班次"
               v-model="modal.addClass"
                @on-ok="handleSubmit1('addFormValidateClass')"
               @on-cancel="handleCancel('formValidate')"
               :loading="true"
            >
            <Form ref="addFormValidateClass" :model="addFormValidateClass" :label-width="80">
                <FormItem label="班次名称" prop="name" :rules="{required:true,message:'班次名称不能为空'}">
                    <Input v-model="addFormValidateClass.name" placeholder=""/>
                </FormItem>
                <FormItem label="起止时间" prop="starttime" :rules="{required:true,message:'起止时间不能为空'}">
                    <Input v-model="addFormValidateClass.starttime" placeholder=""/>
                </FormItem>
                <FormItem label="本班工时" prop="shifttime" :rules="{required:true,message:'本班工时不能为空'}">
                    <Input v-model="addFormValidateClass.shifttime" placeholder=""/>
                </FormItem>
                <FormItem label="班次间隔" prop="shiftspace" :rules="{required:true,message:'班次间隔不能为空'}">
                    <Input v-model="addFormValidateClass.shiftspace" placeholder=""/>
                </FormItem>
                <FormItem label="班次关联" prop="shiftrele" :rules="{required:true,message:'班次关联不能为空'}">
                    <Input v-model="addFormValidateClass.shiftrele" placeholder=""/>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople" :rules="{required:true,message:'值班人数不能为空'}">
                    <Input v-model="addFormValidateClass.shiftpeople" placeholder=""/>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑班次表 -->
        <Modal title="编辑班次"
               v-model="modal.editShifyClass"
               :loading="true"
               @on-ok="handleSubmit1('formValidate1')"
                >
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
                <FormItem label="班次名称" prop="name">
                    <Input v-model="formValidate1.name" placeholder=""/>
                </FormItem>
                <FormItem label="起止时间" prop="starttime">
                    <Input v-model="formValidate1.starttime" placeholder=""/>
                </FormItem>
                <FormItem label="本班工时" prop="shifttime">
                    <Input v-model="formValidate1.shifttime" placeholder=""/>
                </FormItem>
                <FormItem label="班次间隔" prop="shiftspace">
                    <Input v-model="formValidate1.shiftspace" placeholder=""/>
                </FormItem>
                <FormItem label="班次关联" prop="shiftrele">
                    <Input v-model="formValidate1.shiftrele" placeholder=""/>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople">
                    <Input v-model="formValidate1.shiftpeople" placeholder=""/>
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
                        <Option value="">西直门</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station">
                    <Select v-model="formValidate.station" placeholder="请选择">
                        <Option value="">西直门</Option>
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
                        <Option value="">西直门</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station" :rules="{required:true,message:'站点不能为空'}">
                    <Select v-model="addFormValidate.station" placeholder="请选择">
                        <Option value="">西直门</Option>
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
    export default {
        data:function () {
            return {
                modal3:false,
                modal: {
                    editShift:false,
                    addShift:false,
                    addTimeSlot:false,
                    editTimeSlot:false,
                    addShifyClass:false,
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
                        label: '站区长'
                    },
                    {
                        value: '3',
                        label: '替班员'
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
                addTimeValidate:{
                    timeSlot: [],
                    shiftpeople: '2',
                    ifTimeSlot: false
                },
                formValidate1:{
                    name:'',
                    starttime:'',
                    shifttime:'',
                    shiftspace:'',
                    shiftrele:'',
                    shiftpeople:"2"
                },
                addFormValidateClass:{
                    name:'',
                    starttime:'',
                    shifttime:'',
                    shiftspace:'',
                    shiftrele:'',
                    shiftpeople:"2"
                },
                //    编辑班制弹框
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
                //    新增时间段弹框
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
                    starttime: [
                        { required: true, message: '起止时间不能为空', trigger: 'blur' }
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
                columns1:[
                       {
                           title: '班制名称',
                           align: 'center',
                           key: 'name'
                       },
                       {
                           title: '起止时间',
                           align: 'center',
                           key: 'starttime'
                       },
                       {
                           title: '本班工时',
                           align: 'center',
                           key: 'shifttime'
                       },
                       {
                           title: '班次间隔',
                           align: 'center',
                           key: 'shiftspace'
                       },
                       {
                           title: '班次关联',
                           align: 'center',
                           key: 'shiftrele'
                       },
                       {
                           title: '值班人数',
                           align: 'center',
                           key: 'shiftpeople'
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
                data1:[
                    {
                    name:"早班",
                    starttime:"07:00-14:00",
                    shifttime:"7小时",
                    shiftspace:"12.0",
                    shiftrele:"",
                    shiftpeople:"4"
                },
                    {
                        name:"晚班",
                        starttime:"14:00-21:00",
                        shifttime:"7小时",
                        shiftspace:"12.0",
                        shiftrele:"",
                        shiftpeople:"1"
                    },
                    {
                        name:"白班",
                        starttime:"07:00-17:00",
                        shifttime:"7小时",
                        shiftspace:"12.0",
                        shiftrele:"",
                        shiftpeople:"1"
                    },
                ],
                columns2: [
                    {
                        title: '时间段',
                        align: 'center',
                        key: 'timeduan'
                    },
                    {
                        title: '值班人数',
                        align: 'center',
                        key: 'shiftpeople'
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
                data2:[
                    {
                    timeduan:"07:00-14:00",
                    shiftpeople:"4"
                },
                    {
                        timeduan:"14:00-21:00",
                        shiftpeople:"2"
                    }
                ]
            }
        },
        methods:{
            chiocepost: function(){

            },
            editShift: function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            addShift:function(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                        return false;
                    }
                })
            },
            handleCancelAdd:function(){

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
                        
                    } else {
                        this.$Message.error('修改失败');
                    }
                    this.addTimeValidate.timeSlot = [];
                    this.addTimeValidate.ifTimeSlot = false;
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
            remove:function (index) {
                this.data1.splice(index, 1);
            },
            editpeoplenumber:function(){
                this.modal.editTimeSlot=true;
            },
            remove2:function (index) {
                this.data2.splice(index, 1);
            },
            edite:function(){
                this.modal.editShifyClass=true
            },
            remove1:function (index) {
                this.data1.splice(index, 1);
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
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>