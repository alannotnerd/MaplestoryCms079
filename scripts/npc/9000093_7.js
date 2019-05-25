var status = 0; 
var abb = 0;
var add = 0;

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
            cm.sendSimple("使用在运动会第一期活动中赢得的运动会币来兑换道具！强大、实用又漂亮！\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#d#L0#运动会币兑换道具#l\r\n#L1#提升明日礼物箱子(低--高)#l\r\n#L2#大运动会币兑换可交易物品#l"); 
        } else if (status == 1) { 
        if (selection == 0) {
            cm.sendSimple("使用在运动会第一期活动中赢得的运动会币来兑换道具！强大、实用又漂亮！\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#b#L0##v2430638##t2430638##l\r\n#L1##v2430639##t2430639##l #L2##v2430640##t2430640##l"); 
	} else if (selection == 1) {
            cm.sendSimple("使用在运动会第一期活动中赢得的运动会币来兑换道具！强大、实用又漂亮！\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#b#L4##t2430638# #r提升#b #t2430639##l\r\n#L5##t2430639# #r提升#b #t2430640##l");
	} else if (selection == 2) {
            cm.sendSimple("使用在运动会第一期活动中赢得的运动会币来兑换道具！强大、实用又漂亮！\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#b#L7##t4310030# #r兑换#b #t4001447##l#L8##t4001447# #r兑换#b #t4310030##l");
		}
        } else if (status == 2) { 
        if (selection == 0) {
	    abb = 1;
	    cm.sendGetText("你要兑换多少#t2430638#\r\n#b#t4310030#数量:#r"+cm.itemQuantity(4310030)+"\r\n兑换比例:50 : 1");
        } else if (selection == 1) {
	    abb = 2;
	    cm.sendGetText("你要兑换多少#t2430639#\r\n#b#t4310030#数量:#r"+cm.itemQuantity(4310030)+"\r\n兑换比例:300 : 1");
        } else if (selection == 2) {
	    abb = 3;
	    cm.sendGetText("你要兑换多少#t2430640#\r\n#b#t4310030#数量:#r"+cm.itemQuantity(4310030)+"\r\n兑换比例:10000 : 1");
        } else if (selection == 3) {
	    abb = 4;
	    cm.sendGetText("你要兑换多少#t2430656#\r\n#b#t4310030#数量:#r"+cm.itemQuantity(4310030)+"\r\n兑换比例:50000 : 1");
        } else if (selection == 4) {
	    add = 1;
	    cm.sendGetText("你要提升多少#t2430639#\r\n#b#t2430638#数量:#r"+cm.itemQuantity(2430638)+"\r\n提升比例:6 : 1");
        } else if (selection == 5) {
	    add = 2;
	    cm.sendGetText("你要提升多少#t2430640#\r\n#b#t2430639#数量:#r"+cm.itemQuantity(2430639)+"\r\n提升比例:30 : 1");
        } else if (selection == 6) {
	    add = 3;
	    cm.sendGetText("你要提升多少#t2430656#\r\n#b#t2430640#数量:#r"+cm.itemQuantity(2430640)+"\r\n提升比例:10 : 1");
        } else if (selection == 7) {
	    abb = 5;
	    cm.sendGetText("你要兑换多少#t4001447#\r\n#b#t4310030#数量:#r"+cm.itemQuantity(4310030)+"\r\n兑换比例:3 : 1");
        } else if (selection == 8) {
	    abb = 6;
	    cm.sendGetText("你要兑换多少#t4310030#\r\n#b#t4001447#数量:#r"+cm.itemQuantity(4001447)+"\r\n兑换比例:1 : 1");
	    }
        } else if (status == 3) { 
	if(abb == 1){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 50 + "#k个 兑换 #r" + cm.getText() + "#k个#t2430638#确定?"); 
	    }
	}
	if(abb == 2){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 300 + "#k个 兑换 #r" + cm.getText() + "#k个#t2430639#确定?"); 
	    }
	}
	if(abb == 3){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 10000 + "#k个 兑换 #r" + cm.getText() + "#k个#t2430640#确定?"); 
	    }
	}
	if(abb == 4){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 50000 + "#k个 兑换 #r" + cm.getText() + "#k个#t2430656#确定?"); 
	    }
	}
	if(add == 1){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t2430638##r" + cm.getText() * 6 + "#k个 提升 #r" + cm.getText() + "#k个#t2430639#确定?"); 
	    }
	}
	if(add == 2){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t2430639##r" + cm.getText() * 30 + "#k个 提升 #r" + cm.getText() + "#k个#t2430640#确定?"); 
	    }
	}
	if(add == 3){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t2430640##r" + cm.getText() * 10 + "#k个 提升 #r" + cm.getText() + "#k个#t2430656#确定?"); 
	    }
	}
	if(abb == 5){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4310030##r" + cm.getText() * 3 + "#k个 兑换 #r" + cm.getText() + "#k个#t4001447#确定?"); 
	    }
	}
	if(abb == 6){
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。")
	    cm.dispose();
	} else {
	    cm.sendYesNo("#t4001447##r" + cm.getText() + "#k个 兑换 #r" + cm.getText() + "#k个#t4310030#确定?"); 
	    }
	}
        } else if (status == 4) { 
	if(abb == 1){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 50)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 50));
           cm.gainItem(2430638, cm.getText());
           cm.sendOk("兑换成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4310030#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(abb == 2){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 300)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 300));
           cm.gainItem(2430639, cm.getText());
           cm.sendOk("兑换成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4310030#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(abb == 3){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 10000)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 10000));
           cm.gainItem(2430640, cm.getText());
           cm.sendOk("兑换成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4310030#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(abb == 4){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 50000)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 50000));
           cm.gainItem(2430656, cm.getText());
           cm.sendOk("兑换成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4310030#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(add == 1){
	if ((cm.itemQuantity(2430638) >= (cm.getText() * 6)) && cm.getSpace(2) > 2) { 
           cm.gainItem(2430638, -(cm.getText() * 6));
           cm.gainItem(2430639, cm.getText());
           cm.sendOk("提升成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t2430638#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(add == 2){
	if ((cm.itemQuantity(2430639) >= (cm.getText() * 30)) && cm.getSpace(2) > 2) { 
           cm.gainItem(2430639, -(cm.getText() * 30));
           cm.gainItem(2430640, cm.getText());
           cm.sendOk("提升成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t2430639#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(add == 3){
	if ((cm.itemQuantity(2430640) >= (cm.getText() * 10)) && cm.getSpace(2) > 2) { 
           cm.gainItem(2430640, -(cm.getText() * 10));
           cm.gainItem(2430656, cm.getText());
           cm.sendOk("提升成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t2430640#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(abb == 5){
	if ((cm.itemQuantity(4310030) >= (cm.getText() * 3)) && cm.getSpace(2) > 2) { 
           cm.gainItem(4310030, -(cm.getText() * 3));
           cm.gainItem(4001447, cm.getText());
           cm.sendOk("兑换成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4310030#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
	if(abb == 6){
	if ((cm.itemQuantity(4001447) >= cm.getText()) && cm.getSpace(2) > 2) { 
           cm.gainItem(4001447, -cm.getText());
           cm.gainItem(4310030, cm.getText());
           cm.sendOk("兑换成功.请查看背包");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4001447#\r\n或您的消耗栏空间不足2个");
           cm.dispose();
            }
	 }
      } 
   }
}