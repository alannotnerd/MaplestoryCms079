var rewards = Array(3010073, 3010854, 3010511, 3010795, 3010660);
var expires = Array(-1, -1, -1, -1, -1);//时间
var quantity = Array(1, 1, 1, 1, 1);//个数
var needed = Array(50, 50, 50, 50, 50);//需要的数量
var gender = Array(2, 0, 1, 2, 2, 2, 2, 2);
var status = -1;
var map;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
        for (var i = 3994059; i < 3994085; i++) {
	    cm.givePartyItems(i, 0, true);
	}
    }
    switch(cm.getPlayer().getMapId()) {
	case 100000000:
	case 101000000:
	case 102000000:
	case 103000000:
	case 104000000:
	case 120000000:
	case 211000000:
	case 250000000:
	case 220000000:
	case 200000000:
	case 261000000:
	case 500000000:
	case 600000000:
	case 680000000:
	case 701000000:
	case 702000000:
	case 740000000:
	case 741000000:
	case 742000000:
	case 800000000:
    	    if (status == 0) {
			map = cm.getSavedLocation("ENGLISH");
	        cm.sendSimple("安安 我是菇菇博士 #b英文村的菇菇博士!\r\n\r\n#L0#我要前往英文村#l\r\n#L1#我要兌換東西#l\r\n#L2#什麼是英文村?#l");
    	    } else if (status == 1) {
	        if (selection == 0) {
			cm.saveLocation("ENGLISH");
		    cm.warp(702090400,0);
		    cm.dispose();
		} else if (selection == 1) {
		    var selStr = "快来兑换你想要的物品把. \r\n\r\n#b";
		    for (var i = 0; i < rewards.length; i++) {
			selStr += "#L" + i + "##v" + rewards[i] + "##t" + rewards[i] + "# x " + quantity[i] + " #r(" + needed[i] + " 乖寶寶印章)#b#l\r\n";
		    }
		    cm.sendSimple(selStr);
		} else if (selection == 2) {
		    cm.sendNext("#b[英文村]#k 自己#e#rGoogle#k!");
		    cm.dispose();
		}
	    } else if (status == 2) {
	        if (!cm.haveItem(4001137, needed[selection])) {
		    cm.sendNext("您沒有#b#t4001137##k");
		} else if (!cm.canHold(rewards[selection], 1)) {
		    cm.sendNext("請空出一些空間。");
		} else {
		    cm.gainItem(4001137, -needed[selection]);
		    if (expires[selection] > 0) {
			cm.gainItemPeriod(rewards[selection], quantity[selection], expires[selection]);
		    } else {
			cm.gainItem(rewards[selection], quantity[selection]);
		    }
		}
		cm.dispose();
            }
	    break;
	case 702090400:
    	    if (status == 0) {
	        cm.sendSimple("Hello~I am Dr.P of #bEnglish School!\r\n\r\n#L0#前往英文村 - 簡單#l\r\n#L1#前往英文村 - 中級#l\r\n#L2#前往英文村 - 困難#l\r\n#L3#我要回去了。#l");
    	    } else if (status == 1) {
	        if (selection == 0 || selection == 1 || selection == 2) {
   		    var em = cm.getEventManager("English");
    		    if (em == null) {
			cm.sendOk("請再嘗試一次。");
			cm.dispose();
			return;
    		    }
		    if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
			cm.sendOk("隊長必須在這裡。");
		    } else {
			var party = cm.getPlayer().getParty().getMembers();
			var mapId = cm.getPlayer().getMapId();
			var next = true;
			var size = 0;
			var it = party.iterator();
			while (it.hasNext()) {
				var cPlayer = it.next();
				var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if (ccPlayer == null) {
					next = false;
					break;
				}
				size++;
			}	
			if (next && size >= 1) {
		    		if (em.getInstance("English" + selection) == null) {
					em.startInstance_Party("" + selection, cm.getPlayer());
		    		} else {
					cm.sendOk("已經有另外一個隊伍正在挑戰了。");
		    		}
			} else {
				cm.sendOk("隊伍成員必須全部在這裡。");
			}
		    }
		} else if (selection == 3) {
            var map = cm.getSavedLocation("ENGLISH");
            if (map == undefined)
             map = 100000000;
            cm.warp(map, parseInt(Math.random() * 5));
			cm.clearSavedLocation("ENGLISH");
            cm.dispose();
		}
	        cm.dispose();
            }
	    break;
    }
}