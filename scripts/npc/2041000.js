/* Author: Xterminator
	NPC Name: 		Tian
	Map(s): 		Ludibrium: Station<Orbis> (220000110)
	Description: 		Ludibrium Ticketing Usher
*/
var status = 0;

function start() {
    status = -1;
    train = cm.getEventManager("Trains");
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
	if(train == null) {
	    cm.sendNext("�Ҳ����ű�����ϵGM��");
	    cm.dispose();
	} else if(train.getProperty("entry").equals("true")) {
	    cm.sendYesNo("����Ҫ�����");
	} else if(train.getProperty("entry").equals("false") && train.getProperty("docked").equals("true")) {
	    cm.sendNext("�ܱ�Ǹ���ബ׼������,����ʱ������ͨ����Ʊչ̨�鿴.");
	    cm.dispose();
	} else {
	    cm.sendNext("�ܱ�Ǹ���ബ�Ѿ�����,����ʱ������ͨ����Ʊչ̨�鿴.");
	    cm.dispose();
	}
    } else if(status == 1) {
	if(!cm.haveItem(4031045)) {
	    cm.sendNext("��! ��û��#b#t4031045##k �����Ҳ��ܷ�����!");
	} else {
	    cm.gainItem(4031045, -1);
	    cm.warp(220000111, 0);
	}
	cm.dispose();
    }
}