<template>
    <div class="container">
        <div class="menu">
            <p class="menu-head" style="font-size: 13px"></p>
            <ul class="nav nav-tabs">
                <li><a href="#" data-groupId="$grouping.groupId" data-toggle="tab"></a></li>
            </ul>
        </div>
        <div class="content">
            <div class="content-header" style="overflow:visible;display: inline-block">
                <div class="form-container">
                    <div id="autoForm"></div>
                    <div class="form_line" id="timepick" style="display: none">
                        <span class="title">选择开始日期</span>
                        <span class='input-group datetimepicker'>
                            <input type='text' name="startAt" id="startAt" class="form-control"/>
                            <em class="input-group-addon">
                                <i class="glyphicon glyphicon-calendar"></i>
                            </em>
                        </span>
                    </div>
                    <div class="form_line">
                        <button class="btnDefault bgOrange autoBtn" id="btnLoad" @click="loadtemplate">加载模板</button>
                        <button class="btnDefault bgBlue autoBtn" id="btnGenerate">建立模板</button>
                        <button class="btnDefault bgGreen autoBtn" id="btnSave">保存排班</button>
                    </div>
                    <div class="form_line">
                        <p class="noPlan" style="display: none;"><em>?</em>日平均<span id="dailyAverage" class="blue"></span>小时,
                            周平均<span id="weeklyAverage" class="blue"></span>小时,
                            30日平均<span id="monthlyAverage" class="blue"></span>小时,
                            365日平均<span id="yearlyAverage" class="blue"></span>小时,
                            最少人数<span id="minimiumWorkerCount" class="blue"></span>人</p>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <!-- 表格 start -->
            <div class="wrapper" style="padding-top:0;">
                <div class="tab-content">
                    <div class="tab-pane" id="tab2">
                        <p class="noPlan"><em>?</em>请选择各个岗位的排班方案，并点击右侧的<span class="blue">生成模板</span>按钮</p>
                    </div>
                    <div class="tab-pane in active" id="tab1">
                        <div class="schedule postformtable">
                            <table class="scheduleForm" >
                                <thead>
                                <tr id="theHead0"></tr>
                                </thead>
                                <tbody id="theBody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- 表格 end -->
            <div id="remarks"></div>
            <div id="select-user"
                 style="display: none;background-color:white;position:absolute;left: 30%; top: 30%; z-index: 20">
                <table class="user-table">

                </table>
            </div>
        </div>
        <div id="btnChange" style="display:none">
            <a class="btnDefault bgOrange" href="javascript:;">交换</a>
        </div>
        
        <Modal v-model="showUserModal"
            id="usersModal"
            title="选择站务员" 
            width="600"
            @on-ok="selectUser"
            @on-cancel="cancel">
            <button type="button" class="btnDefault bgBlue" @click="handleCancel">取消</button>
            <div class="userList">
                <span v-for="(item,index) in users" :key="index" @click="clickUser" :code="item.userId">{{item.userName}}</span>
            </div>
        </Modal>
    </div>
