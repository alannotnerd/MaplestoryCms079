/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
	VIP Cab - Victoria Road : Lith Harbor (104000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/
var status = 0;
var cost;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 1 && mode == 0){
	cm.sendNext("���Ƿ�Ҫ���͵��������");
	cm.dispose();
	return;	
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	cm.sendNext("��ã���������������̤�������Ҿͻ������������\n #b�����#k.");
    } else if (status == 1) {
	var job = cm.getJob();
	if (job == 0 || job == 2000 || job == 1000) {
	    cm.sendYesNo(" ������ֻ��Ҫ�� #b1,50 ���#k �Ƿ�Ҫȥ����??");
	    cost = 150;
	} else {
	    cm.sendYesNo("�����Ǳ߾�Ҫ�ص�סĥ�� #b1,50 ���#k?");
	    cost = 150;
	}
    } else if (status == 2) {
	if (cm.getMeso() < cost) {
	    cm.sendNext("Ո�_�J���Ƿ������ė���!")
	} else {
	    cm.gainMeso(-cost);
	    cm.warp(104000000, 0);
	}
	cm.dispose();
    }
}