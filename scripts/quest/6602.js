/* 传授恶魔之怒链接技能 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.sendNext("点击画面左侧的相关图标，可以随时指定被传授的角色。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendYesNo("可以将连锁技能#b#e恶魔之怒#n#k传授给账号内的其他角色。现在要指定被传授的角色吗？");
    } else if (status == 1) {
        if (qm.hasSkill(30010112)) { //30010112 - 恶魔之怒 - 对象是BOSS怪时，唤醒内在的愤怒，造成更强的伤害，吸收更多的精气。
            qm.sendLinkSkillWindow(30010112);
            qm.completeQuest();
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}