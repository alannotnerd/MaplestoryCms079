function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "#k��ӭ����#r����ð�յ�#k�������ܻ��ѫ��Ŷ��\r\n\r\n";
            text += "#L1##d#v1142796##z1142796#\t��ȡYY����ѫ��(����YY���״ﵽ300)#l\r\n\r\n"
            text += "#L2##d#v1142574##z1142574#\t��ȡŮ����ѫ��(����YY���״ﵽ100��������Ҫ�Ҵ�����֤)#l\r\n\r\n"
            //text += "#L3##d#v1142609##z1142609#\t��ȡ���˽Ӵ�ѫ�£�#l\r\n\r\n"
            text += "#L4##d#v1142343##z1142343#\t��ȡ����ѫ�£�#l\r\n\r\n"
            text += "#L5##d#v1112405##z1112405#\t��ȡ�ۻ���ֵ500��ָ��#l\r\n\r\n"
            //text += "#L6##d#v1142342##z1142342#\t��ȡ��ֵ�ۻ�2000Ԫѫ�£�#l\r\n\r\n"
            //text += "#L7##d#v1142536##z1142536#\t��ȡ��ֵ�ۻ�3000Ԫѫ�£�#l\r\n\r\n"
            //text += "#L8##d#v1142742##z1142742#\t��ȡ��ֵ�ۻ�5000Ԫѫ�£�#l\r\n\r\n"
            cm.sendSimple(text);
            }
        } else if (selection == 1) {
		cm.openNpc(9900004, 70);
        } else if (selection == 2) {
		cm.openNpc(9900004, 71);
        } else if (selection == 3) {
		cm.openNpc(9900004, 72);
        } else if (selection == 4) {
		cm.openNpc(9900004, 73);
        } else if (selection == 5) {
		cm.openNpc(9900004, 74);
        } else if (selection == 6) {
		cm.openNpc(9900004, 75);
        } else if (selection == 7) {
		cm.openNpc(9900004, 76);
        } else if (selection == 8) {
		cm.openNpc(9900004, 77);
	}
    }
}


