/* Dances with Balrog
	Warrior Job Advancement
	Victoria Road : Warriors' Sanctuary (102000003)

	Custom Quest 100003, 100005
*/

var status = 0;
var jobId;
var jobName;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 2) {
        cm.sendOk("������.");
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
	if (cm.getJob() == 0) {
		if (cm.getPlayer().getLevel() >= 10) {
		cm.sendNext("��Ҫתְ��Ϊһλ #r����#k ?");
	    } else {
		cm.sendOk("�㻹����תְ��Ϊ #r����#k ��B8.");
		cm.dispose();
	    }
	} else {
	    if (cm.getPlayer().getLevel() >= 30 && cm.getJob() == 400) { // ����
		if (cm.haveItem(4031012, 1)) {
		    if (cm.haveItem(4031012, 1)) {
			status = 20;
			cm.sendNext("�ҿ���������˲���. ��Ҫ����תְ�����һҳ!");
		    } else {
			if (!cm.haveItem(4031011)) {
			    cm.gainItem(4031011, 1);
			}
			cm.sendOk("��ȥ�� #r����תְ�̹�#k.")
			cm.dispose();
		    }
		} else {
		    status = 10;
		    cm.sendNext("���Ѿ�����תְ��,Ҫתְ�����һҳ.");
		}
	    } else if (cm.getPlayer().getLevel() >= 70 && cm.getJob() == 410 || cm.getJob() == 420) {
		if (cm.haveItem(4031059,1)) {
			cm.gainItem(4031057,1);
			cm.gainItem(4031059, -1);
			cm.warp(211000001, 0);
		    cm.sendOk("�������һ�����飬����ȥ�� #b�����#k.");
		} else {
		    cm.sendOk("��, #b#h0##k! ����Ҫһ�� #b�ڷ�#k. ��ȥ�����Ԫ�ռ��ø���");
		}
		cm.dispose();
	    } else {
		cm.sendOk("���,���ǵ���תְ��.");
		cm.dispose();
	    }
	}
    } else if (status == 1) {
	cm.sendNextPrev("һ��תְ�˾Ͳ��ܷ���,�������תְ�����һҳ.");
    } else if (status == 2) {
	cm.sendYesNo("�����Ҫ��Ϊһλ #r����#k ?");
    } else if (status == 3) {
	if (cm.getJob() == 0) {
		cm.changeJob(400); // ����
		cm.resetStats(4, 4, 4, 25);
	}
	cm.gainItem(1332063,1);
	cm.gainItem(1472000,1);
	cm.gainItem(2070000,500);
	cm.gainItem(2070000,500);
	cm.sendOk("תְ�ɹ� ! ��ȥ�������°�.");
	cm.dispose();
    } else if (status == 11) {
	cm.sendNextPrev("�����ѡ����Ҫתְ��Ϊһλ #r�̿�#k, #r����#k. ")
    } else if (status == 12) {
	cm.askAcceptDecline("�����ұ����Ȳ�����,��׼�������� ?");
    } else if (status == 13) {
	cm.gainItem(4031011, 1);
	cm.warp(102040000);
	cm.sendOk("��ȥ�� #b����תְ�̹�#k . ����������.");
	cm.dispose();
    } else if (status == 21) {
	cm.sendSimple("����Ҫ��Ϊʲô ? #b\r\n#L0#�̿�#l\r\n#L1#����#l#k");
    } else if (status == 22) {
	var jobName;
	if (selection == 0) {
	    jobName = "�̿�";
	    job = 410; // FIGHTER
	} else if (selection == 1) {
	    jobName = "����";
	    job = 420; // PAGE
	}
	cm.sendYesNo("�����Ҫ��Ϊһλ #r" + jobName + "#k?");
    } else if (status == 23) {
	cm.changeJob(job);
	cm.gainItem(4031012, -1);
	cm.sendOk("תְ�ɹ� ! ��ȥ�������°�.");
	cm.dispose();
    }
}	
