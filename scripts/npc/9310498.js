var status = 0;
var icon1 = "#fEffect/CharacterEff/1082565/4/0#";
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var npcid = 9330065;

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
		var text = "#g#e                  天涯花园\r\n";
		text+= "#n#b#L0#"+ icon2 +"了解什么是花园？#l\r\n";
		text+= "#b#L2#"+ icon2 +" 领取今日免费活力#l\r\n";
		text+= "#e#r#L1#"+ icon1 +" 进入我的花园#l\r\n\r\n\r\n\r\n";
		text+= "#n#k(爱花，爱草，更爱自己的秘密花园!记得浇花施肥哦)\r\n";
		text+= "#k每个人都有一个属于自己的秘密花园，外人不可轻易触碰哟!\r\n";
		text+= "#k                                         ——天涯传媒\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		switch(selection) {
			case 0:
				var text="\t每个角色初生花园技术等级为1级。可以拥有1个花盆，提升等级之后可以扩建花园增加花盆，花园技术等级决定你能种植的花种。每当收获时可以获得种植经验和花的产物。任何的花只要超过一天没有采摘就会枯萎。\r\n";
				text+="\t每天可以为种植的花进行一次浇水、施肥，浇水消耗10点活力，可以减少1小时的作物成长时间，施肥消耗20点活力，可以减少2小时的作物成长时间。";
				status-=2;
				cm.sendNext(text);
			break;
			case 1:
				cm.dispose();
				cm.openNpc(npcid, 100);
			break;
			case 2:
				if (cm.getBossLog("花园活力")==0) {
					cm.setBossLog("花园活力");
					//cm.gainPlayerEnergy(-cm.getPlayerEnergy());
					cm.gainPlayerEnergy(50);
					cm.sendOk("成功领取了50点活力值，更多活力值请通过完成组队任务#b<抢占海盗船>、<拯救罗和朱>、<扫荡秦皇陵>、#k获取。每天一次");
					cm.dispose();
				} else {
					cm.sendOk("您今天已经领取过了活力值！");
					cm.dispose();
				}
				
		}
	}
}
