<template>
    <div>
        <!-- 右侧内容 start -->
        <div class="content-header" style="overflow:visible;">
            <div>
                <a class="btnDefault active float-left" href="#tab1" onclick="zbftn()" data-toggle="tab">周表</a>
                <a class="btnDefault float-left" href="#tab2" onclick="ybftn()" data-toggle="tab">月表</a>
                <div class="tab-content ">
                    <div id="tab1" class="tab-pane active ">
                        <div class="form_line">
                            <div class=" timePick float-left">
                                <label>时间段</label>
                                <select id="dateSelec" name="dateSelect">
                                    <option value="一周">一周</option>
                                    <option value="两周">二周</option>
                                </select>
                            </div>
                            <div class='input-group float-left '>
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
                <div class="form_line float-left ">
                    <label>站点</label>
                    <select name="station" id="stationQuery">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="form_line  float-left">
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
                <a class="btnDefault bgBlue queryBtn float-left" onclick="queryBtn()" href="javascript:;">查询</a>
                <a class="btnDefault float-left" href="javascript:;" onclick="myPrint()">导出</a>
                <a class="btnDefault float-left" href="javascript:;" onclick="mySinglePrint()">导出个人</a>
            </div>
            <div class="clear"></div>
        </div>
        <!-- 右侧内容 end -->

    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>