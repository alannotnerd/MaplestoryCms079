var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#";  //黄星星
var yun4 ="#fUI/UIWindow/Quest/reward#";////奖励
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var gju ="#fUI/UIWindow/AriantMatch/characterIcon/4#";////紫方
var ojh ="#fUI/UIWindow/AriantMatch/characterIcon/3#";////黄方
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
	var selStr ="          "+yun8+" #r#e★中国人民解放军★#l "+yun9+"\r\n";
	selStr += ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+""+ojh+"\r\n";
	selStr += "五星红旗，你是我的骄傲    五星红旗，我为你自豪#l\r\n";
	selStr += "为你欢呼，我为你祝福   你的名字，比我生命更重要#l\r\n";
	selStr += "       #L0#"+wi14+"#r五星红旗 红旗飘飘 30年经典#l\r\n";
	selStr += "#L1#"+wi14+"初始勋章#l  #L2#"+wi14+"#b升级军衔#l  #L3#"+wi14+"#r军衔福利#l\r\n\r\n";
	selStr += "#v1142310##v1142311##v1142312##v1142314##v1142315##v1142316##v1142317##v1142318##v1142319##v1142320##v1142321#\r\n\r\n#l";
	selStr += "#k少校"+yun4+"\r\n#d祝福：20  中介：5  金币：1000W  星星：50\r\n#l";
	selStr += "#r中校"+yun4+"\r\n#d祝福：30  中介：10  金币：1500W  星星：100  红魔方：20  转蛋卷：30\r\n#l";
	selStr += "#r上校"+yun4+"\r\n#b祝福：40  中介：15  金币：2500W  星星：150  红魔方：40  转蛋卷：60\r\n#l";
	selStr += "#r团长"+yun4+"\r\n#d祝福：50  中介：20  金币：4000W  星星：150  红魔方：60  转蛋卷：60  点卷：3000\r\n#l";
	cm.sendSimple(selStr);
	} else if (status == 1) {
		if (selection == 0) {
			cm.dispose();
			//cm.openWeb("http://v.yinyuetai.com/video/11232 ");
		} else if (selection == 1) {
			if (cm.haveItem(1142310) < 1 ) {
				cm.gainItem(1142310,1);
				cm.sendOk("恭喜你领取十字旅团[初级兵]一个");
				cm.dispose();
			} else {
				cm.sendOk("对不起你已经领取过 无法重复领取");
				cm.dispose();
			}
		} else if (selection == 2) {
			cm.dispose();
			cm.openNpc(9120026,1);
		} else if (selection == 3) {
			cm.dispose();
			cm.openNpc(9120026,2);
		}
	}
}