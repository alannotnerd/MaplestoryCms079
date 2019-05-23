var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#"; //"+z+"//美化
var typed = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0 && mode == 0) {
		im.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 0) {
		var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n";
		selStr += "#e#b  欢迎使用超级NPC盒子，您可以放在键盘快捷键使用：#k";
		selStr += "\r\n#L0#" + z + " #e#r返回市场#l#k#n#L1#" +   z + " #e#r充值赞助#l#k#L2#" +   z + " #e#r进入商城#l#k#n";
		selStr += "\r\n#L3#" + z + " #e#b副本传送#l#k#n#L4#" +   z + " #e#b市场NPC#l#k#L5#"  +   z + " #e#b市场NPC#l#k#n";
		//selStr += "\r\n#L6#" + z + " #e#r自动转职#l#k#n#L7#" +   z + " #e#r在线奖励#l#k#L8#" +   z + " #e#r等级奖励#l#k#n";
		//selStr += "\r\n#L9#" + z + " #e#b出售物品#l#k#n#L10#" +   z + " #e#b新手武器#l#k#L11#" +   z + " #e#b杂货商店#l#k#n";
		//selStr += "\r\n#L12#" + z + " #e#r练级地图#l#k#n#L13#" +   z + " #e#r美容美发#l#k#L14#" +   z + " #e#r平民商城#l#k#n";
		//selStr += "\r\n#L15#" + z + " #e#b挑战首领#l#k#n#L16#" +   z + " #e#b装备还原#l#k#L17#" +   z + " #e#b点卷商城#l#k#n";
		//selStr += "\r\n#L18#" + z + " #e#r每日组队#l#k#n#L19#" +   z + " #e#r装备制作#l#k#L20#" +   z + " #e#r五子棋#l#k#n";
		//selStr += "\r\n#L21#" + z + " #e#b万能传送#l#k#n#L22#" +   z + " #e#b万能服务#l#k#L23#" +   z + " #e#b点卷洗血#l#k#n";
		//selStr += "\r\n#L24#" + z + " #e#r超级拍卖#l#k#n#L24#" +   z + " #e#g敬请期待#l#k#L24#" +   z + " #e#g敬请期待#l#k#n";

		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
		im.sendSimple(selStr);
	} else if (status == 1) {
		switch (selection) {
			case 0:
				im.dispose();
				im.openNpc(9900003,99);
				break;
			case 1:
				im.dispose();
            im.openWeb("http://www.zsj1314.com/");
			break;
			case 2:
				im.dispose();
				im.openNpc(1540107);
				break;
			case 3:
				im.dispose();
				im.openNpc(9310070);
				break;
			case 4:
				im.dispose();
				im.openNpc(9001014);
				break;
			case 5:
				im.dispose();
				im.openNpc(9000345);
				break;
							case 6:
				im.dispose();
				im.openNpc(9900003, 4);
				break;
							case 7://在线奖励
				im.dispose();
				im.openNpc(9900003, 608);
				break;
							case 8:
				im.dispose();
				im.openNpc(9300011, 0);
				break;
							case 9:
				im.dispose();
				im.openShop(1033003); //出售物品
				break;
							case 10://新手武器
				im.dispose();
				im.openNpc(1011101, 3);
				break;
							case 11:
				im.dispose();
				im.openNpc(1011101, 1);
				break;
							case 12:
				im.dispose();
				im.openNpc(9010022, 2);
				break;
							case 13:
				im.dispose();
				im.openNpc(9900003, 9);
				break;
							case 14:
				im.dispose();
				im.openNpc(1011101, 0);
				break;
							case 15:
				im.dispose();
				im.openNpc(9010022, 5);
				break;
			case 16:
				im.dispose();
				im.openNpc(9000069, 1111);
				break;
			case 17:
				im.dispose();
				im.openNpc(3000021, 0);
				break;
							case 18:
				im.dispose();
				im.openNpc(9310144, 6);
				break;
							case 19:
				im.dispose();
				im.openNpc(9900003, 24);
				break;
							case 20:
				im.dispose();
	   im.openWeb("http://xiaoyouxi.2366.com/xiuxian/102715_play.htm");
				break;
											case 21:
				im.dispose();
				im.openNpc(1530420, 0);
				break;
											case 22:
				im.dispose();
				im.openNpc(2135017, 0);
				break;
											case 23:
				im.dispose();
				im.openNpc(9900004, 333);
				break;
				
											case 24:
				im.dispose();
				im.openNpc(9900004, 0);
				break;
		}
	} else if (status == 2) {
		if (typed == 14) {
			im.worldSpouseMessage(0x07, "[世界]" + im.getPlayer().getMedalText() + im.getChar().getName() + " : " + im.getText());
			im.gainMeso(-100000);
			//im.dispose();
		}
		im.dispose();
	}
}
