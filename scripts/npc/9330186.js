/* 
	枫之校园高手答题
*/
var questions = new Array(
"目前[BMS]冒险岛是同步盛大版本，是吗？", //是 true,
"[BMS]服务端是一次性购买永久包更新的吗？", //否 false,
"[BMS]冒险岛是最好玩的冒险岛吗？", //是 true,
"拍卖界面中的“我要变强”可以提升实力吗？", //否 false,
"[BMS]冒险岛中的所有装备均可以通过游戏中获取吗？", //是 true,
"康熙皇帝的庙号是圣祖吗？", //否 false,
"海洋中最多的是浮游生物吗？", //是 true,
"欧洲最大的半岛在美国是吗？", //否 false,
"扎昆是不是只有10只手？", //否 false,
"心跳停止糖是不是1分钟内加40物理攻击力？", //否 false,
"扎昆BOSS是不是有5只手指头？", //是 true,
"人物等级上限是255级么？", //是 true,
"打扎需要D片，打闹钟需要火眼是么？", //否 false,
"每个人每天打扎的次数限制为6次是么？", //否 false,
"[BMS]冒险岛游戏中，潜能卷可以在怪物获得，是吗？", //是 true,
"[BMS]冒险岛游戏中，清晨之露是不是补HP4000？", //否 是补MP false,
"[BMS]冒险岛游戏中，鸡腿是不是蜗牛掉的？", //否 false,
"[BMS]冒险岛游戏中的人物等级上限是255级么？", //是 true,
"[BMS]冒险岛中的人物具有全屏捡物功能，是么？", //否 false,
"[BMS]冒险岛中商城内的点装不能交易，是么？", //是 true,
"[BMS]冒险岛游戏中，不能在拍卖进行快速转职，是吗？", //否 false,
"[BMS]冒险岛游戏中，游戏交流Q群是不是：74046794？", //是 true,
"[BMS]冒险岛目前没有开放每日签到，是真的吗？", //否 false,
"无限火力副本是每天开放的吗？？", //否 false,
"强化卷轴怪物能爆出吗？", //是 true,
"点卷只有赞助才能获得吗？", //否 false,
"160级漩涡装备能吃吗？", //否 false,
"150级装备能吃吗？", //否 false,
"哈士奇是雪橇三傻中的最傻吗？", //否 false,
"[BMS]冒险岛是仿官方长久服吗？", //是 true,
"[BMS]冒险岛时装升星的效果是为点装赋予强大属性吗？");
var answers = new Array(true,true,true,true,true,true,true,false,false,false,true,true,false,true,true,false,false,true,false,true,false,true,false,true,true,false,false,false,true,true,true);
var rOutput = new Array("目前[BMS]冒险岛是同步盛大版本的。", "[BMS]服务端是一次购买永久包更新的.", "[BMS]冒险岛是目前众私服中不断持续更新改进的私服。", "通过我要变强可以进行破攻、时装升星等提升战斗力", "[BMS]冒险岛中所有装备均可以通过任务或副本获得", "康熙皇帝的庙号是圣祖。", "海洋中最多的是浮游生物吗？", "欧洲最大的半岛是北欧", "扎昆只有八只手。", "心跳停止糖一分钟内可以增加60物理攻击力。", "扎昆BOSS只有五个手指头", "[BMS]冒险岛中，人物等级上限是255级。", "挑战扎昆需要使用火焰的眼，挑战闹钟需要D片才可以。", "挑战普通扎昆每天限制为六次。", "[BMS]冒险岛中，潜能卷是可以从怪物中获得的。", "清晨之露只能补充MP4000，并不能补充HP。", "蜗牛是不暴鸡腿的。", "人物等级上限为250级。", "游戏中人物不具有全屏捡物功能。", "商城中的物品是不能交易的。", "[BMS]冒险岛游戏中，可以在万能NPC进行快速转职。", "[BMS]冒险岛的官方交流群是：74046794", "[BMS]冒险岛目前可以在万能NPC处可以进行每日签到。", "无限活力副本是每天开放的。", "[BMS]冒险岛中可以在怪物中获取强化卷轴。", "点券并非只有在赞助中获得，还可以参加活动、市场泡点中获得。", "你傻吧？", "这你都答不对？", "不一定，看你运气好不好咯。", "目前[BMS]冒险岛不断持续更新，维持新鲜血液运作。", "时装升星能为点装提升属性，带来非凡战斗力。");
var asked = new Array();
var currentQuestion;
var junk = new Array;
var junkWeap = new Array;
var goodEqWeap = new Array;
var useable = new Array;
var Rare = new Array;
var Select;
var openEvent = 0;

function start() {
	a = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (a == 3 && mode == 1) {
		a = 2;
		selection = 0;
	} else if (mode == 1 || (mode == 0 && type == 1)) a++;
	else {
		if (type == 12 && mode == 0) cm.sendOk("有别的事情吗？如果你想继续参加的话可以跟我对话。");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getParty() != null || cm.isLeader()) {
		if (a == 0) { //
			cm.sendNext("参加考试答题，#b答对10个问题#k就可以获取奖杯，#b答对可以进入下一题#k，#r打错了的话就得重新来过#k，。继续吗？");
		} else if (a == 1) {
			cm.sendSimple("同学你准备好了吗？那就让我们开始吧！#b\r\n#L0# 开始参加考试答题。");
		} else if (a == 2) {
			if (asked.length == 10) { //回答完成部分
				cm.sendSimple("恭喜你答对了所有问题。看来你的头脑不错，我将颁发奖杯给你。#b\r\n\r\n1、领取到了#v4001137#优秀印章。\r\n2、你可以带领你的同学们通往下一个教室。");
				cm.gainItem(4001137, 1);
				cm.dispose();
			} else {
				currentQuestion = -1;
				while (contains(currentQuestion) || currentQuestion == -1) {
					currentQuestion = Math.floor(Math.random() * questions.length);
				}
				asked.push(currentQuestion);
				cm.sendSimple("第 " + asked.length + " 题\r\n\r\n" + questions[currentQuestion] + "#b\r\n#L0# 是。\r\n#L1# 否。");
			} //全部回答完成，和提问题部分
		} else if (a == 3) {
			var answer = selection == 0 ? true: false;
			//java.lang.System.out.println(answer+" "+answers[currentQuestion]+" "+currentQuestion);
			if (answers[currentQuestion] == answer) {
				cm.sendNext("恭喜你，回答正确。#r\r\n\r\n" + rOutput[currentQuestion]);
			} else {
				cm.sendOk("很遗憾，回答错误。#b\r\n\r\n" + rOutput[currentQuestion] + "\r\n回答错误之后就重新开始再答题了。");
				cm.dispose();
			}
		} //status
	} else {
		cm.sendOk("请队长来答题，他可是你们的代表！");
		cm.dispose();
	}
}

function contains(quest) {
	for (var i = 0; i < asked.length; i++) {
		if (asked[i] == quest) return true;
	}
	return false;
}
