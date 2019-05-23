/* Dark Lord */
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
			cm.sendNext("You may be able to become a Thief. Let's see...");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THIEF)) {
			status = 2;
			cm.sendNext("You might be ready for your second job advancement. Let's see...");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT)) {
			status = 4;
			cm.sendNext("You may be ready for your third job advancement. Let's see...");
		} else {
			cm.sendOk("I can teach you all about the path of a Thief...");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 9 || cm.getChar().getDex() <= 24) {
			cm.sendOk("Hmm... you are not quite ready yet. Come back when you're at least level 10 and have 25 DEX, okay?");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("Yes, you seem ready to become a Thief. Would you like to become a Thief?");
		}
	} else if (status == 1) {
		cm.changeJob(net.sf.cherry.client.MapleJob.THIEF);
		cm.sendOk("Congratulations! You're now a Thief. Train hard, and when you reach level 30, come and talk to me again.");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("Hmm... you aren't quite ready yet. Come back when you're level 30, okay?");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("I see... You have passed the test...");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031011)) {
			cm.sendOk("Come on, let's get moving. Go and see the Thief job advance instructor, he's somewhere around the contruction sites...");
			cm.dispose();
		} else {
			cm.sendOk("The progress you have made is astonishing. It's time for you to take your next step. Here, take this letter and go to the Thief job advancement instructor somewhere around the contruction sites. Pass the test, and bring back your proof to become an Assassin or a Bandit.");
			cm.gainItem(4031011,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("Are you sure you want to become an Assassin?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("Are you sure you want to become a Bandit?");
		} else {
		cm.sendSimple("Now, what would you like to become?#b\r\n#L0#Assassin#l\r\n#L1#Bandit#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN) && cm.getLevel() >= 70){
			status = 5;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a Hermit?");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT) && cm.getLevel() >= 70){
			status = 6;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a Chief Bandit?");
		} else {
			cm.sendOk("Hmm... you aren't quite ready yet. Come back when you're level 70, okay?");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.cherry.client.MapleJob.HERMIT);
		cm.sendOk("Congratulations! You're now a Hermit. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.cherry.client.MapleJob.CHIEFBANDIT);
		cm.sendOk("Congratulations! You're now a Chief Bandit. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(net.sf.cherry.client.MapleJob.ASSASSIN);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now an Assassin. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(net.sf.cherry.client.MapleJob.BANDIT);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now a Bandit. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	}
}
