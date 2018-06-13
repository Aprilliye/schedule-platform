<template>
    <div id="login">
        <div class="wrapper">
            <img src="../assets/img/slogon.png">
            <div class="login">
                <img src="../assets/img/loginText.png">
                <form action="login" method="post" id="loginForm">
                    <!-- <p class="error" id="result" style="color:red;"></p> -->
                    <Alert id="errorMsg" type="error" style="display:none">{{ errorMsg }}</Alert>
                    <div class="inputBox">
                        <span class="icon-3"></span>
                        <input type="text" v-model.trim="userName" name="userCode" placeholder="用户名" id="userCode">
                    </div>
                    <div class="inputBox">
                        <span class="icon-2"></span>
                        <input type="password" v-model.trim="userPasswd" name="password" placeholder="登录密码" id="password">
                    </div>
                    <button  class="btn-login" type="button" @click="doLogin">登录</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import * as api from "../api/commonAPI";
    export default{
        data: function () {
            return {
                userName: '',
                userPasswd: '',
                errorMsg: ''
            };
        },
        methods: {
            doLogin: async function (){
                if(this.userName=='' && this.userPasswd==''){
                    this.errorMsg = '账号和密码不能为空';
                    $('#errorMsg').css('display','block');
                    return;
                }
                if(this.userName=='' && !this.userPasswd==''){
                    this.errorMsg = '账号不能为空';
                    $('#errorMsg').css('display','block');
                    return;
                }
                if(!this.userName=='' && this.userPasswd==''){
                    this.errorMsg = '密码不能为空';
                    $('#errorMsg').css('display','block');
                    return;
                }
                // 若用户名为admin密码为123456则允许登录
                //  if(this.userName === 'admin' && this.userPasswd === '123456'){
                //      this.$router.push({ path: "/home" });
                   let params = {
                       userName: this.userName,
                       password: this.userPasswd
                   };
                   this.$Loading.start();
                   let response = await api.login(params);
                   if (response.meta.code !== 0) {
                       this.$Loading.error();
                       this.$Message.error(response.meta.message);
                   }else{
                       this.$Loading.finish();
                       this.$router.push({ path: "/home" });
                   }
                //  }else{
                //      this.errorMsg = '账号或密码错误';
                //      $('#errorMsg').css('display','block');
                //  }
            }
        }
    }
</script>
<style scoped>
    @import '../assets/css/login.css';
    @import '../assets/css/font.css';
</style>