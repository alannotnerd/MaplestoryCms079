
var status = 0;
var itemS = Array(Array(1002140,300,"GM帽子"),
					        Array(1402037,800,"龙背刃"),
					        Array(1402014,1000,"温度计"),
					        Array(1902007,1500,"天神鸟坐骑"),
						Array(3010070,1500,"巨无霸品克缤"),
						Array(1002894,800,"粉色编织发带"),		
						Array(1002895,800,"红色编织发带"),
						Array(1002896,800,"紫色编织发带"),
						Array(1002897,800,"橙色编织发带"),
						Array(1002898,800,"绿色编织发带"),
						Array(1002899,800,"黄色编织发带"),
						Array(1002900,800,"蓝色编织发带"),
						Array(1002901,1200,"银色编织发带"),
						Array(1002902,1400,"黑色编织发带"),
						Array(1142000,100,"诚实的冒险家勋章"),
						Array(1142001,200,"组队任务狂人勋章"),
						Array(1142002,130,"任务狂人勋章"),
						Array(1142003,130,"超人气王勋章"),
						Array(1142004,100,"勤奋冒险家勋章"),
						Array(1142006,180,"冒险岛偶像明星勋章"),
						Array(1142178,300,"冒险岛形象大使勋章"),
						Array(1142174,350,"冒险岛艺术家勋章"),
						Array(1142173,350,"冒险岛设计师勋章"),
						Array(1142177,300,"冒险岛收藏家勋章"),
						Array(1142175,350,"冒险岛漫画家勋章"),
						Array(1142176,350,"冒险岛文学家勋章"),
						Array(1142007,500,"暗黑龙王杀手勋章"),
						Array(1142008,700,"品克缤杀手勋章"),
						Array(1142186,200,"2010虎年勋章"),
						Array(1122029,1500,"冒险之心(战士)#r30#k攻"),
						Array(1122030,1500,"冒险之心(法师)#r30#k魔"),
						Array(1122031,1500,"冒险之心(弓手)#r30#k攻"),
						Array(1122032,1500,"冒险之心(飞侠)#r30#k攻"),
						Array(1122033,1500,"冒险之心(海盗)#r25#k攻"),
						Array(1122034,3000,"冒险之心(战士)#r50#k攻"),
						Array(1122035,3000,"冒险之心(法师)#r50#k魔"),
						Array(1122036,3000,"冒险之心(弓手)#r50#k攻"),	
						Array(1122037,3000,"冒险之心(飞侠)#r50#k攻"),
						Array(1122038,3000,"冒险之心(海盗)#r45#k攻")				
);
var StringS;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			
				  cm.sendNext("#rHi,我是特殊道具换取NPC，在我这您只需用武林道场积分就可以换取一些特殊道具哦!!");   
			
		}else if (status == 1) {
				StringS = "您好!您当前的道场积分为#r " + cm.getPlayer().getDojoPoints() + " #k分请选择您需要兑换的道具";
				for (var i = 0; i < itemS.length; i++){
					StringS += "\r\n#L" + i + "#" + itemS[i][2] + "#v" + itemS[i][0] + "#(需要道场积分#r" + itemS[i][1] + "#k分)#l"
				}
				cm.sendSimple(StringS);			 								     
		}else if (status == 2){
			if (cm.getPlayer().getDojoPoints() >= itemS[selection][1]){
				if(cm.getPlayer().getInventory(net.sf.cherry.client.MapleInventoryType.getByType(1)).isFull(2)){
						cm.sendOk("您至少应该让装备栏空出两格");
						cm.dospose();
				}
				cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() - itemS[selection][1]);
				if (itemS[selection][0] == 1902007){
					cm.gainItem(1912005,1);
				}
				cm.gainItem(itemS[selection][0],1);
				cm.sendOk("兑换成功！请查看背包！")
				cm.dispose();
			}else{
				cm.sendOk("对不起，你没有足够的道场积分用来换取！");
				cm.dispose();
			}
		}
	}
}
