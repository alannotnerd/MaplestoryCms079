/*
	NPC Name: 		ϣ��˹
	Description: 		������Ů������
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("��֪������ԥ�ˣ������ҿ��Կ��������������û�бŷ�����������");
            qm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("��֪����ð�յ����翴�����ܺ�ƽ��������ĳЩ�ط�ȴ�����˺ڰ�������������ħ��ʦ����Щ����Ҫ����İ���ħ��ʦ����в��ð�յ����磡");
    } else if (status == 1) {
        qm.sendNextPrev("���ǲ������������Դ��У����ǵĵ���Խ��Խǿ׳��������Ҫ����ǿ��");
    } else if (status == 2) {
        qm.askAcceptDecline("�����Ҳ���̫���ģ�#h#,ȷ�����ܱ���ð�յ�����������������Լ��ܳ�Ϊð�յ���ʿ�ţ������������������һ�У�\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1142065# #t1142065# - 1");
    } else if (status == 3) {
        if (qm.getQuestStatus(20015) == 0) {
            qm.gainItem(1142065, 1);
            qm.forceCompleteQuest();
        }
        qm.sendNext("�Ǻǣ��Ҿ�֪�������ô˵�ġ������㻹�кܳ���·Ҫ�ߣ������۷�ʱ�̣���Ϳ��Ա���ð�յ������ˡ�");
    } else if (status == 4) {
        qm.sendPrev("#p1101002#, �ҵ�ı��ʦ���������ҵ��Աߣ�����������Ϊһ��ð�յ���ʿ��ϣ����ɹ���");
        qm.safeDispose();
    }
}

function end(mode, type, selection) {
}