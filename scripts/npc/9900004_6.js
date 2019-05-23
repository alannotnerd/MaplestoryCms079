var status = 0,
	eff = "#fEffect/CharacterEff/1112905/0/1#",
	epp = "#fEffect/CharacterEff/1082312/0/0#",
	epp1 = "#fEffect/CharacterEff/1082312/2/0#",
	axx = "#fEffect/CharacterEff/1051294/0/0#",
	xxx = "#fEffect/CharacterEff/1082565/2/0#",
	ppp = "#fEffect/CharacterEff/1112907/4/0#",
	epp3 = "#fEffect/CharacterEff/1112908/0/1#",
	axx1 = "#fEffect/CharacterEff/1062114/1/0#",
	zs = "#fEffect/CharacterEff/1112946/2/0#",
	zs1 = "#fEffect/CharacterEff/1112946/1/1#",
	dxxx = "#fEffect/CharacterEff/1102232/2/0#",
	tz1 = "#fEffect/CharacterEff/1082565/2/0#",
	tz = "#fEffect/CharacterEff/1082565/4/0#",
	tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#",
	iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#",
	ttt2 = "#fUI/UIWindow/Quest/icon6/7#",
	tz2 = "#fEffect/CharacterEff/1082565/0/0#",
	tz3 = "#fEffect/CharacterEff/1082588/0/0#",
	tz4 = "#fEffect/CharacterEff/1082588/3/0#",
	tz51 = "#fEffect/CharacterEff/1082588/1/0#",
	tz6 = "#fEffect/CharacterEff/1112900/2/1#",
	tz7 = "#fEffect/CharacterEff/1112900/3/1#",
	tz8 = "#fEffect/CharacterEff/1112900/4/1#",
	tz88 = "#fEffect/CharacterEff/1112900/5/1#",
	tz9 = "#fEffect/CharacterEff/1112902/0/0#",
	tz10 = "#fEffect/CharacterEff/1112903/0/0#",
	tz11 = "#fEffect/CharacterEff/1112904/0/0#",
	tz12 = "#fEffect/CharacterEff/1112924/0/0#",
	tz13 = "#fEffect/CharacterEff/1112925/0/0#",
	tz14 = "#fEffect/CharacterEff/1112926/0/0#",
	tz15 = "#fEffect/CharacterEff/1112949/0/0#",
	tz16 = "#fEffect/CharacterEff/1112949/1/0#",
	tz17 = "#fEffect/CharacterEff/1112949/2/0#",
	tz18 = "#fEffect/CharacterEff/1112949/3/0#",
	tz19 = "#fEffect/CharacterEff/1112949/4/0#",
	tz20 = "#fEffect/CharacterEff/1114000/1/0#",
	yun = "#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#",
	wn1 = "#fUI/Basic.img/BtClaim/normal/0#",
	wn2 = "#fUI/UIWindowTW.img/TimeCapsule/BtClose/disabled/0#",
	wn3 = "#fUI/Basic.img/ComboBox/disabled/1#",
	wn4 = "#fUI/Basic.img/ComboBox3/mouseOver/1#",
	wn5 = "#fUI/Basic.img/Cursor/17/16#",
	wn6 = "#fUI/Basic.img/Cursor/34/0#",
	wn7 = "#fUI/Basic.img/Cursor/43/3#",
	wn8 = "#fUI/CashShop.img/CSBargainSale/BtLeft/normal/0#",
	wn9 = "#fUI/CashShop.img/CSBargainSale/BtRight/normal/0#",
	wn10 = "#fUI/CashShop.img/CSBeauty/tip/hair#",
	wn11 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/0#",
	wn12 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/1#",
	wn13 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/2#",
	wn14 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/3#",
	wn15 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/4#",
	wn16 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/5#",
	wn17 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/6#",
	wn18 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/7#",
	wn19 = "#fUI/CashShop.img/CSEffect/event/0#",
	wn20 = "#fUI/CashShop.img/CSEffect/hot/0#",
	wn21 = "#fUI/CashShop.img/CSEffect/mileage/0#",
	wn22 = "#fUI/CashShop.img/CSEffect/new/0#",
	wn23 = "#fUI/CashShop.img/CSEffect/sale/0#",
	wn24 = "#fUI/CashShop.img/CSEffect/time/0#",
	wp1 = "#fUI/CashShop.img/CSEffect/number/0#",
	wp2 = "#fUI/CashShop.img/CSIcon/0#",
	wp3 = "#fUI/CashShop.img/CSStatus/BtCharge/mouseOver/0#",
	wp4 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/0#",
	wp5 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/1#",
	wp6 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/2#",
	wp7 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/3#",
	wp8 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/4#",
	wp9 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/5#",
	wp10 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/6#",
	wp11 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/7#",
	wp12 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/8#",
	wp13 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/9#",
	wp14 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/10#",
	wp15 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/0#",
	wp16 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/1#",
	wp17 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/2#",
	wp18 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/3#",
	wp19 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/4#",
	wp20 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/5#",
	wi1 = "#fUI/SoulUI.img/DungeonMap/icon/dungeonItem/0#",
	wi2 = "#fUI/SoulUI.img/DungeonMap/icon/soulFragment/0#",
	wi3 = "#fUI/SoulUI.img/DungeonMap/icon/soulTrap/0#",
	wi4 = "#fUI/SoulUI.img/DungeonMap/icon/warpGate/0#",
	wi5 = "#fUI/SoulUI.img/DungeonParty/backgrnd2#",
	wi6 = "#fUI/StarCityUI.img/Board_Friend/list/0/5/selected#",
	wi7 = "#fUI/StarCityUI.img/Board_GameRank/tab/enabled/0#",
	wi8 = "#fUI/StarCityUI.img/Board_GameRank/user/myrank#",
	wi9 = "#fUI/StarCityUI.img/Board_GameRank/user/shining#",
	wi11 = "#fUI/UIPVP.img/ChampionMark/4#",
	wi12 = "#fUI/UIPVP.img/DmgEffect/DmgRed/excellentCritical#",
	wi13 = "#fUI/UIPVP.img/DmgEffect/DmgBlue/excellentCritical#",
	wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#",
	wi15 = "#fUI/UIToolTip.img/Item/Equip/Star/Star1#",
	yun1 = "#fUI/UIWindow/Quest/icon7/10#",
	wn60 = "#fMob/0100101.img/die1/1#",
	ca = java.util.Calendar.getInstance(),
	year = ca.get(java.util.Calendar.YEAR),
	month = ca.get(java.util.Calendar.MONTH) + 1,
	day = ca.get(java.util.Calendar.DATE),
	hour = ca.get(java.util.Calendar.HOUR_OF_DAY),
	minute = ca.get(java.util.Calendar.MINUTE),
	second = ca.get(java.util.Calendar.SECOND),
	weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);

