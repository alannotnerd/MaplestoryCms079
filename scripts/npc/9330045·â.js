/* Kedrick
	Fishking King NPC
*/

var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }

    if (status == 0) {
	//cm.sendSimple("����Ҫ��ʲô��\n\r #b#L0#������㳡#l \n\r #L1#�����#l \n\r #L2#�������#l \n\r #L3#����ζ�Ķ�����#l \n\r #L4#����ָ��#l \n\r #L5##i1142146:#ó��500�𵰣�����ѫ��[�ڣ�30��]��#l");
    cm.sendSimple("��ã������泡����Ա.\n\r�������Ҫ���е��㣬�뵽[�̳�]����[�����]������ͷ�#v5340001#/#v5340000#���֣��߼�10���һ���㣬��ͨ����20��һ�Σ����˽�����ô�࣬����Ѽ��һ�������ɣ�\n\r #b#L0# #v4000411#  ������㳡.#l \n\r #L2##v3011000#  50���ҹ��������.#l \n\r #L3##v5350000# �һ����(�̳ǹ���).#l \n\r #L4##v4161001#   ����ָ��.#l \n\r #L6##v4031630#   �һ��������.#l \n\r #L5##v4001200#   С��齱��.#l");
       } else if (status == 1) {
	sel = selection;
	if (sel == 0) {
	    if (cm.haveItem(5340000) || cm.haveItem(5340001)) {
		if (cm.haveItem(3011000)) {
		    cm.saveLocation("FISHING");
		    cm.warp(741000200);
		    cm.dispose();
		} else {
		    cm.sendNext("���������������Ա��ܵ��㣡");
		    cm.safeDispose();
		}
	    } else {
		cm.sendNext("���������ˣ��������");
		cm.safeDispose();
	    }
	} else if (sel == 1) {
	    cm.sendYesNo("����Ҫ3000��� - 120���ն�����������");
	} else if (sel == 2) {
	    if (cm.haveItem(3011000)) {
		cm.sendNext("���Ѿ���һ�ѵ����Ρ�ÿ����ɫֻ����1�������Ρ�");
	    } else {
		if (cm.canHold(3011000) && cm.getMeso() >= 500000) {
		    cm.gainMeso(-500000);
		    cm.gainItem(3011000, 1);
		    cm.sendNext("���ֵ���~");
		} else {
		    cm.sendOk("�����Ƿ��������5W��һ��㹻�ı����ռ䡣");
		}
	    }
	    cm.safeDispose();
	} else if (sel == 3) {
	    if (cm.canHold(2300001,120) && cm.haveItem(5350000,1)) {
		//if (!cm.haveItem(2300001)) {
		    cm.gainItem(2300001, 120);
		    cm.gainItem(5350000,-1);
		    cm.sendNext("���ֵ���~");
		//} else {
		//    cm.sendNext("���Ѿ����˵�����ն���");
		//}
	    } else {
		cm.sendOk("�����Ƿ����㹻�ı����ռ����ζ���ն����Դ���������Ҳ����ȥ�̳�������");
	    }
	    cm.safeDispose();
	} else if (sel == 4) {
	    cm.sendOk("����Ҫ10�����ϣ�����͡���������ν�����������ÿ1���Ӿ�Ҫһ��һ�εľ��̡������˴������˿����㲶׽��¼��");
	    cm.safeDispose();
	} else if (sel == 5) {
		cm.openNpc(9330045, 3);
        } else if (sel == 6) {
			cm.openNpc(9330045, 1);
	   // cm.safeDispose();
	}
    } else if (status == 2) {
	if (sel == 1) {
	    if (cm.canHold(2300000,120) && cm.getMeso() >= 300000) {
		if (!cm.haveItem(2300000)) {
		    cm.gainMeso(-300000);
		    cm.gainItem(2300000, 120);
		    cm.sendNext("���ֵ���~");
		} else {
		    cm.sendNext("���Ѿ����˵�����ն���");
		}
	    } else {
		cm.sendOk("�����Ƿ��������300000��һ��㹻�ı����ռ䡣");
	    }
	    cm.safeDispose();
	}
    }
}