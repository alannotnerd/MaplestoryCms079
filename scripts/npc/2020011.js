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

/* Arec
	Thief 3rd job advancement
	El Nath: Chief's Residence (211000001)

	Custom Quest 100100, 100102
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
		if (mode == 0 && status == 1) {
			cm.sendOk("Make up your mind and visit me again.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (!(cm.getJob().equals(MapleJob.ASSASSIN) ||
				cm.getJob().equals(MapleJob.BANDIT))) {
				cm.sendOk("May #rOdin#k be with you!");
				cm.dispose();
				return;
			}
			cm.completeQuest(100100);
			cm.completeQuest(100102);
			if (cm.getQuestStatus(100102).equals(MapleQuestStatus.Status.COMPLETED)) {
				cm.sendNext("#rBy Odin's ring!#k Indeed, you have proven to be worthy of the strength I will now bestow upon you.");
			} else if (cm.getQuestStatus(100102).equals(MapleQuestStatus.Status.STARTED)) {
				cm.sendOk("Go and find me the #rNecklace of Wisdom#k which is hidden on the Holy Ground at the Snowfield.");
				cm.dispose();
			} else if (cm.getQuestStatus(100100).equals(MapleQuestStatus.Status.COMPLETED)) {
				cm.sendNext("#rBy Odin's raven!#k I was right, your strength is truly excellent.");
			} else if (cm.getQuestStatus(100100).equals(MapleQuestStatus.Status.STARTED)) {
				cm.sendOk("Well, well. Now go and see #bthe Dark Lord#k. He will show you the way.");
				cm.dispose();
			} else if ((cm.getJob().equals(MapleJob.ASSASSIN) ||
				cm.getJob().equals(MapleJob.BANDIT)) &&
				cm.getLevel() >= 70 && 
				cm.getChar().getRemainingSp() <= (cm.getLevel() - 70) * 3) {
				cm.sendNext("#rBy Odin's beard!#k You are a strong one.");
			} else {
				cm.sendOk("Your time has yet to come...");
				cm.dispose();
			}
		} else if (status == 1) {
			if (cm.getQuestStatus(100102).equals(MapleQuestStatus.Status.COMPLETED)) {
				if (cm.getJob().equals(MapleJob.ASSASSIN)) {
					cm.changeJob(MapleJob.HERMIT);
					cm.getChar().gainAp(5);
					cm.sendOk("You are now a #bHermit#k. May #rOdin#k be with you!");
					cm.dispose();
				} else if (cm.getJob().equals(MapleJob.BANDIT)) {
					cm.changeJob(MapleJob.CHIEFBANDIT);
					cm.getChar().gainAp(5);
					cm.sendOk("You are now a #bChief Bandit#k. May #rOdin#k be with you!");
					cm.dispose();
				}
			} else if (cm.getQuestStatus(100100).equals(MapleQuestStatus.Status.COMPLETED)) {
				cm.sendAcceptDecline("Is your mind ready to undertake the final test?");
			} else {
				cm.sendAcceptDecline("But I can make you even stronger. Although you will have to prove not only your strength but your knowledge. Are you ready for the challenge?");
			}
		} else if (status == 2) {
			if (cm.getQuestStatus(100100).equals(MapleQuestStatus.Status.COMPLETED)) {
				cm.startQuest(100102);
				cm.sendOk("Go and find me the #rNecklace of Wisdom#k which is hidden on the Holy Ground at the Snowfield.");
				cm.dispose();
			} else {
				cm.startQuest(100100);
				cm.sendOk("Well, well. Now go and see #bthe Dark Lord#k. He will show you the way.");
				cm.dispose();
			}
		}
	}
}	
