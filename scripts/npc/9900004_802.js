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
            text += "#e#r�ۻ���ֵ�ﵽ200������ɻ�ã�#n#b\r\n1��ð�ձ�=100��\r\n2���ʼ�����*2��\r\n3�����ֽ�ָһ��������+5, ���\+5, ����+5,����+5,HP+100,MP+100,����+5,ħ��+5\r\n4����ѡ����һ�ţ�����ѡ60%����10%\r\n5��ף���ͻ����1��\r\n6����Ǯ��һ��\r\n7����ѡ����1�ţ�����ѡ60%����10%\r\n#r��ȡ�������Ҫ���㹻�Ŀռ�Ŷ������ϵͳ���˶���������Ա������Ŷ\r\n"//3
            text += "#L1##r#v4310016#��ȡ�ۼƳ�ֵ200���#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
            cm.dispose();
        } else if(cm.haveItem(4310016,1)){
				cm.gainItem(4310016, -1);
				cm.gainItem(4001215, 2);//�ʼ�
				cm.gainItem(1112793, 1);//���ֽ�ָ
				cm.gainItem(2340000, 1);//ף��
				cm.gainItem(2049100, 1);//����
				cm.gainItem(2070005, 1);//��Ǯ��
				cm.gainMeso(1000000);
            cm.sendOk("��ȡ�ɹ�����ѡ��������ҹ���Ա��ã�");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ���ȡ�ۻ���ֵ200�������");
            cm.dispose();
			}else{
            cm.sendOk("��ĳ�ֵ�ﲻ���޶ȣ��������Ѿ���ȡ���ˣ������ظ���ȡ��");
            cm.dispose();
			}
		}
    }
}


