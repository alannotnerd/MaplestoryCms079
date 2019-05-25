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
        var selStr = "你好。你对炼金术感兴趣吗？\r\n";
        if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
            selStr += "#k#l\r\n#L2##b提升#e炼金术#n等级。#l\r\n#L3#炼金术技术初始化。#k#l";
        } else {
            selStr += "#L0##b听取有关#e炼金术#n的说明。#l\r\n#L1#学习#e炼金术#n。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("炼金术是用草药的精油制作各种药水的技术。除了恢复HP和MP的药水之外，还可以制作各种让你变强的药水。还能制作你从来没有体验过的神奇药水。");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("#b至少必须达到30级2转以上，龙神必须3转以上，暗影双刀必须2转+以上#k，才能学习专业技术。你能达到条件之后再来找我吗？");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已经学习了3种专业技术。真想学习的话，就必须先放弃一种技术。");
            } else if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
                cm.sendNext("你已经学些过#e炼金术#n，难道还想学？");
            } else {
                if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
                    cm.sendOk("恭喜你成功的学些#e炼金术#n。");
                    cm.teachSkill(92040000, 0x1000000, 0);
                } else {
                    cm.sendOk("炼金术必须先学习采药。往右边走，可以看到在大锅旁用心提炼草药的采药大师#b斯塔切#k，你可以向她学习采药。");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("哎呀！你可真贪心。熟练度还不够。你再去练习练习吧。");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("你想放弃炼金术？是厌倦了吗？之前积累的等级和熟练度……付出的努力和金钱……都将会变成泡影……你真的要初始化吗？");
        }
    } else if (status == 2) {
        cm.sendOk("看来你很慎重。好的，你先仔细考虑一下，然后再来找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
            cm.sendOk("炼金术已经初始化。如果想重新学习，请再来找我。");
            cm.teachSkill(92040000, 0, 0);
        } else {
            cm.sendNext("没有学习#e炼金术#n初始化失败。");
        }
        cm.dispose();
    }
}