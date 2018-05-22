<template>
    <div>
        <div class="form_line float-left">
            <label>班制</label>
            <select name="shiftModel" id="shiftModel">
                <option value="">请选择</option>
                <option value="3">西直门站务员五班制</option>
                <option value="4">西直门替班员</option>
            </select>
        </div>
        <a class="btnDefault bgBlue btnLoad float-left" onclick="loadWorkFlow()" href="javascript:;">加载工作流程</a>
    </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>