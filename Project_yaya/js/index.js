// 三级菜单
class SecMenu{
    constructor(options){
        this.fele = options.fele;
        this.sele = options.sele;
        this.c = options.c;
        this.show();
    }
    show(){
        for(let i=0;i<this.fele.length;i++){     
            var that = this;
            this.fele[i].onmouseover = function(){
                if(that.c){
                    that.fele[i].children[0].style.background = "#333";
                }
                if(that.fele[i].children[1].tagName == that.sele[0].tagName){
                    that.fele[i].children[1].style.display = "block";
                }
            }
            this.fele[i].onmouseout = function(){
                that.fele[i].children[0].style.background = that.c;
                if(that.fele[i].children[1].tagName == that.sele[0].tagName){
                    that.fele[i].children[1].style.display = "none";
                }
            }
            
        }
    }
}
// index 主页的三级菜单
var fdiv = document.querySelectorAll("nav .nav .first");
var sul = document.querySelectorAll("nav .nav .first ul");
var fdl = document.querySelectorAll("nav .nav-menu dl");
var sdd = document.querySelectorAll("nav .nav-menu dd");
new SecMenu(
    {
        fele:fdiv,
        sele:sul,
    }
)
new SecMenu(
    {
        fele:fdl,
        sele:sdd,
        c:"rgba(51,51,51,0.6)"
    }
)

 // banner的轮播图
 $(".banner").banner({
    items:$(".banner").find("li"),
    left:$(".banner").find(".btn-l"),
    right:$(".banner").find(".btn-r"),
    list:true,
    index:3,
    autoPlay:true,
    delayTime:2000,
    moveTime:500
});



// 楼层效果
;(function tofloor(){
    window.onscroll = ()=>{
        var home = document.getElementById("homebox");
        var elevator = document.querySelector(".diy-elevator");
        var scrollT = document.documentElement.scrollTop;
        if(scrollT >= home.offsetTop){
            elevator.style.display = "block";
        }else{
            elevator.style.display = "none";
        }
    }
    var otop = document.querySelector(".diy-elevator .totop");
    var t;
    otop.onclick = function(){
        clearInterval(t);
        t = setInterval(function(){
            if(document.documentElement.scrollTop <= 0){
                clearInterval(t);
            }else{
                document.documentElement.scrollTop -= 100;
            }
        }, 30);
    } 
    
    $(".diy-elevator a").click(function(){
        $(this)
        .css({background:"#333"})
        .siblings().css({background:"#bbb"})
        .parent().find(".totop").css({background:"#4fb99f"})
        var i = $(this).index(); 
        var t = $(".floor").eq(i).offset().top;
        $("html").animate({
            scrollTop:t
        })
    })
})();

// index 获取后端数据，渲染troika-body和floor
class IndexGoods{
    constructor(){
        this.cont = document.querySelectorAll(".troika-body a");
        this.phonel = document.querySelector(".phone .floor-main .left-AD a");
        this.phoner = document.querySelectorAll(".phone .floor-main .rightAD a");
        this.phone = document.querySelectorAll(".phone .floor-main .shop-list a");
        this.url = "http://localhost/Project_yaya/data/index.json";
        this.getinfo();
    }
    getinfo(){
        var that = this;
        ajaxGet(this.url,function(res){
            that.res = JSON.parse(res);
            that.display();
        })
    }
    display(){
        var str = "";
        for(var i=0;i<15;i++){
            str = `<div class="tip">
                        <h3>${this.res[i].name}</h3>
                        <p>${this.res[i].introduce}</p>
                    </div>
                    <img src="${this.res[i].img}" alt="">
            `;
            this.cont[i].innerHTML = str;      
        }
        this.phonel.innerHTML = `<div class="diy-tip abs">
                                    <h3>${this.res[15].name}</h3>
                                    <p>${this.res[15].introduce}</p>
                                </div>
                                <img src="${this.res[15].img}" alt="">`;
        for(var i=16;i<24;i++){
            str = `<div class="diy-tip">
                        <h3>${this.res[i].name}</h3>
                        <p>${this.res[i].introduce}</p>
                        <div class="get-price">${this.res[i].price}</div>
                    </div>
                    <img src="${this.res[i].img}" alt="">`;
            this.phone[i-16].innerHTML = str;      
        }
        for(var i=24;i<28;i++){
            str = `<div class="diy-tip">
                        <h3>${this.res[i].name}</h3>
                        <p>${this.res[i].introduce}</p>
                    </div>
                    <img src="${this.res[i].img}" alt="">`;
                    
            this.phoner[i-24].innerHTML = str;      
        }
    }
}
new IndexGoods();

// 搜索框：根据输入框的关键词跳转到对应的商品列表页
class SearchGoods{
    constructor(){
        this.sbox = document.querySelector("header .search .txt input");
        this.stbn = document.querySelector("header .search .btn");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        // console.log(this.sbox)
        this.getinfo();
    }
    getinfo(){
        ajaxGet(this.url,(res)=>{
            this.res = JSON.parse(res);
        })
        this.addevent();
    }
    addevent(){
        this.stbn.onclick = ()=>{
            this.str = this.sbox.value;
            this.goods = [];
            for(var i in this.res){
                if(this.str == this.res[i].info.tag){
                    this.goods.push(this.res[i]);
                }
            }
            location.href="goods_list.html";
            this.setcookie();
        }
    }
    setcookie(){
        setCookie("GoodsList",JSON.stringify(this.goods));
    }
}
new SearchGoods;

