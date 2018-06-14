<template>
    <div class="container" >
        <div class="page">
            <div class="content-header">
                <div>
                    <button class="btnDefault" :class="{'bgBlue': showTabItem }" @click="showTabItem=true,showTable=true">周表</button>
                    <button class="btnDefault" :class="{'bgBlue': !showTabItem }" @click="showTabItem=false,showTable=false">月表</button>
                    <div class="tabItem" v-show="showTabItem">
                        <span>时间段：</span>
                        <Select v-model="timeQuantum" style="width:200px">
                            <Option v-for="item in timeQuantumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <DatePicker :value="beginValue" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker> 至
                        <DatePicker :value="endValue" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                    </div>
                    <div class="tabItem" v-show="!showTabItem">
                        <span>时间段：</span>
                        <DatePicker type="month" placeholder="请选择时间" style="width: 200px"></DatePicker>
                    </div>
                </div>
                <div style="margin-top: 20px">
                    <span>站点：</span>
                    <Select v-model="station" style="width:200px" placeholder="西直门">
                        <Option v-for="item in stationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <span>岗位：</span>
                    <Select v-model="post" style="width:200px" placeholder="替班员">
                        <Option v-for="item in postList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="selectbutton">
                        <span class="icon-5" ></span>
                        <input type="text" placeholder="姓名/编号" style="border: 0">
                    </p>
                    <button type="button" class="btnDefault bgBlue">查询</button>
                </div>
            </div>
            <div class="panel-body">
                <div class="float-right" style="margin-top: 20px">
                    <span><i class="colori" style="background-color: #fffc00;"></i>假期</span>
                    <span><i class="colori" style="background-color: #ff9191"></i>班次变更</span>
                    <span><i class="colori" style="background-color: #3A6BCE"></i>临时安排</span>
                    <span><i class="colori" style="background-color: #b10000"></i>旷工缺勤</span>
                    <span><i class="colori" style="background-color: #00d537"></i>补班加班</span>
                    <span><i class="colori" style="background-color: #008121"></i>替班</span>
                </div>
                <div class="clear"></div>
                <div class="postformtable" v-show="showTable">
                    <!--周表-->
                    <table>
                        <tr>
                            <th rowspan="2">姓名</th>
                            <th rowspan="2">岗位</th>
                            <th>6.1</th>
                            <th>6.2</th>
                            <th>6.3</th>
                            <th>6.4</th>
                            <th>6.5</th>
                            <th>6.6</th>
                            <th>6.7</th>
                            <th colspan="3">总计：7天</th>
                        </tr>
                        <tr>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>计划工时</th>
                            <th>实际工时</th>
                            <th>结余</th>
                        </tr>
                        <tr v-for="item in weekdata" :key="item.userId" :id="item.userId">
                            <td class="scheduleName" @mouseenter="showNameMessage" @mouseleave="hideNameMessage">{{item.userName}}</td>
                            <td>{{item.postName}}</td>
                            <!--周表点击事件-->
                            <td v-for="(list, index) in item.schedule" :key="'aa'+index" :id="list.id" @mouseenter="showMessage" @mouseleave="hideMessage" :style="{ 'background-color': list.color }">
                                {{list.name}}
                            </td>
                            <td>{{item.planWorkHour}}</td>
                            <td>{{item.actualWorkHour}}</td>
                            <td :style="{ 'background-color': item.balance.color }">{{item.balance.content}}</td>
                        </tr>
                    </table>
                </div>
                <div class="postformtable" v-show="!showTabItem">
                    <!--月表-->
                    <table class="monthTable">
                        <tr>
                            <th rowspan="2">姓名</th>
                            <th rowspan="2">岗位</th>
                            <th>6.1</th>
                            <th>6.2</th>
                            <th>6.3</th>
                            <th>6.4</th>
                            <th>6.5</th>
                            <th>6.6</th>
                            <th>6.7</th>
                            <th>6.8</th>
                            <th>6.9</th>
                            <th>6.10</th>
                            <th>6.11</th>
                            <th>6.12</th>
                            <th>6.13</th>
                            <th>6.14</th>
                            <th>6.15</th>
                            <th>6.16</th>
                            <th>6.17</th>
                            <th>6.18</th>
                            <th>6.19</th>
                            <th>6.20</th>
                            <th>6.21</th>
                            <th>6.22</th>
                            <th>6.23</th>
                            <th>6.24</th>
                            <th>6.25</th>
                            <th>6.26</th>
                            <th>6.27</th>
                            <th>6.28</th>
                            <th>6.29</th>
                            <th>6.30</th>
                            <th colspan="3">总计：30天</th>
                        </tr>
                        <tr>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>计划工时</th>
                            <th>实际工时</th>
                            <th>结余</th>
                        </tr>
                        <tr v-for="item in monthdata" :key="item.userId" :id="item.userId">
                            <td class="scheduleName" @mouseenter="showNameMessageMonth" @mouseleave="hideNameMessage">{{item.userName}}</td>
                            <td>{{item.postName}}</td>
                            <td v-for="(list, index) in item.schedule" :id="list.id" :key="'bb'+index"  @mouseenter="showMessageMonth" @mouseleave="hideMessage" :style="{ 'background-color': list.color }">{{list.name}}</td>
                            <td>{{item.planWorkHour}}</td>
                            <td>{{item.actualWorkHour}}</td>
                            <td :style="{ 'background-color': item.balance.color }">{{item.balance.content}}</td>
                        </tr>
                    </table>
                </div>
                <!--个人信息悬浮框-->
                <div class="peopleMessage">
                    <span>电话</span><span>住址</span>
                    <span>{{datatr.phoneName}}</span><span>{{datatr.address}}</span>
                    <div class="clear"></div>
                </div>
                <!--请假信息悬浮框-->
                <div class="tdMessage">
                    <div v-for="(item,index) in datatd" :key="'cc'+index">
                        <hr>
                        <p>{{item.type}}</p>
                        <p>备注：{{item.remark}}</p>
                        <p>创建时间：{{item.setUpTime}}</p>
                        <p>创建人：{{item.setUpPerson}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {monthdata, weekdata} from '@/assets/data/schedulePlan'
export default {
    created: function () {
            this.weekdata = weekdata;
            this.monthdata = monthdata;
        },
    data: function() {
            return {
                monthdata:[],
                weekdata:[],
                showTable:true,
                showTabItem: true,
                datatr:{},
                datatd:[],
                timeQuantumList: [
                    {
                        value: "1",
                        label: "一周"
                    },
                    {
                        value: "2",
                        label: "两周"
                    }
                ],
                timeQuantum: "1",
                beginValue:BeforeDate,
                endValue:afterWeekDate,
                station: "",
                post: "",
                stationList: [
                    {
                        value: "1",
                        label: "西直门"
                    }
                ],
                postList: [
                    {
                        value: "1",
                        label: "替班员"
                    }
                ],
            };
    },
    methods:{
        //周表人员信息显示
            showNameMessage:function(e){
                $(".peopleMessage").css("display","block");
                var target = e.target.parentNode.id;
                this.datatr= this.weekdata[target-1];
                var totalWidth=$("#app").width()*1/8;
                var x=e.clientX;
                var y=e.clientY+10;
                $(".peopleMessage").css({
                    "top":y,
                    "left":x
                });
            },
            //月表人员信息显示
            showNameMessageMonth:function(e){
                $(".peopleMessage").css("display","block");
                var target = e.target.parentNode.id;
                this.datatr= this.monthdata[target-1];
                var totalWidth=$("#app").width()*1/8;
                var x=e.clientX;
                var y=e.clientY+10;
                $(".peopleMessage").css({
                    "top":y,
                    "left":x
                });
            },
            hideNameMessage:function(){
                $(".peopleMessage").css("display","none");
            },
            //周表每天请假信息显示
            showMessage:function(e){
                var targettd = e.target.id;
                var targettr = e.target.parentNode.id;
                if(this.weekdata[targettr-1].schedule[targettd-1].messages){
                    $(".tdMessage").css("display","block");
                    var totalWidth=$("#app").width()*1/8;
                    var x=e.clientX;
                    var y=e.clientY+10;
                    $(".tdMessage").css({
                        "top":y,
                        "left":x
                    });
                    this.datatd= this.weekdata[targettr-1].schedule[targettd-1].messages;
                }
            },
            //月表每天请假信息显示
            showMessageMonth:function(e){
                var targettd = e.target.id;
                var targettr = e.target.parentNode.id;
                if(this.monthdata[targettr-1].schedule[targettd-1].messages){
                    $(".tdMessage").css("display","block");
                    this.datatd= this.monthdata[targettr-1].schedule[targettd-1].messages;
                    var totalWidth=$("#app").width()*1/8;
                    var x=e.clientX;
                    var y=e.clientY+10;
                    $(".tdMessage").css({
                        "top":y,
                        "left":x
                    });
                    this.datatd= this.weekdata[targettr-1].schedule[targettd-1].messages;
                }
            },
            hideMessage:function(){
                $(".tdMessage").css("display","none");
            },
    }
}
    //获取当前时间
    var myDate = new Date();
    function get(){
        var BeforeDate;
        var year = myDate.getFullYear();
        var month = myDate.getMonth()+1;
        var date = myDate.getDate();
        if(month<10){
            if(date<10){
                BeforeDate=year+'-0'+month+'-0'+date;
            }else{
                BeforeDate=year+'-0'+month+'-'+date;
            }
        }else{
            BeforeDate=year+'-'+month+'-'+date;
        }
        return BeforeDate;
    };
    //获取一周后时间
    function getAfterWeek(){
        var newDate;
        var AfterDate = new Date(myDate.getTime()+7*24*60*60*1000);
        var year = AfterDate.getFullYear();
        var month = AfterDate.getMonth()+1;
        var date = AfterDate.getDate();
        if(month<10){
            if(date<10){
                newDate=year+'-0'+month+'-0'+date;
            }else{
                newDate=year+'-0'+month+'-'+date;
            }
        }else{
            newDate=year+'-'+month+'-'+date;
        }
        return newDate;
    };
    var BeforeDate=get();
    var afterWeekDate=getAfterWeek();
</script>
<style scoped>
    @import "../assets/css/index.css";
</style>
