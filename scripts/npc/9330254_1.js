var ah = "#fEffect/CharacterEff/1082565/2/0#"; //兔子蓝
var ag = "#fEffect/CharacterEff/1082565/0/0#"; //兔子灰
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
	var selStr = ag+"#n#k尊敬的玩家#b#h #，#k欢迎来到#b#e套装礼包商城，点击可以购买礼包哦！\r\n";
	selStr += ah+"#k您当前的余额为：#r"+cm.getHyPay(1)+"\t"+ah+"#k累计充值：#r"+cm.getRMB()+"\r\n\r\n";
	selStr += "#L1##b购买#e#b【#r蜡笔礼包#b】#d需要666余额#l\r\n";
	selStr += "#L2##b购买#e#b【#rX卷箱子（自选）#b】#d需要50余额#l\r\n";
	selStr += "#L3##b购买#e#b【#r法弗纳武器箱（自选）#b】#d需要200余额#l\r\n";
	selStr += "#L4##b购买#e#b【#r暴君防具（自选）#b】#d需要300余额#l\r\n";
	selStr += "#L5##b购买#e#b【#r法弗纳防具（自选）#b】#d需要100余额#l\r\n";
	selStr += "#L6##b购买#e#b【#r诺巴战士套装#b】#d需要150余额#l\r\n";
	selStr += "#L7##b购买#e#b【#r诺巴魔法师套装#b】#d需要150余额#l\r\n";
	selStr += "#L8##b购买#e#b【#r诺巴弓箭手套装#b】#d需要150余额#l\r\n";
	selStr += "#L9##b购买#e#b【#r诺巴飞侠套装#b】#d需要150余额#l\r\n";
	selStr += "#L10##b购买#e#b【#r诺巴海盗套装#b】#d需要150余额#l\r\n\r\n";
	selStr += "#r提示：请自己空留背包，否则余额没了装备没得到概不负责！"
	cm.sendSimple(selStr);
	} else if (status == 1) {
		if (selection == 1) {
		   typed = 1;
           cm.sendYesNo("#r#e是否要购买蜡笔礼包，一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 2) {
		    typed = 2;
            cm.sendYesNo("#r#e是否要购买X卷箱子（自选），一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 3) {
		    typed = 3;
            cm.sendYesNo("#r#e是否要购买法弗纳武器箱（自选），一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 4) {
			typed = 4;
            cm.sendYesNo("#r#e是否要购买买暴君防具（自选），一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 5) {
			typed = 5;
            cm.sendYesNo("#r#e是否要购买法弗纳防具（自选），一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 6) {
			typed = 6;
            cm.sendYesNo("#r#e是否要购买诺巴战士套装，一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 7) {
			typed = 7;
            cm.sendYesNo("#r#e是否要购买诺巴魔法师套装，一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 8) {
			typed = 8;
            cm.sendYesNo("#r#e是否要购买诺巴弓箭手套装，一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} else if (selection == 9) {
			typed = 9;
            cm.sendYesNo("#r#e是否要购买诺巴飞侠套装，一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
	    } else if (selection == 10) {
			typed = 10;
            cm.sendYesNo("#r#e是否要购买诺巴海盗套装，一旦确定不能返还余额.\r\n\r\n #b点是确定购买，点否返回上一页.");
		} 
	} else if (status == 2) {
		if (typed == 1) {
			if(cm.getHyPay(1) >= 666) {
				cm.addHyPay(666,true);
				cm.gainItem(3994417,1);
				cm.gainItem(3994418,1);
				cm.gainItem(3994419,1);
				cm.gainItem(3994420,1);
				cm.gainItem(3994421,1);
				cm.gainItem(3994422,1);
				cm.sendOk("#d#e恭喜您购买了#r 蜡笔礼包");
				cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [蜡笔礼包一个] ，谢谢你的支持，我们会为你做得更好~");
				cm.dispose();
			} else {
				cm.sendOk("#r#e购买失败，您没有那么多的余额");
				cm.dispose();
			}
		} else if (typed == 2) {
			       if (cm.getHyPay(1) >= 50) {
				       cm.addHyPay(50,true);
				       cm.gainItem(2430096,1);
				       cm.sendOk("#d#e恭喜您购买了#r X卷箱子（自选）");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [X卷箱子（自选）一个] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
			        } else {
				        cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
			        }
		} else if (typed == 3) {
			       if (cm.getHyPay(1) >= 200) {
				       cm.addHyPay(200,true);
				       cm.gainItem(2431938,1);
				       cm.sendOk("#d#e恭喜您购买了#r 法弗纳武器箱（自选）");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [法弗纳武器箱（自选）一个] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
			        } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 4) {
			       if (cm.getHyPay(1) >= 300) {
					   cm.addHyPay(300,true);
				       cm.gainItem(2432069,1);
				       cm.sendOk("#d#e恭喜您购买了#r 暴君防具（自选）");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [暴君防具（自选）一个] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 5) {
			       if (cm.getHyPay(1) >= 100) {
					   cm.addHyPay(100,true);
				       cm.gainItem(2430887,1);
				       cm.sendOk("#d#e恭喜您购买了#r 法弗纳防具（自选）");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [法弗纳防具（自选）一个] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 6) {
			       if (cm.getHyPay(1) >= 150) {
					   cm.addHyPay(150,true);
				       cm.gainItem(1102476,1);
					   cm.gainItem(1132169,1);
					   cm.gainItem(1072737,1);
				       cm.sendOk("#d#e恭喜您购买了#r 诺巴战士套装");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [诺巴战士套装] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 7) {
			       if (cm.getHyPay(1) >= 150) {
					   cm.addHyPay(150,true);
				       cm.gainItem(1102477,1);
					   cm.gainItem(1132170,1);
					   cm.gainItem(1072738,1);
				       cm.sendOk("#d#e恭喜您购买了#r 诺巴魔法师套装");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [诺巴魔法师套装] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 8) {
			       if (cm.getHyPay(1) >= 150) {
					   cm.addHyPay(150,true);
				       cm.gainItem(1102478,1);
					   cm.gainItem(1132171,1);
					   cm.gainItem(1072739,1);
				       cm.sendOk("#d#e恭喜您购买了#r 诺巴弓箭手套装");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [诺巴弓箭手套装] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 9) {
			       if (cm.getHyPay(1) >= 150) {
					   cm.addHyPay(150,true);
				       cm.gainItem(1072740,1);
					   cm.gainItem(1132172,1);
					   cm.gainItem(1102479,1);
				       cm.sendOk("#d#e恭喜您购买了#r 诺巴飞侠套装");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [诺巴飞侠套装] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		} else if (typed == 10) {
			       if (cm.getHyPay(1) >= 150) {
					   cm.addHyPay(150,true);
				       cm.gainItem(1102480,1);
					   cm.gainItem(1132173,1);
					   cm.gainItem(1072741,1);
				       cm.sendOk("#d#e恭喜您购买了#r 诺巴海盗套装");
				       cm.worldSpouseMessage(0x15,"『余额礼包』：祝贺 "+ cm.getChar().getName() +" 购买了 [诺巴海盗套装] ，谢谢你的支持，我们会为你做得更好~");
				       cm.dispose();
				    } else {
						cm.sendOk("#r#e购买失败，您没有那么多的余额");
				        cm.dispose();
					}
		}
	}
}