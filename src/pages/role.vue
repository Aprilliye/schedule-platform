<template>
    <div class="container">
        <div class="roleboforeadd">
            <div class="container">
                <div class="content-header">
                    <div class="float-left">
                        <a class="btnDefault bgGreen"  @click="roleConfigshow"><span>新增角色</span></a>
                    </div>
                    <div class=" float-right">
                        <form class="form-container" id="roleForm1">
                            <div class="search-input float-left">
                                <span class="icon-5"></span>
                                <input type="text" placeholder="角色名称" name="roleName" v-model="roleName">
                            </div>
                            <a class="btnDefault bgBlue queryBtn float-left" href="javascript:;" @click="getTableData">查询</a>
                            <div class="clear"></div>
                            <span style="color: red;margin-left: 80px" v-show="roleNameShow">角色名称不能为空</span>
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
        data:function () {
        return {
            roleName:'',
            roleNameShow:false,
            obj:{},
            columns1: [
                {
                    title: '角色名称',
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
                                    marginRight: '5px',
                                    color:"#0000FF"
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '权限配置')
                        ]);
                    }
                }
            ],
            data: [
                {
                    roleName: '系统管理员',
                    description: '--'
                },
                {
                    roleName: '站区管理员',
                    description: '--'
                },
                {
                    roleName: '普通用户',
                    description: '--'
                }
            ]
        }
    },
        //获取页面传值
        created:function(){
            this.getParams()
    },
        methods:{
            show:function (index) {
                this.$router.push({
                    name:'EditJurisdiction',
                    params:{
                        index:index
                    }

                });
            },
            roleConfigshow:function(){
                this.$router.push("/addJurisdiction");
            },
            getTableData:function(){
                if(this.roleName){
                    this.roleNameShow=false;
                    this.roleName='';
                }else{
                    this.roleNameShow=true;
                    return false;
                }
            },
            //获取页面传值
            getParams:function(){
                if(typeof this.$route.params.index=="number" && this.$route.params.roleName){
                    this.data[this.$route.params.index].roleName=this.$route.params.roleName;
                    this.data[this.$route.params.index].description=this.$route.params.description;
                }else if(typeof this.$route.params.index!="number" && this.$route.params.roleName){
                    this.obj.roleName=this.$route.params.roleName;
                    this.obj.description=this.$route.params.description;
                    this.data.push(this.obj);
                }


            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>