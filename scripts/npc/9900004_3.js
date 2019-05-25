var status = 0;

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
            var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，需要清除次数吗？#b\r\n#L0#普通扎昆(1000抵用卷)\r\n#L1#普通黑龙(1000抵用卷)\r\n#L2#进阶扎昆(2000抵用卷)\r\n#L3#进阶黑龙(2000抵用卷)\r\n#L4#狮子王·班雷昂(2000抵用卷)\r\n#L5#宠物儿·品克缤(3000抵用卷)\r\n#L6#宠物儿·混沌品克缤(3000抵用卷)\r\n#L7#骑士团·希纳斯女皇(3000抵用卷)\r\n#L8#用物品#v4310015#重置BOSS挑战次数(进阶[扎昆/黑龙/普通品克缤])";//\r\n#L0#扎昆\r\n#L1#黑龙
 	    cm.sendSimple(selStr);
    } else if (status == 1) {
      switch (selection) {
        case 0:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("普通扎昆") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("普通扎昆");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(1000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
        case 1:
           if (cm.getPlayer().getCSPoints(2)>=10000 && cm.getBossLog("普通黑龙") > 1) {
		    cm.gainNX(2,-10000);
                    cm.resetBossLog("普通黑龙");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(1000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
        case 2:
           if (cm.getPlayer().getCSPoints(2)>=20000 && cm.getBossLog("进阶扎昆") > 1) {
		    cm.gainNX(2,-20000);
                    cm.resetBossLog("进阶扎昆");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(2000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
        case 3:
           if (cm.getPlayer().getCSPoints(2)>=20000 && cm.getBossLog("进阶黑龙") > 1) {
		    cm.gainNX(2,-20000);
                    cm.resetBossLog("进阶黑龙");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(2000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
        case 4:
           if (cm.getPlayer().getCSPoints(2)>=20000 && cm.getBossLog("狮子王") > 1) {
		    cm.gainNX(2,-20000);
                    cm.resetBossLog("狮子王");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(2000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
        case 5:
           if (cm.getPlayer().getCSPoints(2)>=30000 && cm.getBossLog("品克缤") > 1) {
		    cm.gainNX(2,-30000);
                    cm.resetBossLog("品克缤");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(3000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
		case 6:
           if (cm.getPlayer().getCSPoints(2)>=30000 && cm.getBossLog("混沌品克缤") > 1) {
		    cm.gainNX(2,-30000);
                    cm.resetBossLog("混沌品克缤");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(3000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;			
        case 6:
           if (cm.getPlayer().getCSPoints(2)>=30000 && cm.getBossLog("希纳斯") >= 1) {
		    cm.gainNX(2,-30000);
                    cm.resetBossLog("希纳斯");
                    cm.sendOk("温馨提示：#b\r\n副本重置成功，勇士行动起来吧！");
		    cm.dispose();
                } else {
                    cm.sendOk("温馨提示：#b\r\n副本重置失败，抵用卷剩余不足(3000)或你还剩余次数.");
                    cm.dispose();
                }
            	    break;
        case 7:
	if( cm.haveItem(4310015,5) && (cm.getBossLog("进阶扎昆") > 1 || cm.getBossLog("进阶黑龙") > 1 || cm.getBossLog("品克缤") > 1)){
                    cm.resetBossLog("进阶扎昆");
                    cm.resetBossLog("进阶黑龙");
                    cm.resetBossLog("品克缤");
		    cm.gainItem(4310015,-5);
	    cm.sendOk("重置成功.祝你游戏愉快!");
	    cm.dispose();
} else {
	    cm.sendOk("你没有带来斗神证物x5(BOSS获得)\r\n或你的挑战次数还没有使用完哦");
	    cm.dispose();
}
            break;
        }
    }
}