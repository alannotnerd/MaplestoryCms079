/*�һ���Ҫ #v4000425#  ���� #v4000424#  ���� #v4000423# ����#v4000422#*/
importPackage(net.sf.cherry.client);
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
            text += "���ٻ�boss��...\r\n"
            text += "#L1##bʹ��10��#v4001266#�ٻ�BOSS\r\n";//����
            cm.sendSimple(text);
			
        } else if (selection == 1) { //��ƾ��Ҷ����

           if(cm.haveItem(4001266,10)){
			   cm.gainItem(4001266,-10);
				 cm.summonMobter(5220004, 1);
			   cm.dispose();
		   }else{
			   cm.sendOk("��Ʒ�������㣡");
			   cm.dispose();
		   }
        
	}}
    }



