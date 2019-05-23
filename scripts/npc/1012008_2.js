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

            text += "制作#v4080001#需要\r\n#v4030009#x1.#v4000010#x200.#v4000006#x200,#v4031891#100万.\r\n搜集好道具我就可以为您制作了.#l\r\n\r\n"//3
            text += "#L1##r制作五子棋#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.haveItem(4030009, 1) && cm.haveItem(4000010,200) && cm.haveItem(4000006,200) && cm.getMeso() > 1000000)
			{
				cm.gainItem(4030009, -1);
				cm.gainItem(4000010, -200);
				cm.gainItem(4000006, -200);
				cm.gainItem(4080001, 1);
				cm.gainMeso(-1000000);
				cm.sendOk("制作成功！");
				cm.worldMessage(6,"玩家：["+cm.getPlayer().getName()+"]制作了[绿水灵/三眼章五子棋]，快快享受游戏的乐趣吧！");
				cm.dispose();
			}else{
				cm.sendOk("您的材料不足！");
				cm.dispose();
			}
		}
    }
}


