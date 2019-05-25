 var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//领取完成

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
			selStr = "                  #r#e<单人：尖兵副本>#n#k\r\n1.一人组队,230级,该任务每天一次，无法重置\r\n#r2.该任务需消耗5000点券和200个#i4000000#\r\n3.掉落#v1202023##v1202027##v1202031##v1202035##v4000313##v4310036##v3010944##v3010831##v3010830##v3010829##v3010828##v3010827##v3010825##v3010824##v3010876##v3700049##i2022530##i2022531##i2614003##i2614004#(可交易)#r#e140-150装备\r\n";
			selStr+="#L4#" + aaa + "#d#e>>>>>>>>>#b我想执行组队任务#d<<<<<<<<<#l\r\n";
			cm.sendSimple(selStr);
    } else if (status == 1) {
		sel=selection;
        if(sel==1){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队,而且只能是你一个人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 3000) { // Not Party Leader
                    cm.sendOk("你的抵用卷不足3000点，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r对不起,为了彻底的测试你的能力,只能一人前往..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -6000); //扣除点卷
                    cm.channelMessage(0x20, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了守护地图开始保护家园");
                        cm.dispose();
                    }
}
        } else if(sel==4){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队,而且只能是你一个人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
				} else if (cm.getBossLog("尖兵")>=1) {
								cm.sendOk("你今天已经不能再挑战了。每天一次哦");
								cm.dispose();
								return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(913051201).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
				} else if (cm.getItemQuantity(4000000) < 200) { // Not Party Leader
                    cm.sendOk("你的蜗牛壳不足，请足够后再来");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) <5000) { // Not Party Leader
                    cm.sendOk("你的点卷不足5000点，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r对不起,为了彻底的测试你的能力,只能一人前往..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("Zjb");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
		    cm.gainNX(1, -5000);
			cm.setBossLog("尖兵");
			cm.gainItem(4000000,-200);
                    cm.worldSpouseMessage(0x15, "『单人尖兵』" + " : " + "玩家<" + cm.getChar().getName() + ">进入单人尖兵副本");
                        cm.dispose();
                    }
}
        } else if(sel==7){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 5000) { // Not Party Leader
                    cm.sendOk("你的抵用卷不足5000，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r对不起,组队必须2人以上，或者选择单人模式");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -10000); //扣除点卷
                    cm.channelMessage(0x09,"『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了圣地开始保护圣龙[组队模式]");
                        cm.dispose();
                    }
}
        } else if(sel==8){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 1000) { // Not Party Leader
                    cm.sendOk("你的点卷不足1000，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r对不起,组队必须2人以上，或者选择单人模式");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw1");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
		    cm.gainNX(1, -2000);
                    cm.channelMessage(0x20, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了圣地开始保护圣龙[组队模式]");
                        cm.dispose();
                    }
}
		} else if (sel==3){
			cm.dispose();
              	        cm.openNpc(9900003,701);  
		} else if (sel==5){
			cm.dispose();
              	        cm.openNpc(9900003,702);                        
		} else if (sel==2){
			cm.sendOkS("#r#e<守卫家园>\r\n#r#e副本特色：#k#n进入后，每次15秒刷新一批怪物，请迅速消灭\r\n#r#e挑战失败条件：#k#n地图怪物总数量超过100只。\r\n#e#r挑战待遇：#k#n杀死怪物后，有机率掉落#v4310091##z4310091#\r\n#r#e进入条件#k#n：点卷，或者抵用卷",2);
			cm.dispose();
		} else if (sel==6){
			cm.sendOkS("暂未开放",2);
			cm.dispose();
	 }
}
}
