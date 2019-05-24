var 正在进行中 = "#fUI/UIWindow/Quest/Tab/enabled/1#";
var 完成 = "#fUI/UIWindow/Quest/Tab/enabled/2#";
var 正在进行中蓝 = "#fUI/UIWindow/MonsterCarnival/icon1#";
var 完成红 = "#fUI/UIWindow/MonsterCarnival/icon0#";
function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			text += "\t\t\t  #e#d欢迎领取#b永久店卡 #e#d\r\n注意事项：每日午夜12点-下午4点可以开启雇佣.下午4点-午夜12点，无法开启雇佣。\r\n 在线奖励依次为.高质地喇叭x30-纪念币x5-#v4001322#x10-飞天猪蛋x5-高级鱼饵罐头x5-混沌卷轴x1-祝福卷轴x1.\r\n\r\n"
			text += "#L1##r领取永久雇佣商人！#v5030001#x1#l\r\n\r\n\r\n\r\n"//3
				
			/*if(cm.getPlayer().getGamePoints() >= 60 && cm.getPlayer().getGamePointsPD() == 0){
					text += "#L1##r"+完成红+"当天在线时间超过60分钟！"+完成+"#v5030001#x1限时：1天#l\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 60 && cm.getPlayer().getGamePointsPD() > 0){
					text += ""+完成红+"#r当天在线时间超过60分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r当天在线时间超过60分钟！#l"+正在进行中+"\r\n\r\n"//3
			}*/
			
			if(cm.getPlayer().getGamePoints() >= 60 && cm.getPlayer().getGamePointsPD() == 0){
					text += "#L2##r"+完成红+"在线时间超过60分钟！"+完成+"#v5072000#x30限时：1天#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 60 && cm.getPlayer().getGamePointsPD() > 0){
					text += ""+完成红+"#r在线时间超过60分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过60分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 120 && cm.getPlayer().getGamePointsPD() == 1){
					text += "#L3##r"+完成红+"在线时间超过120分钟！"+完成+"#v4000463#x5.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 120 && cm.getPlayer().getGamePointsPD() > 1){
					text += ""+完成红+"#r在线时间超过120分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过120分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 180 && cm.getPlayer().getGamePointsPD() == 2){
					text += "#L4##r"+完成红+"在线时间超过180分钟！"+完成+"#v4001322#x10.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 180 && cm.getPlayer().getGamePointsPD() > 2){
					text += ""+完成红+"#r在线时间超过180分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过180分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 240 && cm.getPlayer().getGamePointsPD() == 3){
					text += "#L5##r"+完成红+"在线时间超过240分钟！"+完成+"#v5220040#x5.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 240 && cm.getPlayer().getGamePointsPD() > 3){
					text += ""+完成红+"#r在线时间超过240分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过240分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 300 && cm.getPlayer().getGamePointsPD() == 4){
					text += "#L6##r"+完成红+"在线时间超过300分钟！"+完成+"#v5350000#x5.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 300 && cm.getPlayer().getGamePointsPD() > 4){
					text += ""+完成红+"#r在线时间超过300分钟！#l"+完成+"\r\n\r\n"//3 
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过300分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 360 && cm.getPlayer().getGamePointsPD() == 5){
					text += "#L7##r"+完成红+"在线时间超过360分钟！"+完成+"#v2049100#x1.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 360 && cm.getPlayer().getGamePointsPD() > 5){
					text += ""+完成红+"#r在线时间超过360分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过360分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
			
			if(cm.getPlayer().getGamePoints() >= 420 && cm.getPlayer().getGamePointsPD() == 6){
					text += "#L8##r"+完成红+"在线时间超过420分钟！"+完成+"#v2340000#x1.#l\r\n\r\n\r\n"//3
				} else if(cm.getPlayer().getGamePoints() >= 420 && cm.getPlayer().getGamePointsPD() > 6){
					text += ""+完成红+"#r在线时间超过420分钟！#l"+完成+"\r\n\r\n"//3
				} else {
					text += ""+正在进行中蓝+"#r在线时间超过420分钟！#l"+正在进行中+"\r\n\r\n"//3
			}
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.haveItem(5030001, 1)){
            cm.sendOk("你已经领取过了。无法重新领取！");
            cm.dispose();
			}else if (cm.haveItem(5030000, 1)){
            cm.sendOk("你已经领取过了。无法重新领取！");
            cm.dispose();
			}else{
			cm.gainItem(5030001, 1);//
			//cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取永久雇佣商人！");
            cm.dispose();
			}
        } else if (selection == 2) {
			cm.gainItem(5072000, 30, 1);//喇叭
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了60分钟在线奖励！高质地喇叭30个.");
            cm.dispose();
        } else if (selection == 3) {
			cm.gainItem(4000463, 5);//纪念币
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了120分钟在线奖励！纪念币5个.");
            cm.dispose();
        } else if (selection == 4) {
			cm.gainItem(4001322, 10);//皇家
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了180分钟在线奖励！白雪人法老的蓝宝石x10.");
            cm.dispose();
        } else if (selection == 5) {
			cm.gainItem(5220040, 5);//蛋
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了240分钟在线奖励！飞天猪的蛋x5.");
            cm.dispose();
        } else if (selection == 6) {
			cm.gainItem(5350000, 5);//高级鱼饵罐头
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了300分钟在线奖励！高级鱼饵罐头x5.");
            cm.dispose();
        } else if (selection == 7) {
			cm.gainItem(2049100, 1);//混沌
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了360分钟在线奖励！混沌卷轴x1.");
            cm.dispose();
        } else if (selection == 8) {
			cm.gainItem(2340000, 1);//祝福
			cm.gainGamePointsPD(1);
            cm.sendOk("领取奖励成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]领取了420分钟在线奖励！祝福卷轴1张.");
            cm.dispose();
		}
    }
}


