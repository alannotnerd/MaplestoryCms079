var ���� = "#fEffect/CharacterEff/1022223/4/0#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon6/7#";
var ������ = "#fUI/UIWindow/Quest/icon3/6#";
var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
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
            text += "#e#d#l������[СС�۾�]���촦��\r\n"//3
            text += "" + ��ɫ��ͷ + "#L1##e#d����#v1022132#��4ά+2������+1��ħ��+1�� ��Ҫ��  #v4001160#x10��#l\r\n\r\n"//3
            //text += "#L2##e#d#v4000435# 1���һ�  #v2049100#x2��#l\r\n"//3
            text += "" + ��ɫ��ͷ + "#L3##e#d#v4001160#x20 + #v1022132# ������ #v1022163#��4ά+4������+2��ħ��+2��#l\r\n"//3
            text += "" + ��ɫ��ͷ + "#L4##e#d#v4001160#x30 + #v1022163# ������ #v1022149#��4ά+6������+3��ħ��+3��#l\r\n"//3
            //text += "" + ��ɫ��ͷ + "#L5##e#d#v4170001#x50 + #v1032101# ������ #v1032186#ȫ����+9 ��ħ+3#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		         if(cm.haveItem(4001160,10)){
				cm.gainItem(4001160, -10);
				cm.gainItem(1022132,2,2,2,2,0,0,1,1,0,0,0,0,0,0);
				//cm.gainMeso(999999);
            cm.sendOk("�����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]������[�����۾�]���������ͽ������쵽���°ɣ�");
cm.����(3, "��ң�[" + cm.getPlayer().getName() + "]�ɹ�������[����]���������ͽ������쵽���°ɣ�");
            cm.dispose();
			}else{
            cm.sendOk("���Ĳ��ϲ��㣡����[����]����Ҫ\r\n#v4001160#x10��");
            cm.dispose();
			}
        } else if (selection == 2) {
		cm.openNpc(9270045, 4);
        } else if (selection == 3) {
		cm.openNpc(9000017, 21);
        } else if (selection == 4) {
		cm.openNpc(9000017, 22);
        } else if (selection == 5) {
		cm.openNpc(9000017, 33);
        } else if (selection == 6) {
		cm.openNpc(9270045, 8);
	}
    }
}


