var status = -1;
var random = java.lang.Math.floor(Math.random() * 10);
function action(mode, type, selection) {
	   if(random >= 0 && random <= 8){
           cm.worldSpouseMessage(0x20,"『神宠培养』：玩家 "+ cm.getChar().getName() +" 的神宠进化成神龙获得了神龙的宝物箱x1。");
	   cm.gainItem(2430096,1);
           cm.resetBossLog("宠物总计成长值");
	   cm.dispose();
	   } else {
           cm.worldSpouseMessage(0x20,"『神宠培养』：玩家 "+ cm.getChar().getName() +" 的神宠未能进化成神龙获得了普通的宝物箱x1。");
	   cm.gainItem(2430066,1);
           cm.resetBossLog("宠物总计成长值");
	   cm.dispose();
	   }
}