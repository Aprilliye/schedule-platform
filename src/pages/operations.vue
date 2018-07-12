<template>
    <div class="container">
        <!-- 操作记录 -->
        <div class="content-header">
            <span>操作人：</span>
            <input type="text" name="roleName">
            <a class="btnDefault bgBlue queryBtn" href="javascript:;" onclick="getTableData()">查询</a>
        </div>
        <div class="panel-body">
            <Table border :columns="columns" :data="data"></Table>
            <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            // 操作记录总条数
            dataCount:0,
            // 每页显示记录条数
            pageSize:10,
            // 获取数据
            hostoryData:[],
            columns: [
                {
                    title: '操作时间',
                    key: 'operationTime'
                },
                {
                    title: '操作人',
                    key: 'userName'
                },
                {
                    title: '操作内容',
                    key: 'content'
                }
            ],
            data: [
                {
                    operationTime: '2018-06-13 17:16:25',
                    userName: 'admin',
                    content: '添加站务员'
                },
                {
                    operationTime: '2018-06-13 17:16:25',
                    userName: 'admin',
                    content: '添加战区'
                },
                {
                    operationTime: '2018-06-13 17:16:25',
                    userName: 'admin',
                    content: '添加站点'
                }  
            ]
        }
    },
    mounted: function(){
        this.hostoryData = this.data;
        this.dataCount = this.data.length;
        if(this.dataCount < this.pageSize){
            this.data = this.hostoryData;
        }else{
            this.data = this.hostoryData.slice(0,this.pageSize);
        }
    },
    methods: {
        changepage: function(index){
            let start = ( index - 1 ) * this.pageSize;
            let end = index * this.pageSize;
            this.data = this.hostoryData.slice(start,end);
        }
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>

