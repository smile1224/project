// 倒计时
class CountDown{
    constructor(options){
        this.d = options.d;
        this.h = options.h;
        this.m = options.m;
        this.s = options.s;
        this.t = options.t;
        this.gettime();
    }
    gettime(){
        clearInterval(this.time);
        if(new Date(this.t).getTime()>(new Date()).getTime()){
            this.time=setInterval(()=>{
                this.d1 = new Date(this.t);
                this.d2 = new Date();
                var difftime = Math.abs(this.d1.getTime() - this.d2.getTime());
                this.day = Math.floor(difftime/1000/60/60/24);
                this.hour = Math.floor(difftime / 1000 / 60 / 60 - (24 * this.day));
                this.minute = Math.floor(difftime / 1000 / 60 - (24 * 60 * this.day) - (60 * this.hour));
                this.second = parseInt(difftime / 1000 - (24 * 60 * 60 * this.day) - (60 * 60 * this.hour) - (60 * this.minute));
                this.display();
            })
        }else{
            this.d.innerHTML = 0;
            this.h.innerHTML = 0;
            this.m.innerHTML = 0;
            this.s.innerHTML = 0;
        }
    }
    display(){
        this.d.innerHTML = this.day;
        this.h.innerHTML = this.hour;
        this.m.innerHTML = this.minute;
        this.s.innerHTML = this.second;
        if(this.d1.getTime() == this.d2.getTime()){
            clearInterval(this.time);
            
        }
    }
}
var day = document.querySelector(".product-intro .info-wrap .discount-time .day");
var hour = document.querySelector(".product-intro .info-wrap .discount-time .hour");
var minute = document.querySelector(".product-intro .info-wrap .discount-time .minute");
var second = document.querySelector(".product-intro .info-wrap .discount-time .second");
new CountDown({
    d:day,
    h:hour,
    m:minute,
    s:second,
    t:"2019/12/13 10:22:30"
})



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
var dl = document.querySelectorAll(".nav .nav-menu dl");
var dd = document.querySelectorAll(".nav .nav-menu dd");

new SecMenu(
    {
        fele:dl,
        sele:dd,
        c:"#f9b548"
    }
)

class ShowGoodDetail{
    constructor(){
        this.thumblist = document.querySelector(".product-intro .control-box .thumb-list");
        this.goodname = document.querySelector(".product-intro .info-wrap .product-name");
        this.goodprice = document.querySelector(".product-intro .info-wrap .product-price span");
        // console.log(this.goodname,this.goodprice)
        this.getcookie();
    }
    getcookie(){
        this.good = getCookie("GoodDetail")? JSON.parse(getCookie("GoodDetail")) : [];
        this.imgs = this.good.imgs;
        this.info = this.good.info;
        this.introduce = this.good.introduce;
        this.comment = this.good.comment;
        // console.log(this.info,this.introduce,this.comment)
        this.displaythumblist();
        this.displayinfo();
    }
    displaythumblist(){
        var str = "";
        for(var i in this.imgs){
            str += `
            <div><img src="${this.imgs[i]}" alt=""></div>
            `;
        }
        this.thumblist.innerHTML = str;
    }
    displayinfo(){
        var str = "";
        this.goodname.innerHTML = this.info.name;
        this.goodprice.innerHTML = this.info.price;

    }
}

new ShowGoodDetail;
// 放大镜
class Magnifier{
    constructor(options){
        this.small = options.small;
        this.big = options.big;
        this.span = options.span;
        this.img = options.img;
        this.list = Array.from(options.list);
        this.display();
    }
    display(){
        // 先初始化框内的一个图片
        var str = `
                <img src="${this.list[0].children[0].src}" alt="">
                <span></span>
            `;
        this.small.innerHTML = str;
        this.img.src = this.list[0].children[0].src;
        this.span = this.small.querySelector("span");
        // 点击图片切换上面的图片
        for(let i of this.list){
            i.onclick = ()=>{
                str = `
                    <img src="${i.children[0].src}" alt="">
                    <span></span>
                `;
                this.small.innerHTML = str;
                this.img.src = i.children[0].src;
                this.span = this.small.querySelector("span");
            }
        }
        this.init();
    }
    init(){
        var that = this;
        this.small.onmouseover = function(){
            that.over();
        }
        this.small.onmousemove = function(eve){
            var e = eve || window.event;
            that.move(e);
        }
        this.small.onmouseout = function(){
            that.out();
        }
    }
    over(){
        this.span.style.display = "block";
        this.big.style.display = "block";
        this.sw = this.small.offsetWidth;
        this.sh = this.small.offsetHeight;
        this.bw = this.big.offsetWidth;
        this.bh = this.big.offsetHeight;
        this.iw = this.img.offsetWidth;
        this.ih = this.img.offsetHeight;
        this.span.style.width = (this.bw/this.iw)*this.sw + "px";
        this.span.style.height = (this.bh/this.ih)*this.sh + "px";
        this.spanw = this.span.offsetWidth;
        this.spanh = this.span.offsetHeight;
    }
    move(e){
        var l = e.clientX - this.small.offsetLeft - this.spanw/2;
        var t = e.clientY - this.small.offsetTop - this.spanh/2;
        if(l<0) l=0;
        if(t<0) t=0;
        if(l>this.sw - this.spanw) l=this.sw - this.spanw;
        if(t>this.sh - this.spanh) t=this.sh - this.spanh;
        this.span.style.left = l + "px";
        this.span.style.top = t + "px";
        this.img.style.left = l/(this.sw - this.spanw)*(this.bw-this.iw)+"px";
        this.img.style.top = t/(this.sh - this.spanh)*(this.bh-this.ih)+"px";

    }
    out(){
        this.span.style.display = "none";
        this.big.style.display = "none";
    }
}

