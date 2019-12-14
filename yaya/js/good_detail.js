"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 倒计时
var CountDown = function () {
    function CountDown(options) {
        _classCallCheck(this, CountDown);

        this.d = options.d;
        this.h = options.h;
        this.m = options.m;
        this.s = options.s;
        this.t = options.t;
        this.gettime();
    }

    _createClass(CountDown, [{
        key: "gettime",
        value: function gettime() {
            var _this = this;

            clearInterval(this.time);
            if (new Date(this.t).getTime() > new Date().getTime()) {
                this.time = setInterval(function () {
                    _this.d1 = new Date(_this.t);
                    _this.d2 = new Date();
                    var difftime = Math.abs(_this.d1.getTime() - _this.d2.getTime());
                    _this.day = Math.floor(difftime / 1000 / 60 / 60 / 24);
                    _this.hour = Math.floor(difftime / 1000 / 60 / 60 - 24 * _this.day);
                    _this.minute = Math.floor(difftime / 1000 / 60 - 24 * 60 * _this.day - 60 * _this.hour);
                    _this.second = parseInt(difftime / 1000 - 24 * 60 * 60 * _this.day - 60 * 60 * _this.hour - 60 * _this.minute);
                    _this.display();
                });
            } else {
                this.d.innerHTML = 0;
                this.h.innerHTML = 0;
                this.m.innerHTML = 0;
                this.s.innerHTML = 0;
            }
        }
    }, {
        key: "display",
        value: function display() {
            this.d.innerHTML = this.day;
            this.h.innerHTML = this.hour;
            this.m.innerHTML = this.minute;
            this.s.innerHTML = this.second;
            if (this.d1.getTime() == this.d2.getTime()) {
                clearInterval(this.time);
            }
        }
    }]);

    return CountDown;
}();

