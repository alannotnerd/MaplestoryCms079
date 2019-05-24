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
status = -1;
close = false;
oldSelection = -1;

function start() {
    var text = "�����Ǽ�Ʊ��";
    if (cm.haveItem(4031713) || cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038))
        text += " ��Ҫʹ����Ʊ??#b";
    else
        close = true;
    if (cm.haveItem(4031713))
        text += "\r\n#L3##t4031713#";
    for (var i = 0; i < 3; i++)
        if (cm.haveItem(4031036 + i))
            text += "\r\n#L" + i + "##t" + (4031036 + i) +"#";
    if (close) {
        cm.sendOk(text);
        cm.dispose();
    } else
        cm.sendSimple(text);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0)
            cm.sendNext("�������һЩ���ø������԰ɣ�");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (selection == 3) {
            var em = cm.getEventManager("Subway");
            if (em.getProperty("entry") == "true")
                cm.sendYesNo("�������������㹻�Ŀռ��������뽫���ĳ�Ʊ׼���ã������ҿ�������ĳ��̽��������ģ������õ����Ŀ�ĵؾͺ��ˡ�����ô��������Ҫ�õ����ƴ����");
            else {
                cm.sendNext("����ֹͣ����Ʊǰ1�����ˣ����������Ҫ�������ʱ�䡣");
                cm.dispose();
            }
        }else{
            cm.sendNext("����~~"); //Not GMS-like
        }
        oldSelection = selection;
    } else if (status == 1) {
        if (oldSelection == 3) {
            cm.gainItem(4031713, -1);
            cm.warp(600010004);
        } else {
            cm.gainItem(4031036 + oldSelection, -1);
            cm.warp(103000900 + (oldSelection * 3));
        }
        cm.dispose();
    }
}