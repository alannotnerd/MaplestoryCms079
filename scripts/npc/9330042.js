/*
	Name: ΢΢������ת��NPC
	Place: �����ׯ
 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	if (cm.haveItem(5310000)) {
	    cm.sendYesNo("����һЩ #b#t5310000##k\r\n����Ҫ����������������#v2022217##v2022221##v2022222##v2022223#");
	} else {
	    cm.sendOk("�ܱ�Ǹ������û��#b#t5310000##k���Բ��ܳ����������������������㹻�þ��ܻ��#v2022217##v2022221##v2022222##v2022223#����");
	    cm.safeDispose();
	}
    } else if (status == 1) {
	var item;
	if (Math.floor(Math.random() * 300) == 0) {
	    var rareList = new Array(2022217, 2022221, 2022222, 2022223);
		
	    item = cm.gainGachaponItem(rareList[Math.floor(Math.random() * rareList.length)], 1, "ޱޱ������");
		/*cm.sendNext("#b�Ѿ�����#r#v" + id + ":##t" + id + ":##b x" + gain + " ���,��ȥ�������հɡ�");
        cm.WorldMessage("	��ϲ " + cm.getPlayer().getName() + "������ת���鵽��" + MapleItemInformationProvider.getInstance().getName(id) + "x" + gain);
        cm.dispose();*/
	} else {
	    var itemList = new Array(2022216, 2022218, 2022219, 2022220);

	    item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1);
	}

	if (item != -1) {
	    cm.gainItem(5310000, -1);
	    cm.sendOk("���ѻ�� #b#t" + item + "##k.");
	} else {
	    cm.sendOk("���鿴�����Ƿ���#t5310000##k�����ߵ�����������");
	}
	cm.safeDispose();
    }
}