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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Red Sign - 101st Floor Eos Tower (221024500)
-- By ---------------------------------------------------------------------------------------------
	Stereo/xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Adapted to LudiPQ Red Sign NPC by xQuasar
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

var status = 0;

var minLevel = 35;
var maxLevel = 65;

var minPartySize = 6;
var maxPartySize = 6;

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
			if (cm.getParty() == null) { // No Party
				cm.sendOk("How about you and your party members collectively beating a quest? Here you'll find obstacles and problems where you won't be able to beat it unless with great teamwork. If you want to try it, please tell the #bleader of your party#k to talk to me.\r\n\r\n#rRequirements: " + minPartySize + " Party Members, all between level " + minLevel + " and level " + maxLevel + ".");
				cm.dispose();
			} else if (!cm.isLeader()) { // Not Party Leader
				cm.sendOk("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
				cm.dispose();
			} else {
				// Check if all party members are within PQ levels
				var party = cm.getParty().getMembers();
				var mapId = cm.getPlayer().getMapId();
				var next = true;
				var levelValid = 0;
				var inMap = 0;
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
						levelValid += 1;
					} else {
						next = false;
					}
					if (cPlayer.getMapid() == mapId) {
						inMap += 1;
					}
				}
				if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
					next = false;
				}
				if (next) {
					var em = cm.getEventManager("LudiPQ");
					if (em == null) {
						cm.sendOk("The Ludibrium PQ has encountered an error. Please report this on the forums, with a screenshot.");
					} else {
						if (em.getProperty("entryPossible") != "false") {
							// Begin the PQ.
							em.startInstance(cm.getParty(), cm.getPlayer().getMap());
							// Remove Passes and Coupons
							if (cm.getPlayer().getEventInstance() == null) {
								cm.sendOk("The Ludibrium PQ has encountered an error. Please report this on the forums, with a screenshot.");
								cm.dispose();
							} else {
								//var party2 = cm.getPlayer().getEventInstance().getPlayers();
								cm.removeAll(4001022);
								cm.removeAll(4001023); 
								// Mimicking exact GMS behavior, only removes from leader
								if(cm.partyMemberHasItem(4001022) || cm.partyMemberHasItem(4001023)) { 
								cm.getPlayer().getEventInstance().setProperty("smugglers", "true"); 
								cm.partyNotice("Your smuggling attempt has been detected. We will allow the attempt, but you will not get any NX cash from this run.");

								}
								cm.getPlayer().getEventInstance().setProperty("startTime", new java.util.Date().getTime());
								em.setProperty("entryPossible", "false");
							}
						} else {
							cm.sendNext("Another party has already entered the #rParty Quest#k in this channel. Please try another channel, or wait for the current party to finish.");
						}
					}
					cm.dispose();
				} else {
					cm.sendNext("Your party is invalid. Please adhere to the following requirements:\r\n\r\n#rRequirements: " + minPartySize + " Party Members, all between level " + minLevel + " and level " + maxLevel + ".");
					cm.dispose();
				}
			}
		}
	}
}
