/* guild creation npc */
var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;

    if (status == 0)
	cm.sendSimple("����Ҫ��ʲô��\r\n#b#L0#��������#l\r\n#L1#��ɢ����#l\r\n#L2#���乫������#l#k");
    else if (status == 1) {
	sel = selection;
	if (selection == 0) {
	    if (cm.getPlayerStat("GID") > 0) {
		cm.sendOk("�㲻�ܴ���һ���µĹ���.");
		cm.dispose();
	    } else
		cm.sendYesNo("����������Ҫ #b15000000 ���#k, ��ȷ��Ҫ����������?");
	} else if (selection == 1) {
	    if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
		cm.sendOk("�㲻�ǹ���᳤���Բ��ܽ�ɢ����");
		cm.dispose();
	    } else
		cm.sendYesNo("��ȷ��Ҫ��ɢ��Ĺ���?�㽫�޷��ָ�����GP��ʧ.");
	} else if (selection == 2) {
	    if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
		cm.sendOk("�㲻�ǹ���᳤���Բ�����������");
		cm.dispose();
	    } else
		cm.sendYesNo("���乫������ #b5#k Ҫ #b2500000 ���#k, ��ȷ��Ҫ������?");
	}
    } else if (status == 2) {
	if (sel == 0 && cm.getPlayerStat("GID") <= 0) {
	    cm.genericGuildMessage(1);
	    cm.dispose();
	} else if (sel == 1 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
	    cm.disbandGuild();
	    cm.dispose();
	} else if (sel == 2 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
	    cm.increaseGuildCapacity();
	    cm.dispose();
	}
    }
}