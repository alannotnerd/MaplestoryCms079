/*
	Name: �ù�����
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
		var Editing = true//false ��ʼ
          if(Editing){
          cm.sendOk("��ͣ����");
          cm.dispose();
          return;
		  }
	if (cm.haveItem(4032226, 10)) {
	    cm.sendYesNo("����һЩ #b#t4032226##k\r\n����Ҫ������������");
	} else {
	    cm.sendOk("�ܱ�Ǹ������û��#b10��#t4032226##k���Բ��ܳ��ԡ�");
	    cm.safeDispose();
	}
    } else if (status == 1) {
	var item;
	if (Math.floor(Math.random() * 30) == 0) {
	    var rareList = new Array(3010054, 2022483, 2210029);
		
	    item = cm.gainGachaponItem(rareList[Math.floor(Math.random() * rareList.length)], 1, "��Ҷ�ù�");
	} else {
	    var itemList = new Array(2022484, 2022485, 2022486, 2022487);
		
	    item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1);
	}

	if (item != -1) {
	    cm.gainItem(4032226, -10);
	    cm.sendOk("���ѻ�� #b#t" + item + "##k.");
	} else {
	    cm.sendOk("���鿴�����Ƿ���#b#t4032226# 10��#k�����ߵ�����������");
	}
	cm.safeDispose();
    }
}