function start() {
	status = -1;
	action(1, 0, 0)
}
function action(a, c, b) {
	if (0 == status && 0 == a) cm.dispose();
	else if (1 == a ? status++ : status--, 180000001 == cm.getMapId()) cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员."), cm.dispose();
	else if (0 == status) a = "#n#k#L0#杂货商店#l #L1#火炮装备#l #L2#双刀装备#l #L3#飞标专卖#l\r\n#L4#暴君商店#l #L5#外星装备#l #L6#特殊装备#l #L7#狮王道具#l\r\n#L8#征服币店#l #L9#普通卷轴#l #L10#运动币店#l #L11#RED币商#l\r\n", a += "#L12#风暴币（技能书）店#l #L25#购买重置SP卷#l #L35#购买理发卷#l\r\n", a += "#e#r#L50#" + yun1 + "点卷商店" + yun1 + "#l\r\n", a += "#d#L14#" + wi14 + "双倍道具#l#L15#" + wi14 + "道具卷轴#l#L16#" + wi14 + "皮肤伤害#l\r\n", a += "#L17#" + wi14 + "职业副手#l#L18#" + wi14 + "魔方，喇叭，其他" + wi14 + "#l\r\n", a += "#r#e#L50#" + yun1 + "国庆币商店" + yun1 + "#l\r\n", a += "#d#L19#" + wi14 + "实惠礼包#l#L20#" + wi14 + "绝版时装#l#L21#" + wi14 + "稀有椅子#l\r\n", a += "#L22#" + wi14 + "上乘装备#l#L23#" + wi14 + "极品卷轴#l#L24#" + wi14 + "品级副装购买#l\r\n", a += "#r#e#L50#" + yun1 + "抵用卷商店" + yun1 + "#l\r\n", a += "#d#e#L13#" + wi14 + "兑换道具#l#L26#" + wi14 + "绝版椅子#l#L27#" + wi14 + "140顶级副手#l\r\n", a += "#d#e#L29#" + wi14 + "抵用时装#l#L30#" + wi14 + "巨匠装备#l#L28#" + wi14 + "极品机器人#l", cm.sendSimple(a);
	else if (1 == status) switch (b) {
	case 0:
		cm.dispose();
		cm.openShop(1012123);
		break;
	case 1:
		cm.dispose();
		cm.openShop(1012124);
		break;
	case 2:
		cm.dispose();
		cm.openShop(1012125);
		break;
	case 3:
		cm.dispose();
		cm.openShop(1033003);
		break;
	case 4:
		cm.dispose();
		cm.openShop(22224);
		break;
	case 5:
		cm.dispose();
		cm.openShop(9310117);
		break;
	case 6:
		cm.dispose();
		cm.openShop(1033001);
		break;
	case 7:
		cm.dispose();
		cm.openShop(2161010);
		break;
	case 8:
		cm.dispose();
		cm.openNpc(9900003, 21);
		break;
	case 9:
		cm.dispose();
		cm.openNpc(9310144, 222);
		break;
	case 10:
		cm.dispose();
		cm.openShop(22200);
		break;
	case 11:
		cm.dispose();
		cm.openShop(2E4);
		break;
	case 12:
		cm.dispose();
		cm.openNpc(9310073);
		break;
	case 13:
		cm.dispose();
		cm.openNpc(9900003, 16);
		break;
	case 14:
		cm.dispose();
		cm.openNpc(9900002, 11);
		break;
	case 15:
		cm.dispose();
		cm.openNpc(9900002, 10);
		break;
	case 16:
		cm.dispose();
		cm.openNpc(1540660);
		break;
	case 17:
		cm.dispose();
		cm.openShop(1012126);
		break;
	case 18:
		cm.dispose();
		cm.openNpc(9900003, 10);
		break;
	case 19:
		cm.dispose();
		cm.openNpc(9000069, 5);
		break;
	case 20:
		cm.dispose();
		cm.openNpc(9000069, 1);
		break;
	case 21:
		cm.dispose();
		cm.openNpc(9000069, 2);
		break;
	case 22:
		cm.dispose();
		cm.openNpc(9000069, 4);
		break;
	case 23:
		cm.dispose();
		cm.openNpc(9000069, 3);
		break;
	case 24:
		cm.dispose();
		cm.openNpc(9310144, 999);
		break;
	case 25:
		1E5 <= cm.getMeso() ? (cm.gainMeso(-1E5), cm.gainItem(25E5, 1), cm.sendOk("恭喜您购买成功!!!")) : cm.sendOk("需要100000金币,你没有!!!");
		cm.dispose();
		break;
	case 50:
		cm.dispose();
		cm.openNpc(9310144, 101);
		break;
	case 26:
		cm.dispose();
		cm.openNpc(9900004, 8);
		break;
	case 27:
		cm.dispose();
		cm.openNpc(9900004, 9);
		break;
	case 28:
		cm.dispose();
		cm.openNpc(9900004, 10);
		break;
	case 29:
		cm.dispose();
		cm.openNpc(9900004, 11);
		break;
	case 30:
		cm.dispose();
		cm.openNpc(9900004, 12);
		break;
	case 35:
		cm.dispose(), cm.openNpc(9900004, 1001)
	}
};