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

/*
@	Author: Santa / DestinyMS
@	Name: GMS-like Gachapon
	Kerning City
 */

var status = 0;

var prizes = new Array(2040402, 2022130, 4130014, 2000004, 2000005, 2022113, 1322008, 1302021, 1322022, 1302013, 1051010, 1060079, 1002005, 1002023, 1002085, 1332017, 1322010, 1051031, 1002212, 1002117, 1040081, 1051037, 1472026, 1332015, 1041060, 1472003, 1060086, 1060087, 1472009, 1060051, 1041080, 1041106, 1092018);
var prizes1 = Math.floor(Math.random()*prizes.length);

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 1 && mode == 0) {
			cm.sendOk("See you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.haveItem(5220000)) {
				cm.sendYesNo("You have some #bGachapon Tickets#k there.\r\nWould you like to try your luck?");
			} else {
				cm.sendOk("Here is #bGachapon#k.");
				cm.dispose();
			}
		} else if (status == 1 && mode == 1) {
			var win = prizes[prizes1];
			if (cm.canHold(win)) {
				cm.gainItem(5220000, -1);
				if (win >= 1000000 && win <= 1999999) {
					cm.gainItem(win, 1, true);
				} else {
					cm.gainItem(win, 1);
				}
				cm.sendOk("Ka-thump! An item dropped out of #rGachapon#k.");
			} else {
				cm.sendNext("Your Equip, Use, Setup or Etc. inventories seem to be full... please check them and try again.");
			}
			cm.dispose();
		} else {
			cm.sendOk("See you next time.");
			cm.dispose();
		}
	}
}
