/*
 * С��Ϸ����
 * by Kodan
 */

var select;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {
		cm.dispose();
		return;
	} else if (mode == 1) {
		status++;
	} else {
		status--;
	}

	if (status == 0) {
		cm.sendSimple("�٣��������Դ����ˣ����ܿ����������ҵ������ô����ֻҪ�м��ֵ��ߣ��Ҿ͸����������С��Ϸ�ĵ��ߡ��š���������ʲô���أ�\r\n#b#L0#����С��Ϸ����#l\r\n#b#L1#����С��Ϸ��˵��#l");
	} else if (status == 1) {
		if (selection == 0) {
			cm.sendSimple("������Ҫ������С��Ϸ�أ���\r\n\r\n#b#L2#������#l#k\r\n#b#L3#�������#l#k");
		} else if (selection == 1) {
			cm.sendSimple("��Ҫ������С��Ϸ�أ���\r\n\r\n#b#L4#������#l#k\r\n#b#L5#�������#l#k");
		}
	} else if (status == 2) {
		if (selection != null)
			select = selection;

		if (select == 2) {
			cm.sendNext("��׼���ò��ϡ�");
		} else if (select == 3) {
			if (!cm.haveItem(4030012, 15)) {
				cm.sendNext("��׼���ò��ϡ� ���������Ҫ #b15#k ��#t4030012##v4030012# ��");
				cm.dispose();
				return;
			} else {
				cm.gainItem(4030012, -15);
				cm.gainItem(4080100 , 1);
				cm.dispose();
			}
		} else if (select == 4) {
			cm.sendOk("�Լ�#e#rGoogle#k!");
			cm.dispose();
		} else if (select == 5) {
			cm.sendOk("�Լ�#e#rGoogle#k!");
			cm.dispose();
		}
	} else if (status == 3) {
		if (select == 2) {
			cm.sendSimple("��ô������Ҫ��������״���������أ���\r\n#b#L6##t4080000##l#k\r\n#b#L7##t4080001##l#k\r\n#b#L8##t4080002##l#k\r\n#b#L9##t4080003##l#k\r\n#b#L10##t4080004##l#k\r\n#b#L11##t4080005##l#k");
		}
	} else if (status == 4) {
		if (selection == 6) {
			if (!cm.haveItem(4030000, 5) || !cm.haveItem(4030001, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ� #t4080000#��Ҫ #b5#k ��#t4030000#��#t4030001# �� #b1#k �� #t4030009# ��");
			} else {
				cm.gainItem(4030000, -5);
				cm.gainItem(4030001, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080000, 1);
				cm.sendOk("��ϲ�������#t4080000#��");
			}
		} else if (selection == 7) {
			if (!cm.haveItem(4030000, 5) || !cm.haveItem(4030010, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ� #t4080001#��Ҫ #b5#k ��#t4030000#��#t4030010# �� #b1#k �� #t4030009# ��");
			} else {
				cm.gainItem(4030000, -5);
				cm.gainItem(4030010, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080001, 1);
				cm.sendOk("��ϲ�������#t4080001#��");
			}
		} else if (selection == 8) {
			if (!cm.haveItem(4030000, 5) || !cm.haveItem(4030011, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ� #t4080002#��Ҫ #b5#k ��#t4030000#��#t4030011# �� #b1#k �� #t4030009# ��");
			} else {
				cm.gainItem(4030000, -5);
				cm.gainItem(4030011, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080002, 1);
				cm.sendOk("��ϲ�������#t4080002#��");
			}
		} else if (selection == 9) {
			if (!cm.haveItem(4030010, 5) || !cm.haveItem(4030001, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ� #t4080003#��Ҫ #b5#k ��#t4030010#��#t4030001# �� #b1#k �� #t4030009# ��");
			} else {
				cm.gainItem(4030010, -5);
				cm.gainItem(4030001, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080003, 1);
				cm.sendOk("��ϲ�������#t4080003#��");
			}
		} else if (selection == 10) {
			if (!cm.haveItem(4030011, 5) || !cm.haveItem(4030010, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ� #t4080004#��Ҫ #b5#k ��#t4030011#��#t4030010# �� #b1#k �� #t4030009# ��");
			} else {
				cm.gainItem(4030011, -5);
				cm.gainItem(4030010, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4030004, 1);
				cm.sendOk("��ϲ�������#t4080004#��");
			}
		} else if (selection == 11) {
			if (!cm.haveItem(4030011, 5) || !cm.haveItem(4030001, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ� #t4080005#��Ҫ #b5#k ��#t4030011#��#t4030001# �� #b1#k �� #t4030009# ��");
			} else {
				cm.gainItem(4030011, -5);
				cm.gainItem(4030001, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080005, 1);
				cm.sendOk("��ϲ�������#t4080005#��");
			}
		}
		cm.dispose();
	}
}