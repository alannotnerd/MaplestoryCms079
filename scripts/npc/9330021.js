/*
NPC- ����ʫ9330021
�ص㣺��ҹ��
*/

var status = 0;
var beauty = 0;
var mhair = Array(33090, 30990, 30880, 33080, 30830, 30870, 33030, 30890, 30740, 30930, 30900, 30750);
var fhair = Array(34100, 31940, 34000, 34090, 31930, 31770, 34040, 31920, 31880, 31950, 31910, 31760);
var hairnew = Array();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status >= 0) {
			cm.sendNext("�������Ҫ��������ࡡ�");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("�ˣ�����#p9330021# ������� #b#t5150016##k ���� #b#t5151012##k �Ϳ���������ࡣ� ѡ��һ������: \r\n#L0#ʹ��:#b#t5150016##k \r\n#L1#ʹ��:#b#t5151012##k");
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				hairnew = Array();
				if (cm.getChar().getGender() == 0) {
					for(var i = 0; i < mhair.length; i++) {
						hairnew.push(mhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				} 
				if (cm.getChar().getGender() == 1) {
					for(var i = 0; i < fhair.length; i++) {
						hairnew.push(fhair[i] + parseInt(cm.getChar().getHair() % 10));
					}
				}
				cm.sendYesNo("��ȷ��Ҫʹ�� #b#t5150016##k #rע��:�������#k");
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendYesNo("��ȷ��Ҫʹ�� #b#t5151012##k #rע��:�������#k ��");
			}
		}
		else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				if (cm.haveItem(5150016) == true){
					cm.gainItem(5150016, -1);
					cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
					cm.sendOk("���վ��ӿ����ɡ���");
				} else {
					cm.sendNext("�z.... ò��û��#t5150016#��");
				}
            }
			if (beauty == 2){
				if (cm.haveItem(5151012) == true){
					cm.gainItem(5151012, -1);
					cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
					cm.sendOk("���վ��ӿ����ɡ���");
				} else {
					cm.sendNext("�z.... ò��û��#t5151012#��");
				}
			}
		}
	}
}
