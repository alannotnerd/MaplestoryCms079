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
			text += "\t\t\t  #e欢迎来到#r棉花糖#k冒险岛 #k!#n\r\n"
            text += "#L1##e#b100个枫叶兑换100抵用卷#l\r\n\r\n"//3
            text += "#L2##e#b500个枫叶兑换500抵用卷#l\r\n\r\n"//3
            text += "#L3##e#b1000个枫叶兑换1000抵用卷#l\r\n\r\n"//3
            text += "#L4##e#b5000个枫叶兑换5000抵用卷#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) { 
			if(cm.haveItem(4001126,100)){
				cm.gainDY(100);
				cm.gainItem(4001126,-100);
				cm.sendOk("100个枫叶兑换100抵用卷成功！");
			    cm.worldMessage(6,"【兑换系统】["+cm.getName()+"]100个枫叶兑换100抵用卷成功！");
				cm.dispose();
			}else{
				cm.sendOk("你没有100个枫叶无法兑换100抵用卷！");
				cm.dispose();
			}
        } else if (selection == 2) {  
			if(cm.haveItem(4001126,500)){
				cm.gainDY(500);
				cm.gainItem(4001126,-500);
				cm.sendOk("500个枫叶兑换500抵用卷成功！");
			    cm.worldMessage(6,"【兑换系统】["+cm.getName()+"]500个枫叶兑换500抵用卷成功！");
				cm.dispose();
			}else{
				cm.sendOk("你没有500个枫叶无法兑换500抵用卷！");
				cm.dispose();
			}
        } else if (selection == 3) { 
			if(cm.haveItem(4001126,1000)){
				cm.gainDY(1000);
				cm.gainItem(4001126,-1000);
				cm.sendOk("1000个枫叶兑换1000抵用卷成功！");
			    cm.worldMessage(6,"【兑换系统】["+cm.getName()+"]1000个枫叶兑换1000抵用卷成功！");
				cm.dispose();
			}else{
				cm.sendOk("你没有1000个枫叶无法兑换1000抵用卷！");
				cm.dispose();
			}
        } else if (selection == 4) {
			if(cm.haveItem(4001126,5000)){
				cm.gainDY(5000);
				cm.gainItem(4001126,-5000);
				cm.sendOk("5000个枫叶兑换5000抵用卷成功！");
			    cm.worldMessage(6,"【兑换系统】["+cm.getName()+"]5000个枫叶兑换5000抵用卷成功！");
				cm.dispose();
			}else{
				cm.sendOk("你没有5000个枫叶无法兑换5000抵用卷！");
				cm.dispose();
			}
		}
    }
}


