"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 三级菜单
var SecMenu = function () {
    function SecMenu(options) {
        _classCallCheck(this, SecMenu);

        this.fele = options.fele;
        this.sele = options.sele;
        this.c = options.c;
        this.show();
    }

    _createClass(SecMenu, [{
        key: "show",
        value: function show() {
            var _this = this;

            var _loop = function _loop(i) {
                that = _this;

                _this.fele[i].onmouseover = function () {
                    if (that.c) {
                        that.fele[i].children[0].style.background = "#333";
                    }
                    if (that.fele[i].children[1].tagName == that.sele[0].tagName) {
                        that.fele[i].children[1].style.display = "block";
                    }
                };
                _this.fele[i].onmouseout = function () {
                    that.fele[i].children[0].style.background = that.c;
                    if (that.fele[i].children[1].tagName == that.sele[0].tagName) {
                        that.fele[i].children[1].style.display = "none";
                    }
                };
            };

            for (var i = 0; i < this.fele.length; i++) {
                var that;

                _loop(i);
            }
        }
    }]);

    return SecMenu;
}();
// index 主页的三级菜单


var fdiv = document.querySelectorAll("nav .nav .first");
var sul = document.querySelectorAll("nav .nav .first ul");
var fdl = document.querySelectorAll("nav .nav-menu dl");
var sdd = document.querySelectorAll("nav .nav-menu dd");
new SecMenu({
    fele: fdiv,
    sele: sul
});
new SecMenu({
    fele: fdl,
    sele: sdd,
    c: "rgba(51,51,51,0.6)"
});

// banner的轮播图
$(".banner").banner({
    items: $(".banner").find("li"),
    left: $(".banner").find(".btn-l"),
    right: $(".banner").find(".btn-r"),
    list: true,
    index: 3,
    autoPlay: true,
    delayTime: 2000,
    moveTime: 500
});

// 楼层效果
;(function tofloor() {
    window.onscroll = function () {
        var home = document.getElementById("homebox");
        var elevator = document.querySelector(".diy-elevator");
        var scrollT = document.documentElement.scrollTop;
        if (scrollT >= home.offsetTop) {
            elevator.style.display = "block";
        } else {
            elevator.style.display = "none";
        }
    };
    var otop = document.querySelector(".diy-elevator .totop");
    var t;
    otop.onclick = function () {
        clearInterval(t);
        t = setInterval(function () {
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(t);
            } else {
                document.documentElement.scrollTop -= 100;
            }
        }, 30);
    };

    $(".diy-elevator a").click(function () {
        $(this).css({ background: "#333" }).siblings().css({ background: "#bbb" }).parent().find(".totop").css({ background: "#4fb99f" });
        var i = $(this).index();
        var t = $(".floor").eq(i).offset().top;
        $("html").animate({
            scrollTop: t
        });
    });
})();

// index 获取后端数据，渲染troika-body和floor

var IndexGoods = function () {
    function IndexGoods() {
        _classCallCheck(this, IndexGoods);

        this.cont = document.querySelectorAll(".troika-body a");
        this.phonel = document.querySelector(".phone .floor-main .left-AD a");
        this.phoner = document.querySelectorAll(".phone .floor-main .rightAD a");
        this.phone = document.querySelectorAll(".phone .floor-main .shop-list a");
        this.url = "http://localhost/Project_yaya/data/index.json";
        this.getinfo();
    }

    _createClass(IndexGoods, [{
        key: "getinfo",
        value: function getinfo() {
            var that = this;
            ajaxGet(this.url, function (res) {
                that.res = JSON.parse(res);
                that.display();
            });
        }
    }, {
        key: "display",
        value: function display() {
            var str = "";
            for (var i = 0; i < 15; i++) {
                str = "<div class=\"tip\">\n                        <h3>" + this.res[i].name + "</h3>\n                        <p>" + this.res[i].introduce + "</p>\n                    </div>\n                    <img src=\"" + this.res[i].img + "\" alt=\"\">\n            ";
                this.cont[i].innerHTML = str;
            }
            this.phonel.innerHTML = "<div class=\"diy-tip abs\">\n                                    <h3>" + this.res[15].name + "</h3>\n                                    <p>" + this.res[15].introduce + "</p>\n                                </div>\n                                <img src=\"" + this.res[15].img + "\" alt=\"\">";
            for (var i = 16; i < 24; i++) {
                str = "<div class=\"diy-tip\">\n                        <h3>" + this.res[i].name + "</h3>\n                        <p>" + this.res[i].introduce + "</p>\n                        <div class=\"get-price\">" + this.res[i].price + "</div>\n                    </div>\n                    <img src=\"" + this.res[i].img + "\" alt=\"\">";
                this.phone[i - 16].innerHTML = str;
            }
            for (var i = 24; i < 28; i++) {
                str = "<div class=\"diy-tip\">\n                        <h3>" + this.res[i].name + "</h3>\n                        <p>" + this.res[i].introduce + "</p>\n                    </div>\n                    <img src=\"" + this.res[i].img + "\" alt=\"\">";

                this.phoner[i - 24].innerHTML = str;
            }
        }
    }]);

    return IndexGoods;
}();

