/* 
 * Spiegelmann - Monster Carnival
 */

var status = -1;
var rank = "D";
var exp = 0;

function start() {
    if (cm.getCarnivalParty() != null) {
        status = 99;
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("你想做什么？如果你从来没有参加过嘉年华，你需要先知道两件事才能加入。\r\n#b#L0#我要去嘉年华#l");
    } else if (status == 1) {
        switch (selection) {
        case 0: {
                var level = cm.getPlayerStat("LVL");
                if (level < 30) {
                    cm.sendOk("你的等级小于30.不能参加嘉年华.");
                } else {
                    cm.warp(980000000, "st00");
                }
                cm.dispose();
            }
        default: {
                cm.dispose();
                break;
            }
            break;
        }
    } else if (status == 100) {
        var carnivalparty = cm.getCarnivalParty();
        if (carnivalparty.getTotalCP() >= 501) {
            rank = "A";
            exp = 150000;
        } else if (carnivalparty.getTotalCP() >= 251) {
            rank = "B";
            exp = 120000;
        } else if (carnivalparty.getTotalCP() >= 101) {
            rank = "C";
            exp = 100000;
        } else if (carnivalparty.getTotalCP() >= 0) {
            rank = "D";
            exp = 80000;
        }
        cm.getPlayer().endPartyQuest(1301);
        if (carnivalparty.isWinner()) {
            cm.sendOk("你胜利了.恭喜你. \r\n#bMonster Carnival Rank : " + rank);
        } else {
            cm.sendOk("不幸的你在战斗中失败了.下次加油吧. \r\n#bMonster Carnival Rank : " + rank);
        }
    } else if (status == 101) {
        var carnivalparty = cm.getCarnivalParty();
        var los = parseInt(cm.getPlayer().getOneInfo(1301, "lose"));
        var vic = parseInt(cm.getPlayer().getOneInfo(1301, "vic"));
        if (carnivalparty.isWinner()) {
            vic++;
            cm.getPlayer().updateOneInfo(1301, "vic", "" + vic);
            carnivalparty.removeMember(cm.getChar());
            cm.gainExpR(exp);
        } else {
            los++;
            cm.getPlayer().updateOneInfo(1301, "lose", "" + los);
            carnivalparty.removeMember(cm.getChar());
            cm.gainExpR(exp / 2);
        }
        cm.getPlayer().updateOneInfo(1301, "VR", "" + (java.lang.Math.ceil((vic * 100) / los)));
        cm.warp(980000000);
        cm.dispose();
    }

}