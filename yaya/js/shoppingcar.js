"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingCar = function () {
    function ShoppingCar() {
        _classCallCheck(this, ShoppingCar);

        this.tbody = document.querySelector(".car-item");
        this.aall = document.querySelectorAll(".all");
        this.totalnum = document.querySelector(".car-total .right .totalnum");
        this.totalprice = document.querySelector(".car-total .right .totalprice");
        this.delgood = document.querySelector(".car-total .left .delgood");
        this.url = "http://localhost/Project_yaya/data/goods_detail.json";
        this.getinfo();
    }

    _createClass(ShoppingCar, [{
        key: "getinfo",
        value: function getinfo() {
            // 1. 获取所有的商品数据 
            var that = this;
            ajaxGet(this.url, function (res) {
                that.res = JSON.parse(res);
                var arr = [];
                for (var i in that.res) {
                    arr.push(that.res[i]);
                }
                that.res = arr;
                // 2. 获取cookie中的加入购物车的数量的数据 this.goods
                that.goods = getCookie("AddGoods") ? JSON.parse(getCookie("AddGoods")) : [];
                that.display();
            });
        }
        // 3. 渲染页面

    }, {
        key: "display",
        value: function display() {
            var str = "";
            var price = []; // 单价
            this.goodprice = []; // 小计中的价格
            for (var i = 0; i < this.res.length; i++) {
                for (var j = 0; j < this.goods.length; j++) {
                    if (this.goods[j].id == this.res[i].info.name) {
                        // 计算小计中的价格
                        price[i] = parseFloat(this.res[i].info.price.slice(1, this.res[i].info.price.length));
                        this.goodprice[i] = "￥" + (price[i] * this.goods[j].num).toFixed(2);
                        // console.log(this.goodprice[i])
                        str += "<div class=\"item\"  index=\"" + this.goods[j].id + "\">\n                                <div class=\"car-check l\">\n                                    <input type=\"checkbox\" class=\"one\">\n                                </div>\n                                <div class=\"cart-product-box rel\">\n                                    <div class=\"product l\">\n                                        <a href=\"#\" target=\"_blank\" class=\"itemimg rel l\">\n                                            <img src=\"" + this.res[i].imgs[0] + "\">\n                                        </a> \n                                        <div class=\"product-title\">\n                                            <p class=\"title-line\">\n                                                <a href=\"#\" target=\"_blank\">\n                                                " + this.goods[j].id + "\n                                                </a>\n                                            </p>\n                                        </div>\n                                    </div> \n                                    <div class=\"unit-price l\">\n                                        <b class=\"pri\">" + this.res[i].info.price + "</b>\n                                    </div>\n                                    <div class=\"count l\">\n                                        <input type=\"number\" min=\"1\" class=\"num\" value=\"" + this.goods[j].num + "\">\n                                    </div>\n                                    <div class=\"sum l\">\n                                        <b class=\"red goodprice\">" + this.goodprice[i] + "</b>\n                                    </div> \n                                    <div class=\"action l\">\n                                        <a class=\"delete\" style=\"cursor: pointer;\">\u5220\u9664</a>\n                                    </div>\n                                </div>\n                            </div>\n                        ";
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

    }, {
        key: "serveralSelect",
        value: function serveralSelect() {
            var _this = this;

            var that = this;
            this.aone = document.querySelectorAll(".car-item .one");
            for (var i = 0; i < this.aone.length; i++) {
                this.aone[i].onclick = function () {
                    _this.showTotalNumPrice();
                };
            }

            for (var _i = 0; _i < this.aone.length; _i++) {
                this.aone[_i].onclick = function () {
                    var onoff;
                    var onoff1;
                    onoff = Array.from(_this.aone).every(function (val, ind) {
                        return val.checked == true;
                    });
                    if (onoff) {

                        Array.from(_this.aall).every(function (val, ind) {
                            return val.checked = true;
                        });
                    }
                    onoff1 = Array.from(_this.aone).some(function (val, ind) {
                        return val.checked == false;
                    });
                    if (onoff1) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {

                            for (var _iterator = _this.aall[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var item = _step.value;

                                item.checked = "";
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
                    }
                    _this.showTotalNumPrice();
                    _this.deleteServeral(); // 4-2删除几条数据
                };
            }
        }
        // 5.全选功能

    }, {
        key: "allSelect",
        value: function allSelect() {
            var _this2 = this;

            var that = this;
            this.stay = true;

            var _loop = function _loop(i) {
                _this2.aall[i].onclick = function () {
                    if (_this2.aall[i].checked == true) {
                        // 5.1 全选成功
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = _this2.aall[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var item = _step2.value;

                                item.checked = "checked";
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        for (var j = 0; j < that.aone.length; j++) {
                            _this2.aone[j].checked = "checked";
                        }
                    } else if (_this2.aall[i].checked == false) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = _this2.aall[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var item = _step3.value;

                                item.checked = "";
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        for (var j = 0; j < that.aone.length; j++) {
                            _this2.aone[j].checked = "";
                        }
                    }
                    that.showTotalNumPrice();
                };
            };

            for (var i = 0; i < this.aall.length; i++) {
                _loop(i);
            }
        }
        // 6.实时的改变数量，并保存到cookie中

    }, {
        key: "changeNum",
        value: function changeNum() {
            var _this3 = this;

            this.tbody.addEventListener("input", function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.className == "num") {
                    _this3.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                    // 6-1将改变的数量保存到cookie中
                    _this3.changeCookie(function (i) {
                        _this3.goods[i].num = target.value;
                        // 6-2 将每条数据对应的小计中的价格实时的改变
                        _this3.changePrice(target);
                        _this3.showTotalNumPrice();
                    });
                }
            });
        }
        // 7.删除一条数据,删除按钮绑定事件

    }, {
        key: "deleteOne",
        value: function deleteOne() {
            var _this4 = this;

            this.tbody.addEventListener("click", function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.className == "delete") {
                    _this4.id = target.parentNode.parentNode.parentNode.getAttribute("index");
                    target.parentNode.parentNode.parentNode.remove();
                    // 7-1 将删除的数据从cookie中对应的删除
                    _this4.changeCookie(function (i) {
                        _this4.goods.splice(i, 1);
                    });
                }
                _this4.aone = document.querySelectorAll(".one");
                if (_this4.aone.length == 0) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = _this4.aall[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var item = _step4.value;

                            item.checked = "";
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
                _this4.showTotalNumPrice();
            });
        }

        // 删除选中的商品

    }, {
        key: "deleteServeral",
        value: function deleteServeral() {
            var _this5 = this;

            this.delgood.onclick = function () {
                for (var k = 0; k < _this5.aone.length; k++) {
                    if (_this5.aone[k].checked) {
                        _this5.id = _this5.aone[k].parentNode.parentNode.getAttribute("index");
                        _this5.aone[k].parentElement.parentElement.remove();
                        _this5.changeCookie(function (i) {
                            _this5.goods.splice(i, 1);
                        });
                    }
                }
                _this5.aone = document.querySelectorAll(".one");
                if (_this5.aone.length == 0) {
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = _this5.aall[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var item = _step5.value;

                            item.checked = "";
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }
                }
                _this5.showTotalNumPrice();
            };
        }

        // 改变cookie中的数据

    }, {
        key: "changeCookie",
        value: function changeCookie(cb) {
            for (var i in this.goods) {
                if (this.id == this.goods[i].id) {
                    cb(i);
                    break;
                }
            }
            setCookie("AddGoods", JSON.stringify(this.goods));
        }

        // 改变每条数据中的小计的价格，并显示在页面上

    }, {
        key: "changePrice",
        value: function changePrice(target) {
            var pri = target.parentNode.parentNode.querySelector(".pri");
            var totalpri = target.parentNode.nextElementSibling.children[0];
            var totalprice = parseFloat(pri.innerHTML.slice(1, pri.length)) * target.value;
            totalpri.innerHTML = "￥" + totalprice.toFixed(2);
        }

        // 显示总数量和总价钱

    }, {
        key: "showTotalNumPrice",
        value: function showTotalNumPrice() {
            // this.aone = document.querySelectorAll(".one");
            var n = 0;
            var sum = 0;
            console.log(this.aone);
            for (var j = 0; j < this.aone.length; j++) {
                if (this.aone[j].checked == true) {
                    n++;
                    var price;
                    price = this.aone[j].parentNode.parentNode.querySelector(".goodprice").innerHTML;
                    price = parseFloat(price.slice(1, price.length));
                    sum += price;
                }
            }
            this.totalnum.innerHTML = n;
            this.totalprice.innerHTML = "￥" + sum.toFixed(2);
        }
    }]);

    return ShoppingCar;
}();

new ShoppingCar();

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
            var _this6 = this;

            this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
            this.i = null;
            var onoff = this.info.some(function (val, ind) {
                _this6.i = ind;
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
                location.href = "login.html";
            };
        }
    }]);

    return IndexLogin;
}();

new IndexLogin();