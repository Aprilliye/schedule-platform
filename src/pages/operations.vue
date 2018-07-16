<template>
    <div class="container">
        <!-- 操作记录 -->
        <div class="content-header">
            <span>手机号：</span>
            <Input v-model="phoneNumber" placeholder="请输入手机号" clearable style="width: 200px"/>
            <span>选择日期：</span>
            <DatePicker v-model="date" placeholder="请选择日期" style="width: 200px" clearable></DatePicker>
            <button class="btnDefault bgBlue" type="button" @click="getOperations">查询</button>
        </div>
        <div class="panel-body">
            <Table border :columns="columns" :data="data"></Table>
            <Page :total="data.length" :page-size="pageSize" show-total class="paging" @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
import {getOperations} from '@/api/commonAPI';
export default {
    data: function () {
        return {
            // 每页显示记录条数
            pageSize:10,
            // 获取数据
            hostoryData:[],
            phoneNumber: '',
            date: null,
            columns: [
                {
                    title: '操作人',
                    key: 'operatorName'
                },
                {
                    title: '操作时间',
                    key: 'createDate'
                },
                {
                    title: '操作内容',
                    key: 'operationName'
                }
            ],
            data: []
        }
    },
    mounted: function(){
        this.getOperations();
    },
    methods: {
        //  分页
        changePage: function(index){
            let start = ( index - 1 ) * this.pageSize;
            let end = index * this.pageSize;
            this.data = this.hostoryData.slice(start,end);
        },
        //  查询
        getOperations: async function () {
            let data = {};
            let phoneNumber = this.phoneNumber;
            phoneNumber && (data.phoneNumber = phoneNumber);

            let date = this.date;
            date && (data.dateStr = this.$conversion(date));
            
            let response = await getOperations(data);
            let message = response.meta.message;
            if(response.meta.code === 0){
                this.$Message.success(message);
                this.data = response.data;
                return;
            }
            this.$Message.error(message);
        }
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>

