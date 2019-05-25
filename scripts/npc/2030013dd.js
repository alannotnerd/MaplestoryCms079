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

importPackage(java.lang);
importPackage(net.sf.cherry.server);

/* 
	Adobis
*/
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		if (status == 0) {
			if (cm.getSquadState(MapleSquadType.ZAKUM) == 0) {
				cm.sendSimple("现在可以申请扎昆队长\r\n#b#L1#申请扎昆征战队队长#l\r\n\#L2#不，我还有事#l");
			} else if (cm.getSquadState(MapleSquadType.ZAKUM) == 1) {
				if (cm.checkSquadLeader(MapleSquadType.ZAKUM)) {
					cm.sendSimple("你想做什么\r\n\r\n#L1#查看当前队员#l\r\n#L2#关闭队员申请#l\r\n#r#L3#开始征战#l");
                                        status = 19;
				} else if (cm.isSquadMember(MapleSquadType.ZAKUM)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.ZAKUM);
                                	var toSend = "The following members make up your squad:\r\n\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "#L";
						toSend += i;
						toSend += "# ";
						toSend += i;
						toSend += " - ";
						toSend += cm.getSquadMember(MapleSquadType.ZAKUM, i - 1).getName();
						toSend += "#l";
						/*toSend += "\r\n";*/
					}
					System.out.println(toSend);
					cm.sendOk(toSend);
					cm.dispose();
				} else {
					cm.sendSimple("你想加入征战队吗\r\n#b#L1#是的，我已经准备好了#l\r\n\#L2#不，我还没准备好#l");
					status = 9;
				}
			} else {
				if (cm.checkSquadLeader(MapleSquadType.ZAKUM)) {
					cm.sendSimple("你想做什么\r\n\r\n#L1#查看当前队员#l\r\n#L2#开启队员申请#l\r\n#L3#开始征战#l");
                                        status = 19;
				} else if (cm.isSquadMember(MapleSquadType.ZAKUM)) {
					var noOfChars = cm.numSquadMembers(MapleSquadType.ZAKUM);
                                	var toSend = "The following members make up your squad:\r\n\r\n";
					for (var i = 1; i <= noOfChars; i++) {
						toSend += "#L";
						toSend += i;
						toSend += "# ";
						toSend += i;
						toSend += " - ";
						toSend += cm.getSquadMember(MapleSquadType.ZAKUM, i - 1).getName();
						toSend += "#l";
						/*toSend += "\r\n";*/
					}
					System.out.println(toSend);
					cm.sendOk(toSend);
					cm.dispose();
				} else {
					cm.sendOk("对不起，队长已经关闭了队员的申请。请稍后再试。");
					cm.dispose();
				}
			}
		} else if (status == 1) {
			if (selection == 1) {
				if (cm.createMapleSquad(MapleSquadType.ZAKUM) != null) {
					cm.sendOk("扎昆征战队已经建立。可以申请进入征战队的工作。\r\n\r\n再次和我谈话可以查看更多信息。");
					cm.dispose();
				} else {
					cm.sendOk("可以申请队员。");
					cm.dispose();
				}
			} else if (selection == 2) {
				cm.sendOk("对不起，队长不允许你参加征战队。");
				cm.dispose();
			}
	  	} else if (status == 10) {
			if (selection == 1) {
				if (cm.numSquadMembers(MapleSquadType.ZAKUM) > 29) {
					cm.sendOk("对不起，队员已满。");
					cm.dispose();
				} else {
					if (cm.canAddSquadMember(MapleSquadType.ZAKUM)) {
						cm.addSquadMember(MapleSquadType.ZAKUM);
						cm.sendOk("你已经进入了征战队，请等候队长提示。");
						cm.dispose();
					} else {
						cm.sendOk("对不起，队长不允许你参加征战队。");
						cm.dispose();
					}
				}
			} else if (selection == 2) {
				cm.sendOk("对不起，队长不允许你参加征战队。");
				cm.dispose();
			}
		} else if (status == 20) {
			if (selection == 1) {
				var noOfChars = cm.numSquadMembers(MapleSquadType.ZAKUM);
                                var toSend = "队员名单如下:\r\n\r\n";
				for (var i = 1; i <= noOfChars; i++) {
					toSend += "#L";
					toSend += i;
					toSend += "# ";
					toSend += i;
					toSend += " - ";
					toSend += cm.getSquadMember(MapleSquadType.ZAKUM, i - 1).getName();
					toSend += "#l";
					/*toSend += "\r\n";*/
				}
				System.out.println(toSend);
				cm.sendOk(toSend);
			} else if (selection == 2) {
				if (cm.getSquadState(MapleSquadType.ZAKUM) == 1) {
					cm.setSquadState(MapleSquadType.ZAKUM, 2);
					cm.sendOk("注册已关闭，再次和我对话可以选择开启。");
				} else {
					cm.setSquadState(MapleSquadType.ZAKUM, 1);
					cm.sendOk("注册已开放，再次和我对话可以选择关闭。.");
				}
                                cm.dispose();
			} else if (selection == 3) {
				cm.setSquadState(MapleSquadType.ZAKUM, 2);
				cm.sendOk("现在我带领和你的队员进入 #r扎昆的祭台");
				status = 29;
			}
                } else if (status == 21) {
			if (selection > 0) {
				cm.removeSquadMember(MapleSquadType.ZAKUM, selection - 1, true);
				cm.sendOk("任务已经开始，不能申请队长。");
				cm.dispose();
			} else {
				if (cm.getSquadState(MapleSquadType.ZAKUM) == 1) {
					cm.sendSimple("你想要做什么\r\n\r\n#L1#查看当前队员#l\r\n#L2#关闭队员申请#l\r\n#L3#开始征战#l");
				} else {
					cm.sendSimple("你想要做什么\r\n\r\n#L1#查看当前队员#l\r\n#L2#开启队员申请#l\r\n#L3#开始征战#l");
				}
				status = 19;
			}
		} else if (status == 30) {
			cm.warpSquadMembers(MapleSquadType.ZAKUM, 280030000);
			cm.dispose();
		}
	}
}
