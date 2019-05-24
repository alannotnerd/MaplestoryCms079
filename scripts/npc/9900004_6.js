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
			text += "\t\t\t  #e欢迎来到#b天成冒险岛9999大礼包 #k!#n\r\n"
            text += "#r礼包截止日期：2016年2月3日 23点59分#l\r\n\r\n"//3
            text += "#r礼包折扣价格9999点卷！#l\r\n\r\n"//3
            text += "#b宠物：齐天大圣#v5000026##l\r\n\r\n"//3
            text += "#b双倍经验卡一周#v5210001##l\r\n\r\n"//3
            text += "#b双倍爆率卡一周#v5360016##l\r\n\r\n"//3
            text += "#b高级装备特许证半个月#v5590001##l\r\n\r\n"//3
            text += "#b极光戒指箱子7天#v5532002##l\r\n\r\n"//3
            text += "#b送棒棒冰HP 500个#v2001001##l\r\n\r\n"//3
            text += "#b送刨冰MP   500个#v2001002##l\r\n\r\n"//3
            text += "#b额外赠送80W冒险币~#l\r\n\r\n"//3
            text += "#L1##r确定购买大礼包就点我吧！#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			if(cm.getPlayer().getCSPoints(1) >= 9999){
				cm.gainNX(-9999);
				cm.gainPet(5000026,"齐天大圣",1,0,100,90);
				cm.gainItem(5210001, 1, 7);//b双倍经验卡一周
				cm.gainItem(5360016, 1,	7);//b双倍爆率卡一周
				cm.gainItem(5590001, 1, 15);//b装备特许证半个月
				cm.gainItem(5532002, 4);//b极光戒指箱子7天
				cm.gainItem(2001001, 500);
				cm.gainItem(2001002, 500);
				cm.gainMeso(800000);
            cm.sendOk("购买成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]购买了天成冒险岛9999点卷大礼包！");
            cm.dispose();
			}else{
            cm.sendOk("点卷不足无法购买！");
            cm.dispose();
			}
		}
    }
}


