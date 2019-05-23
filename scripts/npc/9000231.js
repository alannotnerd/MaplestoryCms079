var status = -1;
var pid = null;
var time = "2014年6月";

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().getClient().getChannel() != 1) {
            cm.sendOk("#e#r只有在 1 频道可以参加");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getMapId() != 910000018) {
            cm.warp(910000018, 0);
        }
        var txt = "#e<天梯联赛 - 赛季" + time + ">#n\r\n";
        txt += "天梯积分：#e#b" + cm.getTianTiJiFen() + "#n#k   我的奖杯：#e#r" +
                cm.getTianTiDianShu() + " #n#k个\r\n";
        txt += "#L0##e#b联赛等级[" + cm.getTianTiDengJiString() + "]#n#l \r\n\r\n";// #L1##e#b管理我的卡牌#n#l
        txt += (cm.getTianTiLengQue() > 0 ? "#g#e   " + Math.round
                ((cm.getTianTiLengQue() / 60)) + " 分钟后可以搜索对手#n#k" : "") + "\r\n";
        txt += (cm.getTianTiHuDun() > 0 ? "#g#e   护盾效果剩余 " + Math.round
                ((cm.getTianTiHuDun() / 60)) + " 分钟#n#k" : "") + "\r\n";
        txt += "#L2##e#r1.搜索对手（" + (10 + 5 * (cm.getTianTiDengJi())) + "万金币）#n#l\r\n";
//        txt += "#L3##e#r2.防守记录#n#l\r\n";
//        txt += "#L4##e#r3.天梯商店#n#l\r\n";
        txt += "#L5##e#r2.联赛帮助#n#l\r\n";
        cm.sendSimple(txt);
    } else if (status == 1) {
        if (selection == 0) {
            var txt = "";
            txt += (cm.getTianTiDengJi() == 5 ? "#r" : "") + "#e联赛等级     奖杯      搜索金币   进攻胜利经验#n\r\n";
            txt += (cm.getTianTiDengJi() == 4 ? "#r" : "") + " 冠军杯       2600 +        99万      角色等级×50万#k\r\n";
            txt += (cm.getTianTiDengJi() == 3 ? "#r" : "") + " 水晶杯    2001 ～ 2600     70万      角色等级×30万#k\r\n";
            txt += (cm.getTianTiDengJi() == 2 ? "#r" : "") + " 黄金杯    1401 ～ 2000     45万      角色等级×10万#k\r\n";
            txt += (cm.getTianTiDengJi() == 1 ? "#r" : "") + " 白银杯     801 ～ 1400     25万      角色等级×5万#k\r\n";
            txt += (cm.getTianTiDengJi() == 0 ? "#r" : "") + " 青铜杯       0 ～ 800      10万      角色等级×2万#k\r\n\r\n";
            txt += "你在本赛季的联赛等级为#e#r" + cm.getTianTiDengJiString() + "#k#n\r\n";
            txt += "#e#b赛季结束时冠军杯奖励：\r\n前 3 名 #r1000#b 金券\r\n第 4~7 名 #r500#b 金券\r\n第 8~10 名 #r200#b 金券";
            cm.sendOk(txt);
            cm.dispose();
        } else if (selection == 1) {
            if (open) {
                cm.sendOk("未开放");
            } else {
                cm.sendOk("#e只有当游戏服务器拥有1000个角色时，天梯联赛才会开启。目前约200个角色");
            }

            cm.dispose();
        } else if (selection == 2) {
            if (cm.getTianTiHuDun() > 0) {
                cm.setTianTiHuDun(0);
                cm.getPlayer().dropMessage(1, "你的护盾已消失.");
            }
            search();
        } else if (selection == 3) {
            cm.sendOk("无任何记录");
            cm.dispose();
        } else {
            cm.sendOk("卡牌玩法即将开启.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selection == 0) {
            search();
        } else {
            if (cm.getTianTiJiFen() < 70) {
                cm.sendOk("#e#r天梯积分不足，刷怪时会从怪物身上获得积分");
                cm.dispose();
                return;
            }
            cm.getPlayer().getTtg().add天梯积分(-70);
            cm.sendOk(cm.JinGong(selection));
            cm.dispose();
        }

    }
}
function search() {
    if (cm.getTianTiLengQue() > 0) {
        cm.sendOk("现在处于冷却时间，暂时不能搜索对手。冷却时间可能会误差 1 分钟，请 1 分钟后再来");
        cm.dispose();
        return;
    }
    pid = cm.randomPlayer();
    if (pid == null) {
        cm.sendOk("没有搜索到对手，请过 30 分钟再来");
        cm.setTianTiLengQue(60 * 30);
        cm.dispose();
        return;
    }
    var me = (10 + 5 * (cm.getTianTiDengJi())) * 10000;
    if (cm.getMeso() < me) {
        cm.sendOk("#e#r金币不够，无法搜索对手");
        cm.dispose();
        return;
    }
    cm.gainMeso(-me);
    status = 1;
    cm.sendSimple(cm.seachPlayerString(pid));
}