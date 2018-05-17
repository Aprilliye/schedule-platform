<template>
    <div>
        <div>
            <Button class=" bgGreen" type="button"@click="modal8 = true"><span>新增站区</span></Button>
            <Modal class="usermanage-model"
                   title="新增站区"
                   v-model="modal8"
                   :mask-closable="false">
                <p>
                    <label>站区名称</label>
                    <input id="editUserCode" name="userCode" type="text">
                </p>
            </Modal>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="content-block">
           <div class="blockheader"></div>
            <div></div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
        return {
            modal8: false,
        }
    }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>