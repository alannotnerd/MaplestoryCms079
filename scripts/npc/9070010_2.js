 var typed = 0;
var text = "";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var em = cm.getEventManager("Mzhy");
	var eim = em.getInstance("Mzhy");
	if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	
	if (status==0) {
		if (em.getProperty("state")==1) {
			text="这里是什么地方？我怎么会在这里……\r\n\r\n(前面好像有人，过去问问他吧。)";
			cm.sendOkS(text, 3);
			cm.dispose();
		} else {
			text="这里是黑魔法师创造的一个幻境结界，你必须找到正确的机关开启它，才能走出这重重幻境。\r\n#b#L0#我该怎么做？#l";
			cm.sendSimple(text);
		}
	} else if (status == 1) {
		var text="#d#e<副本介绍>#n#k\r\n";
		text+="\t幻境结界共有#r#e20层#n#k，每一层都有黑魔法师的门徒看守，你需要击杀地图上所有的怪物并找到#e#b时空门#n#k开启机关。\r\n";
		text+="\t机关共有#r三个选择#k，开启#b正确的机关#k你可能前进1至2层幻境，开启#r错误的机关#k你将会倒退1至2层幻境或者停留在原地。进入副本后，每一层的机关都是固定的，所以一定要牢记前一次的机关，小心万劫不复。\r\n"
		text+="\t开启不同的机关需要消耗不同颜色的蜗牛壳，你可以通过打怪收集或者找#b#e时空门#n#k直接购买。\r\n";
		text+="\t突破到20层幻境之后，击败黑魔法师就能获得丰厚的奖励。\r\n";
		text+="#d#e#L0#>>>>开启机关<<<<#l#n#k"
		cm.sendSimple(text);
	} else if (status == 2) {
		cm.dispose();
		cm.openNpc(9070010);
	}
}