// 登录注册退出的效果
class IndexLogin{
    constructor(){
        this.login = document.querySelector("#top .login .lo");
        this.register = document.querySelector("#top .login .re");
        this.wel = document.querySelector("#top .welcome");
        this.span = document.querySelector(".welcome span");
        this.exit = document.querySelector(".login em");
        this.userimg = document.querySelector("#banner-bg .user-login dl .userimg img");
        this.getUser();
        this.addEvent();
    }
    getUser(){
        this.info = getCookie("UserInfo")? JSON.parse(getCookie("UserInfo")) : [];
        this.i = null;
        var onoff = this.info.some((val,ind)=>{
            this.i = ind;
            return val.status == true;
        })
        if(onoff){
            this.login.style.display = "none";
            this.register.style.display = "none";
            this.wel.style.display = "block";
            this.span.innerHTML = this.info[this.i].user;
            this.userimg.src = "images/t2.png";
        }
    }
    addEvent(){
        var that = this;
        this.exit.onclick = function(){
            that.info[that.i].status = false;
            setCookie("UserInfo",JSON.stringify(that.info));
            location.reload();
        }
    }
}
new IndexLogin;

// 登录之后才能显示购物车的数量且跳转到购物车
class CartNum{
    constructor(){
        this.cartbox = document.querySelector(".shopcar");
        this.car = document.querySelector(".shopcar b");
        this.getcookie();
    }
    getcookie(){
        this.goods = getCookie("AddGoods")? JSON.parse(getCookie("AddGoods")) : [];
        this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
        this.testlogin();
        this.addevent();
    }
    testlogin(){
        this.status = false;
        if(this.info.length != 0){
            for(var i in this.info){
                if(this.info[i].status == true){
                    this.status = true;
                    this.shownum();
                    return;
                }
            }
        } 
    }
    addevent(){
        this.cartbox.onclick = ()=>{
            if(this.info.length == 0){
                location.href = "login.html";
                return;
            }else if(this.status == false){
                location.href = "login.html";
                return;
            }
            location.href = "shoppingcar.html";
            this.shownum();
        }
    }
    shownum(){
        this.car.innerHTML = this.goods.length;
        
    }
}
new CartNum();

// 搜索框的下拉菜单
class LagMenu{
    constructor(){
        this.obox = document.querySelector(".searchbox .txt");
        this.ospan = document.querySelector(".searchbox .txt input");
        this.oul = document.querySelector(".searchbox .txt ul");
        this.ali = document.querySelectorAll(".searchbox .txt li");
        this.onoff = true;
        this.now = this.next = 0;
        this.ospan.value = this.ali[this.now].innerHTML;
        this.getActive();
        this.addevent();
        this.show();
        this.keyevent();
        this.devent();
    }
    addevent(){
        this.ospan.onclick = (eve)=>{
            var e = eve || window.event;
            e.stopPropagation();
            if(this.onoff){
                this.oul.style.display = "block";
                this.onoff = false;
            }else{
                this.oul.style.display = "none";
                this.onoff = true;
            }
            for(var i=0;i<this.ali.length;i++){
                this.ali[i].className = "";
            }
            this.ali[this.next].className = "active";
        }
    }
    show(){
        // 使用let形成闭包，可以在事件执行函数内部获取i,不用创建内联属性indexI来保存i了
            for(let i=0;i<this.ali.length;i++){
                this.ali[i].onmouseover = ()=>{
                    for(var j=0;j<this.ali.length;j++){
                        this.ali[j].className = "";
                    }
                    this.ali[i].className = "active";
                }
                this.ali[i].onclick = ()=>{
                    this.ospan.value = this.ali[i].innerHTML;
                    this.next = i;
                }
            }
    }
    keyevent(){
        document.onkeydown = (eve)=>{
            if(this.oul.style.display != "block") return;
            var e = eve || window.event;
            var keycode = e.keyCode || window.which;
            if(keycode == 38){ // 下
                if(this.now == 0){
                    this.now = 0;
                }else{
                    this.now--;
                }
                this.ospan.value = this.ali[this.now].innerHTML;
                this.getActive();
                this.next = this.now;
            }
            if(keycode == 40){ // 上
                if(this.now == this.ali.length-1){
                    this.now = this.ali.length-1;
                }else{
                    this.now++;
                }
                this.ospan.value = this.ali[this.now].innerHTML;
                this.getActive();
                this.next = this.now;
            }
            if(keycode == 13){
                this.oul.style.display = "none";
                this.onoff = true;
            }
        }
    }
    devent(){
        document.onclick = ()=>{
            this.oul.style.display = "none";
            this.onoff = true;
        }
    }
    getActive(){
        for(var i=0;i<this.ali.length;i++){
            this.ali[i].className = "";
        }
        this.ali[this.now].className = "active";
    }
    
}
new LagMenu();


