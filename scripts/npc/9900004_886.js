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
            text += "#e#d BOSS�����ط�����#l\r\n\r\n"//3
            //text += "#L1##r��ɮ#l\r\n\r\n"//3
            text += "#L2##r����#l\r\n\r\n"//3
            text += "#L3##r����#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getbosslog() == 1 && cm.getMap(702060000).getCharactersSize() > 0){
			cm.warp(702060000);
            cm.dispose();
			}else if(cm.getPlayer().getbosslog() != 1){
            cm.sendOk("��ѡ���ˣ�");
            cm.dispose();
			}else{
			cm.getPlayer().setbosslog(0);
            cm.sendOk("��ͼ�����Ѿ�û�����ˣ�");
            cm.dispose();
			}
        } else if (selection == 2) {
			if(cm.haveItem(4001017,1) && cm.getPlayer().getLevel() > 99 && cm.getMap(280030000).getCharactersSize() > 0){
			cm.warp(280030000);
            cm.dispose();
			}else if(cm.getPlayer().getbosslog() != 2){
            cm.sendOk("�޷����룡BOSS�ط�������������3������\r\n1����������\r\n2���ȼ�����100��\r\n3��#v4001017# X1��");
            cm.dispose();
			}else{
			cm.getPlayer().setbosslog(0);
            cm.sendOk("��ͼ�����Ѿ�û�����ˣ�");
            cm.dispose();
			}
        } else if (selection == 3) {
			if(cm.getPlayer().getbosslog() == 3 && cm.getMap(240060200).getCharactersSize() > 0){
			cm.warp(240060200);
            cm.dispose();
			}else if(cm.getPlayer().getbosslog() != 3){
            cm.sendOk("��ѡ���ˣ�");
            cm.dispose();
			}else{
			cm.getPlayer().setbosslog(0);
            cm.sendOk("��ͼ�����Ѿ�û�����ˣ�");
            cm.dispose();
			}
		}
    }
}


