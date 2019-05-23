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
            cm.sendSimple("Welcome to the AMS Reward System. \n\
You currently have #b" + cm.getPlayer().getPoints() + "#k  Reward Points.  #l\r\n\
You can earn points by doing surveys, voting, offers, and more on http://ams.arberb.com . #l\r\n\
Please note rewards are non refundable. #l\r\n\Select a reward you want #b\r\n#L0#10 Mill Mesos (5 reward points) #l\r\n#L1#Maroon Mop (30 reward points)#l\r\n#L2#5k NX (5 reward points)#l\r\n#L3#1 White Scroll (1 reward points)#l\r\n#L4#Godly +999 Stat Pendant (250 reward points)#l\r\n"); 
        } else if (selection == 0) {
            if (cm.getPoints() >= 5) {
		    	cm.removePoints(5);
            	cm.gainMeso(10000000);
            	cm.sendOk("Thank you! see you later #h # ");
            } else {
            	cm.sendOk("I'm sorry but you don't have enough Reward Points!");
            }
            cm.dispose();
		}  else if (selection == 1) {
			if (cm.getPoints() >= 30) {
				cm.removePoints(30);
				cm.gainItem(1442023);
				cm.sendOk("Thank you! see you later #h # ");
			} else {
				cm.sendOk("I'm sorry but you don't have enough Reward Points!");
			}
			cm.dispose();
        } else if (selection == 2) {
			if (cm.getPoints() >= 5) {
				cm.removePoints(5);
				cm.modifyNX(5000, 0);
				cm.sendOk("Thank you! see you later #h # ");
			} else {
				cm.sendOk("I'm sorry but you don't have enough Reward Points!");
			}
			cm.dispose();
		} else if (selection == 3){	
			if (cm.getPoints() >= 1) {
				cm.removePoints(1);
				cm.gainItem(2340000);
				cm.sendOk("Thank you! see you later #h # ");
			} else {
				cm.sendOk("I'm sorry but you don't have enough Reward Points!");
			}
		} else if (selection == 4){	
			if (cm.getPoints() >= 250) {
				cm.removePoints(300);
				cm.gainItem(1122006);
				cm.sendOk("Thank you! see you later #h # ");
			} else {
				cm.sendOk("I'm sorry but you don't have enough Reward Points!");
			}
		} else {
			cm.sendOk("You know have #b" + cm.getPlayer().getPoints() + "#k reward points after leaving the store. Happy Mapling!!");
			cm.dispose();
		}
	}
}
  