/* 
	NPC Name: 		Ramini
	Map(s): 		Orbis: Cabin<To Leafre> (200000131)
	Description: 		Orbis Ticketing Usher
*/
var status = 0;

function start() {
    status = -1;
    flight = cm.getEventManager("Flight");
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
	if(flight == null) {
	    cm.sendNext("�Ҳ����ű�����ϵGM��");
	    cm.dispose();
	} else if(flight.getProperty("entry").equals("true")) {
	    cm.sendYesNo("����Ҫ�����");
	} else if(flight.getProperty("entry").equals("false") && flight.getProperty("docked").equals("true")) {
	    cm.sendNext("�ܱ�Ǹ���ബ׼������,����ʱ������ͨ����Ʊչ̨�鿴.");
	    cm.dispose();
	} else {
	    cm.sendNext("�ܱ�Ǹ���ബ�Ѿ�����,����ʱ������ͨ����Ʊչ̨�鿴.");
	    cm.dispose();
	}
    } else if(status == 1) {
	if(!cm.haveItem(4031331)) {
	    cm.sendNext("��! ��û��#b#t4031331##k �����Ҳ��ܷ�����!");
	} else {
	    cm.gainItem(4031331, -1);
	    cm.warp(200000132, 0);
	}
	cm.dispose();
    }
}