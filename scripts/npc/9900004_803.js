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
            text += "#e#r�ۻ���ֵ�ﵽ300������ɻ�ã�#n#b\r\n�١�ð�ձ�=100��\r\n�ڡ��ʼ�����*3��\r\n�ۡ����ֽ�ָһ��������+5, ���\+5, ����+5, ����+5, HP+100, MP+100������+5��ħ��+5��\r\n�ܡ���ά100ѫ��һö\r\n�ݡ�ף���ͻ����2��\r\n�ޡ���Ǯ��һ��\r\n�ߡ���ѡ����2�ţ�����ѡ60%����10%\r\n#r��ȡ�������Ҫ���㹻�Ŀռ�Ŷ������ϵͳ���˶���������Ա������Ŷ\r\n"//3
            text += "#L1##r#v4310049#��ȡ�ۼƳ�ֵ300���#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
            cm.dispose();
        } else if(cm.haveItem(4310049,1)){
				cm.gainItem(4310049, -1);
				cm.gainItem(4001215, 3);//�ʼ�
				cm.gainItem(1112793, 1);//���ֽ�ָ
				cm.gainItem(2340000, 2);//ף��
				cm.gainItem(2049100, 2);//����
				cm.gainItem(2070005, 1);//��Ǯ��
				cm.gainItem(1142070,100,100,100,100,500,500,6,6,50,50,50,50,10,10);//xunzhang
				cm.gainMeso(1000000);
            cm.sendOk("��ȡ�ɹ�����ѡ��������ҹ���Ա��ã�");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ���ȡ�ۻ���ֵ300�������");
            cm.dispose();
			}else{
            cm.sendOk("��ĳ�ֵ�ﲻ���޶ȣ��������Ѿ���ȡ���ˣ������ظ���ȡ��");
            cm.dispose();
			}
		}
    }
}


