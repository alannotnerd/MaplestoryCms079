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
	T-1337 - NLC -> Kerning City warper
-- By ---------------------------------------------------------------------------------------------
	xQuasar
---------------------------------------------------------------------------------------------------
**/

var cost = 6000;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
	} else {
		if(mode == 1) {
			status++;
		}
		if(mode == 0) {
			cm.sendOk("You must have some business to take care of here, right? Bzzzt.");
			cm.dispose();
			return;
		}
		if(status == 0) {
			cm.sendYesNo("Bzzzt. I can take you to #bKerning City#k instantly. It'll still cost you #b"+cost+" mesos#k. Are you sure you want to go to #bKerning City#k?");
		} else if(status == 1) {
			if(cm.getMeso() >= cost) {
				cm.warp(103000100,0);
				cm.gainMeso(-cost);
			} else {
				cm.sendOk("Are you sure you have #b"+cost+" mesos#k?");
			}
			cm.dispose();
		}
	}
}
