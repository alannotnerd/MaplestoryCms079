/*
	NPC Name: 		Athena Pierce
	Map(s): 		Maple Road : Spilt road of choice
	Description: 		Job tutorial, movie clip
*/

---var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 1) {
	    cm.sendOk("�ð�,����Ͳ���(��((����");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("���Ϊ��������?");
    } else if (status == 1) {
	cm.sendYesNo("Ҫ�Ҷ��ݰ���ʵ��������?");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020300, 0); // Effect/Direction3.img/archer/Scene00
	cm.dispose();
    }
}