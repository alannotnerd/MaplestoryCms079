/* Don Giovanni
	Kerning VIP Hair/Hair Color Change.
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
	cm.sendSimple("������Ŭ. ������� #b#t5150005##k \r\n���� #b#t5151005##k �κλ��ᣬ\r\n��ô��ô�����Ҹı���ķ�����ɫ?\r\n#L0#ʹ�� #b#t5150005##k\r\n#L1#ʹ�� #b#t5151005##k");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [30030, 30020, 30000, 30270, 30230, 30260, 30280, 30240, 30290, 30340];
	    } else {
		hair_Colo_new = [31040, 31000, 31250, 31220, 31260, 31240, 31110, 31270, 31030, 31230];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.askAvatar("ѡ��һ��ϲ����~",5150005, hair_Colo_new);
	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;

	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.askAvatar("ѡ��һ��ϲ����~",5150005, hair_Colo_new);
	}
    } else if (status == 2){
	if (beauty == 1){
	    if (cm.setAvatar(5150005, hair_Colo_new[selection]) == 1) {
		cm.sendOk("����!");
	    } else {
		cm.sendOk("��ò��û��#b#t5150005##k..");
	    }
	} else {
	    if (cm.setAvatar(5151005, hair_Colo_new[selection]) == 1) {
		cm.sendOk("����!");
	    } else {
		cm.sendOk("��ò��û��#b#t5151005##k..");
	    }
	}
	cm.safeDispose();
    }
}
