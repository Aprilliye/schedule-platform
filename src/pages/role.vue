<template>
    <div class="container">
        <div class="roleboforeadd">
            <div class="container">
                <div class="content-header">
                    <div class="float-left">
                        <a class="btnDefault bgGreen"  @click="roleConfigshow"><span>新增权限方案</span></a>
                    </div>
                    <div class=" float-right">
                        <form class="form-container" id="roleForm1">
                            <div class="search-input float-left">
                                <span class="icon-5"></span>
                                <input type="text" placeholder="权限方案名称" name="roleName" v-model="roleName">
                            </div>
                            <a class="btnDefault bgBlue queryBtn" href="javascript:;" onclick="getTableData()">查询</a>
                        </form>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="table-container">
                        <Table class="roletable" stripe :columns="columns1" :data="data"></Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        created:function(){
        this.request();
        },
        data:function () {
        return {
            roleName:'',
            columns1: [
                {
                    title: '权限方案名称',
                    key: 'roleName'
                },
                {
                    title: '职务描述',
                    key: 'description'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
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
                            }, '权限配置'),
                            h('a', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, this.data[params.index].type)
                        ]);
                    }
                }
            ],
            data: [
                {
                    roleName: '管理员',
                    description: '--',
                    type: '启用'
                },
                {
                    roleName: '管理员',
                    description: '--',
                    type: '启用'
                },
                {
                    roleName: '管理员',
                    description: '--',
                    type: '启用'
                },
                {
                    roleName: '管理员',
                    description: '--',
                    type: '启用'
                }
            ]
        }
    },
        methods:{
            show:function (index) {
            },
            remove:function (index) {
                if(this.data[index].type==="禁用"){
                    this.data[index].type="启用";
                }else{
                    this.data[index].type="禁用";
                }
            },
            roleConfigshow:function(){
                this.$router.push("/addJurisdiction");
            },
            request:function(){
            },
            checkAllsystemset:function(){
            }
        }
    }

</script>
<style scoped>
    @import '../assets/css/index.css';
</style>