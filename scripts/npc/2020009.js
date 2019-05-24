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
//BY MOOGRA
/* Robeira
	Magician 3rd job advancement
	El Nath: Chief's Residence (211000001)
	Custom Quest 100100, 100102
*/

var status = 0;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendOk("�����¶������ٴ����Ұ�.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		if (cm.getJob() == 211 || cm.getJob() == 221 || cm.getJob() == 231 || cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232) {	
	    cm.sendOk("�����ڷ�ʦ��,�������Ѿ��ɹ���ת��,�Ѿ���Խ�˽̹ٵ�ǿ����!");
	    cm.dispose();
	    return;
		}
            if (!(cm.getJob()==210 ||cm.getJob()==220||cm.getJob()==230)) {
		cm.sendOk("��������תְ�̹�,�������ڷ�ʦ���Ĺ���!");
                cm.dispose();
                return;
			} else if (cm.getPlayer().getLevel() < 70) {
				cm.sendOk("��ĵȼ���δ��70��");
				cm.dispose();
				return;		
            }	
			if (cm.haveItem(4031057, 1)){
                cm.sendNext("��ϲ�㵽������,����ҽ�����һ������!");			
            } else if (!(cm.haveItem(4031057,1))) {
				cm.warp(101000003);
                cm.sendOk("ȥ�� #r��˹#k ����������!");
                cm.dispose();
            } else if (cm.getPlayer().getRemainingSp() <= (cm.getLevel() - 70) * 3) {
                cm.sendNext("��ļ��ܵ�����û����..");
		} else {
                cm.sendOk("�㻹����תְ...");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.haveItem(4031058, 1)) {
                if (cm.getJob()==210) {
                    cm.changeJob(211);
                    //cm.getPlayer().gainAp(5);
					cm.gainItem(4031057, -1);
					cm.gainItem(4031058, -1);
					cm.sendOk("��ϲ�������Ѿ���Ϊ��˧��ħ��ʿ(��.��)��!");
					cm.worldMessage("��תְ�챨������ϲ���."+ cm.getChar().getName() +"  �ɹ���ת-ħ��ʿ(��.��)���������ҵ�ף����/���ɣ�");
                    cm.dispose();
                } else if (cm.getJob()==220) {
                    cm.changeJob(221);
                    //cm.getPlayer().gainAp(5);
					cm.gainItem(4031057, -1);
					cm.gainItem(4031058, -1);
                    cm.sendOk("��ϲ�������Ѿ���Ϊ��˧��ħ��ʿ(��.��)��!");
					cm.worldMessage("��תְ�챨������ϲ���."+ cm.getChar().getName() +"  �ɹ���ת-ħ��ʿ(��.��)���������ҵ�ף����/���ɣ�");
					
                    cm.dispose();
                } else if (cm.getJob()==230) {
                    cm.changeJob(231);
                    //cm.getPlayer().gainAp(5);
					cm.gainItem(4031057, -1);
					cm.gainItem(4031058, -1);
                    cm.sendOk("��ϲ�������Ѿ���Ϊ��˧�ļ�˾��!");
					cm.worldMessage("��תְ�챨������ϲ���."+ cm.getChar().getName() +"  �ɹ���ת-��˾���������ҵ�ף����/���ɣ�");
                    cm.dispose();
                }
            } else if (cm.haveItem(4031057, 1))
                cm.sendAcceptDecline("��׼���е����ղ���??");
            else
                cm.sendAcceptDecline("���ǣ��ҿ����������ǿ����Ȼ�����֤�����������ʵ���������֪ʶ����׼������ս����");
        } else if (status == 2) {
            if (cm.haveItem(4031057, 1)) {
                cm.sendOk("ȥ����ʥ��ʯͷ�����!!.");
                cm.dispose();
            }
        }
    }
}
