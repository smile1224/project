;(function($){
    "use strict";
    $.fn.banner = function(options){
        // console.log(this);// div1.banner1.box
        this._obj = {
            list:options.list == false ? false : true,
            index:options.index || 0,
            autoPlay:options.autoPlay == false ? false : true,
            delayTime:options.delayTime || 1000,
            moveTime:options.moveTime || 200,
            iPrev:options.items.length-1
        };
        // this._obj.iPrev = this._obj.index==0? options.items.length-1 : this._obj.index -1;
        var that = this;

        // 初始化布局
        this._obj.init = function(){
            that.css({
                overflow:"hidden"
            });
            options.items.css({
                position:"absolute",
                left:options.items.eq(0).width(),
                top:0
            }).eq(that._obj.index).css({
                left:0
            })
        }
        this._obj.init();
        function btnLeft(){
            if(that._obj.index == 0){
                that._obj.index = options.items.length -1;
                that._obj.iPrev = 0;
            }else{
                that._obj.iPrev = that._obj.index;
                that._obj.index--;
            }
            that._obj.moveBtn(1);
        }
        function btnRight(){
            if(that._obj.index == options.items.length -1){
                that._obj.index = 0;
                that._obj.iPrev = options.items.length -1;
            }else{
                that._obj.iPrev = that._obj.index;
                that._obj.index++;
            }
            that._obj.moveBtn(-1);
        }
        this._obj.moveBtn = function(type){
            options.items.eq(that._obj.iPrev).css({
                left:0
            }).stop().animate({
                left:options.items.eq(0).width() * type
            },that._obj.moveTime).end().eq(that._obj.index).css({
                left:-options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },that._obj.moveTime);

            if(!that._obj.list) return;
            that.find(".list").find("li").eq(that._obj.index).css({
                background:"#666",
            }).siblings().css({
                background:"rgba(200,200,200,0.6)",
            })
        }
        // 左右按钮的切换
        if(options.left != undefined && options.left.length>0 && options.right != undefined && options.right.length>0){
            options.left.click(btnLeft);
            options.right.click(btnRight);
        }

        if(this._obj.list){
            // 创建小按钮
            var str = "";
            for(var i=0;i<options.items.length;i++){
                str += `<li>${i+1}</li>`;
            } 
            $("<ul class='list'>").html(str).appendTo(this).css({
                width: "760px",
                position: "absolute",
                left:0,
                bottom: "20px",
                textAlign:"center",
            }).children().css({
                fontSize: 0,
                width: "12px",
                height: "12px",
                background: "rgba(0,0,0,.2)",
                display:"inline-block",
                borderRadius: "100%",
                margin:"0 3px",
                cursor: "pointer"
            }).eq(0).css({
                borderLeft:"none",
            }).end().eq(options.items.length-1).css({
                borderRight:"none",
            }).parent().children().eq(this._obj.index).css({
                background:"#666",
            })

            // 给按钮添加事件
            this.find(".list").children("li").click(function(){
                // 这里面的$(this)指的是点击的那个li
                // $(this).index()可以用来获取当前点击的索引
                // console.log(that._obj.index,$(this).index());
                if($(this).index()>that._obj.index){
                    that._obj.moveList($(this).index(),1);
                }
                if($(this).index()<that._obj.index){
                    that._obj.moveList($(this).index(),-1);
                }
                $(this).css({
                    background:"#666",
                }).siblings().css({
                    background:"rgba(200,200,200,0.6)",
                })
                that._obj.index = $(this).index();
            })
            this._obj.moveList = function(i,type){
                options.items.eq(that._obj.index).css({
                    left:0
                }).stop().animate({
                    left:-options.items.eq(0).width()*type
                },that._obj.moveTime).end().eq(i).css({
                    left:options.items.eq(0).width()*type
                }).stop().animate({
                    left:0
                },that._obj.moveTime);
            }
        }

        // 自动播放
        if(this._obj.autoPlay){
            // clearInterval(this._obj.t);
            this._obj.t = setInterval(()=>{
                btnRight();
            },this._obj.delayTime);

            this.hover(function(){
                clearInterval(that._obj.t);
            },function(){
                that._obj.t = setInterval(()=>{
                    btnRight();
                },that._obj.delayTime);
            })
        }
    }
})(jQuery);