/* Ari
	NLC Random Hair/Hair Color Change.
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
	cm.sendSimple("�ˣ�����#p9201063# ������� #b#t5150030##k ���� #b#t5151025##k ��ô�ҿ��԰�����~ ��Ҫʲô���� \r\n#L0#ʹ��: #i5150030##t5150030##l\r\n#L1#ʹ��: #i5151025##t5151025##l");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [30250, 30110, 30230, 30050, 30280, 30410, 30730, 30160, 30200, 30440, 30360, 30400];
	    } else {
		hair_Colo_new = [31150, 31310, 31220, 31300, 31260, 31160, 31730, 31410, 31410, 31720, 31560, 31450];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.sendYesNo("��ȴ��Ҫʹ�� #b#t5150030##k ����");
	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;

	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.sendYesNo("��ȴ��Ҫʹ�� #b#t5151025##k ����");
	}
    } else if (status == 2){
	if (beauty == 1) {
	    if (cm.setRandomAvatar(5150030, hair_Colo_new) == 1) {
		cm.sendOk("���ܣ���");
	    } else {
		cm.sendOk("�z...ò��û��#b#t5150030##k");
	    }
	} else {
	    if (cm.setRandomAvatar(5151025, hair_Colo_new) == 1) {
		cm.sendOk("���ܣ���");
	    } else {
		cm.sendOk("�z...ò��û��#b#t5151025##k");
	    }
	}
	cm.dispose();
    }
}