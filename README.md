# runcat
神经猫的实现
@TangZhihao(tjrtzh@gmail.com)

使用egret游戏引擎v2.0.1，寻路采用宽度优先算法寻找最短路径。

http://tzhruncats.sinaapp.com


bug：js回收失败，长期运行内存溢出
todo：算法空间复杂度过高，现在只标记路大小，需要函数回查路径，可以考虑改为存储上一点的位置减少内存使用

======================================制作周期=================================

7.6 熟悉使用环境
todo：使用相关api

7.7 教程函数
todo：界面调整

7.8 页面实现
addChild();
removeChild;

todo：逻辑判断

7.9 逻辑实现
todo：优化寻路算法

7.10 测试
深度优先-->广度优先
todo：拆分类


==========================================类结构=================================

LoadingUI.ts
画面加载类

Main.ts
函数入口

Game.ts
游戏界面及逻辑

Cat.ts
猫的控制函数

GameOver.ts
游戏结束界面

Success.ts
成功围住显示

Fail.ts
失败显示
