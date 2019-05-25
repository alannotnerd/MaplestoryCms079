var status = -1;
var e17 ="#fEffect/BasicEff/MainNotice/Content/Number/1/0#";
var e18 ="#fEffect/BasicEff/MainNotice/Content/Number/9/0#";
var e19 ="#fEffect/BasicEff/MainNotice/Content/Number/0/0#";

var beauty = 0;
var tosend = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果需要股票币兑换抵用卷，请再次找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，我可以为您将股票币兑换成抵用卷！:\r\n\r\n    您当前的股票币[" + cm.getClubMoney() + "]   您当前的抵用卷["+cm.getPlayer().getCSPoints(2)+"]\r\n#k      比例为 [ "+e17+" 股票币  兑换  "+e18+""+e19+" 抵用卷！]\r\n#k#b#L0##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#股票币 兑换 抵用卷#l\r\n");//#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##v4032226# 兑换 金券 #l
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 1) {
                cm.sendOk("GM不能参与兑换.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getSpace(2) < 1) {
                    cm.sendOk("你的背包“其它”空间不足!至少有1个空间以上才可以兑换。");
                    cm.dispose();
                } else if (cm.getClubMoney() == 0) {
                    cm.sendNext("您的股票币不够");
                    cm.dispose();
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("请输入 股票币 兑换 抵用卷 的数量:\r\n兑换比例为 1 : 90\r\n", 1, 1, cm.getClubMoney());
                }
            } else if (selection == 1) {
                if (cm.haveItem(4032226) == false) {
                    cm.sendNext("#v4032226#不足无法兑换金卷。");
                    cm.dispose();
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("请输入#v4032226#兑换金卷的数量:\r\n兑换比例为 1 : 1\r\n", 1, 1, 999);
                }
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (cm.getClubMoney() <= 0) {
                    cm.sendOk("您的背包没有空格。");
                    cm.dispose();
                } else if (selection == 0) {
                    cm.sendOk("输入的兑换数字错误。");
                    cm.dispose();
                } else if (cm.getClubMoney() < selection ) {
                            cm.gainClubMoney(-selection * 1);	
				cm.gainNX(0,+selection * 90);
                    cm.sendOk("您成功将#k股票币 兑换 抵用卷 x #r" + selection + "#k。");
                    cm.dispose();
                } else {
                            cm.gainClubMoney(-selection * 1);	
				cm.gainNX(0,+selection * 90);
                    cm.sendOk("您成功将#k股票币 兑换 抵用卷 x #r" + selection * 90 + "#k。");

                    //cm.sendNext("您的输入的数量错误，无法兑换。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4032226, selection)) {
                    cm.gainItem(4032226, -selection);
                    cm.addJQ(1 * selection);
                    cm.sendOk("您成功将黄金猪#v4032226# x #r" + selection + " #k兑换成#r " + (1 * selection) + " #k金卷。");
                    cm.dispose();
                } else {
                    cm.sendNext("你没有那么多 亏你写得出来！");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}