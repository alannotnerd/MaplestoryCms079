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
            text += "#e#d��ʯ�ɶ�������ȡ����#l\r\n\r\n"//3
            text += "#L1##r��ʯ�ɶ�����#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4031685,1)){
				cm.gainItem(4031685, -1);
				cm.gainItem(1142742,88,88,88,88,3000,3000,100,100,200,200,50,50,15,15);
				cm.gainItem(1112138,20,20,20,20,1000,1000,20,20,100,100,50,50,0,0);
				cm.gainItem(1112245,20,20,20,20,1000,1000,20,20,100,100,50,50,0,0);
				//cm.gainMeso(100000);
            cm.sendOk("�һ��ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]�����������ʯ�ɶ���.��л���Ķ���֧�֣�����");
            cm.dispose();
			}else{
            cm.sendOk("���Ĳ��ϲ��㣡");
            cm.dispose();
			}
		}
    }
}


