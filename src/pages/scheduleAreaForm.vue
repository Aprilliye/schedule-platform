<template>
    <div>
        <!-- 右侧内容 start -->
        <div class="content-header" style="overflow:visible;">
            <div class="float-left">
                <a class="btnDefault active" href="#tab1" onclick="zbftn()" data-toggle="tab">周表</a>
                <a class="btnDefault" href="#tab2" onclick="ybftn()" data-toggle="tab">月表</a>
                <div class="tab-content float-right">
                    <div id="tab1" class="tab-pane active ">
                        <div class="form_line">
                            <div class="float-left timePick">
                                <label>时间段</label>
                                <select id="dateSelec" name="dateSelect">
                                    <option value="一周">一周</option>
                                    <option value="两周">二周</option>
                                </select>
                            </div>
                            <div class='input-group float-left'>
                                <DatePicker type="date" placeholder="" style="width: 130px">
                                </DatePicker>
                                <span>至</span>
                            </div>

                            <div class='input-group float-left'>
                                <DatePicker type="date"  placeholder="" style="width: 130px">
                                </DatePicker>
                            </div>

                        </div>
                    </div>
                    <!--<div id="tab2" class="tab-pane">-->
                        <!--<div class="form_line">-->
                            <!--<label>时间段</label>-->
                            <!--<div class='input-group datetimepicker month'>-->
                                <!--<input type='text' class="form-control" name="monthDate" id="monthDate"/>-->
                                <!--<em class="input-group-addon">-->
                                    <!--<i class="glyphicon glyphicon-calendar"></i>-->
                                <!--</em>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="clear"></div>
            <div class="">
                <div class="form_line float-left">
                    <label>站区</label>
                    <select name="stationArea" id="stationAreaQuery">
                        <option value="">请选择</option>
                        <option value="$!group.groupCode">$!group.groupName</option>
                    </select>
                </div>
                <div class="form_line float-left">
                    <label>站点</label>
                    <select name="station" id="stationQuery">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="form_line float-left">
                    <label>站点</label>
                    <select name="station" id="postName">
                        <option value="站务员">站务员</option>
                        <option value="替班员">替班员</option>
                    </select>
                </div>
                <div class="search-input float-left">
                    <span class="icon-5"></span>
                    <input type="text" name="queryData" id="queryData" placeholder="姓名/编号">
                </div>
                <a class="btnDefault bgBlue queryBtn" onclick="queryBtn()" href="javascript:;">查询</a>
                <a class="btnDefault" href="javascript:;" onclick="myPrint()">导出</a>
            </div>
            <div class="clear"></div>
        </div>
        <!-- 右侧内容 end -->
        <!-- 表格 start -->
        <!--<div class="wrapper">-->
            <!--<div class="heading">-->
                <!--<ul class="float-right">-->
                    <!--<li><span class="bgYellow"></span>换班/加班</li>-->
                    <!--<li><span class="bgGreen"></span>请假</li>-->
                    <!--<li><span class="bgRed"></span>结余</li>-->
                <!--</ul>-->
            <!--</div>-->
            <!--<div  id="print">-->
                <!--<div class="schedule">-->
                    <!--<table class="scheduleForm">-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<th></th>-->
                            <!--<th></th>-->
                            <!--<th>3</th>-->
                            <!--<th>4</th>-->
                            <!--<th>5</th>-->
                            <!--<th>6</th>-->
                            <!--<th>7</th>-->
                            <!--<th>8</th>-->
                            <!--<th>9</th>-->
                            <!--<th>10</th>-->
                            <!--<th>11</th>-->
                            <!--<th>12</th>-->
                            <!--<th>13</th>-->
                            <!--<th>14</th>-->
                            <!--<th>15</th>-->
                            <!--<th>16</th>-->
                            <!--<th class="dark"></th>-->
                            <!--<th class="dark"></th>-->
                            <!--<th class="dark"></th>-->
                        <!--</tr>-->
                        <!--<tr>-->
                            <!--<th>姓名</th>-->
                            <!--<th>岗位</th>-->
                            <!--<th>星期一</th>-->
                            <!--<th>星期二</th>-->
                            <!--<th>星期三</th>-->
                            <!--<th>星期四</th>-->
                            <!--<th>星期五</th>-->
                            <!--<th>星期六</th>-->
                            <!--<th>星期天</th>-->
                            <!--<th>星期一</th>-->
                            <!--<th>星期二</th>-->
                            <!--<th>星期三</th>-->
                            <!--<th>星期四</th>-->
                            <!--<th>星期五</th>-->
                            <!--<th>星期六</th>-->
                            <!--<th>星期天</th>-->
                            <!--<th class="dark">计划工时</th>-->
                            <!--<th class="dark">实际工时</th>-->
                            <!--<th class="dark">假期</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr>-->
                            <!--<td class="dark">A</td>-->
                            <!--<td>综控员</td>-->
                            <!--<td>早</td>-->
                            <!--<td>早</td>-->
                            <!--<td>中</td>-->
                            <!--<td>中</td>-->
                            <!--<td>晚</td>-->
                            <!--<td>早</td>-->
                            <!--<td>休</td>-->
                            <!--<td class="bgGreen">中</td>-->
                            <!--<td class="bgYellow">早</td>-->
                            <!--<td>晚</td>-->
                            <!--<td>晚</td>-->
                            <!--<td>晚</td>-->
                            <!--<td>休</td>-->
                            <!--<td>夜</td>-->
                            <!--<td>65</td>-->
                            <!--<td class="edit">67</td>-->
                            <!--<td class="bgRed">2</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                    <!--</table>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; 表格 end &ndash;&gt;-->
        <!--&lt;!&ndash; 备注信息 &ndash;&gt;-->
        <!--<div id="remarks" class="hidden">-->
            <!--<p class="head">旷工</p>-->
            <!--<p class="con">2017年4月11日</p>-->
            <!--<p class="con">备注：因个人原因请假一天</p>-->
            <!--<ul class="editRecord">-->
                <!--<li>-->
                    <!--<em></em>-->
                    <!--<p>2017-4-11 14：23：32</p><p>曹骏一对此条状态进行了创建</p>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--&lt;!&ndash; 右键菜单 &ndash;&gt;-->
        <!--<div id="rightMenu" class="hidden">-->
            <!--<a href="" data-toggle="modal" data-target="#editHoliday">假期编辑</a>-->
            <!--<a href="" data-toggle="modal" data-target="#shiftChange">班次变更</a>-->
            <!--<a href="" data-toggle="modal" data-target="#provisionalDisposition">临时安排</a>-->
            <!--<a href="" data-toggle="modal" data-target="#minersAbsence">旷工缺勤</a>-->
            <!--<a href="" data-toggle="modal" data-target="#overtimeWork">补班加班</a>-->
        <!--</div>-->
        <!--&lt;!&ndash; 假期编辑 &ndash;&gt;-->
        <!--<div class="modal" id="editHoliday" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">-->
            <!--<div class="modal-dialog " role="document">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<a href="javascript:;" class="close icon-1" data-dismiss="modal" aria-label="Close"></a>-->
                        <!--<h4 class="modal-title">假期编辑</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body">-->
                        <!--<input id="minDate" type="hidden">-->
                        <!--<form class="form-container" id="editHolidayForm">-->
                            <!--<div class="form_line">-->
                                <!--<input name="userId" type="hidden">-->
                                <!--<input name="scheduleInfoId" type="hidden">-->
                                <!--<input name="logId" id="logId" type="hidden">-->
                                <!--<input name="logType" type="hidden" value="假期编辑">-->
                                <!--<label>假期类型</label>-->
                                <!--<select name="detailType">-->
                                    <!--<option>病假/病</option>-->
                                    <!--<option>事假/事</option>-->
                                    <!--<option>婚假/婚</option>-->
                                    <!--<option>丧假/丧</option>-->
                                    <!--<option>探亲假/探</option>-->
                                    <!--<option>生育津贴假/产1</option>-->
                                    <!--<option>企业延长产假/产2</option>-->
                                    <!--<option>男方陪产假/产陪</option>-->
                                    <!--<option>计生假/计</option>-->
                                    <!--<option>工伤假/工</option>-->
                                    <!--<option>旷工假/旷</option>-->
                                    <!--<option>搬家假/搬</option>-->
                                    <!--<option>出差假/差</option>-->
                                    <!--<option>迟到/迟</option>-->
                                    <!--<option>早退/早退</option>-->
                                    <!--<option>年假/年</option>-->
                                    <!--<option>其他假/其</option>-->
                                    <!--<option>调休/调</option>-->
                                <!--</select>-->
                            <!--</div>-->
                            <!--<div class="form_line">-->
                                <!--<label>假期时间</label>-->
                                <!--<div class='input-group datetimepicker'>-->
                                    <!--<input type='text' class="form-control" name="startAt"/>-->
                                    <!--<em class="input-group-addon">-->
                                        <!--<i class="glyphicon glyphicon-calendar"></i>-->
                                    <!--</em>-->
                                <!--</div>-->
                                <!--<span>至</span>-->
                                <!--<div class='input-group datetimepicker'>-->
                                    <!--<input type='text' name="endAt" class="form-control"/>-->
                                    <!--<em class="input-group-addon">-->
                                        <!--<i class="glyphicon glyphicon-calendar"></i>-->
                                    <!--</em>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form_line">-->
                                <!--<label>备注</label>-->
                                <!--<textarea name="remark"></textarea>-->
                            <!--</div>-->
                            <!--<div class="clear"></div>-->
                        <!--</form>-->
                    <!--</div>-->
                    <!--<div class="modal-footer">-->
                        <!--<a class="btn btn-confirm" href="javascript:;" onclick="editHoliday()">假期上报</a>-->
                        <!--<button class="btn btn-cancel" href="javascript:;" data-dismiss="modal" aria-label="Close">取消</button>-->
                        <!--<a class="btn btn-red" href="javascript:;" onclick="editHolidayDel()">撤销假期</a>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>