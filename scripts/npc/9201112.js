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
			cm.sendSimple("#e伟大的勇士，你真的是要去挑战绯红骑士团吗，如果你能给我500元宝，我可以给你一封推荐信，你去最上面找贵英，他会给你开启绯红之路的钥匙\r\n#d剩余:#r" + cm.getzb() + "元宝\r\n#L1#我确定我要去，麻烦你了#l \r\n#L2#我拿到了，请把我送过去把#l\r\n#L5#回自由市场#l\r\n#L10#【挑战前必读】#l    #L4#【闯关积分说明】#l");	
		} else if (status == 1) {
			if (selection == 1) {
                                if(cm.getzb() >= 500) {
                                cm.setzb(-500);
                                cm.sendOk("去这里最上面一层可以找到贵英。请把#v4001110#交给她。把他给你的东西带回来，我就可以把你送过去");
	                        cm.gainItem(4001110, 1);
                                cm.dispose(); 
                        } else {
                                cm.sendOk("#e您已经没有元宝了，请即时充值！"); 
                                cm.dispose(); 
                                }
			} else if (selection == 2) {
                                if (!cm.haveItem(4001035,1)) {
				cm.sendOk("抱歉，你没有1个#v4001035#");
                                } else if (cm.getChar().getLevel() < 100) {
                                cm.sendOk("很抱歉,你的等级不够100级无法为传送，里面太危险了。");
                                } else if (cm.getChar().getLevel() > 200) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了,#r请转身以后在来把");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入恶魔广场");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入恶魔广场, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 5) {
				cm.sendOk("抱歉最多只能带5个队友进入恶魔广场");
                                } else if (cm.getBossLog('ZAKUM') < 1000){
                                cm.setBossLog('ZAKUM');
				em = cm.getEventManager("feihong");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("勇士们抓紧时间啊，您挑战的时间只有3个小时，如果你在3个小时之内还没有把BOSS解决掉，我将把你传送到自由市场");
                                cm.serverNotice("『绯红骑士团公告』：【"+ cm.getChar().getName() +"】带领他的队友对绯红骑士团第一层发起挑战");  
                                cm.gainItem(4001035, -100);
				} else {			
                    		cm.sendOk("对不起，每天只能挑战10次绯红骑士团");
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
                    		cm.sendOk("#b\r\n积分奖品\r\n100点积分：混沌卷轴一张\r\n300点积分：温度计一把\r\n500点积分巨无霸椅子一张。\r\n1000点积分：帽一顶效果头顶带有。\r\n积分获得:每次通关一次都可以获得10点积分");				
cm.dispose();
			} else if (selection == 5) {
                                cm.warp(910000000, 0);
                                cm.dispose();
			} else if (selection == 10) {
                    		cm.sendOk("#b1、绯红副本内，有5个BOSS，打死每个BOSS后都有一定几率爆出一个凭证，收集起5个凭证，可以兑换一个抽奖卷\r\n8、使用抽奖卷会给你传送到领奖地图，可以获得宝箱一个。以及绯红装备和10点积分\r\n9、然后去废弃都市，找权达开帮你开启宝箱可以随机获得一个永恒或重生装备");
				cm.dispose();
}}}}