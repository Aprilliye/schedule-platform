<template>
    <div class="container">
        <div class="content-header">
            <span>员工卡号：</span>
            <input type="text" name="roleName">
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
                    key: 'employeeCard'
                },
                {
                    title: '年假限额',
                    key: 'content'
                }
            ],
            data: []
        }
    }
}
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>
