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
            text += "#e#d#l������[ǧ��������]�����һ�����\r\n\r\n"//3
            text += "#L1##e#r#v4000435#x 1���һ�  #v2340000#x2��#l\r\n"//3
            text += "#L2##e#r#v4000435#x 1���һ�  #v2049100#x2��#l\r\n"//3
            text += "#L3##e#r#v4000435#x 2���һ� #v1022224#Lv50����+5/��/ħ+5#l\r\n"//3
            text += "#L4##e#r#v4000435#x 5+#v1022224#������#v1022225#Lv75����+7/��/ħ+7#l\r\n"//3
            text += "#L5##e#r#v4000435#x10+#v1022225#������#v1022226#Lv120����+10/��/ħ+10#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9270045, 3);
        } else if (selection == 2) {
		cm.openNpc(9270045, 4);
        } else if (selection == 3) {
		cm.openNpc(9270045, 5);
        } else if (selection == 4) {
		cm.openNpc(9270045, 6);
        } else if (selection == 5) {
		cm.openNpc(9270045, 7);
        } else if (selection == 6) {
		cm.openNpc(9270045, 8);
	}
    }
}


