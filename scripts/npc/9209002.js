/*С��ϷNPC by:Kodan */
var quantities = Array(10, 8, 6, 5, 4, 3, 2, 1, 1, 1);
var prize1 = Array(2000004, 2000002); //1 day
var prize2 = Array(2000004, 2000002);
var prize3 = Array(2000004, 2000002);
var prize4 = Array(2000004, 2000002); //7 day
var prize5 = Array(2000004, 2000002); //10 day
var prize6 = Array(2000004, 2000002); //15 day
var prize7 = Array(2000004, 2000002); //20 day
var prize8 = Array(2000004, 2000002); //30 day
var prize9 = Array(2000004, 2000002); //60 day
var prizeA = Array(2000004, 2000002); //1 year
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
	if (cm.getPlayer().getMapId() != 680100000 && cm.getPlayer().getMapId() != 680100001 && cm.getPlayer().getMapId() != 680100002 && cm.getPlayer().getMapId() != 680100003) {
		cm.sendOk("������Ҷ�м�����лл��");
		cm.dispose();		
	}
	if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#b�װ��� #k#h  ##e\r\n#b����С��Ϸ��������������Ҫ�Ұ�æʲô�أ���#k \r\n#L0##r���ȭ\n\#l\r\n#L1##g�����һ�#k#l");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendSimple("#b �� ���Ʋ���..");
                cm.dispose();
            } else if (selection == 1) {
                var selStr = "��ô...����Ҫ��һ����??";
                for (var i = 0; i < quantities.length; i++) {
                    selStr += "\r\n#b#L" + i + "##t" + (4031332 + i) + "# (" + quantities[i] + ") ��#l";
                }
                cm.sendSimple(selStr);
                status = 2;
            }
        } else if (status == 3) {
            if (selection < 0 || selection > quantities.length) {
                return;
            }
            var ite = 4031332 + selection;
            var quan = quantities[selection];
            var pri;
            switch (selection) {
                case 0:
                    pri = prize1;
                    break;
                case 1:
                    pri = prize2;
                    break;
                case 2:
                    pri = prize3;
                    break;
                case 3:
                    pri = prize4;
                    break;
                case 4:
                    pri = prize5;
                    break;
                case 5:
                    pri = prize6;
                    break;
                case 6:
                    pri = prize7;
                    break;
                case 7:
                    pri = prize8;
                    break;
                case 8:
                    pri = prize9;
                    break;
                case 9:
                    pri = prizeA;
                    break;
                default:
                    cm.dispose();
                    return;
            }
            var rand = java.lang.Math.floor(java.lang.Math.random() * pri.length);
            if (!cm.haveItem(ite, quan)) {
                cm.sendOk("����Ҫ #b" + quan + "�� #t" + ite + "##k ���ܶһ����ߣ�");
            } else if (cm.getInventory(1).getNextFreeSlot() <= -1 || cm.getInventory(2).getNextFreeSlot() <= -1 || cm.getInventory(3).getNextFreeSlot() <= -1 || cm.getInventory(4).getNextFreeSlot() <= -1) {
                cm.sendOk("����ҪһЩ�������ռ�ſ��Զһ����ߣ�");
            } else {
                cm.gainItem(pri[rand], 1);
                cm.gainItem(ite, -quan);
                cm.gainMeso(100000 * selection); //��ο����lol
            }
            cm.dispose();

        }
    }
}
