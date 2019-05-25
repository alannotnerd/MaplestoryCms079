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
	Green Balloon - LudiPQ 5th stage NPC
-- By ---------------------------------------------------------------------------------------------
	Stereo/xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.1 - Adapted to LudiPQ Green Balloon by xQuasar
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(net.sf.cherry.tools);
importPackage(net.sf.cherry.server.life);
importPackage(java.awt);

var status;

var exp = 3770;
			
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
		var stage5status = eim.getProperty("stage5status");
		if (stage5status == null) {
			if (playerStatus) { // Leader
				var map = eim.getMapInstance(cm.getChar().getMapId());
				var passes = cm.haveItem(4001022,24);
				var stage5leader = eim.getProperty("stage5leader");
				if (stage5leader == "done") {
					if (passes) {
						// Clear stage
						cm.sendNext("Congratulations! You've passed the 5th stage. Hurry on now, to the 6th stage.");
						party = eim.getPlayers();
						map = cm.getMapId();
						cm.gainItem(4001022, -24);
						clear(5,eim,cm);
						cm.givePartyExp(exp, party);
						cm.dispose();
					} else { // Not done yet
						cm.sendNext("Are you sure you've brought me #r24 Passes of Dimension#k? Please check again.");
					}
					cm.dispose();
				} else {
					cm.sendOk("Welcome to the 5th stage. Go around, and collect #r24 Passes of Dimension#k from the boxes in the other maps. Once you're done, get your party members to hand all the #rPasses#k to you, then talk to me again.");
					eim.setProperty("stage5leader","done");
					cm.dispose();
				}
			} else { // Members
				cm.sendNext("Welcome to the 5th stage. Go around, and collect #rPasses of Dimension#k from the boxes in the other maps. Once you're done, hand all the #rPasses#k to your party leader.");
				cm.dispose();
			}
		} else {
			cm.sendNext("Congratulations! You've passed the 5th stage. Hurry on now, to the 6th stage.");
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
	map = mf.getMap(922010500);
	var nextStage = eim.getMapInstance(922010600);
	var portal = nextStage.getPortal("next00");
	if (portal != null) {
		portal.setScriptName("lpq6");
	}
	var stageSeven = eim.getMapInstance(922010700);
	var stageSevenPortal = stageSeven.getPortal("next00");
	if (stageSevenPortal != null) {
		stageSevenPortal.setScriptName("lpq7");
	}
}
