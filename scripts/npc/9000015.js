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
            text += "#e#d#l������[Ѱ�ұ���]����ϵ�.��������Ϊ ����/�Ͻ� ��Ȼ���˵�ͼ��ͬ������һ��.�ڵ�ͼ��Ѱ�����ӣ����������ҵ�#v4000313#�Ϳ������ҳ�ȡ�����ˣ�����:����.���.װ��.��ְҵ������.���ָ�������.���鵽ʲô�����أ���\r\n\r\n"//3
            text += "#L2##e#r#v4000313#����1��.��#v04031504#�����.#l\r\n\r\n"//3
            //text += "#L3##e#r��#v4000313#x3.��#v04031505#�����.( ��ְҵ������.)#l\r\n"//3
            //text += "#L4##e#r��#v4000313#x3.��#v04031506#�����.( ���ָ�������.)#l\r\n\r\n"//3
            text += "#L1##e#r#v4000212# �뿪�˻��ͼ#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 1);
        } else if (selection == 6) {
		cm.openNpc(9310059, 5);
        } else if (selection == 5) {
		cm.openNpc(9000015, 4);
        } else if (selection == 2) {
		cm.openNpc(9000015, 1);
        } else if (selection == 3) {
		cm.openNpc(9000015, 2);
        } else if (selection == 4) {
		cm.openNpc(9000015, 3);
	}
    }
}


