var status = 0;
var typed=0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("#k>活动目标：#b<快乐收集活动>#k\r\n\r\n>活动奖励：...???...\r\n#b#L1#字母拼音收集#l #L2#日常任务收集#l");
		} else if (status == 1) {
			if (selection == 1) {
                    	typed=1;
			cm.sendYesNo("#e<收集活动：字母拼音收集>#n\r\n你想努力，完成收集任务吗？收集的过程困难重重……如果想挑战的话，请带来#b字母拼音收集物品#k来和我说话。"); 
			}
			if (selection == 2) {
                    	typed=2;
			cm.sendYesNo("#e<收集活动：日常任务收集>#n\r\n你想努力，完成收集任务吗？收集的过程困难重重……如果想挑战的话，请带来#b日常任务收集物品#k来和我说话。");
			}
		} else if (status == 2) {
		if(typed==1){
                if (cm.itemQuantity(3994067) >=1 && cm.itemQuantity(3994059) >=2 && cm.itemQuantity(3994071) >=1 && cm.itemQuantity(3994066) >=1 && cm.itemQuantity(3994074) >=2 && cm.itemQuantity(3994083) >=1) {
                    cm.gainItem(3994067, -1);
                    cm.gainItem(3994059, -2);
                    cm.gainItem(3994071, -1);
                    cm.gainItem(3994066, -1);
                    cm.gainItem(3994074, -2);
                    cm.gainItem(3994083, -1);
                    cm.gainItem(2430639, 1);
		    cm.worldMessage(cm.getChar().getName() + "成功完成了字母拼音收集任务，获得了丰富的奖励。");
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i3994067#  #i3994059##i3994071#\r\n#i3994066##i3994059##i3994074##i3994074##i3994083##b  (我很快乐!!!)");
                    cm.dispose();
                }
		} else if (status == 2) {
		if(typed==2){
		var rod = 11;
                if (cm.itemQuantity(3990000) >=1 && cm.itemQuantity(3990001) >=1 && cm.itemQuantity(3990002) >=1 && cm.itemQuantity(3990003) >=1 && cm.itemQuantity(3990004) >=1 && cm.itemQuantity(3990005) >=1 && cm.itemQuantity(3990006) >=1 && cm.itemQuantity(3990007) >=1 && cm.itemQuantity(3990008) >=1) {
                    cm.gainItem(3990000, -1);
                    cm.gainItem(3990001, -1);
                    cm.gainItem(3990002, -1);
                    cm.gainItem(3990003, -1);
                    cm.gainItem(3990004, -1);
                    cm.gainItem(3990005, -1);
		    cm.gainItem(3990006, -1);
                    cm.gainItem(3990007, -1);
                    cm.gainItem(3990008, -1);
                    cm.gainItem(2430638, 1);
		    cm.worldMessage(cm.getChar().getName() + "成功完成了日常任务收集任务，获得了丰富的奖励。");
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n#i3990000# #t3990000#(#c3990000#/1)	#i3990001# #t3990001#(#c3990001#/1)	\r\n#i3990002# #t3990002#(#c3990002#/1)	#i3990003# #t3990003#(#c3990003#/1)	\r\n#i3990004# #t3990004#(#c3990004#/1)	#i3990005# #t3990005#(#c3990005#/1)	\r\n#i3990006# #t3990006#(#c3990006#/1)	#i3990007# #t3990007#(#c3990007#/1)	\r\n#i3990008# #t3990008#(#c3990008#/1)");
                    cm.dispose();
		}
		}
			}
		}
	}
}