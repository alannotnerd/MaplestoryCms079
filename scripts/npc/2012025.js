/*
	NPC Name: 		Geras
	Map(s): 		Orbis: Station<To Ariant> (200000151)
	Description: 		Orbis Ticketing Usher
*/
var status = 0;

function start() {
    status = -1;
    geenie = cm.getEventManager("Geenie");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if(mode == 0) {
	cm.sendNext("���㿼�Ǻ��������ҡ�");
	cm.dispose();
	return;
    }
    if (status == 0) {
	if(geenie == null) {
	    cm.sendNext("�Ҳ����ű�����ϵGM��");
	    cm.dispose();
	} else if (geenie.getProperty("entry").equals("true")) {
	    cm.sendYesNo("����Ҫ�����");
	} else if(geenie.getProperty("entry").equals("false") && geenie.getProperty("docked").equals("true")) {
	    cm.sendNext("�ܱ�Ǹ���ബ׼������,����ʱ������ͨ����Ʊչ̨�鿴.");
	    cm.dispose();
	} else {
	    cm.sendNext("�ܱ�Ǹ���ബ�Ѿ�����,����ʱ������ͨ����Ʊչ̨�鿴.");
	    cm.dispose();
	}
    } else if(status == 1) {
	if(!cm.haveItem(4031576)) {
	    cm.sendNext("��! ��û��#b#t4031576##k �����Ҳ��ܷ�����!");
	} else {
	    cm.gainItem(4031576, -1);
	    cm.warp(200000152, 0);
	}
	cm.dispose();
    }
}