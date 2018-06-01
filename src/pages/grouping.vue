<template>
    <div>
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
                <p>
                    <label class="addStationLabel">管理员：</label>
                    <input id="editUserManager" name="userCode" type="text" v-model="stationManagerName">
                    <span class="turnRed stationManagerrequire">管理员不能为空</span>
                </p>
            </Modal>
        </div>
        <div class="content-title">
            北京地铁运三分公司
        </div>
        <div class="list">
            <listBlock v-for="(item,index) in arr" :key="index" :title="item.stationName" :name="item.managerName"></listBlock>
        </div>
    </div>
</template>
<script>
    import listBlock from '../components/listBlock.vue'
    export default {
        data:function () {
            return {
                addStationArea: false,
                arr: [
                    {
                        stationName:'西直门',
                        managerName:'梅松'
                    }
                ],
                stationName: '',
                stationManagerName:''
            }
        },
        methods:{
            addStationAreaMethod:function(){
                if(this.stationName&&this.stationManagerName){
                    let obj={};
                    obj.stationName=this.stationName;
                    obj.managerName=this. stationManagerName;
                    this.arr.push(obj);
                    this.stationManagerName='';
                    this.stationName='';
                    $(".stationNamerequire").css("display","none");
                    $(".stationManagerrequire").css("display","none");
                    this.addStationArea=false;
                }else if(!this.stationName&&this.stationManagerName){
                    $(".stationNamerequire").css("display","inline-block");
                }else if(!this.stationManagerName&&this.stationName){
                    $(".stationManagerrequire").css("display","inline-block");
                }else{
                    $(".stationNamerequire").css("display","inline-block");
                    $(".stationManagerrequire").css("display","inline-block");
                }

            },
            cancelStationAreaMethod:function(){
                this.stationName='';
                this.stationManagerName='';
                $(".stationNamerequire").css("display","none");
                $(".stationManagerrequire").css("display","none");
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