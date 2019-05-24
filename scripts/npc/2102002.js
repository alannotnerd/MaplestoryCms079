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
var cost = 6000;
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
    } else {
        if(mode == 1) {
            status++;
        }
        if(mode == 0) {
            cm.sendNext("����һЩ���õĸ������޷���԰�?");
            cm.dispose();
            return;
        }
        if(status == 0) {
    cm.sendYesNo("���,��������˹�������뿪��ϣɳĮ�����֮����? ����վ������˹��½��#b���֮��#k�Ĵ�ֻ\r��Ҫ����#b"+cost+" ���#k ����#b#t4031045##k �ſ�������.");
        } else if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else {
                cm.sendOk("�������� #b"+cost+" ���#k? ����еĻ�,��Ȱ�����������������λ���Ƿ���û������.");
            }
            cm.dispose();
        }
    }
}
