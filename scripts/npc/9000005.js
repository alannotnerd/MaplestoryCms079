/*mia
	spawn NPC
	- EI Nath
	- by ~爱上冒险岛
*/

var status = 0;
var mob = Array(2220000, 3220000, 5220000, 7220000,8220000,8220001,3220001,4220000,5220002,6220000,6220001,7220001,7220002,8220002,8220003,9300151,9300151);
var mobname = Array("红蜗牛王", "树妖王", "寄居蟹", "肯德熊","艾里杰","负狼雪人","大宇","歇尔夫","浮士德","多尔","朱诺","九尾狐","妖怪绅士","吉米拉","大海兽","人造人","愤怒人造人"
);
var mobcost = Array(10000000, 15000000, 20000000, 25000000,30000000,35000000,30000000,30000000,30000000,30000000,30000000,30000000,30000000,30000000,50000000,30000000,30000000);


var boss = Array(9300089, 9300090, 9400112, 9500317,8500000,8220001,9400014,9001000,9001001,9600010,9001002,9001003);
var bossname = Array("火凤凰", "冰凤凰", "保镖A", "小雪人","时间球","驮狼雪人","天狗","武术教练的分身","汉斯的分身","大王蜈蚣","赫丽娜的分身","达克鲁的分身");
var bosscost = Array(50000000, 50000000, 1000000000, 50000000,300000000,150000000,50000000,50000000,80000000,50000000,50000000,50000000);
var selectedmob = -1;
var mobkind;
var mobid;
var mobna;
var price;
var qty=1;

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("#b谢谢下次再光顾.");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (status == 0) {
			cm.sendNext("#bHi, 我是爱上冒险岛召唤师[杨小细],，我可以为你进行特殊服务吗.");
		} else if (status == 1) {
			cm.sendNextPrev("#b我可以为你召唤出你希望的怪兽和新的超级BOSS，但是您得给点钱我哟，祝你杀怪愉快.")
		} 

 		else if (status == 2) {
			cm.sendSimple ("#r请选择您要召唤的怪物种类?\r\n#b#L0#普通怪物#l\r\n#L1#新超级BOSS怪物#l");
		} 
		else if (status == 3) {

			var selStr = "#r选择你想召唤的怪兽哦.#b";
		if (selection == 0) {
				mobkind=0;
				for (var i = 0; i < mob.length; i++) {
					selStr += "\r\n#L" + i + "#" + mobname[i] + "(" + mobcost[i] + " 枫币)#l";
				}
			cm.sendSimple(selStr);}
		else if (selection == 1){
				mobkind=1;
				for (var i = 0; i < boss.length; i++) {
					selStr += "\r\n#L" + i + "#" + bossname[i] + "(" + bosscost[i] + " 枫币)#l";
				}
			cm.sendSimple(selStr);
		}else cm.dispose();

}
 else if (status == 4) {
			if (mobkind==0) {
		var prompt = "#b你想召唤多少只？";
		mobid  =mob[selection];
		mobna =mobname[selection];
		price=mobcost[selection];
		cm.sendGetNumber(prompt,1,1,100)
			}
			else if (mobkind==1){
		mobid  =boss[selection];
		mobna =bossname[selection];
		price=bosscost[selection];
		cm.sendYesNo("#d召唤#r"+mobna+"#d需要#r"+price+"#d枫币，你确定要召唤？");
			}
			else cm.dispose();	
		} 


 else if (status == 5) {
			if (mobkind==0) {
				qty = selection;
				cm.sendYesNo("#d召唤#r"+qty+"#d只#r"+mobna+"#d需要#r"+price*qty+"#d枫币，你确定要召唤？");
			}
			else if (mobkind==1){
				if (cm.getMeso() >= price)
				{ 
				cm.spawnMob(mobid);
				cm.gainMeso(-price);
				cm.dispose();
				}
				else
			cm.sendOk("#b对不起，你金币不足.");
			cm.dispose();
				
			}
			else cm.dispose();	
		} 
else if (status == 6) {				
			if (cm.getMeso() >= price*qty)
				{ 
				cm.spawnMob(mobid,qty);
				cm.gainMeso(-price*qty);
				cm.dispose();
				}
				else
			cm.sendOk("#b对不起，你金币不足.");
			cm.dispose();
		}
	}
}	
