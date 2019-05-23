/* 传授海盗祝福链接技能 */

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
        qm.sendYesNo("可以将连锁技能#b#e海盗祝福#n#k传授给账号内的其他角色。现在要指定被传授的角色吗？");
    } else if (status == 1) {
        if (qm.hasSkill(110)) { //0000110 - 海盗祝福 - [种族特性技能]强化火炮手特有的坚韧，永久提高各种属性。
            qm.sendLinkSkillWindow(110);
            qm.completeQuest();
        }
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.completeQuest();
    qm.dispose();
}