<template>
    <div>
        <div id="newRole">
            <div class="content-header">
                <div class="float-left">
                    <a class="btnDefault bgGreen"  @click="roleConfigshow"><span>新增权限方案</span></a>
                </div>
                <div class=" float-right">
                    <form class="form-container" id="roleForm1">
                        <div class="search-input float-left">
                            <span class="icon-5"></span>
                            <input type="text" placeholder="权限方案名称" name="roleName">
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
        <div id="roleConfig">
            <div class="content-header">
                <div class="float-left">
                    <a class="btnDefault bgBlue" href="javascript:;" onclick="updateRole()">提交</a>
                    <a class="btnDefault">返回</a>
                </div>
            </div>
            <div class="panel-body">
                <form id="roleForm2" class="form-container">
                    <input type="hidden" id="permissionIds" name="permissionIds"/>
                    <input type="hidden" name="roleId" id="roleId" value="$!role.roleId">
                    <div class="form_line">
                        <label class="require red-star">权限方案名称：</label>
                        <input type="text" name="roleName" value="">
                    </div>
                    <div class="form_line">
                        <label class="float-left">权限方案描述：</label>
                        <textarea name="comment" rows="3"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data:function () {
        return {
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
                            }, '权限配置'),
                            h('button', {
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
                    description: 18,
                    type: '启用'
                },
                {
                    roleName: '管理员',
                    description: 18,
                    type: '启用'
                },
                {
                    roleName: '管理员',
                    description: 18,
                    type: '启用'
                },
                {
                    roleName: '管理员',
                    description: 18,
                    type: '启用'
                }
            ]
        }
    },
        methods:{
            show:function (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: ''
                })
            },
            remove:function (index) {
                if(this.data[index].type==="禁用"){
                    this.data[index].type="启用";
                }else{
                    this.data[index].type="禁用";
                }
            },
            roleConfigshow:function(){
                $("#newRole").css("display","none");
                $("#roleConfig").css("display","block");
            }
        }
    }

</script>
<style scoped>
    @import '../assets/css/index.css';
</style>