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
                
   cm.sendOk("��лʹ��.");
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
	for(i = 0; i < 10; i++){
		text += "";
	}				
	text += "#d�ϳ�-- #r��2000HPѪ�¡���Ҫ������Ʒ��\r\n#v1012412##d1000HPѪ�� * 1��\r\n#v4021008##d#z4021008# * 15��\r\n#v4021001##d#z4021001# * 15��\r\n#v4021003##d#z4021003# * 15��\r\n#v4021007##d#z4021007# * 15��\r\n#v4000313##d#z4000313# * 1500��\r\n~\r\n"
	text += "\r\n#L1##d���ռ���������Ʒ��ȷ������2000HPѪ��";//����
	text += "     \r\n"
        cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1012176,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
            cm.dispose();
        } else if(cm.haveItem(4021008,15) && cm.haveItem(4021001,15) && cm.haveItem(4021003,15) && cm.haveItem(4021007,15) && cm.haveItem(4000313,1500) && cm.haveItem(1012412,1)){
				cm.gainItem(4021008, -15);
				cm.gainItem(4021001, -15);
				cm.gainItem(4021003, -15);
				cm.gainItem(4021007, -15);
				cm.gainItem(4000313, -1500);
				cm.gainItem(1012412, -1);
cm.gainItem(1012176,20,20,20,20,2000,2000,0,0,0,0,0,0,0,0);
            cm.sendOk("�����ɹ���");
            cm.dispose();
cm.����(3, "��ң�[" + cm.getPlayer().getName() + "]�ɹ�����2000HPѪ�£���ϲ����");
			}else{
            cm.sendOk("�޷�������������#v4021008#����15��\r\n#v4021001#����15��\r\n#v4021003#����15��\r\n#v4021007#����15��\r\n#v4000313#����1500��\r\n#v1012412#����1��\r\n");
            cm.dispose();
			}
		}
    }
}




