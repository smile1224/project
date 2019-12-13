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

class CartNum{
    constructor(){
        this.car = document.querySelector(".shopcar b");
        this.getcookie();
    }
    getcookie(){
        this.goods = getCookie("AddGoods")? JSON.parse(getCookie("AddGoods")) : [];
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
            // this.userimg.src = "images/t2.png";
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
        this.addevent(); 
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
