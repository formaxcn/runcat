/**
 *
 * @author 
 *
 */
class Cat extends egret.Sprite{
	private statu:boolean=false;
	private weizhumc : egret.MovieClip;
	private staymc : egret.MovieClip;
	
	public constructor() {
		super();
		var data = RES.getRes("stay_json");
		var txtr = RES.getRes("stay_png");
		var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.staymc=new egret.MovieClip(mcf.generateMovieClipData("mc1"));
		
		
		var data = RES.getRes("weizhu_json");
		var txtr = RES.getRes("weizhu_png");
		var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		this.weizhumc=new egret.MovieClip(mcf.generateMovieClipData("mc1"));
		
		this.stay();
	}
	
	public change(px:number,py:number,stu:boolean){
		this.x=px;
		this.y=py;
		this.statu=stu;
		//this.cleancat();
		this.stay();
	}
	
	public moveCat(px:number,py:number):void{
		this.x=px;
		this.y=py;
		this.stay();
	}
	
	public changeStu(stu:boolean){
		this.statu=stu;
	}
	
	public stay(){
		if(!this.statu)
		{
			// this.staymc.gotoAndPlay(0,-1);
			// this.staymc.name="cat";
			this.staymc.gotoAndPlay(0,-1);
			this.addChild(this.staymc);
		}
		else{
			// this.weizhumc.gotoAndPlay(0,-1);
			// this.weizhumc.name="cat";
			this.removeChild(this.staymc);
			this.weizhumc.gotoAndPlay(0,-1);
			this.addChild(this.weizhumc);
		}
	}
	
	// public cleancat(){
		// this.removeChild(this.weizhumc);
		// this.removeChild(this.staymc);
	// }
}