new IndexGoods();

// 搜索框：根据输入框的关键词跳转到对应的商品列表页

var SearchGoods = function () {
    function SearchGoods() {
        _classCallCheck(this, SearchGoods);

        this.sbox = document.querySelector("header .search .txt input");
        this.stbn = document.querySelector("header .search .btn");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        // console.log(this.sbox)
        this.getinfo();
    }

    _createClass(SearchGoods, [{
        key: "getinfo",
        value: function getinfo() {
            var _this2 = this;

            ajaxGet(this.url, function (res) {
                _this2.res = JSON.parse(res);
            });
            this.addevent();
        }
    }, {
        key: "addevent",
        value: function addevent() {
            var _this3 = this;

            this.stbn.onclick = function () {
                _this3.str = _this3.sbox.value;
                _this3.goods = [];
                for (var i in _this3.res) {
                    if (_this3.str == _this3.res[i].info.tag) {
                        _this3.goods.push(_this3.res[i]);
                    }
                }
                location.href = "goods_list.html";
                _this3.setcookie();
            };
        }
    }, {
        key: "setcookie",
        value: function setcookie() {
            setCookie("GoodsList", JSON.stringify(this.goods));
        }
    }]);

    return SearchGoods;
}();

new SearchGoods();

// 登录注册退出的效果

var IndexLogin = function () {
    function IndexLogin() {
        _classCallCheck(this, IndexLogin);

        this.login = document.querySelector("#top .login .lo");
        this.register = document.querySelector("#top .login .re");
        this.wel = document.querySelector("#top .welcome");
        this.span = document.querySelector(".welcome span");
        this.exit = document.querySelector(".login em");
        this.userimg = document.querySelector("#banner-bg .user-login dl .userimg img");
        this.getUser();
        this.addEvent();
    }

    _createClass(IndexLogin, [{
        key: "getUser",
        value: function getUser() {
            var _this4 = this;

            this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
            this.i = null;
            var onoff = this.info.some(function (val, ind) {
                _this4.i = ind;
                return val.status == true;
            });
            if (onoff) {
                this.login.style.display = "none";
                this.register.style.display = "none";
                this.wel.style.display = "block";
                this.span.innerHTML = this.info[this.i].user;
                this.userimg.src = "images/t2.png";
            }
        }
    }, {
        key: "addEvent",
        value: function addEvent() {
            var that = this;
            this.exit.onclick = function () {
                that.info[that.i].status = false;
                setCookie("UserInfo", JSON.stringify(that.info));
                location.reload();
            };
        }
    }]);

    return IndexLogin;
}();

new IndexLogin();

// 登录之后才能显示购物车的数量且跳转到购物车

