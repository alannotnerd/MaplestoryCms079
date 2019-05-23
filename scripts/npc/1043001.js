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
-- Odin JavaScript --------------------------------------------------------------------------------
	A Pile of Herbs - The Forest of Patience <Step 5> (101000104)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
*/

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 2 && mode == 0) {
			cm.sendOk("好的。下次再见！");
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		}
		else {
			status--;
		}
		if (status == 0) {
			if (cm.getQuestStatus(2051).equals(MapleQuestStatus.Status.STARTED) && !cm.haveItem(4031032)) {
				cm.gainItem(4031032, 1); // Double-Rooted Red Ginseng
				cm.warp(101000000, 0);
			}
			else {
				var rand = 1 + Math.floor(Math.random() * 4);
				if (rand == 1) {
					cm.gainItem(4020007, 2); // Diamond Ore
				}
				else if (rand == 2) {
					cm.gainItem(4020008, 2); // Black Crystal Ore
				}
				else if (rand == 3) {
					cm.gainItem(4010006, 2); // Gold Ore
				}
				else if (rand == 4) {
					cm.gainItem(1032013, 1); // Red-Hearted Earrings
				}
				cm.warp(101000000, 0);
			}
			cm.dispose();	
		}
	}
}	

