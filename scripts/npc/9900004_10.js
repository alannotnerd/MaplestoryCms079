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
                text += "";//
            }
			text += "\t\t\t  #e��ӭ����#b���ð�յ� #k!#n\r\n"
			text += "\t\t\t  #e����ǰ����Ϊ��#b"+cm.getHyPay(4)+"#k!#n\r\n"
            text += "#L1##d5���ֳ齱(����)#l\r\n\r\n"//3
            text += "#L2##r10���ֳ齱(װ��/����)#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
            cm.openNpc(9900004, 11);
        } else if (selection == 2) {
            cm.openNpc(9900004, 12);
		}
    }
}


