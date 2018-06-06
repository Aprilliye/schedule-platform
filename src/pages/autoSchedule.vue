<template>
    <div class="container">
        <div class="content">
            <div class="content-header">
                <div class="tabItem">
                    <span>选择班制：</span>
                    <Select v-model="currentShift" style="width:200px">
                        <Option v-for="(item, index) in shifts" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                    <button class="btnDefault bgOrange" @click="loadtemplate">加载模板</button>
                    <button class="btnDefault bgBlue">生成模板</button>
                    <button class="btnDefault bgGreen" v-show="showSaveBtn">保存排班</button>
                    <p class="result" v-show="showResult">
                        <span>日平均<b>{{result.dayAverage}}</b>小时，</span>
                        <span>周平均<b>{{result.weekAverage}}</b>小时，</span>
                        <span>30日平均<b>{{result.monthAverage}}</b>小时，</span>
                        <span>365日平均<b>{{result.yearAverage}}</b>小时，</span>
                        <span>最少人数<b>{{result.minPeople}}</b>人</span>
                    </p>
                </div>
            </div>
            <!-- 表格 start -->
            <div class="wrapper" v-show="showTable">
                <div class="tab-content">
                    <div class="tab-pane" id="tab2">
                        <p class="result">请选择各个岗位的排班方案，并点击右侧的<b>生成模板</b>按钮</p>
                    </div>
                    <div class="tab-pane in active" id="tab1">
                        <div class="schedule postformtable">
                            <table class="scheduleForm" v-show="showTable">
                                <thead>
                                <tr id="theHead0">
                                    <th>站务员</th>
                                    <th>{{week.monday}}</th>
                                    <th>{{week.tuesday}}</th>
                                    <th>{{week.wednesday}}</th>
                                    <th>{{week.thursday}}</th>
                                    <th>{{week.friday}}</th>
                                    <th>{{week.saturday}}</th>
                                    <th>{{week.sunday}}</th>
                                    <th>周工时</th>
                                </tr>
                                </thead>
                                <tbody id="theBody">
                                    <tr v-for="(n, index) in data" :key="'tr'+index" :row="index">
                                        <td class="userName" :id="'user'+n" @click="clickUserTd"></td>
                                        <td v-for="m in 7" :key="'td'+ m" :id="'td'+(n-1)+'-'+(m-1)" @click="beforeChange"></td>
                                        <td class="workHours">
                                            <span></span>
                                            <!-- <button type="button" class="deleteItem" v-show="(index === currentTr) && showDelete">删除本行</button> -->
                                            <button type="button" class="deleteItem" style="display:none;" @click="deleteTr(index)">删除本行</button>
                                        </td>
                                    </tr>
                                    <!-- <tr v-for="(items, index) in data" :key="index">
                                        <td class="userName" :id="'user'+index" @click="clickUserTd"></td>
                                        <template v-for="(item, ) in items">
                                            <template v-if="item.weekDay === 0">
                                                <td :id="'td'+ (index-1) +'-0'" @click="beforeChange">{{item.shiftName}}</td>
                                                <td :id="'td'+ (index-1) +'-1'"></td>
                                                <td :id="'td'+ (index-1) +'-2'"></td>
                                                <td :id="'td'+ (index-1) +'-3'"></td>
                                                <td :id="'td'+ (index-1) +'-4'"></td>
                                                <td :id="'td'+ (index-1) +'-5'"></td>
                                                <td :id="'td'+ (index-1) +'-6'"></td>
                                            </template>
                                            <template v-else-if="item.weekDay === 1">
                                                <td :id="'td'+ (index-1) +'-0'"></td>
                                                <td :id="'td'+ (index-1) +'-1'" @click="beforeChange">{{item.shiftName}}</td>
                                                <td :id="'td'+ (index-1) +'-2'"></td>
                                                <td :id="'td'+ (index-1) +'-3'"></td>
                                                <td :id="'td'+ (index-1) +'-4'"></td>
                                                <td :id="'td'+ (index-1) +'-5'"></td>
                                                <td :id="'td'+ (index-1) +'-6'"></td>
                                            </template>
                                            <template v-else-if="item.weekDay === 2">
                                                <td :id="'td'+ (index-1) +'-0'"></td>
                                                <td :id="'td'+ (index-1) +'-1'"></td>
                                                <td :id="'td'+ (index-1) +'-2'" @click="beforeChange">{{item.shiftName}}</td>
                                                <td :id="'td'+ (index-1) +'-3'"></td>
                                                <td :id="'td'+ (index-1) +'-4'"></td>
                                                <td :id="'td'+ (index-1) +'-5'"></td>
                                                <td :id="'td'+ (index-1) +'-6'"></td>
                                            </template>
                                            <template v-else-if="item.weekDay === 3">
                                                <td :id="'td'+ (index-1) +'-0'"></td>
                                                <td :id="'td'+ (index-1) +'-1'"></td>
                                                <td :id="'td'+ (index-1) +'-2'"></td>
                                                <td :id="'td'+ (index-1) +'-3'" @click="beforeChange">{{item.shiftName}}</td>
                                                <td :id="'td'+ (index-1) +'-4'"></td>
                                                <td :id="'td'+ (index-1) +'-5'"></td>
                                                <td :id="'td'+ (index-1) +'-6'"></td>
                                            </template>
                                            <template v-else-if="item.weekDay === 4">
                                                <td :id="'td'+ (index-1) +'-0'"></td>
                                                <td :id="'td'+ (index-1) +'-1'"></td>
                                                <td :id="'td'+ (index-1) +'-2'"></td>
                                                <td :id="'td'+ (index-1) +'-3'"></td>
                                                <td :id="'td'+ (index-1) +'-4'" @click="beforeChange">{{item.shiftName}}</td>
                                                <td :id="'td'+ (index-1) +'-5'"></td>
                                                <td :id="'td'+ (index-1) +'-6'"></td>
                                            </template>
                                            <template v-else-if="item.weekDay === 5">
                                                <td :id="'td'+ (index-1) +'-0'"></td>
                                                <td :id="'td'+ (index-1) +'-1'"></td>
                                                <td :id="'td'+ (index-1) +'-2'"></td>
                                                <td :id="'td'+ (index-1) +'-3'"></td>
                                                <td :id="'td'+ (index-1) +'-4'"></td>
                                                <td :id="'td'+ (index-1) +'-5'" @click="beforeChange">{{item.shiftName}}</td>
                                                <td :id="'td'+ (index-1) +'-6'"></td>
                                            </template>
                                            <template v-else-if="item.weekDay === 6">
                                                <td :id="'td'+ (index-1) +'-0'"></td>
                                                <td :id="'td'+ (index-1) +'-1'"></td>
                                                <td :id="'td'+ (index-1) +'-2'"></td>
                                                <td :id="'td'+ (index-1) +'-3'"></td>
                                                <td :id="'td'+ (index-1) +'-4'"></td>
                                                <td :id="'td'+ (index-1) +'-5'"></td>
                                                <td :id="'td'+ (index-1) +'-6'" @click="beforeChange">{{item.shiftName}}</td>
                                            </template>
                                        </template>
                                        
                                        <td class="workHours">
                                            <button type="button" class="deleteItem" v-show="(index === currentTr) && showDelete">删除本行</button>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- 表格 end -->
            <div id="remarks"></div>
            <div id="select-user">
                <table class="user-table"></table>
            </div>
        </div>
        <div id="btnChange" v-show="showChangeBtn">
            <button type="button" class="btnDefault bgOrange" @click="changeShift">交换</button>
        </div>
        <!-- 选择站务员 -->
        <Modal v-model="showUserModal"
            id="usersModal"
            title="选择站务员" 
            width="600"
            @on-ok="selectUser"
            @on-cancel="cancel">
            <button type="button" class="btnDefault bgBlue" @click="handleCancel">取消</button>
            <div class="userList">
                <span :class="{'selected': userIds.has(item.userId)}" v-for="(item,index) in users" :key="index" @click="clickUser" :code="item.userId">{{item.userName}}</span>
            </div>
        </Modal>
    </div>
