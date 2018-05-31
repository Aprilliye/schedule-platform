<template>
    <div>
        <div class="content-header">
            <span style="width:200px;margin-left: 20px">选择站点：</span>
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span style="width:200px;margin-left: 20px">选择班制：</span>
            <Select v-model="model2" style="width:200px">
                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button class="buttonnone" type="warning" @click="loadmoban">加载模板</Button>
            <Button class="buttonnone" type="primary">建立模板</Button>
            <span class="showBtn">选择开始日期</span><DatePicker class="showBtn" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            <a class="btnDefault bgBlue showBtn" >建立模板</a>
            <a class="btnDefault bgGreen showBtn">保存模板</a>
        </div>
        <div class="panel-body showBtn " style="margin-left: 20px;" >
            <div class="form_line">
                <p class="noPlan"><em class="iconmark">?</em>日平均<span id="dailyAverage" class="blue"></span>小时,
                    周平均<span id="weeklyAverage" class="blue"></span>小时,
                    30日平均<span id="monthlyAverage" class="blue"></span>小时,
                    365日平均<span id="yearlyAverage" class="blue"></span>小时,
                    最少人数<span id="minimiumWorkerCount" class="blue"></span>人</p>
            </div>
            <div class="clear"></div>
            <div>
                <table class="antoform" style="border: 2px solid white;background-color: #DCDEE0">
                    <tr style="background-color: #767C85;height: 122px;color: white!important;"><td>站务员</td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>早班：4<br>晚班：1<br>白班：1<br></td><td>周工时</td></tr>
                    <tr><td>杨璐</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>申毅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>王惠云</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>封伟</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>李雅然</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>鞠淑云</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>张海军</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>孟凡君</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>王素梅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data:function () {
            return {
                cityList: [
                    {
                        value: '1',
                        label: '西直门'
                    }
                ],
                model1: '',
                model2: '',
                cityList2: [
                    {
                        value: '1',
                        label: '西直门替班员'
                    }
                ]
            }
        },
        methods:{
            loadmoban:function(){
                $(".buttonnone").css("display","none");
                $(".showBtn").css("display","inline-block")
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>