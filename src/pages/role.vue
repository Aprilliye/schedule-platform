<template>
    <div>
        <div class="content-header">
            <div class="float-left">
                <a class="btnDefault bgGreen" href=""><span>新增权限方案</span></a>
            </div>
            <div class=" float-right">
                <form class="form-container" id="roleForm">
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
                <!-- checkbox table -->
                <table  id="roleTable" class="table table-bordered"></table>
                <div id="pager" class="page"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>