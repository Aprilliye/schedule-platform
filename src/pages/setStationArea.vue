<template>
    <div class="container">
        <div class="content-header">
            <button class="btnDefault bgGreen" type="button" @click="addStationArea = true">新增站区</button>
            <button class="btnDefault">导入</button>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="list">
            <listBlock v-for="(item, index) in stations" :key="index" :title="item.districtName"></listBlock>
        </div>
        <!--新增站区弹框-->
        <Modal
                title="新增站区"
                v-model="addStationArea"
                @on-ok="addStationAreaMethod"
                @on-cancel="cancelStationAreaMethod"
                :loading="true">
            <p>
                <label class="addStationLabel"> 站区名称：</label>
                <input id="editUserCode" name="userCode" type="text" v-model="stationName">
                <span class="turnRed stationNamerequire">站区名称不能为空</span>
            </p>
        </Modal>
    </div>
</template>
<script>
    import listBlock from '../components/listBlock.vue'
    import {stationAreaList, addstationArea} from '@/api/commonAPI'
    export default {
        data:function () {
            return {
                addStationArea: false,
                stations: [],
                stationName: ''
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
                        this.stations = response.data;
                    }
            },
            //新增站区
            addStationAreaMethod: async function(){
                let params={
                    districtName:this.stationName,
                };
                let response = await addstationArea(params);
                if (response.meta.code !==0){
                    this.$Message.error(response.meta.mesage);
                }else{
                     if(this.stationName){
                    this.arr.push({districtName:this.stationName});
                    this.stationName='';
                    $(".stationNamerequire").css("display","none");
                    this.addStationArea=false;
                }else{
                    $(".stationNamerequire").css("display","inline-block");
                    }
                }
            },
            cancelStationAreaMethod:function(){
                this.stationName='';
                $(".stationNamerequire").css("display","none");
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