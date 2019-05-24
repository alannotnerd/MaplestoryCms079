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
	cm.sendNext("�����Ҳ�кܶ��ṩ���ҵ����������������б�Ҫȥ�����Ϲ㳡");
	cm.dispose();
	return;	
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	cm.sendNext("��ã����ǳ��⳵ֻ��VIP�ͻ���������ֻ���㵽��ͬ�ĳ�����������⳵�������ṩһ�����õķ���ֵ�ù�����ġ�����һ���е�󣬵��Ƕ���......ֻ��10,000 ��ң����ǻ���㰲ȫ���͵�\n #b���Ϲ㳡#k.");
    } else if (status == 1) {
	var job = cm.getJob();
	if (job == 0 || job == 2000 || job == 1000) {
	    cm.sendYesNo("�����ж�����90%�Ĵ��� ������ֻ��Ҫ�� #b1,000 ���#k �Ƿ�Ҫȥ����??");
	    cost = 1000;
	} else {
	    cm.sendYesNo("�����Ǳ��и�24Сʱ���ŵ����Թ���Ʒ #b10,000 ���#k?");
	    cost = 10000;
	}
    } else if (status == 2) {
	if (cm.getMeso() < cost) {
	    cm.sendNext("��ȷ�����Ƿ����㹻�Ľ��!")
	} else {
	    cm.gainMeso(-cost);
	    cm.warp(105070001, 0);
	}
	cm.dispose();
    }
}