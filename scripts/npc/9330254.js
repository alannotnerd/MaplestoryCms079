var ah = "#fEffect/CharacterEff/1082565/2/0#"; //兔子蓝
var status = 0;
var typed = 0;
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
	var selStr = "#r#e★★★★★★★★★『充值中心』★★★★★★★★★\r\n\r\n";
	selStr += ah+"#k您当前的余额为：#r"+cm.getHyPay(1)+"\t"+ah+"#k累计充值：#r"+cm.getRMB()+"\r\n\r\n";
	selStr += "#L1##b购买【#r1余额=3000点卷#b】#d需要1余额#l\r\n";
	selStr += "#L2##b购买【#r10余额=33000点卷#b】#d需要10余额#l\r\n";
	selStr += "#L3##b购买【#r50余额=170000点卷#b】#d需要50余额#l\r\n";
	selStr += "#L4##b购买【100余额=350000点卷#b】#d需要100余额#l\r\n";
	selStr += "#L5##b购买【300余额=1100000点卷#b】#d需要300余额#l\r\n";
	cm.sendSimple(selStr);
	} else if (status == 1) {
		if (selection == 1) {
			typed = 1;
			cm.sendYesNo("#r#e您确定要购买3000点卷吗.");
		} else if (selection == 2) {
			typed = 2;
			cm.sendYesNo("#r#e您确定要购买33000点卷吗.");
		} else if (selection == 3) {
			typed = 3;
			cm.sendYesNo("#r#e您确定要购买170000点卷吗.");
		} else if (selection == 4) {
			typed = 4;
			cm.sendYesNo("#r#e您确定要购买350000点卷吗.");
		} else if (selection == 5) {
			typed = 5;
			cm.sendYesNo("#r#e您确定要购买1100000点卷吗.");
		}
	} else if(status == 2) {
		if (typed == 1) {
			if (cm.getHyPay(1) >=1) {
				cm.addHyPay(1,true);
				cm.gainNX(1,3000);
				cm.sendOk("#d#e恭喜您购买了#r 3000 #d点卷");
				cm.dispose();
			} else {
				cm.sendOk("#r#e购买失败，您没有那么多的余额");
				cm.dispose();
			}
		} else if (typed == 2) {
			if (cm.getHyPay(1) >= 10) {
				cm.addHyPay(10,true);
				cm.gainNX(1,33000);
				cm.sendOk("#d#e恭喜您购买了#r 33000 #d点卷");
				cm.dispose();
			} else {
				cm.sendOk("#r#e购买失败，您没有那么多的余额");
				cm.dispose();
			}
		} else if (typed == 3) {
			if (cm.getHyPay(1) >= 50) {
				cm.addHyPay(50,true);
				cm.gainNX(1,170000);
				cm.sendOk("#d#e恭喜您购买了#r 170000 #d点卷");
				cm.dispose();
			} else{
				cm.sendOk("#r#e购买失败，您没有那么多的余额");
				cm.dispose();
			}
		} else if (typed == 4) {
			if (cm.getHyPay(1) >= 100) {
				cm.addHyPay(100,true);
				cm.gainNX(1,350000);
				cm.sendOk("#d#e恭喜您购买了#r 350000 #d点卷");
				cm.dispose();
			} else {
				cm.sendOk("#r#e购买失败，您没有那么多的余额");
				cm.dispose();
			}
		} else if (typed == 5) {
			if (cm.getHyPay(1) >= 300) {
				cm.addHyPay(300,true);
				cm.gainNX(1,1100000);
				cm.sendOk("#d#e恭喜您购买了#r 1100000 #d点卷");
				cm.dispose();
			} else {
				cm.sendOk("#r#e购买失败，您没有那么多的余额");
				cm.dispose();
			}
		}
	}
}