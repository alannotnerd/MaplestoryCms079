/* Julius Styleman
	Amoria VIP Hair/Hair Color Change.
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
	cm.sendSimple("�ˣ�����#p9201015# ������� #b#t5150020##k, ������ #b#t5151017##k �ҾͿ��԰�����������~ \r\n#L0#ʹ��: #i5150020##t5150020##l\r\n#L1#ʹ��: #i5151017##t5151017##l");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [30580, 30590, 30280, 30670, 30410, 30200, 30050, 30230, 30290, 30300, 30250];
	    } else {
		hair_Colo_new = [31580, 31590, 31310, 31200, 31150, 31160, 31020, 31260, 31230, 31220, 31110];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.askAvatar("ѡ��ϲ����", hair_Colo_new);
	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;

	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.askAvatar("ѡ��ϲ����", hair_Colo_new);
	}
    } else if (status == 2) {
	if (beauty == 1) {
	    if (cm.setAvatar(5150020, hair_Colo_new[selection]) == 1) {
		cm.sendOk("���ܣ�");
	    } else {
		cm.sendOk("�z...��ò��û��#b#t5150020##k��");
	    }
	} else {
	    if (cm.setAvatar(5151017, hair_Colo_new[selection]) == 1) {
		cm.sendOk("���ܣ�");
	    } else {
		cm.sendOk("�z...��ò��û��#b#t5151017##k��");
	    }
	}
	cm.dispose();
    }
}