function start() {


if(cm.getChar().getMapId() != 103000902) {
cm.sendOk("你所在的地图不正确，这个NPC可能不是在这个地方使用的")
} else {
    cm.sendSimple ("#e呜呜呜。。。我的王子被暴力熊给抓走了，您可以帮我把他救出来吗，而且我还需要【500元宝】做路费回家，好心人你可以帮我吗\r\n#d剩余:#r" +  cm.getzb() + "元宝\r\n#L1#路费给你，你快回去把#l \r\n#L0#你快回去我帮你去找他#l  ");
    }
}
function action(mode, type, selection) {
        cm.dispose();
    

                         if (selection == 0) {
                                if (!cm.haveItem(4001110,1)) {
				cm.sendOk("抱歉，你没有1个#v4001110#");
                                } else if (cm.getChar().getLevel() < 100) {
                                cm.sendOk("很抱歉,你的等级不够100级无法为传送，里面太危险了。");
                                } else if (cm.getChar().getLevel() > 200) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了,#r请转身以后在来把");
				} else if (cm.getParty() == null) {
				cm.sendOk("抱歉你没有组队，无法进入，如果你要一个人进去，请独自创建一个队伍（队伍中运行只有你一个人）");
				} else if (!cm.isLeader()) {
				cm.sendOk("如果进入, 那么请 #b你的组队长#k 来告诉我！");
				} else if (cm.getParty().getMembers().size() > 5) {
				cm.sendOk("抱歉最多只能带5个队友进入恶魔广场");
                                } else if (cm.getBossLog('blxboss') < 3){
                                cm.setBossLog('blxboss');
				em = cm.getEventManager("blxboss");
				em.getIv().invokeFunction("setup", null);
				eim = em.getInstance(em.getProperty("newInstance"));
				eim.registerParty(cm.getParty(), cm.getChar().getMap());				
                    		cm.sendOk("勇士们抓紧时间啊，您挑战的时间只有1个小时，如果你在1个小时之内还没有把BOSS解决掉，我将把你传送到自由市场");
                                cm.serverNotice("『挑战暴力熊』：【"+ cm.getChar().getName() +"】带领他的队友开始挑战传说中的【暴力熊】");  
                                cm.gainItem(4001035, -100);
				} else {			
                    		cm.sendOk("对不起，每天只能挑战3次【暴力熊】");
				}
				cm.dispose();
    } else if (selection == 1) {
                                if(cm.getzb() >= 500) {
                                cm.setzb(-500);
                                cm.sendOk("请把#v4001110#我爷爷，他会帮你的");
	                        cm.gainItem(4001110, 1);
                                cm.dispose(); 
                        } else {
                                cm.sendOk("#e您已经没有元宝了，请即时充值！或当前地图不正确"); 
                                cm.dispose(); 
                               }
    } else if (selection == 2) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400572, 20000000, 8230000, 1);//蝙蝠魔(卐解)
    } else if (selection == 3) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400536, 18000000, 8230000, 1);//蝙蝠魔(咒印)
    } else if (selection == 4) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400120, 18000000, 5500, 1);//男老板 
    } else if (selection == 5) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400121, 75000000, 3900000, 1);//女老板 
    } else if (selection == 6) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400112, 400000000, 13800000, 1);//保镖A 
    } else if (selection == 7) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400113, 500000000, 10500000, 1);//保镖B
    } else if (selection == 8) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400300, 150000000, 17500000, 1);//恶僧
    } else if (selection == 9) {
        cm.gainMeso(-1000000);
        cm.summonMob(9400549, 3500000, 300000, 1);//火马
    } else if (selection == 10) {
                    		cm.sendPrev("#b进入地图后，找");
				cm.dispose();
    } else if (selection == 11) {
        cm.gainMeso(-1000000);
        cm.summonMob(8180000, 3700000, 13500, 1);//火焰龙
    } else if (selection == 12) {
        cm.gainMeso(-1000000);
        cm.summonMob(9300012, 18000000, 4800, 1);//阿丽莎乐
    } else if (selection == 13) {
        cm.gainMeso(-1000000);
        cm.summonMob(8220001, 18000000, 4800, 1);//驮狼雪

    } else if (selection == 42) {
        cm.gainMeso(-1000000);
        cm.summonMob(6130207, 1670000, 1200, 20);//猿公
    } else if (selection == 43) {
        cm.gainMeso(-1000000);
        cm.summonMob(4230102, 1850000, 5500, 30);//大幽灵 
    } else if (selection == 44) {
        cm.gainMeso(-5000000);
        cm.summonMob(9001000, 1800000, 450, 5);//教官
        cm.summonMob(9001001, 1800000, 450, 5);
        cm.summonMob(9001002, 1800000, 450, 5);
        cm.summonMob(9001003, 1800000, 450, 5);
    } else if (selection == 45) {
        cm.gainMeso(-5000000);
        cm.summonMob(100100, 4000000, 105000, 8);//绿蜗牛 
    } else if (selection == 46) {
        cm.gainMeso(-5000000);
        cm.summonMob(7130001, 75000000, 11000, 20);//猎犬
    } else if (selection == 47) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140500, 150000000, 17500, 10);//火焰猎犬
    } else if (selection == 48) {
        cm.gainMeso(-5000000);
        cm.summonMob(7130200, 1800000, 30000, 10);//红狼
    } else if (selection == 49) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140000, 5000000, 10000, 8);//白狼
    } else if (selection == 50) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140100, 5000000, 10000, 8);//企鹅王与黑雪人 
    } else if (selection == 51) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140103, 1800000, 10500, 1);//寒冰半人马
    } else if (selection == 52) {
        cm.gainMeso(-5000000);
        cm.summonMob(8140101, 2000000, 12000, 1);//暗黑半人马
    } else if (selection == 53) {
        cm.gainMeso(-5000000);
        cm.summonMob(8810020, 1800000, 10000, 8);//蓝飞龙 
    } else if (selection == 54) {
        cm.gainMeso(-5000000);
        cm.summonMob(8810021, 1800000, 10000, 8);//黑飞龙
    } else if (selection == 55) {
        cm.gainMeso(-5000000);
        cm.summonMob(8810023, 2200000, 15000, 10);//邪恶双刀蜥蜴
    } else if (selection == 56) {
        cm.gainMeso(-5000000);
        cm.summonMob(9300077, 3000000, 20000, 20);//骷髅龙
    } else if (selection == 57) {
        cm.gainMeso(-5000000);
        cm.summonMob(8150101, 1800000, 10000, 20);//尖鼻鲨鱼 
    } else if (selection == 58) {
        cm.gainMeso(-5000000);
        cm.summonMob(8142100, 1800000, 10000, 20);//致命乌贼怪 
    } else if (selection == 59) {
        cm.gainMeso(-5000000);
        cm.summonMob(8160000, 4000000, 11500, 10);//时间门神 
    } else if (selection == 60) {
        cm.gainMeso(-5000000);
        cm.summonMob(8170000, 5000000, 11500, 10);//黑甲凶灵
    } else if (selection == 61) {
        cm.gainMeso(-5000000);
        cm.summonMob(8141100, 6000000, 12500, 10);//大海贼王
    } else if (selection == 62) {
        cm.gainMeso(-5000000);
        cm.summonMob(8143000, 6000000, 12500, 10);//时之鬼王 
    } else if (selection == 100) {
        cm.gainMeso(-5000000);
        cm.gainItem(4000019,200);//绿色蜗牛壳 
    } else if (selection == 101) {
        cm.gainMeso(-5000000);
        cm.gainItem(4000000,200);//蓝色蜗牛壳  
    } else if (selection == 102) {
        cm.gainMeso(-5000000); 
        cm.gainItem(4000016,200);//红色蜗牛壳 
    } else if (selection == 72) {
        cm.gainMeso(-10000000);
        cm.summonMob(8220000, 1670000, 1200, 1);//艾里杰
    } else if (selection == 73) {
        cm.gainMeso(-10000000);
        cm.summonMob(3220001, 1850000, 5500, 1);//大宇
    } else if (selection == 74) {
        cm.gainMeso(-10000000);
        cm.summonMob(4220000, 1800000, 450, 1);//歇尔夫
    } else if (selection == 75) {
        cm.gainMeso(-10000000);
        cm.summonMob(5220002, 4000000, 105000, 1);//浮士德
    } else if (selection == 76) {
        cm.gainMeso(-10000000);
        cm.summonMob(6220000, 75000000, 11000, 1);//多尔
    } else if (selection == 77) {
        cm.gainMeso(-10000000);
        cm.summonMob(6220001, 150000000, 17500, 1);//朱诺
    } else if (selection == 78) {
        cm.gainMeso(-10000000);
        cm.summonMob(7220001, 1800000, 30000, 1);//九尾狐
    } else if (selection == 79) {
        cm.gainMeso(-10000000);
        cm.summonMob(7220002, 5000000, 10000, 1);//妖怪绅士
    } else if (selection == 80) {
        cm.gainMeso(-10000000);
        cm.summonMob(8220002, 5000000, 10000, 1);//吉米拉
    } else if (selection == 81) {
        cm.gainMeso(-10000000);
        cm.summonMob(8220003, 1800000, 10500, 1);//大海兽
    } else if (selection == 82) {
        cm.gainMeso(-10000000);
        cm.summonMob(9300151, 2000000, 12000, 1);//人造人
    } else if (selection == 83) {
        cm.gainMeso(-10000000);
        cm.summonMob(9300151, 1800000, 10000, 1);//愤怒人造人
    } else if (selection == 84) {
        cm.gainMeso(-10000000);
        cm.summonMob(9400014, 1800000, 10000, 1);//天狗
    } else if (selection == 85) {
        cm.gainMeso(-10000000);
        cm.summonMob(9400575, 2200000, 15000, 1);//可爱大脚

    } 
    
    if (selection == 110) {
        cm.warp(100000000, 0);
		cm.dispose();
    } 
    
}