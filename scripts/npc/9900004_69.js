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
            text += "#e#d����ϵȺ����ȡ#v4170007#�һ�������õ����ֵ�����ң�����·���ɫѡ����ȡ���������QQȺ��84586869#l\r\n\r\n"//3
            text += "#L1##r��ȡ������פ���#l\r\n\r\n"//3
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
			}else */if(cm.haveItem(4170007,1)){
				cm.gainItem(4170007, -1);
				cm.gainItem(2022109, 20);//����
				cm.gainItem(1003528, 1);//2012�ھ�ñ��
				cm.gainItem(5072000, 100);//����01112724
				cm.gainItem(4000463, 50);//�����
				cm.gainItem(1142950,5,5,5,5,150,150,5,5,15,15,15,15,15,15);//ѫ��
				cm.gainItem(5150040, 1);//�ʼ�
				cm.gainItem(5151001, 5);//Ⱦɫ
				cm.gainItem(5152001, 10);//����
				cm.gainItem(5153000, 5);//����
				cm.gainMeso(999999);
            cm.sendOk("�����ɹ���");
			cm.worldMessage(6,"��ң�["+cm.getName()+"]��ȡ�����ð�յ� ������פ�������ӭ��~��ôô�գ�");
            cm.dispose();
			}else{
            cm.sendOk("����ϵ����Ա��ȡ�һ���Ʒ��");
            cm.dispose();
			}
		}
    }
}


