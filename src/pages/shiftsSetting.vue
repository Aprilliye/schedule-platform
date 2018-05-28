<template>
    <div class="alldiv">
        <div class="content-header">
            <Select v-model="modelpost"placeholder="请选择岗位" style="width:200px;margin: 0px 0px 4px 20px " :on-change="chiocepost">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <a class="btnDefault bgGreen" @click="modal=true" ><span>新增班制</span></a>
            <a class="btnDefault bgGreen" @click="modal1=true"><span>新增班次</span></a>
            <a class="btnDefault bgGreen" @click="modal2=true"><span>新增时间段</span></a>
            <a class="btnDefault bgGreen" @click="modal3=true"><span>方案验算</span></a>
            <!--验算弹框-->
            <Modal
                    v-model="modal3"
                    title="方案验算">
                <p>每日总工时:&nbsp;&nbsp;&nbsp;<span>45小时</span></p>
                <p>总排班人数:&nbsp;&nbsp;&nbsp;<input><Button type="primary" style="margin-left: 10px">开始验算</Button></p>
                <div slot="footer">
                    <Button type="primary"  @click="del">确定</Button>
                </div>
            </Modal>
        </div>
        <div class="panel-body">
            <!--不同班制button位置-->
            <div class="buttonblock"></div>
            <div class="shifts-content">
                <p class="bold shifttitle">西直门五班制</p>
                <!--班制表-->
                <div class="shiftform">
                    <p class="bold">班制表</p>
                    <div id="addPlanForm">
                        <Table  :columns="columns" :data="data" style="margin-top: 20px"></Table>
                        <Modal title="编辑班制"
                               v-model="modal"
                               @on-ok="handleSubmit('formValidate')"
                                >
                            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                                <FormItem label="班制名称" prop="name">
                                    <Input v-model="formValidate.name" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="站区" prop="stion">
                                    <Select v-model="formValidate.stion" placeholder="请选择">
                                        <Option value="beijing">New York</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="站点" prop="site">
                                    <Select v-model="formValidate.site" placeholder="请选择">
                                        <Option value="beijing">New York</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="周工时下限" prop="weektime1">
                                    <Input v-model="formValidate.weektime1" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="周工时上限" prop="weektime2">
                                    <Input v-model="formValidate.weektime2" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="每周最少休班" prop="weekdayoff1">
                                    <Input v-model="formValidate.weekdayoff1" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="每周最多休班" prop="weekdayoff2">
                                    <Input v-model="formValidate.weekdayoff2" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="月工时上限" prop="monthtime">
                                    <Input v-model="formValidate.monthtime" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="年工时上限" prop="yeartime">
                                    <Input v-model="formValidate.yeartime" placeholder=""></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </div>
                <!--24小时值班人数表-->
                <div class="twentyfourform">
                    <p class="bold">24小时值班人数表</p>
                    <Table  :columns="columns2" :data="data2" style="margin-top: 20px"></Table>
                    <Modal title="编辑"
                           v-model="modal2"
                           @on-ok="handleSubmit2('formValidate2')"
                            >
                        <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">
                            <FormItem label="时间段" prop="timeduan">
                                <TimePicker type="time" placeholder="Select time" style="width: 168px" format="HH:00"></TimePicker>至
                                <TimePicker type="time" placeholder="Select time" style="width: 168px" format="HH:00"></TimePicker>
                            </FormItem>
                            <FormItem label="值班人数" prop="shiftpeople">
                                <Input v-model="formValidate2.shiftpeople" placeholder=""></Input>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
                <!--排班表-->
                <div class="banciform">
                    <p class="bold">排班表</p>
                    <Table  :columns="columns1" :data="data1" style="margin-top: 20px"></Table>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script >
    export default {
        data:function () {
            return {
                modal:false,
                modal1:false,
                modal2:false,
                modal3:false,
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
                modelpost:"",
                formValidate: {
                    name: '',
                    stion: '',
                    site:'',
                    weektime1:'',
                    weektime2:'',
                    weekdayoff1:'',
                    weekdayoff2:'',
                    monthtime:'',
                    yeartime:''
                },
                formValidate2:{
                    timeduan:'',
                    shiftpeople:"2"
                },
                formValidate1:{
                    name:'',
                    starttime:'',
                    shifttime:'',
                    shiftspace:'',
                    shiftrele:'',
                    shiftpeople:"2"
                },
//                新增班制弹框
                ruleValidate: {
                    name: [
                        { required: true, message: '班制名称不能为空', trigger: 'blur' }
                    ],
                    stion: [
                        { required: true, message: '站区不能为空', trigger: 'change' }
                    ],
                    site: [
                        { required: true, message: '站点不能为空', trigger: 'change' }
                    ],
                    weektime1: [
                        { required: true, message: '周工时下限不能为空', trigger: 'blur' }
                    ],
                    weektime2: [
                        { required: true, message: '周工时上限不能为空', trigger: 'blur' }
                    ],
                    weekdayoff1: [
                        { required: true, message: '每周最少修班不能为空', trigger: 'blur' }
                    ],
                    weekdayoff2: [
                        { required: true, message: '每周最多休班不能为空', trigger: 'blur' }
                    ],
                    monthtime: [
                        { required: true, message: '月工时上限不能为空', trigger: 'blur' }
                    ],
                    yeartime: [
                        { required: true, message: '年工时上限不能为空', trigger: 'blur' }
                    ]
                },
//                新增时间段弹框
                ruleValidate2: {
                    timeduan: [
                        { required: true, message: '时间段不能为空', trigger: 'blur' }
                    ],
                    shiftpeople: [
                        { required: true, message: '值班人数不能为空', trigger: 'blur' }
                    ]
                },
//                新增班次弹框
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
                columns: [
                    {
                        title: '班制名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '站区',
                        align: 'center',
                        key: 'stion'
                    },
                    {
                        title: '站点',
                        align: 'center',
                        key: 'site'
                    },
                    {
                        title: '周工时下限',
                        align: 'center',
                        key: 'weektime1'
                    },
                    {
                        title: '周工时上限',
                        align: 'center',
                        key: 'weektime2'
                    },
                    {
                        title: '每周最少休班',
                        align: 'center',
                        key: 'weekdayoff1'
                    },
                    {
                        title: '每周最多休班',
                        align: 'center',
                        key: 'weekdayoff2'
                    },
                    {
                        title: '月工时上限',
                        align: 'center',
                        key: 'monthtime'
                    },
                    {
                        title: '年工时上限',
                        align: 'center',
                        key: 'yeartime'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑班制'),
                            ]);
                        }
                    }
                ],
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
                                   h('button', {
                                       style: {
                                           marginRight: '5px'
                                       },
                                       on: {
                                           click: () => {
                                               this.edite(params.index)
                                           }
                                       }
                                   }, '编辑'),
                                   h('button', {
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
                                h('button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editpeoplenumber(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('button', {
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
            chiocepost:function(){

            },
            handleSubmit:function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            handleSubmit2:function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            handleSubmit1:function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功');
                    } else {
                        this.$Message.error('修改失败');
                    }
                })
            },
            show:function (index) {
                this.modal = true;
            },
            remove:function (index) {
                this.data1.splice(index, 1);
            },
            editpeoplenumber:function(){
                this.modal2=true;
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
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>