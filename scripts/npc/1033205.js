
var status = -1;
function action(mode, type, selection) {
	if (cm.isQuestFinished(24002) && !cm.isQuestActive(24093)) {
		if (mode == 1) {
			status++;
		} else {
			cm.dispose();
			return;
		}
		if (status == 0) {
			cm.forceStartQuest(24093, "1");
			cm.EnableUI(1);
			cm.sendDirectionStatus(1,2000);
		} else if (status == 1) {
			cm.sendDirectionInfo("Effect/Direction5.img/effect/mercedesQuest/merBalloon/0");
			cm.sendDirectionStatus(1, 2000);
		} else if (status == 2) {
			cm.sendDirectionInfo("Effect/Direction5.img/effect/mercedesQuest/merBalloon/1");
			cm.sendPlayerToNpc("等下... 好像有些奇怪.. .. 我的等级是10级?!");
		} else {
			cm.EnableUI(0);
			cm.DisableUI(false);
			cm.dispose();
		}
	} else {
		cm.dispose();
	}
}