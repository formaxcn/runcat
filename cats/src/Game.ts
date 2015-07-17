/**
 *
 * @author 
 *
 */
class Game extends egret.DisplayObjectContainer {
	private mapsize: number = 9;
    private mapcent: number = Math.floor(this.mapsize / 2);
    private map: any[] = [];
    private flags: any[] = [];
    private stcat: Cat;
    private catstrX = this.mapcent;
    private catstrY = this.mapcent;
    private gameDiff = 6;
    private stps = 0;
	
    public constructor() {
        super();
		var btnStart:egret.Bitmap = new egret.Bitmap(RES.getRes("btnStart"));
        btnStart.x = (egret.MainContext.instance.stage.stageWidth - btnStart.width) / 2;
        btnStart.y = (egret.MainContext.instance.stage.stageHeight - btnStart.height)/2;
        this.addChild(btnStart);
        btnStart.name = "btS";
		btnStart.touchEnabled = true;
		btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAddToStage,this);
    }

	private onAddToStage(evt:egret.TouchEvent){
		//this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        //var btnStart: egret.Bitmap = evt.currentTarget;
        //this.removeChild(btnStart);
		this.removeChild(this.getChildByName("btS"));
		this.startbg();
    }
	
    private startbg(): void {
		//
		this.map= [];
		this.flags= [];
		
		this.catstrX = this.mapcent;
		this.catstrY = this.mapcent;
		this.stps = 0;
        this.addpots();
        //this.stcat.change(200,420,false);
		//this.stcat.changeStu(false);
		this.stcat= new Cat();
		this.stcat.moveCat(200,420);
		
        this.addChild(this.stcat);
        // var btnStart: egret.Bitmap = new egret.Bitmap(RES.getRes("btnStart"));
        // btnStart.x = (egret.MainContext.instance.stage.stageWidth - btnStart.width) / 2;
        // btnStart.y = (egret.MainContext.instance.stage.stageHeight - btnStart.height)/2;
        // this.addChild(btnStart);
        // btnStart.touchEnabled = true;
        // btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

	
    private addpots(): void {
        for(var i: number = 0;i < this.mapsize;i++) {
            this.map[i] = [];
            this.flags[i] = [];
            for(var j: number = 0;j < this.mapsize;j++) {//red pot
                if(Math.floor(Math.random() * this.gameDiff + 1) == 1 && !(this.mapcent == i && this.mapcent == j)) {
                    this.flags[i][j] = -1;
                    this.map[i][j] = new egret.Bitmap(RES.getRes("pot2"));
                }
                else {//grey pot
                    this.flags[i][j] = 0;
                    this.map[i][j] = new egret.Bitmap(RES.getRes("pot1"));
                    this.map[i][j].touchEnabled = true;
                    this.map[i][j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchPotHanbler,this);
                }
                this.map[i][j].x = j * 48 + (i % 2) * 24 + 12;
                this.map[i][j].y = i * 45 + 300;
                this.addChild(this.map[i][j]);
            }
        }
    }

    private touchPotHanbler(evt: egret.TouchEvent): void {
        var localpot: egret.Bitmap = evt.currentTarget;
        var newpot: egret.Bitmap = new egret.Bitmap(RES.getRes("pot2"));
        newpot.x = localpot.x;
        newpot.y = localpot.y;
        var temj = Math.floor((newpot.x - 12) / 48);
        var temi = Math.floor((newpot.y - 300) / 45);
        this.flags[temi][temj] = -1;
        this.stps = this.stps + 1;
        this.removeChild(localpot);
        this.addChild(newpot);
		
		this.swapChildren(newpot,this.stcat);
        //this.removeChild(this.stcat);

        var path: any = this.findPathW(this.catstrX,this.catstrY);
        if(path[1][0] == -1) {
            console.log("猫咪围住");
            var temnt: any = this.findNext(this.catstrX,this.catstrY,this.flags);
            if(temnt[0] == -1) {
                var gmov: GameOver = new GameOver(true,this.stps);
				gmov.name="gmov";
                this.addChild(gmov);
				gmov.addEventListener("replayEvent" , this.doRestart , this);
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
				this.stcat.moveCat(tx,ty);
            }
        }
        else if(path[1][0] == -2) {
            console.log("到达边界");
            var gmov: GameOver = new GameOver(false,this.stps);
			gmov.name="gmov";
            this.addChild(gmov);
			gmov.addEventListener("replayEvent" , this.doRestart , this);
        }
        else {
            console.log(path[1]);
            this.catstrX = path[1][0];
            this.catstrY = path[1][1];
            var tx = this.catstrY * 48 + (this.catstrX % 2) * 24;
            var ty = this.catstrX * 45 + 238;
			
			this.stcat.changeStu(false);
			this.stcat.moveCat(tx,ty);
            // this.stcat = new Cat();
            // this.stcat.change(tx,ty,false);
            // this.addChild(this.stcat);
        }

    }
	
	private doRestart(event:egret.Event){
		this.removeChild(this.getChildByName("gmov"));
		this.removeChild(this.stcat);
		this.removeChildren();
        this.startbg();
    }

    public findNext(row: number,coln: number,temf: any): any {
        var rtnum: number[] = [];
        if(this.isExit(row,coln)) {
            rtnum[0] = -2;
            rtnum[1] = -2;
            return rtnum;
        }
        if(temf[row][coln - 1] == 0) {
            rtnum[0] = row;
            rtnum[1] = coln - 1;
            return rtnum;
        }
		 if(row % 2 == 0) {
            if(temf[row - 1][coln - 1] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln - 1;
            }
            else if(temf[row - 1][coln] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln;
            }
            else if(temf[row][coln + 1] == 0) {
                rtnum[0] = row;
                rtnum[1] = coln + 1;
            }
            else if(temf[row + 1][coln] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln;
            }
            else if(temf[row + 1][coln - 1] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln - 1;
            }
            else {
                rtnum[0] = -1;
                rtnum[1] = -1;
            }
        }
        else {
            if(temf[row - 1][coln] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln;
            }
            else if(temf[row - 1][coln + 1] == 0) {
                rtnum[0] = row - 1;
                rtnum[1] = coln + 1;
            }
            else if(temf[row][coln + 1] == 0) {
                rtnum[0] = row;
                rtnum[1] = coln + 1;
            }
            else if(temf[row + 1][coln + 1] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln + 1;
            }
            else if(temf[row + 1][coln] == 0) {
                rtnum[0] = row + 1;
                rtnum[1] = coln;
            }
            else {
                rtnum[0] = -1;
                rtnum[1] = -1;
            }
        }
		return rtnum;
    }

	public findNodeRound(row:number,coln:number,temf:any):any{
		var rtnodes: Array<any> = [];
		var rtnum: number[] = [];
		rtnum[0]=row;
		rtnum[1]=coln;
        if(this.isExit(row,coln)) {
            rtnum[0] = -2;
            rtnum[1] = -2;
            rtnodes.push(rtnum);
			return rtnodes;
        }
		if(this.isInside(row,coln-1)&&temf[row][coln - 1] == 0) {
			var rtnum: number[] = [];
            rtnum[0] = row;
            rtnum[1] = coln - 1;
			rtnodes.push(rtnum);
        }
		if(this.isInside(row-1,coln)&&temf[row - 1][coln] == 0) {
			var rtnum: number[] = [];
			rtnum[0] = row - 1;
			rtnum[1] = coln;
			rtnodes.push(rtnum);
		}
		if(this.isInside(row,coln+1)&&temf[row][coln + 1] == 0) {
			var rtnum: number[] = [];
            rtnum[0] = row;
            rtnum[1] = coln + 1;
			rtnodes.push(rtnum);
        }
		if(this.isInside(row+1,coln)&&temf[row + 1][coln] == 0) {
			var rtnum: number[] = [];
            rtnum[0] = row + 1;
            rtnum[1] = coln;
			rtnodes.push(rtnum);
        }
		if(row % 2 == 0) {
            if(this.isInside(row-1,coln-1)&&temf[row - 1][coln - 1] == 0) {
				var rtnum: number[] = [];
                rtnum[0] = row - 1;
                rtnum[1] = coln - 1;
				rtnodes.push(rtnum);
            }
            if(this.isInside(row+1,coln-1)&&temf[row + 1][coln - 1] == 0) {
				var rtnum: number[] = [];
                rtnum[0] = row + 1;
                rtnum[1] = coln - 1;
				rtnodes.push(rtnum);
            }
        }
        else {
            if(this.isInside(row-1,coln+1)&&temf[row - 1][coln + 1] == 0) {
				var rtnum: number[] = [];
                rtnum[0] = row - 1;
                rtnum[1] = coln + 1;
				rtnodes.push(rtnum);
            }
            if(this.isInside(row+1,coln+1)&&temf[row + 1][coln + 1] == 0) {
				var rtnum: number[] = [];
                rtnum[0] = row + 1;
                rtnum[1] = coln + 1;
				rtnodes.push(rtnum);
            }
        }
        if(rtnodes.length==0) {
			rtnum[0] = -1;
			rtnum[1] = -1;
			rtnodes.push(rtnum);
        }
		return rtnodes;
	}
	
	public findBack(prow:number,pcoln:number,steps:number,temf:any):any{
		var bcnodes: Array<any> = [];
		var fsnum: number[] = [];
		fsnum[0]=prow;
		fsnum[1]=pcoln;
		bcnodes.push(fsnum);
		var row:number=prow;
		var coln:number=pcoln;
		while(steps>1){
			steps--;
			if(this.isInside(row,coln-1)&&temf[row][coln - 1] == steps) {
				var rtnum: number[] = [];
				rtnum[0] = row;
				rtnum[1] = coln - 1;
				coln--;
				bcnodes.push(rtnum);
			}
			else if(this.isInside(row-1,coln)&&temf[row - 1][coln] == steps) {
				var rtnum: number[] = [];
				rtnum[0] = row - 1;
				row--;
				rtnum[1] = coln;
				bcnodes.push(rtnum);
			}
			else if(this.isInside(row,coln+1)&&temf[row][coln + 1] == steps) {
				var rtnum: number[] = [];
				rtnum[0] = row;
				rtnum[1] = coln + 1;
				coln++
				bcnodes.push(rtnum);
			}
			else if(this.isInside(row+1,coln)&&temf[row + 1][coln] == steps) {
				var rtnum: number[] = [];
				rtnum[0] = row + 1;
				row++;
				rtnum[1] = coln;
				bcnodes.push(rtnum);
			}
			else if(row % 2 == 0) {
				if(this.isInside(row-1,coln-1)&&temf[row - 1][coln - 1] == steps) {
					var rtnum: number[] = [];
					rtnum[0] = row - 1;
					row--;
					rtnum[1] = coln - 1;
					coln--;
					bcnodes.push(rtnum);
				}	
				else if(this.isInside(row+1,coln-1)&&temf[row + 1][coln - 1] == steps) {
					var rtnum: number[] = [];
					rtnum[0] = row + 1;
					row++;
					rtnum[1] = coln - 1;
					coln--;
					bcnodes.push(rtnum);
				}
			}
			else {
				if(this.isInside(row-1,coln+1)&&temf[row - 1][coln + 1] == steps) {
					var rtnum: number[] = [];
					rtnum[0] = row - 1;
					row--;
					rtnum[1] = coln + 1;
					coln++;
					bcnodes.push(rtnum);
				}
				else if(this.isInside(row+1,coln+1)&&temf[row + 1][coln + 1] == steps) {
					var rtnum: number[] = [];
					rtnum[0] = row + 1;
					row++;
					rtnum[1] = coln + 1;
					coln++;
					bcnodes.push(rtnum);
				}
			}
			
		}
		return bcnodes;
	}
	public findPathW(row:number,coln:number):any{
		var temFlags: any[] = [];
		var nev: Array<any> = [];
		var ncNodes: Array<any> = [];
		var tcNodes: Array<any> = [];
		var nowNode: number[] = [];
		var next: number[] = [];
		var step:number=1;
        nowNode[0] = row;
        nowNode[1] = coln;
        for(var i: number = 0;i < this.mapsize;i++) {
            temFlags[i] = [];
            for(var j: number = 0;j < this.mapsize;j++) {
                temFlags[i][j] = this.flags[i][j];
            }
        }
		
		if(this.isExit(nowNode[0],nowNode[1])){
			next[0]=-2;
			next[1]=-2;
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
		temFlags[nowNode[0]][nowNode[1]]=step;
		step++;
		
		while(true){
			console.log("now"+nowNode);
			var tem=this.findNodeRound(nowNode[0],nowNode[1],temFlags);
			console.log("tem"+tem);
			
			if(tem[0][0]==-1){
				if(ncNodes.length>0){
					nowNode=ncNodes.pop();
					console.log("pop from ncnode"+nowNode);
					continue;
				}
				else if(tcNodes.length==0){
					nev.push(tem[0]);
					nev.push(tem[0]);
					return nev;
				}
			}
			else if(tem[0][0]==-2){
				var bnev=this.findBack(nowNode[0],nowNode[1],step-1,temFlags);
				while(bnev.length!=0){
					nev.push(bnev.pop());
				}
				return nev;
			}
			else{		
				while(tem.length>0){
					next=tem.pop();
					temFlags[next[0]][next[1]]=step;
					console.log("push into tcNodes"+next);
					tcNodes.push(next);
				}
			}
			
			if(tcNodes.length==0){
				//被围住
				next[0]=-1;
				next[1]=-1;
				nev.push(next);
				nev.push(next);
				return nev;
			}
			else if(ncNodes.length==0){
				var temt: Array<any>=[];
				var cnt:number=tcNodes.length;
				for(var i:number=0;i<cnt;i++){
					temt.push(tcNodes.pop());
				}
				tcNodes=[];
				ncNodes=temt;
				console.log("tc to nc"+step);
				step++;
			}
			nowNode=ncNodes.pop();
			// for(var i:number=0;i<9;i++){
				// console.log(temFlags[i][0]+temFlags[i][1]+temFlags[i][2]+temFlags[i][3]+temFlags[i][4]+temFlags[i][5]+temFlags[i][6]+temFlags[i][7]+temFlags[i][8]);
			// }
			
		}
	}

    public isExit(row: number,coln: number): boolean {
        if(row == 0 || row == this.mapsize - 1 || coln == 0 || coln == this.mapsize - 1)
            return true;
        else
            return false;
    }
	
	public isInside(row:number,coln:number):boolean{
		if(row>=0&&row< this.mapsize&&coln>=0&&coln < this.mapsize)
            return true;
        else
            return false;
	}
}     
