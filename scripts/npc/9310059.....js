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
            text += "#L1##r#l�����Ǹ��������齱��.\r\n\r\n"//3
            text += "#L2##e#d��������齱#l\r\n"//3
            text += "#L3##e#d�����������齱#l\r\n"//3
            text += "#L4##e#d��߸������齱#l\r\n"//3
            text += "#L5##e#d��ո������齱#l\r\n"//3
            text += "#L6##e#d���������齱#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 70);
        } else if (selection == 6) {
		cm.openNpc(9310059, 5);
        } else if (selection == 5) {
		cm.openNpc(9310059, 4);
        } else if (selection == 2) {
		cm.openNpc(9310059, 1);
        } else if (selection == 3) {
		cm.openNpc(9310059, 2);
        } else if (selection == 4) {
		cm.openNpc(9310059, 3);
	}
    }
}


