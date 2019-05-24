/* Author: Xterminator
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	if (cm.haveItem(4031035)) {
	    cm.sendNext("�ţ������Ҹ����ţ�Ҳ���������Ҳ������Ͷ���......�ţ�����......������Ҹ��������ѵ�����صĳ��վ����������ǰɣ�������Ȼ�����������������һ�����������ˮƽ�����ĳ��");
	} else {
	    cm.sendOk("�Ҹ������ң��չ˳�����ϰ�����Ȼ������......��Ȼ����ôԶ�������ϣ��Ҳ��������ֺ���......�Ǻǣ���Ϊ��û�п���������ǰ��������ɴ���ɼ�����.");
	    cm.dispose();
	}
    } else if (status == 1) {
	if (cm.getPlayer().getPet(0) == null) {
	    cm.sendNextPrev("��...�����û�д������������뿪�����");
	} else {
	    cm.gainItem(4031035, -1);
	    cm.gainClosenessAll(2);
	    cm.sendNextPrev("����ô�����ѵ��㲻��Ϊ���Ѿ��õ�����ĳ�����ӽ����������ʱ�䣬��ѵ����ĳ���������ϰ�......��Ȼ��Ȼ���ҵ��ֵܵ���ɡ�");
	}
	cm.dispose();
    }
}