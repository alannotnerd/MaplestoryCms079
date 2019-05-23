var status = 0;
var icon = "#fUI/UIWindow2.img/StagedGachapon/Creature/0/normal/2#";
var iconl = "#fUI/UIWindow2.img/Megaphone/0#";
var kaihu = 3000;//点卷
var rihuan= 10000;//一次最多兑换的股票币

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	 if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
		 if (mode == 1)
            status++;
	 	if (status == 0) {
//" + cm.getClubMoney() + "
//获取货币数量
//图标： + icon + ;   + iconl + 
		if(cm.isRegistedClub() == true){
			var text =  "#b亲爱的#r#h ##b你好，这里是股票系统！最新上线的股票系统，更多福利功能等待小伙伴们来体验！\r\n#r你当前拥有股票币:" + cm.getClubMoney() + "\r\n#b请选择你需要的功能：\r\n#r#L1#我要兑换股票币!#l\r\n#r#L2#我要打开股票系统!#l\r\n#L3#股票币兑换抵用卷#l";}
		if(cm.isRegistedClub() != true){
			var text = "#b亲爱的#r#h ##b你好，这里是股票系统！最新上线的股票系统，更多福利功能等待小伙伴们来体验！\r\n#r你当前还没有开户哦！只有开户才能使用股票系统！\r\n#b请选择你需要的功能：#r\r\n#L0#我要开户!\r\n";}
			cm.sendSimple(text);			 
		}else if(status == 1){
			switch(selection){
				case 0:
					typed = 2;
					var text1 = "是否确定#r开户#b？（开户费用：#r"+ kaihu +"点卷#b）";
					cm.sendYesNo(text1);
					break;	
				case 1:
					typed = 3;
					cm.sendGetNumber("请输入你要兑换的货币，兑换比例是#r100#k抵用卷=#r1股票币#k。每次最多可以兑换10000股票币。#k", 0, 0, 10000);	
					break;	
				case 2:	
					typed = 11;
					cm.sendSimple("\t\t\t" + icon + "#r股票系统" + icon + "#b\r\n\t\t\t" + iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl + "\r\n\t\t\t\t  当前股价：#l\r\n\t\t" + iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl + "\r\n\t\t\t\t娜娜有限公司：#r" + cm.getStockPrice(1) + "#b\r\n\t\t\t\t喵喵有限公司：#r" + cm.getStockPrice(2) + "#b\r\n\t\t\t\t婷婷有限公司：#r" + cm.getStockPrice(3) + "#b\r\n\t\t" +iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+iconl+ "\r\n\t\t\t\t您当前拥有股票：\r\n\t\t\t\t娜娜有限公司:#r" + cm.getStock(1) + "#b\r\n\t\t\t\t喵喵有限公司:#r" + cm.getStock(2) + "#b\r\n\t\t\t\t婷婷有限公司:#r" + cm.getStock(3) + "#b\r\n\r\n\t\t\t请选择你要的功能：\r\n\t#r#L11#购买股票!#l\t\t\t#r#L22#卖出股票!\r\n\r\n");			
					break;		
				case 3:	
					typed = 4;		
					cm.dispose();
                                  cm.openNpc(9900004, 101);
					break;				
			}
			
		}else if(status == 2){
			if(typed == 2){
			//if(cm.getPlayer().getMeso() < (100000000) && typed != 3){
			if(cm.getPlayer().getCSPoints(1) < (kaihu) && typed != 3){
				cm.sendSimple("对不起，您的点卷不足！");
				cm.dispose();
			}else if(typed != 3){
				cm.gainNX(1, -kaihu);
				cm.registClub();
				cm.worldSpouseMessage(0x24,"★★★★★★★『股票系统』：【"+ cm.getChar().getName() +"】 在" +cm.getServerName() +" 开户成功!★★★★★★★");
				cm.sendSimple("您已开户成功！");
				cm.dispose();
			}}
			if(typed == 3){
				typed = 4;
				fee = selection;
				selectedpay = 100 * fee;
				cm.sendYesNo("你确定要兑换 #r" + fee + "#k股票币吗?\r\n这需要花费你#r" + selectedpay + "抵用卷！");
			}
			if(typed == 11){
				switch(selection){
					case 11:
						typed=111;
						cm.sendSimple("\t\t\t\t#b请选择要购买股票:\r\n#L111#娜娜有限公司：#r剩余" + cm.getStockAmount(1) + "#l\r\n#b#L222#喵喵有限公司:#r剩余" + cm.getStockAmount(2) + "#l\r\n#b#L333#婷婷有限公司：#r剩余" + cm.getStockAmount(3));
						break;
					case 22:
						typed=222;
						cm.sendSimple("\t\t\t\t#b请选择要卖出股票:\r\n#L111#娜娜有限公司：#r拥有" + cm.getStock(1) + "#l\r\n#b#L222#喵喵有限公司:#r拥有" + cm.getStock(2) + "#l\r\n#b#L333#婷婷有限公司：#r拥有" + cm.getStock(3));
						break;
				}
			}
		}else if(status == 3){
			if(typed == 4){
				if (fee <= 0 || fee > rihuan || fee % 1 != 0) {
                		cm.sendOk("请重新输入，一次最多兑换"+ rihuan +"股票币。");
                		cm.dispose();
           			} else if (cm.getPlayer().getCSPoints(2) < selectedpay) {
                		cm.sendOk("抱歉，你没足够的抵用卷！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(+fee);
					cm.gainNX(0,-selectedpay);
                			cm.sendOk("恭喜您,兑换成功！");
                			cm.dispose();
				}
			}
			if(typed == 111){
				switch(selection){
					case 111:
						typed = 1111;
						cm.sendGetNumber("请输入你要买入的股票，购买比例是#r" +cm.getStockPrice(1) + "#k股票币=#r1股娜娜有限公司#k。每次最多可以买入500股。#k", 0, 0, 500);
						break;	
					case 222:
						typed = 2222;
						cm.sendGetNumber("请输入你要买入的股票，购买比例是#r" +cm.getStockPrice(2) + "#k股票币=#r1股喵喵有限公司#k。每次最多可以买入500股。#k", 0, 0, 500);
						break;	
					case 333:
						typed = 3333;
						cm.sendGetNumber("请输入你要买入的股票，购买比例是#r" +cm.getStockPrice(3) + "#k股票币=#r1股婷婷有限公司#k。每次最多可以买入500股。#k", 0, 0, 500);
						break;	
				}
			}
			if(typed == 222){
				switch(selection){
					case 111:
						typed = 11111;
						cm.sendGetNumber("请输入你要卖出的股票，卖出比例是1股娜娜有限公司=" +cm.getStockPrice(1) + "#k股票币#k。每次最多可以卖出500股。#k", 0, 0, 500);
						break;	
					case 222:
						typed = 22222;
						cm.sendGetNumber("请输入你要卖出的股票，卖出比例是1股喵喵有限公司=" +cm.getStockPrice(2) + "#k股票币#k。每次最多可以兑换500股。#k", 0, 0, 500);
						break;	
					case 333:
						typed = 33333;
						cm.sendGetNumber("请输入你要卖出的股票，卖出比例是1股婷婷有限公司=" +cm.getStockPrice(3) + "#k股票币#k。每次最多可以兑换500股。#k", 0, 0, 500);
						break;	
				}
			}
		}else if(status == 4){
			if(typed == 11111){
				fee = selection;
				selectedpay =  cm.getStockPrice(1)* fee;
				if (fee <= 0 || fee > 500 || fee % 1 != 0) {
                		cm.sendOk("请重新输入，一次最多卖出500股娜娜有限公司。");
                		cm.dispose();
           			} else if (cm.getStock(1) < fee) {
                		cm.sendOk("抱歉，你没足够的股票币！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(+selectedpay);
					cm.gainStock(1,-fee);
                			cm.sendOk("恭喜您,卖出成功！");
                			cm.dispose();
				}
			}
			if(typed == 22222){
				fee = selection;
				selectedpay =  cm.getStockPrice(2)* fee;
				if (fee <= 0 || fee > 500 || fee % 1 != 0) {
                		cm.sendOk("请重新输入，一次最多卖出500股喵喵有限公司。");
                		cm.dispose();
           			} else if (cm.getStock(2) < fee) {
                		cm.sendOk("抱歉，你没足够的股份！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(+selectedpay);
					cm.gainStock(2,-fee);
                			cm.sendOk("恭喜您,卖出成功！");
                			cm.dispose();
				}
			}
			if(typed == 33333){
				fee = selection;
				selectedpay =  cm.getStockPrice(3)* fee;
				if (fee <= 0 || fee > 500 || fee % 1 != 0) {
                		cm.sendOk("请重新输入，一次最多卖出500股婷婷有限公司。");
                		cm.dispose();
           			} else if (cm.getStock(3) < fee) {
                		cm.sendOk("抱歉，你没足够的股票币！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(+selectedpay);
					cm.gainStock(3,-fee);
                			cm.sendOk("恭喜您,卖出成功！");
                			cm.dispose();
				}
			}
			if(typed == 1111){
				fee = selection;
				selectedpay =  cm.getStockPrice(1)* fee;
				if (fee <= 0 || fee > 500 || fee % 1 != 0 || cm.getStockAmount(1)-fee < 0 || cm.getStockPrice(1) < 1) {
                		cm.sendOk("请重新输入，一次最多兑换500股娜娜有限公司，或剩余股票数量不足，或该股票已经破产。");
                		cm.dispose();
           			} else if (cm.getClubMoney() < selectedpay) {
                		cm.sendOk("抱歉，你没足够的股票币！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(-selectedpay);
					cm.gainStock(1,fee);
                			cm.sendOk("恭喜您,购买成功！");
                			cm.dispose();
				}
			}
			if(typed == 2222){
				fee = selection;
				selectedpay =  cm.getStockPrice(2)* fee;
				if (fee <= 0 || fee > 500 || fee % 1 != 0 || cm.getStockAmount(2)-fee < 0 || cm.getStockPrice(2) < 1) {
                		cm.sendOk("请重新输入，一次最多兑换500股喵喵有限公司，或股票数量不足，或该股票已经破产。");
                		cm.dispose();
           			} else if (cm.getClubMoney() < selectedpay) {
                		cm.sendOk("抱歉，你没足够的股票币！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(-selectedpay);
					cm.gainStock(2,fee);
                			cm.sendOk("恭喜您,购买成功！");
                			cm.dispose();
				}
			}
			if(typed == 3333){
				fee = selection;
				selectedpay =  cm.getStockPrice(3)* fee;
				if (fee <= 0 || fee > 500 || fee % 1 != 0 || cm.getStockAmount(3)-fee < 0 || cm.getStockPrice(3) < 1) {
                		cm.sendOk("请重新输入，一次最多兑换500股婷婷有限公司，或股票数量不足，或该股票已经破产。");
                		cm.dispose();
           			} else if (cm.getClubMoney() < selectedpay) {
                		cm.sendOk("抱歉，你没足够的股票币！\r\n");
                		cm.dispose();
            			} else {
                			cm.gainClubMoney(-selectedpay);
					cm.gainStock(3,fee);
                			cm.sendOk("恭喜您,购买成功！");
                			cm.dispose();
				}
			}
		}
	}
}