var day = document.querySelector(".product-intro .info-wrap .discount-time .day");
var hour = document.querySelector(".product-intro .info-wrap .discount-time .hour");
var minute = document.querySelector(".product-intro .info-wrap .discount-time .minute");
var second = document.querySelector(".product-intro .info-wrap .discount-time .second");
new CountDown({
    d: day,
    h: hour,
    m: minute,
    s: second,
    t: "2019/12/13 10:22:30"
});

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
            var _this2 = this;

            var _loop = function _loop(i) {
                that = _this2;

                _this2.fele[i].onmouseover = function () {
                    if (that.c) {
                        that.fele[i].children[0].style.background = "#333";
                    }
                    if (that.fele[i].children[1].tagName == that.sele[0].tagName) {
                        that.fele[i].children[1].style.display = "block";
                    }
                };
                _this2.fele[i].onmouseout = function () {
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


var dl = document.querySelectorAll(".nav .nav-menu dl");
var dd = document.querySelectorAll(".nav .nav-menu dd");

new SecMenu({
    fele: dl,
    sele: dd,
    c: "#f9b548"
});

var ShowGoodDetail = function () {
    function ShowGoodDetail() {
        _classCallCheck(this, ShowGoodDetail);

        this.thumblist = document.querySelector(".product-intro .control-box .thumb-list");
        this.goodname = document.querySelector(".product-intro .info-wrap .product-name");
        this.goodprice = document.querySelector(".product-intro .info-wrap .product-price span");
        // console.log(this.goodname,this.goodprice)
        this.getcookie();
    }

    _createClass(ShowGoodDetail, [{
        key: "getcookie",
        value: function getcookie() {
            this.good = getCookie("GoodDetail") ? JSON.parse(getCookie("GoodDetail")) : [];
            this.imgs = this.good.imgs;
            this.info = this.good.info;
            this.introduce = this.good.introduce;
            this.comment = this.good.comment;
            // console.log(this.info,this.introduce,this.comment)
            this.displaythumblist();
            this.displayinfo();
        }
    }, {
        key: "displaythumblist",
        value: function displaythumblist() {
            var str = "";
            for (var i in this.imgs) {
                str += "\n            <div><img src=\"" + this.imgs[i] + "\" alt=\"\"></div>\n            ";
            }
            this.thumblist.innerHTML = str;
        }
    }, {
        key: "displayinfo",
        value: function displayinfo() {
            var str = "";
            this.goodname.innerHTML = this.info.name;
            this.goodprice.innerHTML = this.info.price;
        }
    }]);

    return ShowGoodDetail;
}();

new ShowGoodDetail();
// 放大镜

var Magnifier = function () {
    function Magnifier(options) {
        _classCallCheck(this, Magnifier);

        this.small = options.small;
        this.big = options.big;
        this.span = options.span;
        this.img = options.img;
        this.list = Array.from(options.list);
        this.display();
    }

    _createClass(Magnifier, [{
        key: "display",
        value: function display() {
            var _this3 = this;

            // 先初始化框内的一个图片
            var str = "\n                <img src=\"" + this.list[0].children[0].src + "\" alt=\"\">\n                <span></span>\n            ";
            this.small.innerHTML = str;
            this.img.src = this.list[0].children[0].src;
            this.span = this.small.querySelector("span");
            // 点击图片切换上面的图片
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop2 = function _loop2() {
                    var i = _step.value;

                    i.onclick = function () {
                        str = "\n                    <img src=\"" + i.children[0].src + "\" alt=\"\">\n                    <span></span>\n                ";
                        _this3.small.innerHTML = str;
                        _this3.img.src = i.children[0].src;
                        _this3.span = _this3.small.querySelector("span");
                    };
                };

                for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop2();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var that = this;
            this.small.onmouseover = function () {
                that.over();
            };
            this.small.onmousemove = function (eve) {
                var e = eve || window.event;
                that.move(e);
            };
            this.small.onmouseout = function () {
                that.out();
            };
        }
    }, {
        key: "over",
        value: function over() {
            this.span.style.display = "block";
            this.big.style.display = "block";
            this.sw = this.small.offsetWidth;
            this.sh = this.small.offsetHeight;
            this.bw = this.big.offsetWidth;
            this.bh = this.big.offsetHeight;
            this.iw = this.img.offsetWidth;
            this.ih = this.img.offsetHeight;
            this.span.style.width = this.bw / this.iw * this.sw + "px";
            this.span.style.height = this.bh / this.ih * this.sh + "px";
            this.spanw = this.span.offsetWidth;
            this.spanh = this.span.offsetHeight;
        }
    }, {
        key: "move",
        value: function move(e) {
            var l = e.clientX - this.small.offsetLeft - this.spanw / 2;
            var t = e.clientY - this.small.offsetTop - this.spanh / 2;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            if (l > this.sw - this.spanw) l = this.sw - this.spanw;
            if (t > this.sh - this.spanh) t = this.sh - this.spanh;
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";
            this.img.style.left = l / (this.sw - this.spanw) * (this.bw - this.iw) + "px";
            this.img.style.top = t / (this.sh - this.spanh) * (this.bh - this.ih) + "px";
        }
    }, {
        key: "out",
        value: function out() {
            this.span.style.display = "none";
            this.big.style.display = "none";
        }
    }]);

    return Magnifier;
}();

var small = document.querySelector(".preview-wrap .zoomer-box .preview-box");
var span = document.querySelector(".preview-wrap .zoomer-box .preview-box span");
var big = document.querySelector(".preview-wrap .zoomer-box .tobig");
var img = document.querySelector(".preview-wrap .zoomer-box .tobig img");
var imglist = document.querySelectorAll(".control-box .thumb-list div");

new Magnifier({
    small: small,
    span: span,
    big: big,
    img: img,
    list: imglist
});

// 商品详情评价切换

var Tab = function () {
    function Tab(options) {
        _classCallCheck(this, Tab);

        this.a = options.a;
        this.c = options.c;
        this.getcookie();
    }

    _createClass(Tab, [{
        key: "getcookie",
        value: function getcookie() {
            this.good = getCookie("GoodDetail") ? JSON.parse(getCookie("GoodDetail")) : [];
            this.info = this.good.info;
            this.introduce = this.good.introduce;
            this.comment = this.good.comment;
            this.display();
        }
    }, {
        key: "display",
        value: function display() {
            var _this4 = this;

            var _loop3 = function _loop3(_i) {
                _this4.a[_i].onclick = function () {
                    for (var j = 0; j < _this4.a.length; j++) {
                        _this4.a[j].style.background = "none";
                        _this4.a[j].style.color = "#666";
                    }
                    _this4.a[_i].style.background = "#505050";
                    _this4.a[_i].style.color = "#fff";
                    for (var j = 0; j < _this4.c.length; j++) {
                        _this4.c[j].style.display = "none";
                    }
                    _this4.c[_i].style.display = "block";
                    _this4.show(_this4.c[_i]);
                };
            };

            for (var _i = 0; _i < this.a.length; _i++) {
                _loop3(_i);
            }
        }
    }, {
        key: "show",
        value: function show(good) {
            var str = "";
            if (good.className.split(" ")[0] == "detail") {
                for (var i in this.introduce) {
                    str += "\n                <p><img src=\"" + this.introduce[i] + "\" alt=\"\"></p>\n                ";
                }
                good.querySelector(".detail-html").innerHTML = str;
            } else if (good.className.split(" ")[0] == "parameter") {
                str = "\n            <img src=\"" + this.info.introduce + "\" alt=\"\">\n            ";
                good.innerHTML = str;
            } else if (good.className.split(" ")[0] == "evaluate") {
                for (var i in this.comment) {
                    str += "\n                <p>\n                    <a href=\"\">" + this.comment[i].user + "</a>\n                    <span>" + this.comment[i].content + "</span>\n                </p>\n                ";
                }
                good.innerHTML = str;
            }
        }
    }]);

    return Tab;
}();

var title = document.querySelectorAll(".item-detail .tbs-box a");
var content = document.querySelectorAll(" .item-detail .tab-bottom .content");
new Tab({
    a: title,
    c: content
});

// 加入购物车

var Goods = function () {
    function Goods() {
        _classCallCheck(this, Goods);

        this.add = document.querySelector(".btn-wrap .to-cart");
        this.getinfo();
    }

    _createClass(Goods, [{
        key: "getinfo",
        value: function getinfo() {
            this.good = getCookie("GoodDetail") ? JSON.parse(getCookie("GoodDetail")) : [];
            this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
            this.testlogin();
            this.addEvent();
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
        key: "addEvent",
        value: function addEvent() {
            var _this5 = this;

            this.add.addEventListener("click", function () {
                // 没有登录不能加入购物车
                if (_this5.info.length == 0) {
                    console.log(1);
                    location.href = "login.html";
                    return;
                } else if (_this5.status == false) {
                    console.log(2);
                    location.href = "login.html";
                }
                _this5.id = _this5.good.info.name;
                _this5.setCookie();
                // location.href = "shoppingcar.html";
            });
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

    return Goods;
}();

new Goods();

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
            var _this7 = this;

            this.cartbox.onclick = function () {
                if (_this7.info.length == 0) {
                    location.href = "login.html";
                    return;
                } else if (_this7.status == false) {
                    location.href = "login.html";
                    return;
                }
                location.href = "shoppingcar.html";
                _this7.shownum();
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
            var _this8 = this;

            this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
            this.i = null;
            var onoff = this.info.some(function (val, ind) {
                _this8.i = ind;
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

// 搜索框：根据输入框的关键词跳转到对应的商品列表页

var SearchGoods = function () {
    function SearchGoods() {
        _classCallCheck(this, SearchGoods);

        this.sbox = document.querySelector("header .search .txt input");
        this.stbn = document.querySelector("header .search .btn");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        console.log(this.sbox);
        this.getinfo();
    }

    _createClass(SearchGoods, [{
        key: "getinfo",
        value: function getinfo() {
            var _this9 = this;

            ajaxGet(this.url, function (res) {
                _this9.res = JSON.parse(res);
            });
            this.addevent();
        }
    }, {
        key: "addevent",
        value: function addevent() {
            var _this10 = this;

            this.stbn.onclick = function () {
                _this10.str = _this10.sbox.value;
                _this10.goods = [];
                for (var i in _this10.res) {
                    if (_this10.str == _this10.res[i].info.tag) {
                        _this10.goods.push(_this10.res[i]);
                    }
                }
                location.href = "goods_list.html";
                _this10.setcookie();
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
            var _this11 = this;

            this.ospan.onclick = function (eve) {
                var e = eve || window.event;
                e.stopPropagation();
                if (_this11.onoff) {
                    _this11.oul.style.display = "block";
                    _this11.onoff = false;
                } else {
                    _this11.oul.style.display = "none";
                    _this11.onoff = true;
                }
                for (var i = 0; i < _this11.ali.length; i++) {
                    _this11.ali[i].className = "";
                }
                _this11.ali[_this11.next].className = "active";
            };
        }
    }, {
        key: "show",
        value: function show() {
            var _this12 = this;

            var _loop4 = function _loop4(_i2) {
                _this12.ali[_i2].onmouseover = function () {
                    for (var j = 0; j < _this12.ali.length; j++) {
                        _this12.ali[j].className = "";
                    }
                    _this12.ali[_i2].className = "active";
                };
                _this12.ali[_i2].onclick = function () {
                    _this12.ospan.value = _this12.ali[_i2].innerHTML;
                    _this12.next = _i2;
                };
            };

            // 使用let形成闭包，可以在事件执行函数内部获取i,不用创建内联属性indexI来保存i了
            for (var _i2 = 0; _i2 < this.ali.length; _i2++) {
                _loop4(_i2);
            }
        }
    }, {
        key: "keyevent",
        value: function keyevent() {
            var _this13 = this;

            document.onkeydown = function (eve) {
                if (_this13.oul.style.display != "block") return;
                var e = eve || window.event;
                var keycode = e.keyCode || window.which;
                if (keycode == 38) {
                    // 下
                    if (_this13.now == 0) {
                        _this13.now = 0;
                    } else {
                        _this13.now--;
                    }
                    _this13.ospan.value = _this13.ali[_this13.now].innerHTML;
                    _this13.getActive();
                    _this13.next = _this13.now;
                }
                if (keycode == 40) {
                    // 上
                    if (_this13.now == _this13.ali.length - 1) {
                        _this13.now = _this13.ali.length - 1;
                    } else {
                        _this13.now++;
                    }
                    _this13.ospan.value = _this13.ali[_this13.now].innerHTML;
                    _this13.getActive();
                    _this13.next = _this13.now;
                }
                if (keycode == 13) {
                    _this13.oul.style.display = "none";
                    _this13.onoff = true;
                }
            };
        }
    }, {
        key: "devent",
        value: function devent() {
            var _this14 = this;

            document.onclick = function () {
                _this14.oul.style.display = "none";
                _this14.onoff = true;
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