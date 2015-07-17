/**
 *
 * @author 
 *
 */
class Success extends egret.Sprite{
	private goodtlt:string[] = ["塞外高手","神精病博士","神经大神","你是我的小苹果","院长派来的救兵","精神病院长","扫地僧","传说中的高手","风骚的少年","白天睡觉喵","隔壁王伯伯"];
    private normaltlt:string[] = ["神经大条","我是处女座的","停不下来","你是我的小苹果","喵了个咪的","M78星人","凤姐夫","笑而不语"];
	private tx: egret.TextField ;
	private ranktlt: egret.TextField ;
	private rank: egret.TextField ;
	private honorname: egret.TextField ;
	public constructor() {
		super();
		
		var succed: egret.Bitmap = new egret.Bitmap(RES.getRes("victory_bg"));
        succed.x = (egret.MainContext.instance.stage.stageWidth-succed.width)/2;
        succed.y = (egret.MainContext.instance.stage.stageHeight-succed.height)/2;
        this.addChild(succed);
		
		this.tx= new egret.TextField;
        this.tx.text = "你用13步抓住了神经猫！";
        this.tx.size = 22;
		this.tx.textColor=0xff0000;
        this.tx.x =(egret.MainContext.instance.stage.stageWidth-this.tx.width)/2;
        this.tx.y =egret.MainContext.instance.stage.stageHeight/2-30; 
		
		this.ranktlt= new egret.TextField;
        this.ranktlt.text = "神经全国排名2333名！";
        this.ranktlt.size = 22;
		this.ranktlt.textColor=0x888888;
        this.ranktlt.x =(egret.MainContext.instance.stage.stageWidth-this.ranktlt.width)/2;
        this.ranktlt.y =egret.MainContext.instance.stage.stageHeight/2; 
	
		this.rank= new egret.TextField;
        this.rank.text = "击败了全国23%的用户！";
        this.rank.size = 22;
		this.rank.textColor=0xff0000;
        this.rank.x =(egret.MainContext.instance.stage.stageWidth-this.rank.width)/2-40;
        this.rank.y =egret.MainContext.instance.stage.stageHeight/2+30;
		
		this.honorname= new egret.TextField;
        this.honorname.text = "获得称号：喵了个咪！";
        this.honorname.size = 22;
		this.honorname.textColor=0x888888;
        this.honorname.x =(egret.MainContext.instance.stage.stageWidth-this.honorname.width)/2;
        this.honorname.y =egret.MainContext.instance.stage.stageHeight/2+60;
		
		// this.addChild(this.tx);
		// this.addChild(this.ranktlt);
		// this.addChild(this.rank);
		// this.addChild(this.name);
}
	
	public score(sc:number){
		this.tx.text="你用"+sc+"步抓住了神经猫！";
		this.ranktlt.text="神经全国排名"+ Math.floor(Math.random()* sc*500) +"位";
		this.rank.text= "击败了精神病院"+(100-Math.floor(sc*Math.random()))+"%的精神病患者";
		var str:string;
		if(sc<10){
			str=this.goodtlt[sc];
		}
		else{
			str=this.normaltlt[Math.floor(Math.random()*this.normaltlt.length)];
		}
		this.honorname.text="获得称号："+str;
		
		this.addChild(this.tx);
		this.addChild(this.ranktlt);
		this.addChild(this.rank);
		this.addChild(this.honorname);
	}
}
