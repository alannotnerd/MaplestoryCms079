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
			cm.sendSimple("#b��ӭ��� #r#h ##k ,��ӭ�������ڻ,�����Ƕһ���Ʒ�����ޣ�#b�һ�ǰ��ȷ�ϱ�������,�������Ը�����" +
            "#k\r\n#L101##r����#i2022034##bx1#r��#b��ԭ����ҩ #i 2210015#ֻ�ܶһ�һ��\r\n#L102##r����#i2022034##bx3#r��#b���õ��#i5121009#x1\r\n#L103##r����#i2022034##bx15#r��#b���ƹ�����60%#i2040914#x1\r\n#L104##r����#i2022034##bx20#r��#b������Ա�����100%#i2049104#x1\r\n#L105##r����#i2022034##bx30#r��#b���ƹ�����30%#i2040917#x1\r\n#L106##r����#i2022034##bx100#r��#b#v1142005##z1142005#x1");
        } else if (status == 1) {
            
            if (selection == 101) {
                if (cm.haveItem(2022034, 1) ) {
                    cm.gainItem(2022034, -1);
                    cm.gainItem(2210015, 1);
					cm.gainItem(4031456,1)
                    cm.sendOk("���#i2210015##i4031456#");
                    cm.dispose();
                } else {
                    cm.sendOk("������û���㹻��#i2210015#,���ڴ�ȷ��");
                    cm.dispose();
                }
            } else if (selection == 102) {
                if (cm.haveItem(2022034, 3) ) {
                    cm.gainItem(2022034, -3);
                    cm.gainItem(5121009, 1);
					cm.gainItem(4031456, 3);
                    cm.sendOk("���#i5121009#x1#i4031456#x3");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i2022034#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 103) {
                if (cm.haveItem(2022034, 15) ) {
                    cm.gainItem(2022034, -15);
                    cm.gainItem(2040914, 1);
					cm.gainItem(4031456, 15);
                    cm.sendOk("���#i2040914#x1#i4031456#x15");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i4032226#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 104) {
                if (cm.haveItem(2022034, 20) ) {
                    cm.gainItem(2022034, -20);
                    cm.gainItem(2049104, 1);
					cm.gainItem(4031456,20)
                    cm.sendOk("���#i2049104#x1#i4031456#x20");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i2022034#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 105) {
                if (cm.haveItem(2022034, 30) ) {
                    cm.gainItem(2022034, -30);
                    cm.gainItem(2040917, 1);
					cm.gainItem(4031456,30)
                    cm.sendOk("���#i2040917#x1#i4031456#x30");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i2022034#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 106) {
                if (cm.haveItem(2022034, 100) ) {
                    cm.gainItem(2022034, -100);
                    cm.gainItem(1142005, 1);
					cm.gainItem(4031456,100)
                    cm.sendOk("���#i1142005#x1#i4031456#x100");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i2022034#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 107) {
                if (cm.haveItem(4032226, 1) ) {
                    cm.gainItem(4032226, -1);
                    cm.gainItem(2022488, 1);
                    cm.sendOk("���#i2022488#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i4032226#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 108) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022489, 1);
                    cm.sendOk("���#i2022489#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i4032226#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }else if (selection == 109) {
                if (cm.haveItem(4032226, 20) ) {
                    cm.gainItem(4032226, -20);
                    cm.gainItem(2022490, 1);
                    cm.sendOk("���#i2022490#x1");
                    cm.dispose();
                } else {
                    cm.sendOk("������û��#i4032226#,���ڴ�ȷ��");
                    cm.dispose();
				}
			 }
        }
    }
}

	