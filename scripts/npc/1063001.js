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

/* NPC : A pile of blue flower
 * Location : Sleepywood, forest of patient
 */

importPackage(net.sf.cherry.client);

var itemSet = new Array(4020005, 4020006, 4020004, 4020001, 4020003, 4020000, 4020002);
var rand = Math.floor(Math.random() * itemSet.length);


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.warp(105040300);
            
            if (cm.getChar().getMapId() == 105040300) {
                if (cm.getQuestStatus(2052).equals(MapleQuestStatus.Status.STARTED) && !cm.haveItem(4031025)) {
                    cm.gainItem(4031025, 10);}
            } else {
                cm.gainItem(itemSet[rand], 2);
            }
            cm.dispose();
        }
    }
}
