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
			//cm.sendSimple("勇敢的冒险者，恶魔广场的怪物再次骚动起来了，您真的打算去挑战吗！\r\n                 #L10##e#r★恶魔广场帮助★#l\r\n\r\n\r\n#L1##e#b１、恶魔广场1（免费场）#L4##b恶魔广场1#r（无限制）#b#l\r\n#L2#２、恶魔广场2（体验区）#l#L5#恶魔广场2#r（无限制）#b\r\n#L13#３、恶魔广场3（未开放）#l#L16#恶魔广场3#r（未开放）#l");
                                cm.sendSimple("恶魔广场内可以获得大量元宝。#v4000377#用它可以在枫叶募捐箱兑换元宝#r[请大家不要在一个洞内打怪可能会引起吊线]\r\n#d#e       ★ 当前账户剩余:#r" + cm.getzb() + "元宝 #k★#e\r\n#L1#恶魔广场1#l \r\n#L2#恶魔广场2#l \r\n#L3#恶魔广场3#l\r\n#L4#恶魔广场4#l\r\n#L5#恶魔广场5#l\r\n#b#L10#粪便换元宝#l");	
		} else if (status == 1) {
			if (selection == 1) {
                                if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000002, 0);
                                cm.dispose();}
			} else if (selection == 2) {
                             if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000003, 0);
                                cm.dispose();}
			} else if (selection == 3) {
                             if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000004, 0);
                                cm.dispose();}
			} else if (selection == 4) {
                             if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000005, 0);
                                cm.dispose();}
			} else if (selection == 5) {
                             if (cm.getChar().getLevel() < 10) {
                                cm.sendOk("很抱歉,你的等级不够10级无法为传送，里面太危险了。");
                                cm.dispose(); 
                        }else if (cm.getChar().getLevel() > 199) {
                                cm.sendOk("很抱歉,你的等级超过200级无法为你传送了，这是新人的体验地体哦,#r请转身以后在来把");
                                cm.dispose(); 
                                }else{
                                cm.warp(910000006, 0);
                                cm.dispose();}
			} else if (selection == 10) {
            if(cm.haveItem(4000377, 300)) {
            cm.sendOk("您的#v4000377#已被收回!为了回报你，我给你100元宝!")
            cm.gainItem(4000377, -300);
            cm.setzb(100); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4000377#\r\n请检查您的背包中是否有300个再来领取。")
                cm.dispose();    
            }   
} else if (selection == 13) {
                    		cm.sendOk("除夕夜至大年十五这段时间内开放");
cm.dispose();
} else if (selection == 16) {
                    		cm.sendOk("除夕夜至大年十五这段时间内开放");
cm.dispose();
}}}}