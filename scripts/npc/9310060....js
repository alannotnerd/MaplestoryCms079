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
            text += "#k��ð�յ�����������������Ұ��BOSSŶ��������ţ����Ģ�����ȵ�...��ô���������ɱ���ǻ��ս��Ʒ���Ҿͻ��������ͽ����˵Ľ�ָŶ��ȥѰ�Ҹ��ص�BOSS�ɣ�\r\n(��δ����.�ű�������...)\r\n\r\n"//3
            text += "#L1##e#dLv 30#v1113164#�����ͽ����˽�ָ.#l\r\n"//3
            text += "#L2##e#dLv 60#v1113165#�ͽ����˽�ָ.#l\r\n"//3
            text += "#L3##e#dLv 90#v1113166#�����ͽ����˽�ָ.#l\r\n"//3
            text += "#L4##e#dLv135#v1113167#��ʦ�ͽ����˽�ָ.#l\r\n"//3
            text += "#L5##e#dLv150#v1113168#��˵�ͽ����˽�ָ.#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9310060, 70);
        } else if (selection == 2) {
		cm.openNpc(9310060, 5);
        } else if (selection == 3) {
		cm.openNpc(9310060, 4);
        } else if (selection == 4) {
		cm.openNpc(9310060, 1);
        } else if (selection == 5) {
		cm.openNpc(9310060, 2);
        } else if (selection == 4) {
		cm.openNpc(9000017, 3);
	}
    }
}


