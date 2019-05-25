/**
 *	暗影双刀达到30级！
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("暗影双刀达到了30级！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i3800008# 猫头鹰图标 1个。\r\n\r\n#i2040121# #t2040121# 1个。");
    } else if (status == 1) {
        if (qm.isQuestFinished(10611)) {
            qm.dispose();
        } else {
            qm.sendOk("领取成功了。");
            qm.gainItem(2040121, 1); //暗影双刀秘密卷轴
            qm.gainItem(3800008, 1); //猫头鹰图标
            qm.completeQuest();
            qm.dispose();
        }
    }
}