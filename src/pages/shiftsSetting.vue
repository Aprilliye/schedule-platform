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
                            <p class="title">
                                <b>班制表</b>
                            </p>
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
                                <li>
                                    <a class="btnDefault bgGreen" href="javascript:;" @click="beforeEditShift">编辑班制</a>
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
                                    <a class="btnDefault bgGreen" @click="modal1=true">新增班次</a>
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
            <p>每日总工时:&nbsp;&nbsp;&nbsp;<span>45小时</span></p>
            <p>总排班人数:&nbsp;&nbsp;&nbsp;<input><Button type="primary" style="margin-left: 10px">开始验算</Button></p>
            <div slot="footer">
                <Button type="primary"  @click="del">确定</Button>
            </div>
        </Modal>
        <!-- 编辑班次表 -->
        <Modal title="编辑"
            v-model="modal1"
            @on-ok="handleSubmit1('formValidate1')"
            >
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
                <FormItem label="班次名称" prop="name">
                    <Input v-model="formValidate1.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="起止时间" prop="starttime">
                    <Input v-model="formValidate1.starttime" placeholder=""></Input>
                </FormItem>
                <FormItem label="本班工时" prop="shifttime">
                    <Input v-model="formValidate1.shifttime" placeholder=""></Input>
                </FormItem>
                <FormItem label="班次间隔" prop="shiftspace">
                    <Input v-model="formValidate1.shiftspace" placeholder=""></Input>
                </FormItem>
                <FormItem label="班次关联" prop="shiftrele">
                    <Input v-model="formValidate1.shiftrele" placeholder=""></Input>
                </FormItem>
                <FormItem label="值班人数" prop="shiftpeople">
                    <Input v-model="formValidate1.shiftpeople" placeholder=""></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑班制 -->
        <Modal title="编辑班制"
                v-model="modal.editShift"
                :loading="true"
                @on-ok="editShift('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <FormItem label="班制名称：" prop="name">
                    <Input v-model="formValidate.name" placeholder=""/>
                </FormItem>
                <FormItem label="站区：" prop="stationArea">
                    <Select v-model="formValidate.stationArea" placeholder="请选择">
                        <Option value="beijing">New York</Option>
                    </Select>
                </FormItem>
                <FormItem label="站点：" prop="station">
                    <Select v-model="formValidate.station" placeholder="请选择">
                        <Option value="beijing">New York</Option>
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
        <!-- 新增时间段 -->
        <Modal title="新增时间段"
            v-model="modal.addTimeSlot"
            :loading="true"
            @on-ok="handleSubmit2('addTimeValidate')">
            <Form ref="addTimeValidate" :model="addTimeValidate" :rules="ruleAddTimeValidate" :label-width="80">
                <FormItem label="时间段" prop="timeSlot">
                    <TimePicker v-model="addTimeValidate.timeSlot" type="timerange" placeholder="选择时间段" format="HH:mm"></TimePicker>
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
                modal1:false,
                modal3:false,
                modal: {
                    eidtShift: false,
                    addTimeSlot:false,
                },
                cityList: [
                    {
                        value: '1',
                        label: '站务员'
                    },
                    {
                        value: '2',
                        label: 'London'
                    },
                    {
                        value: '3',
                        label: 'Sydney'
                    },
                    {
                        value: '4',
                        label: 'Ottawa'
                    },
                    {
                        value: '5',
                        label: 'Paris'
                    },
                    {
                        value: '6',
                        label: 'Canberra'
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
                    timeSlot: '',
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
                //    新增班制弹框
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
                columns1: [
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
                           title: '每周最多休班',
                           align: 'center',
                           key: 'weekdayoff2'
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
                data1:[{
                    name:"1",
                    starttime:"2",
                    shifttime:"3",
                    shiftspace:"4",
                    shiftrele:"5",
                    shiftpeople:"6",
                    weekdayoff2:"7"
                }],
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
                data2:[{
                    timeduan:"4:00至6:00",
                    shiftpeople:"4"
                }]
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
            handleSubmit2: function (name) {
                let arr = this.addTimeValidate.timeSlot;
                for(let i=0;i<arr.length;i++){
                    if(arr[i] === ''){
                        this.addTimeValidate.ifTimeSlot = true;
                        return;
                    } else {
                        this.addTimeValidate.ifTimeSlot = false;
                    }
                }
                this.$refs[name].validate((valid) => {
                    
                    if (valid) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
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
                this.modal.addTimeSlot=true;
            },
            remove2:function (index) {
                this.data2.splice(index, 1);
            },
            edite:function(){
                this.modal1=true
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
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>