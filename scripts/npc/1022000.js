/* Dances with Balrog */
/** Made by xQuasar **/

var status;

function start() {
	status = -1;
	action(1,0,0);
	}
	
function action(mode,type,selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (mode == 0) {
			cm.sendOk("...");
			cm.dispose();
	} else if (status == -1) {
		if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BEGINNER)) {
			status = 0;
			cm.sendNext("You may be able to become a Warrior. Let's see...");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WARRIOR)) {
			status = 2;
			cm.sendNext("You might be ready for your second job advancement. Let's see...");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN)) {
			status = 4;
			cm.sendNext("You may be ready for your third job advancement. Let's see...");
		} else {
			cm.sendOk("I can teach you all about the path of a Warrior...");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getStr() <= 34) {
			cm.sendOk("Hmm... you are not quite ready yet. Come back when you're at least level 10 and have 35 STR, okay?");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("Yes, you seem ready to become a Warrior. Would you like to become a Warrior?");
		}
	} else if (status == 1) {
		cm.changeJob(net.sf.cherry.client.MapleJob.WARRIOR);
		cm.sendOk("Congratulations! You're now a Warrior. Train hard, and when you reach level 30, come and talk to me again.");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("Hmm... you aren't quite ready yet. Come back when you're level 30, okay?");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("I see... You have passed the test...");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031008)) {
			cm.sendOk("Come on, let's get moving. Go and see the Warrior job instructor, he's somewhere around in the valley...");
			cm.dispose();
		} else {
			cm.sendOk("The progress you have made is astonishing. It's time for you to take your next step. Here, take this letter and go to the Warrior job instructor somewhere around in the valley. Pass the test, and bring back your proof to become a Fighter, a Page or a Spearman.");
			cm.gainItem(4031008,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("Are you sure you want to become a Fighter?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("Are you sure you want to become an Page?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("Are you sure you want to become a Spearman?");
		} else {
		cm.sendSimple("Now, what would you like to become?#b\r\n#L0#Fighter#l\r\n#L1#Page#l\r\n#L2#Spearman#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER) && cm.getLevel() >= 70){
			status = 5;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a Crusader?");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE) && cm.getLevel() >= 70){
			status = 6;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a White Knight?");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN) && cm.getLevel() >= 70){
			status = 7;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a Dragon Knight?");
		} else {
			cm.sendOk("Hmm... you aren't quite ready yet. Come back when you're level 70, okay?");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.cherry.client.MapleJob.CRUSADER);
		cm.sendOk("Congratulations! You're now a Crusader. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.cherry.client.MapleJob.WHITEKNIGHT);
		cm.sendOk("Congratulations! You're now a White Knight. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(net.sf.cherry.client.MapleJob.DRAGONKNIGHT);
		cm.sendOk("Congratulations! You're now a Dragon Knight. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(net.sf.cherry.client.MapleJob.FIGHTER);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now a Fighter. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(net.sf.cherry.client.MapleJob.PAGE);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now a Page. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(net.sf.cherry.client.MapleJob.SPEARMAN);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now a Spearman. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	}
}
