/* 	Jimmy
	Singa Random Hair/Color Changer
*/
var status = -1;
var beauty = 0;
var hair_Colo_new;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    } else {
	status++;
    }

    if (status == 0) {
	cm.sendSimple("�ˣ�����#p9270037# ������� #b#t5150032##k ���� #b#t5151027##k �ҿ��������һ���ÿ���~~\r\n#L0#ʹ��:#i5150032##t5150032##l\r\n#L1#ʹ��:#i5151027##t5151027##l");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [30110, 30290, 30230, 30260, 30320, 30190, 30240, 30350, 30270, 30180];
	    } else {
		hair_Colo_new = [31260, 31090, 31220, 31250, 31140, 31160, 31100, 31120, 31030, 31270, 31810];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.sendYesNo("ȷ���Ƿ�Ҫʹ����??");
	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;

	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.sendYesNo("ȷ���Ƿ�Ҫʹ����??");
	}
    } else if (status == 2){
	if (beauty == 1){
	    if (cm.setRandomAvatar(5150032, hair_Colo_new) == 1) {
		cm.sendOk("�������µ����Ͱɣ�");
	    } else {
		cm.sendOk("����û��#b#t5150032##k �����Ҳ��ܰ�æ��");
	    }
	} else {
	    if (cm.setRandomAvatar(5151027, hair_Colo_new) == 1) {
		cm.sendOk("�������µ����Ͱɣ�");
	    } else {
		cm.sendOk("����û��#b#t5151027##k �����Ҳ��ܰ�æ��");
	    }
	}
	cm.dispose();
    }
}