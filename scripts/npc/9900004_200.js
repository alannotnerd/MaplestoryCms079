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
            text += "#r����������ܵͣ����Ѵ�ö��֣���Ҫ��ǿ����Ҫ��������𣿣�\r\n\r\n"//3
            text += "#L1##r���򼫹��ָ����ά+4������/ħ��+2��\tʹ��ʱ�䣺7��Ȩ\r\n\r\n"//3
            text += "#L2##r����͸����������ά+5������/ħ��+5��\tʹ��ʱ�䣺7��Ȩ\r\n\r\n"//3
            //text += "#L3##r����������СС�۾�#k>>>>>>>>>>>#bͨ��3#l\r\n\r\n"//3
            //text += "#L4##e#d#v1032060# ���찢��̩����.#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 201);
        } else if (selection == 6) {
		cm.openNpc(9310059, 5);
        } else if (selection == 5) {
		cm.openNpc(9310059, 4);
        } else if (selection == 2) {
		cm.openNpc(9900004, 202);
        } else if (selection == 3) {
		cm.openNpc(9000017, 20);
        } else if (selection == 4) {
		cm.openNpc(9000017, 3);
	}
    }
}


