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
			text += "\t\t\t  #e��ӭ����#r����ð�յ� #k!#n\r\n\r\n"
            text += "#r������ֵָ�ϣ�\r\n\r\n"//3
            text += "#r1.��������������Ϊ�� #b1��150#r����10RMB=1500���\r\n\r\n"//3
            text += "#r2.������˽�³����κ���Ʒ��������������������㶼�޷�ͨ��GM������#l\r\n\r\n"//3
            text += "#r3.������Ҫ�ر�ע��ĵط���#l\r\n#b�״γ�ֵһ���Դﵽ100RMB���ɻ��100W��ҵĽ������޶�ÿ���˺���ȡһ�Σ�\r\n"//3
            cm.sendOk(text);
		    cm.dispose();
		}
    }
}


