/*    
 转职NPC
 */

importPackage(net.sf.cherry.client);

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("祝你好运!");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("你好.我是转职NPC.");
        } else if (status == 1) {
            if ((cm.getLevel() < 200 && cm.getJob().equals(net.sf.cherry.client.MapleJob.BEGINNER))||(cm.getLevel() < 200 && cm.getJob().equals(net.sf.cherry.client.MapleJob.NOBLESSE))) {
                if (cm.getLevel() < 8) {
                    cm.sendNext("对不起.你至少8级以上才能转职哦.");
                    status = 98;
                } else if (cm.getLevel() < 10) {
                    cm.sendYesNo("恭喜你已经达到8级.你想变成#r魔法师#k么?");
                    status = 150;
                } else {
                    cm.sendYesNo("恭喜你已经到达第一次转职等级.你想进行一转么?");
                    status = 153;
                }
            } else if (cm.getLevel() < 30) {
                cm.sendNext("对不起.你至少30级才能进行#r第二次#k转职.");
                status = 98;
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THIEF)) {
                cm.sendSimple("恭喜你达到第二次转职水平. 你想成为什么职业呢?#b\r\n#L0#标飞#l\r\n#L1#刀飞#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WARRIOR)) {
                cm.sendSimple("恭喜你达到第二次转职水平. 你想成为什么职业呢?#b\r\n#L2#剑客#l\r\n#L3#准骑士#l\r\n#L4#枪战士#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MAGICIAN)) {
                cm.sendSimple("恭喜你达到第二次转职水平. 你想成为什么职业呢?#b\r\n#L5#冰雷法师#l\r\n#L6#火毒法师#l\r\n#L7#牧师#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BOWMAN)) {
                cm.sendSimple("恭喜你达到第二次转职水平. 你想成为什么职业呢?#b\r\n#L8#猎人#l\r\n#L9#弩弓手#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PIRATE)) {
                cm.sendSimple("恭喜你达到第二次转职水平. 你想成为什么职业呢?#b\r\n#L10#拳击手#l\r\n#L11#火枪手#l#k");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BLAZEWIZARD1)) {
                cm.sendSimple("恭喜你已经达到骑士团二转水平.现在就进行二转么?#b\r\n#L12#是的.我已经做好准备了#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DAWNWARRIOR1)) {
                cm.sendSimple("恭喜你已经达到骑士团二转水平.现在就进行二转么?#b\r\n#L14#是的.我已经做好准备了#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTWALKER1)) {
                cm.sendSimple("恭喜你已经达到骑士团二转水平.现在就进行二转么?#b\r\n#L16#是的.我已经做好准备了#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WINDARCHER1)) {
                cm.sendSimple("恭喜你已经达到骑士团二转水平.现在就进行二转么?#b\r\n#L18#是的.我已经做好准备了#l");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THUNDERBREAKER1)) {
                cm.sendSimple("恭喜你已经达到骑士团二转水平.现在就进行二转么?#b\r\n#L20#是的.我已经做好准备了#l");
            } else if (cm.getLevel() < 70) {
                cm.sendNext("对不起.你至少70级以上才能进行第三次转职.");
                status = 98;
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN)) {
                status = 63;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT)) {
                status = 66;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HUNTER)) {
                status = 69;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CROSSBOWMAN)) {
                status = 72;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD)) {
                status = 75;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD)) {
                status = 78;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC)) {
                status = 81;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER)) {
                status = 84;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE)) {
                status = 87;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN)) {
                status = 90;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.GUNSLINGER)) {
                status = 95;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BRAWLER)) {
                status = 92;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BLAZEWIZARD2)) {
                status = 169;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DAWNWARRIOR2)) {
                status = 172;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTWALKER2)) {
                status = 175;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WINDARCHER2)) {
                status = 178;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THUNDERBREAKER2)) {
                status = 181;
                cm.sendYesNo("恭喜你达到三转水平.现在就进行转职么?");
            } else if (cm.getLevel() < 120) {
                cm.sendNext("对不起.您至少120级以上才能进行#r第四次#k转职.");
                status = 98;
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HERMIT)) {
                status = 105;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CHIEFBANDIT)) {
                status = 108;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.RANGER)) {
                status = 111;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SNIPER)) {
                status = 114;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_MAGE)) {
                status = 117;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_MAGE)) {
                status = 120;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PRIEST)) {
                status = 123;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CRUSADER)) {
                status = 126;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WHITEKNIGHT)) {
                status = 129;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DRAGONKNIGHT)) {
                status = 132;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MARAUDER)) {
                status = 133;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.OUTLAW)) {
                status = 134;
                cm.sendYesNo("恭喜你达到四转水平.现在就进行转职么?");
            } else if (cm.getLevel() < 200) {
                cm.sendNext("未来的路还很长.你一定要加油哦");
                status = 98;
            } else if (cm.getLevel() >= 200) {
                cm.sendYesNo("恭喜你到达200级.我这里有份礼物给你哦.想要么?");
                status = 160;
            } else {
                cm.dispose();
            }
        } else if (status == 2) {
            if (selection == 0) {
                jobName = "标飞";
                job = net.sf.cherry.client.MapleJob.ASSASSIN;
            }
            if (selection == 1) {
                jobName = "刀飞";
                job = net.sf.cherry.client.MapleJob.BANDIT;
            }
            if (selection == 2) {
                jobName = "剑客";
                job = net.sf.cherry.client.MapleJob.FIGHTER;
            }
            if (selection == 3) {
                jobName = "准骑士";
                job = net.sf.cherry.client.MapleJob.PAGE;
            }
            if (selection == 4) {
                jobName = "枪战士";
                job = net.sf.cherry.client.MapleJob.SPEARMAN;
            }
            if (selection == 5) {
                jobName = "冰雷法师";
                job = net.sf.cherry.client.MapleJob.IL_WIZARD;
            }
            if (selection == 6) {
                jobName = "火毒法师";
                job = net.sf.cherry.client.MapleJob.FP_WIZARD;
            }
            if (selection == 7) {
                jobName = "牧师";
                job = net.sf.cherry.client.MapleJob.CLERIC;
            }
            if (selection == 8) {
                jobName = "猎人";
                job = net.sf.cherry.client.MapleJob.HUNTER;
            }
            if (selection == 9) {
                jobName = "弩弓手";
                job = net.sf.cherry.client.MapleJob.CROSSBOWMAN;
            }
            if (selection == 10) {
                jobName = "拳击手";
                job = net.sf.cherry.client.MapleJob.BRAWLER;
            }
            if (selection == 11) {
                jobName = "火枪手";
                job = net.sf.cherry.client.MapleJob.GUNSLINGER;
            }
            if (selection == 12) {
                jobName = "二转炎术士";
                job = net.sf.cherry.client.MapleJob.BLAZEWIZARD2;
            }
            if (selection == 13) {
                cm.sendOk("如果你已经准备好转职,那就再来找我吧.");
                cm.dispose();
            }
            if (selection == 14) {
                jobName = "二转魂骑士";
                job = net.sf.cherry.client.MapleJob.DAWNWARRIOR2;
            }
            if (selection == 15) {
                cm.sendOk("如果你已经准备好转职,那就再来找我吧.");
                cm.dispose();
            }
            if (selection == 16) {
                jobName = "二转夜行者";
                job = net.sf.cherry.client.MapleJob.NIGHTWALKER2;
            }
            if (selection == 17) {
                cm.sendOk("如果你已经准备好转职,那就再来找我吧.");
                cm.dispose();
            }
            if (selection == 18) {
                jobName = "二转风之灵者";
                job = net.sf.cherry.client.MapleJob.WINDARCHER2;
            }
            if (selection == 19) {
                cm.sendOk("如果你已经准备好转职,那就再来找我吧.");
                cm.dispose();
            }
            if (selection == 20) {
                jobName = "二转奇袭者";
                job = net.sf.cherry.client.MapleJob.THUNDERBREAKER2;
            }
            if (selection == 21) {
                cm.sendOk("如果你已经准备好转职,那就再来找我吧.");
                cm.dispose();
            }
            cm.sendYesNo("你想成为 #r" + jobName + "#k么?");
        } else if (status == 3) {
            cm.changeJob(job);
            cm.sendOk("恭喜你转职成功.未来的路还很长哦");
            cm.dispose();
        } else if (status == 61) {
            if (cm.getJob().equals(net.sf.cherry.client.MapleJob.ASSASSIN)) {
                status = 63;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BANDIT)) {
                status = 66;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HUNTER)) {
                status = 69;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CROSSBOWMAN)) {
                status = 72;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_WIZARD)) {
                status = 75;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_WIZARD)) {
                status = 78;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CLERIC)) {
                status = 81;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FIGHTER)) {
                status = 84;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PAGE)) {
                status = 87;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SPEARMAN)) {
                status = 90;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.GUNSLINGER)) {
                status = 98;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BRAWLER)) {
                status = 93;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.BLAZEWIZARD2)) {
                status = 170;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DAWNWARRIOR2)) {
                status = 173;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.NIGHTWALKER2)) {
                status = 176;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WINDARCHER2)) {
                status = 179;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.THUNDERBREAKER2)) {
                status = 182;
                cm.sendYesNo("恭喜你达到三转水平,现在就转职么");
            } else {
                cm.dispose();
            }
        } else if (status == 64) {
            cm.changeJob(MapleJob.HERMIT);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 67) {
            cm.changeJob(MapleJob.CHIEFBANDIT);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 70) {
            cm.changeJob(MapleJob.RANGER);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 73) {
            cm.changeJob(MapleJob.SNIPER);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 76) {
            cm.changeJob(MapleJob.FP_MAGE);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 79) {
            cm.changeJob(MapleJob.IL_MAGE);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 82) {
            cm.changeJob(MapleJob.PRIEST);
            cm.sendOk("T恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 85) {
            cm.changeJob(MapleJob.CRUSADER);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 88) {
            cm.changeJob(MapleJob.WHITEKNIGHT);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 91) {
            cm.changeJob(MapleJob.DRAGONKNIGHT);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 93) {
            cm.changeJob(MapleJob.MARAUDER);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 96) {
            cm.changeJob(MapleJob.OUTLAW);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 170) {
            cm.changeJob(MapleJob.BLAZEWIZARD3);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 173) {
            cm.changeJob(MapleJob.DAWNWARRIOR3);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 176) {
            cm.changeJob(MapleJob.NIGHTWALKER3);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 179) {
            cm.changeJob(MapleJob.WINDARCHER3);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 182) {
            cm.changeJob(MapleJob.THUNDERBREAKER3);
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 99) {
            cm.sendOk("祝您好运!");
            cm.dispose();
        } else if (status == 102) {
            if (cm.getJob().equals(net.sf.cherry.client.MapleJob.HERMIT)) {
                status = 105;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CHIEFBANDIT)) {
                status = 108;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.RANGER)) {
                status = 111;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.SNIPER)) {
                status = 114;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.FP_MAGE)) {
                status = 117;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.IL_MAGE)) {
                status = 120;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.PRIEST)) {
                status = 123;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么?");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.CRUSADER)) {
                status = 126;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.WHITEKNIGHT)) {
                status = 129;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.DRAGONKNIGHT)) {
                status = 132;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.MARAUDER)) {
                status = 134;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else if (cm.getJob().equals(net.sf.cherry.client.MapleJob.OUTLAW)) {
                status = 136;
                cm.sendYesNo("恭喜你达到四转水平,现在就转职么");
            } else {
                cm.dispose();
            }
        } else if (status == 106) {
            cm.changeJob(MapleJob.NIGHTLORD);
	  
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 109) {
            cm.changeJob(MapleJob.SHADOWER);
	
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 112) {
            cm.changeJob(MapleJob.BOWMASTER);
	   
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 115) {
            cm.changeJob(MapleJob.MARKSMAN);
	    
            cm.sendOk("T恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 118) {
            cm.changeJob(MapleJob.FP_ARCHMAGE);
	   
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 121) {
            cm.changeJob(MapleJob.IL_ARCHMAGE);
	   
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 124) {
            cm.changeJob(MapleJob.BISHOP);
		
            cm.sendOk("Th恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 127) {
            cm.changeJob(MapleJob.HERO);
	    
            cm.sendOk("T恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 130) {
            cm.changeJob(MapleJob.PALADIN);
	   
            cm.sendOk("T恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 133) {
            cm.changeJob(MapleJob.DARKKNIGHT);
	  
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 134) {
            cm.changeJob(MapleJob.BUCCANEER);
	    
            cm.sendOk("恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 135) {
            cm.changeJob(MapleJob.CORSAIR);
	    
            cm.sendOk("T恭喜你转职成功.希望我们能再见面");
            cm.dispose();
        } else if (status == 151) {
            if (1) {
                cm.sendSimple("你想成为哪种魔法师#b\r\n#L0#冒险家魔法师#l\r\n#L1#骑士团炎术士#l#k");
                status = 200;
            } else {
                cm.sendOk("你至少要有#r20点智力#k.");
            }
        } else if (status == 154) {
            cm.sendSimple("你想成为哪种冒险家职业呢? #b\r\n#L0#战士#l\r\n#L1#魔法师#l\r\n#L2#弓箭手#l\r\n#L3#飞侠#l\r\n#L4#海盗#l\r\n\r\n你想成为那种骑士团职业呢?\r\n#L5#魂骑士#l\r\n#L6#夜行者#l\r\n#L7#炎术士#l\r\n#L8#风之灵者#l\r\n#L9#奇袭者#l#k");
        } else if (status == 155) {
            if (selection == 0) {
                jobName = "战士";
                job = net.sf.cherry.client.MapleJob.WARRIOR;
            }
            if (selection == 1) {
                jobName = "魔法师";
                job = net.sf.cherry.client.MapleJob.MAGICIAN;
            }
            if (selection == 2) {
                jobName = "弓箭手";
                job = net.sf.cherry.client.MapleJob.BOWMAN;
            }
            if (selection == 3) {
                jobName = "飞侠";
                job = net.sf.cherry.client.MapleJob.THIEF;
            }
            if (selection == 4) {
                jobName = "海盗";
                job = net.sf.cherry.client.MapleJob.PIRATE;
            }
            if (selection == 5) {
                jobName = "魂骑士";
                job = net.sf.cherry.client.MapleJob.DAWNWARRIOR1;
            }
            if (selection == 6) {
                jobName = "夜行者";
                job = net.sf.cherry.client.MapleJob.NIGHTWALKER1;
            }
            if (selection == 7) {
                jobName = "炎术士";
                job = net.sf.cherry.client.MapleJob.BLAZEWIZARD1;
            }
            if (selection == 8) {
                jobName = "风之灵者";
                job = net.sf.cherry.client.MapleJob.WINDARCHER1;
            }
            if (selection == 9) {
                jobName = "奇袭者";
                job = net.sf.cherry.client.MapleJob.THUNDERBREAKER1;
            }
            cm.sendYesNo("你想成为#r" + jobName + "#k?");
        } else if (status == 156) {
            if (0) {
                cm.sendOk("你至少要#r35点力量#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r20点智力#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r25点敏捷#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r25点敏捷#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r20点敏捷#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r35点力量#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要 #r25点敏捷#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r20点智力#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r25点敏捷#k.");
                cm.dispose();
            } else if (0) {
                cm.sendOk("你至少要#r20点敏捷#k.");
                cm.dispose();
            } else {
                cm.changeJob(job);
                cm.sendOk("恭喜你转职成功.希望我们能再见面.");
                cm.dispose();
            }
        } else if (status == 161) {
            
            cm.sendOk("恭喜你.被耍了!");
            cm.dispose();
        } else if (status == 201) {
            if (selection == 0) {
                cm.changeJob(net.sf.cherry.client.MapleJob.MAGICIAN);
                cm.sendOk("恭喜你转职成功.希望我们能再见面");
                cm.dispose();
            }
            if (selection == 1) {
                cm.changeJob(net.sf.cherry.client.MapleJob.BLAZEWIZARD1);
                cm.sendOk("恭喜你转职成功.希望我们能再见面");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}
