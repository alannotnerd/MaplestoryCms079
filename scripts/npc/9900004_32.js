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

            cm.sendOk("感谢你的光临！");
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
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#e#d制作#v1332114#需要#v1332056#x1.#v4000048#x100.#v4000051#x100.#v4000052#x100.#v4000049#x100.#v4000050#x100.#v4000056#x100.#v4000057#x100.#v4000053#x10.#v4000054#x10.#v4000069#x100.#v4000082#x10.#v4000472#x100.#v4000470#x100.#v4000474#x100.#v4000473#x100.#v4000475#x100.#v4000477#x100.#v4005000#x2.#v4005003#x2.#v4005001#x2.#v4005002#x2.#v4031891#100万搜集好道具我就可以为您制作了.#l\r\n\r\n"//3
            text += "#L1##r制作枫叶武器#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if (cm.getMeso() < 1000000) { 
				cm.sendOk("#b装备强化需要 100W金币，您的金币不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(1332056) < 1 ) { 
				cm.sendOk("#b装备强化需要#v1332056#1个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000048) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000048#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000051) < 100  ) { 
 				cm.sendOk("#b装备强化需要#v4000051#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000052) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000052#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000049) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000049#100张，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000050) < 100  ) { 
 				cm.sendOk("#b装备强化需要#v4000050#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000056) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000056#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000057) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000057#100张，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000053) < 10  ) { 
 				cm.sendOk("#b装备强化需要#v4000053#10个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000054) < 10 ) { 
				cm.sendOk("#b装备强化需要#v4000054#10个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000069) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000069#100张，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000082) < 10  ) { 
 				cm.sendOk("#b装备强化需要#v4000082#10个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000472) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000472#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000470) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000470#100张，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000474) < 100  ) { 
 				cm.sendOk("#b装备强化需要#v4000474#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000473) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000473#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000475) < 100 ) { 
				cm.sendOk("#b装备强化需要#v4000475#100张，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4000477) < 100  ) { 
 				cm.sendOk("#b装备强化需要#v4000477#100个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005000) < 2 ) { 
				cm.sendOk("#b装备强化需要#v4005000#2个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005003) < 2 ) { 
				cm.sendOk("#b装备强化需要#v4005003#2张，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005001) < 2  ) { 
 				cm.sendOk("#b装备强化需要#v4005001#2个，您的物品不足#k");
				cm.dispose();
			} else if (cm.itemQuantity(4005002) < 2  ) { 
 				cm.sendOk("#b装备强化需要#v4005002#2个，您的物品不足#k");
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
            cm.sendOk("制作成功！");
            cm.dispose();
			}
		}
    }
}


