/* Grendel the Really Old */
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
			cm.sendNext("You may be able to become a Magician. Let's see...");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MAGICIAN)) {
			status = 2;
			cm.sendNext("You might be ready for your second job advancement. Let's see...");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD) ||
					cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC)) {
			status = 4;
			cm.sendNext("You may be ready for your third job advancement. Let's see...");
		} else {
			cm.sendOk("I can teach you all about the path of a Magician...");
			cm.dispose();
		}
	} else if (status == 0) {
		if (cm.getLevel() <= 7 || cm.getChar().getInt() <= 19) {
			cm.sendOk("Hmm... you are not quite ready yet. Come back when you're at least level 8 and have 20 INT, okay?");
			cm.dispose();
		} else {
			status = 1;
			cm.sendYesNo("Yes, you seem ready to become a Magician. Would you like to become a Magician?");
		}
	} else if (status == 1) {
		cm.changeJob(net.sf.cherry.client.MapleJob.MAGICIAN);
		cm.sendOk("Congratulations! You're now a Magician. Train hard, and when you reach level 30, come and talk to me again.");
		cm.dispose();
	} else if (status == 2) {
		if (cm.getLevel() <= 29) {
			cm.sendOk("Hmm... you aren't quite ready yet. Come back when you're level 30, okay?");
			cm.dispose();
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031012)) {
			status = 3;
			cm.sendNext("I see... You have passed the test...");
		} else if (cm.getLevel() >= 30 && cm.haveItem(4031009)) {
			cm.sendOk("Come on, let's get moving. Go and see the Magician job instructor, he's somewhere around the tree dungeons...");
			cm.dispose();
		} else {
			cm.sendOk("The progress you have made is astonishing. It's time for you to take your next step. Here, take this letter and go to the Magician job instructor somewhere around the tree dungeons. Pass the test, and bring back your proof to become an Fire/Poison Wizard, Ice/Lightning Wizard or a Cleric.");
			cm.gainItem(4031009,1);
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 0) {
			status = 8;
			cm.sendYesNo("Are you sure you want to become a Fire/Poison Wizard?");
		} else if (selection == 1) {
			status = 9;
			cm.sendYesNo("Are you sure you want to become an Ice/Lightning Wizard?");
		} else if (selection == 2) {
			status = 10;
			cm.sendYesNo("Are you sure you want to become a Cleric?");
		} else {
		cm.sendSimple("Now, what would you like to become?#b\r\n#L0#Fire/Poison Wizard#l\r\n#L1#Ice/Lightning Wizard#l\r\n#L2#Cleric#l#k");
		}
	} else if (status == 4) {
		if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD) && cm.getLevel() >= 70){
			status = 5;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a Fire/Poison Mage?");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD) && cm.getLevel() >= 70){
			status = 6;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become an Ice/Lightning Mage?");
		} else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC) && cm.getLevel() >= 70){
			status = 7;
			cm.sendYesNo("Yes, you are ready for your third job advancement. Would you like to become a Priest?");
		} else {
			cm.sendOk("Hmm... you aren't quite ready yet. Come back when you're level 70, okay?");
			cm.dispose();
		}
	} else if (status == 5) {
		cm.changeJob(net.sf.cherry.client.MapleJob.FP_MAGE);
		cm.sendOk("Congratulations! You're now a Fire/Poison Mage. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 6) {
		cm.changeJob(net.sf.cherry.client.MapleJob.IL_MAGE);
		cm.sendOk("Congratulations! You're now an Ice/Lightning Mage. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 7) {
		cm.changeJob(net.sf.cherry.client.MapleJob.PRIEST);
		cm.sendOk("Congratulations! You're now a Priest. Train hard, and when you reach level 120, come and talk to me again.");
		cm.dispose();
	} else if (status == 8) {
			cm.changeJob(net.sf.cherry.client.MapleJob.FP_WIZARD);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now a Fire/Poison Wizard. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	} else if (status == 9) {
			cm.changeJob(net.sf.cherry.client.MapleJob.IL_WIZARD);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now an Ice/Lightning Wizard. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	} else if (status == 10) {
			cm.changeJob(net.sf.cherry.client.MapleJob.CLERIC);
			cm.gainItem(4031012,-1);
			cm.sendOk("Congratulations! You're now a Cleric. Train hard, and when you reach level 70, come and talk to me again.");
			cm.dispose();
	}
}
