"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = function () {
    function Login() {
        _classCallCheck(this, Login);

        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.reg = document.querySelector(".reg a");
        this.log = document.getElementById("logbtn");
        this.tishi = document.querySelector(".tishi");
        this.check = document.getElementById("issave");
        this.addEvent();
        this.display();
    }

    _createClass(Login, [{
        key: "addEvent",
        value: function addEvent() {
            var that = this;
            this.log.onclick = function () {
                that.u = that.user.value;
                that.p = that.pass.value;
                that.TestInfo();
            };
            this.reg.onclick = function () {
                location.href = "register.html";
            };
        }
    }, {
        key: "isRember",
        value: function isRember() {
            if (this.check.checked) {
                var obj = {
                    user: this.u,
                    pass: this.p
                };
                setCookie("userMsg", JSON.stringify(obj), {
                    expires: 7
                });
            } else {
                setCookie("userMsg", JSON.stringify(obj), {
                    expires: -1
                });
            }
        }
    }, {
        key: "TestInfo",
        value: function TestInfo() {
            var stay = 0;
            this.info = getCookie("UserInfo") ? JSON.parse(getCookie("UserInfo")) : [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.info[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    if (i.user == this.u && i.pass == this.p) {
                        location.href = "index.html";
                        i.status = true;
                        setCookie("UserInfo", JSON.stringify(this.info));
                        stay = 1;
                        this.isRember();
                    } else if (i.user == this.u && i.pass != this.p) {
                        this.tishi.style.display = "block";
                        this.tishi.innerHTML = "密码错误！";
                        stay = 2;
                    }
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

            if (stay == 0) {
                this.tishi.style.display = "block";
                this.tishi.innerHTML = "用户不存在,请先<a href='register.html' style='color:#fff;padding:0 3px;font-weight:700;background:#f70;margin:0 3px;'>注册</a>";
            }
        }
    }, {
        key: "display",
        value: function display() {
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : { user: "", pass: "" };

            this.user.value = this.msg.user;
            this.pass.value = this.msg.pass;
        }
    }]);

    return Login;
}();

new Login();