/* 国际转职脚本
 * 故事转载
 * 高级转职脚本（方便使用）
 * 版权：追忆冒险岛
 */

//冒险岛分支职业
var job = [
[[100, "战士"], [200, "魔法师"], [300, "弓箭手"], [400, "飞侠"], [500, "海盗"]],
[[1100, "魂骑士"], [1200, "炎术士"], [1300, "风灵使者"], [1400, "夜行者"], [1500, "奇袭者"]],
[[3200, "唤灵斗师"], [3300, "豹弩游侠"], [3500, "机械师"]],
[[110, "剑客"], [120, "准骑士"], [130, "枪战士"]],
[[210, "法师 (火/毒)"], [220, "法师 (冰/雷)"], [230, "牧师"]],
[[310, "猎人"], [320, "弩弓手"]],
[[410, "刺客"], [420, "侠客"]],
[[510, "拳手"], [520, "火枪手"]]];
/*
//冒险岛分支二选职业
var extrajobs = [
[2300, "双弩精灵"], [3100, "恶魔猎手"]
];
//冒险岛分支三选职业
var specialextrajobs = [
[9400, "Dual Blade"], [9501, "Cannoneer"], [9508, "Jett"]
];
*/
var extra = true;
var status = -1;
var select;
var tempest = true; //V123+
var jobindex;

