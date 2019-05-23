var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var a = "#fEffect/CharacterEff/1114000/1/0#"; //红色六芒星
var b = "#fEffect/CharacterEff/1003271/0/0#";
var c = "#fEffect/CharacterEff/1112905/0/0#"; //篮心
var d = "#fEffect/CharacterEff/1002667/0/0#"; //黄星
var e = "#fEffect/CharacterEff/1003252/1/0#"; //音乐
var g = "#fEffect/CharacterEff/1082565/0/0#"; //饼干兔子
var h = "#fUI/Basic/BtHide3/mouseOver/0#";
var f = "#fEffect/CharacterEff/1112904/2/1#"; //彩色五角星

var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE); //获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE); //获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //获得星期
var time = new Date();
var sjr = time.getDay();
var pdtp = 0;
var Content = "我是猪我错了";
var ContentS = 0;
switch (sjr) {
case 0:
	var xq = "星期日";
	break;
case 1:
	var xq = "星期一";
	break;
case 2:
	var xq = "星期二";
	break;
case 3:
	var xq = "星期三";
	break;
case 4:
	var xq = "星期四";
	break;
case 5:
	var xq = "星期五";
	break;
case 6:
	var xq = "星期六";
	break;
default:
}
if (hour > 12) {
	hour -= 12;
	var apm = "下午好";
} else {
	var apm = "上午好";
}
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0 && mode == 0) {
		//cm.sendOk("#e#r　本商铺欢迎您的再次光临!我们竭诚为你服务!!");
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (cm.getMapId() == 180000001) {
		cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
		cm.dispose();
	} else if (status == 0) {
		var txt = "\r\n#d┏━━━━━━━━━━━游戏中心━━━━━━━━━━┓#k\r\n\r\n";
		txt += "#L0#" + c + "　#d※ #b攀爬城墙#d ※　" + c + "#l　　#k";
		txt += "#L1#" + c + "　#d※ #b躲避陷阱#d ※　" + c + "#l#k\r\n";
		txt += "#L2#" + c + "　#d※ #b射手跳跳#d ※　" + c + "#l　　#k";
		txt += "#L3#" + c + "　#d※ #b玩具跳跳#d ※　" + c + "#l#k\r\n";
		txt += "#L4#" + c + "　#d※ #b争夺椅子#d ※　" + c + "#l　　#k";
		txt += "#L5#" + c + "　#d※ #b数字竞猜#d ※　" + c + "#l#k\r\n";
		txt += "#L6#" + c + "　#d※ #r狂扁管理#d ※　" + c + "#l　　#k";
		txt += "#L7#" + c + "　#d※ #r玩家猜拳#d ※　" + c + "#l#k\r\n";
		txt += "#d\r\n\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
		txt += "\t\t　#r如有新颖小游戏　※　可提供给管理员\r\n";
		cm.sendSimple(txt);

	} else if (status == 1) {
		switch (selection) {
		case 0: //城墙
			pdtp = 1;
			var txt = "\r\n#d┏━━━━━━━━━━━攀爬城墙━━━━━━━━━━┓#k\r\n\r\n";
			txt += " " + c + "　#d※　　　　　　　　　游戏介绍　　　 　　　　　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　操作性能游戏　攀爬到顶端即可领　#r丰厚奖品#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　每天限制攀爬城墙一回今天不攀爬明日就吃亏#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　今日已攀爬城墙 [ #r0#d ] 　今日可参与 [ #r1#d ] #d ※ " + c + "#k\r\n\r\n";
			txt += "\t\t#v4001785# #v5062002# #v4033356# #v4000082# #v4310036# #v4310030# #v2340000#\r\n";
			txt += "#d\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
			cm.sendYesNo(txt);
			break;
		case 1: //陷阱
			pdtp = 2;
			var txt = "\r\n#d┏━━━━━━━━━━━躲避陷阱━━━━━━━━━━┓#k\r\n\r\n";
			txt += " " + c + "　#d※　　　　　　　　　游戏介绍　　　 　　　　　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　操作性能游戏　躲避且到顶端即可领#r丰厚奖品#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　每天限制躲避陷阱一回今天不躲避明日就吃亏#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　今日已躲避陷阱 [ #r0#d ] 　今日可参与 [ #r1#d ] #d ※ " + c + "#k\r\n\r\n";
			txt += "\t\t#v4001785# #v5062002# #v4033356# #v4000082# #v4310036# #v4310030# #v2049129#\r\n";
			txt += "#d\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
			cm.sendYesNo(txt);
			break;
		case 2: //射手
			pdtp = 3;
			var txt = "\r\n#d┏━━━━━━━━━━━射手跳跳━━━━━━━━━━┓#k\r\n\r\n";
			txt += " " + c + "　#d※　　　　　　　　　游戏介绍　　　 　　　　　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　操作性能游戏　跳到顶端即可领　#r丰厚奖品#d 　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　每天限制射手跳跳三回今天不跳跳明日就吃亏#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　今日已射手跳跳 [ #r0#d ] 　今日可参与 [ #r3#d ] #d ※ " + c + "#k\r\n\r\n";
			txt += "\t\t#v2431738#　#v2431740#　#v4000082#　#v4310036#　#v4310030#　#v5062002#\r\n";
			txt += "#d\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
			cm.sendYesNo(txt);
			break;
		case 3: //玩具
			pdtp = 4;
			var txt = "\r\n#d┏━━━━━━━━━━━玩具跳跳━━━━━━━━━━┓#k\r\n\r\n";
			txt += " " + c + "　#d※　　　　　　　　　游戏介绍　　　 　　　　　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　操作性能游戏　跳到顶端即可领　#r丰厚奖品#d 　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　每天限制玩具跳跳三回今天不跳跳明日就吃亏#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　今日已玩具跳跳 [ #r0#d ] 　今日可参与 [ #r3#d ] #d ※ " + c + "#k\r\n\r\n";
			txt += "\t\t#v2431738#　#v2431740#　#v4000082#　#v4310036#　#v4310030#　#v5062002#\r\n";
			txt += "#d\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
			cm.sendYesNo(txt);
			break;
		case 4: //椅子
			pdtp = 5;
			var txt = "\r\n#d┏━━━━━━━━━━━争夺椅子━━━━━━━━━━┓#k\r\n\r\n";
			txt += " " + c + "　#d※　　　　　　　　　游戏介绍　　　 　　　　　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　益智类型游戏　选中椅子位置　　#r限量椅子#d 　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　每天限制争夺椅子一回　若没抽中奖五百点卷#d ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　今日已争夺椅子 [ #r0#d ] 　今日可参与 [ #r1#d ] #d ※ " + c + "#k\r\n\r\n";
			txt += "\t#v3015002#　#v3016000#　#v3010944#　#v3015051#　#v3015003#　#v3010116#\r\n";
			txt += "#d\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
			cm.sendYesNo(txt);
			break;
		case 5: //竞猜
			pdtp = 6;
			var txt = "\r\n#d┏━━━━━━━━━━━数字竞猜━━━━━━━━━━┓#k\r\n\r\n";
			txt += " " + c + "　#d※　　　　　　　　　游戏介绍　　　 　　　　　※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　益智类型游戏　随机10个数字且打乱且隐藏　 ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　每天限制一回　猜到被问的[Ｘ]数字给予奖品 ※ " + c + "#k\r\n";
			txt += " " + c + "　#d※　今日已数字竞猜 [ #r0#d ] 　今日可参与 [ #r1#d ] #d ※ " + c + "#k\r\n\r\n";
			txt += "#d\r\n┗━━━━━━━━━━━━━━━━━━━━━━━━━┛#k\r\n\r\n";
			cm.sendYesNo(txt);
			break;
		case 6: //狂扁管理员
			pdtp = 7;
			cm.sendGetText("\r\n\r\n\t\t　　#r狂扁管理员?你想被关小黑屋吗\r\n\r\n　　赶紧输入 [ 我是猪我错了 ] 否则嗯哼哼！\r\n\r\n　如果你胆敢强行关闭信息窗口那么就罚 1000 点卷！\r\n ", 1540496);
			break;
		case 7: //玩家猜拳
			cm.dispose();
			cm.openNpc(9900004, 1011);
			break;
		}
	} else if (status == 2) {
		if (pdtp == 1) {
			cm.warp(301050200, 0);
			cm.dispose();
		} else if (pdtp == 2) {
			cm.warp(301050300, 0);
			cm.dispose();
		} else if (pdtp == 3) {
			cm.warp(100000202, 0);
			cm.dispose();
		} else if (pdtp == 4) {
			cm.warp(220000006, 0);
			cm.dispose();
		} else if (pdtp == 5) {
			cm.dispose();
			cm.openNpc(9900003, 103);
		} else if (pdtp == 6) {
			cm.dispose();
			cm.openNpc(9900003, 104);
		}
		if (pdtp == 7) {
			ContentS = cm.getText();
			if (ContentS != Content) {
				cm.sendOk("\r\n\r\n\t#r哎呀！居然不乖乖承认错误！罚你 100 抵用卷", 1540496);
				cm.gainNX(2, -100);
				cm.worldMessageYellow("※ 狂扁管理 ※ : 玩家[ " + cm.getPlayer().getName() + " ] 企图狂扁管理 已成神 各位快来狂扁吧 ●ω●");
				cm.worldMessageYellow("※ 狂扁管理 ※ : 玩家[ " + cm.getPlayer().getName() + " ] 企图狂扁管理 已成神 各位快来狂扁吧 ●ω●");
				cm.worldMessageYellow("※ 狂扁管理 ※ : 玩家[ " + cm.getPlayer().getName() + " ] 企图狂扁管理 已成神 各位快来狂扁吧 ●ω●");
				cm.dispose();
			} else {
				cm.sendOk("\r\n\r\n\t#r哎呀！嗯哼！看你这么乖的份上 下不为例记住了！", 1540496);
				cm.dispose();
			}
		}
	}
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "　";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this,
	negative = number < 0 ? "-" : "",
	i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
