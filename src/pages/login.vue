<template>
    <div id="login">
        <div class="wrapper">
            <img src="../assets/img/slogon.png">
            <div class="login">
                <img src="../assets/img/loginText.png">
                <form action="login" method="post" id="loginForm">
                    <p class="error" id="result" style="color:red;"></p>
                    <div class="inputBox">
                        <span class="icon-3"></span>
                        <input type="text"  name="userCode" placeholder="用户名" id="userCode">
                    </div>
                    <div class="inputBox">
                        <span class="icon-2"></span>
                        <input type="password" name="password" placeholder="登录密码" id="password">
                    </div>
                    <router-link :to="{name: 'Index'}" class="btn-login" type="button" >登录</router-link>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import * as api from "../api/commonAPI";
    export default{
    }
    function submitLogin(){
        var name = $("#userCode").val();
        var pass = $("#password").val();
        if($.trim(name)=='' && $.trim(pass)==''){
            $("#result").text("请输入用户名和密码");
            return;
        }
        if($.trim(name)=='' && !$.trim(pass)==''){
            $("#result").text("请输入用户名");
            return;
        }
        if(!$.trim(name)=='' && $.trim(pass)==''){
            $("#result").text("请输入密码");
            return;
        }
        $("#loginForm").submit();
    }
</script>
<style>
    @import '../assets/css/login.css';
    @import '../assets/css/font.css';
</style>