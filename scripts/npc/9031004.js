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
        var selStr = "#b梅兹#k大人我高尚的业余爱好是宝石鉴赏。看着闪光的宝石，不知不觉一天就过去了。嗯～你也感兴趣吗？看你也不像是对宝石感兴趣的人啊？\r\n";
        if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
            selStr += "#k#l\r\n#L2##b提升#e饰品制作#n等级。#l\r\n#L3#饰品制作技术初始化。#k#l";
        } else {
            selStr += "#L0##b听取有关#e饰品制作#n的说明。#l\r\n#L1#学习#e饰品制作#n技术。#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            status = -1;
            cm.sendNext("要想说明饰品制作，就必须先谈谈宝石之美。不过都说的话，可能说上一整天都不够，我就长话短说吧……\r\n饰品制作非常简单。就是对未加工的宝石和矿石进行加工，制作成美丽的饰品。通过这个过程，可以发挥出材料隐藏的力量，让人变得更美或者更强。");
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") < 30) {
                status = -1;
                cm.sendOk("啧啧……哎呀哎呀……你想早点学习，我也可以理解，不过都得按规矩办事。你还太弱，现在还不能学习专业技术。你对宝石和美的热情，我已经知道。不过#b至少必须达到30级2转以上，龙神必须3转以上，暗影双刀必须2转+以上#k，才能学习专业技术。");
            } else if (cm.getProfessions() >= 3) {
                cm.sendNext("嗯，你好像已经学习了3种专业技术。真想学习的话，就必须先放弃一种技术。");
            } else if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
                cm.sendNext("你已经学些过#e饰品制作#n，难道还想学？");
            } else {
                if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
                    cm.sendOk("恭喜你成功的学些#e饰品制作#n。");
                    cm.teachSkill(92030000, 0x1000000, 0);
                } else {
                    cm.sendOk("哎呀～这可怎么办呢？要想学习饰品制作的话，就必须先学习采矿。要想制作饰品，需要有各种金属和宝石～你先到左边去，那里有个长得像蘑菇一样的叫#b诺布#k的采矿大师，你先去那里学习采矿吧。");
                }
            }
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("哎呀！你可真贪心。熟练度还不够。你再去练习练习吧。");
            cm.dispose();
        } else if (selection == 3) {
            status = 3;
            cm.sendYesNo("你想放弃饰品制作？是厌倦了吗？之前积累的等级和熟练度……付出的努力和金钱……都将会变成泡影……你真的要初始化吗？");
        }
    } else if (status == 2) {
        cm.sendOk("看来你很慎重。好的，你先仔细考虑一下，然后再来找我。");
        cm.dispose();
    } else if (status == 4) {
        if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
            cm.sendOk("饰品制作已经初始化。如果想重新学习，请再来找我。。");
            cm.teachSkill(92030000, 0, 0);
        } else {
            cm.sendNext("没有学习#e饰品制作#n初始化失败。");
        }
        cm.dispose();
    }
}