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
Tory - [Does the Main function of HenesysPQ]
 @author Jvlaple
 */
 
var status = 0;
var minLevel = 10;
var maxLevel = 20;
var minPlayers = 3;
var maxPlayers = 6;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (cm.getChar().getMapId()==100000200) {
			if (status == 0) {
				cm.sendNext("哈啰~我叫达尔利。这里面是开满月花的美丽山丘。听说…里面有一个叫做兴儿的老虎，好像四处在寻找可以填饱肚子的食物…");
			} else if (status == 1) {
				cm.sendNext("勇士…你愿意前往月花山丘，集结队员的力量，一起帮助兴儿吗？#l#k");
			} else if (status == 2) {
				if (cm.getParty() == null) {
					cm.sendOk("你还没有组队！不能参加本活动");
					cm.dispose();
					return;
				}
				if (!cm.isLeader()) {
					cm.sendOk("若想要进入里面，需要你所隶属队伍的队长，与我进行对话喔！快去找你的队长吧~^^");
					cm.dispose();
				} else {
					var party = cm.getParty().getMembers();
					var mapId = cm.getChar().getMapId();
					var next = true;
					var levelValid = 0;
					var inMap = 0;
					if (party.size() < minPlayers || party.size() > maxPlayers) {
						next = false;
						cm.sendOk(party.size());
						cm.dispose();
						return;
					}else {
						for (var i = 0; i < party.size() && next; i++) {
							if ((party.get(i).getLevel() >= minLevel) && (party.get(i).getLevel() <= maxLevel))
								levelValid += 1;
							if (party.get(i).getMapid() == mapId)
								inMap += 1;
						}
						if (levelValid < minPlayers || inMap < minPlayers){
							cm.sendOk(levelValid);
							cm.dispose();
							//next = false;
							return;
						}
							
					}
					if (next) {
						var em = cm.getEventManager("HenesysPQ");
						if (em == null) {
							cm.sendOk("#rError#k: HenesysPQ is unavailable at the moment. Please try again later.");
							cm.dispose();
						} else {
							em.startInstance(cm.getParty(), cm.getChar().getMap());
							var party = cm.getChar().getEventInstance().getPlayers();
						}
						cm.dispose();
					} else {
						cm.sendOk("你所属的组队队员不足3名不能入场。等级在10以上，并且人员在3名以上才可以入场。请你确认以后再跟我谈。");
						cm.dispose();
					}
				}
			}
		} else if (cm.getChar().getMapId() == 910010400) {
			if (status == 0){
			cm.warp(100000200);
			cm.playerMessage("你被传送到了射手公园.");
			cm.dispose();
			}
		} else if (cm.getPlayer().getMapId() == 910010100) {
			if (status==0) {
				cm.sendYesNo("你想要前往#r射手公园#k吗?");				
			} else if (status == 1) {
					cm.warp(100000200);
				cm.dispose();
			}
		}
	}
}
