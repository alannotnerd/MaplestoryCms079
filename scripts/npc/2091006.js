/*
	Mu Lung Training Center entrance
*/
var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.sendNext("#b(ų��!����������PK....)");
	cm.dispose();
	return;
    }

    if (status == 0) {
	cm.sendSimple("#e< ���� >#n \r\n������������ս��������ߣ���ӭ��ǰ�����������. \r\n - �乫 - \r\n#b#L0#��Ҫ��ս�������50¥!!#l\r\n#b#L1#��ϸ�Ķ�����...#l")
    } else if (status == 1) {
	sel = selection;
	if (sel == 1) {
	    cm.sendNext("#e<����: ������ս! >#n\r\n����������������������乫���ܾ���ǰ����������ɽ��ʼ���������������ҵ��ڹ��Ѵﵽ�쳬Խ���޵Ľ׶Ρ���ǰ�������������ų�����������ĳ̶ȡ����Խ��쿪ʼ���ҽӹ����������ֻ��ǿ�߿���ӵ������������ʸ���Ҫ�õ�����ָ����˾�������ս��������Ҫ��ս�ҵ���Ҳ�޷����һ�����֪�������֪����");
	} else {
	    cm.sendYesNo("#b(�������Ҫ�μ��乫��ս���𣿣�)");
	}
    } else if (status == 2) {
	if (sel == 1) {
	    cm.sendNextPrev("��ӭ������ս�����û�������Ļ������������һ��Ҳ�޷���");
	} else {
	    cm.saveLocation("MULUNG_TC");
	    cm.warp(925020000, 0);
	    cm.dispose();
	}
    } else if (status == 3) {
	cm.dispose();
    }
}