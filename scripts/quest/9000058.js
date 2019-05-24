var status = -1;
var picked = 0;
var state = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        cm.sendSimple("開店可以擺飛鏢或彈丸哦~\r\n#b#L0#我要領取黑色小豬#l\r\n#b#L1#我要領取禮包#l\r\n#b#L2#我要打開藍色小箱子#l\r\n#b#L3#當鋪裡的大蟾蜍錢包(100等以上才能領)解未來東京任務用#l\r\n#b#L4#我要騎銀色豬豬!!#l\r\n#b#L5#我要進行忍影瞬殺的任務(四轉盜賊限定)#l\r\n#b#L6#我要刪除銀或金寶箱空白道具(並且補償一次道具)#l\r\n#b#L7#我要完成燈泡不能接的任務#k");
    } else if (status == 1) {
        if (selection == 0) {
            	if (!cm.haveItem(5000007, 1, true, true) && cm.canHold(5000007,1)) {
                    cm.gainPet(5000007, "黑色小豬", 1, 0, 100, 0);
		}
            cm.dispose();
        } else if (selection == 1) {
            	if (!cm.haveItem(5030000, 1, true, true) && cm.canHold(5030000,1)) {
                    cm.gainItem(5030000, 1);
                }
            	if (!cm.haveItem(5100000, 1, true, true) && cm.canHold(5100000,1)) {
                    cm.gainItem(5100000, 1);
		}
            	if (!cm.haveItem(5370000, 1, true, true) && cm.canHold(5370000,1)) {
                    cm.gainItem(5370000, 1);
		}
            	if (!cm.haveItem(5520000, 1, true, true) && cm.canHold(5520000,1)) {
                    cm.gainItem(5520000, 1);
                }
            	if (!cm.haveItem(5180000, 1, true, true) && cm.canHold(5180000,1)) {
                    cm.gainItem(5180000, 1);
                }
            	if (!cm.haveItem(5170000, 1, true, true) && cm.canHold(5170000,1)) {
                    cm.gainItem(5170000, 1);
		}
            cm.dispose();
		} else if (selection == 2) {
                if (cm.haveItem(4031307, 1) == true)
                    {
                    cm.gainItem(4031307 ,-1);
                    cm.gainItem(2020020 ,100);
                    cm.sendOk("#b蛋糕不要吃太多~旅遊愉快~");
                    cm.dispose();
                    } else {
                    cm.sendOk("#b檢查一下背包有沒有藍色禮物盒哦");
                    cm.dispose();
                    }
        } else if (selection == 3) {
                var level = cm.getPlayerStat("LVL");
                if (level >= 100) {
                    cm.gainItem(5252002, 1);
                } else {
                    cm.sendOk("你的等級還不夠 菜逼巴");
		}
            cm.dispose();
        } else if (selection == 4) {
                var level = cm.getPlayerStat("LVL");                            
                if (cm.haveItem(4000264, 400) && cm.haveItem(4000266, 400) && cm.haveItem(4000267, 400) &&(level >= 120)) {

                    cm.gainItem(4000264 ,-400);
                    cm.gainItem(4000266 ,-400);
                    cm.gainItem(4000267 ,-400);                    
                    cm.gainItem(1902001 ,1);
                    cm.sendOk("#b好好珍惜野豬~~");
                    cm.dispose();
                    } else {
                    cm.sendOk("請檢查一下背包有沒有金色皮革４００個、木頭肩護帶４００個、骷髏肩護帶４００個,或者是你等級不夠");                  
                }
            cm.dispose();
        } else if (selection == 5) {
                 if (cm.getPlayerStat("LVL") >= 120 && cm.getJob() == 412) {
                    cm.warp(910300000, 3);
                    cm.spawnMonster(9300088, 6, -572, -1894)
                    cm.dispose();
        } else if (cm.getJob() == 422) {
                    cm.warp(910300000, 3);
                    cm.spawnMonster(9300088, 6, -572, -1894)
                    cm.dispose();
                    } else {
                    cm.sendOk("這是跟盜賊有關的事情哦,或者你沒有達到120等");
                    cm.dispose();
                }
        } else if (selection == 6) {
                 if (cm.haveItem(2070018)) {
                 cm.gainItem(2070018, -999);
                 cm.gainItem(5490000, 1);
                 cm.gainItem(4280000, 1);
                 cm.sendOk("恭喜你刪除完畢並補償了金寶箱");
                    cm.dispose();
        } else if (cm.haveItem(1432036)) {
                 cm.gainItem(1432036, -1);
                 cm.gainItem(5490001, 1);
                 cm.gainItem(4280001, 1);
                 cm.sendOk("恭喜你刪除完畢並補償了銀寶箱");
                    cm.dispose();
                    } else {
                    cm.sendOk("抱歉你沒有空白道具...");
                    cm.dispose();
            }
		} else if (selection == 7) {
			if (cm.getQuestStatus(29507) == 1) {
				cm.gainItem(1142082, 1);
				cm.forceCompleteQuest(29507);
			}
				cm.forceCompleteQuest(2127);
				cm.forceCompleteQuest(3083);
				cm.forceCompleteQuest(20527);
				cm.forceCompleteQuest(50246);
				cm.sendOk("完成任務。");
				cm.dispose();
			}
        }
    }