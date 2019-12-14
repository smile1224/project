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

// goods_list页的三级菜单
var dl = document.querySelectorAll(".nav .nav-menu dl");
var dd = document.querySelectorAll(".nav .nav-menu dd");
new SecMenu(
    {
        fele:dl,
        sele:dd,
        c:"#f9b548"
    }
)

// 获取搜索后存放在cookie里面的数据，并渲染页面
class ShowList{
    constructor(){
        this.ul = document.querySelector("main .list ul");
        this.getcookie();
    }
    getcookie(){
        this.goods = getCookie("GoodsList")? JSON.parse(getCookie("GoodsList")) : [];
        this.display();
    }
    display(){
        var str = "";
        for(var i in this.goods){
            str += `<li>
                        <a class="img"><img src="${this.goods[i].imgs[1]}" alt=""></a>
                        <a class="title">${this.goods[i].info.name}</a>
                        <span class="price">${this.goods[i].info.price}</span>
                        <p style="margin:3px 0;">
                            已有<a class="commen-num">${this.goods[i].comment.length}</a>人评价
                        </p>
                        <b class="add" style="background:#f00;padding:3px 5px;margin-top:-20px;float:right;border-radius:5px;font-size:12px;line-height:16px;color:#fff;cursor:pointer;">加入购物车</b>
                    </li>
            `;
            this.ul.innerHTML = str;
        }
        this.addevent();
    }
    addevent(){
        this.ali = this.ul.querySelectorAll("li");
        this.ali = Array.from(this.ali);
        for(let i in this.ali){
            this.ali[i].onclick = (eve)=>{
                // var e = eve || window.event;
                // e.stopPropagation();
                for(var j in this.goods){
                    if(this.ali[i].children[1].innerHTML == this.goods[j].info.name){
                        this.good = this.goods[j];
                        this.setcookie();
                        location.href = "good_detail.html";
                    }
                }
            }
        }
    }
    setcookie(){
        setCookie("GoodDetail",JSON.stringify(this.good));
    }
}
new ShowList;

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

class AddToCart{
    constructor(){
        this.ul = document.querySelector("main .list ul");
        this.add = document.querySelectorAll("main .list ul .add");
        this.add = Array.from(this.add);
        this.getcookie();
    }
    getcookie(){
        this.goods = getCookie("GoodsList")? JSON.parse(getCookie("GoodsList")) : [];
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
                    return;
                }
            }
        }   
    }
    addevent(){
        this.ali = this.ul.querySelectorAll("li");
        for(var i=0;i<this.goods.length;i++){
            this.ali[i].index = this.goods[i].info.name;
        }
        for(let i in this.add){
            this.add[i].onclick = (eve)=>{
                var e = eve || window.event;
                e.stopPropagation();
                // 没有登录不能加入购物车
                if(this.info.length == 0){
                    location.href = "login.html";
                    return;
                }else if(this.status == false){
                    location.href = "login.html";
                }
                this.id = this.add[i].parentNode.index;
                this.setCookie();
            }
        }
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
new AddToCart;

// 搜索框：根据输入框的关键词跳转到对应的商品列表页
class SearchGoods{
    constructor(){
        this.sbox = document.querySelector("header .search .txt input");
        this.stbn = document.querySelector("header .search .btn");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
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

