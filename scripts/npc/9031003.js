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
        var selStr = "我是装备制作达人#b埃珅#k。找我有事吗？\r\n";
        if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
            selStr += "#k#l\r\n#L2##b提升#e装备制作#n等级。#l\r\n#L3#装备制作技术初始化。#k#l";
        } else {
            selStr += "#L0##b听取有关#e装备制作#n的说明。#l\r\n#L1#学习#e装备制作#n技术。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("装备制作是用采矿提炼好的矿物或宝石，在巨大的熔炉里融化，制作成自己需要的防具或武器的技术。只要在我这里学会了装备制作技术，就可以制作出以前从未见过的武器和防具。");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("哎呀……你好像还不够强，还不能学些专业技术。#b至少必须达到30级2转以上，龙神必须3转以上，暗影双刀必须2转+以上#k，才能学习专业技术。等达到条件之后再来找我吧。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已经学习了3种专业技术。真想学习的话，就必须先放弃一种技术。");
            } else if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
                cm.sendNext("你已经学些过#e装备制作#n，难道还想学？");
            } else {
                if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                    cm.sendOk("恭喜你成功的学些#e装备制作#n。");
                    cm.teachSkill(92020000, 0x1000000, 0);
                } else {
                    cm.sendOk("没学习采矿的人，是无法学习装备制作的。没有材料的话，就不可能坚持下去……你先到旁边的采矿大师#b诺布#k那里去学习采矿吧。");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("哎呀！你可真贪心。熟练度还不够。你再去练习练习吧。");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("你想放弃装备制作？是厌倦了吗？之前积累的等级和熟练度……付出的努力和金钱……都将会变成泡影……你真的要初始化吗？");
        }
    } else if (status == 2) {
        cm.sendOk("看来你很慎重。好的，你先仔细考虑一下，然后再来找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
            cm.sendOk("装备制作已经初始化。如果想重新学习，请再来找我。");
            cm.teachSkill(92020000, 0, 0);
        } else {
            cm.sendNext("没有学习#e装备制作#n初始化失败。");
        }
        cm.dispose();
    }
}