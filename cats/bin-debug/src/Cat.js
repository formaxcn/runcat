/**
 *
 * @author
 *
 */
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        _super.call(this);
        this.statu = false;
        var data = RES.getRes("stay_json");
        var txtr = RES.getRes("stay_png");
        var mcf = new egret.MovieClipDataFactory(data, txtr);
        this.staymc = new egret.MovieClip(mcf.generateMovieClipData("mc1"));
        var data = RES.getRes("weizhu_json");
        var txtr = RES.getRes("weizhu_png");
        var mcf = new egret.MovieClipDataFactory(data, txtr);
        this.weizhumc = new egret.MovieClip(mcf.generateMovieClipData("mc1"));
        this.stay();
    }
    var __egretProto__ = Cat.prototype;
    __egretProto__.change = function (px, py, stu) {
        this.x = px;
        this.y = py;
        this.statu = stu;
        //this.cleancat();
        this.stay();
    };
    __egretProto__.moveCat = function (px, py) {
        this.x = px;
        this.y = py;
        this.stay();
    };
    __egretProto__.changeStu = function (stu) {
        this.statu = stu;
    };
    __egretProto__.stay = function () {
        if (!this.statu) {
            // this.staymc.gotoAndPlay(0,-1);
            // this.staymc.name="cat";
            this.staymc.gotoAndPlay(0, -1);
            this.addChild(this.staymc);
        }
        else {
            // this.weizhumc.gotoAndPlay(0,-1);
            // this.weizhumc.name="cat";
            this.removeChild(this.staymc);
            this.weizhumc.gotoAndPlay(0, -1);
            this.addChild(this.weizhumc);
        }
    };
    return Cat;
})(egret.Sprite);
Cat.prototype.__class__ = "Cat";
