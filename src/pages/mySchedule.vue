<template>
<div class="container">
    <div class="content-header">
        <button class="btnDefault" :class="{'bgBlue': showTabItem }" @click="showTabItem = true">周表</button>
        <button class="btnDefault" :class="{'bgBlue': !showTabItem }" @click="showTabItem = false">月表</button>
    </div>
    <div class="postformtable" v-show="showTabItem">
        <table>
            <tr>
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
            <tr>
                <td>3I2</td>
                <td>休</td>
                <td>5A1</td>
                <td>6</td>
                <td>休</td>
                <td>1I</td>
                <td>4C</td>
                <td>38</td>
                <td>38</td>
                <td>0</td>
            </tr>
        </table>
    </div>
    <div class="postformtable" v-show="!showTabItem">
        <table>
            <tr>
                <th>5.1</th>
                <th>5.2</th>
                <th>5.3</th>
                <th>5.4</th>
                <th>5.5</th>
                <th>5.6</th>
                <th>5.7</th>
                <th>5.8</th>
                <th>5.9</th>
                <th>5.10</th>
                <th>5.11</th>
                <th>5.12</th>
                <th>5.13</th>
                <th>5.14</th>
                <th colspan="3">总计：14天</th>
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
                <th>计划工时</th>
                <th>实际工时</th>
                <th>结余</th>
            </tr>
            <tr>
                <td>3I2</td>
                <td>休</td>
                <td>5A1</td>
                <td>6</td>
                <td>休</td>
                <td>1I</td>
                <td>4C</td>
                <td>5I</td>
                <td>6</td>
                <td>休</td>
                <td>1C</td>
                <td>1B2</td>
                <td>3A3</td>
                <td>休</td>
                <td>76</td>
                <td>76</td>
                <td>0</td>
            </tr>
        </table>
    </div>
</div>
</template>
<script>
export default {
    data: function () {
        return {
            showTabItem: true
        }
    }
}
</script>

