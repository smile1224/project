// 首页的搜索功能，根据搜索的关键字跳转到商品列表页
define(()=>{
    class SearchGoods{
        constructor(){
            this.sbox = document.querySelector("header .search .txt");
            this.stbn = document.querySelector("header .search .btn");
            // console.log(this.stbn)
            this.url = "http://localhost/Project_yaya/data/goods_detail.json";
            this.goods = [1111]
            this.getinfo();
        }
        getinfo(){
            ajaxGet(this.url,(res)=>{
                this.res = JSON.parse(res);
                this.search();
            })
        }
        search(){
            this.sbox.addEventListener("input",()=>{
                this.str = this.sbox.value;
                this.goods = [];
                for(var i in this.res){
                    if(this.str == this.res[i].info.tag){
                        this.goods.push(this.res[i]);
                        // location.href = "goods_list.html";
                    }
                }
                this.addevent();
            })
            
        }
        addevent(){
            console.log(this.goods);
            // this.stbn.onclick = ()=>{
            //     location.href="goods_list.html";
    
            // }
        }
    }
    function ajaxGet(url,cb,data){
        data = data || {};
        var str = "";
        for(var i in data){
            str += `${i}=${data[i]}&`;
        }
        url = url + "?" + str + "__gbll=" + (new Date()).getTime();
        var ajax = new XMLHttpRequest();
        ajax.open("get",url,true);
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                cb(ajax.responseText);
            }
        }
        ajax.send();
    }
    return SearchGoods;

})