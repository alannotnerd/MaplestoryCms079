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
            text += "#e#d����[�Ϲ����Ž�ָ]��Ҫ#v4011001#x1��#v4011000#x1��#v4011003#x1��#v4011002#x1�Ѽ��õ����ҾͿ���Ϊ��������.\r\n#r��߿�������LV50#k.#l\r\n\r\n"//3
            text += "#L1##r�����Ϲ����Ž�ָ#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			//1
			//2
			//3
			//4
			//5
			/*if(!cm.beibao(1,3)){
            cm.sendOk("װ�������಻��3���ո�");
            cm.dispose();
			}else if(!cm.beibao(2,2)){
            cm.sendOk("���������಻��2���ո�");
            cm.dispose();
			}else if(!cm.beibao(3,1)){
            cm.sendOk("���������಻��1���ո�");
            cm.dispose();
			}else if(!cm.beibao(4,1)){
            cm.sendOk("���������಻��1���ո�");
            cm.dispose();
			}else if(!cm.beibao(5,1)){
            cm.sendOk("�ֽ������಻��1���ո�");
            cm.dispose();
			}else */if(cm.haveItem(4011001,1) && cm.haveItem(4011000,1) && cm.haveItem(4011002,1) && cm.haveItem(4011003,1)){
				cm.gainItem(4011001, -1);
				cm.gainItem(4011000, -1);
				cm.gainItem(4011002, -1);
				cm.gainItem(4011003, -1);
				cm.gainItem(1112446, 1);//�Ϲ���ָV1
				//cm.gainMeso(999999);
            cm.sendOk("�����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]������[�Ϲ����Ž�ָLV1]���������ͽ������쵽���°ɣ�");
            cm.dispose();
cm.����(3, "��ң�[" + cm.getPlayer().getName() + "]�ɹ�������[�Ϲ����Ž�ָLV1]���������ͽ������쵽���°ɣ�");
			}else{
            cm.sendOk("���Ĳ��ϲ��㣡����[�Ϲ����Ž�ָLV1]����Ҫ\r\n#v4011001#x1��\r\n#v4011000#x1��\r\n#v4011003#x1��\r\n#v4011002#x1");
            cm.dispose();
			}
		}
    }
}


