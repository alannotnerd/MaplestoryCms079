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
			selStr = "#r#e<家园保卫战>#n#k.\r\n强大的黑魔法师来袭，请火速消灭它们!#b\r\n你目前拥有： #r" + cm.getPlayer().getCSPoints(1) + "#k #b点卷  进入一次扣除 #r500#k #b点卷\r\n#r困难单人模式：副本总时间 10 分钟\r\n#b简单组队模式：副本总时间 5 分钟\r\n";
			selStr+="#L2#" + aaa + " 什么是家园保卫战？#l\r\n";
			selStr+="#L3#" + aaa + " #r#z4310091##k#b抽取稀有椅子（每周更新）#l\r\n";
			selStr+="#L5#" + aaa + " #r#z4310091##k#b抽取高级装备（每周更新）#b#l\r\n";
			selStr+="#L1#" + aaa + " 简单模式（掉落#z4310091#）（扣3000抵用卷）#l\r\n";
			selStr+="#L4#" + aaa + " 困难模式（掉落#z4310091#）（扣500点卷）#l\r\n";
			selStr+="#L7#" + aaa + " 简单模式（组队模式）（扣队长5000抵用卷）#l\r\n";
			selStr+="#L8#" + aaa + " 困难模式（组队模式）（扣队长1000点卷）#l";
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
                } else if (cm.getMap(913010300).getCharactersSize() > 0) { // Not Party Leader
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
                    cm.gainNX(2, -3000); //扣除点卷
                    cm.channelMessage(0x09, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了守护地图开始保护家园");
                        cm.dispose();
                    }
}
        } else if(sel==4){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("需要先#b开启#k一个组队,而且只能是你一个人~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("请叫队长跟我说话.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(913010300).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 500) { // Not Party Leader
                    cm.sendOk("你的点卷不足500点，请足够后再来");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r对不起,为了彻底的测试你的能力,只能一人前往..");
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
		    cm.gainNX(1, -500);
                    cm.channelMessage(0x09, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了守护地图开始保护家园");
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
                } else if (cm.getMap(913010300).getCharactersSize() > 0) { // Not Party Leader
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
                    cm.gainNX(2, -5000); //扣除点卷
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
                } else if (cm.getMap(913010300).getCharactersSize() > 0) { // Not Party Leader
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
		    cm.gainNX(1, -1000);
                    cm.channelMessage(0x09, "『守卫家园』" + " : " + "玩家<" + cm.getChar().getName() + ">进入了圣地开始保护圣龙[组队模式]");
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
