<template>
    <div class="container">
        <div class="content-header">
            <span>选择年份：</span>
            <DatePicker v-model="year" type="year" placeholder="请选择日期" style="width: 200px" clearable></DatePicker>
            <span>选择季度：</span>
            <Select style="width:200px" placeholder="请选择季度" v-model="quarter" clearable>
                <Option :value="1">第一季度</Option>
                <Option :value="2">第二季度</Option>
                <Option :value="3">第三季度</Option>
                <Option :value="4">第四季度</Option>
            </Select>
            <span>选择月份：</span>
            <DatePicker v-model="month" type="month" placeholder="请选择月份" style="width: 200px" clearable></DatePicker>
            <span>站区：</span>
            <Select style="width:200px" placeholder="请选择站区">
                <Option v-for="(item, index) in lineList"  :key="index" :value="item.id">{{ item.name }}</Option>
            </Select>
            <Button type="primary"  size="large">查询</Button>
        </div> 
        <div class="panel-body">
            <table cellpadding=0 cellspacing=0 class="workHourTable">
                <tr>
                    <th v-for="(item,index) in titleList" :key="index">{{item}}</th>
                </tr>
                <template v-for="list in linesTable">
                    <tr>
                        <td rowspan="4">{{list.name}}</td><td>{{list.title}}</td>
                        <td v-for="n in 6"> </td>
                    </tr>
                    <tr v-for="item in linesStation">
                        <td>{{item}}</td>
                        <td v-for="n in 6"> </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>   
</template>
<script>
    export default{
        data: function () {
            return {
                year: null,
                quarter: null,
                month: null,
                lines:'',
                lineList:[
                    {
                        id:1,
                        name:'2号线'
                    },
                    {
                        id:2,
                        name:'13号线'
                    },
                    {
                        id:3,
                        name:'10号线'
                    },
                    {
                        id:4,
                        name:'8号线'
                    },
                    {
                        id:5,
                        name:'新线'
                    }
                ],
                district:[
                    {
                        id:1,
                        name:'西直门'
                    },
                    {
                        id:2,
                        name:'鼓楼大街'
                    },
                    {
                        id:3,
                        name:'巴沟站'
                    },
                ],
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
                ]
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>