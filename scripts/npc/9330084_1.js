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
            text += "#e#d�����ɶ�������ȡ����#l\r\n\r\n"//3
            text += "#L1##r�һ������ɶ�����#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4031683,1)){
				cm.gainItem(4031683, -1);
				cm.gainItem(1112140,10,10,10,10,600,600,10,10,100,100,50,50,0,0);
				cm.gainItem(1112247,10,10,10,10,600,600,10,10,100,100,50,50,0,0);
				cm.gainItem(1142907,60,60,60,60,2200,2200,60,65,100,100,50,50,15,15);
				//cm.gainMeso(100000);
            cm.sendOk("�һ��ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]��������ɰ����ɶ���.��л���Ķ���֧�֣�����");
            cm.dispose();
			}else{
            cm.sendOk("���Ĳ��ϲ��㣡");
            cm.dispose();
			}
		}
    }
}


