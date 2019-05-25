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
	Sky-Blue Balloon - LudiPQ 7th stage NPC
-- By ---------------------------------------------------------------------------------------------
	Stereo/xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Adapted to LudiPQ Sky-Blue Balloon by xQuasar
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 4620;
			
function start() {
	status = -1;
	playerStatus = cm.isLeader();
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		var eim = cm.getChar().getEventInstance();
		var stage7status = eim.getProperty("stage7status");
		if (stage7status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,3);
				var stage7leader = eim.getProperty("stage7leader");
				if (stage7leader == "done") {
					if (passes) {
						// Clear stage
						cm.sendNext("Congratulations! You've passed the 7th stage. Hurry on now, to the 8th stage.");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -3);
						clear(7,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("Are you sure you've brought me #r3 Passes of Dimension#k? Please check again.");
					}
					cm.dispose();
				} else {
					cm.sendOk("Welcome to the 7th stage. Go around, and collect #r3 Passes of Dimension#k by summoning #bRombots#k and killing them. Once you're done, get your party members to hand all the #rPasses#k to you, then talk to me again.");
					eim.setProperty("stage7leader","done");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("Welcome to the 7th stage. Go around, and collect #rPasses of Dimension#k by summoning #bRombots#k and killing them. Once you're done, hand all the #rPasses#k to your party leader.");
				cm.dispose();
			}
		} else {
			cm.sendNext("Congratulations! You've passed the 7th stage. Hurry on now, to the 8th stage.");
			cm.dispose();
		}
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
	map.broadcastMessage(packetglow);
	var mf = eim.getMapFactory();
	map = mf.getMap(922010700);
	var nextStage = eim.getMapInstance(922010800);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq8");
	}
}
