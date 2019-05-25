/* Dawnveil
    [Ellinel Fairy Academy] Dr. Betty's Measures
	Headmistress Ivana
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
	if (mode == 1)
	    status++;
	 else
	    status--;
	if (status == 0) {
	    qm.sendNext("I have studied the magical forests around the academy a great deal. It's difficult to navigate, but I created a tool that can help you at least identify which directions sounds are coming from.\r\n\r\n#i4033830# #b#t4033830#");	
	} else if (status == 1) { 
	    qm.sendAcceptDecline("I'm not sure how helpful it will be, but it's better than nothing. Now, I've got to go before my lab explodes.\r\n\r\n#b(You will move to Ellinel Fairy Academy if you accept.)");
	} else if (status == 2) { 
	    qm.forceStartQuest();
		qm.warp(101071300,0);
		qm.gainItem(4033830,1);
		qm.dispose();
	}
}

function end(mode, type, selection) {
if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
	    qm.sendNext("Welcome back. Did the girls in Ellinia help you?",4);
	} else if (status == 1) {
	    qm.sendNextPrev("(You show them Dr. Betty's device.)",2);
	} else if (status == 2) {
	   	qm.sendNextPrev("Are you suggesting we befoul our forest with this filthy, foul item from the corrupted human civilization? Never!",4,1500002);
	} else if (status == 3) {
	    qm.sendNextPrev("There's no other option at this point, Faculty Head Kalayan.",4,1500009);
	} else if (status == 4) {
	    qm.sendNextPrev("Rowen is right. We have to find those children!",4,1500008);
	} else if (status == 5) {
	    qm.sendNextPrev("I cannot say that I am fond of the idea, but we have no other options.",4);
	} else if (status == 6) {
	    qm.sendNextPrev("Fine. But this is on YOUR wings if it pollutes our forest...",4,1500002);
	} else if (status == 7) {
	    qm.sendNextPrev("Everyone, please stay quiet for a minute. I'm going to turn it on.",4,1500000);
	} else if (status == 8) {
	    qm.introEnableUI(1);
		qm.introDisableUI(true);
		qm.sendNext("......",4,1500000);
	} else if (status == 9) {
        qm.sendNext("Wow, I can hear the whole forest!",4,1500000);
		qm.topMsg("*Chirp*");
	} else if (status == 10) {
	    qm.sendNext("???",4,1500000); 
		qm.topMsg("*Hoot*");
    } else if (status == 11) {
	    qm.sendNext("What's wrong with this thing? Why is it only recording useless noises?",4,1500002);
	} else if (status == 12) {
	    qm.sendNextPrev("Shh... Be quiet.",4,1500009);
		qm.topMsg("P-p-p-p-please help us... Boo hoo...");
	} else if (status == 13) {
	    qm.sendNext("That voice!",4);
	} else if (status == 14) {
	    qm.sendNextPrev("It's coming from out back!",4,1500000); 
	} else if (status == 15) {
	    qm.sendNext("Be patient, children! I will save you right now!",4,1500002);
	} else if (status == 16) {
	    qm.sendNextPrev("Arwen, we should help.",4,1500009);
	} else if (status == 17) {
	    qm.sendNext("Everyone, please wait!",4);
	} else if (status == 18) {
	    qm.introEnableUI(0);
		qm.introDisableUI(false);
	    qm.completeQuest();
	    qm.dispose();		
	}
  }
}