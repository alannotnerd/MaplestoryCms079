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
	Orange Balloon - LudiPQ 2nd stage NPC
-- By ---------------------------------------------------------------------------------------------
	Stereo/xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Adapted to LudiPQ Orange Balloon by xQuasar
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 2520;
			
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
		var stage2status = eim.getProperty("stage2status");
		if (stage2status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,15);
				var stage2leader = eim.getProperty("stage2leader");
				if (stage2leader == "done") {
					if (passes) {
						// Clear stage
						cm.sendNext("Congratulations! You've passed the 2nd stage. Hurry on now, to the 3rd stage.");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -15);
						clear(2,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("Are you sure you've brought me #r15 Passes of Dimension#k? Please check again.");
					}
					cm.dispose();
				} else {
					cm.sendOk("Welcome to the 2nd stage. Go around, and collect #rPasses of Dimension#k from the boxes in this map. Be careful, one of the boxes will lead you into a trap. Once you're done, get your party members to hand all the #rPasses#k to you, then talk to me again.");
					eim.setProperty("stage2leader","done");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("Welcome to the 2nd stage. Go around, and collect #rPasses of Dimension#k from the boxes in this map. Be careful, one of the boxes will lead you into a trap. Once you're done, hand all the #rPasses#k to your party leader.");
				cm.dispose();
			}
		} else {
			cm.sendNext("Congratulations! You've passed the 2nd stage. Hurry on now, to the 3rd stage.");
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
	map = mf.getMap(922010200);
	var nextStage = eim.getMapInstance(922010300);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq3");
	}
}
