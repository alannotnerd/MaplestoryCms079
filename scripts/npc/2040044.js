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
-- Odin JavaScript --------------------------------------------------------------------------
	Violet Balloon - LudiPQ Crack on the Wall NPC
-- By --------------------------------------------------------------------------------------------
	xQuasar
-- Version Info -------------------------------------------------------------------------------
	1.0 - First Version by xQuasar
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 5950;
			
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (status == -1 && cm.isLeader()) {
		var eim = cm.getChar().getEventInstance();
		var leaderPreamble = eim.getProperty("crackLeaderPreamble");
		if (leaderPreamble == null) {
			eim.setProperty("crackLeaderPreamble", "done");
			cm.sendNext("This is the final stage; it'll be a final test of your strength. Kill the #bBlack Ratz#k on the ledge, and #bAlishar#k will spawn. Give the #rKey of Dimension#k that he drops to me, and you will have succeeded. Good luck, and may #rDestiny#k be with you!");
			cm.dispose();
		} else {
			if (cm.haveItem(4001023)) {
				status = 0;
				cm.sendSimple("Congratulations! You have defeated the boss, #bAlishar#k. Where would you like to be taken to?\r\n\r\n#L0##m922011100# (Skip Bonus)#l\r\n#L1##m922011000# (glitched)#l\r\n");
			} else {
				cm.sendNext("Please bring me the #bKeys of Dimension#k by defeating #bAlishar#k.");
				cm.dispose();
			}
		}
	} else if (status == -1 && !cm.isLeader()) {
		cm.sendNext("Kill the #bBlack Ratz#k on the ledge, and #bAlishar#k will spawn. Get the leader of your party to hand the #rKey of Dimension#k that #bAlishar#k drops to me, and you will have succeeded. Good luck, and may #rDestiny#k be with you!");
		cm.dispose();
	} else if (status == 0 && cm.isLeader()) {
		var eim = cm.getChar().getEventInstance();
		var em = cm.getEventManager("LudiPQ");
		clear(9,eim,cm);
		cm.gainItem(4001023,-1);
		var party = eim.getPlayers();
		cm.givePartyExp(exp, party);
		em.setProperty("entryPossible", "true");
		var endTime = new java.util.Date().getTime();
		var startTime = cm.getPlayer().getEventInstance().getProperty("startTime");
		var startTime2 = cm.getPlayer().getEventInstance().getProperty("s9start");
		
		var get30 = false;
		if(((endTime - startTime) < 600000))
			get30 = true;
			
		var get34 = false;
		if(((endTime - startTime2) < 90000))
			get34 = true;
			
		var giveNx = eim.getProperty("smugglers") != "true";
		eim.dispose();
		/** BONUS EVENT SCRIPT START */
		if(selection == 0) {
			for (var i = 0; i < party.size(); i++) {
				warpToBonus(eim, party.get(i), 922011100, giveNx);
				if(giveNx) {
					if(get30) party.get(i).finishAchievement(30);
					if(get34) party.get(i).finishAchievement(34);
				}
			}
		} else {
			bem = cm.getEventManager("LudiPQBonus");
			if (bem == null) {
				for (var i = 0; i < party.size(); i++) {
					warpToBonus(eim, party.get(i), 221024500, giveNx);
					if(giveNx) {
						if(get30) party.get(i).finishAchievement(30);
						if(get34) party.get(i).finishAchievement(34);
					}
				}
			} else {
				for (var i = 0; i < party.size(); i++) {
					if(giveNx) {
						party.get(i).finishAchievement(28);
						party.get(i).finishAchievement(36);
						if(get30) party.get(i).finishAchievement(30);
						if(get34) party.get(i).finishAchievement(34);
					}
					eim.unregisterPlayer(party.get(i));
				}
				bem.startInstance(cm.getParty(),cm.getChar().getMap());
			}
		}
		/**BONUS EVENT SCRIPT END */
		
		cm.dispose();
	} else {
		cm.dispose();
	}
}

function clear(stage, eim, cm) {
	eim.setProperty("stage" + stage.toString() + "status","clear");
	var packetef = MaplePacketCreator.showEffect("quest/party/clear");
	var packetsnd = MaplePacketCreator.playSound("Party1/Clear");
	var packetglow = MaplePacketCreator.environmentChange("gate",2);
	var map = eim.getMapInstance(cm.getChar().getMapId());
	map.broadcastMessage(packetef);
	map.broadcastMessage(packetsnd);
	//map.broadcastMessage(packetglow);
	// stage 9 does not have a door, might be cause of DC error
}

function warpToBonus(eim, player, bonusMapId, giveNx) {
	if(giveNx) {
		player.finishAchievement(28);
		player.finishAchievement(36);
	}
	
	var bonusMap = cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(bonusMapId);
	eim.unregisterPlayer(player);
	player.changeMap(bonusMap, bonusMap.getPortal(0));
}
