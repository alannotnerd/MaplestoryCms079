var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
                        var selStr = "#d把勋章取下放背包，请选择想要晋级的装备：#n#k\r\n";
                        //selStr +="\r\n#L1##b"+aaa+" 晋级到#r#e#z1142310##d#n[详情点击查看]#l#k\r\n";
			selStr +="#L2##b"+aaa+" 晋级到#r#e#z1142311##d#n[全属性+5]#l#k\r\n";
			selStr +="#L3##b"+aaa+" 晋级到#r#e#z1142312##d#n[全属性+10]#l#k\r\n";
			selStr +="#L4##b"+aaa+" 晋级到#r#e#z1142313##d#n[全属性+15]#l#k\r\n";
			//selStr +="#L14##b"+aaa+" 晋级到#r#e#z1142314##d#n[全属性+]#l#k\r\n";
			selStr +="#L5##b"+aaa+" 晋级到#r#e#z1142314##d#n[全属性+20]#l#k\r\n";
			selStr +="#L6##b"+aaa+" 晋级到#r#e#z1142315##d#n[全属性+30]#l#k\r\n";
			selStr +="#L7##b"+aaa+" 晋级到#r#e#z1142316##d#n[全属性+35]#l#k\r\n";
			selStr +="#L8##b"+aaa+" 晋级到#r#e#z1142317##d#n[全属性+40]#l#k\r\n\r\n";
			selStr +="#r#e-以下4个勋章能够获得#k每日特权#n\r\n";
			selStr +="#L9##b"+aaa+" 晋级到#r#e#z1142318##d#n[全属性+50]#l#k\r\n";
			selStr +="#L10##b"+aaa+" 晋级到#r#e#z1142319##d#n[全属性+60]#l#k\r\n";
			selStr +="#L11##b"+aaa+" 晋级到#r#e#z1142320##d#n[全属性+70]#l#k\r\n";
			selStr +="#L12##b"+aaa+" 晋级到#r#e#z1142321##d#n[全属性+100]#l#k\r\n";
			//selStr +="#L13##b"+aaa+" 晋级到#r#e#z1142310##d#n[全属性+]#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d法弗纳忏悔之剑需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 100 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 100 个\r\n#b需要#t1142310#：\t#r" + cm.itemQuantity(1142310) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 400 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 400 个\r\n#b需要#t1142311#：\t#r" + cm.itemQuantity(1142311) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 800 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 1000 个\r\n#b需要#t1142312#：\t#r" + cm.itemQuantity(1142312) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");	
                        } else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 1600 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 1600 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2000 个\r\n#b需要#t1142313#：\t#r" + cm.itemQuantity(1142313) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 3200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 3200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t1142314#：\t#r" + cm.itemQuantity(1142314) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t1142315#：\t#r" + cm.itemQuantity(1142315) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 8) {
				typed=8;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t1142316#：\t#r" + cm.itemQuantity(1142316) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 7000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 60 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1142317) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 10) {
				typed=10;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n#g等级需要达到220级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 10000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 10000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 120 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 40 个\r\n#b需要#t1142318#：\t#r" + cm.itemQuantity(1142318) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 11) {
				typed=11;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 10000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 10000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 120 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 40 个\r\n#b需要#t1142319#：\t#r" + cm.itemQuantity(1142319) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 12) {
				typed=12;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n#g等级需要达到240级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 10000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 10000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 500 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 100 个\r\n#b需要#t1142320#：\t#r" + cm.itemQuantity(1142320) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 13) {
				typed=13;
				cm.sendYesNo("- #e#r勋章需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 7000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 60 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1142317) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 14) {
				typed=14;
				cm.sendYesNo("- #e#d法弗纳双风翼弩需要的材料：#n#k\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4000000, 200) && cm.haveItem(4000016, 200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 100) && cm.haveItem(4310036, 100)) {
			cm.gainItem(1402196,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳忏悔之剑一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<普通服务员>处晋级了法弗纳忏悔之剑.");
			cm.dispose();
				} else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
			} else if(typed==2){
                if (cm.haveItem(4000000, 200) && cm.haveItem(4000016, 200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 100) && cm.haveItem(4310036, 100) && cm.haveItem(1142310, 1)) {
					cm.gainItem(4000000, -200);
					cm.gainItem(4000016, -200);
					cm.gainItem(4310030, -100);
					cm.gainItem(4310036, -100);
					cm.gainItem(1142310, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142311)).copy(); // 生成一个Equip类                    
            toDrop.setStr(5); //装备力量
			toDrop.setDex(5); //装备敏捷
			toDrop.setInt(5); //装备智力
			toDrop.setLuk(5); //装备运气
			toDrop.setMatk(5); //物理攻击
			toDrop.setWatk(5); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[中等兵]全属性+5");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 100 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 100 个\r\n#b需要#t1142310#：\t#r" + cm.itemQuantity(1142310) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(4000000, 400) && cm.haveItem(4000016, 400) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 200) && cm.haveItem(4310036, 400) && cm.haveItem(1142311, 1)) {
					cm.gainItem(4000000, -400);
					cm.gainItem(4000016, -400);
					cm.gainItem(4310030, -200);
					cm.gainItem(4310036, -400);
					cm.gainItem(1142311, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142312)).copy(); // 生成一个Equip类                    
            toDrop.setStr(10); //装备力量
			toDrop.setDex(10); //装备敏捷
			toDrop.setInt(10); //装备智力
			toDrop.setLuk(10); //装备运气
			toDrop.setMatk(10); //物理攻击
			toDrop.setWatk(10); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[高等兵]全属性+10");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 400 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 400 个\r\n#b需要#t1142311#：\t#r" + cm.itemQuantity(1142311) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==4){
                if (cm.haveItem(4000000, 800) && cm.haveItem(4000016, 800) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 400) && cm.haveItem(4310036, 1000) && cm.haveItem(1142312, 1)) {
					cm.gainItem(4000000, -800);
					cm.gainItem(4000016, -800);
					cm.gainItem(4310030, -400);
					cm.gainItem(4310036, -1000);
					cm.gainItem(1142312, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142313)).copy(); // 生成一个Equip类                    
            toDrop.setStr(15); //装备力量
			toDrop.setDex(15); //装备敏捷
			toDrop.setInt(15); //装备智力
			toDrop.setLuk(15); //装备运气
			toDrop.setMatk(15); //物理攻击
			toDrop.setWatk(15); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[军士长]全属性+15");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 800 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 1000 个\r\n#b需要#t1142312#：\t#r" + cm.itemQuantity(1142312) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==5){
                if (cm.haveItem(4000000, 1600) && cm.haveItem(4000016, 1600) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1000) && cm.haveItem(4310036, 2000) && cm.haveItem(1142313, 1)) {
					cm.gainItem(4000000, -1600);
					cm.gainItem(4000016, -1600);
					cm.gainItem(4310030, -1000);
					cm.gainItem(4310036, -2000);
					cm.gainItem(1142313, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142314)).copy(); // 生成一个Equip类                    
            toDrop.setStr(20); //装备力量
			toDrop.setDex(20); //装备敏捷
			toDrop.setInt(20); //装备智力
			toDrop.setLuk(20); //装备运气
			toDrop.setMatk(20); //物理攻击
			toDrop.setWatk(20); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[准尉]全属性+20");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 1600 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 1600 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2000 个\r\n#b需要#t1142313#：\t#r" + cm.itemQuantity(1142313) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==6){
                if (cm.haveItem(4000000, 3200) && cm.haveItem(4000016, 3200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1000) && cm.haveItem(4310036, 3000) && cm.haveItem(1142314, 1)) {
					cm.gainItem(4000000, -3200);
					cm.gainItem(4000016, -3200);
					cm.gainItem(4310030, -1000);
					cm.gainItem(4310036, -3000);
					cm.gainItem(1142314, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142315)).copy(); // 生成一个Equip类                    
            toDrop.setStr(30); //装备力量
			toDrop.setDex(30); //装备敏捷
			toDrop.setInt(30); //装备智力
			toDrop.setLuk(30); //装备运气
			toDrop.setMatk(30); //物理攻击
			toDrop.setWatk(30); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[少尉]全属性+30");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 3200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 3200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t1142314#：\t#r" + cm.itemQuantity(1142314) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==7){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 2000) && cm.haveItem(4310036, 3000) && cm.haveItem(1142315, 1)) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -2000);
					cm.gainItem(4310036, -3000);
					cm.gainItem(1142315, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142316)).copy(); // 生成一个Equip类                    
            toDrop.setStr(35); //装备力量
			toDrop.setDex(35); //装备敏捷
			toDrop.setInt(35); //装备智力
			toDrop.setLuk(35); //装备运气
			toDrop.setMatk(35); //物理攻击
			toDrop.setWatk(35); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[中尉]全属性+35");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t1142315#：\t#r" + cm.itemQuantity(1142315) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==8){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3000) && cm.haveItem(4310036, 3000) && cm.haveItem(1142316, 1)) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -3000);
					cm.gainItem(4310036, -3000);
					cm.gainItem(1142316, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142317)).copy(); // 生成一个Equip类                    
            toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			toDrop.setMatk(40); //物理攻击
			toDrop.setWatk(40); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[上尉]全属性+40");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t1142316#：\t#r" + cm.itemQuantity(1142316) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==9){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1142317, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 200) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1142317, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142318)).copy(); // 生成一个Equip类                    
            toDrop.setStr(50); //装备力量
			toDrop.setDex(50); //装备敏捷
			toDrop.setInt(50); //装备智力
			toDrop.setLuk(50); //装备运气
			toDrop.setMatk(50); //物理攻击
			toDrop.setWatk(50); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[少校]全属性+50★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[少校]全属性+50★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 7000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 60 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1142317) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==10){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1142318, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() > 220) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1142318, -1);
					cm.gainItem(4000313, -120);
					cm.gainItem(4033356, -40);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142319)).copy(); // 生成一个Equip类                    
            toDrop.setStr(60); //装备力量
			toDrop.setDex(60); //装备敏捷
			toDrop.setInt(60); //装备智力
			toDrop.setLuk(60); //装备运气
			toDrop.setMatk(60); //物理攻击
			toDrop.setWatk(60); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[中校]全属性+60★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[中校]全属性+60★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[中校]全属性+60★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n#g等级需要达到220级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 10000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 10000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 120 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 40 个\r\n#b需要#t1142318#：\t#r" + cm.itemQuantity(1142318) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==11){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1142319, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() > 230) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1142319, -1);
					cm.gainItem(4000313, -120);
					cm.gainItem(4033356, -40);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142320)).copy(); // 生成一个Equip类                    
            toDrop.setStr(70); //装备力量
			toDrop.setDex(70); //装备敏捷
			toDrop.setInt(70); //装备智力
			toDrop.setLuk(70); //装备运气
			toDrop.setMatk(70); //物理攻击
			toDrop.setWatk(70); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[上校]全属性+70★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[上校]全属性+70★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[上校]全属性+70★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 10000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 10000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 120 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 40 个\r\n#b需要#t1142319#：\t#r" + cm.itemQuantity(1142319) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==12){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1142320, 1) && cm.haveItem(4000313, 500) && cm.haveItem(4033356, 100) && cm.getPlayer().getLevel() > 240) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1142320, -1);
					cm.gainItem(4000313, -500);
					cm.gainItem(4033356, -100);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142321)).copy(); // 生成一个Equip类                    
            toDrop.setStr(100); //装备力量
			toDrop.setDex(100); //装备敏捷
			toDrop.setInt(100); //装备智力
			toDrop.setLuk(100); //装备运气
			toDrop.setMatk(100); //物理攻击
			toDrop.setWatk(100); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[团长]全属性+100★★★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[团长]全属性+100★★★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[团长]全属性+100★★★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[团长]全属性+100★★★★★");
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[团长]全属性+100★★★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n#g等级需要达到240级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 10000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 10000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 500 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 100 个\r\n#b需要#t1142320#：\t#r" + cm.itemQuantity(1142320) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==13){
                if (cm.haveItem(4000000, 4200) && cm.haveItem(4000016, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1142317, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 200) {
					cm.gainItem(4000000, -4200);
					cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1142317, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142318)).copy(); // 生成一个Equip类                    
            toDrop.setStr(50); //装备力量
			toDrop.setDex(50); //装备敏捷
			toDrop.setInt(50); //装备智力
			toDrop.setLuk(50); //装备运气
			toDrop.setMatk(50); //物理攻击
			toDrop.setWatk(50); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 晋级军衔成功", 5120002);
			cm.worldSpouseMessage(0x20, "『军事新闻』 : 恭喜士兵 " + cm.getChar().getName() + " 成功晋级为[少校]");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r勋章需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4000000#：\t\t#r " + cm.itemQuantity(4000000) + " / 4200 个\r\n#b需要#t4000016#：\t\t#r" + cm.itemQuantity(4000016) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 7000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 60 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1142317) + " / 1 个#k");
			cm.dispose();
				}
			} else if(typed==14){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1522094,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("恭喜您合成法弗纳双风翼弩一把.");
			cm.worldSpouseMessage(0x20, "[任务公告] : 恭喜 " + cm.getChar().getName() + " 在市场<普通服务员>处晋级了法弗纳双风翼弩.");
			cm.dispose();
                } else {
			cm.sendOk("合成失败：\r\n\r\n#b需要#t4021012#：\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 个\r\n#b需要#t4021010#： \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 个\r\n#b需要#t4021011#： \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 个\r\n#b需要#t4000082#： \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要#t4000124#：\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 个\r\n#b需要#t4310015#：\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 个\r\n#b需要#t4021019#：\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 个\r\n#b需要#t4033356#：\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 个\r\n#b需要#t4310030#： \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个#k");
			cm.dispose();
				}
           }
      }
   }
 }