</template>
<script>
    let self = null;
    import {result} from '@/assets/js/data.js'
    export default {
        data:function () {
            return {
                globalShiftCounts: {},
                globalShiftIds: [],
                users: [],
                showUserModal: false,
                userName: '',
                userId: null,
                result: result
            }
        },
        mounted: function () {
            self = this;
        },
        methods:{
            loadtemplate:function(){
                $(".buttonnone").css("display","none");
                $(".showBtn").css("display","inline-block");
                var modelId = $("select").val();
                var stationId = $(".menu .active a").attr("data-groupId");
                $("#tab1").addClass("active");
                $("#timepick").show();
                $("#btnSave").show();
                var data = result.data;
                self.result = result;
                $("#theHead0").empty();
                var w = parseInt($('.scheduleForm').width()/9)-4;
                $("#theHead0").append("<th width='"+ w +"'>站务员</th>");
                for (var i = 0; i < 7; i++) {
                    $("#theHead0").append("<th width='"+ w +"' thead=" + i + ">" + i + "</th>");
                }
                $("#theHead0").append("<th width='"+ w +"'>周工时</th>");
                $("#theBody").empty();
                for (var i = 0; i <= result.weeks; i++) {
                    var node = "<tr><td class='userName' tdType='-1' userId='' weekNumber='" + i + "'></td>";
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
                $("td[tLength]").each(function (n) {
                    self.calcWeeklyTime(n);
                });
                self.globalShiftCounts=result.shifts;
                self.globalShiftIds=result.shiftIds;
                $("#btnLoad").hide();
                //codes = result.codes;
                //setCodes();
                self.calcAverage();
                //self.initUserTable(result.users);
                self.users = result.users;
                result.owners && self.drawOwners(result.owners);
                $("th[thead]").each(function(n) {
                    self.calcDailySchedule(n);
                });
            },
            calcWeeklyTime: function (n) {
                if (n != null && n != undefined) {
                    var timeTd = $("td[tLength]:eq(" + n + ")");
                    var works = $(timeTd).closest("tr").find("div[duration]");
                    var time = 0;
                    for (var i = 0; i < works.length; i++) {
                        time += parseInt($(works[i]).attr("duration"));
                    }
                    $(timeTd).text(time / 60);
                    if (time == 0) {
                        $(timeTd).html("<a href='javascript:;' class='deleteItem' name='btnRemoveLine' weekNumber=" + n + ">删除本行</a>")
                    }
                }
            },
            calcAverage: function () {
                var times = 0;
                var length = $("[tdType=-1]").length;
                $("div[duration]").each(function (n) {
                    times += parseInt($(this).attr("duration"));
                });
                var daily = times / length / 60 / 7;
                var weekly = daily * 7;
                var monthly = daily * 30;
                var yearly = daily * 365;
                $("#dailyAverage").text(Math.round(daily * 1000) / 1000);
                $("#weeklyAverage").text(Math.round(weekly * 1000) / 1000);
                $("#monthlyAverage").text(Math.round(monthly * 1000) / 1000);
                $("#yearlyAverage").text(Math.round(yearly * 1000) / 1000);
                $("#minimiumWorkerCount").text(length);
                $(".noPlan").show();
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
            clickUser: function (e) {
                let obj = $(e.target);
                this.userName = obj.html();
                this.userId = obj.attr('code');
                obj.toggleClass('active').siblings().removeClass('active');
            },
            //  选择站务员
            selectUser: function () {
                $('.userName[code="'+ this.userId +'"]').html('');
                $('.userName.td-active').attr('code', this.userId).html(this.userName).removeClass('td-active');
            },
            //  取消站务员
            handleCancel: function () {
                $('.userName.td-active').html('').removeClass('td-active');
                this.showUserModal = false;
            },
            //  点击选择站务员模态框取消按钮
            cancel: function () {
                $('.userName.td-active').removeClass('td-active');
            }

        }
    }
    $(function () {
        //  点击表格交换排班
        $(document).on("click", "td[tdType]", function (e) {
            var type = $(this).attr("tdType");
            if(type==-1 || type>6){
                return ;
            }
            if ($(this).hasClass("td-active")) {
                $(this).removeClass("td-active");
                $("#btnChange").hide();
            } else {
                var actived = $(".td-active");
                if (actived.length > 1) {
                    self.$Message.error("不可选中,选中节点过多");
                    return;
                } else if (actived.length == 0) {
                    $(this).addClass("td-active");
                } else {
                    var a = actived[0];
                    $(this).addClass("td-active");
                    $("#btnChange").css({"top":(e.pageY-20)+'px',"left":(e.pageX-100)+'px'}).show().find('a').show();
                }
            }
        });
        //  点击站务员表格
        $(document).on("click", ".userName", function (e) {
            $('#usersModal').find('.active').removeClass('active');
            self.showUserModal = true;
            $(".userName").removeClass("td-active");
            $(this).addClass("td-active");
            $(".user-table td").css("color", "green");
            $("[tdType=-1]").each(function () {
                var userId = $(this).attr("userId");
                if (userId.length > 0) {
                    $(".user-table td[userId=" + userId + "]").css("color", "orange");
                }
            });
        });
        //  交换排班
        $(document).on("click", "#btnChange", function () {
            var actived = $(".td-active");
            if (actived.length != 2) {
                self.$Message.error("操作失败，无法定位交换节点");
                return;
            }
            var first = actived[0];
            var last = actived[1];
            var type = $(first).attr("tdType");
            var id1 = first.id;
            var id2 = last.id;
            var modelId = $("select").val();
            var fhtml = $(first).html();
            var lhtml = $(last).html();
            $(first).removeClass("td-active");
            $(last).removeClass("td-active");
            var fbgcolor = $(first).css("background-color");
            var lbgcolor = $(last).css("background-color");
            $(first).html(lhtml);
            $(last).html(fhtml);
            $(first).css("background-color", lbgcolor);
            $(last).css("background-color", fbgcolor);
            $("#btnChange").hide();
            $("td[tLength]").each(function (n) {
                self.calcWeeklyTime(n);
            });
            $("th[thead]").each(function(n) {
                self.calcDailySchedule(n);
            });
        });
        //  删除一行排班
        $(document).on("click", "[name=btnRemoveLine]", function () {
            var weekNumber = $(this).attr("weekNumber");
            var modelId = $("select").val();
            var line = $(this).closest("tr");
            $(line).remove();
            self.calcAverage();
        });
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