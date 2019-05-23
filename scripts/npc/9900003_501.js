/*
 脚本功能 竞技场积分兑换
 */

var a = 0;
var score = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            if (cm.MissionStatus(cm.getPlayer().getId(), 105, 0, 4) == false) {
                cm.MissionMake(cm.getPlayer().getId(), 105, 0, 0, 0, 999999)//记录竞技场积分
            }
            cm.sendGetText("您现在一共有竞技场积分" + cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) + "。\r\n在这里，可以1：1兑换征服者币，你想兑换几个竞技者币呢？\r\n#e<竞技场积分可以在阿里安特竞技场获得>#n。");
        } else if (a == 1) {
            score = parseInt(cm.getText());
            if (cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) >= score) {
                if (cm.canHold(4310036, score)) {
                    cm.gainItem(4310036, score);
                    cm.MissionAddMinNum(cm.getPlayer().getId(), 105, -score);
                    cm.sendOk("兑换 " + score + "个征服者币 成功了，请检查你的背包。")
                    cm.worldMessage("[阿里安特竞技场] "+cm.getChar().getName() + "  成功兑换了许多征服者币。");
                } else {
                    cm.sendOk("对不起，其他栏不足，请腾出一些空位。");
                }
            } else {
                cm.sendOk("对不起，你没有足够的竞技场积分来兑换征服者币。");
            }
            cm.dispose();
        }//a
    }//mode
}//f