/*
	This file is part of the cherry Maple Story Server
	Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@cherry.de>
					   Jan Christian Meyer <vimes@cherry.de>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation version 3 as published by
	the Free Software Foundation. You may not use, modify or distribute
	this program under any other version of the GNU Affero General Public
	License.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Spiegelmann: CPQ NPC
 */

var status = 0;

function start() {
	cm.sendOk("The Carnival PQ is currently under development.");
	cm.dispose();
	/*
	status = -1;
	action(1, 0, 0);
	*/
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if ((mode == 0 && status == 1) || (mode == 0 && status == 4)) {
			cm.sendOk("Come back once you have thought about it some more.");
			cm.dispose();
			return;
		}
	}
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (status == 0) {
			if (cm.getChar().getParty() != null) {
				cm.sendCPQMapLists();
			} else {
				cm.sendOk("You must be in a party!");
				cm.dispose();
			}
		} else if (status == 1) {
			if (cm.fieldTaken(selection)) {
				if (cm.fieldLobbied(selection)) {
					cm.challengeParty(selection);
					cm.dispose();
				} else {
					cm.sendOk("The room is taken.");
					cm.dispose();
				}
			} else {
				cm.CPQLobby(selection);
				cm.dispose();
			}
		}
	}
}
