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
                text += "";
            }
			//��ʾ��ƷIDͼƬ�õĴ�����  #v����д��ID#
            text += "#e#r�����Ǹ��������齱��.ͨ�ظ��������ɻ�ö�Ӧ�ĸ����齱��.\r\n\r\n"//3
            text += "#L2##e#d#v4170013#��������齱#l\r\n"//3
            text += "#L3##e#d#v4170002#�����������齱#l\r\n"//3
            text += "#L4##e#d#v4170005#��߸������齱#l\r\n"//3
            text += "#L5##e#d#v4170006#��ո������齱#l\r\n"//3
            text += "#L7##e#d#v4170017#����ŷ����Ҷ�������齱#l\r\n"//3
            text += "#L6##e#d#v4170001#���������齱#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 70);
        } else if (selection == 6) {
		cm.openNpc(9310084, 15);
        } else if (selection == 5) {
		cm.openNpc(9310084, 14);
        } else if (selection == 2) {
		cm.openNpc(9310084, 11);
        } else if (selection == 3) {
		cm.openNpc(9310084, 12);
        } else if (selection == 7) {
		cm.openNpc(9310084, 16);
        } else if (selection == 4) {
		cm.openNpc(9310084, 13);
	}
    }
}


