<template>
    <div class="container">
        <form id="userForm">
            <div class="content-header">
                <div class="float-left">
                    <button class="btnDefault bgGreen mansgebutton" type="button" @click="addPersonModal = true">新增人员</button>
                    <a class="btnDefault" href="#" data-toggle="modal" data-target="#export">导入</a>
                    <a class="btnDefault" href="javascript:void(0)" onclick="printUserTemplate()">模板</a>
                </div>
                <div class=" float-right">
                    <div class="search-input float-left">
                        <span class="icon-5"></span>
                        <input type="text" placeholder="" name="roleName">
                    </div>
                    <a class="btnDefault bgBlue queryBtn" href="javascript:;" onclick="getTableData()">查询</a>
                </div>
                <div class="clear"></div>
            </div>
            <!-- 表格 start -->
            <div class="wrapper">
                <div class="choicebox">
                    <CheckboxGroup>
                        <Checkbox  v-for="(item,index) in tableItem" :key="index" :label="item.name" v-model="item.ifShow"></Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="table">
                    <table id="userTable">
                        <thead>
                        <tr>
                            <th width="120">操作</th>
                            <th width="80">员工卡号</th>
                            <th width="80">姓名</th>
                            <th width="80">性别</th>
                            <th width="80">电话</th>
                            <th width="80">生日</th>
                            <th width="80">岗位</th>
                            <th width="80">站点</th>
                            <th width="80">站区</th>
                            <th width="80">管理员</th>
                            <th width="80" v-show="tableItem[0].ifShow">身份证</th>
                            <th width="120" v-show="tableItem[1].ifShow">入职时间</th>
                            <th width="80" v-show="tableItem[2].ifShow">婚姻状况</th>
                            <th width="80" v-show="tableItem[3].ifShow">有无子女</th>
                            <th width="80" v-show="tableItem[4].ifShow">学历</th>
                            <th width="80" v-show="tableItem[5].ifShow">政治面貌</th>
                            <th width="120" v-show="tableItem[6].ifShow">入党时间</th>
                            <th width="200" v-show="tableItem[7].ifShow">住址</th>
                            <th width="80" v-show="tableItem[8].ifShow">站务员证书编号</th>
                            <th width="80" v-show="tableItem[9].ifShow">站务员证书等级</th>
                            <th width="80" v-show="tableItem[10].ifShow">人员编码</th>
                            <th width="80" v-show="tableItem[11].ifShow">消防证书编号</th>
                            <th width="80" v-show="tableItem[12].ifShow">综控员证书编号</th>
                            <th width="80" v-show="tableItem[13].ifShow">综控员证书级别</th>
                        </tr>
                        </thead>
                        <tbody id="userDataTable">
                        <tr v-for="(item,index) in personList" :key='index'>
                            <td><a style="margin-right: 5px; color: #0000FF" @click="removeLine">{{item.action[0]}}</a><a style="color: #0000FF" @click="addPersonModalfake = true">{{item.action[1]}}</a></td>
                            <td>{{item.workNumber}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.sex}}</td>
                            <td>{{item.phoneNumber}}</td>
                            <td>{{item.birthday}}</td>
                            <td>{{item.post}}</td>
                            <td>{{item.station}}</td>
                            <td>{{item.stationArea}}</td>
                            <td>{{item.manager}}</td>
                            <td v-show="tableItem[0].ifShow">{{item.idCard}}</td>
                            <td v-show="tableItem[1].ifShow">{{item.entryTime}}</td>
                            <td v-show="tableItem[2].ifShow">{{item.maritalStatus}}</td>
                            <td v-show="tableItem[3].ifShow">{{item.childrenHave}}</td>
                            <td v-show="tableItem[4].ifShow">{{item.education}}</td>
                            <td v-show="tableItem[5].ifShow">{{item.political}}</td>
                            <td v-show="tableItem[6].ifShow">{{item.partyTime}}</td>
                            <td v-show="tableItem[7].ifShow">{{item.address}}</td>
                            <td v-show="tableItem[8].ifShow">{{item.stationCertificateNumber}}</td>
                            <td v-show="tableItem[9].ifShow">{{item.stationCertificateLevel}}</td>
                            <td v-show="tableItem[10].ifShow">{{item.peopleCode}}</td>
                            <td v-show="tableItem[11].ifShow">{{item.fireCertificateNumber}}</td>
                            <td v-show="tableItem[12].ifShow">{{item.controllerNumber}}</td>
                            <td v-show="tableItem[13].ifShow">{{item.controllerLevel}}</td>
                        </tr>
                        <tr>
                            <td><a style="margin-right: 5px; color: #0000FF"  @click="removeLine">删除</a><a style="color: #0000FF">修改</a></td>
                            <td>60506796</td>
                            <td>伊坤</td>
                            <td>男</td>
                            <td>13785663247</td>
                            <td>1992-10-6</td>
                            <td>站务员</td>
                            <td>西直门</td>
                            <td>西直门</td>
                            <td></td>
                            <td v-show="tableItem[0].ifShow">110106199210060344</td>
                            <td v-show="tableItem[1].ifShow">2017-7-28</td>
                            <td v-show="tableItem[2].ifShow">已婚</td>
                            <td v-show="tableItem[3].ifShow">未育</td>
                            <td v-show="tableItem[4].ifShow">本科</td>
                            <td v-show="tableItem[5].ifShow">共产党员</td>
                            <td v-show="tableItem[6].ifShow">2006-10-11</td>
                            <td v-show="tableItem[7].ifShow">北京市丰台区花乡羊坊花园西院1-5-404</td>
                            <td v-show="tableItem[8].ifShow">1701061060500643</td>
                            <td v-show="tableItem[9].ifShow">站务初级</td>
                            <td v-show="tableItem[10].ifShow">7852632594125789</td>
                            <td v-show="tableItem[11].ifShow">1458962574123658</td>
                            <td v-show="tableItem[12].ifShow">1752695213699541</td>
                            <td v-show="tableItem[13].ifShow">站务初级</td>
                        </tr>
                        <tr>
                            <td><a style="margin-right: 5px; color: #0000FF"  @click="removeLine">删除</a><a style="color: #0000FF">修改</a></td>
                            <td>60508808</td>
                            <td>李璇</td>
                            <td>女</td>
                            <td>13051679861</td>
                            <td>1994-02-12</td>
                            <td>站务员</td>
                            <td>西直门</td>
                            <td>西直门</td>
                            <td></td>
                            <td v-show="tableItem[0].ifShow">110108199402123410</td>
                            <td v-show="tableItem[1].ifShow">2015-2-12</td>
                            <td v-show="tableItem[2].ifShow">未婚</td>
                            <td v-show="tableItem[3].ifShow">未育</td>
                            <td v-show="tableItem[4].ifShow">大专</td>
                            <td v-show="tableItem[5].ifShow">共青团员</td>
                            <td v-show="tableItem[6].ifShow">2010-01-1</td>
                            <td v-show="tableItem[7].ifShow">北京市丰台区青塔蔚园10号楼101</td>
                            <td v-show="tableItem[8].ifShow">5269541236985423</td>
                            <td v-show="tableItem[9].ifShow">站务初级</td>
                            <td v-show="tableItem[10].ifShow">4152956325841256</td>
                            <td v-show="tableItem[11].ifShow">5962354852695412</td>
                            <td v-show="tableItem[12].ifShow">5963258412596584</td>
                            <td v-show="tableItem[13].ifShow">站务初级</td>
                        </tr>
                        <tr>
                            <td><a style="margin-right: 5px; color: #0000FF"  @click="removeLine">删除</a><a style="color: #0000FF">修改</a></td>
                            <td>60507613</td>
                            <td>黄旭</td>
                            <td>男</td>
                            <td>13811914821</td>
                            <td>1994-01-28</td>
                            <td>站区长</td>
                            <td>西直门</td>
                            <td>西直门</td>
                            <td></td>
                            <td v-show="tableItem[0].ifShow">131002199401282015</td>
                            <td v-show="tableItem[1].ifShow">2015-07-03</td>
                            <td v-show="tableItem[2].ifShow">未婚</td>
                            <td v-show="tableItem[3].ifShow">未育</td>
                            <td v-show="tableItem[4].ifShow">大专</td>
                            <td v-show="tableItem[5].ifShow">共青团员</td>
                            <td v-show="tableItem[6].ifShow">2015-12-11</td>
                            <td v-show="tableItem[7].ifShow">北京市西城区寿长街2号</td>
                            <td v-show="tableItem[8].ifShow">5952362515895255</td>
                            <td v-show="tableItem[9].ifShow">站务初级</td>
                            <td v-show="tableItem[10].ifShow">985625412695459</td>
                            <td v-show="tableItem[11].ifShow">595213695845258</td>
                            <td v-show="tableItem[12].ifShow">596235158745953</td>
                            <td v-show="tableItem[13].ifShow">站务初级</td>
                        </tr>
                        <tr>
                            <td><a style="margin-right: 5px; color: #0000FF"  @click="removeLine">删除</a><a style="color: #0000FF">修改</a></td>
                            <td>60502986</td>
                            <td>薛婷婷</td>
                            <td>女</td>
                            <td>13811580959</td>
                            <td>1990-05-07</td>
                            <td>站务员</td>
                            <td>西直门</td>
                            <td>西直门</td>
                            <td></td>
                            <td v-show="tableItem[0].ifShow">110224199005073822</td>
                            <td v-show="tableItem[1].ifShow">1997-01-07</td>
                            <td v-show="tableItem[2].ifShow">未婚</td>
                            <td v-show="tableItem[3].ifShow">未育</td>
                            <td v-show="tableItem[4].ifShow">大专</td>
                            <td v-show="tableItem[5].ifShow">共青团员</td>
                            <td v-show="tableItem[6].ifShow">2012-08-23</td>
                            <td v-show="tableItem[7].ifShow">北京市大兴区安定镇杜庄屯十一条</td>
                            <td v-show="tableItem[8].ifShow">5956321478952695</td>
                            <td v-show="tableItem[9].ifShow">站务初级</td>
                            <td v-show="tableItem[10].ifShow">5236598451259635</td>
                            <td v-show="tableItem[11].ifShow">5963251489562359</td>
                            <td v-show="tableItem[12].ifShow">5956321584596325</td>
                            <td v-show="tableItem[13].ifShow">站务初级</td>
                        </tr>
                        <tr>
                            <td><a style="margin-right: 5px; color: #0000FF"  @click="removeLine">删除</a><a style="color: #0000FF">修改</a></td>
                            <td>60502979</td>
                            <td>王宇</td>
                            <td>男</td>
                            <td>13581550834</td>
                            <td>1988-07-13</td>
                            <td>站务员</td>
                            <td>西直门</td>
                            <td>西直门</td>
                            <td></td>
                            <td v-show="tableItem[0].ifShow">110109198807132528</td>
                            <td v-show="tableItem[1].ifShow">2008-06-09</td>
                            <td v-show="tableItem[2].ifShow">未婚</td>
                            <td v-show="tableItem[3].ifShow">未育</td>
                            <td v-show="tableItem[4].ifShow">大专</td>
                            <td v-show="tableItem[5].ifShow">共青团员</td>
                            <td v-show="tableItem[6].ifShow">2002-08-23</td>
                            <td v-show="tableItem[7].ifShow">北京市门头沟区王平镇东王平村55-4</td>
                            <td v-show="tableItem[8].ifShow">5956325415896523</td>
                            <td v-show="tableItem[9].ifShow">站务初级</td>
                            <td v-show="tableItem[10].ifShow">5126985459654159</td>
                            <td v-show="tableItem[11].ifShow">5236985412563596</td>
                            <td v-show="tableItem[12].ifShow">5963214874523695</td>
                            <td v-show="tableItem[13].ifShow">站务初级</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 表格 end -->
        </form>
        <!--新增人员-->
        <Modal class="usermanage-model"
                title="新增人员"
                v-model="addPersonModal"
                width="800"
                :mask-closable="false">
                <ul class="form">
                    <li>
                        <label>员工卡号</label>
                        <input name="cardNum" type="text" v-model="addPerson.cardNum">
                    </li>
                    <li>
                        <label>人员编码</label>
                        <input name="code" type="text" v-model="addPerson.code">
                    </li>
                    <li class="require">
                        <label class="require">姓名</label>
                        <input name="name" type="text" v-model="addPerson.name">
                    </li>
                    <li>
                        <label>站区/站点</label>
                        <select name="station" class=" reset-input" v-model="addPerson.station">
                            <option value="西直门">西直门</option>
                            <option value="西直门">车公庄</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">岗位</label>
                        <select name="postName" v-model="addPerson.post">
                            <option value="站务员">站务员</option>
                            <option value="值班站长">值班站长</option>
                            <option value="站区长助理">站区长助理</option>
                        </select>
                    </li>
                    <li>
                        <label>管理员</label>
                        <select name="manager" v-model="addPerson.manager">
                            <option value="0" selected="selected">否</option>
                            <option value="1">是</option>
                        </select>
                    </li>
                    <li> 
                        <label class="red">密码</label>
                        <input type="text" name="password" v-model="addPerson.psw">
                        <span class="orange">请记录此密码作为下次登录用</span>
                    </li>
                    <li>
                        <label>权限方案</label>
                        <select name="plan" v-model="addPerson.plan">
                            <option value="超级管理员">超级管理员</option>
                            <option value="系统管理员">系统管理员</option>
                            <option value="管理员">管理员</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">性别</label>
                        <select name="sex" v-model="addPerson.sex">
                            <option value="">请选择</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">手机号</label>
                        <input name="phoneNumber" type="text" v-model="addPerson.phoneNumber">
                    </li>
                    <li class="require">
                        <label class="require" id="heightp">生日</label>
                        <input name="birthday" type="text" v-model="addPerson.birthday">
                    </li>
                    <li class="require">
                        <label class="require">身份证</label>
                        <input name="idCode" type="text" v-model="addPerson.idCode">
                    </li>
                    <li class="require">
                        <label class="require" id="heightpp">入职时间</label>
                        <input name="onBoardDate" type="text" placeholder="例2015-03-06" v-model="addPerson.onBoardDate">
                    </li>
                    <li class="require">
                        <label class="require">婚否</label>
                        <select name="isMarried" v-model="addPerson.isMarried">
                            <option value="">请选择</option>
                            <option value="已婚">已婚</option>
                            <option value="未婚">未婚</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">生育</label>
                        <select name="hasChild" v-model="addPerson.hasChild">
                            <option value="">请选择</option>
                            <option value="已育">已育</option>
                            <option value="未育">未育</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">学历</label>
                        <select name="eduBackGround" v-model="addPerson.eduBackGround">
                            <option value="">请选择</option>
                            <option value="高中以下">高中以下</option>
                            <option value="大专">大专</option>
                            <option value="本科">本科</option>
                            <option value="硕士">硕士</option>
                            <option value="博士以上">博士以上</option>
                        </select>
                    </li>
                    <li class="require">
                        <label class="require">政治面貌</label>
                        <select name="isPartyMember" v-model="addPerson.isPartyMember">
                            <option value="">请选择</option>
                            <option value="群众">群众</option>
                            <option value="共青团员">共青团员</option>
                            <option value="共产党员">共产党员</option>
                            <option value="民主党派">民主党派</option>
                        </select>
                    </li>
                    <li>
                        <label>入党时间</label>
                        <input name="joinDate" type="text" v-model="addPerson.joinDate">
                    </li>
                    <li>
                        <label class="require">站务员证书编号</label>
                        <input name="stationCertificateNum" type="text" v-model="addPerson.stationCertificateNum">
                    </li>
                    <li>
                        <label class="require">站务员证等级</label>
                        <input name="stationCertificateGrade" type="text" v-model="addPerson.stationCertificateGrade">
                    </li>
                    <li class="lang require">
                        <label class="require">住址</label>
                        <input name="address" type="text" v-model="addPerson.address">
                    </li>
                    <li>
                        <label class="require">消防证书编号</label>
                        <input name="fireControlCertificateNum" type="text" v-model="addPerson.fireControlCertificateNum">
                    </li>
                    <li>
                        <label class="require">综控员证书编号</label>
                        <input name="controllerCertificateNum" type="text" v-model="addPerson.controllerCertificateNum">
                    </li>
                    <li>
                        <label class="require">综控员证书级别</label>
                        <input name="controllerCertificateGrade" type="text" v-model="addPerson.controllerCertificateGrade">
                    </li>
                    <li class="clear"></li>
                </ul>
        </Modal>
        <!--编辑人员-->
        <Modal class="usermanage-model"
               title="编辑人员"
               v-model="addPersonModalfake"
               width="800"
               :mask-closable="false">
            <ul class="form">
                <li>
                    <label>员工卡号</label>
                    <input name="cardNum" type="text" v-model="addPersonfake.cardNum">
                </li>
                <li>
                    <label>人员编码</label>
                    <input name="code" type="text" v-model="addPersonfake.code">
                </li>
                <li class="require">
                    <label class="require">姓名</label>
                    <input name="name" type="text" v-model="addPersonfake.name">
                </li>
                <li>
                    <label>站区/站点</label>
                    <select name="station" class=" reset-input" v-model="addPersonfake.station">
                        <option value="西直门">西直门</option>
                        <option value="西直门">车公庄</option>
                    </select>
                </li>
                <li class="require">
                    <label class="require">岗位</label>
                    <select name="postName" v-model="addPersonfake.post">
                        <option value="站务员">站务员</option>
                        <option value="值班站长">值班站长</option>
                        <option value="站区长助理">站区长助理</option>
                    </select>
                </li>
                <li>
                    <label>管理员</label>
                    <select name="manager" v-model="addPersonfake.manager">
                        <option value="0">否</option>
                        <option value="1" selected="selected">是</option>
                    </select>
                </li>
                <li>
                    <label class="red">密码</label>
                    <input type="text" name="password" v-model="addPersonfake.psw">
                    <span class="orange">请记录此密码作为下次登录用</span>
                </li>
                <li>
                    <label>权限方案</label>
                    <select name="plan" v-model="addPersonfake.plan">
                        <option value="超级管理员">超级管理员</option>
                        <option value="系统管理员">系统管理员</option>
                        <option value="管理员">管理员</option>
                    </select>
                </li>
                <li class="require">
                    <label class="require">性别</label>
                    <select name="sex" v-model="addPersonfake.sex">
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </li>
                <li class="require">
                    <label class="require">手机号</label>
                    <input name="phoneNumber" type="text" v-model="addPersonfake.phoneNumber">
                </li>
                <li class="require">
                    <label class="require" id="heightpDay">生日</label>
                    <input name="birthday" type="text" v-model="addPersonfake.birthday">
                </li>
                <li class="require">
                    <label class="require">身份证</label>
                    <input name="idCode" type="text" v-model="addPersonfake.idCode">
                </li>
                <li class="require">
                    <label class="require" id="heightppTime">入职时间</label>
                    <input name="onBoardDate" type="text" placeholder="例2015-03-06" v-model="addPersonfake.onBoardDate">
                </li>
                <li class="require">
                    <label class="require">婚否</label>
                    <select name="isMarried" v-model="addPersonfake.isMarried">
                        <option value="">请选择</option>
                        <option value="已婚" selected = "selected">已婚</option>
                        <option value="未婚">未婚</option>
                    </select>
                </li>
                <li class="require">
                    <label class="require">生育</label>
                    <select name="hasChild" v-model="addPersonfake.hasChild">
                        <option value="已育">已育</option>
                        <option value="未育">未育</option>
                    </select>
                </li>
                <li class="require">
                    <label class="require">学历</label>
                    <select name="eduBackGround" v-model="addPersonfake.eduBackGround">
                        <option value="">高中以下</option>
                        <option value="高中以下">高中以下</option>
                        <option value="大专">大专</option>
                        <option value="本科">本科</option>
                        <option value="硕士">硕士</option>
                        <option value="博士以上">博士以上</option>
                    </select>
                </li>
                <li class="require">
                    <label class="require">政治面貌</label>
                    <select name="isPartyMember" v-model="addPersonfake.isPartyMember">
                        <option value="">共青团员</option>
                        <option value="群众">群众</option>
                        <option value="共青团员">共青团员</option>
                        <option value="共产党员">共产党员</option>
                        <option value="民主党派">民主党派</option>
                    </select>
                </li>
                <li>
                    <label>入党时间</label>
                    <input name="joinDate" type="text" v-model="addPersonfake.joinDate">
                </li>
                <li>
                    <label class="require">站务员证书编号</label>
                    <input name="stationCertificateNum" type="text" v-model="addPersonfake.stationCertificateNum">
                </li>
                <li>
                    <label class="require">站务员证等级</label>
                    <input name="stationCertificateGrade" type="text" v-model="addPersonfake.stationCertificateGrade">
                </li>
                <li class="lang require">
                    <label class="require">住址</label>
                    <input name="address" type="text" v-model="addPersonfake.address">
                </li>
                <li>
                    <label class="require">消防证书编号</label>
                    <input name="fireControlCertificateNum" type="text" v-model="addPersonfake.fireControlCertificateNum">
                </li>
                <li>
                    <label class="require">综控员证书编号</label>
                    <input name="controllerCertificateNum" type="text" v-model="addPersonfake.controllerCertificateNum">
                </li>
                <li>
                    <label class="require">综控员证书级别</label>
                    <input name="controllerCertificateGrade" type="text" v-model="addPersonfake.controllerCertificateGrade">
                </li>
                <li class="clear"></li>
            </ul>
        </Modal>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                addPersonModal: false,
                addPersonModalfake: false,
                tableItem: [
                    {
                        name: '身份证',
                        ifShow: false
                    },
                    {
                        name: '入职时间',
                        ifShow: false
                    },
                    {
                        name: '婚姻状况',
                        ifShow: false
                    },
                    {
                        name: '有无子女',
                        ifShow: false
                    },
                    {
                        name: '学历',
                        ifShow: false
                    },
                    {
                        name: '政治面貌',
                        ifShow: false
                    },
                    {
                        name: '入党时间',
                        ifShow: false
                    },
                    {
                        name: '住址',
                        ifShow: false
                    },
                    {
                        name: '站务员证书编号',
                        ifShow: false
                    },
                    {
                        name: '站务员证书等级',
                        ifShow: false
                    },
                    {
                        name: '人员编码',
                        ifShow: false
                    },
                    {
                        name: '消防证书编号',
                        ifShow: false
                    },
                    {
                        name: '综控员证书编号',
                        ifShow: false
                    },
                    {
                        name: '综控员证书级别',
                        ifShow: false
                    },
                ],
                personList:[
                    {
                        userId:1,
                        action:['删除','修改'],
                        workNumber:60502868,
                        name:'梅松',
                        sex:'男',
                        phoneNumber:13810582556,
                        birthday:'1990-12-12',
                        post:'站区长',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'站区',
                        idCard:'110108198212142712',
                        entryTime:'1990-12-12',
                        maritalStatus:'已婚',
                        childrenHave:'未育',
                        education:'高中以下',
                        political:'群众',
                        partyTime:'2008-05-01',
                        address:'北京市石景山区古城南路19号楼',
                        stationCertificateNumber:'1401061060501034',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'5963265595466658',
                        fireCertificateNumber:'156598965236566',
                        controllerNumber:'1401061060501034',
                        controllerLevel:'站务初级'
                    },
                        {
                        userId:2,
                        action:['删除','修改'],
                        workNumber:60506796,
                        name:'伊坤',
                        sex:'男',
                        phoneNumber:13785663247,
                        birthday:'1992-10-6',
                        post:'站务员',
                        station:'西直门',
                        stationArea:'西直门',
                        manager:'',
                        idCard:'110106199210060344',
                        entryTime:'1990-12-12',
                        maritalStatus:'已婚',
                        childrenHave:'未育',
                        education:'本科',
                        political:'共产党员',
                        partyTime:'2006-10-11',
                        address:'北京市丰台区花乡羊坊花园西院1',
                        stationCertificateNumber:'1701061060500643',
                        stationCertificateLevel:'站务初级',
                        peopleCode:'7852632594125789',
                        fireCertificateNumber:'1458962574123658',
                        controllerNumber:'1752695213699541',
                        controllerLevel:'站务初级'
                    },
                ],
                selectedItmes: [],
                addPerson: {
                    cardNum: '',
                    code: '',
                    name: '',
                    station: '',
                    postName: '',
                    manager: '',
                    password: '',
                    plan: '',
                    sex: '',
                    phoneNumber: '',
                    birthday: '',
                    idCode: '',
                    onBoardDate: '',
                    isMarried: '',
                    hasChild: '',
                    eduBackGround: '',
                    isPartyMember: '',
                    joinDate: '',
                    stationCertificateNum: '',
                    stationCertificateGrade: '',
                    address: '',
                    fireControlCertificateNum: '',
                    controllerCertificateNum: '',
                    controllerCertificateGrade: ''
                },
                addPersonfake: {
                    cardNum: '60502868',
                    code: '1401061060501034',
                    name: '梅松',
                    station: '西直门',
                    postName: '站区长',
                    manager: '站区',
                    password: '123456',
                    plan: '',
                    sex: '男',
                    phoneNumber: '13810582556',
                    birthday: '1990-12-12',
                    idCode: '110108198212142712',
                    onBoardDate: '1990-12-12',
                    isMarried: '已婚',
                    hasChild: '未育',
                    eduBackGround: '高中以下',
                    isPartyMember: '群众',
                    joinDate: '2008-05-01',
                    stationCertificateNum: '401061060501034',
                    stationCertificateGrade: '站务初级',
                    address: '北京市石景山区古城南路19号楼',
                    fireControlCertificateNum: '156598965236566',
                    controllerCertificateNum: '5963265595466658',
                    controllerCertificateGrade: '站务初级'
                }

            }
        },
        //删除一行
        methods:{
            removeLine:function(){
                var e = e || window.event;
                var target = e.target || e.srcElement;
                target.parentNode.parentNode.remove();
                console.log(target);
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/index.css';
</style>