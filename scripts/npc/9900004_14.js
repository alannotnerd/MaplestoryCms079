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
                text += "";//
            }
			text += "\t\t\t  #e��ӭ����#b���ð�յ� #k!#n\r\n"
			text += "\t\t\t  #e����ǰ���Ϊ��#b"+cm.getPlayer().getCSPoints(1)+"#k!#n\r\n"
            text += "#L1##e#d100���һ�1�����ױ�#l\r\n\r\n"//3
            text += "#L2##d500���һ�5�����ױ�#l\r\n\r\n"//3
            text += "#L3##d1000���һ�10�����ױ�#l\r\n\r\n"//3
            text += "#L4##d5000���һ�50�����ױ�#l\r\n\r\n"//3
            text += "#L5##d10000���һ�100�����ױ�#l\r\n\r\n"//3
            text += "#L6##r1�����ױҶһ�100���#l\r\n\r\n"//3
            text += "#L7##r5�����ױҶһ�500���#l\r\n\r\n"//3
            text += "#L8##r10�����ױҶһ�1000���#l\r\n\r\n"//3
            text += "#L9##r50�����ױҶһ�5000���#l\r\n\r\n"//3
            text += "#L10##r100�����ױҶһ�10000���#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                if (cm.getPlayer().getCSPoints(1) >= 100) {
					item = cm.gainGachaponItem(4000463, 1);
					if (item != -1) {
						cm.sendOk("������ #b#t" + item + "##k " + 1 + "����");
						cm.getPlayer().modifyCSPoints(1, -100);
					} else {
						cm.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
					}
                    cm.dispose();
                    
                } else {
                    cm.sendOk("#b��û���㹻�ĵ����й���,���ֵ.");
                    cm.dispose();
                }
        } else if (selection == 2) {
                if (cm.getPlayer().getCSPoints(1) >= 500) {
					item = cm.gainGachaponItem(4000463, 5);
					if (item != -1) {
						cm.sendOk("������ #b#t" + item + "##k " + 5 + "����");
						cm.getPlayer().modifyCSPoints(1, -500);
					} else {
						cm.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
					}
                    cm.dispose();
                    
                } else {
                    cm.sendOk("#b��û���㹻�ĵ����й���,���ֵ.");
                    cm.dispose();
                }
        } else if (selection == 3) {
                if (cm.getPlayer().getCSPoints(1) >= 1000) {
					item = cm.gainGachaponItem(4000463, 10);
					if (item != -1) {
						cm.sendOk("������ #b#t" + item + "##k " + 10 + "����");
						cm.getPlayer().modifyCSPoints(1, -1000);
					} else {
						cm.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
					}
                    cm.dispose();
                    
                } else {
                    cm.sendOk("#b��û���㹻�ĵ����й���,���ֵ.");
                    cm.dispose();
                }
        } else if (selection == 4) {
                if (cm.getPlayer().getCSPoints(1) >= 5000) {
					item = cm.gainGachaponItem(4000463, 50);
					if (item != -1) {
						cm.sendOk("������ #b#t" + item + "##k " + 50 + "����");
						cm.getPlayer().modifyCSPoints(1, -5000);
					} else {
						cm.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
					}
                    cm.dispose();
                    
                } else {
                    cm.sendOk("#b��û���㹻�ĵ����й���,���ֵ.");
                    cm.dispose();
                }
        } else if (selection == 5) {
                if (cm.getPlayer().getCSPoints(1) >= 10000) {
					item = cm.gainGachaponItem(4000463, 100);
					if (item != -1) {
						cm.sendOk("������ #b#t" + item + "##k " + 100 + "����");
						cm.getPlayer().modifyCSPoints(1, -10000);
					} else {
						cm.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
					}
                    cm.dispose();
                    
                } else {
                    cm.sendOk("#b��û���㹻�ĵ����й���,���ֵ.");
                    cm.dispose();
                }
        } else if (selection == 6) {
        if (cm.haveItem(4000463, 1)) {
			cm.gainItem(4000463,-1);
			cm.getPlayer().modifyCSPoints(1, 100);
			cm.sendOk("������100�����");
		}else{
            cm.sendOk("#b��û���㹻���н���޷��һ���.");
		}
                    cm.dispose();
        } else if (selection == 7) {
        if (cm.haveItem(4000463, 5)) {
			cm.gainItem(4000463,-5);
			cm.getPlayer().modifyCSPoints(1, 500);
			cm.sendOk("������500�����");
		}else{
            cm.sendOk("#b��û���㹻���н���޷��һ���.");
		}
                    cm.dispose();
        } else if (selection == 8) {
        if (cm.haveItem(4000463, 10)) {
			cm.gainItem(4000463,-10);
			cm.getPlayer().modifyCSPoints(1, 1000);
			cm.sendOk("������1000�����");
		}else{
            cm.sendOk("#b��û���㹻���н���޷��һ���.");
		}
                    cm.dispose();
        } else if (selection == 9) {
        if (cm.haveItem(4000463, 50)) {
			cm.gainItem(4000463,-50);
			cm.getPlayer().modifyCSPoints(1, 5000);
			cm.sendOk("������5000�����");
		}else{
            cm.sendOk("#b��û���㹻���н���޷��һ���.");
		}
                    cm.dispose();
        } else if (selection == 10) {
        if (cm.haveItem(4000463, 100)) {
			cm.gainItem(4000463,-100);
			cm.getPlayer().modifyCSPoints(1, 10000);
			cm.sendOk("������10000�����");
		}else{
            cm.sendOk("#b��û���㹻���н���޷��һ���.");
		}
                    cm.dispose();
		}
    }
}