function start() {
    //gainImperialSet();
    jobindex = null;
    select = null;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 || mode == -1 && status == 0) {
        cm.dispose();
        return;
    } else
        (mode == 1 ? status++ : status--);
    if (status == 0) {
        if ((cm.getPlayer().getLevel() >= 10 &&
            (cm.getPlayer().getJob() % 1000 == 0 || cm.getPlayer().getJob() == 501 || cm.getPlayer().getJob() == 3001 || cm.getPlayer().getJob() >= 2001 && cm.getPlayer().getJob() <= 2003) ||
            cm.getPlayer().getLevel() >= 30 && (cm.getPlayer().getJob() % 1000 > 0 && cm.getPlayer().getJob() % 100 == 0 ||
                cm.getPlayer().getJob() == 508) ||
            cm.getPlayer().getLevel() >= (tempest ? 60 : 70) && cm.getPlayer().getJob() % 10 == 0 && cm.getPlayer().getJob() % 100 != 0 ||
            cm.getPlayer().getLevel() >= (tempest ? 100 : 120) && cm.getPlayer().getJob() % 10 == 1 ||
            cm.getPlayer().getLevel() >= 20 && cm.getPlayer().getJob() == 400 && cm.getPlayer().getSubcategory() == 1 ||
            cm.getPlayer().getLevel() >= 30 && cm.getPlayer().getJob() == 430 || cm.getPlayer().getLevel() >= (tempest ? 45 : 55) && cm.getPlayer().getJob() == 431 || cm.getPlayer().getLevel() >= (tempest ? 60 : 70) && cm.getPlayer().getJob() == 432 || cm.getPlayer().getLevel() >= (tempest ? 100 : 120) && cm.getPlayer().getJob() == 433) &&
        (cm.getPlayer().getJob() % 10 != 2 && cm.getPlayer().getJob() % 10 != 4 || cm.getPlayer().getJob() == 432)) {
            if (isExplorer(cm.getPlayer().getJob())) {
               // if (cm.getPlayer().getRemainingSp() > 0) {
                 //   cm.sendOk("您的技能点还没有分配完,无法进行转职");
                   // cm.dispose();
                   // return;
               // }
            }
            cm.sendYesNo("根据你现在的条件可以进行转职,你确定进行转职吗?");
        } else {
            cm.sendOk("根据你现在的条件还不能进行转职。\r\n追忆冒险岛转职详情：除冒险家,初心者,反抗者以外的职业全部为系统自动转职。");
            cm.dispose();
        }
    } else if (status == 1) {
        if (cm.getPlayer().getSubcategory() == 1 && cm.getPlayer().getJob() == 0) { //飞侠
            cm.getPlayer().changeJob(400);
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getSubcategory() == 1 && cm.getPlayer().getJob() == 400) { //暗影双刀
            cm.getPlayer().changeJob(430);
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getSubcategory() == 10 && cm.getPlayer().getJob() == 0) { //龙的传人
            cm.getPlayer().changeJob(508);
            cm.getPlayer().forceChangeChannel(cm.getPlayer().getClient().getChannel());
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getSubcategory() == 2 && cm.getPlayer().getJob() == 0) { //火炮手
            cm.getPlayer().changeJob(501);
            cm.dispose();
            return;
        }
        switch (cm.getPlayer().getJob()) {
            //职业初始
            case 0: // 新手
                jobSelection(0);
                break;
            case 1000: // 初心者
                jobSelection(1);
                break;
            //分支初始
            case 3000: // 反抗者
                jobSelection(2);
                break;
            case 100: // 战士
                jobSelection(3);
                break;
            case 200: // 魔法师
                jobSelection(4);
                break;
            case 300: // 弓箭手
                jobSelection(5);
                break;
            case 400: // 飞侠
                jobSelection(6);
                break;
            case 500: // 海盗
                jobSelection(7);
                break;
            //英雄职业初始
            case 501: // 海盗(火炮手)
                cm.getPlayer().changeJob(530);
                cm.dispose();
                return;
            case 508: // 龙的传人
                cm.getPlayer().changeJob(570);
                cm.dispose();
                return;
            case 2000: // 战神
                cm.getPlayer().changeJob(2100);
                cm.dispose();
                return;
            case 2001: // 小不点
                cm.getPlayer().changeJob(2200);
                cm.dispose();
                return;
            case 2002: // 双弩精灵
                cm.getPlayer().changeJob(2300);
                cm.dispose();
                return;
            case 2003: // 幻影
                cm.getPlayer().changeJob(2400);
                cm.dispose();
                return;
            case 2004: // 未知
                cm.getPlayer().changeJob(2700);
                cm.dispose();
                return;
            case 3001: // 恶魔猎手（二）
                cm.getPlayer().changeJob(3100);
                cm.dispose();
                return;
            case 5000: // 光之骑士米哈儿
                cm.getPlayer().changeJob(5100);
                cm.dispose();
                return;
            case 6000: // 狂龙战士
                cm.getPlayer().changeJob(6100);
                cm.dispose();
                return;
            case 6001: // 暴利萌天使
                cm.getPlayer().changeJob(6500);
                cm.dispose();
                return;
            // 暗影双刀分支
            case 430: // 见习刀客
            case 431: // 双刀客
            case 432: // 血刀
            case 433: // 暗影双刀
                cm.getPlayer().changeJob(cm.getPlayer().getJob() + 1);
                cm.dispose();
                return;
            //英雄职业1转
            case 900:  // GM lol
            case 1100: // Dawn Warrior
            case 1200: // Blaze Wizard
            case 1300: // Wind Archer
            case 1400: // Night Walker
            case 1500: // Thunder Breaker
            case 2100: // Aran
            case 2300: // Mercedes
            case 2400: // Phantom
            case 2700: // Luminous
            case 3100: // Demon Slayer
            case 3200: // Battle Mage
            case 3300: // Wild Hunter
            case 3500: // Mechanic
            case 5100: // Mihile
            case 6100: // Kaiser
            case 6500: // Angelic Burster
                cm.getPlayer().changeJob(cm.getPlayer().getJob() + 10);
                cm.dispose();
                return;
            //英雄职业2转
            case 110: // Fighter
            case 120: // Page
            case 130: // Spearman
            case 210: // Wizard(F/P)
            case 220: // Wizard(I/L)
            case 230: // Cleric
            case 310: // Hunter
            case 320: // Crossbow man
            case 410: // Assassin
            case 420: // Bandit
            case 510: // Brawler
            case 520: // Gunslinger
            case 530: // Cannoneer
            case 570: // Jett
            case 1110: // Dawn Warrior
            case 1210: // Blaze Wizard
            case 1310: // Wind Archer
            case 1410: // Night Walker
            case 1510: // Thunder Breaker
            case 2110: // Aran
            case 2310: // Mercedes
            case 2410: // Phantom
            case 2710: // Luminous
            case 3110: // Demon Slayer
            case 3210: // Battle Mage
            case 3310: // Wild Hunter
            case 3510: // Mechanic
            case 5110: // Mihile
            case 6110: // Kaiser
            case 6510: // Angelic Burster
            //英雄职业3转
            case 111: // Crusader
            case 121: // White Knight
            case 131: // Dragon Knight
            case 211: // Mage(F/P)
            case 221: // Mage(I/L)
            case 231: // Priest
            case 311: // Ranger
            case 321: // Sniper
            case 411: // Hermit
            case 421: // Chief Bandit
            case 511: // Marauder
            case 521: // Outlaw
            case 531: // Cannon Trooper
            case 571: // Jett
            case 1111: // Dawn Warrior
            case 1211: // Blaze Wizard
            case 1311: // Wind Archer
            case 1411: // Night Walker
            case 1511: // Thunder Breaker
            case 2111: // Aran
            case 2311: // Mercedes
            case 2411: // Phantom
            case 2711: // Luminous
            case 3111: // Demon Slayer
            case 3211: // Battle Mage
            case 3311: // Wild Hunter
            case 3511: // Mechanic
            case 5111: // Mihile
            case 6111: // Kaiser
            case 6511: // Angelic Burster
                cm.getPlayer().changeJob(cm.getPlayer().getJob() + 1);
                cm.dispose();
                return;
            default:
                cm.sendOk("好的,我已经帮你转职成 " + cm.getPlayer().getJob() + "了,祝您游戏愉快。");
                cm.dispose();
                return;
        }
    } else if (status == 2) {
        select = selection;
        cm.sendYesNo("你确定选择该职业,进行转职吗？\r\n一旦选择就无法更改了,请慎重选择。");
    } else if (status == 3) {
        if (select != 3100) {
            cm.getPlayer().changeJob(getRealJob(select));
            if (!specialSecondaryWeaponJob(getRealJob(select)))
                cm.dispose();
            return;
        } else 
            cm.sendSimple("As a Demon Slayer, you will have to choose a #bDemon Marking#k.\r\n#L1012276##i1012276##l\r\n#L1012277##i1012277##l\r\n#L1012278##i1012278##l\r\n#L1012279##i1012279##l\r\n#L1012280##i1012280##l");
        if (getSubcategory(select) != 0) {
            cm.getPlayer().changeJob(getRealJob(select));
            cm.getPlayer().setSubcategory(getSubcategory(select));
            cm.getPlayer().dropMessage(0, "You will change channel now so the special job change will effect you. No worries, you will land on the same channel you were in before.");
            cm.dispose();
            return;
        }
    } else if (status == 4) {
        cm.getPlayer().setDemonMarking(selection);
        cm.getPlayer().setSkinColor(4);
        cm.getPlayer().changeJob(getRealJob(select));
        if (select == 3100) {
            cm.sendOk("As a Demon Slayer, your Mana Points(MP) will turn into Demon Force (DF) as soon as you log off.");
        }
        cm.dispose();
        return;
    }
}

