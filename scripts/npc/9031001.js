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
        var selStr = "你好，可以帮你什么吗？\r\n";
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            selStr += "#L2##b提升#e采药#n等级。#l\r\n#L3#采药初始化。#k#l\r\n#L4##b交换#t2028066#。#k#l";
        } else {
            selStr += "#L0##b听取有关#e采药#n的说明。#l\r\n#L1#学习#e采药#n。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 0) {
            status = -1;
            cm.sendNext("采药是利用铲子之类的工具，采集地图上的药草的技能。把采集到的药草装在#p9031007#出售的油瓶中提炼，可以获得装备、饰品、炼金术所需的材料。");
        } else if (sel == 1) {
            /*if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                cm.sendOk("你已经学会采矿啦。我建议你最好学习#b装备制作#k或者#b饰品制作#k。你觉得怎么样？");
                cm.dispose();
                return;
            }*/
            if (cm.getPlayerStat("LVL") < 30) {
                cm.sendOk("哎呀，你好像还不够强，还不能学习专业技术。#b至少必须达到30级2转以上，龙神必须3转以上，暗影双刀必须2转+以上#k，才能学习专业技术。请你继续努力，等达到条件之后再来找我。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已经学习了3种专业技术。真想学习的话，就必须先放弃一种技术。");
            } else if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                cm.sendNext("你已经学些过#e采药#n，难道还想学？");
            } else {
                cm.sendOk("恭喜你成功的学习#e采药#n。");
                cm.teachSkill(92000000, 0x1000000, 0);
            }
            cm.dispose();
        } else if (sel == 2) {
            cm.sendNext("熟练度还没满啊。等熟练度满了之后，你再来找我。");
            cm.dispose();
        } else if (sel == 3) {
            if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
                cm.sendOk("你学习了炼金术，现在无法初始化。真想初始化的话，就得先对炼金术进行初始化。");
                cm.dispose();
            } else if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                status = 3;
                cm.sendYesNo("你想放弃#e采药#n？是厌倦了吗？之前积累的等级和熟练度……付出的努力和金钱……都将会变成泡影……你真的要初始化吗？");
            }
        } else if (sel == 4) {
            if (!cm.haveItem(4022023, 100)) {
                cm.sendOk("#b#t4022023#100个#k可以交换#i2028066:##b#t2028066#1个#k。请你再去搜集一些#t4022023#。");
            } else if (!cm.canHold(2028066, 1)) {
                cm.sendOk("背包空间不足。");
            } else {
                cm.sendOk("兑换成功.");
                cm.gainItem(2028066, 1);
                cm.gainItem(4022023, -100);
            }
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendOk("看来你很慎重。好的，你先仔细考虑一下，然后再来找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
            cm.sendOk("采药技术已经初始化。如果想重新学习，请再来找我。");
            cm.teachSkill(92000000, 0, 0);
            if (cm.isQuestActive(3195)) {
                cm.forfeitQuest(3195);
            }
            if (cm.isQuestActive(3196)) {
                cm.forfeitQuest(3196);
            }
        } else {
            cm.sendNext("没有学习#e采药#n初始化失败。");
        }
        cm.dispose();
    }
}