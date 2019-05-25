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
	Alcaster - El Nath Market (211000100)
-- By ---------------------------------------------------------------------------------------------
	Unknown/Information/xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Fixed up completely [xQuasar]
	1.2 - Add a missing text part [Information]
	1.1 - Recoded to official [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.client);

var selected;
var amount;
var totalcost;
var item = new Array(2050003,2050004,4006000,4006001);
var highCost = new Array(600,800,10000,10000);
var cost = new Array(300,400,5000,5000);
var msg = new Array("that cures the state of being sealed and cursed","that cures all",", possessing magical power, that is used for high-quality skills",", possessing the power of summoning that is used for high-quality skills");
var selStr;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && status == 2) {
		cm.sendNext("I see. Understand that I have many different items here. Take a look around. I'm only selling these items to you, so I won't be ripping you off in any way shape or form.");
		cm.dispose();
		return;
	}
	if (mode == 0 || mode == -1) {
		cm.dispose();
		return;
	}
	else
		status++;
	if (status == 0) {
		if (cm.getQuestStatus(3035).equals(MapleQuestStatus.Status.COMPLETED)) {
			selStr = "\r\n#L0# #b#t2050003# (Price: 300 mesos)#k#l\r\n#L1# #b#t2050004# (Price: 400 mesos)#k#l\r\n#L2# #b#t4006000# (Price: 5000 mesos)#k#l\r\n#L3# #b#t4006001# (Price: 300 mesos)#k#l";
			cm.sendSimple("Thanks to you #b#t4031056##k is safely sealed. Of course, also as a result, I used up about half of the power I have accumulated over the last 800 years or so...but now I can die in peace. Oh, by the way... are you looking for rare items by any chance? As a sign of appreciation for your hard work, I'll sell some items I have to you, and ONLY you. Pick out the one you want!"+selStr);
		} else {
			selStr = "\r\n#L0# #b#t2050003# (Price: 600 mesos)#k#l\r\n#L1# #b#t2050004# (Price: 800 mesos)#k#l\r\n#L2# #b#t4006000# (Price: 10000 mesos)#k#l\r\n#L3# #b#t4006001# (Price: 10000 mesos)#k#l";
			cm.sendSimple("I can sell these following items... Pick out the one you want! By the way, I'll make these items cheaper if you help me out and do my quest..."+selStr);
		}
	} else if (status == 1) {
		selected = selection;
		if (cm.getQuestStatus(3035).equals(MapleQuestStatus.Status.COMPLETED)) {
			cm.sendGetNumber("Is #b#t"+item[selected]+"##k really the item that you need? It's the item "+msg[selected]+". It may not be the easiest item to acquire, but I'll give you a good deal on it. It'll cost you #b"+cost[selected]+" mesos#k per item. How many would you like to purchase?", 0, 1, 100);
		} else {
			cm.sendGetNumber("Is #b#t"+item[selected]+"##k really the item that you need? It's the item "+msg[selected]+". It may not be the easiest item to acquire, but I'll give you a good deal on it. It'll cost you #b"+highCost[selected]+" mesos#k per item. How many would you like to purchase?", 0, 1, 100);
		}
	} else if (status == 2) {
		if (cm.getQuestStatus(3035).equals(MapleQuestStatus.Status.COMPLETED)) {
			amount = selection;
			totalcost = cost[selected] * amount;
			if (amount == 0) {
				cm.sendOk("If you're not going to buy anything, then I've got nothing to sell either.");
				cm.dispose();
			}
			cm.sendYesNo("Are you sure you want to buy #r"+amount+" #t"+item[selected]+"(s)##k? It'll cost you "+cost[selected]+" mesos per #t"+item[selected]+"#, which will cost you #r"+totalcost+" mesos#k in total.");
		} else {
			amount = selection;
			totalcost = highCost[selected] * amount;
			if (amount == 0) {
				cm.sendOk("If you're not going to buy anything, then I've got nothing to sell either.");
				cm.dispose();
			}
			cm.sendYesNo("Are you sure you want to buy #r"+amount+" #t"+item[selected]+"(s)##k? It'll cost you "+highCost[selected]+" mesos per #t"+item[selected]+"#, which will cost you #r"+totalcost+" mesos#k in total.");
		}
	} else if (status == 3) {
		if (cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
			cm.sendNext("Are you sure you have enough mesos? Please check and see if your etc. or use inventory is full, or if you have at least #r"+totalcost+"#k mesos.");
			cm.dispose();
		}
		cm.sendNext("Thank you. If you ever find yourself needing items down the road, make sure to drop by here. I may have gotten old over the years, but I can still make magic items with ease.");
		cm.gainMeso(-totalcost);
		cm.gainItem(item[selected], amount);
		cm.dispose();
	}
}
