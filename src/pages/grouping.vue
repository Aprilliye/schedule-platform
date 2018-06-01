<template>
    <div>
        <div class="content-header">
            <button class=" btnDefault bgGreen" type="button" @click="addStationArea = true"><span>新增站区</span></button>
            <Modal
                    title="新增站区"
                   v-model="addStationArea"
                   @on-ok="addStationAreaMethod"
                   >
                <p>
                    <label class="addStationLabel"> 站区名称：</label>
                    <input id="editUserCode" name="userCode" type="text" v-model="stationName">
                </p>
                <p>
                    <label class="addStationLabel">管理员：</label>
                    <input id="editUserManager" name="userCode" type="text" v-model="stationAreaName">
                </p>
            </Modal>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="list">
            <listBlock v-for="(item,index) in arr" :key="index" :title="item"></listBlock>
        </div>
    </div>
</template>
<script>
    import listBlock from '../components/listBlock.vue'
    export default {
        data:function () {
            return {
                addStationArea: false,
                arr: ['西直门'],
                stationName: '',
                stationAreaName:''
            }
        },
        methods:{
            addStationAreaMethod:function(){

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