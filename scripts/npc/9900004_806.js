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
            text += "#e#r�ۻ���ֵ�ﵽ1000������ɻ�ã�#n#b\r\n�١�ð�ձ�=2000��\r\n�ڡ��ʼ�����*5��\r\n�ۡ���Ҷ����һ��\r\n�ܡ�ѫ����ά200�Ұ�����ѫ��һö\r\n�ݡ�ף���ͻ����5��\r\n�ޡ���������һ����������������Ŷ��\r\n�ߡ���ѡ����8�ţ�����ѡ60%����10%\r\n�ࡢ�����׹������ʹ��Ȩһ��\r\n#r��ȡ�������Ҫ���㹻�Ŀռ�Ŷ������ϵͳ���˶���������Ա������Ŷ\r\n"//3
            text += "#L1##r#v4310028#��ȡ�ۼƳ�ֵ1000���#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1112793,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
            cm.dispose();
        } else if(cm.haveItem(4310028,1)){
				cm.gainItem(4310028, -1);
				cm.gainItem(4001215, 5);//�ʼ�
				cm.gainItem(2340000, 5);//ף��
				cm.gainItem(2049100, 5);//����
				cm.gainItem(1122017, 1);//
				cm.gainItem(1032035,6,6,6,6,100,100,5,5,10,10,10,10,0,0);//��Ҷ����
				cm.gainItem(1142219,200,200,200,200,1000,1000,10,10,50,50,50,50,20,20);//ѫ��
				cm.gainMeso(20000000);
            cm.sendOk("��ȡ�ɹ�����ѡ���ᡢ��ѡ��������ҹ���Ա��ã�");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ���ȡ�ۻ���ֵ1000�������");
            cm.dispose();
			}else{
            cm.sendOk("��ĳ�ֵ�ﲻ���޶ȣ��������Ѿ���ȡ���ˣ������ظ���ȡ��");
            cm.dispose();
			}
		}
    }
}


