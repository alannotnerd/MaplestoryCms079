var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 6) {
            qm.sendNext("Oh, is 5 not enough? If you feel the need to train further, please feel free to slay more than that. If you slay all of them, I''ll just have to look the other way even if it breaks my heart, since they will have been sacrificed for a good cause...");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextS("���ħ��ʦս����Ӣ���ǡ����й����ǵ���Ϣ����ʲô��û�����¡���ʹ��Ԥ������Ҳֻ�м���5λӢ�ۣ�Ҳû���κ��й�������ò���������㻹�ܼ�����Щʲô��", 8);
    } else if (status == 1) {
        qm.sendNextPrevS("һ�㶼�벻�����ˡ���", 2);
    } else if (status == 2) {
        qm.sendNextPrevS("��Ȼ����ħ��ʦ�������Ȼ����������������ΪӢ�۵���϶��͹�ȥӦ�û������ĳ����ϵ�㡣����ʲô�أ��������·��ǲ�����ս���ж��������ء����������ˣ�Ӧ����#b����#k��", 8);
    } else if (status == 3) {
        qm.sendNextPrevS("������", 2);
    } else if (status == 4) {
        qm.sendNextPrevS("��ǰ�������ڱ������ھ�Ӣ�۵�ʱ�򣬷��ֹ�һ���޴�����������ǲ²������Ӣ��ʹ�õ����������Ծͷ��ڴ��ӵ����롣������ȥȥ��ʱ��û������ #b#p1201001##k���� \r\r#i4032372#\r\r�����������ӡ���", 8);
    } else if (status == 5) {
        qm.sendNextPrevS("ȷʵ���Ǹ��޴��ս���ڴ��������������Щ��֡�", 2);
    } else if (status == 6) {
        qm.askAcceptDecline("û�������Ǹ���������˵Ӣ�۵������ǻ���ѡ���˵ģ���������ʹ�þ޴��ս����Ӣ�ۣ���ô��ץס�޴��ս����ɲ�ǣ�����Ӧ�û��з�ӳ�ġ���ȥ���#b�޴��ս������#k��");
    } else if (status == 7) {
        if (qm.getQuestStatus(21100) == 0) {
            qm.forceCompleteQuest();
        }
        qm.sendOkS("���#p1201001#�з�ӳ����˵������ʹ�ù��޴�ս����Ӣ�ۣ���#bս��#k��", 8);
        qm.ShowWZEffect("Effect/Direction1.img/aranTutorial/ClickPoleArm");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}
