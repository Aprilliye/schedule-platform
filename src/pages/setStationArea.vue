<template>
    <div class="container">
        <div class="content-header">
            <button class="btnDefault bgGreen" type="button" @click="addStationArea = true;stationName = ''">新增站区</button>
            <button class="btnDefault">导入</button>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="list">
            <listBlock v-for="(item, index) in stationAreas" :key="index" :title="item.districtName" :id="item.id"></listBlock>
        </div>
        <!--新增站区弹框-->
        <Modal
            title="新增站区"
            v-model="addStationArea"
            @on-ok="addStationAreaMethod"
            :loading="true">
            <p>
                <label class="addStationLabel"> 站区名称：</label>
                <input id="editUserCode" name="userCode" type="text" v-model.trim="stationName">
                <!-- <span class="turnRed stationNamerequire">站区名称不能为空</span> -->
            </p>
        </Modal>
    </div>
</template>
<script>
    import listBlock from '../components/listBlock.vue'
    import {stationAreaList, addstationArea, getStations} from '@/api/commonAPI'
    export default {
        data: function () {
            return {
                addStationArea: false,
                stationAreas: [],
                stationName: '',
                stations: [],
            }
        },
        mounted: function () {
            this.request();
        },
        methods:{
            
            //  获取站区列表
            request: async function(){
                let response = await stationAreaList();
                if (response.meta.code !== 0) {
                    this.$Loading.error();
                    this.$Message.error(response.meta.message);
                }else{
                    this.$Loading.finish();
                    this.stationAreas = response.data;
                }
            },
            //  新增站区
            addStationAreaMethod: async function(){
                let stationName = this.stationName;
                if(stationName === ''){
                    this.$Message.warning('站区名称不能为空');
                    return;
                }
                let data = {
                    districtName: stationName,
                };
                let response = await addstationArea(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    this.stationAreas = response.data;
                    this.addStationArea = false;
                    return;
                }
                this.$Message.error(mesage);
            }
        },
        components:{
            listBlock: listBlock
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>