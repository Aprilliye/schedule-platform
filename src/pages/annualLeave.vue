<template>
    <div class="container">
        <div class="content-header">
            <span>年份：</span>
            <DatePicker v-model="year" type="year" placeholder="请选择年份" style="width: 200px" clearable></DatePicker>
            <span>站区：</span>
            <Select v-model="district" style="width:200px" clearable>
                <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.stationName }}</Option>
            </Select>
            <a class="btnDefault bgBlue queryBtn" href="javascript:;" onclick="getTableData()">查询</a>
            <button class="btnDefault bgGreen" type="button">导入年假</button>
        </div>
        <div class="panel-body">
            <Table border :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            columns: [
                {
                    title: '姓名',
                    key: 'userName'
                },
                {
                    title: '员工卡号',
                    key: 'emploityeeCard'
                },
                {
                    title: '年份',
                    key: 'year'
                },
                {
                    title: '站区',
                    key: 'district'
                },
                {
                    title: '年假额度',
                    key: 'content'
                }
            ],
            data: [],
            districtList: [],
            district: ''
        }
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>
