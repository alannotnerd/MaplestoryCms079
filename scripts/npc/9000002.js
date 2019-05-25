// NPC Name: Pietro
// NPC Purpose: JQ Rewards
// Found at map 109050000
// MrDk/Sweeply

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("Talk to me to receive a small prize!");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(5220001)) {
				cm.sendNext("Congratulations #e#h ##n! You've reached the end of this event! You can exchange your #bEvent Ticket#k for a small prize!");
			} else {
				cm.warp("100000000");
				cm.dispose();
			}
		} else if (status == 1) {
			cm.sendSimple("Pick what you would like to have:\r\n#L0#Parts for a Seal Chair#l\r\n#L1#30% Weapon scroll(s)#l");
		} else if (status == 2) {
			var quantity;
			var rand;
			if (selection == 0) {
				rand = 1 + Math.floor(Math.random() * 7);
				quantity = Math.floor((Math.random() * 2) + 1);
				cm.sendNext("Thank you for participating in the event!\r\nSee you next time!");
				if (rand == 1) {
					cm.gainItem(4001038, quantity); // Stump Eraser Real
				} else if (rand == 2) {
					cm.gainItem(4001039, quantity); // Mushmom Eraser Real
				} else if (rand == 3) {
					cm.gainItem(4001040, quantity); // Lupin Eraser Real
				} else if (rand == 4) {
					cm.gainItem(4001041, quantity); // Wraith Eraser Real
				} else if (rand == 5) {
					cm.gainItem(4001042, quantity); // Slime Eraser Real
				} else if (rand == 6) {
					cm.gainItem(4001043, quantity); // Octopus Real
				} else if (rand == 7) {
					cm.gainItem(4001116, quantity); // Hectagon Necklace
				}
				cm.gainItem(5220001,-1);
				cm.warp(100000000);
				cm.dispose();
			} else if (selection == 1) {
				quantity = Math.floor((Math.random() * 3) + 1);
				rand = 1 + Math.floor(Math.random() * 16);
				cm.sendNext("Thank you for participating in the event!\r\nSee you next time!");
				if (rand == 1) {
					cm.gainItem(2044705, quantity); // 30% Claw attack
				} else if (rand == 2) {
					cm.gainItem(2043005, quantity); // 30% 1h-Sword attack
				} else if (rand == 3) {
					cm.gainItem(2044005, quantity); // 30% 2h-Sword attack
				} else if (rand == 4) {
					cm.gainItem(2044405, quantity); // 30% Pole Arm attack
				} else if (rand == 5) {
					cm.gainItem(2044305, quantity); // 30% Spear attack
				} else if (rand == 6) {
					cm.gainItem(2043205, quantity); // 30% 1h-BW attack
				} else if (rand == 7) {
					cm.gainItem(2044205, quantity); // 30% 2h-BW attack
				} else if (rand == 8) {
					cm.gainItem(2044605, quantity); // 30% Crossbow attack
				} else if (rand == 9) {
					cm.gainItem(2044505, quantity); // 30% Bow attack
				} else if (rand == 10) {
					cm.gainItem(2044904, quantity); // 30% Gun attack
				} else if (rand == 11) {
					cm.gainItem(2044804, quantity); // 30% Knuckler attack
				} else if (rand == 12) {
					cm.gainItem(2049100, 1); // Chaos scroll
				} else if (rand == 13) {
					cm.gainItem(2043105, quantity); // 30% 1h-Axe
				} else if (rand == 14) {
					cm.gainItem(2044105, quantity); // 30% 2h-Axe
				} else if (rand == 15) {
					cm.gainItem(2043007, quantity); // 30% 1h Sword m.att
				} else if (rand == 16) {
					cm.gainItem(2043305, quantity); // 30% Dagger scroll
				}
				cm.gainItem(5220001,-1);
			}
		} else if (status == 3) {
			cm.warp(100000000);
			cm.dispose();
		}
	}
}