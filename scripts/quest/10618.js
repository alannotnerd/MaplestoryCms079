/**
 *	暗影双刀达到100级！
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
        qm.sendNext("暗影双刀达到了100级！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i3800008# 猫头鹰图标 1个。\r\n\r\n#i1012191# #t1012191# 1个。");
    } else if (status == 1) {
        if (qm.isQuestFinished(10618)) {
            qm.dispose();
        } else {
            qm.sendOk("领取成功了。");
            qm.gainItem(1012191, 1); //暗影双刀面巾
            qm.gainItem(3800008, 1); //猫头鹰图标
            qm.completeQuest();
            qm.dispose();
        }
    }
}