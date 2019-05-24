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
            text += "#r你觉得你面板很低，很难打得动怪？想要变强吗？想要获得力量吗？？\r\n\r\n"//3
            text += "#L1##r购买极光戒指（四维+4、攻击/魔攻+2）\t使用时间：7天权\r\n\r\n"//3
            text += "#L2##r购买透明武器（四维+5、攻击/魔攻+5）\t使用时间：7天权\r\n\r\n"//3
            //text += "#L3##r制作并升级小小眼镜#k>>>>>>>>>>>#b通道3#l\r\n\r\n"//3
            //text += "#L4##e#d#v1032060# 锻造阿尔泰耳环.#l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc(9900004, 201);
        } else if (selection == 6) {
		cm.openNpc(9310059, 5);
        } else if (selection == 5) {
		cm.openNpc(9310059, 4);
        } else if (selection == 2) {
		cm.openNpc(9900004, 202);
        } else if (selection == 3) {
		cm.openNpc(9000017, 20);
        } else if (selection == 4) {
		cm.openNpc(9000017, 3);
	}
    }
}


