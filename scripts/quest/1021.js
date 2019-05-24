/* Author: Xterminator (Modified by RMZero213)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
	���� - �޽ܺ�ƻ��
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("���, С�һ�~�������İ�������������ר��Ϊ���������ð�ռ����ṩ��Ϣ�Ľ̹٣� #p2000#��");
        } else if (status == 1) {
            qm.sendNextPrev("��������˭ָ����Ϊ�̹ٵģ��Ǻǣ���ĺ����Ļ�ͦ�డ��������~�����Լ�ϲ�����̹ٵġ�");
        } else if (status == 2) {
            qm.askAcceptDecline("������������С��Ц��ô�����ף�");
        } else if (status == 3) {
            if (qm.getPlayerStat("HP") >= 50) {
               // qm.setHP(-25);
                //qm.getPlayer().updateSingleStat(MapleStat.HP, 25);
            }
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            qm.sendNext("�ǲ�������һ����HP����0�ͻ��ˡ���������#r#t2010007##k�������Ե��ͻ�ָ��ˡ���򿪵��ߴ�����#I");
        } else if (status == 4) {
            qm.sendPrev("��Ҫ���Ҹ����#t2010007#ȫ���Ե���ͣ����һ���ط�ʲô������HPҲ��ָ��ġ�������ָ���ȫ����HP�ڸ������İɡ�#I");
        } else if (status == 5) {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (qm.getPlayerStat("HP") < 50) {
                qm.sendNext("�ˣ����HP��û����ȫ�ָ���ʹ���Ҹ����ƻ��������ɣ���ȥ����!");
                qm.dispose();
            } else {
                qm.sendNext("���ĵ��ߡ�������ô�����ܼ򵥰ɣ����������½��趨#b��ݼ�#k���㻹��֪���ɣ�����~");
            }
        } else if (status == 1) {
            qm.sendNextPrev("����ѧ�úܺ�Ӧ�ø��������Щ��������;�б���ģ�лл�Ұɣ�Σ����ʱ��ú�ʹ�á�");
        } else if (status == 2) {
            qm.sendNextPrev("���ܽ����ֻ����Щ�ˡ��е���᲻��Ҳû�취������Ҫ����ʱ��·��С�ģ�һ·˳�簡������\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
        } else if (status == 3) {
            qm.gainExp(10);
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}