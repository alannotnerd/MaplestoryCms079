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
			text += "\t\t\t  #e��ӭ����#b���ð�յ���������ϵͳ #k!#n\r\n"
            text += "#r���Ը���ɫװ������һ����ʱ������λ��#l\r\n\r\n"//3
            text += "#L1##r7������λ3000���#l\r\n\r\n"//3
            text += "#L2##r15������λ5000���#l\r\n\r\n"//3
            text += "#L3##r1��������λ8000���#l\r\n\r\n"//3
            text += "#L4##r3��������λ20000���#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getCSPoints(1) >= 3000){
				cm.gainNX(-3000);
				cm.xlkc(7);
            cm.sendOk("����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]���������ð�յ�3000�����������ϵͳ��");
            cm.dispose();
			}else{
            cm.sendOk("������޷�����");
            cm.dispose();
			}
        } else if (selection == 2) {
			if(cm.getPlayer().getCSPoints(1) >= 5000){
				cm.gainNX(-5000);
				cm.xlkc(15);
            cm.sendOk("����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]���������ð�յ�5000�����������ϵͳ��");
            cm.dispose();
			}else{
            cm.sendOk("������޷�����");
            cm.dispose();
			}
        } else if (selection == 3) {
			if(cm.getPlayer().getCSPoints(1) >= 8000){
				cm.gainNX(-8000);
				cm.xlkc(30);
            cm.sendOk("����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]���������ð�յ�8000�����������ϵͳ��");
            cm.dispose();
			}else{
            cm.sendOk("������޷�����");
            cm.dispose();
			}
        } else if (selection == 4) {
			if(cm.getPlayer().getCSPoints(1) >= 20000){
				cm.gainNX(-20000);
				cm.xlkc(90);
            cm.sendOk("����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]���������ð�յ�20000�����������ϵͳ��");
            cm.dispose();
			}else{
            cm.sendOk("������޷�����");
            cm.dispose();
			}
		}
    }
}


