var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	cm.sendNextS("����#p1204001#��ɫ���ĳɆT�������N�ҁ��_����?? �㺦�ҵ���ë���ַ��ˣ��Ұl��ҪЧ��춺�ħ������Ҫ����ץס���ˣ��ҕ�׌�㸶�����r�ģ�", 9);
    } else if (status == 1) {
	cm.sendNextPrevS("#b(��ɫ���? �������l? �����N���ָ���ħ���������P�S��Ҳ�Sԓ���Ō���)#k", 3);
    } else if (status == 2) {
	cm.forceStartQuest(21760, "0");
	cm.warp(105070300, 3);
	cm.dispose();
    }
}