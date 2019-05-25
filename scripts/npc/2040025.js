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
	Second Eos Rock - Ludibrium : Eos Tower 71st Floor (221022900)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var map;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status >= 0 && mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		if (cm.haveItem(4001020)) {
			cm.sendSimple("You can use #bEos Rock Scroll#k to activate #bSecond Eos Rock#k. Which of these rocks would you like to teleport to?#b\r\n#L0#First Eos Rock (100th Floor)#l\r\n#L1#Third Eos Rock (41st Floor)#l");
		} else {
			cm.sendOk("There's a rock that will enable you to teleport to #bFirst Eos Rock or Third Eos Rock#k, but it cannot be activated without the scroll.");
			cm.dispose();
		}
	} else if (status == 1) {
		if (selection == 0) {
			cm.sendYesNo("You can use #bEos Rock Scroll#k to activate #bSecond Eos Rock#k. Will you teleport to #bFirst Eos Rock#k at the 100th Floor?");
			map = 221024400;
		} else {
			cm.sendYesNo("You can use #bEos Rock Scroll#k to activate #bSecond Eos Rock#k. Will you teleport to #bThird Eos Rock#k at the 41st Floor?");
			map = 221021700;
		}
	} else if (status == 2) {
		cm.gainItem(4001020, -1);
		cm.warp(map, 3);
		cm.dispose();
		}
	}
}
