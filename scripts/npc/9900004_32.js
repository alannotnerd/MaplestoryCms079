function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//��ʾ��ƷIDͼƬ�õĴ�����  #v����д��ID#
            text += "#e#d����#v1332114#��Ҫ#v1332056#x1.#v4000048#x100.#v4000051#x100.#v4000052#x100.#v4000049#x100.#v4000050#x100.#v4000056#x100.#v4000057#x100.#v4000053#x10.#v4000054#x10.#v4000069#x100.#v4000082#x10.#v4000472#x100.#v4000470#x100.#v4000474#x100.#v4000473#x100.#v4000475#x100.#v4000477#x100.#v4005000#x2.#v4005003#x2.#v4005001#x2.#v4005002#x2.#v4031891#100���Ѽ��õ����ҾͿ���Ϊ��������.#l\r\n\r\n"//3
            text += "#L1##r������Ҷ����#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if (cm.getMeso() < 1000000) { 
				cm.sendOk("#bװ��ǿ����Ҫ 100W��ң����Ľ�Ҳ���#k");
				cm.dispose();
			} else if (cm.itemQuantity(1332056) < 1 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v1332056#1����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000048) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000048#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000051) < 100  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4000051#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000052) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000052#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000049) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000049#100�ţ�������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000050) < 100  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4000050#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000056) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000056#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000057) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000057#100�ţ�������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000053) < 10  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4000053#10����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000054) < 10 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000054#10����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000069) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000069#100�ţ�������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000082) < 10  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4000082#10����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000472) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000472#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000470) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000470#100�ţ�������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000474) < 100  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4000474#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000473) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000473#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000475) < 100 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4000475#100�ţ�������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000477) < 100  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4000477#100����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005000) < 2 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4005000#2����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005003) < 2 ) { 
				cm.sendOk("#bװ��ǿ����Ҫ#v4005003#2�ţ�������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005001) < 2  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4005001#2����������Ʒ����#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005002) < 2  ) { 
 				cm.sendOk("#bװ��ǿ����Ҫ#v4005002#2����������Ʒ����#k");
				cm.dispose();
			}else{
				cm.gainItem(1332056, -1);
				cm.gainItem(4000048, -100);
				cm.gainItem(4000051, -100);
				cm.gainItem(4000052, -100);
				cm.gainItem(4000049, -100);
				cm.gainItem(4000050, -100);
				cm.gainItem(4000056, -100);
				cm.gainItem(4000057, -100);
				cm.gainItem(4000053, -10);
				cm.gainItem(4000054, -10);
				cm.gainItem(4000069, -100);
				cm.gainItem(4000082, -10);
				cm.gainItem(4000472, -100);
				cm.gainItem(4000470, -100);
				cm.gainItem(4000473, -100);
				cm.gainItem(4000474, -100);
				cm.gainItem(4000475, -100);
				cm.gainItem(4000477, -100);
				cm.gainItem(4005000, -2);
				cm.gainItem(4005001, -2);
				cm.gainItem(4005002, -2);
				cm.gainItem(4005003, -2);
				cm.gainItem(1332114, 1);
				cm.gainMeso(-1000000);
            cm.sendOk("�����ɹ���");
            cm.dispose();
			}
		}
    }
}


