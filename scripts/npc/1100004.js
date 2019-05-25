importPackage(net.sf.cherry.client);

var menu = new Array("天空之城");
var cost = new Array(1500,1500);
var TktoSD;
var display = "";
var btwmsg;
var method;

function start() {
	status = -1;
	TktoSD = cm.getEventManager("TktoSD");
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("OK. If you ever change your mind, please let me know.");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				if(cm.getChar().getMapId() == 130000210 && i < 1) {
					display += "\r\n#L"+i+"#移动时间是#b8分钟#k，费用是#b("+cost[i]+")#k金币。";
				} else if(cm.getChar().getMapId() == 250000100 && i > 0 && i < 3) {
					display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" 金币)#k";
				}
			}
			if(cm.getChar().getMapId() == 130000210 || cm.getChar().getMapId() == 251000000) {
				btwmsg = "#b天空之城到武陵#k";
			} else if(cm.getChar().getMapId() == 250000100) {
				btwmsg = "#b武陵返回天空之城或者去百草堂#k";
			}
			if(cm.getChar().getMapId() == 251000000) {
				cm.sendYesNo("怎么样？我从 "+btwmsg+" 再到现在。我的速度很快的吧，如果你想返回 #b"+menu[3]+"#k ，那么我们就立刻出发，不过还是得给我一些辛苦钱，价格是 #b"+cost[3]+" 金币#k。");
			} else {
				cm.sendSimple("嗯……你是说……你想离开圣地？前往金银岛#b天空之城#k？路程所需的时间大约是#b8分钟#k，费用用1500金币。\r\n" + display);
			}
		} else if(status == 1) {
			if(selection == 2) {
				cm.sendYesNo("你确定要去 #b"+menu[2]+"#k ？ 那么你要付给我 #b"+cost[2]+" 金币#k");
			} else {
				if(cm.getMeso() < cost[selection]) {
					cm.sendNext("你确定你有足够的金币？");
					cm.dispose();
				} else {
					if(cm.getChar().getMapId() == 251000000) {
						cm.gainMeso(-cost[3]);
						cm.warp(200000000);
						cm.dispose();
					} else {
						if(TktoSD.getProperty("isRiding").equals("false")) {
							cm.gainMeso(-cost[selection]);
							TktoSD.newInstance("TktoSD");
							TktoSD.setProperty("myRide",selection);
							TktoSD.getInstance("TktoSD").registerPlayer(cm.getChar());
							cm.dispose();
						} else {
							cm.gainMeso(-cost[3]);
							cm.warp(200000000);
							cm.dispose();
						}
					}
				}
			}
		} else if(status == 2) {
			if(cm.getMeso() < cost[2]) {
				cm.sendNext("你确定你有足够的金币？");
				cm.dispose();
			} else {
				cm.gainMeso(-cost[2]);
				cm.warp(200000000);
				cm.dispose();
			}
		}
	}
}
