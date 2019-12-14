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

// goods_list页的三级菜单


var dl = document.querySelectorAll(".nav .nav-menu dl");
var dd = document.querySelectorAll(".nav .nav-menu dd");
new SecMenu({
    fele: dl,
    sele: dd,
    c: "#f9b548"
});

// 获取搜索后存放在cookie里面的数据，并渲染页面

var ShowList = function () {
    function ShowList() {
        _classCallCheck(this, ShowList);

        this.ul = document.querySelector("main .list ul");
        this.getcookie();
    }

    _createClass(ShowList, [{
        key: "getcookie",
        value: function getcookie() {
            this.goods = getCookie("GoodsList") ? JSON.parse(getCookie("GoodsList")) : [];
            this.display();
        }
    }, {
        key: "display",
        value: function display() {
            var str = "";
            for (var i in this.goods) {
                str += "<li>\n                        <a class=\"img\"><img src=\"" + this.goods[i].imgs[1] + "\" alt=\"\"></a>\n                        <a class=\"title\">" + this.goods[i].info.name + "</a>\n                        <span class=\"price\">" + this.goods[i].info.price + "</span>\n                        <p style=\"margin:3px 0;\">\n                            \u5DF2\u6709<a class=\"commen-num\">" + this.goods[i].comment.length + "</a>\u4EBA\u8BC4\u4EF7\n                        </p>\n                        <b class=\"add\" style=\"background:#f00;padding:3px 5px;margin-top:-20px;float:right;border-radius:5px;font-size:12px;line-height:16px;color:#fff;cursor:pointer;\">\u52A0\u5165\u8D2D\u7269\u8F66</b>\n                    </li>\n            ";
                this.ul.innerHTML = str;
            }
            this.addevent();
        }
    }, {
        key: "addevent",
        value: function addevent() {
            var _this2 = this;

            this.ali = this.ul.querySelectorAll("li");
            this.ali = Array.from(this.ali);

            var _loop2 = function _loop2(i) {
                _this2.ali[i].onclick = function (eve) {
                    // var e = eve || window.event;
                    // e.stopPropagation();
                    for (var j in _this2.goods) {
                        if (_this2.ali[i].children[1].innerHTML == _this2.goods[j].info.name) {
                            _this2.good = _this2.goods[j];
                            _this2.setcookie();
                            location.href = "good_detail.html";
                        }
                    }
                };
            };

            for (var i in this.ali) {
                _loop2(i);
            }
        }
    }, {
        key: "setcookie",
        value: function setcookie() {
            setCookie("GoodDetail", JSON.stringify(this.good));
        }
    }]);

    return ShowList;
}();

new ShowList();

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
            var _this3 = this;

            this.cartbox.onclick = function () {
                if (_this3.info.length == 0) {
                    location.href = "login.html";
                    return;
                } else if (_this3.status == false) {
                    location.href = "login.html";
                    return;
                }
                location.href = "shoppingcar.html";
                _this3.shownum();
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

var AddToCart = function () {
    function AddToCart() {
        _classCallCheck(this, AddToCart);

        this.ul = document.querySelector("main .list ul");
        this.add = document.querySelectorAll("main .list ul .add");
        this.add = Array.from(this.add);
        this.getcookie();
    }

    _createClass(AddToCart, [{
        key: "getcookie",
        value: function getcookie() {
            this.goods = getCookie("GoodsList") ? JSON.parse(getCookie("GoodsList")) : [];
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
                        return;
                    }
                }
            }
        }
    }, {
        key: "addevent",
        value: function addevent() {
            var _this5 = this;

            this.ali = this.ul.querySelectorAll("li");
            for (var i = 0; i < this.goods.length; i++) {
                this.ali[i].index = this.goods[i].info.name;
            }

            var _loop3 = function _loop3(_i) {
                _this5.add[_i].onclick = function (eve) {
                    var e = eve || window.event;
                    e.stopPropagation();
                    // 没有登录不能加入购物车
                    if (_this5.info.length == 0) {
                        location.href = "login.html";
                        return;
                    } else if (_this5.status == false) {
                        location.href = "login.html";
                    }
                    _this5.id = _this5.add[_i].parentNode.index;
                    _this5.setCookie();
                };
            };

            for (var _i in this.add) {
                _loop3(_i);
            }
        }
    }, {
        key: "setCookie",
        value: function (_setCookie) {
            function setCookie() {
                return _setCookie.apply(this, arguments);
            }

            setCookie.toString = function () {
                return _setCookie.toString();
            };

            return setCookie;
        }(function () {
            var _this6 = this;

            this.goods = getCookie("AddGoods") ? JSON.parse(getCookie("AddGoods")) : [];
            if (this.goods.length < 1) {
                this.goods.push({
                    id: this.id,
                    num: 1
                });
            } else {
                var i = 0;
                var onoff = this.goods.some(function (val, idx) {
                    i = idx;
                    return val.id === _this6.id;
                });

                if (!onoff) {
                    this.goods.push({
                        id: this.id,
                        num: 1
                    });
                } else {
                    this.goods[i].num++;
                }
            }
            setCookie("AddGoods", JSON.stringify(this.goods));
        })
    }]);

    return AddToCart;
}();

