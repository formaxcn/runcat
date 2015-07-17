/**
 *
 * @author
 *
 */
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(stu, sc) {
        _super.call(this);
        this.statu = false;
        this.scr = 13;
        this.statu = stu;
        this.scr = sc;
        this.show();
    }
    var __egretProto__ = GameOver.prototype;
    __egretProto__.show = function () {
        if (this.statu) {
            //victory test
            var scs = new Success();
            scs.score(this.scr);
            this.addChild(scs);
        }
        else {
            //fail test
            var fil = new Fail();
            this.addChild(fil);
        }
        var shareBt = new egret.Bitmap(RES.getRes("share_btn"));
        var replayBt = new egret.Bitmap(RES.getRes("replay_btn"));
        var moreBt = new egret.Bitmap(RES.getRes("more_btn"));
        shareBt.x = (egret.MainContext.instance.stage.stageWidth - shareBt.width) / 2 - 100;
        shareBt.y = egret.MainContext.instance.stage.stageHeight - 200;
        replayBt.x = (egret.MainContext.instance.stage.stageWidth - replayBt.width) / 2 + 100;
        replayBt.y = egret.MainContext.instance.stage.stageHeight - 200;
        moreBt.x = (egret.MainContext.instance.stage.stageWidth - moreBt.width) / 2;
        moreBt.y = egret.MainContext.instance.stage.stageHeight - moreBt.height;
        this.addChild(shareBt);
        this.addChild(replayBt);
        replayBt.touchEnabled = true;
        replayBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rptouchHandler, this);
        this.addChild(moreBt);
    };
    __egretProto__.rptouchHandler = function (evt) {
        this.dispatchEventWith("replayEvent");
    };
    return GameOver;
})(egret.Sprite);
GameOver.prototype.__class__ = "GameOver";
