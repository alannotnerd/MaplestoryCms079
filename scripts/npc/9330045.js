
/*
5340000  钓竿
5350000  高级鱼饵罐头
5340001  高级鱼竿
*/

importPackage(net.sf.cherry.client);

function start() {
	status = -1;
	
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else 
	{
		if (status >= 0 && mode == 0) {
			cm.sendOk("哈~钓鱼是一种伟大的职业");
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
			if(cm.getLevel() <= 1){
				cm.sendOk("别点我了，明明知道我不会让你进入的！");
				cm.dispose(); 
			}else{
				cm.sendSimple("你好!你有什么需要我做的吗?\r\n"+
				"#L1##b进入钓鱼场#k\r\n"+
				"#L2##b购买钓鱼椅子#k\r\n"+
				"#L3##b使用高级鱼罐头兑换鱼饵#k\r\n"+
				"#L4##b购买普通鱼饵#k\r\n#L5##b钓鱼场的介绍#k");
			}
			
		} else if (status == 1) { //进入钓鱼场
			if (selection == 1) {
				if (cm.haveItem(5340001, 1) || (cm.haveItem(5340000, 1))) { 
					cm.saveLocation("FISHING");
					cm.warp(741000200);
					cm.dispose();
				} else {
					cm.sendOk("你没有进入渔场需要的#b高级鱼竿#k或者#b普通鱼竿#k.我不能送你进去");
					cm.dispose(); 
				}
			} else if  (selection == 2) { 
			//-------------------------------购买钓鱼椅子-----------------------------
				if ((cm.getMeso() >= 500000)&&(cm.haveItem(3011000, 1))||(cm.getMeso() <= 500000)) { 
					cm.sendOk("你的冒险币不足，或者你已经买了一把椅子了！");
					cm.dispose();
				} else {
					cm.sendOk("你已经成功买到了钓鱼椅子！花费了你50万冒险币！"); 
					cm.gainItem(3011000,1); //钓鱼椅子
					cm.gainMeso(-500000);
					cm.dispose(); 
				}
			} else if (selection == 3) {
			//------------------------------高级鱼饵兑换----------------------------------
				if (cm.haveItem(5350000, 1)) { 
					cm.gainItem(5350000,-1);
					cm.gainItem(2300001,100);
					cm.sendOk("兑换成功！");
					cm.dispose();
				} else {
					cm.sendOk("你没有高级鱼饵~"); 
					cm.dispose(); 
				}
			} else if (selection == 4) {
			//--------------------------------鱼饵兑换------------------------------------	
				if ((cm.getMeso() >= 3000000)) { 
					cm.gainItem(2300000,50);
					cm.gainMeso(-3000000);
					cm.sendOk("兑换成功！");
					cm.dispose();
				} else {
					cm.sendOk("冒险币不够~需要3000000冒险币"); 
					cm.dispose(); 
				}
			} else if (selection == 5) {
			//-------------------------------关于钓鱼场------------------------------------
				cm.sendNextPrev("进入钓鱼场需要#b高级鱼竿#k或者#b鱼竿#k,也需要#b钓鱼场专用椅子#k,和#b鱼饵#k,这些你都可以通过我来购买.#b鱼竿#k请去点卷购物商场购买!");
				cm.dispose();
			}
		}
	}
}