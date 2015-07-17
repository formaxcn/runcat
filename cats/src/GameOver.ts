/**
 *
 * @author 
 *
 */
class GameOver extends egret.Sprite{
	private statu:boolean=false;
	private scr:number=13;
	public constructor(stu:boolean,sc:number) {
		super();
		this.statu=stu;
		this.scr=sc;
		this.show();
	}
	
	public show():void{
	
		if(this.statu)
		{
		//victory test
		var scs:Success=new Success();
		scs.score(this.scr);
		this.addChild(scs);
		}
		else
		{
		//fail test
		var fil:Fail=new Fail();
		this.addChild(fil);
		}
		
		var shareBt:egret.Bitmap=new egret.Bitmap(RES.getRes("share_btn"));
		var replayBt:egret.Bitmap=new egret.Bitmap(RES.getRes("replay_btn"));
		var moreBt:egret.Bitmap=new egret.Bitmap(RES.getRes("more_btn"));
        
		shareBt.x = (egret.MainContext.instance.stage.stageWidth-shareBt.width)/2-100;
        shareBt.y = egret.MainContext.instance.stage.stageHeight-200;

        replayBt.x = (egret.MainContext.instance.stage.stageWidth-replayBt.width)/2+100;
        replayBt.y = egret.MainContext.instance.stage.stageHeight-200;
		
		moreBt.x = (egret.MainContext.instance.stage.stageWidth-moreBt.width)/2;
		moreBt.y = egret.MainContext.instance.stage.stageHeight-moreBt.height;
		
		this.addChild(shareBt);
		this.addChild(replayBt);
		replayBt.touchEnabled=true;
		replayBt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rptouchHandler,this);
		this.addChild(moreBt);
	}
	
	 private rptouchHandler(evt: egret.TouchEvent): void{
		this.dispatchEventWith("replayEvent");
	 }
}
