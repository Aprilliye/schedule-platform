<template>
    <div class="container">
        <div class="content-header">
            <div>
                <button class="btnDefault" :class="{'bgBlue': showTabItem }" @click="showTabItem=true">周表</button>
                <button class="btnDefault" :class="{'bgBlue': !showTabItem }" @click="showTabItem=false">月表</button>
                <div class="tabItem" v-show="showTabItem">
                    <span>时间段：</span>
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker> 至 
                    <DatePicker type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                </div>
                <div class="tabItem" v-show="!showTabItem">
                    <span>时间段：</span>
                    <DatePicker type="month" placeholder="请选择时间" style="width: 200px"></DatePicker>
                </div>
            </div>
            <div style="margin-top: 20px">
                <span>站区：</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>站点：</span>
                <Select v-model="model3" style="width:200px">
                    <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>岗位：</span>
                <Select v-model="model4" style="width:200px">
                    <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <p class="selectbutton">
                    <span class="icon-5" ></span>
                    <input type="text" placeholder="姓名/编号" style="border: 0">
                </p>
                <button type="button" class="btnDefault bgBlue">查询</button>
                <button type="button" class="btnDefault">导出</button>
                <button type="button" class="btnDefault">导出个人</button>
            </div>
        </div>
        <div class="panel-body">
            <div class="float-right" style="margin-top: 20px">
                <a class="btnDefault bgGreen " ><span>切换颜色</span></a>
                <span><i class="colori" style="background-color: #fffc00;"></i>假期</span>
                <span><i class="colori" style="background-color: #ff9191"></i>班次变更</span>
                <span><i class="colori" style="background-color: #3A6BCE"></i>临时安排</span>
                <span><i class="colori" style="background-color: #b10000"></i>旷工缺勤</span>
                <span><i class="colori" style="background-color: #00d537"></i>补班加班</span>
                <span><i class="colori" style="background-color: #008121"></i>替班</span>
            </div>
            <div class="clear"></div>
            <div class="postformtable">
                <table>
                    <tr>
                        <th rowspan="2">姓名</th>
                        <th rowspan="2">岗位</th>
                        <th>5.29</th>
                        <th>5.30</th>
                        <th>5.31</th>
                        <th>6.1</th>
                        <th>6.2</th>
                        <th>6.3</th>
                        <th>6.4</th>
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
                    <tr><td>许迪萌</td><td>站务员</td><td>3I2</td><td>休</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>郭冬云</td><td>站务员</td><td>5I</td><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>那孟超</td><td>站务员</td><td>1H1</td><td>5I</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>王伟</td><td>站务员</td><td>2A1</td><td>1G</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>李珊珊</td><td>站务员</td><td>6</td><td>休</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      showTabItem: false,
      cityList: [
        {
          value: "1",
          label: "一周"
        },
        {
          value: "2",
          label: "两周"
        }
      ],
      model1: "1",
      model2: "",
      model3: "",
      model4: "",
      cityList2: [
        {
          value: "1",
          label: "西直门"
        }
      ],
      cityList3: [
        {
          value: "1",
          label: "西直门"
        }
      ],
      cityList4: [
        {
          value: "1",
          label: "替班员"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>