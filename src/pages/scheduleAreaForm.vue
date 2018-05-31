<template>
    <div>
        <!-- 右侧内容 start -->
        <div class="content-header">
            <div>
                <a class="btnDefault bgBlue " @click="weektablebutton">周表</a>
                <a class="btnDefault" @click="monthtablebutton">月表</a>
                <span class="nonetable">时间段</span>
                <Select class="nonetable" v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <DatePicker class="nonetable" type="date"placeholder="请选择时间" style="width: 200px"></DatePicker>至
                <DatePicker class="nonetable" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                <span class="showtable">时间段</span>
                <DatePicker class="showtable" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
            </div>
            <div style="margin-top: 20px">
                <span>站区</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>站点</span>
                <Select v-model="model3" style="width:200px">
                    <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>岗位</span>
                <Select v-model="model4" style="width:200px">
                    <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <p class="selectbutton">
                    <span class="icon-5" ></span>
                    <input type="text" placeholder="姓名/编号" style="border: 0">
                </p>
                <a class="btnDefault bgBlue " >查询</a>
                <a class="btnDefault">导出</a>
                <a class="btnDefault">个人</a>
            </div>
        </div>
        <!-- 右侧内容 end -->

    </div>
</template>
<script>
    export default {
        data:function () {
            return {
                cityList: [
                    {
                        value: '1',
                        label: '一周'
                    },
                    {
                        value: '2',
                        label: '两周'
                    }

                ],
                model1: '1',
                model2: '',
                model3: '',
                model4: '',
                cityList2: [
                    {
                        value: '1',
                        label: '西直门'
                    }
                ],
                cityList3: [
                    {
                        value: '1',
                        label: '西直门'
                    }
                ],
                 cityList4: [
                     {
                         value: '1',
                         label: '替班员'
                     }
                 ]
            }
        },
        methods:{
            monthtablebutton:function(){
                $(".nonetable").css("display","none");
                $(".showtable").css("display","inline-block");
            },
            weektablebutton:function(){
                $(".nonetable").css("display","inline-block");
                $(".showtable").css("display","none");
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>