var small = document.querySelector(".preview-wrap .zoomer-box .preview-box");
var span = document.querySelector(".preview-wrap .zoomer-box .preview-box span");
var big = document.querySelector(".preview-wrap .zoomer-box .tobig");
var img = document.querySelector(".preview-wrap .zoomer-box .tobig img");
var imglist = document.querySelectorAll(".control-box .thumb-list div");

new Magnifier({
    small:small,
    span:span,
    big:big,
    img:img,
    list:imglist
})

// 商品详情评价切换
class Tab{
    constructor(options){
        this.a = options.a;
        this.c = options.c;
        this.getcookie();
        
    }
    getcookie(){
        this.good = getCookie("GoodDetail")? JSON.parse(getCookie("GoodDetail")) : [];
        this.info = this.good.info;
        this.introduce = this.good.introduce;
        this.comment = this.good.comment;
        this.display();
    }
    display(){
        for(let i=0;i<this.a.length;i++){
            this.a[i].onclick = ()=>{
                for(var j=0;j<this.a.length;j++){
                    this.a[j].style.background = "none";
                    this.a[j].style.color = "#666";
                }
                this.a[i].style.background = "#505050";
                this.a[i].style.color = "#fff";
                for(var j=0;j<this.c.length;j++){
                    this.c[j].style.display = "none";
                }
                this.c[i].style.display = "block";
                this.show(this.c[i]);
            }
        }
    }
    show(good){
        var str = "";
        if(good.className.split(" ")[0] == "detail"){
            for(var i in this.introduce){
                str += `
                <p><img src="${this.introduce[i]}" alt=""></p>
                `;
            }
            good.querySelector(".detail-html").innerHTML = str;
        }else if(good.className.split(" ")[0] == "parameter"){
            str = `
            <img src="${this.info.introduce}" alt="">
            `;
            good.innerHTML = str;
        }else if(good.className.split(" ")[0] =="evaluate"){
            for(var i in this.comment){
                str += `
                <p>
                    <a href="">${this.comment[i].user}</a>
                    <span>${this.comment[i].content}</span>
                </p>
                `;
            }
            good.innerHTML = str;
        }

    }
}
var title = document.querySelectorAll(".item-detail .tbs-box a");
var content = document.querySelectorAll(" .item-detail .tab-bottom .content");
new Tab(
    {
        a:title,
        c:content
    }
)

// 加入购物车
class Goods{
    constructor(){
        this.add = document.querySelector(".btn-wrap .to-cart");
        this.getinfo();
    }
    getinfo(){
        this.good = getCookie("GoodDetail")? JSON.parse(getCookie("GoodDetail")) : [];
        this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
        this.testlogin();
        this.addEvent();
    }
    testlogin(){
        this.status = false;
        if(this.info.length != 0){
            for(var i in this.info){
                if(this.info[i].status == true){
                    this.status = true;
                    return;
                }
            }
        }   
    }
    
    addEvent(){
        this.add.addEventListener("click",()=>{
            // 没有登录不能加入购物车
            if(this.info.length == 0){
                console.log(1)
                location.href = "login.html";
                return;
            }else if(this.status == false){
                console.log(2)
                location.href = "login.html";
            }
            this.id = this.good.info.name;
            this.setCookie();
            // location.href = "shoppingcar.html";
        })
    }
    setCookie(){
        this.goods = getCookie("AddGoods") ? JSON.parse(getCookie("AddGoods")):[];
        if(this.goods.length<1){
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var i = 0;
            var onoff = this.goods.some((val,idx)=>{
                i = idx;
                return val.id === this.id;
            });

            if(!onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                this.goods[i].num++;
            }
        }
        setCookie("AddGoods",JSON.stringify(this.goods));
    }
}
new Goods;

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

// 搜索框：根据输入框的关键词跳转到对应的商品列表页
class SearchGoods{
    constructor(){
        this.sbox = document.querySelector("header .search .txt input");
        this.stbn = document.querySelector("header .search .btn");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        console.log(this.sbox)
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


