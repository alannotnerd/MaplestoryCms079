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
/* Edited by: kevintjuh93
    NPC Name:         Jean
    Map(s):         Victoria Road : Lith Harbour (104000000)
    Description:         Event Assistant
*/
var status = 0;
var banMap = Array(109080000, 109080010, 109040000, 109030001, 109060000, 109010000);


function start() {
 
   cm.sendNext("#e#d��!����#b����#d���߻����Ա���ҿ��԰����͵����ͼ��");

}


function action(mode, type, selection) {

	for(var i = 0; i < banMap.length; i++) {

	if (cm.getPlayer().getMapId() == banMap[i]){

		cm.sendOk("�֣���Ҫ͵�ܳ�ʺȥ�ɣ�");

		cm.dispose();

		}
	
}
    if (mode == -1) {

        cm.dispose();

    } else {
 
       if (status >= 2 && mode == 0) {

            cm.dispose();
            
return;

        }
        
if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("#e#d���λ������ʼ��������ҲҪ������Ŷ!");
 
       } else if (status == 2) {
 
           cm.sendSimple("#e����ð�յ���������..\r\n#L0##e1.#n#d#e ʲô�����߻?#k#l\r\n#L1##e2.#n#d#e ����ݽ���.#k#l\r\n#L2##e3.#n#r#e ������ͼ��#k#l");

        } else if (status == 3) {
 
           if (selection == 0) {
 
               cm.sendNext("#e#d���߻Ϊÿ�ս��У�ÿ2Сʱ������һ�Σ�����ʱ�й��棬��ҿɸ��ݹ�����ʾ�����������ݴ��ͣ�ֱ�ӽ��뵽���ͼ���������ĿΪ6������Ŀ��ʼ�����Ҷ��������߻,��÷��Ľ����ɡ�");

                cm.dispose();

            } else if (selection == 1) {
 
               cm.sendSimple("#d#e���߻��Ϊ6�֣������ǻ����Ŀ. #b\r\n#L0# ���K��#l\r\n#L1# �K�O����#l\r\n#L2# �Lѩ��#l\r\n#L3# �����#l\r\n#L6# ��ƿ�w#l\r\n#L4# �Ƿ��}���#l\r\n#L5# ����#l#k");

            } else if (selection == 2) {

				if (!cm.canHold()) {

					cm.sendNext("#d#eՈ�_�J�Ƿ������п�λ��");

				} else if (cm.getChannelServer().getEvent() > -1) {

					if (cm.haveItem(4031017)) {

						cm.removeAll(4031017);
					}
					cm.saveReturnLocation("EVENT");
	
				cm.getPlayer().setChalkboard(null);

					cm.warp(cm.getChannelServer().getEvent(), cm.getChannelServer().getEvent() == 109080000 || cm.getChannelServer().getEvent() == 109080010 ? 0 : "join00");
				} else {
					cm.sendNext("#d#e����û�п��ԲμӵĻŶ�����ע�������ʾ���μӻŶ�����߻Ϊÿ2Сʱ����һ�Ρ�");
				}
				cm.dispose();

			}

        } else if (status == 4) {
 
           if (selection == 0) {
                cm.sendNext("#b[���K��]#k �Լ�#e#r�ٶ�#k!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[�K�O����] �Լ�#e#r�ٶ�#k!");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[�Lѩ��]#k �Լ�#e#r�ٶ�#k!");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[�����]#k �Լ�#e#rGoogle#k!");
                cm.dispose();
			} else if (selection == 6) {
                cm.sendNext("#b[��ƿ�w]#k �Լ�#e#r�ٶ�#k!");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[�Ƿ��}���]#k �Լ�#e#r�ٶ�#k!");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[����]#k �Լ�#e#r�ٶ�#k!");
                cm.dispose();
            }
        }   
    }
}  