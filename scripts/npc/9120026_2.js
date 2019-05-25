var qw ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var as ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var qwe ="#fUI/UIWindow/AriantMatch/characterIcon/0#";////红方
var asd ="#fUI/UIWindow/AriantMatch/characterIcon/1#";////蓝方
var zxc ="#fUI/UIWindow/AriantMatch/characterIcon/2#";////绿方
var rty ="#fUI/UIWindow/AriantMatch/characterIcon/3#";////黄方
var fgh ="#fUI/UIWindow/AriantMatch/characterIcon/4#";////紫方
var vbn ="#fUI/UIWindow/AriantMatch/characterIcon/5#";////橙方
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var status = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, selection) {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
	cm.sendSimple("          "+qw+" #r#e★中国人民解放军★#l "+as+"\r\n"+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+""+rty+"\r\n         #r请把徽章取下来放在背包里领取#l\r\n        #L1#"+fgh+" #g#e领取每日[少校]军饷 "+fgh+"#l\r\n        #L2#"+rty+" #r领取每日[中校]军饷 "+rty+"#l\r\n        #L3#"+vbn+" #b领取每日[上校]军饷 "+vbn+"#l\r\n        #L4#"+qwe+" #d领取每日[#r团#b长#d]军饷 "+qwe+"#l\r\n\r\n #v1142310##v1142311##v1142312##v1142314##v1142315##v1142316##v1142317##v1142318##v1142319##v1142320##v1142321#\r\n");
	} else if (status == 1) {
		if (selection == 1) {
			if (cm.haveItem(1142318) >= 1 && cm.getBossLog("领取每日") == 0) {
				cm.setBossLog("领取每日");
				cm.gainItem(2340000,20);
				cm.gainItem(4000463,5);
				cm.gainMeso(10000000);
				cm.gainItem(4001839,50);
				cm.sendOk("恭喜你领取了少校军饷");
				//cm.channelMessage(0x18, "『每日军衔奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了少校军饷奖励。");
				cm.dispose();
			} else {
				cm.sendOk("对不起 你没有少校军衔或 已经领取今日的军饷 请明日在领取");
				cm.dispose();
			}
		} else if (selection == 2) {
			if (cm.haveItem(1142319) >= 1 && cm.getBossLog("领取每日1") == 0) {
				cm.setBossLog("领取每日1");
				cm.gainItem(2340000,30);
				cm.gainItem(4000463,10);
				cm.gainMeso(15000000);
				cm.gainItem(4001839,100);
				cm.gainItem(5062009,20);
				cm.gainItem(5220040,30);
				cm.sendOk("恭喜你领取了中校军饷");
				//cm.channelMessage(0x18, "『每日军衔奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了中校军饷奖励。");
				cm.dispose();
			} else {
				cm.sendOk("对不起 你没有中校军衔或 已经领取今日的军饷 请明日在领取");
				cm.dispose();
			}
		} else if (selection == 3) {
			if (cm.haveItem(1142320) >= 1 && cm.getBossLog("领取每日2") == 0) {
				cm.setBossLog("领取每日2");
				cm.gainItem(2340000,40);
				cm.gainItem(4000463,15);
				cm.gainMeso(25000000);
				cm.gainItem(4001839,150);
				cm.gainItem(5062009,40);
				cm.gainItem(5220040,60);
				cm.sendOk("恭喜你领取了上校军饷");
				//cm.channelMessage(0x18, "『每日军衔奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了上校军饷奖励。");
				cm.dispose();
			} else {
				cm.sendOk("对不起 你没有上校军衔或 已经领取今日的军饷 请明日在领取");
				cm.dispose();
			}
		} else if (selection == 4) {
			if (cm.haveItem(1142321) >= 1 && cm.getBossLog("领取每日3") == 0) {
				cm.setBossLog("领取每日3");
				cm.gainItem(2340000,50);
				cm.gainItem(4000463,20);
				cm.gainMeso(40000000);
				cm.gainItem(4001839,200);
				cm.gainItem(5062009,60);
				cm.gainItem(5220040,60);
				cm.gainNX(1,3000);
				cm.sendOk("恭喜你领取了团长军饷");
				//cm.channelMessage(0x18, "『每日军衔奖励』" + " : " + "玩家 " + cm.getChar().getName() + " 领取了团长军饷奖励。");
				cm.dispose();
			} else {
				cm.sendOk("对不起 你没有团长军衔或 已经领取今日的军饷 请明日在领取");
				cm.dispose();
			}
		}
	}
}