new AddToCart();

// 搜索框：根据输入框的关键词跳转到对应的商品列表页

var SearchGoods = function () {
    function SearchGoods() {
        _classCallCheck(this, SearchGoods);

        this.sbox = document.querySelector("header .search .txt input");
        this.stbn = document.querySelector("header .search .btn");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        this.getinfo();
    }

    _createClass(SearchGoods, [{
        key: "getinfo",
        value: function getinfo() {
            var _this7 = this;

            ajaxGet(this.url, function (res) {
                _this7.res = JSON.parse(res);
            });
            this.addevent();
        }
    }, {
        key: "addevent",
        value: function addevent() {
            var _this8 = this;

            this.stbn.onclick = function () {
                _this8.str = _this8.sbox.value;
                _this8.goods = [];
                for (var i in _this8.res) {
                    if (_this8.str == _this8.res[i].info.tag) {
                        _this8.goods.push(_this8.res[i]);
                    }
                }
                location.href = "goods_list.html";
                _this8.setcookie();
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
            var _this9 = this;

            this.ospan.onclick = function (eve) {
                var e = eve || window.event;
                e.stopPropagation();
                if (_this9.onoff) {
                    _this9.oul.style.display = "block";
                    _this9.onoff = false;
                } else {
                    _this9.oul.style.display = "none";
                    _this9.onoff = true;
                }
                for (var i = 0; i < _this9.ali.length; i++) {
                    _this9.ali[i].className = "";
                }
                _this9.ali[_this9.next].className = "active";
            };
        }
    }, {
        key: "show",
        value: function show() {
            var _this10 = this;

            var _loop4 = function _loop4(i) {
                _this10.ali[i].onmouseover = function () {
                    for (var j = 0; j < _this10.ali.length; j++) {
                        _this10.ali[j].className = "";
                    }
                    _this10.ali[i].className = "active";
                };
                _this10.ali[i].onclick = function () {
                    _this10.ospan.value = _this10.ali[i].innerHTML;
                    _this10.next = i;
                };
            };

            // 使用let形成闭包，可以在事件执行函数内部获取i,不用创建内联属性indexI来保存i了
            for (var i = 0; i < this.ali.length; i++) {
                _loop4(i);
            }
        }
    }, {
        key: "keyevent",
        value: function keyevent() {
            var _this11 = this;

            document.onkeydown = function (eve) {
                if (_this11.oul.style.display != "block") return;
                var e = eve || window.event;
                var keycode = e.keyCode || window.which;
                if (keycode == 38) {
                    // 下
                    if (_this11.now == 0) {
                        _this11.now = 0;
                    } else {
                        _this11.now--;
                    }
                    _this11.ospan.value = _this11.ali[_this11.now].innerHTML;
                    _this11.getActive();
                    _this11.next = _this11.now;
                }
                if (keycode == 40) {
                    // 上
                    if (_this11.now == _this11.ali.length - 1) {
                        _this11.now = _this11.ali.length - 1;
                    } else {
                        _this11.now++;
                    }
                    _this11.ospan.value = _this11.ali[_this11.now].innerHTML;
                    _this11.getActive();
                    _this11.next = _this11.now;
                }
                if (keycode == 13) {
                    _this11.oul.style.display = "none";
                    _this11.onoff = true;
                }
            };
        }
    }, {
        key: "devent",
        value: function devent() {
            var _this12 = this;

            document.onclick = function () {
                _this12.oul.style.display = "none";
                _this12.onoff = true;
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