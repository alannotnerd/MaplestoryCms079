/* Author: Xterminator
	NPC Name: 		Trainer Bartos
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
	cm.dispose();
	return;
    } else if (status >= 1 && mode == 0) {
	cm.sendNext("��Ҫ��ʱ����������ҡ�");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	cm.sendSimple("����Ҫ����̸ʲô����\r\n#L0##b����Ҫѵ�����#l\r\n#L1#����Ҫѧϰ��������ļ��ܡ�#k#l");
    } else if (status == 1) {
	if (selection == 0) {
	    if (cm.haveItem(4031035)) {
		cm.sendNext("�õ���һ���ţ���Ծ����Щ�ϰ�������Ÿ��ҵܵ�������㽱��...");
		cm.dispose();
	    } else {
		cm.sendYesNo("������·�ϣ������ȥ����ĳ���ɢ����������߶��ģ����������ѵ����ĳ���Ҫ����������ϰ�������㲻��̫���е������ĳ���Ȼ��������ܻ�������⣬�����������������һ����......��ô������ʲô���룿��������ĳ��");
	    }
	} else {
	    cm.sendOk("�٣���϶����� #b��������ļ���#k��");
	    cm.dispose();
	}
    } else if (status == 2) {
	cm.gainItem(4031035, 1);
	cm.sendNext("���ˡ�");
	cm.dispose();
    }
}