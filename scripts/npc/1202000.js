/*
 * Tutorial Lirin
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
if (cm.getPlayer().getMapId() != 140090000) {
if (status == 0) {
	cm.sendSimple("����ʲô��֪�����أ��еĻ��һ��ٶ�˵����  \n\r #b#L1#�����ʹ��С��ͼ��#l \n\r #b#L2#�����ʹ��������λ��#l \n\r #b#L3#�����ʹ�õ��ߣ�#l \n\r #b#L4#���ʹ����ͨ������#l \n\r #b#L5#��μ�ȡ������#l \n\r #b#L6#��δ�װ����#l \n\r #b#L7#��δ򿪼����Ӵ���#l \n\r #b#L8#��ΰѼ��ܷŵ���ݼ��ϣ�#l \n\r #b#L9#��δ���һ�����ӣ�#l \n\r #b#L10#��������ӣ�#l \n\r #b#L11#��β鿴��ͼ��Ѷ��#l");
} else {
    cm.summonMsg(selection);
    cm.dispose();
}
} else {
    if (cm.getInfoQuest(21019).equals("")) {
	if (status == 0) {
	    cm.sendNext("��....��������!");
	} else if (status == 1) {
	    cm.sendNextPrevS("...����˭?", 2);
	} else if (status == 2) {
	    cm.sendNextPrev("���Ѿ��������þ���. �ȴ��Ǹ����ĥ��ʦ�Կ���Ӣ������...!");
	} else if (status == 3) {
	    cm.sendNextPrevS("�ȵ�, ��˵ʲô..? ����˭...?", 2);
	} else if (status == 4) {
	    cm.sendNextPrevS("�ȵ�... ����˭...? �ҼȲ�����ǰ��������... ��...��ͷ��ʹ��..", 2);
	} else if (status == 5) {
	    cm.updateInfoQuest(21019, "helper=clear");
	    cm.showWZEffect("Effect/Direction1.img/aranTutorial/face");
	    cm.showWZEffect("Effect/Direction1.img/aranTutorial/ClickLirin");
	    cm.playerSummonHint(true);
	    cm.dispose();
	}
    } else {
	if (status == 0) {
	    cm.sendNext("�㻹����");
	} else if (status == 1) {
	    cm.sendNextPrevS("��... ʲô�����ǵ���...�����������������˭��", 2);
	} else if (status == 2) {
	    cm.sendNextPrev("������. ��Ϊ��ĥ��ʦ�����䣬�����벻����ǰ����. ��ǰ�������Ѿ�����Ҫ��. �һ�������������������.");
	} else if (status == 3) {
	    cm.sendNextPrev("�������������Ӣ��. ��������ǰ, ������������ǶԿ���ħ��ʦ�������˷�֮�ȵ�����. ���Ǹ�ʱ�򣬺�ĥ��ʦ�����������䣬�������������ֱ��Ĩȥ�����еļ���Ϊֹ.");
	} else if (status == 4) {
	    cm.sendNextPrev("���������������ħ��ʦ���������ڴ˵ء������������ң����긲�Ǳ�˪��ѩ�����ڱ�֮�ߵ�������ֵġ�");
	} else if (status == 5) {
	    cm.sendNextPrev("�ҵ�������#p1202000#�� ��������ĳ�Ա���������ݹ��ϵ�Ԥ�ԴӺܾ���ǰ�͵ȴ�Ӣ�ۻ���������...�����ҵ����ˡ����ڡ���������....");
	} else if (status == 6) {
	    cm.sendNextPrev("����һ��˵̫���ˡ����������������˽�Ҳû�й�ϵ����������֪��������....#b������ȥ��ׯ��#k���ڵִ��ׯ֮ǰ���������ʲô��֪�����һ���һ����˵����");
	} else if (status == 7) {
	    cm.playerSummonHint(true);
	    cm.warp(140090100, 1);
	    cm.dispose();
	}
    }
}
}