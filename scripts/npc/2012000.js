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

var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 5000, 6000);
var mapNames = new Array("ǰ��ħ��ɭ��", "ǰ����߳�", "ǰ����ľ��", "ǰ������ɳĮ");
var mapName2 = new Array("ǰ��ħ��ɭ��", "ǰ����߳�", "ǰ����ľ��", "ǰ������ɳĮ");
var select;
var status = 0;

function start() {
    var where = "���,���Ǹ����۴�Ʊ��,��������ȥ����?";
    for (var i = 0; i < ticket.length; i++)
        where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
    cm.sendSimple(where);
}

function action(mode, type, selection) {
    if(mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            select = selection;
            cm.sendYesNo("��ȷ��Ҫ���� " + mapName2[select] + " ��Ҫ " + (select == 0 ? 15 : 10) + " Сʱ����, ���Ứ���� #b"+cost[select]+" ���#k. �������Ƿ�ȷ��Ҫ���� #b#t"+ticket[select]+"##k?");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("��ȷ������ #b"+cost[select]+" ���#k? ����еĻ�,��Ȱ�����������������λ���Ƿ���û������.");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
