<template>
    <div class="container">
        <div class="content-header">
            <span>选择班制：</span>
            <Select v-model="shift" style="width:200px" @on-change="changeShift">
                <Option v-for="item in shifts" :value="item.shiftId" :key="item.shiftId">{{ item.shiftName }}</Option>
            </Select>
            <button type="button" class="btnDefault bgBlue">创建排班</button>
            <button type="button" class="btnDefault">保存排班</button>
        </div>
        <div class="schedule postformtable">
            <table class="scheduleForm" >
                <tr>
                    <th>站务员</th>
                    <th>星期一</th>
                    <th>星期二</th>
                    <th>星期三</th>
                    <th>星期四</th>
                    <th>星期五</th>
                    <th>星期六</th>
                    <th>星期日</th>
                    <th>总工时</th>
                </tr>
                <tr v-for="(item, index) in users" :key="index">
                    <td code="item.userId">{{item.userName}}</td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                    <td @click="beforeSelectShift"></td>
                </tr>
            </table>
        </div>
        <!-- 选择排班 -->
        <Modal v-model="shiftsModal"
            id="usersModal"
            title="选择站务员" 
            width="600"
            @on-ok="selectShift"
            @on-cancel="cancel">
            <button type="button" class="btnDefault bgBlue" @click="handleCancel">取消</button>
            <div class="userList">
                <span v-for="item in modalShifts" :key="item.shiftId" @click="clickShift(item)" :code="item.shiftId">{{item.shiftName}}</span>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            shiftsModal: false,
            shifts: [
                {
                    shiftName: '班制一',
                    shiftId: 1,
                    users: [
                        {userName: '封伟', userId: 0 },
                        {userName: '王惠云', userId: 1},
                        {userName: '祁爱军', userId: 2},
                        {userName: '鞠淑云', userId: 3},
                        {userName: '孟凡君', userId: 4}
                    ],
                },
                {
                    shiftName: '班制二',
                    shiftId: 2,
                    users: [
                        {userName: '张海军', userId: 0 },
                        {userName: '王素梅', userId: 1},
                        {userName: '王磊', userId: 2}
                    ],
                },
            ],
            users: [
                {userName: '封伟', userId: 0 },
                {userName: '王惠云', userId: 1},
                {userName: '祁爱军', userId: 2},
                {userName: '鞠淑云', userId: 3},
                {userName: '孟凡君', userId: 4}
            ],
            shift: 1,
            shiftsMap: new Map(),
            modalShifts: [
                {shiftName: '白班', shiftId: 0}, 
                {shiftName: '早班', shiftId: 1}, 
                {shiftName: '中班', shiftId: 2}, 
                {shiftName: '晚班', shiftId: 3}, 
                {shiftName: '上夜班', shiftId: 4}, 
                {shiftName: '下夜班', shiftId: 5}
            ],
            currentShift: {
                shiftId: null,
                shiftName: ''
            },
        }
    },
    created: function () {
        for(let obj of this.shifts){
            this.shiftsMap.set(obj.shiftId, obj.users);
        }
    },
    methods: {
        changeShift: function () {
            this.users = this.shiftsMap.get(this.shift);
        },
        //  选择班次取消
        cancel: function () {
            $('.userList').find('.active').removeClass('active');
        },
        //  取消已选班次
        handleCancel: function () {
            $('.currentTd').html('').removeAttr('code'); 
            this.shiftsModal = false;
        },
        // 点击单元格选择班次
        beforeSelectShift: function (e) {
            $(e.target).addClass('currentTd');
            this.shiftsModal = true;
        },
        //  点击模态框班次
        clickShift: function (item) {
            this.currentShift.shiftId =  item.shiftId;
            this.currentShift.shiftName = item.shiftName;
            $('span[code="' + item.shiftId + '"]').addClass('active').siblings().removeClass('active');
        },
        //  选择班次确定
        selectShift: function () {
            $('.currentTd').html(this.currentShift.shiftName).attr('code', this.currentShift.shiftId).removeClass('currentTd');    
            $('.userList').find('.active').removeClass('active');        
        },
    }
}
</script>

