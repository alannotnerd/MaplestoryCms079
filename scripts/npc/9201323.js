var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "             亲爱的#r#e#h ##k#n么么哒!\r\n     #d#L0##v4000313#x300 兑换 #v2431926##k(鹰眼防具箱子)#l\r\n     #L1##d#v4000313#x500 兑换 #v2431792##k(彩虹随机暴君箱子)#l\r\n\r\n███████████████████████████\r\nＰ:黄金枫叶可以交易。感谢大家的支持，岛民们加油！";
        cm.sendSimple(selStr)
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.haveItem(4000313,300)) {
		cm.gainItem(4000313, -300);
                cm.gainItem(2431926,1);
				cm.worldSpouseMessage(0x20, "『兑换公告』" + " : " + "玩家 " + cm.getChar().getName() + " 成功用300个黄金枫叶换取1个鹰眼防具箱子。");
				cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功用300个黄金枫叶换取1个鹰眼防具箱子。", 5120026);
                cm.sendOk("兑换成功\r\n祝你游戏愉快--牛牛!!");
            } else {
                cm.sendOk("你不符合兑换要求,我不能与你兑换--牛牛!");
            }
            break;
        case 1:
            if (cm.haveItem(4000313,500)) {
		cm.gainItem(4000313, -500);
                cm.gainItem(2431792,1);
				cm.worldSpouseMessage(0x20, "『兑换公告』" + " : " + "玩家 " + cm.getChar().getName() + " 成功用500个黄金枫叶换取1个彩虹随机暴君箱子。");
				cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功用500个黄金枫叶换取1个爆君防具箱子。", 5120026);
                cm.sendOk("兑换成功\r\n祝你游戏愉快--牛牛!");
            } else {
                cm.sendOk("你不符合兑换要求,我不能与你兑换--牛牛!");
            }
            break;
        }
        cm.dispose();
    }
}
