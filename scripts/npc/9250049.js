/* Author: aaroncsn (MapleSea Like)(INcomplete- HairStyle)
	NPC Name: 		Wi
	Map(s): 		Thailand:Floating Market(500000000)
	Description: 		Thailand Hair Salon
*/

var status = 0;
var beauty = 0;
var mhair = Array(30030, 30020, 30000, 30130, 30350, 30190, 30110, 30180, 30050, 30040, 30160);
var fhair = Array(31050, 31040, 31000, 31060, 31090, 31020, 31130, 31120, 31140, 31330, 31010);
var hairnew = Array();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("���ã�����#r #p9250049##k ��ӭ�����ƽ������������ �������\r\n#b#t5150042##k, ���� #b#t5151032##k �ҾͿ�����Ѱ���Ū \r\n#L0##bʹ��#t5150042##k#l \r\n#L1##bʹ��#t5151032##k#l");
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
				cm.sendStyle("ѡ��һ��ϲ����", hairnew);
			} else if (selection == 1) {
				beauty = 2;
				haircolor = Array();
				var current = parseInt(cm.getChar().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("ѡ��һ��ϲ����", haircolor);
			}
		} else if (status == 2){
			if (beauty == 1){
				if (cm.haveItem(5150042) == true){
					cm.gainItem(5150042, -1);
					cm.setHair(hairnew[selection]);
					cm.sendOk("���ܣ�");
				} else {
					cm.sendNext("�z...ò��û��#t5150042#");
				}
			}
			if (beauty == 2){
				if (cm.haveItem(5151032) == true){
					cm.gainItem(5151032, -1);
					cm.setHair(haircolor[selection]);
					cm.sendOk("���ܣ�");
				} else {
					cm.sendNext("�z...ò��û��#t5151032#");
				}
			}
			cm.dispose();
		}
	}
}