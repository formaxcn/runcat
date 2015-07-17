/**
 *
 * @author 
 *
 */
class Fail extends egret.Sprite{
	public constructor() {
		super();
	
		var gamefail: egret.Bitmap = new egret.Bitmap(RES.getRes("failed_bg"));
        gamefail.x = (egret.MainContext.instance.stage.stageWidth-gamefail.width)/2;
        gamefail.y = (egret.MainContext.instance.stage.stageHeight-gamefail.height)/2;
        this.addChild(gamefail);
		
		var tx: egret.TextField = new egret.TextField;
        tx.text = "你没有抓住神！经！猫！";
        tx.size = 24;
		tx.textColor=0xff0000;
        tx.x =(egret.MainContext.instance.stage.stageWidth-tx.width)/2-20;
        tx.y =egret.MainContext.instance.stage.stageHeight/2-20; 
		this.addChild(tx);
		
		var txa: egret.TextField = new egret.TextField;
        txa.text = "精神病院长又发病了";
        txa.size = 24;
		txa.textColor=0x888888;
        txa.x =(egret.MainContext.instance.stage.stageWidth-txa.width)/2;
        txa.y =egret.MainContext.instance.stage.stageHeight/2+20; 
		this.addChild(txa);
		
		
	}
}
