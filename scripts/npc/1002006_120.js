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
	text += "#d�ϳ�-- #r��3000HPѪ�¡���Ҫ������Ʒ��\r\n#v1012176##d2000HPѪ�� * 1��\r\n#v4000313##d#z4000313# * 2000��\r\n#v4000152##d#z4000152# * 50��\r\n#v4000151##d#z4000151# * 50��\r\n#v4000407##d#z4000407# * 50��\r\n#v4000402##d#z4000402# * 30��\r\n#v4000406##d#z4000406# * 30��\r\n~\r\n"
	text += "\r\n#L1##d���ռ���������Ʒ��ȷ������3000HPѪ��";//����
	text += "     \r\n"
        cm.sendSimple(text);
        } else if (selection == 1) {
                      if(!cm.canHold(1012083,1)){
			cm.sendOk("��������ı��������ٿճ�2��λ�ã�");
            cm.dispose();
        } else if(cm.haveItem(4000313,2000) && cm.haveItem(4000152,50) && cm.haveItem(4000151,50) && cm.haveItem(4000407,50) && cm.haveItem(4000402,30) && cm.haveItem(4000406,30) && cm.haveItem(1012176,1)){
				cm.gainItem(40000313, -2000);
				cm.gainItem(4000152, -50);
				cm.gainItem(4000151, -50);
				cm.gainItem(4000407, -50);
				cm.gainItem(4000402, -30);
				cm.gainItem(4000406, -30);
				cm.gainItem(1012176, -1);
cm.gainItem(1012057,30,30,30,30,3000,3000,10,10,0,0,0,0,0,0);
            cm.sendOk("�����ɹ���");
            cm.dispose();
cm.����(3, "��ң�[" + cm.getPlayer().getName() + "]�ɹ�����3000HPѪ�£���ϲ����");
			}else{
            cm.sendOk("�޷�������������\r\n#v4000313#����2000��\r\n#v4000152#����50��\r\n#v4000151#����50��\r\n#v4000407#����50��\r\n#v4000402#����30��\r\n#v4000406#����30��\r\n#v1012176#����1��\r\n");
            cm.dispose();
			}
		}
    }
}




