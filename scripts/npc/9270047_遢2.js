var status = -1;

function start() {
	if (cm.getPlayer().getMapId() == 551030200) {
		cm.sendYesNo("Would you like to get out?");
		status = 1;
		return;
	}
		if (cm.getPlayer().getLevel() < 90) {
			cm.sendOk("There is a level requirement of 90 to attempt Scarlion/Targa.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getClient().getChannel() != 2 && cm.getPlayer().getClient().getChannel() != 3 && cm.getPlayer().getClient().getChannel() != 4 && cm.getPlayer().getClient().getChannel() != 5) {
			cm.sendOk("Scarlion/Targa may only be attempted on channel 2,3,4,5.");
			cm.dispose();
			return;
		}
    var em = cm.getEventManager("ScarTarBattle");

    if (em == null) {
	cm.sendOk("The event isn't started, please contact a GM.");
	cm.dispose();
	return;
    }
    var eim_status = em.getProperty("state");
	    var marr = cm.getQuestRecord(160108);
	    var data = marr.getCustomData();
	    if (data == null) {
		marr.setCustomData("0");
	        data = "0";
	    }
	    var time = parseInt(data);
	if (eim_status == null || eim_status.equals("0")) {
    var squadAvailability = cm.getSquadAvailability("ScarTar");
    if (squadAvailability == -1) {
	status = 0;
	    if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("You have already went to Scarlion/Targa in the past 3 hours. Time left: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
		cm.dispose();
		return;
	    }
	cm.sendYesNo("Are you interested in becoming the leader of the expedition Squad?");

    } else if (squadAvailability == 1) {
	    if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("You have already went to Scarlion/Targa in the past 3 hours. Time left: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
		cm.dispose();
		return;
	    }
	// -1 = Cancelled, 0 = not, 1 = true
	var type = cm.isSquadLeader("ScarTar");
	if (type == -1) {
	    cm.sendOk("The squad has ended, please re-register.");
	    cm.dispose();
	} else if (type == 0) {
	    var memberType = cm.isSquadMember("ScarTar");
	    if (memberType == 2) {
		cm.sendOk("You been banned from the squad.");
		cm.dispose();
	    } else if (memberType == 1) {
		status = 5;
		cm.sendSimple("What would you like to do? \r\n#b#L0#Join the squad#l \r\n#b#L1#Leave the squad#l \r\n#b#L2#See the list of members on the squad#l");
	    } else if (memberType == -1) {
		cm.sendOk("The squad has ended, please re-register.");
		cm.dispose();
	    } else {
		status = 5;
		cm.sendSimple("What would you like to do? \r\n#b#L0#Join the squad#l \r\n#b#L1#Leave the squad#l \r\n#b#L2#See the list of members on the squad#l");
	    }
	} else { // Is leader
	    status = 10;
	    cm.sendSimple("What do you want to do, expedition leader? \r\n#b#L0#View expedition list#l \r\n#b#L1#Kick from expedition#l \r\n#b#L2#Remove user from ban list#l \r\n#r#L3#Select expedition team and enter#l");
	// TODO viewing!
	}
	    } else {
			var eim = cm.getDisconnected("ScarTarBattle");
			if (eim == null) {
				var squd = cm.getSquad("ScarTar");
				if (squd != null) {
	    if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("You have already went to Scarlion/Targa in the past 3 hours. Time left: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
		cm.dispose();
		return;
	    }
					cm.sendYesNo("The squad's battle against the boss has already begun.\r\n" + squd.getNextPlayer());
					status = 3;
				} else {
					cm.sendOk("The squad's battle against the boss has already begun.");
					cm.safeDispose();
				}
			} else {
				cm.sendYesNo("Ah, you have returned. Would you like to join your squad in the fight again?");
				status = 2;
			}
	    }
	} else {
			var eim = cm.getDisconnected("ScarTarBattle");
			if (eim == null) {
				var squd = cm.getSquad("ScarTar");
				if (squd != null) {
	    if (time + (3 * 3600000) >= cm.getCurrentTime() && !cm.getPlayer().isGM()) {
		cm.sendOk("You have already went to Scarlion/Targa in the past 3 hours. Time left: " + cm.getReadableMillis(cm.getCurrentTime(), time + (3 * 360000)));
		cm.dispose();
		return;
	    }
					cm.sendYesNo("The squad's battle against the boss has already begun.\r\n" + squd.getNextPlayer());
					status = 3;
				} else {
					cm.sendOk("The squad's battle against the boss has already begun.");
					cm.safeDispose();
				}
			} else {
				cm.sendYesNo("Ah, you have returned. Would you like to join your squad in the fight again?");
				status = 2;
			}
	}
}

function action(mode, type, selection) {
    switch (status) {
	case 0:
	    if (mode == 1) {
			if (cm.registerSquad("ScarTar", 5, " has been named the Leader of the squad. If you would you like to join please register for the Expedition Squad within the time period.")) {
				cm.sendOk("You have been named the Leader of the Squad. For the next 5 minutes, you can add the members of the Expedition Squad.");
			} else {
				cm.sendOk("An error has occurred adding your squad.");
			}
	    }
	    cm.dispose();
	    break;
	case 1:
	    if (mode == 1) {
		cm.warp(551030100, 0);
	    }
	    cm.dispose();
	    break;
	case 2:
		if (!cm.reAdd("ScarTarBattle", "ScarTar")) {
			cm.sendOk("Error... please try again.");
		}
		cm.safeDispose();
		break;
	case 3:
		if (mode == 1) {
			var squd = cm.getSquad("ScarTar");
			if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
				squd.setNextPlayer(cm.getPlayer().getName());
				cm.sendOk("You have reserved the spot.");
			}
		}
		cm.dispose();
		break;
	case 5:
	    if (selection == 0) { // join
		var ba = cm.addMember("ScarTar", true);
		if (ba == 2) {
		    cm.sendOk("The squad is currently full, please try again later.");
		} else if (ba == 1) {
		    cm.sendOk("You have joined the squad successfully");
		} else {
		    cm.sendOk("You are already part of the squad.");
		}
	    } else if (selection == 1) {// withdraw
		var baa = cm.addMember("ScarTar", false);
		if (baa == 1) {
		    cm.sendOk("You have withdrawed from the squad successfully");
		} else {
		    cm.sendOk("You are not part of the squad.");
		}
	    } else if (selection == 2) {
		if (!cm.getSquadList("ScarTar", 0)) {
		    cm.sendOk("Due to an unknown error, the request for squad has been denied.");
		}
	    }
	    cm.dispose();
	    break;
	case 10:
	    if (mode == 1) {
		if (selection == 0) {
		    if (!cm.getSquadList("ScarTar", 0)) {
			cm.sendOk("Due to an unknown error, the request for squad has been denied.");
		    }
		    cm.dispose();
		} else if (selection == 1) {
		    status = 11;
		    if (!cm.getSquadList("ScarTar", 1)) {
			cm.sendOk("Due to an unknown error, the request for squad has been denied.");
			cm.dispose();
		    }
		} else if (selection == 2) {
		    status = 12;
		    if (!cm.getSquadList("ScarTar", 2)) {
			cm.sendOk("Due to an unknown error, the request for squad has been denied.");
			cm.dispose();
		    }
		} else if (selection == 3) { // get insode
		    if (cm.getSquad("ScarTar") != null) {
			var dd = cm.getEventManager("ScarTarBattle");
dd.startInstance(cm.getSquad("ScarTar"), cm.getMap());
//			dd.startInstance(cm.getSquad("ScarTar"), cm.getMap(), 160108);
		    } else {
			cm.sendOk("Due to an unknown error, the request for squad has been denied.");
		    }
		    cm.dispose();
		}
	    } else {
		cm.dispose();
	    }
	    break;
	case 11:
	    cm.banMember("ScarTar", selection);
	    cm.dispose();
	    break;
	case 12:
	    if (selection != -1) {
		cm.acceptMember("ScarTar", selection);
	    }
	    cm.dispose();
	    break;
    }
}