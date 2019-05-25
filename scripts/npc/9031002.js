var status = -1;
var sel = -1;

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
        var selStr = "我是采矿达人 #b诺布#k，找我有事吗？\r\n";
        if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            selStr += "#L2##b提升#e采矿#n等级。#l\r\n#L3#采矿初始化。#k#l\r\n#L4##b交换#t4011010#。#k#l";
        } else {
            selStr += "#L0##b听取有关#e采矿#n的说明。#l\r\n#L1#学习#e采矿#n。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {
            status = -1;
            cm.sendNext("采矿是用十字镐之类的工具，采集地图上的矿石的技能。采集到的矿石，可以用#p9031007#出售的铁砧进行冶炼，获得装备、饰品、炼金术所需的材料。");
        } else if (sel == 1) {
            /*if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                cm.sendOk("你已经学会采药啦。我建议你最好学习#b装备制作#k或者#b饰品制作#k。你觉得怎么样？");
                cm.dispose();
                return;
            }*/
            if (cm.getPlayerStat("LVL") < 30) {
                cm.sendOk("小毛孩！你还不够强，还不能学习专业技术。#b至少必须达到30级2转以上，龙神必须3转以上，暗影双刀必须2转+以上#k，才能学习专业技术。等达到条件之后再来找我吧。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已经学习了3种专业技术。真想学习的话，就必须先放弃一种技术。");
            } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                cm.sendNext("你已经学些过#e采矿#n，难道还想学？");
            } else {
                cm.sendOk("恭喜你成功的学习#e采矿#n。");
                cm.teachSkill(92010000, 0x1000000, 0);
				cm.gainItem(1512000, 1);
            }
            cm.dispose();
        } else if (sel == 2) {
            cm.sendNext("熟练度还没满啊。等熟练度满了之后，你再来找我。");
            cm.dispose();
        } else if (sel == 3) {
            if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
                cm.sendOk("你学习了装备制作，现在无法初始化。真想初始化的话，就得先对装备制作或饰品制作进行初始化。");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
                cm.sendOk("你学习了饰品制作，现在无法初始化。真想初始化的话，就得先对装备制作或饰品制作进行初始化。");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                status = 3;
                cm.sendYesNo("你想放弃#e采矿#n？是厌倦了吗？之前积累的等级和熟练度……付出的努力和金钱……都将会变成泡影……你真的要初始化吗？");
            }
        } else if (sel == 4) {
            if (!cm.haveItem(4011010, 100)) {
                cm.sendOk("#b#t4011010#100个#k可以交换#i2028067:##b#t2028067#1个#k。请再去搜集一些#t4011010#。");
            } else if (!cm.canHold(2028067, 1)) {
                cm.sendOk("背包空间不足。");
            } else {
                cm.sendOk("兑换成功.");
                cm.gainItem(2028067, 1);
                cm.gainItem(4011010, -100);
            }
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendOk("看来你很慎重。好的，你先仔细考虑一下，然后再来找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
            cm.sendOk("采矿技术已经初始化。如果想重新学习，请再来找我。");
            cm.teachSkill(92010000, 0, 0);
            if (cm.isQuestActive(3197)) {
                cm.forfeitQuest(3197);
            }
            if (cm.isQuestActive(3198)) {
                cm.forfeitQuest(3198);
            }
        } else {
            cm.sendNext("没有学习#e采矿#n初始化失败。");
        }
        cm.dispose();
    }
}