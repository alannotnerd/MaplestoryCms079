/* Brittany
	Henesys Random Hair/Hair Color Change.
*/
var status = -1;
var beauty = 0;
var hair_Colo_new;

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    } else {
	status++;
    }

    if (status == 0) {
	cm.sendSimple("�ˣ�����#p9330050# ������� #b#t5151023##k ���� #b#t5151023##k, �ҾͿ�����Ѱ���Ū�ÿ���ͷ���� \r\n#L0#ʹ��: #i5150028##t5150028##l\r\n#L1#ʹ��: #i5151023##t5151023##l");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [30310, 30330, 30060, 30150, 30410, 30210, 30140, 30120, 30200, 30560, 30510, 30610, 30470, 30920, 30860, 30800];
	    } else {
		hair_Colo_new = [31150, 31310, 31300, 31160, 31100, 31410, 31030, 31080, 31070, 31610, 31350, 31510, 31740, 31560, 31710, 31880];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.sendYesNo("ȷ��Ҫʹ�� #b#t5150028##k ��������ˣ���");

	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;

	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.sendYesNo("ȷ��Ҫʹ�� #b#t5151023##k ���Ⱦ���ˣ���");
	}
    } else if (status == 2){
	if (beauty == 1){
	    if (cm.setRandomAvatar(5150028, hair_Colo_new) == 1) {
		cm.sendOk("���ܣ�");
	    } else {
		cm.sendOk("�z.... ò��û��#b#t5150028##k��");
	    }
	} else {
	    if (cm.setRandomAvatar(5151023, hair_Colo_new) == 1) {
		cm.sendOk("���ܣ�");
	    } else {
		cm.sendOk("�z.... ò��û��#b#t5151023##k��");
	    }
	}
	cm.safeDispose();
    }
}