/* 传授精灵的祝福链接技能 */

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
        qm.sendYesNo("可以将连锁技能#b#e精灵的祝福#n#k传授给账号内的其他角色。现在要指定被传授的角色吗？");
    } else if (status == 1) {
        if (qm.hasSkill(20021110)) { //20021110 - 精灵的祝福 - [种族特性技能]借助古代精灵的祝福，可以回到埃欧雷，永久性地提高经验值获得量。
            qm.sendLinkSkillWindow(20021110);
            qm.completeQuest();
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}