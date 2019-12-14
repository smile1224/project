class ShoppingCar{
    constructor(){
        this.tbody = document.querySelector(".car-item");
        this.aall = document.querySelectorAll(".all");
        this.totalnum = document.querySelector(".car-total .right .totalnum");
        this.totalprice = document.querySelector(".car-total .right .totalprice");
        this.delgood = document.querySelector(".car-total .left .delgood");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        this.getinfo();
         
    }
    getinfo(){
        // 1. 获取所有的商品数据 
        var that = this;
        ajaxGet(this.url,function(res){
            that.res = JSON.parse(res);
            var arr = [];
            for(var i in that.res){
                arr.push(that.res[i]);
            }
            that.res = arr;
            // 2. 获取cookie中的加入购物车的数量的数据 this.goods
            that.goods = getCookie("AddGoods")? JSON.parse(getCookie("AddGoods")) : [];
            that.display();  
        })
    }
    // 3. 渲染页面
    display(){
        var str = "";
        var price = [];  // 单价
        this.goodprice = []; // 小计中的价格
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.goods[j].id == this.res[i].info.name){
                    // 计算小计中的价格
                    price[i] = parseFloat(this.res[i].info.price.slice(1,this.res[i].info.price.length));
                    this.goodprice[i] = "￥" + (price[i]*this.goods[j].num).toFixed(2);
                    // console.log(this.goodprice[i])
                    str += `<div class="item"  index="${this.goods[j].id}">
                                <div class="car-check l">
                                    <input type="checkbox" class="one">
                                </div>
                                <div class="cart-product-box rel">
                                    <div class="product l">
                                        <a href="#" target="_blank" class="itemimg rel l">
                                            <img src="${this.res[i].imgs[0]}">
                                        </a> 
                                        <div class="product-title">
                                            <p class="title-line">
                                                <a href="#" target="_blank">
                                                ${this.goods[j].id}
                                                </a>
                                            </p>
                                        </div>
                                    </div> 
                                    <div class="unit-price l">
                                        <b class="pri">${this.res[i].info.price}</b>
                                    </div>
                                    <div class="count l">
                                        <input type="number" min="1" class="num" value="${this.goods[j].num}">
                                    </div>
                                    <div class="sum l">
                                        <b class="red goodprice">${this.goodprice[i]}</b>
                                    </div> 
                                    <div class="action l">
                                        <a class="delete" style="cursor: pointer;">删除</a>
                                    </div>
                                </div>
                            </div>
                        `;
                } 
            } 
        }
        this.tbody.innerHTML = str;
        this.serveralSelect(); // 4.选择几条数据
        this.allSelect(); // 5.全选
        this.changeNum(); // 6.商品数量的变化
        this.deleteOne(); // 7.删除对应的一条数据
    }
  
    // 4.选择其中几条数据
    serveralSelect(){
        var that = this;
        this.aone = document.querySelectorAll(".car-item .one");
        for(let i=0;i<this.aone.length;i++){
            this.aone[i].onclick = ()=>{
                this.showTotalNumPrice();
            }
        }
        
        for(let i=0;i<this.aone.length;i++){
            this.aone[i].onclick = ()=>{
                var onoff;
                var onoff1;
                onoff = Array.from(this.aone).every((val,ind)=>{
                    return val.checked == true;
                })
                if(onoff){

                    Array.from(this.aall).every((val,ind)=>{
                        return val.checked = true;
                    })
                }
                onoff1 = Array.from(this.aone).some((val,ind)=>{
                    return val.checked == false;
                })
                if(onoff1){

                    for(var item of this.aall){
                        item.checked = "";
                    }
                } 
                this.showTotalNumPrice();
                this.deleteServeral(); // 4-2删除几条数据
            } 
        }
    }
    // 5.全选功能
    allSelect(){ 
        var that = this; 
        this.stay = true;     
        for(let i=0;i<this.aall.length;i++){
            this.aall[i].onclick = ()=>{
                if(this.aall[i].checked == true){// 5.1 全选成功
                    for(var item of this.aall){
                        item.checked = "checked";
                    }
                    for(var j=0;j<that.aone.length;j++){
                        this.aone[j].checked = "checked";
                    }
                }else if(this.aall[i].checked == false){
                    for(var item of this.aall){
                        item.checked = "";
                    }
                    for(var j=0;j<that.aone.length;j++){
                        this.aone[j].checked = "";
                    }
                }
                that.showTotalNumPrice();
            }
            
        }
    }
    // 6.实时的改变数量，并保存到cookie中
    changeNum(){
        this.tbody.addEventListener("input",(eve)=>{
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "num"){
                this.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                // 6-1将改变的数量保存到cookie中
                this.changeCookie((i)=>{
                    this.goods[i].num = target.value;
                    // 6-2 将每条数据对应的小计中的价格实时的改变
                    this.changePrice(target);
                    this.showTotalNumPrice();
                    
                })
            } 
        })
    }
    // 7.删除一条数据,删除按钮绑定事件
    deleteOne(){
        this.tbody.addEventListener("click",(eve)=>{
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "delete"){
                this.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                target.parentNode.parentNode.parentNode.remove();
                // 7-1 将删除的数据从cookie中对应的删除
                this.changeCookie((i)=>{
                    this.goods.splice(i,1);
                })
            }
            this.aone = document.querySelectorAll(".one");
            if(this.aone.length == 0){
                for(var item of this.aall){
                    item.checked = "";
                }
            }
            this.showTotalNumPrice();
        })  
    }

    // 删除选中的商品
    deleteServeral(){
        this.delgood.onclick = ()=>{
            for(var k=0;k<this.aone.length;k++){
                if(this.aone[k].checked){
                    this.id = this.aone[k].parentNode.parentNode.getAttribute("index");
                    this.aone[k].parentElement.parentElement.remove();
                    this.changeCookie((i)=>{
                        this.goods.splice(i,1);
                    })
                }
            }
            this.aone = document.querySelectorAll(".one");
            if(this.aone.length == 0){
                for(var item of this.aall){
                    item.checked = "";
                }
            }
            this.showTotalNumPrice();
        }
    }
    

    // 改变cookie中的数据
    changeCookie(cb){
        for(var i in this.goods){
            if(this.id == this.goods[i].id){
                cb(i);
                break;
            }
        }
        setCookie("AddGoods",JSON.stringify(this.goods));
    }

    
    // 改变每条数据中的小计的价格，并显示在页面上
    changePrice(target){
        var pri = target.parentNode.parentNode.querySelector(".pri");
        var totalpri = target.parentNode.nextElementSibling.children[0];
        var totalprice = parseFloat(pri.innerHTML.slice(1,pri.length)) * target.value;
        totalpri.innerHTML = "￥" + (totalprice).toFixed(2);
    }
    
    // 显示总数量和总价钱
    showTotalNumPrice(){
        // this.aone = document.querySelectorAll(".one");
        var n=0;
        var sum = 0;
        console.log(this.aone)
        for(let j=0;j<this.aone.length;j++){
            if(this.aone[j].checked == true){
                n++;
                var price;
                price = this.aone[j].parentNode.parentNode.querySelector(".goodprice").innerHTML;
                price = parseFloat(price.slice(1,price.length));
                sum += price;
            }
        }
        this.totalnum.innerHTML = n;
        this.totalprice.innerHTML = "￥" + sum.toFixed(2);
    }
    
}
new ShoppingCar;


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
        }
    }
    addEvent(){
        var that = this;
        this.exit.onclick = function(){
            that.info[that.i].status = false;
            setCookie("UserInfo",JSON.stringify(that.info));
            location.href = "login.html";
        }
    }
}
new IndexLogin;