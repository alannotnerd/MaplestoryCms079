/* Bowman Job Instructor (OUTSIDE)
	Bowman 2nd Job Advancement
	warning street - on the road to the dungeon: 106010000
*/

/** 
Made by xQuasar
**/

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if ((status == 0 || status == 1) && mode == 0) {
		cm.sendOk("I suggest you stock up on supplies before entering.");
		cm.dispose();
	} else if (status == -1) {
		if (cm.haveItem(4031010) && (!cm.haveItem(4031013))) {
			status = 0;
			cm.sendNext("Ah, Athena Pierce sent you here?");
		} else if (cm.haveItem(4031010) && cm.haveItem(4031013)) {
			cm.sendOk("Hmm? You already have Dark Marbles in your inventory... please drop them all before talking to me again.");
			cm.dispose();
		} else {
			cm.sendOk("The path of a Bowman is a path of utmost danger...");
			cm.dispose();
		}
	} else if (status == 0) {
		status = 1;
		cm.sendYesNo("Would you like to go and attempt the test now? Inside are monsters that you will have to defeat to gain Dark Marbles from. Once you have collected 30, talk to the other instructor inside to gain the Proof of a Hero and complete the test.");
	} else if (status == 1) {
		status = 2;
		cm.sendOk("Alright, in you go. Good luck! If you die or disconnect while doing the test, you'll have to go back to Athena Pierce for another Letter.");
	} else if (status == 2) {
		cm.gainItem(4031010,-1);
		cm.warp(108000100,0);
		cm.dispose();
	} else {
		cm.dispose();
	}
}