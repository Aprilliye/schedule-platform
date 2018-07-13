<template>
    <div class="container">
        <div class="content-header">
            <span>选择年份：</span>
            <DatePicker v-model="year" type="year" placeholder="请选择日期" style="width: 200px" clearable></DatePicker>
            <span>选择季度：</span>
            <Select style="width:200px" placeholder="请选择季度" v-model.trim="season" clearable @on-change="changeSeason">
                <Option :value="1">第一季度</Option>
                <Option :value="2">第二季度</Option>
                <Option :value="3">第三季度</Option>
                <Option :value="4">第四季度</Option>
            </Select>
            <span>选择月份：</span>
            <DatePicker v-model="month" type="month" placeholder="请选择月份" style="width: 200px" clearable @on-change="changeMonth"></DatePicker>
            <template v-if="roleId === 1">
                <span>站区：</span>
                <Select style="width:200px" placeholder="请选择站区" v-model="districtId">
                    <Option v-for="item in districtList"  :key="item.id" :value="item.id">{{ item.districtName }}</Option>
                </Select>
            </template>
            <button class="btnDefault bgBlue" type="button" @click="getWorkload">查询</button>
        </div> 
        <div class="panel-body">
            <table cellpadding=0 cellspacing=0 class="workHourTable">
                <tr>
                    <th v-for="(item,index) in titleList" :key="index">{{item}}</th>
                </tr>
                <template v-for="list in data">
                    <tr>
                        <td :rowspan="list[1].length">{{list[0]}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr v-for="item in list[1]" :key="item.id">
                        <td>{{item.districtName}}</td>
                        <td>{{item.averWorkerCount}}</td>
                        <td>{{item.plannedHours}}</td>
                        <td>{{item.actualHours}}</td>
                        <td>{{item.workedRate}}</td>
                        <td>{{item.extraHours}}</td>
                        <td>{{item.offWorkRate}}</td>
                    </tr>
                </template>
            </table>
        </div>
    </div>   
</template>
<script>
import {getDistricts, getWorkload} from '@/api/commonAPI';
    export default{
        data: function () {
            return {
                roleId: this.$store.get('role'),
                year: new Date(),
                season: '',
                month: null,
                lines:'',
                districtId: null,
                districtList:[],
                //  工时兑现：实际工时/计划工时，平均人数：每月在册人数
                titleList:['线别','部门','平均人数','计划工时','实际工时','工时兑现','加班工时','缺勤率'],
                linesStation:['---','---','总结'],
                linesTable:[
                    {
                        name:'2号线',
                        title:'2号线西直门站'
                    },
                    {
                        name:'13号线',
                        title:'13号线西直门站区'
                    },
                    {
                        name:'10号线',
                        title:'10号线巴沟站区'
                    },
                    {
                        name:'8号线',
                        title:'8号线鼓楼大街站区'
                    },
                    {
                        name:'新线',
                        title:'8号线xx站区'
                    }
                ],
                data: []
            }
        },
        mounted () {
            this.getDistricts();
        },
        methods: {
            //  获取站区
            getDistricts: async function () {
                let response = await getDistricts();
                if(response.meta.code === 0){
                    this.districtList = response.data;
                }
            },
            //  选择季度
            changeSeason: function () {
                if(this.season){
                    this.month = null;
                }
            },
            //  选择月份
            changeMonth: function () {
                if (this.month) {
                    this.season = '';
                }
            },
            //  查询
            getWorkload: async function () {
                let data = {};
                if (!this.year) {
                    this.$Message.warning('请选择年份');
                    return;
                }
                data.yearStr = this.year.getFullYear();
                this.month && (data.month = String(this.month.getMonth() + 1));
                this.season && (data.season = String(this.season));
                this.districtId && (data.districtId = this.districtId);

                let response = await getWorkload(data);
                let message = response.meta.message;
                if(response.meta.code === 0){
                    this.$Message.success(message);
                    let data = response.data;
                    for (let key in data) {
                        this.data.push([key, data[key]]);
                    }
                    return;
                }
                this.$Message.error(message);
            },
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>