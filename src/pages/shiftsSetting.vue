<template>
    <div class="alldiv">
        <div class="content-header">
            <Select v-model="model1" style="width:200px;margin: 0px 0px 4px 20px " :on-change="chiocepost">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <a class="btnDefault bgGreen" onclick="loadWorkFlow()" href="javascript:;"><span>新增编制</span></a>
            <a class="btnDefault" href="javascript:void(0)" onclick="printUserTemplate()">编辑班制</a>
        </div>
        <div class="panel-body">
            <!--不同班制button位置-->
            <div class="buttonblock"></div>
            <div class="shifts-content">
                <p class="bold shifttitle">西直门五班制</p>
                <div class="shiftform">
                    <p class="bold">班制表</p>
                    <div id="addPlanForm">
                        <Table  :columns="columns" :data="data" style="margin-top: 20px"></Table>
                        <Modal title="编辑岗位"
                               v-model="modal"
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
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                                </FormItem>
                            </Form>
                        </Modal>

                    </div>
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
                cityList: [
                    {
                        value: '1',
                        label: '西直门'
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
                model1:"",
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
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    stion: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    site: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    weektime1: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    weektime2: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    weekdayoff1: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    weekdayoff2: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    monthtime: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    yeartime: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
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
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
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

                ]
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
            show:function (index) {
                this.modal = true;
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>