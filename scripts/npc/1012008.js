function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "你好！\r\n在我这里可以帮你制作你所想要的五子棋和记忆大考验游戏，以下是我可以为您制作的游戏道具列表.\r\n\r\n"
            text += "#L1##v4080000# 绿水灵/蘑菇   五子棋#l\r\n"
            text += "#L2##v4080001# 绿水灵/三眼章 五子棋#l\r\n"
            text += "#L3##v4080002# 绿水灵/猪猪   五子棋#l\r\n"
            text += "#L4##v4080003# 三眼章鱼/蘑菇 五子棋#l\r\n"
            text += "#L5##v4080004# 猪猪/三眼章鱼 五子棋#l\r\n"
            text += "#L6##v4080005# 猪猪/蘑菇     五子棋#l\r\n"
            text += "#L7##v4080100# 记忆大考验#l\r\n"
            cm.sendSimple(text);
        } else if (selection == 1) {
		  cm.openNpc(1012008, 1);
        } else if (selection == 2) {
		  cm.openNpc(1012008, 2);
        } else if (selection == 3) {
		  cm.openNpc(1012008, 3);
        } else if (selection == 4) {
		  cm.openNpc(1012008, 4);
        } else if (selection == 5) {
		  cm.openNpc(1012008, 5);
        } else if (selection == 6) {
		  cm.openNpc(1012008, 6);
        } else if (selection == 7) {
		  cm.openNpc(1012008, 7);
		}
    }
}


