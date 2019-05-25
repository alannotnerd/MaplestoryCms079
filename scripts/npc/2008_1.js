var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow/Minigame/Common/mark#";

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		if (cm.getBossLogAcc("推广设置")>=0) {
			cm.dispose();
			cm.openNpc(2008, 3);
			return;
		}
		if (cm.getBossLog("新手驾到1")>=0) {
			var text = head+"#d再次欢迎来到 #r" + cm.getServerName() + " #k #d,我们将赠送您：\r\n\r\n";
			text+="#v2430241#(打开它)#v2431673##v5030012#(永久)#v1142310#(军衔系统)#i1702554##i3010957##i1003967##i1082551##i1052666##i1072866##i1003082##i1112150##i1112262##i1022048##i5150040##i5211060##i5360015##i1112918##i5000427##i1102612##i1052647##i1003946##i1072853##i1082540#\r\n";
			text+="#b"+icon+" 本服为仿官方模式  经验#r30#b倍  金币#r20#b倍  爆率#r10#b倍\r\n";
			text+=""+icon+" 主菜单在拍卖按钮(或输入@wn),提供各种便捷服务\r\n";
			text+=""+icon+" #r本F的中介币是:#i3800747#,可以摆商店哦!\r\n";
			text+=""+icon+" #b拍卖处有所有副本和所有商店,有些商店副本在市场\r\n";
			text+=""+icon+" 每日任务，独家副本，海量点卷等你来领\r\n";
			//text+=""+icon+" 最后祝您游戏愉快，不懂可以看背包里的 #r毛莫的信#k#b。\r\n";
			text+=""+icon+" 如果不会请加我们的玩家交流群：#e#r1026939#n#k";
			cm.sendSimple(text);
		} else {
			cm.dispose();
			cm.openNpc(2008,2);
		}
	} else if (status == 1) {
		cm.dispose();
		cm.setBossLog("新手驾到", 0, -2);
		//cm.gainItem(2431719, 1);
		cm.gainItem(2430241, 1);
		cm.gainItem(2431673, 1, 60);
		cm.gainMeso(100000);
		//cm.gainItem(2022452, 15);
		cm.gainItem(2430869, 1);//宠物 
		//cm.gainItem(5190000, 1);//宠物 
		//cm.gainItem(5190001, 1);//宠物 
		//cm.gainItem(5190006, 1);//宠物 
		cm.warp(50000);
		//cm.openNpc(2008, 2);
		cm.worldSpouseMessage(0x01,"『有朋自远方来』：玩家 "+ cm.getChar().getName() +" 空降梦想冒险村★★");
		cm.worldSpouseMessage(0x01,"『有朋自远方来』：玩家 "+ cm.getChar().getName() +" 空降梦想冒险村★★");
	}
}
