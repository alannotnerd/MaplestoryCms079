/*
 By ����
 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		var Editing = false //true=��ʾ;false=��ʼ�
          if(Editing){
          cm.sendOk("��ͣ����");
          cm.dispose();
          return;
        } 
			cm.sendSimple("#b��ӭ��� #r#h ##k �һ�#r�����˴�#i3010054#" +
            "#k\r\n#L101##r�ƽ���#i4032226##bx1000#r��#b�����˴� #i3010054#\r\n");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(4032226, 1000) ) {
                    cm.gainItem(4032226, -1000);
                    cm.gainItem(3010054, 1);
                    cm.sendOk("���#i3010054#");
                    cm.dispose();
                } else {
                    cm.sendOk("������û���㹻��#i4032226#,���ڴ�ȷ��");
                    cm.dispose();
                }
            }
        }
    }
}

	