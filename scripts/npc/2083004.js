/*
This file is part of the cherry Maple Story Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
	Matthias Butz <matze@cherry.de>
	Jan Christian Meyer <vimes@cherry.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

importPackage(java.lang);
importPackage(net.sf.cherry.server);
importPackage(net.sf.cherry.tools);

var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("I applaud your wise decision, Horntail is only for the most courageous of us all!");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		
		if (status == 0) {
			if (cm.getSquadState(MapleSquadType.HORNTAIL) == 0) {
				cm.sendYesNo("Horntail's power can only be beaten by the best. A courageous leader is required. Would you like to lead the squad to victory?");
			} else if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
				if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
					cm.sendSimple("What would you like to do?\r\n#b#L1#View the squad members#l\r\n#L2#Close registrations#l\r\n#L3#Start the fight#l\r\n#L4#Disband the squad#l\r\n");
					status = 19;
				} else if (cm.isSquadMember(MapleSquadType.HORNTAIL)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
					var toSend = "The following warriors are ready to fight Horntail:\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						if (i == 1) {
							toSend += "#L" + i + "##rNo. " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l#k" + "\r\n";
						}
						else {
							toSend += "#L" + i + "#No. " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l" + "\r\n";
						}
					}
					cm.sendSimple(toSend);
					cm.dispose();
					return;
				} else {
					cm.sendYesNo("Would you like to join the Horntail squad? Victorious warriors are looked upon greatly and will recieve immense rewards!");
					status = 9;
				}
			} else if (cm.getSquadState(MapleSquadType.HORNTAIL) == 2) {
				if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
					cm.sendSimple("What would you like to do?\r\n#L1#View current squad members#l\r\n#L2#Open registrations#l\r\n#L3#Start the fight!#l");
					status = 19;
				} else if (cm.isSquadMember(MapleSquadType.HORNTAIL)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
					var toSend = "The following members make up the squad:\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "#L" + i + "# " + i + " - " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l" + "\r\n";
					}
					cm.sendSimple(toSend);
					cm.dispose();
				} else {
					cm.sendOk("Sorry but the squad has closed registrations to enable more warriors to fight Horntail.");
					cm.dispose();
					return;
				}
			} else {
				cm.sendOk("The battle against Horntail has begun. You must await their completion before you can go further!");
				cm.dispose();
				return;
			}
		} else if (status == 1) {
			if (cm.createMapleSquad(MapleSquadType.HORNTAIL) != null) {
				cm.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, cm.getPlayer().getName() + " has been appointed the leader of the Horntail Squad. Please apply now if you would like to join " + cm.getPlayer().getName() + " in defeating Horntail!"));
				cm.sendOk("The Horntail Squad has been created, tell your members to signup now. Talk to me again if you would like to to view the current team, close registrations, or start the fight!");
				cm.dispose();
				return;
			} else {
				cm.sendOk("Please make sure a squad hasn't already been created!");
				cm.dispose();
				return;
			}
		} else if (status == 10) {
				if (cm.numSquadMembers(MapleSquadType.HORNTAIL) > 29) {
					cm.sendOk("Sorry, the Honrtail squad is full.");
					cm.dispose();
				} else {
					if (cm.canAddSquadMember(MapleSquadType.HORNTAIL)) {
						cm.addSquadMember(MapleSquadType.HORNTAIL);
						cm.sendOk("You have signed up, please wait for further instructions from your squad leader.");
						cm.dispose();
					} else {
						cm.sendOk("Sorry, but the leader has stopped you from joining!");
						cm.dispose();
					}
				}
		} else if (status == 20) {
			if (selection == 1) {
				var noOfChars = cm.numSquadMembers(MapleSquadType.HORNTAIL);
				var toSend = "The following warriors are ready to fight Horntail:\r\n";
				for (var i = 1; i <= noOfChars; i++) {
					if (i == 1) {
						toSend += "#L" + i + "##rNo. " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l#k" + "\r\n";
					}
					else {
						toSend += "#L" + i + "#No. " + i + ": " + cm.getSquadMember(MapleSquadType.HORNTAIL, i - 1).getName() + "#l" + "\r\n";
					}
				}
				cm.sendSimple(toSend);
			} else if (selection == 2) {
				if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
					cm.setSquadState(MapleSquadType.HORNTAIL, 2);
					cm.sendOk("Registrations have been closed, please talk to me again to start the fight or to re-open them.");
				} else {
					cm.setSquadState(MapleSquadType.HORNTAIL, 1);
					cm.sendOk("Registrations have been opened, please talk to me again to start the fight or to close them.");
				}
				cm.dispose();
				return;
			} else if (selection == 3) {
				if (cm.numSquadMembers(MapleSquadType.HORNTAIL) < 5) {
					cm.sendOk("You need to rethink your strategy. You'll need at least 5 warriors to begin the fight against the mighty Horntail!");
					cm.dispose();
					return;
				} else {
					cm.sendOk("I wish you the best of luck on defeating Horntail.");
					status = 29;
				}
			} else if (selection == 4) {
				if (cm.checkSquadLeader(MapleSquadType.HORNTAIL)) {
					cm.removeMapleSquad(MapleSquadType.HORNTAIL);
				} else {
					cm.dispose();
					return;
				}
			}
		} else if (status == 21) {
			if (selection > 0) {
				cm.removeSquadMember(MapleSquadType.HORNTAIL, selection - 1, true);
				cm.sendOk("The selected member has been banned.");	
				cm.dispose();
				return;
			} else {
				if (cm.getSquadState(MapleSquadType.HORNTAIL) == 1) {
					cm.sendSimple("What would you like to do?\r\n#L1#View the squad members#l\r\n#L2#Close registrations#l\r\n#L3#Start the fight#l");
				} else {
					cm.sendSimple("What would you like to do?\r\n#L1#View the squad members#l\r\n#L2#Open registrations#l\r\n#L3#Start the fight#l");
				}	
				status = 19;
			}
		} else if (status == 30) {
			cm.setSquadState(MapleSquadType.HORNTAIL, 3);
			cm.warpSquadMembers(MapleSquadType.HORNTAIL, 240060000);
			cm.setSquadBossLog(MapleSquadType.HORNTAIL, 'HORNTAIL');
			cm.dispose();
			return;
		}
	}
}
