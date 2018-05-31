<template>
    <div>
        <div class="content-header">
            <button class=" btnDefault bgGreen" type="button" @click="modal8 = true"><span>新增站区</span></button>
            <Modal class="usermanage-model"
                   title="新增站区"
                   v-model="modal8"
                   @on-ok="ok"
                   >
                <p>
                    站区名称
                    <input id="editUserCode" name="userCode" type="text" v-model="stationName">
                </p>
            </Modal>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="list">
            <listBlock v-for="item in arr" :title="item"></listBlock>
        </div>

    </div>
</template>
<script>
    import listBlock from '../components/listBlock.vue'
    export default {
        data:function () {
            return {
                modal8: false,
                arr: ['西直门'],
                stationName: ''
            }
        },
        methods:{
            ok:function(){

                this.arr.push(this.stationName);
            }
        },
        components:{
            listBlock:listBlock
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>