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
            text += "#L1##r#v4170010#��ȡŮ��ѫ�£�#l\r\n\r\n"//3
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
			}else if(!cm.beibao(2,1)){
            cm.sendOk("���������಻��1���ո�");
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
			}else */if(cm.haveItem(4170010,1)){
				cm.gainItem(4170010, -1);
				cm.gainItem(1142574,6,6,6,6,500,500,5,5,50,50,50,50,10,5);////�������ѫ��
            cm.sendOk("�ɹ���ȡ��");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ������ȡŮ��ѫ�£�diao˿�ǿ�׷�ɣ���");
            cm.dispose();
			}else{
            cm.sendOk("���߲����޷�������");
            cm.dispose();
			}
		}
    }
}


