var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.removeAll(4001117);
	cm.removeAll(4031437);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	cm.removeAll(4001260);
	cm.warp(251010404);
	cm.dispose();
	return;
    }
    switch(cm.getPlayer().getMapId()) {
	case 925100000:
	   cm.sendNext("���������Ǻ�����������Ҫ�������еĹ��ﱣ������\r\n#b���ռ�#b�Ϻ������ӵĽ���֮ǹ#k5����");
	   cm.dispose();
	   break;
	case 925100100:
	   cm.sendNext("���������Ǻ�����������Ҫ�������еĹ��ﱣ������\r\n#b���ռ�#b������#b�м����߼����������#k��20����");
	   cm.dispose();
	   break;
	case 925100400:
	   cm.sendNext("���������Ǻ�����������Ҫ�������еĹ��ﱣ������\r\n#b���ռ�#b����Կ��#k20��,���ر����д��š�");
	   cm.dispose();
	   break;
	case 925100500:
	   if (cm.getMap().getAllMonstersThreadsafe().size() == 0) {
		cm.givePartyItems(4170009, 1);
		cm.givePartyItems(4001322, 2);
		cm.warpParty(925100600);
	   } else {
	   	cm.sendNext("�������Ϻ���������");
	   }
	   cm.dispose();
	   break;
    }
}