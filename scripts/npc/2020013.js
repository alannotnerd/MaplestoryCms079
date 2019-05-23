/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

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

/*  Pedro
	Pirate 3rd job advancement
	El Nath: Chief's Residence (211000001)
*/

importPackage(net.sf.cherry.client);

var status = 0;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.sendOk("Make up your mind and visit me again.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (!(cm.getJob().equals(MapleJob.GUNSLINGER) || cm.getJob().equals(MapleJob.BRAWLER))) {
				if ((cm.getJob().equals(MapleJob.OUTLAW) || cm.getJob().equals(MapleJob.MARAUDER)) && cm.getLevel() >= 120) {
					cm.sendOk("Please go visit #bSamuel#k. He resides in #bLeafre#k.");
					cm.dispose();
					return;
				} else {
					cm.sendOk("I have no business with you.");
					cm.dispose();
					return;
				}
			}
			if ((cm.getJob().equals(MapleJob.GUNSLINGER) || cm.getJob().equals(MapleJob.BRAWLER)) && cm.getLevel() >= 70 &&  cm.getChar().getRemainingSp() <= (cm.getLevel() - 70) * 3) {
				cm.sendYesNo("I knew this day would come eventually.\r\n\r\nAre you ready to become much stronger than ever before?");
			} else {
				cm.sendOk("Your time has yet to come...");
				cm.dispose();
			}
		} else if (status == 1) {
			if (cm.getJob().equals(MapleJob.GUNSLINGER)) {
				cm.changeJob(MapleJob.OUTLAW);
				cm.getChar().gainAp(5);
				cm.sendOk("You are now an #bOutlaw#k.\r\n\r\nNow go, with pride!");
				cm.dispose();
			} else if (cm.getJob().equals(MapleJob.BRAWLER)) {
				cm.changeJob(MapleJob.MARAUDER);
				cm.getChar().gainAp(5);
				cm.sendOk("You are now a #bMarauder#k.\r\n\r\nNow go, with pride!");
				cm.dispose();
			}
		}
	}
}	
