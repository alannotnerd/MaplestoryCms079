/*
	脚本类型: 		NPC
	所在地图:		宴客堂
	脚本名字:	 	离开NPC
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            cm.sendSimple("你做想什么呢？#b\r\n#L0# 查看关于宴客堂。\r\n#L1# 我想离开这里。");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("宴客堂是婚礼主人招待宴客的地方，你可以在这里给婚礼主人道贺礼，送红包。");
            } else {
                status = 2;
                if (mode == 1) {
                    cm.sendYesNo("离开这里不能退还请帖哦，下次再进来的时候还要交出请帖。");
                } else {
                    cm.dispose();
                }
            }
        } else if (status == 2) {
            cm.sendNext("在这里你可以和别的宴客聊天，这段时间很有趣哦！");
            cm.dispose();
        } else if (status == 3) {
            cm.sendNext("即使如此，还是要离开吗？");
        } else if (status == 4) {
            cm.sendNext("好的，我这就送你出去。");
        } else if (status == 5) {
            cm.warp(700000000);
            cm.dispose();
        }
    }
}