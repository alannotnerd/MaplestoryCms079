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
            text += "#e#r�ۻ���ֵ�ﵽ800������ɻ�ã�#n#b\r\n�١�ð�ձ�=1000��\r\n�ڡ��ʼ�����*3��\r\n�ۡ��������׺�ɫһ������Ȼ+5����������������7��Ŷ��\r\n�ܡ�ף���ͻ����3��\r\n�ݡ�������1��\r\n�ޡ���ά150�Ұ�����ѫ��һö\r\n����ѡ����5�ţ�����ѡ60%����10%\r\n#r��ȡ�������Ҫ���㹻�Ŀռ�Ŷ������ϵͳ���˶���������Ա������Ŷ\r\n"//3
            text += "#L1##r#v4310018#��ȡ�ۼƳ�ֵ800���#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
            cm.dispose();
        } else if(cm.haveItem(4310018,1)){
				cm.gainItem(4310018, -1);
				cm.gainItem(4001215, 3);//�ʼ�
				cm.gainItem(2340000, 3);//ף��
				cm.gainItem(2049100, 3);//����
				cm.gainItem(2070006, 1);//����
				cm.gainItem(1082149,0,0,0,0,0,0,5,5,0,0,0,0,0,0);//����
				cm.gainItem(1142219,150,150,150,150,800,800,10,10,50,50,50,50,20,20);//ѫ��
				cm.gainMeso(10000000);
            cm.sendOk("��ȡ�ɹ�����ѡ��������ҹ���Ա��ã�");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ���ȡ�ۻ���ֵ800�������");
            cm.dispose();
			}else{
            cm.sendOk("��ĳ�ֵ�ﲻ���޶ȣ��������Ѿ���ȡ���ˣ������ظ���ȡ��");
            cm.dispose();
			}
		}
    }
}


