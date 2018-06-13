<template>
    <div class="container">
        <!-- 操作记录 -->
        <p class="title">操作记录</p>
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
    }
}
</script>

