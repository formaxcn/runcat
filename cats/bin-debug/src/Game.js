/**
 *
 * @author
 *
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.mapsize = 9;
        this.mapcent = Math.floor(this.mapsize / 2);
        this.map = [];
        this.flags = [];
        this.catstrX = this.mapcent;
        this.catstrY = this.mapcent;
        this.gameDiff = 6;
        this.stps = 0;
        var btnStart = new egret.Bitmap(RES.getRes("btnStart"));
        btnStart.x = (egret.MainContext.instance.stage.stageWidth - btnStart.width) / 2;
        btnStart.y = (egret.MainContext.instance.stage.stageHeight - btnStart.height) / 2;
        this.addChild(btnStart);
        btnStart.name = "btS";
        btnStart.touchEnabled = true;
        btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddToStage, this);
    }
    var __egretProto__ = Game.prototype;
    __egretProto__.onAddToStage = function (evt) {
        //this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        //var btnStart: egret.Bitmap = evt.currentTarget;
        //this.removeChild(btnStart);
        this.removeChild(this.getChildByName("btS"));
        this.startbg();
    };
    __egretProto__.startbg = function () {
        //
        this.map = [];
        this.flags = [];
        this.catstrX = this.mapcent;
        this.catstrY = this.mapcent;
        this.stps = 0;
        this.addpots();
        //this.stcat.change(200,420,false);
        //this.stcat.changeStu(false);
        this.stcat = new Cat();
        this.stcat.moveCat(200, 420);
        this.addChild(this.stcat);
        // var btnStart: egret.Bitmap = new egret.Bitmap(RES.getRes("btnStart"));
        // btnStart.x = (egret.MainContext.instance.stage.stageWidth - btnStart.width) / 2;
        // btnStart.y = (egret.MainContext.instance.stage.stageHeight - btnStart.height)/2;
        // this.addChild(btnStart);
        // btnStart.touchEnabled = true;
        // btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    };
    __egretProto__.addpots = function () {
        for (var i = 0; i < this.mapsize; i++) {
            this.map[i] = [];
            this.flags[i] = [];
            for (var j = 0; j < this.mapsize; j++) {
                if (Math.floor(Math.random() * this.gameDiff + 1) == 1 && !(this.mapcent == i && this.mapcent == j)) {
                    this.flags[i][j] = -1;
                    this.map[i][j] = new egret.Bitmap(RES.getRes("pot2"));
                }
                else {
                    this.flags[i][j] = 0;
                    this.map[i][j] = new egret.Bitmap(RES.getRes("pot1"));
                    this.map[i][j].touchEnabled = true;
                    this.map[i][j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchPotHanbler, this);
                }
                this.map[i][j].x = j * 48 + (i % 2) * 24 + 12;
                this.map[i][j].y = i * 45 + 300;
                this.addChild(this.map[i][j]);
            }
        }
    };
    __egretProto__.touchPotHanbler = function (evt) {
        var localpot = evt.currentTarget;
        var newpot = new egret.Bitmap(RES.getRes("pot2"));
        newpot.x = localpot.x;
        newpot.y = localpot.y;
        var temj = Math.floor((newpot.x - 12) / 48);
        var temi = Math.floor((newpot.y - 300) / 45);
        this.flags[temi][temj] = -1;
        this.stps = this.stps + 1;
        this.removeChild(localpot);
        this.addChild(newpot);
        this.swapChildren(newpot, this.stcat);
        //this.removeChild(this.stcat);
        var path = this.findPathW(this.catstrX, this.catstrY);
        if (path[1][0] == -1) {
            console.log("猫咪围住");
            var temnt = this.findNext(this.catstrX, this.catstrY, this.flags);
            if (temnt[0] == -1) {
                var gmov = new GameOver(true, this.stps);
                gmov.name = "gmov";
                this.addChild(gmov);
                gmov.addEventListener("replayEvent", this.doRestart, this);
            }
            else {
                console.log(path[1]);
                this.catstrX = temnt[0];
                this.catstrY = temnt[1];
                var tx = this.catstrY * 48 + (this.catstrX % 2) * 24;
                var ty = this.catstrX * 45 + 238;
                // this.stcat = new Cat();
                // this.stcat.change(tx,ty,true);
                // this.addChild(this.stcat);
                this.stcat.changeStu(true);
                this.stcat.moveCat(tx, ty);
            }
        }
        else if (path[1][0] == -2) {
            console.log("到达边界");
            var gmov = new GameOver(false, this.stps);
            gmov.name = "gmov";
            this.addChild(gmov);
            gmov.addEventListener("replayEvent", this.doRestart, this);
        }
        else {
            console.log(path[1]);
            this.catstrX = path[1][0];
            this.catstrY = path[1][1];
            var tx = this.catstrY * 48 + (this.catstrX % 2) * 24;
            var ty = this.catstrX * 45 + 238;
            this.stcat.changeStu(false);
            this.stcat.moveCat(tx, ty);
        }
    };
    __egretProto__.doRestart = function (event) {
        this.removeChild(this.getChildByName("gmov"));
        this.removeChild(this.stcat);
        this.removeChildren();
        this.startbg();
    };
    __egretProto__.findNext = function (row, coln, temf) {
        var rtnum = [];
        if (this.isExit(row, coln)) {
            rtnum[0] = -2;
            rtnum[1] = -2;
            return rtnum;
        }
        if (temf[row][coln - 1] == 0) {
            rtnum[0] = row;
            rtnum[1] = coln - 1;
            return rtnum;
        }
        if (row % 2 == 0) {
            if (temf[row - 1][coln - 1] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln - 1;
            }
            else if (temf[row - 1][coln] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln;
            }
            else if (temf[row][coln + 1] == 0) {
                rtnum[0] = row;
                rtnum[1] = coln + 1;
            }
            else if (temf[row + 1][coln] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln;
            }
            else if (temf[row + 1][coln - 1] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln - 1;
            }
            else {
                rtnum[0] = -1;
                rtnum[1] = -1;
            }
        }
        else {
            if (temf[row - 1][coln] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln;
            }
            else if (temf[row - 1][coln + 1] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln + 1;
            }
            else if (temf[row][coln + 1] == 0) {
                rtnum[0] = row;
                rtnum[1] = coln + 1;
            }
            else if (temf[row + 1][coln + 1] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln + 1;
            }
            else if (temf[row + 1][coln] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln;
            }
            else {
                rtnum[0] = -1;
                rtnum[1] = -1;
            }
        }
        return rtnum;
    };
    __egretProto__.findNodeRound = function (row, coln, temf) {
        var rtnodes = [];
        var rtnum = [];
        rtnum[0] = row;
        rtnum[1] = coln;
        if (this.isExit(row, coln)) {
            rtnum[0] = -2;
            rtnum[1] = -2;
            rtnodes.push(rtnum);
            return rtnodes;
        }
        if (this.isInside(row, coln - 1) && temf[row][coln - 1] == 0) {
            var rtnum = [];
            rtnum[0] = row;
            rtnum[1] = coln - 1;
            rtnodes.push(rtnum);
        }
        if (this.isInside(row - 1, coln) && temf[row - 1][coln] == 0) {
            var rtnum = [];
            rtnum[0] = row - 1;
            rtnum[1] = coln;
            rtnodes.push(rtnum);
        }
        if (this.isInside(row, coln + 1) && temf[row][coln + 1] == 0) {
            var rtnum = [];
            rtnum[0] = row;
            rtnum[1] = coln + 1;
            rtnodes.push(rtnum);
        }
        if (this.isInside(row + 1, coln) && temf[row + 1][coln] == 0) {
            var rtnum = [];
            rtnum[0] = row + 1;
            rtnum[1] = coln;
            rtnodes.push(rtnum);
        }
        if (row % 2 == 0) {
            if (this.isInside(row - 1, coln - 1) && temf[row - 1][coln - 1] == 0) {
                var rtnum = [];
                rtnum[0] = row - 1;
                rtnum[1] = coln - 1;
                rtnodes.push(rtnum);
            }
            if (this.isInside(row + 1, coln - 1) && temf[row + 1][coln - 1] == 0) {
                var rtnum = [];
                rtnum[0] = row + 1;
                rtnum[1] = coln - 1;
                rtnodes.push(rtnum);
            }
        }
        else {
            if (this.isInside(row - 1, coln + 1) && temf[row - 1][coln + 1] == 0) {
                var rtnum = [];
                rtnum[0] = row - 1;
                rtnum[1] = coln + 1;
                rtnodes.push(rtnum);
            }
            if (this.isInside(row + 1, coln + 1) && temf[row + 1][coln + 1] == 0) {
                var rtnum = [];
                rtnum[0] = row + 1;
                rtnum[1] = coln + 1;
                rtnodes.push(rtnum);
            }
        }
        if (rtnodes.length == 0) {
            rtnum[0] = -1;
            rtnum[1] = -1;
            rtnodes.push(rtnum);
        }
        return rtnodes;
    };
    __egretProto__.findBack = function (prow, pcoln, steps, temf) {
        var bcnodes = [];
        var fsnum = [];
        fsnum[0] = prow;
        fsnum[1] = pcoln;
        bcnodes.push(fsnum);
        var row = prow;
        var coln = pcoln;
        while (steps > 1) {
            steps--;
            if (this.isInside(row, coln - 1) && temf[row][coln - 1] == steps) {
                var rtnum = [];
                rtnum[0] = row;
                rtnum[1] = coln - 1;
                coln--;
                bcnodes.push(rtnum);
            }
            else if (this.isInside(row - 1, coln) && temf[row - 1][coln] == steps) {
                var rtnum = [];
                rtnum[0] = row - 1;
                row--;
                rtnum[1] = coln;
                bcnodes.push(rtnum);
            }
            else if (this.isInside(row, coln + 1) && temf[row][coln + 1] == steps) {
                var rtnum = [];
                rtnum[0] = row;
                rtnum[1] = coln + 1;
                coln++;
                bcnodes.push(rtnum);
            }
            else if (this.isInside(row + 1, coln) && temf[row + 1][coln] == steps) {
                var rtnum = [];
                rtnum[0] = row + 1;
                row++;
                rtnum[1] = coln;
                bcnodes.push(rtnum);
            }
            else if (row % 2 == 0) {
                if (this.isInside(row - 1, coln - 1) && temf[row - 1][coln - 1] == steps) {
                    var rtnum = [];
                    rtnum[0] = row - 1;
                    row--;
                    rtnum[1] = coln - 1;
                    coln--;
                    bcnodes.push(rtnum);
                }
                else if (this.isInside(row + 1, coln - 1) && temf[row + 1][coln - 1] == steps) {
                    var rtnum = [];
                    rtnum[0] = row + 1;
                    row++;
                    rtnum[1] = coln - 1;
                    coln--;
                    bcnodes.push(rtnum);
                }
            }
            else {
                if (this.isInside(row - 1, coln + 1) && temf[row - 1][coln + 1] == steps) {
                    var rtnum = [];
                    rtnum[0] = row - 1;
                    row--;
                    rtnum[1] = coln + 1;
                    coln++;
                    bcnodes.push(rtnum);
                }
                else if (this.isInside(row + 1, coln + 1) && temf[row + 1][coln + 1] == steps) {
                    var rtnum = [];
                    rtnum[0] = row + 1;
                    row++;
                    rtnum[1] = coln + 1;
                    coln++;
                    bcnodes.push(rtnum);
                }
            }
        }
        return bcnodes;
    };
    __egretProto__.findPathW = function (row, coln) {
        var temFlags = [];
        var nev = [];
        var ncNodes = [];
        var tcNodes = [];
        var nowNode = [];
        var next = [];
        var step = 1;
        nowNode[0] = row;
        nowNode[1] = coln;
        for (var i = 0; i < this.mapsize; i++) {
            temFlags[i] = [];
            for (var j = 0; j < this.mapsize; j++) {
                temFlags[i][j] = this.flags[i][j];
            }
        }
        if (this.isExit(nowNode[0], nowNode[1])) {
            next[0] = -2;
            next[1] = -2;
            nev.push(next);
            nev.push(next);
            return nev;
        }
        // next=this.findNext(nowNode[0],nowNode[1],temFlags);
        // if(next[0]==-1){
        // nev.push(next);
        // nev.push(next);
        // return nev;
        // }
        //ncNodes.push(nowNode);
        temFlags[nowNode[0]][nowNode[1]] = step;
        step++;
        while (true) {
            console.log("now" + nowNode);
            var tem = this.findNodeRound(nowNode[0], nowNode[1], temFlags);
            console.log("tem" + tem);
            if (tem[0][0] == -1) {
                if (ncNodes.length > 0) {
                    nowNode = ncNodes.pop();
                    console.log("pop from ncnode" + nowNode);
                    continue;
                }
                else if (tcNodes.length == 0) {
                    nev.push(tem[0]);
                    nev.push(tem[0]);
                    return nev;
                }
            }
            else if (tem[0][0] == -2) {
                var bnev = this.findBack(nowNode[0], nowNode[1], step - 1, temFlags);
                while (bnev.length != 0) {
                    nev.push(bnev.pop());
                }
                return nev;
            }
            else {
                while (tem.length > 0) {
                    next = tem.pop();
                    temFlags[next[0]][next[1]] = step;
                    console.log("push into tcNodes" + next);
                    tcNodes.push(next);
                }
            }
            if (tcNodes.length == 0) {
                //被围住
                next[0] = -1;
                next[1] = -1;
                nev.push(next);
                nev.push(next);
                return nev;
            }
            else if (ncNodes.length == 0) {
                var temt = [];
                var cnt = tcNodes.length;
                for (var i = 0; i < cnt; i++) {
                    temt.push(tcNodes.pop());
                }
                tcNodes = [];
                ncNodes = temt;
                console.log("tc to nc" + step);
                step++;
            }
            nowNode = ncNodes.pop();
        }
    };
    __egretProto__.isExit = function (row, coln) {
        if (row == 0 || row == this.mapsize - 1 || coln == 0 || coln == this.mapsize - 1)
            return true;
        else
            return false;
    };
    __egretProto__.isInside = function (row, coln) {
        if (row >= 0 && row < this.mapsize && coln >= 0 && coln < this.mapsize)
            return true;
        else
            return false;
    };
    return Game;
})(egret.DisplayObjectContainer);
Game.prototype.__class__ = "Game";
