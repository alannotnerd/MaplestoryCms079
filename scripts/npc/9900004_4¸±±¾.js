var ���� = "#fUI/StatusBar/BtChat/normal/0#";
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
			text += "\t\t\t  #e��ӭ����#b���ð�յ� #k!#n\r\n"
            text += "#d1.��������-���-���ʣ�1��#l\r\n\r\n"//3
            text += "#r2.������˽�³����κ���Ʒ���#l\r\n\r\n"//3
            text += "#r3.������ֵ������1:100#l\r\n\r\n"//3
            text += "#r4.Ŀǰֻ����ְҵ��սʿ.ħ��ʦ.������.����\r\n(����ְҵ���ڿ���)#l\r\n\r\n"//3
            text += "#r5.�������и���+����+������Ϸ����#l\r\n\r\n"//3
            text += "#r6.���ּ�����������������ϵ�"+ ���� +"��ť���ɽ������#l\r\n\r\n"//3
            cm.sendOk(text);
		    cm.dispose();
		}
    }
}


