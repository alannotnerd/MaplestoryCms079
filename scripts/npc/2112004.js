var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {			
			cm.sendSimple("#e伟大的勇士，你真的是要去挑战绯红骑士团吗，如果你能给我500元宝，我可以给你一封推荐信，你去最上面找贵英，他会给你开启绯红之路的钥匙\r\n#d剩余G币:#r" + cm.getzb() + "点\r\n#L1#我确定我要去，麻烦你了#l \r\n#L2#我拿到了，请把我送过去把#l");	
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {			
			cm.sendSimple("勇敢的冒险者，恶魔广场的怪物再次骚动起来了，您真的打算去挑战吗！\r\n                 #L10##e#r★恶魔广场帮助★#l\r\n\r\n\r\n#L1##e#b１、恶魔广场1（免费场）#L4##b恶魔广场1#r（无限制）#b#l\r\n#L2#２、恶魔广场2（体验区）#l#L5#恶魔广场2#r（无限制）#b\r\n#L3#３、恶魔广场3（体验区）#l#L6#恶魔广场3#r（无限制）#l");	
		} else if (status == 1) {
			if (selection == 1) {
                                if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000004, 0);
                                cm.dispose();}
			} else if (selection == 2) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("抱歉，你没有3个#v4000016#");
                                } else if (cm.getChar().getLevel() < 70) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                } else if (cm.getChar().getLevel() > 120) {
                                cm.sendOk("很抱歉,你的等级超过120级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
                                } else if (cm.getBossLog('ZAKUM') < 1){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场2，我只提供你1小时的时间,请尽情杀怪把");
				} else {			
                    		cm.sendOk("对不起，您每天只能进入一次体验区");
				}
				cm.dispose();
			} else if (selection == 3) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("抱歉，你没有3个#v4000016#");
                                } else if (cm.getChar().getLevel() < 120) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                } else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
                                } else if (cm.getBossLog('ZAKUM') < 1){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场2，我只提供你1小时的时间,请尽情杀怪把");
				} else {			
                    		cm.sendOk("对不起，您每天只能进入一次体验区");
				}
				cm.dispose();
			} else if (selection == 4) {
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("抱歉，你没有4个4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场4，我只提供你1小时的时间,请尽情杀怪把");
				}
				cm.dispose();
			} else if (selection == 5) {
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("抱歉，你没有4个4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场4，我只提供你1小时的时间,请尽情杀怪把");
				}
				cm.dispose();
			} else if (selection == 10) {
                    		cm.sendPrev("欢迎进入恶魔广场4，我只提供你1小时的时间,请尽情杀怪把");
				cm.dispose();
}}}}
			} else if (selection == 2) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("抱歉，你没有3个#v4000016#");
                                } else if (cm.getChar().getLevel() < 70) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                } else if (cm.getChar().getLevel() > 120) {
                                cm.sendOk("很抱歉,你的等级超过120级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
                                } else if (cm.getBossLog('ZAKUM') < 1){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场2，我只提供你1小时的时间,请尽情杀怪把");
				} else {			
                    		cm.sendOk("对不起，您每天只能进入一次体验区");
				}
				cm.dispose();
			} else if (selection == 3) {
                                if (!cm.haveItem(4000016,3)) {
				cm.sendOk("抱歉，你没有3个#v4000016#");
                                } else if (cm.getChar().getLevel() < 120) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                } else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
                                } else if (cm.getBossLog('ZAKUM') < 1){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场2，我只提供你1小时的时间,请尽情杀怪把");
				} else {			
                    		cm.sendOk("对不起，您每天只能进入一次体验区");
				}
				cm.dispose();
			} else if (selection == 4) {
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("抱歉，你没有4个4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场4，我只提供你1小时的时间,请尽情杀怪把");
				}
				cm.dispose();
			} else if (selection == 5) {
				if (!cm.haveItem(4000016,4)) {
				cm.sendOk("抱歉，你没有4个4000016");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 2) {
				cm.sendOk("抱歉最多只能带1个队友进入恶魔广场");
				} else {
				cm.gainItem(4000016,-4);
				em = cm.getEventManager("1min");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("欢迎进入恶魔广场4，我只提供你1小时的时间,请尽情杀怪把");
				}
				cm.dispose();
			} else if (selection == 10) {
                    		cm.sendPrev("欢迎进入恶魔广场4，我只提供你1小时的时间,请尽情杀怪把");
				cm.dispose();
}}}}}}}