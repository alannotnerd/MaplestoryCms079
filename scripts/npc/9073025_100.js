/*
 *天天爱养成
 */
var status = 0; 
var cwzt = "";
var cwjd = "";
var ttt6 ="#fEffect/CharacterEff/1112946/1/1#";

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 

    if(cm.getBossLog("宠物总计成长值",1) >=0 && cm.getBossLog("宠物总计成长值",1) <= 50){
	cwjd = "第1阶段(孵化期)";
	cwzt = "#fUI/UIWindow2.img/raise/18/0#";
    } else if(cm.getBossLog("宠物总计成长值",1) >=51 && cm.getBossLog("宠物总计成长值",1) <= 150){
	cwjd = "第2阶段(破壳期)";
	cwzt = "#fUI/UIWindow2.img/raise/18/1#";
    } else if(cm.getBossLog("宠物总计成长值",1) >=151 && cm.getBossLog("宠物总计成长值",1) <= 250){
	cwjd = "第3阶段(幼崽期)";
	cwzt = "#fUI/UIWindow2.img/raise/18/2#";
    } else if(cm.getBossLog("宠物总计成长值",1) >=251 && cm.getBossLog("宠物总计成长值",1) <= 350){
	cwjd = "第4阶段(幼年期)";
	cwzt = "#fUI/UIWindow2.img/raise/18/3#";
    } else if(cm.getBossLog("宠物总计成长值",1) >=351 && cm.getBossLog("宠物总计成长值",1) <= 550){
	cwjd = "5第阶段(成长期)";
	cwzt = "#fUI/UIWindow2.img/raise/19/1#";
    } else if(cm.getBossLog("宠物总计成长值",1) >=551 && cm.getBossLog("宠物总计成长值",1) <= 800){
	cwjd = "第6阶段(成熟期)";
	cwzt = "#fUI/UIWindow2.img/raise/19/2#";
    } else if(cm.getBossLog("宠物总计成长值",1) >=801 && cm.getBossLog("宠物总计成长值",1) <= 999){
	cwjd = "第7阶段(完全体)";
	cwzt = "#fUI/UIWindow2.img/raise/19/3#";
    } else {
	cwjd ="神龙问世(可以开启宝箱)";
	cwzt = "#fUI/UIWindow2.img/raise/19/3#";
    }

    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
	    abb = 1;
	    cm.sendGetText("- #e#d神龙宝箱能量收集说明：#n#k\r\n\r\n#b1个#t4033943#等于1点成长值\r\n目前神奇宠物龙成长值：(#r"+cm.getBossLog("宠物总计成长值",1)+" #k/#r 1000#k#b) 点\r\n#r注：请输入饲养成长值点数(总值超过1000后果自负)：\r\n#i2430096#： "+ cwjd +"   "+ cwzt +" ");
        } else if (status == 1) { 
	if(cm.getText() < 1 || cm.getText() > 1000){
	    cm.playerMessage(1,"输入的数字不能小于1或大于1000。");
	    cm.dispose();
	} else {
	    cm.sendYesNo("使用#r" + cm.getText() + "#k#i4033943#\r\n饲养#r" + cm.getText() + "#k点成长值"); 
	    }
        } else if (status == 2) { 
	if(cm.getBossLog("宠物总计成长值",1) < 1000){
	if (cm.haveItem(4033943,cm.getText())) { 
	   cm.gainItem(4033943, -cm.getText());
	for(var i = 1; i <= cm.getText(); i++){
	   cm.setBossLog("宠物总计成长值",1);
	}
	   cm.worldSpouseMessage(0x20,"『神龙宝箱』：玩家 "+ cm.getChar().getName() +" 给神龙宝箱灌溉了 "+ cm.getText() +" 能量.神龙的力量逐渐苏醒");
           cm.sendOk("饲养成功,请注意查看.");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的#t4033943#,请多加努力.");
           cm.dispose();
	 }
	} else {
	   cm.sendOk("神龙的力量已经苏醒，无法继续灌溉能量。\r\n#r已经可以使用#b [神龙宝箱] #r它会给你带来惊喜。");
           cm.dispose();
	}
      } 
   }
}
