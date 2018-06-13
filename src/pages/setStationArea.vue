<template>
    <div class="container">
        <div class="content-header">
            <button class=" btnDefault bgGreen" type="button" @click="addStationArea = true"><span>新增站区</span></button>
            <!--新增站区弹框-->
            <Modal
                    title="新增站区"
                    v-model="addStationArea"
                    @on-ok="addStationAreaMethod"
                    @on-cancel="cancelStationAreaMethod"
                    :loading="true"
                   >
                <p>
                    <label class="addStationLabel"> 站区名称：</label>
                    <input id="editUserCode" name="userCode" type="text" v-model="stationName">
                    <span class="turnRed stationNamerequire">站区名称不能为空</span>
                </p>
            </Modal>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="list">
            <listBlock v-for="(item,index) in arr" :key="index" :title="item.districtName" :id="item.id"></listBlock>
        </div>
    </div>
</template>
<script>
    import * as api from "../api/commonAPI";
    import listBlock from '../components/listBlock.vue'
    export default {
        created:function(){
            this.request();
        },
        data:function () {
            return {
                addStationArea: false,
                arr: [],
                stationName: '',
            }
        },
        methods:{
            request: async function(){
                    let response = await api.stationAreaList();
                    console.log(response.data);
                   if (response.meta.code !== 0) {
                       this.$Loading.error();
                       this.$Message.error(response.meta.message);
                   }else{
                        this.$Loading.finish();
                        this.arr=response.data;
                   }
            },
            addStationAreaMethod:function(){},
            // addStationAreaMethod: async function(){
            //     let params={
            //         id:1,
            //         districtName:this.stationName,
            //     };
            //     let response = await api.addstationArea(params);
            //     console.log(response);
            //     if (response.meta.code !==0){
            //         this.$Message.error(response.meta.mesage);
            //     }else{
            //          if(this.stationName){
            //         this.arr.push(this.stationName);
            //         this.stationName='';
            //         $(".stationNamerequire").css("display","none");
            //         this.addStationArea=false;
            //     }else{
            //         $(".stationNamerequire").css("display","inline-block");
            //         }
            //     }
            // },
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