</template>
<script>
    let self = null;
    import {result} from '@/assets/data/data.js'
    export default {
        data:function () {
            return {
                showChangeBtn: false,
                showTable: false,
                globalShiftCounts: {},
                globalShiftIds: [],
                users: [],
                showUserModal: false,
                userName: '',
                userId: null,
                result: result,
                shifts: ['班制一','班制二'],
                currentShift: '',
                showSaveBtn: false,
                showResult: false,
                result: {
                    dayAverage: 0,
                    weekAverage: 0,
                    monthAverage: 0,
                    yearAverage: 0,
                    minPeople: 0
                },
                week: {
                    monday: '--',
                    tuesday: '--',
                    wednesday: '--',
                    thursday: '--',
                    friday: '--',
                    saturday: '--',
                    sunday: '--',
                },
                data: result.weeks,
                currentTr: null,
                showDelete: false,
                totalHours: 0,
                weekMinHours: 0,
                weekMaxHours: 0,
                userIds: new Set(),     //  存放已选择的站务员id
                selectedTds: new Map(),
                currentRows: new Map()
            }
        },
        mounted: function () {
            self = this;
        },
        methods:{
            //  加载模板
            loadtemplate: function(){
                let data = result.data;
                let dataLen = data.length;
                this.totalHours = 0;
                for(let i=0;i<dataLen;i++){
                    let obj = data[i];
                    let n = obj.weekNumber;
                    let m = obj.weekDay;
                    let hours = obj.shiftMinutes/60;
                    this.totalHours += hours;
                    $('#td'+ n + '-'+ m).html(obj.shiftName).css('background-color', '#' + obj.shiftColor).attr({'data-hours': hours,'code': i});
                }
                self.calcAverage();
                $(".workHours").each(function (n) {
                    self.calcWeeklyTime(n);
                });
                self.globalShiftCounts = result.shifts;
                self.globalShiftIds = result.shiftIds;
                $("#btnLoad").hide();
                //codes = result.codes;
                //setCodes();
                
                //self.initUserTable(result.users);
                self.users = result.users;
                result.owners && self.drawOwners(result.owners);
                $("th[thead]").each(function(n) {
                    self.calcDailySchedule(n);
                });
                this.showTable = true;
            },
            //  计算周工时
            calcWeeklyTime: function (n) {
                if(!n){
                    return;
                }
                let currentTd = $(".workHours:eq(" + n + ")");
                let works = currentTd.parent().find("td[data-hours]");
                let hours = 0;
                for (let i = 0; i < works.length; i++) {
                    hours += parseInt(works.eq(i).attr('data-hours'));
                }
                //  低于或者高于平均值的百分之十显示红色
                if(hours>this.weekMaxHours || hours<this.weekMinHours){
                    currentTd.find('span').addClass('red');
                } else {
                    currentTd.find('span').removeClass('red');
                }
                currentTd.find('span').html(hours);
                //  如果排班为空，显示删除本行按钮
                if (hours == 0) {
                    this.currentTr = n;
                    this.showDelete = true;
                }
            },
            //  计算工时平均值
            calcAverage: function () {
                let length = result.weeks;
                let daily = this.totalHours / length / 7;
                let weekly = daily * 7;
                let monthly = daily * 30;
                let yearly = daily * 365;
                this.weekMinHours = weekly * 0.9;
                this.weekMaxHours = weekly * 1.1;
                self.result.dayAverage = Math.round(daily * 1000) / 1000;
                self.result.weekAverage = Math.round(weekly * 1000) / 1000;
                self.result.monthAverage = Math.round(monthly * 1000) / 1000;
                self.result.yearAverage = Math.round(yearly * 1000) / 1000;
                self.result.minPeople = length;
                self.showResult = true;
            },
            initUserTable: function (users) {
                $(".user-table").empty();
                var rowNum = users.length / 6;
                {
                    var tr = $("<tr></tr>");
                    $(tr).append($("<td userId='-1' userName=''>取消</td>"));
                    $(".user-table").append(tr);
                }
                for (var i = 0; i < rowNum; i++) {
                    var tr = $("<tr></tr>");
                    for (var j = 0; j < 6; j++) {
                        var index = i * 6 + j;
                        if (index >= users.length) {
                            continue;
                        }
                        var user = users[index];
                        var td = $("<td></td>");
                        td.attr("userId", user.userId).attr("userName", user.userName);
                        td.text(user.userName);
                        $(tr).append(td);
                    }
                    $(".user-table").append(tr);
                }
            },
            drawOwners: function (owners) {
                for (var i = 0; i < owners.length; i++) {
                    var userId = owners[i].userId;
                    var userName = owners[i].userName;
                    var week = owners[i].weekNumber;
                    $("[tdType=-1]:eq(" + week + ")").attr("userId", userId).text(userName);
                    $(".user-table td[userId='" + userId + "']").css("color", "orange");
                }
            },
            calcDailySchedule: function (n) {
                var header=$("th[thead="+n+"]");
                var array=$("[tdType="+n+"]>div");
                var counts={};
                for(var i=0;i<array.length;i++){
                    var id=$(array[i]).attr("shiftId")+"";
                    if(!counts[id]){
                        counts[id]=0;
                    }
                    counts[id]+=1;
                }
                var html="";
                for(var i=0;i<this.globalShiftIds.length;i++){
                    var index = this.globalShiftIds[i];
                    var c = counts[index];
                    var num = this.globalShiftCounts[index].shiftNum;
                    html += "<span";
                    if(c!=num){
                        html+=" style='color:red'";
                    }else {
                        html+=" style='color:white'";
                    }
                    html += ">";
                    html += this.globalShiftCounts[index].shiftName;
                    html += ":";
                    html += c;
                    html += "</span><br/>";
                }
                $(header).html(html);
            },
            //  点击站务员表格
            clickUserTd: function (e) {
                let obj = $(e.target);
                $('#usersModal').find('.active').removeClass('active');
                this.showUserModal = true;
                $(".userName").removeClass("td-active");
                obj.addClass("td-active");
                $(".user-table td").css("color", "green");
                $("[tdType=-1]").each(function () {
                    let userId = $(this).attr("userId");
                    if (userId.length > 0) {
                        $(".user-table td[userId=" + userId + "]").css("color", "orange");
                    }
                });
            },
            //  选择站务员
            clickUser: function (e) {
                let obj = $(e.target);
                this.userName = obj.html();
                this.userId = obj.attr('code');
                obj.toggleClass('active').siblings().removeClass('active');
            },
            //  确定选择站务员
            selectUser: function () {
                $('.userName[code="'+ this.userId +'"]').html('');
                $('.userName.td-active').attr('code', this.userId).html(this.userName).removeClass('td-active');
                if(this.userId){
                    this.userIds.add(this.userId);
                }
            },
            //  取消站务员
            handleCancel: function () {
                let userId = $('.userName.td-active').attr('code');
                $('.userName.td-active').html('').removeClass('td-active');
                this.showUserModal = false;
                if(userId){
                    this.userIds.delete(this.userId);
                }
            },
            //  点击选择站务员模态框取消按钮
            cancel: function () {
                $('.userName.td-active').removeClass('td-active');
            },
            //  点击排班单元格
            beforeChange: function (e) {
                let target = $(e.target);
                let map = this.selectedTds;
                let size = map.size;
                let index = parseInt($(target).attr('code'));
                let key = target.attr('id');
                let data = result.data;
                let value = index ? {
                    'weekNumber': data[index].weekNumber,
                    'weekDay': data[index].weekDay
                } : undefined;
                if(size<2){
                    map.set(key, value);
                }
                if (target.hasClass("td-active")) {
                    target.removeClass("td-active");
                    map.delete(key);
                    $("#btnChange").hide();
                    self.showChangeBtn = false;
                } else {
                    let actived = $(".td-active");
                    if(size > 1){
                        this.$Message.error("不可选中,选中节点过多");
                        return;
                    } else{
                        let row = $(target).parent().attr('row');
                        target.addClass("td-active");
                        if (size === 1) {
                            this.currentRows.set(1, row);
                            let a = actived[0];
                            $("#btnChange").css({"top":(e.pageY-20)+'px',"left":(e.pageX-200)+'px'});
                            this.showChangeBtn = true;
                            return;
                        }
                        this.currentRows.set(0, row);
                    }
                }
            },
            //  交换排班
            changeShift: function () {
                let map = this.selectedTds;
                if(map.size !== 2){
                    this.$Message.error("操作失败，无法定位交换节点");
                    return;
                }
                let arr = [...map.entries()];
                let first = arr[0];
                let second = arr[1];
                if(first[1] && second[1]){
                    let index1 = parseInt($('#'+first[0]).attr('code'));
                    let index2 = parseInt($('#'+second[0]).attr('code'));
                    result.data[index1].weekNumber = second[1].weekNumber;
                    result.data[index1].weekDay = second[1].weekDay;
                    result.data[index2].weekNumber = first[1].weekNumber;
                    result.data[index2].weekDay = first[1].weekDay;
                } else if(!first[1] && second[1]){
                    let index = parseInt($('#'+second[0]).attr('code'));
                    let str = first[0].substring(2);
                    let arr = str.split('-');
                    result.data[index].weekNumber = parseInt(arr[0]);
                    result.data[index].weekDay = parseInt(arr[1]);
                    $('#'+second[0]).html('').removeAttr('data-hours').removeAttr('style').removeAttr('code');
                } else if(!second[1] && first[1]){
                    let index = parseInt($('#'+first[0]).attr('code'));
                    let str = second[0].substring(2);
                    let arr = str.split('-');
                    result.data[index].weekNumber = parseInt(arr[0]);
                    result.data[index].weekDay = parseInt(arr[1]);
                    $('#'+first[0]).html('').removeAttr('data-hours').removeAttr('style').removeAttr('code');
                }
                
                $('.td-active').removeClass('td-active');
                this.loadtemplate();
                this.showChangeBtn = false;
                map.clear();
                console.log(this.currentRows)
                for(let i=0;i<2;i++){
                    let row = this.currentRows.get(i);
                    let span = $('tr[row="'+ row +'"]').find('.workHours').find('span');
                    let html = span.html();
                    if(html === '0'){
                        console.log(111)
                        this.currentTr = row;
                        $('[row="'+ row +'"]').find('button').show();
                        span.html('');
                        break;
                    }
                }                
            },
            deleteTr: function (index) {
                $('[row="'+ index +'"]').remove();
            }

        }
    }
    $(function () {
        
        //  建立模版
        $(document).on("click", "#btnGenerate", function () {
            console.log(result)
            self.$Message.success("正在排班中,请稍后!");
            var stationId = $(".menu .active a").attr("data-groupId");
            var zwyId = $("select").val();
            var startAt = $("#startAt").val();
            let week = null;
            $("#tab1").addClass("active");
            $("#timepick").show();
            $("#btnSave").show();
            var data = result.data;
            $("#theHead0").empty();
            var w = parseInt($('.scheduleForm').width()/9)-4;
            $("#theHead0").append("<th width='"+w+"'>站务员</th>");
            for (var i = 0; i < 7; i++) {
                $("#theHead0").append("<th width='"+w+"' thead=" + i + ">" + i + "</th>");
            }
            $("#theHead0").append("<th width='"+w+"'>周工时</th>");
            $("#theBody").empty();
            for (var i = 0; i <= result.weeks; i++) {
                var node = "<tr  ><td class='userName' tdType='-1' userId='' weekNumber='" + i + "'></td>";
                for (var j = 0; j < 7; j++) {
                    node += "<td tdType='" + j + "' id='row" + i + "col" + j + "' ></td>";
                }
                node += "<td tdType='8' id='time" + i + "' tLength='" + i + "'>0</td>";
                node += "</tr>";
                $("#theBody").append(node);
            }
            for (var i = 0; i < data.length; i++) {
                var template = data[i];
                var tdId = "row" + template.weekNumber + "col" + template.weekDay;
                var html = "<div style='width:100%;height:100%;' duration=" + template.shiftMinutes + " templateId='"+template.id+"' shiftId='" + template.shiftId + "' >" + template.serialNumber + "</div>";
                $("#" + tdId).html(html);
                $("#" + tdId).css("background-color", "#" + template.shiftColor);
            }
            self.globalShiftCounts = result.shifts;
            self.globalShiftIds = result.shiftIds;
            $("td[tLength]").each(function (n) {
                self.calcWeeklyTime(n);
            });
            $("#btnLoad").hide();
            self.calcAverage();
            self.initUserTable(result.users);
            $("th[thead]").each(function(n) {
                self.calcDailySchedule(n);
            });
        });
    })
    
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>