var map;
var cost;
var location;
var mapname;
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.sendNext("��......����ɡ����ǳ��⳵��˾��ֵ�ķ�������Զ�����ڣ�");
	cm.dispose();
	return;
    }

    if (status == 0) {
	switch (cm.getMapId()) {
	    case 540000000: // CBD
		map = 541020000;
		cost = 30000;
		mapname = "��³��";
		break;
	    case 240000000: // Leafre
		map = 240030000;
		cost = 55000;
		mapname = "��ľ��-��ɭ��·��";
		break;
	    case 220000000: // Ludi
		map = 220050300;
		cost = 45000;
		mapname = "ʱ��ͨ��";
		break;
	    case 211000000: // El Nath
		map = 211040200;
		cost = 45000;
		mapname = "��ѩϿ��II";
		break;
	    default:
		map = 211040200;
		cost = 45000;
		mapname = "��ѩϿ��II";
		break;
	}
	cm.sendNext("��ã������ӵ����⳵��������κ�Σ������ #m"+cm.getMapId()+"# �� #b#m"+map+"##k �� "+mapname+"! ������� #b"+cost+" ���#k ���ܿ������ܹ󣬵������࣬�����뷽���ͨ��Σ����������!");
    } else if (status == 1) {
	cm.sendYesNo("#b����Ҫ֧�����#k ���͵� #b#m"+map+"##k?");
    } else if (status == 2) {
	if (cm.getMeso() < cost) {
	    cm.sendNext("�㿴����ûɶǮ����֧��,�ܱ�Ǹ���ǲ�����ؤ���,����!!!");
	    cm.dispose();
	} else {
	    cm.gainMeso(-cost);
	    cm.warp(map, 0);
	    cm.dispose();
	}
    }
}