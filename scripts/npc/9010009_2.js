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
			text += "#e#r�����ҽ�Ϊ����������ͻ����˵�λ�ã�#k!#n\r\n\r\n"
            text += "#r1�����̵�1��λ�ã�#bÿ�������е�npc����\r\n"//3
            text += "#r2�����̵�2��λ�ã�#b���ִ�-�н�����-������\r\n"//3
            text += "#r3�����̵�3��λ�ã�#bħ������-����������-�׵�\r\n"//3
            text += "#r4�����̵�4��λ�ã�#b��ʿ����-�ֿ��ϰ�-������\r\n"//3
            text += "#r5�����̵�5��λ�ã�#b��������-���ɹ���Ա-����\r\n"//3
            text += "#r6�����̵�6��λ�ã�#b����֮��-�ֿ����Ա-������\r\n"//3
            text += "#r7�����̵�7��λ�ã�#b���֮��-�ֿ����Ա-С��\r\n"//3
            text += "#r8�����̵�8��λ�ã�#b����ѩ��-�ֿ����Ա-������\r\n"//3
            text += "#r9�����̵�9��λ�ã�#b��߳�-�ֿ����Ա-���\r\n"//3
            text += "#r10�����̵�10��λ�ã�#b��ľ��-�ֿ����Ա-��˹��\r\n"//3
            cm.sendOk(text);
		    cm.dispose();
		}
    }
}


