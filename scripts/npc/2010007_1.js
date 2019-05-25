 /* 哈拉克 - 创建家族 */

var wn19 = "#fUI/CashShop.img/CSEffect/event/0#";  //活动图标
var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getPlayerStat("GID") > 0) {
            cm.sendSimple("有什么可以帮你的吗？#e\r\n#b#L0#我想增加家族人数#l\r\n#L1#我想解散家族#l\r\n\r\n\r\n\r\n#r#e说明：#d扩建家族完毕后，会提示你家族人数已满(假提示)，需要小退游戏后即可扩建成功，本服有完美的家族体系，家族任务，家族每周奖励，激烈比拼。");
        } else {
            cm.dispose();
            cm.openNpc(2010007);
        }
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是族长，因此你将不能增加家族成员的人数上限.");
                cm.dispose();
            } else {
                cm.sendYesNo("家族成员人数每增加#b5人#k，需要的手续费是#b3000万金币#k。怎么样？你想增加家族人数吗？");
            }
        } else if (selection == 1) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是族长，因此你不能解散该家族.");
                cm.dispose();
            } else {
                cm.sendYesNo("你真的要解散家族吗？哎呀……哎呀……解散之后，你的家族就会被永久删除。很多家族特权也会一起消失。你真的要解散吗？");
            }
        }
    } else if (status == 2) {
        if (sel == 0 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.increaseGuildCapacity(false, 30000000);
            cm.dispose();
        } else if (sel == 1 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.disbandGuild();
            cm.dispose();
        }
    }
}