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
			text += ""
            text += "#L1##e#r100#d��#v4001126##d�һ�#r10000#d���#l\r\n\r\n"//3
            text += "#L2##e#r500#d��#v4001126##d�һ�#r50000#d���#l\r\n\r\n"//3
            text += "#L3##e#r1000#d��#v4001126##d�һ�#r100000#d���#l\r\n\r\n"//3
           // text += "#L4##e#r5000#d��#v4001126##d�һ�#r5000#d���þ�#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) { 
			if(cm.haveItem(4001126,100)){
				//cm.gainDY(100);
                                cm.getPlayer().modifyCSPoints(1, 10000);
				cm.gainItem(4001126,-100);
				cm.sendOk("100����Ҷ�һ�10000���ɹ���");
			    cm.worldMessage(6,"���һ�ϵͳ��["+cm.getName()+"]100����Ҷ�һ�10000���ɹ���");
				cm.dispose();
			}else{
				cm.sendOk("��û��100����Ҷ�޷��һ�10000���");
				cm.dispose();
			}
        } else if (selection == 2) {  
			if(cm.haveItem(4001126,500)){
                                cm.getPlayer().modifyCSPoints(1, 50000);
				cm.gainItem(4001126,-500);
				cm.sendOk("500����Ҷ�һ�50000���ɹ���");
			    cm.worldMessage(6,"���һ�ϵͳ��["+cm.getName()+"]500����Ҷ�һ�500���þ�ɹ���");
				cm.dispose();
			}else{
				cm.sendOk("��û��500����Ҷ�޷��һ�50000���");
				cm.dispose();
			}
        } else if (selection == 3) { 
			if(cm.haveItem(4001126,1000)){
                                cm.getPlayer().modifyCSPoints(1, 100000);
				cm.gainItem(4001126,-1000);
				cm.sendOk("1000����Ҷ�һ�100000���ɹ���");
			    cm.worldMessage(6,"���һ�ϵͳ��["+cm.getName()+"]1000����Ҷ�һ�100000���ɹ���");
				cm.dispose();
			}else{
				cm.sendOk("��û��1000����Ҷ�޷��һ�100000���");
				cm.dispose();
			}
        } else if (selection == 4) {
			if(cm.haveItem(4001126,5000)){
				cm.gainDY(5000);
				cm.gainItem(4001126,-5000);
				cm.sendOk("5000����Ҷ�һ�5000���þ�ɹ���");
			    cm.worldMessage(6,"���һ�ϵͳ��["+cm.getName()+"]5000����Ҷ�һ�5000���þ�ɹ���");
				cm.dispose();
			}else{
				cm.sendOk("��û��5000����Ҷ�޷��һ�5000���þ�");
				cm.dispose();
			}
		}
    }
}


