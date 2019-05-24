var status = -1;
var picked = 0;
var state = -1;
var item;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
		if (!cm.isQuestFinished(29933)) {
            NewPlayer();
        }
        cm.sendSimple("������԰ڷ��ڻ���Ŷ~\r\n#b#L2#��Ҫ����ɫС����#l\r\n#b#L3#������Ĵ����Ǯ��(100�����ϲ�����)��δ������������#l\r\n#b#L4#��Ҫ����ɫ����!!#l\r\n#b#L5#��Ҫ������Ӱ˲ɱ������(��ת�����޶�)#l\r\n#b#L6#��Ҫɾ���������հ׵���(���Ҳ���һ�ε���)#l\r\n#b#L7#��Ҫ��ɵ��ݲ��ܽӵ�����#l\r\n#b#L8#����ȡ�㲥����#ll\r\n#b#L9#����ȡ���Ĺ㲥����#\l\r\n#b#L10#����ȡ��¨�㲥����\l\r\n#b#L11#����ȡ��������\l\r\n#b#L12#��Ҫ��ǡ��#k");
    } else if (status == 1) {
		if (selection == 2) {
                if (cm.haveItem(4031307, 1) == true)
                    {
                    cm.gainItem(4031307 ,-1);
                    cm.gainItem(2020020 ,100);
                    cm.sendOk("#b���ⲻҪ��̫��~�������~");
                    cm.dispose();
                    } else {
                    cm.sendOk("#b���һ�±�����û����ɫ�����Ŷ");
                    cm.dispose();
                    }
        } else if (selection == 3) { 
                var level = cm.getPlayerStat("LVL");
                if (level >= 100) {
                    cm.gainItem(5252002, 1);
					cm.dispose();
                } else {
                    cm.sendOk("��ĵȼ���������");
					cm.dispose();
		}
            cm.dispose();
        } else if (selection == 4) {
                var level = cm.getPlayerStat("LVL");                            
                if (cm.haveItem(4000264, 400) && cm.haveItem(4000266, 400) && cm.haveItem(4000267, 400) &&(level >= 120)) {

                    cm.gainItem(4000264 ,-400);
                    cm.gainItem(4000266 ,-400);
                    cm.gainItem(4000267 ,-400);                    
                    cm.gainItem(1902001 ,1);
                    cm.sendOk("#b�ú���ϧҰ��~~");
                    cm.dispose();
                    } else {
                    cm.sendOk("����һ�±�����û�н�ɫƤ���������ľͷ�绤���������������ü绤����������,��������ȼ�����");                  
                }
            cm.dispose();
		} else if (selection == 8) { //�㲥
				var level = cm.getPlayerStat("LVL");
                if (level >= 1 &&cm.getPlayer().getBossLog('1') < 1) {
				 cm.setBossLog('1');
                    cm.gainItem(5072000 ,5);
					cm.dispose();
                } else {
                    cm.sendOk("1��ֻ����һ�λ���ĵȼ���������");
					cm.dispose();
		}
		} else if (selection == 9) { //�㲥
			var level = cm.getPlayerStat("LVL");
                if (level >= 30&&cm.getPlayer().getBossLog('30') < 1) {
				 cm.setBossLog('30');
                    cm.gainItem(5073000 ,10);
					cm.dispose();
                } else {
                    cm.sendOk("1��ֻ����һ�λ���ĵȼ������� 30�Ȳ����찮�Ĺ㲥ࡡ�");
					cm.dispose();
		}
		} else if (selection == 10) { //�㲥
			var level = cm.getPlayerStat("LVL");
                if (level >= 70&&cm.getPlayer().getBossLog('70') < 1) {
				 cm.setBossLog('70');
                    cm.gainItem(5074000 ,5);
					cm.dispose();
                } else {
                    cm.sendOk("1��ֻ����һ�λ���ĵȼ������� 70�Ȳ�������¨�㲥ࡡ�");
					cm.dispose();
		}
		} else if (selection == 11) { //����
			var level = cm.getPlayerStat("LVL");
                if (level >= 10 &&cm.getPlayer().getBossLog('sell') < 1) {
				 cm.setBossLog('sell');
                    cm.gainItem(5030000 ,1);
					cm.dispose();
                } else {
                    cm.sendOk("1��ֻ����һ�λ���ĵȼ������� 70�Ȳ�������¨�㲥ࡡ�");
					cm.dispose();
		}
		
        } else if (selection == 5) {
                 if (cm.getPlayerStat("LVL") >= 120 && cm.getJob() == 412) {
                    cm.warp(910300000, 3);
                    cm.spawnMonster(9300088, 6, -572, -1894)
                    cm.dispose();
        } else if (cm.getJob() == 422) {
                    cm.warp(910300000, 3);
                    cm.spawnMonster(9300088, 6, -572, -1894)
                    cm.dispose();
                    } else {
                    cm.sendOk("���Ǹ������йص�����Ŷ,������û�дﵽ120��");
                    cm.dispose();
                }
        } else if (selection == 6) {
                 if (cm.haveItem(2070018)) {
					cm.removeAll(2070018);
					cm.gainItem(5490000, 1);
					cm.gainItem(4280000, 1);
					cm.sendOk("��ϲ��ɾ����ϲ������˽���");
					cm.dispose();
				} else if (cm.haveItem(1432036)) {
					cm.removeAll(1432036);
					cm.gainItem(5490001, 1);
					cm.gainItem(4280001, 1);
					cm.sendOk("��ϲ��ɾ����ϲ�������������");
                    cm.dispose();
                } else {
                    cm.sendOk("��Ǹ��û�пհ׵���...");
                    cm.dispose();
				}
		} else if (selection == 7) {
			if (cm.getQuestStatus(29507) == 1) {
				cm.gainItem(1142082, 1);
				cm.forceCompleteQuest(29507);
				cm.sendOk("�������");
			}
				cm.forceCompleteQuest(3083);
				cm.forceCompleteQuest(8248);
				cm.forceCompleteQuest(8249);
				cm.forceCompleteQuest(8510);
				cm.forceCompleteQuest(20527);
				cm.forceCompleteQuest(50246);
				cm.sendOk("�������");
				cm.dispose();
				} else if (selection == 12) {
				    if (mode == 1) {
					cm.warp(229010000);
					cm.dispose();
				}
			}
        }
}

