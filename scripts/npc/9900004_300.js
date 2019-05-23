var status = -1;
var winTimes = 0;
var uiFPaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var uiFRock = "#fUI/UIWindow.img/RpsGame/Frock#";
var uiFScissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var uiPaper = "#fUI/UIWindow.img/RpsGame/paper#";
var uiRock = "#fUI/UIWindow.img/RpsGame/rock#";
var uiScissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var uiWin = "#fUI/UIWindow.img/RpsGame/charWin#";
var uiLose = "#fUI/UIWindow.img/RpsGame/charLose#";
var FpictureArr=Array(uiFRock, uiFScissor, uiFPaper);
var pictureArr=Array(uiRock, uiScissor, uiPaper);
var step = -1;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text="嘿嘿，想挑战一下我的猜拳技术吗？";
		text+="\r\n#b#L1#玩法说明(每天100次)#l\r\n";
		if(cm.getBossLog("猜拳")<=100){
		text+="#b#L2#开始游戏#l\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		if (step>0)
			selection = step;
		if (selection == 1) {
			var text = "#d#e游戏说明：#n#k\r\n";
			text+="\t1. 目前猜拳游戏每天可以进行100次。\r\n";
			text+="\t2. 每一轮至多可以进行10次，输了则结束该轮游戏。\r\n";
			text+="\t3. 获得连胜的奖励是倍增的。\r\n";
			text+="\t4. 中途退出游戏将无法获得奖励。\r\n";
			text+="\t5. 如果第一把就输了，也可以获得安慰奖励。";
			status=-1;
			cm.sendSimple(text);
		} else if (selection == 2) {
			var selStr = "每日100次,超过次数将不显示\r\n";
		    selStr += "出招吧！少年！\r\n";
			selStr +="#L0#"+uiFRock+"#l";
			selStr +="#L1#"+uiFScissor+"#l";
			selStr +="#L2#"+uiFPaper+"#l";
        cm.sendSimple(selStr)
		}
	} else if (status == 2) {
		var playerHand = selection;
		var npcHand = Math.floor(Math.random()*3);
		var result =  playerHand - npcHand;
		if (result == -1 || result == 2) {
			//win
			winTimes+=1;
			if (winTimes>=10) {
				cm.sendSimple(uiWin+"\r\n你已经连胜了10局，我无地自容，领取你的奖励去吧！\r\n#b#L999#领取奖励#l");
			} else {
				status = 0;
				step = 2;
				cm.sendSimple(uiWin+"\r\n有点意思，你已经连胜"+winTimes+"把了，战斗到底！\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]);
			}
		} else if (result == 0) {
			//tie
			status = 0;
			step = 2;
			cm.sendSimple("差点就被你赢了，来吧，放马过来！\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]);
		} else {
			//lose
			cm.sendSimple(uiLose+"\r\n呵呵呵，你还是太年轻了。\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]+"\r\n#b#L999#领取奖励，退出游戏#l");
		}
	} else if (status == 3) {
		//领取奖励
		if (winTimes>=3) {
			cm.worldMessage(0x18, "『猜拳能手』 : 玩家 " + cm.getChar().getName() + " 在猜拳游戏中连胜"+winTimes+"把，获得了丰厚的奖励。");
		}
		var meso = 10000*Math.pow(2,winTimes);
		cm.setBossLog("猜拳");
		cm.gainMeso(meso);
		cm.gainItem(4310057, winTimes*2);
		cm.sendOk("获得了"+meso+"游戏币和"+(winTimes*2)+"个#v4310057##t4310057#");
		cm.dispose();
	}
}

function isWin(playerHand) {

}