var CartNum = function () {
    function CartNum() {
        _classCallCheck(this, CartNum);

        this.cartbox = document.querySelector(".shopcar");
        this.car = document.querySelector(".shopcar b");
        this.getcookie();
    }

    _createClass(CartNum, [{
        key: "getcookie",
        value: function getcookie() {
            this.goods = getCookie("AddGoods") ? JSON.parse(getCookie("AddGoods")) : [];
            this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
            this.testlogin();
            this.addevent();
        }
    }, {
        key: "testlogin",
        value: function testlogin() {
            this.status = false;
            if (this.info.length != 0) {
                for (var i in this.info) {
                    if (this.info[i].status == true) {
                        this.status = true;
                        this.shownum();
                        return;
                    }
                }
            }
        }
    }, {
        key: "addevent",
        value: function addevent() {
            var _this5 = this;

            this.cartbox.onclick = function () {
                if (_this5.info.length == 0) {
                    location.href = "login.html";
                    return;
                } else if (_this5.status == false) {
                    location.href = "login.html";
                    return;
                }
                location.href = "shoppingcar.html";
                _this5.shownum();
            };
        }
    }, {
        key: "shownum",
        value: function shownum() {
            this.car.innerHTML = this.goods.length;
        }
    }]);

    return CartNum;
}();

new CartNum();

// 搜索框的下拉菜单

var LagMenu = function () {
    function LagMenu() {
        _classCallCheck(this, LagMenu);

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

    _createClass(LagMenu, [{
        key: "addevent",
        value: function addevent() {
            var _this6 = this;

            this.ospan.onclick = function (eve) {
                var e = eve || window.event;
                e.stopPropagation();
                if (_this6.onoff) {
                    _this6.oul.style.display = "block";
                    _this6.onoff = false;
                } else {
                    _this6.oul.style.display = "none";
                    _this6.onoff = true;
                }
                for (var i = 0; i < _this6.ali.length; i++) {
                    _this6.ali[i].className = "";
                }
                _this6.ali[_this6.next].className = "active";
            };
        }
    }, {
        key: "show",
        value: function show() {
            var _this7 = this;

            var _loop2 = function _loop2(i) {
                _this7.ali[i].onmouseover = function () {
                    for (var j = 0; j < _this7.ali.length; j++) {
                        _this7.ali[j].className = "";
                    }
                    _this7.ali[i].className = "active";
                };
                _this7.ali[i].onclick = function () {
                    _this7.ospan.value = _this7.ali[i].innerHTML;
                    _this7.next = i;
                };
            };

            // 使用let形成闭包，可以在事件执行函数内部获取i,不用创建内联属性indexI来保存i了
            for (var i = 0; i < this.ali.length; i++) {
                _loop2(i);
            }
        }
    }, {
        key: "keyevent",
        value: function keyevent() {
            var _this8 = this;

            document.onkeydown = function (eve) {
                if (_this8.oul.style.display != "block") return;
                var e = eve || window.event;
                var keycode = e.keyCode || window.which;
                if (keycode == 38) {
                    // 下
                    if (_this8.now == 0) {
                        _this8.now = 0;
                    } else {
                        _this8.now--;
                    }
                    _this8.ospan.value = _this8.ali[_this8.now].innerHTML;
                    _this8.getActive();
                    _this8.next = _this8.now;
                }
                if (keycode == 40) {
                    // 上
                    if (_this8.now == _this8.ali.length - 1) {
                        _this8.now = _this8.ali.length - 1;
                    } else {
                        _this8.now++;
                    }
                    _this8.ospan.value = _this8.ali[_this8.now].innerHTML;
                    _this8.getActive();
                    _this8.next = _this8.now;
                }
                if (keycode == 13) {
                    _this8.oul.style.display = "none";
                    _this8.onoff = true;
                }
            };
        }
    }, {
        key: "devent",
        value: function devent() {
            var _this9 = this;

            document.onclick = function () {
                _this9.oul.style.display = "none";
                _this9.onoff = true;
            };
        }
    }, {
        key: "getActive",
        value: function getActive() {
            for (var i = 0; i < this.ali.length; i++) {
                this.ali[i].className = "";
            }
            this.ali[this.now].className = "active";
        }
    }]);

    return LagMenu;
}();

new LagMenu();