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
var status = 0;
var qChars = new Array ("Q1: ��֮���У��ӵȼ�1���ȼ�2��Ҫ���پ���ֵ��#10#12#15#20#3",
    "Q1: ���ݲ�ְͬҵΪ�˵�1��תְ��Ҫ���������������ȷ����������һ����#սʿ 35 ����#���� 20 ����#��ʦ 20 ����#������ 25 ����#2",
    "Q1: �����﹥��ʱ�ر���쳣״̬û�б���ȷ˵��������һ����#���� �� �ƶ��ٶȽ���#��ӡ - ����ʹ�ü���#�ڰ� - �����½�#���� - ���پ���#1",
    "Q1: ���ݲ�ְͬҵ�ĵ�1��תְ�������� ����25 ��ȷ������һ����#սʿ#������#��ʦ#����#2");
var qItems = new Array( "Q2: ���й����У����������������ܵõ���ս��Ʒ����ȷ��Ӧ��ϵ�ģ�#������-����ͷ��#���� �� ������#ú�� - ճ����������#�� - ˿��#2",
    "Q2: ���й����У����������������ܵõ���ս��Ʒ�ǲ���ȷ��Ӧ��ϵ�ģ�#�д��ʷ�- ������#ú�� - ú����ĭ#��ɫ��ţ - ��ɫ��ţ��#ʳ�˻�����ʳ�˻���Ҷ��#4",
    "Q2: ð�յ�������ҩƷ�У�����ҩƷ�빦Ч����ȷ��Ӧ��ϵ�ģ�#��ɫҩˮ - �ظ� 250 HP#����ҩˮ �� HP400�ָ�#?��ɫҩˮ - �ظ� 100 HP#���� �� HP400�ָ�#4",
    "Q2: ð�յ�������ҩƷ�У�����ҩˮ���Իظ�HP50%MP50%��#����ҩˮ#����ҩˮ#������#��Ȫˮ#1",
    "Q2: ð�յ�������ҩƷ�У�����ҩƷ�빦Ч�ǲ���ȷ��Ӧ��ϵ�ģ�#��ɫҩˮ - �ظ� 100 MP#����ҩˮ - �ظ� 300 MP#�峿֮¶����3000MP�ָ�#��ɫҩˮ - �ظ� 50 HP#3");
var qMobs = new Array(  "Q3: ��Ģ������ˮ�顢��ľ�����������㣬�ĸ��ǵȼ���ߵĹ��#��Ģ��#��������#��ˮ��#��ľ��#4",
    "Q3: �����û���ĸ����#Сʯ��#��ţ#����ţ#Ģ����#1",
    "Q3: ȥ���֮�ǵĴ��ϻ�����ĸ����#����#����ħ#Сʯ��#������#2",
    "Q3: �ڱ���ѩ��û���ĸ����#Ұ��#ѩ��#Сѩ��#������#4",
    "Q3: ��ɵĹ�����ʲô��#����#���߱���#Сѩ��#С����#1",
    "Q3: �������������?#�Ҳ���#����#�ܽ�����#�ش�Ĳ�����#4",
    "Q3: ?#1/1#12/30#11/12#2/12#2");
var qQuests = new Array("Q4: �������ƭ����ô��#����ƭ#��110#�ٱ���GM#����������#3",
    "Q4: ���������ȯ����ѻ�ȡ��?#��#����#���ǵ���#�������#1",
    "Q4: GM����ô��?#�ܺ�#����#�ܶ���#������#1",
    "Q4: ������ʲô����?#�ʺ絺#ð�յ�#���޵�#��#2",
    "Q4: ð�յ����ĸ���˾�����#��Ѷ#ʢ��#�������#������#2",
    "Q4: �������鱶���Ƕ���?#1#10#20#30#1");
var qTowns = new Array( "Q5: ���������� һ��IP ���Դ������ʺ�#1��#3��#4��#5��#1",
    "Q5: �������ұ����ֵĴ���ʽ��??#��7��#��180��#���÷���#������#3",
    "Q5: �����������ﱻ�ٻ�#������̳#��߳�#���֮��#2ˮ������#1",
    "Q5: ����ţ��ս��ƷΪ?#����#����#����ţ��#ú̿#3",
    "Q5: ���ټ����Խ�����ת?#30#40#60#70#4",
    "Q5: �����İ汾Ϊ?#Ver117#Ver72#Ver62#Ver79#4");
var correctAnswer = 0;

