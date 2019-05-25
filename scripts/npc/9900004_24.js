var za = "#fEffect/ItemEff/1112811/0/0#"
var jj = "#fEffect/CharacterEff/1112904/2/0#"; //彩色星星
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
	var selStr = za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+"\r\n\r\n";
	selStr += "#d尊敬的玩家#n#r #h # #d在这里可以用余额充值点卷\r\n\r\n- 当前玩家持有余额：#r"+cm.getHyPay(1)+" #d元\r\n\r\n\r\n";
	selStr += "           #L0#"+jj+" #r游戏余额充值点卷 "+jj+"\r\n\r\n";
	selStr += za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+""+za+"\r\n";
	cm.sendSimple(selStr);
	} else if (status == 1) {
	    switch (selection) {
		case 0:
			cm.dispose();
			cm.openNpc(9330254);
			break;
		}
	}
}