function NewPlayer() {
		if (!cm.haveItem(5000007, 1, true, true) && cm.canHold(5000007, 1)) {
			cm.gainPet(5000007, "��ɫС��", 1, 0, 100, 0);
		}
		if (!cm.haveItem(2450000, 1, true, true) && cm.canHold(2450000,1)) {
			cm.gainItem(2450000, 10); //����ӱ�
		}
		if (!cm.haveItem(1002419, 1, true, true) && cm.canHold(1002419,1)) {
			cm.gainItemPeriod(1002419, 1, 30);
		}
		if (!cm.haveItem(5030000, 1, true, true) && cm.canHold(5030000,1)) {
			cm.gainItemPeriod(5030000, 1, 30);
		}
		if (!cm.haveItem(5100000, 1, true, true) && cm.canHold(5100000,1)) {
			cm.gainItem(5100000, 1);
		}
		if (!cm.haveItem(5370000, 1, true, true) && cm.canHold(5370000,1)) {
			cm.gainItemPeriod(5370000, 1, 7);
		}
		
		if (!cm.haveItem(5180000, 1, true, true) && cm.canHold(5180000,1)) {
			cm.gainItemPeriod(5180000, 1, 28);
		}
		if (!cm.haveItem(5170000, 1, true, true) && cm.canHold(5170000,1)) {
			cm.gainItemPeriod(5170000, 1, 30);
		}
		cm.forceCompleteQuest(29933); //������ֽ���
		cm.sendOk("��ӭ���� ƨƨ�� ��ʹ�� @help/@���� �˽��ʽָ��\r\n\r\n\r\n��Ϸ���^^");
		cm.dispose();
		return;
}
