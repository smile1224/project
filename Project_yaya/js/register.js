class Register{
    constructor(){
        this.user = document.getElementById("userid");

        this.pass = document.getElementById("userpwd");
        this.samepass = document.getElementById("userpwd-same");

        this.tel = document.getElementById("usermobile");
        this.email = document.getElementById("usermail");

        this.testcode = document.getElementById("yzm");
        this.code = document.querySelector("#testcode span");
        this.changecode = document.querySelector("#testcode em");

        this.agree = document.querySelector("#agree input");

        this.reg = document.getElementById("regbtn");
        this.log = document.querySelector(".regtip a");

        this.dd = document.querySelector("#success dd");
        this.testInfo();
    }
    
    testInfo(){
        this.puser = false;
        this.ppass1 = false;
        this.ppass2 = false;
        this.ptel = false;
        this.pemail = false;
        this.pverify = false;
        var that = this;
        // 用户名：4-16位字母、数字或汉字，请不要输入特殊字符！
        this.user.oninput = function(){
            if(this.value == ""){
                this.nextElementSibling.innerHTML = "不允许为空";
                that.puser = false;
                return;
            }
            var reg= /^[\u2E80-\u9FFFa-zA-Z\d]{4,16}$/;
            if(reg.test(this.value)){
                this.nextElementSibling.innerHTML = "ok!";
                that.puser = true;
            }else{
                this.nextElementSibling.innerHTML = "4-16位字母、数字或汉字，请不要输入特殊字符！";
                that.puser = false;
            }
        }
        // 密码：6个字符以上的字母或数字
        this.pass.oninput = function(){
            if(this.value == ""){
                this.nextElementSibling.innerHTML = "不允许为空";
                that.ppass1 = false;
                return;
            }
            var reg= /^[a-zA-Z\d]{6,}$/;
            if(reg.test(this.value)){
                this.nextElementSibling.innerHTML = "ok!";
                that.ppass1 = true;
            }else{
                this.nextElementSibling.innerHTML = "6个字符以上的字母或数字";
                that.ppass1 = false;
            }
        }

        // 密码确认：跟第一次输入 密码一致
        this.samepass.oninput = function(){
            if(this.value == ""){
                this.nextElementSibling.innerHTML = "不允许为空";
                that.ppass2 = false;
                return;
            }
            if(this.value == that.pass.value){
                this.nextElementSibling.innerHTML = "ok!";
                that.ppass2 = true;
            }else{
                this.nextElementSibling.innerHTML = "请输入一致的密码";
                that.ppass2 = false;
            }
        }

        // 电话：第一位必须为1，后面再加10位数字
        this.tel.oninput = function(){
            if(this.value == ""){
                this.nextElementSibling.innerHTML = "不允许为空";
                that.ptel = false;
                return;
            }
            var reg= /^1[0-9]{10}$/;
            if(reg.test(this.value)){
                this.nextElementSibling.innerHTML = "ok!";
                that.ptel = true;
            }else{
                this.nextElementSibling.innerHTML = "手机号码格式不正确";
                that.ptel = false;
            }
        }

        // 邮箱：数字大小写字母_- 3到12位   @  数字字母 2到9位  . 字母2到5位
        this.email.oninput = function(){
            var reg= /^([\w\-]){3,12}@([\da-z]){2,9}\.([a-z]){2,5}$/;
            if(reg.test(this.value)){
                this.nextElementSibling.innerHTML = "ok!";
                that.pemail = true;
            }else{
                this.nextElementSibling.innerHTML = "邮箱格式不正确";
                that.pemail = false;
            }
        }

        // 验证码：数字字母混合四位
        var str = "";
        for(var i=0;i<40;i++){
            str += random(0,9);
            str += String.fromCharCode(random(65,90));
            str += String.fromCharCode(random(97,122));
        }

        for(var i=0;i<4;i++){
            this.code.innerHTML += str[random(0,str.length-1)];
            this.code.style.color = GetRgbColor();
        }
        
        this.changecode.onclick = function(){
            that.code.innerHTML = "";
            for(var i=0;i<4;i++){
                that.code.innerHTML += str[random(0,str.length-1)];
                that.code.style.color = GetRgbColor();
            }
            // return false; // 阻止默认事件  不行
        }
        this.testcode.onblur = function(){
            if(this.value == that.code.innerHTML){
                this.nextElementSibling.nextElementSibling.innerHTML = "验证成功！";
                that.pverify = true;
            }else{
                this.nextElementSibling.nextElementSibling.innerHTML = "验证失败！";
                that.pverify = false;
            }
        }
        function random(a,b){
            return Math.round(Math.random()*(a-b))+b;
        }

        function GetRgbColor(){
            var a = random(0,255);
            var b = random(0,255);
            var c = random(0,255);
            return "rgb(" + a + "," + b + "," + c + ")";
        }
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.reg.onclick = function(){
            if(that.agree.checked == true){
                that.agree.nextElementSibling.nextElementSibling.innerHTML = "";
                if(that.puser && that.ppass1 && that.ppass2 && that.ptel &&  that.pemail && that.pverify){
                    that.u = that.user.value;
                    that.p = that.pass.value;
                    that.SaveInfo();
                }
            }else{
                that.agree.nextElementSibling.nextElementSibling.innerHTML = "请阅读协议并勾选！";
            }
        }
        this.log.onclick = function(){
            location.href = "login.html";
        }
    }
    SaveInfo(){
        this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
        if(this.info.length<1){
            this.info.push({
                user:this.u,
                pass:this.p,
                status:false
            })
            this.success();
        }else{
            var style = this.info.some((val,ind)=>{
                return val.user == this.u;
            })
            if(style){
                this.dd.innerHTML = "用户名重复";
            }else{
                this.info.push({
                    user:this.u,
                    pass:this.p,
                    status:false
                })
                this.success();
            }
        }
        setCookie("UserInfo",JSON.stringify(this.info));
    }
    success(){
        this.dd.innerHTML = "注册成功，5秒后跳转到<a href='login.html' style='color:#4fb99f;font-weight:700;'>登录</a>页面";
        setTimeout(() => {
            location.href = "login.html";
        }, 5000);
    }
}
new Register;