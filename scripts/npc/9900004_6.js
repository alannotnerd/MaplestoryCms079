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
			text += "\t\t\t  #e��ӭ����#b���ð�յ�9999����� #k!#n\r\n"
            text += "#r�����ֹ���ڣ�2016��2��3�� 23��59��#l\r\n\r\n"//3
            text += "#r����ۿۼ۸�9999���#l\r\n\r\n"//3
            text += "#b��������ʥ#v5000026##l\r\n\r\n"//3
            text += "#b˫�����鿨һ��#v5210001##l\r\n\r\n"//3
            text += "#b˫�����ʿ�һ��#v5360016##l\r\n\r\n"//3
            text += "#b�߼�װ������֤�����#v5590001##l\r\n\r\n"//3
            text += "#b�����ָ����7��#v5532002##l\r\n\r\n"//3
            text += "#b�Ͱ�����HP 500��#v2001001##l\r\n\r\n"//3
            text += "#b���ٱ�MP   500��#v2001002##l\r\n\r\n"//3
            text += "#b��������80Wð�ձ�~#l\r\n\r\n"//3
            text += "#L1##rȷ�����������͵��Ұɣ�#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getCSPoints(1) >= 9999){
				cm.gainNX(-9999);
				cm.gainPet(5000026,"�����ʥ",1,0,100,90);
				cm.gainItem(5210001, 1, 7);//b˫�����鿨һ��
				cm.gainItem(5360016, 1,	7);//b˫�����ʿ�һ��
				cm.gainItem(5590001, 1, 15);//bװ������֤�����
				cm.gainItem(5532002, 4);//b�����ָ����7��
				cm.gainItem(2001001, 500);
				cm.gainItem(2001002, 500);
				cm.gainMeso(800000);
            cm.sendOk("����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]���������ð�յ�9999���������");
            cm.dispose();
			}else{
            cm.sendOk("������޷�����");
            cm.dispose();
			}
		}
    }
}


