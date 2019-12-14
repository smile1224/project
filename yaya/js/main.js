"use strict";

require.config({
    baseUrl: "module"

});

require(["search", "goods_list"], function (t1, t2) {

    var myt1 = new t1();
    setTimeout(function () {
        var myt2 = new t2({
            res: myt1.goods
        });
    }, 1000);
    console.log(myt1);
    console.log(myt1.__proto__.addevent());
});