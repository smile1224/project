class Login{
    constructor(){
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.reg = document.querySelector(".reg a");
        this.log = document.getElementById("logbtn");
        this.tishi = document.querySelector(".tishi");
        this.check = document.getElementById("issave");
        this.addEvent();
        this.display();
    }
    addEvent(){
        var that = this;
        this.log.onclick = function(){
            that.u = that.user.value;
            that.p = that.pass.value;
            that.TestInfo();
        }
        this.reg.onclick = function(){
            location.href = "register.html";
        }
    }
    isRember(){
        if(this.check.checked){
            var obj = {
                user:this.u,
                pass:this.p
            }
            setCookie("userMsg",JSON.stringify(obj),{
                expires:7
            })
        }else{
            setCookie("userMsg",JSON.stringify(obj),{
                expires:-1
            })
        }
    }
    TestInfo(){
        var stay = 0;
        this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
        for(var i of this.info){
            if(i.user == this.u && i.pass == this.p){
                location.href = "index.html";
                i.status = true;
                setCookie("UserInfo",JSON.stringify(this.info));
                stay = 1;
                this.isRember();
            }else if(i.user == this.u && i.pass != this.p){
                this.tishi.style.display = "block";
                this.tishi.innerHTML = "密码错误！";
                stay = 2;
            }
        }
        if(stay == 0){
            this.tishi.style.display = "block";
            this.tishi.innerHTML = "用户不存在,请先<a href='register.html' style='color:#fff;padding:0 3px;font-weight:700;background:#f70;margin:0 3px;'>注册</a>";
        }
    }
    display(){
        this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : {user:"",pass:""};
        
        this.user.value = this.msg.user;
        this.pass.value = this.msg.pass;
    }
}
new Login;