function start() {
	if (cm.haveItem(4031058, 1)) {
		cm.sendOk("#h #,���Ѿ����� #t4031058# ��Ҫ�÷���ʱ��.");
		cm.dispose();
	}
    if (!(cm.haveItem(4031058, 1))) {
        cm.sendNext("��ӭ���� #h #, ���� #p2030006#.\r\n�������Ѿ����˺�Զ����������׶�.");
    }
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.sendOk("�´��ټ�.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1)
            cm.sendNextPrev("#h #, �������� #b�ڰ�ˮ��#k �ҽ����������Żش�5������,����5�����ⶼ��������õ� #v4031058# #b�ǻ�����#k.");
        else if (status == 2) {
            if (!cm.haveItem(4005004)) {
                cm.sendOk("#h #, ��û�� #b�ڰ�ˮ��#k");
                cm.dispose();
            } else {
                cm.gainItem(4005004, -1);
                cm.sendSimple("���鿪ʼ #b������ս��!#k.\r\n\r\n" + getQuestion(qChars[Math.floor(Math.random() * qChars.length)]));
                status = 2;
            }
        } else if (status == 3) {
            if (selection == correctAnswer)
                cm.sendOk("#h # ������.\n׼������һ��??");
            else {
                cm.sendOk("�����˵Ĵ�!.\r\n�ܱ�Ǹ������ڸ���һ�� #b�ڰ�ˮ��#k �ſ�������ս!");
                cm.dispose();
            }
        } else if (status == 4)
            cm.sendSimple("���鿪ʼ #b������ս��!#k.\r\n\r\n" + getQuestion(qItems[Math.floor(Math.random() * qItems.length)]));
        else if (status == 5) {
            if (selection == correctAnswer)
                cm.sendOk("#h # ������.\n׼������һ��??");
            else {
                cm.sendOk("�����˵Ĵ�!.\r\n�ܱ�Ǹ������ڸ���һ�� #b�ڰ�ˮ��#k �ſ�������ս!");
                cm.dispose();
            }
        } else if (status == 6) {
            cm.sendSimple("���鿪ʼ #b������ս��!#k.\r\n\r\n" + getQuestion(qMobs[Math.floor(Math.random() * qMobs.length)]));
            status = 6;
        } else if (status == 7) {
            if (selection == correctAnswer)
                cm.sendOk("#h # ������.\n׼������һ��??");
            else {
                cm.sendOk("�����˵Ĵ�!.\r\n�ܱ�Ǹ������ڸ���һ�� #b�ڰ�ˮ��#k �ſ�������ս!");
                cm.dispose();
            }
        } else if (status == 8)
            cm.sendSimple("���鿪ʼ #b������ս��!#k.\r\n\r\n" + getQuestion(qQuests[Math.floor(Math.random() * qQuests.length)]));
        else if (status == 9) {
            if (selection == correctAnswer) {
                cm.sendOk("#h # ������.\n׼������һ��??");
                status = 9;
            } else {
                cm.sendOk("�����˵Ĵ�!.\r\n�ܱ�Ǹ������ڸ���һ�� #b�ڰ�ˮ��#k �ſ�������ս!");
                cm.dispose();
            }
        } else if (status == 10) {
            cm.sendSimple("���һ������.\r\n���鿪ʼ #b������ս��!#k.\r\n\r\n" + getQuestion(qTowns[Math.floor(Math.random() * qTowns.length)]));
            status = 10;
        } else if (status == 11) {
            if (selection == correctAnswer) {
                cm.gainItem(4031058, 1);
				cm.warp(211000001, 0);
                cm.sendOk("��ϲ #h #, ��̫ǿ����.\r\n������� #v4031058# ȥ�����תְ�ٰ̹�!.");
                cm.dispose();
            } else {
                cm.sendOk("̫��ϧ��,��һ��Ϳ���ͨ����!! ������><.\r\n�ܱ�Ǹ������ڸ���һ�� #b�ڰ�ˮ��#k �ſ�������ս!");
                cm.dispose();
            }
        }
    }
}
function getQuestion(qSet){
    var q = qSet.split("#");
    var qLine = q[0] + "\r\n\r\n#L0#" + q[1] + "#l\r\n#L1#" + q[2] + "#l\r\n#L2#" + q[3] + "#l\r\n#L3#" + q[4] + "#l";
    correctAnswer = parseInt(q[5],10);
    correctAnswer--;
    return qLine;
}