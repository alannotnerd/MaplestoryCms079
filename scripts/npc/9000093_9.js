var status = 0;
var typed=0;
var j = java.lang.Math.floor(Math.random() * 10);

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
			cm.sendSimple("#k>活动目标：#b<合成冒险之心>#k\r\n\r\n>活动奖励：初代、封印、苏醒、觉醒、冒险之心\r\n\r\n#k>合成概率：合成任何一款冒险之心项链成功概率为50%#k\r\n\r\n#b#L1#初代冒险之心#l		  #v1122019#\r\n#L2#封印的初代冒险之心#l	#v1122024#\r\n#L3#苏醒的初代冒险之心#l	#v1122029#\r\n#L4#觉醒的初代冒险之心#l	#v1122034#");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendSimple("#k>活动目标：#b<合成冒险之心>#k\r\n\r\n>活动奖励：初代冒险之心\r\n#b#L1#全职业初代冒险之心#l");
			} else if (selection == 2) {
			typed=3;
			cm.sendSimple("#k>活动目标：#b<合成冒险之心>#k\r\n\r\n>活动奖励：封印的初代冒险之心\r\n#b			#L2#战士封印的初代冒险之心#l\r\n#L3#法师封印的初代冒险之心#l #L4#弓手封印的初代冒险之心\r\n#L5#飞侠封印的初代冒险之心#l #L6#海盗封印的初代冒险之心#l");
			} else if (selection == 3) {
			typed=4;
			cm.sendSimple("#k>活动目标：#b<合成冒险之心>#k\r\n\r\n>活动奖励：苏醒的初代冒险之心\r\n#b			#L2#战士苏醒的初代冒险之心#l\r\n#L3#法师苏醒的初代冒险之心#l #L4#弓手苏醒的初代冒险之心\r\n#L5#飞侠苏醒的初代冒险之心#l #L6#海盗苏醒的初代冒险之心#l");
			} else if (selection == 4) {
			typed=5;
			cm.sendSimple("#k>活动目标：#b<合成冒险之心>#k\r\n\r\n>活动奖励：觉醒的初代冒险之心\r\n#b			#L2#战士觉醒的初代冒险之心#l\r\n#L3#法师觉醒的初代冒险之心#l #L4#弓手觉醒的初代冒险之心\r\n#L5#飞侠觉醒的初代冒险之心#l #L6#海盗觉醒的初代冒险之心#l");
			}
		} else if (status == 2) {
		if(selection == 1){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4001221) >=1 && cm.itemQuantity(4001222) >=1 && cm.itemQuantity(4001223) >=1 && cm.itemQuantity(4001224) >=1 && cm.itemQuantity(4001225) >=1 && cm.itemQuantity(4032177) >=1) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4001221, -1);
                    cm.gainItem(4001222, -1);
                    cm.gainItem(4001223, -1);
                    cm.gainItem(4001224, -1);
                    cm.gainItem(4001225, -1);
                    cm.gainItem(4032177, -1);
					if(j <= 4){
                    cm.gainItem(1122019, 1);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了全职业初代冒险之心，大家恭喜他(她)。");
					} else {
		    		cm.worldMessage(cm.getChar().getName() + "合成全职业初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) \r\n#i4001221#(#c4001221#/1) #i4001222#(#c4001222#/1) #i4001223#(#c4001223#/1) #i4001224#(#c4001224#/1) #i4001225#(#c4001225#/1) ");
                    cm.dispose();
		}
		}
		if (typed == 3) {
		if (selection == 2) {
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001226) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001226, -5);
					if(j <= 4){
                    cm.gainItem(1122024, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了战士职业封印的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成战士职业封印的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001226#(#c4001226#/5)");
                    cm.dispose();
		}
		} else if(selection == 3){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001227) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001227, -5);
					if(j <= 4){
                    cm.gainItem(1122025, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了魔法师职业封印的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成魔法师职业封印的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001227#(#c4001227#/5)");
                    cm.dispose();
		}
		} else if(selection == 4){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001228) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001228, -5);
					if(j <= 4){
                    cm.gainItem(1122026, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了弓手职业封印的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成弓手职业封印的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c403277#/1) #i4001228#(#c4001228#/5)");
                    cm.dispose();
		}
		} else if(selection == 5){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001229) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001229, -5);
					if(j <= 4){
                    cm.gainItem(1122027, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了飞侠职业封印的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成飞侠职业封印的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001229#(#c4001229#/5)");
                    cm.dispose();
		}
		} else if(selection == 6){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001230) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001230, -5);
					if(j <= 4){
                    cm.gainItem(1122028, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了海盗职业封印的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成海盗职业封印的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001230#(#c4001230#/5)");
                    cm.dispose();
		}
		}
		}
		if (typed == 4) {
		if (selection == 2) {
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001226) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001226, -5);
					if(j <= 4){
                    cm.gainItem(1122029, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了战士职业苏醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成战士职业苏醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001226#(#c4001226#/5)");
                    cm.dispose();
		}
		} else if(selection == 3){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001227) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001227, -5);
					if(j <= 4){
                    cm.gainItem(1122030, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了魔法师职业苏醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成魔法师职业苏醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001227#(#c4001227#/5)");
                    cm.dispose();
		}
		} else if(selection == 4){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001228) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001228, -5);
					if(j <= 4){
                    cm.gainItem(1122031, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了弓手职业苏醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成弓手职业苏醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001228#(#c4001228#/5)");
                    cm.dispose();
		}
		} else if(selection == 5){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001229) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001229, -5);
					if(j <= 4){
                    cm.gainItem(1122032, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了飞侠职业苏醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成飞侠职业苏醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001229#(#c4001229#/5)");
                    cm.dispose();
		}
		} else if(selection == 6){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001230) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001230, -5);
					if(j <= 4){
                    cm.gainItem(1122033, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了海盗职业苏醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成海盗职业苏醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001230#(#c4001230#/5)");
                    cm.dispose();
		}
		}
		}
		if (typed == 5) {
		if (selection == 2) {
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001558) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001558, -7);
					if(j <= 4){
                    cm.gainItem(1122034, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了战士职业觉醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成战士职业觉醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001558#(#c4001558#/7)");
                    cm.dispose();
		}
		} else if(selection == 3){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001559) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001559, -7);
					if(j <= 4){
                    cm.gainItem(1122035, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了魔法师职业觉醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成魔法师职业觉醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001559#(#c4001559#/7)");
                    cm.dispose();
		}
		} else if(selection == 4){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001560) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001560, -7);
					if(j <= 4){
                    cm.gainItem(1122036, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了弓手职业觉醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成弓手职业觉醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001560#(#c4001560#/7)");
                    cm.dispose();
		}
		} else if(selection == 5){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001561) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001561, -7);
					if(j <= 4){
                    cm.gainItem(1122037, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了飞侠职业觉醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成飞侠职业觉醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001561#(#c4001561#/7)");
                    cm.dispose();
		}
		} else if(selection == 6){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001562) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001562, -7);
					if(j <= 4){
                    cm.gainItem(1122038, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "成功合成了海盗职业觉醒的初代冒险之心，大家恭喜他(她)。");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "合成海盗职业觉醒的初代冒险之心失败了，大家默哀他(她)。");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001562#(#c4001562#/7)");
                    cm.dispose();
		}
		}
			}
		}
	}
}