function jobSelection(index) {
    jobindex = index;
    var choose = "#b请选择您要转入的职业:"
    for (var i = 0; i < job[index].length; i++)
        choose += "\r\n#L" + job[index][i][0] + "#" + job[index][i][1] + "#l";
    /*
	if (extra == true && index <= 2) { //冒险家2选职业
        choose += "\r\n\r\n#e#bExtra Jobs#k#n: #e#r(New)#k#n";
        for (var e = 0; e < extrajobs.length; e++)
            choose += "\r\n#L" + extrajobs[e][0] + "#" + extrajobs[e][1] + "#l";
        for (var s = 0; s < specialextrajobs.length; s++)
            choose += "\r\n#L" + specialextrajobs[s][0] + "#" + specialextrajobs[s][1] + "#l";
    }
    */
	cm.sendSimple(choose);
}

function getSubcategory(special) {
    switch (special) {
        case 9400:
        case 430:
        case 431:
        case 432:
        case 433:
        case 434:
            return 1;
        case 9501:
            return 2;
        case 9508:
            return 10;
    }
    return 0;
}

function getRealJob(fakejob) {
    switch (fakejob) {
        case 9400:
            return 400;
        case 9501:
            return 501;
        case 9508:
            return 508;
    }
    return fakejob;
}

function specialSecondaryWeaponJob(job) {
    switch (job) {
        case 508:
        case 570:
        case 571:
        case 572:
        case 3001:
        case 3100:
        case 3110:
        case 3111:
        case 3112:
        case 5100:
        case 5110:
        case 5111:
        case 5112:
            return true;
    }
    return false;
}

function isExplorer(job) {
    return job / 1000 == 0;
}