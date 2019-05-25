var status = 0;

var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //爱心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //砖石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //砖石蓝
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz1 = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝
var tz = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var tz2 = "#fEffect/CharacterEff/1082565/0/0#";  //兔子灰色
var tz3 = "#fEffect/CharacterEff/1082588/0/0#";  //红点
var tz4 = "#fEffect/CharacterEff/1082588/3/0#";  //蓝点
var tz51 = "#fEffect/CharacterEff/1082588/1/0#";  //绿点
var tz6 = "#fEffect/CharacterEff/1112900/2/1#";  //音符蓝
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符绿!
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //蓝心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //红心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花样音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花样音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花样音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花样音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////红沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警灯
var wn2 = "#fUI/UIWindowTW.img/TimeCapsule/BtClose/disabled/0#";  //叉叉
var wn3 = "#fUI/Basic.img/ComboBox/disabled/1#";  //白条
var wn4 = "#fUI/Basic.img/ComboBox3/mouseOver/1#";  //黄条
var wn5 = "#fUI/Basic.img/Cursor/17/16#";  //黄色圈
var wn6 = "#fUI/Basic.img/Cursor/34/0#";  //圈
var wn7 = "#fUI/Basic.img/Cursor/43/3#";  //蓝圈
var wn8 = "#fUI/CashShop.img/CSBargainSale/BtLeft/normal/0#";  //黄色左
var wn9 = "#fUI/CashShop.img/CSBargainSale/BtRight/normal/0#";  //黄色右
var wn10 = "#fUI/CashShop.img/CSBeauty/tip/hair#";  //发型提示
var wn11= "#fUI/CashShop.img/CSBeauty/hairColor/Enable/0#";  //黑
var wn12 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/1#";  //红
var wn13 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/2#";  //橙
var wn14 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/3#";  //黄
var wn15 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/4#";  //绿
var wn16 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/5#";  //亲
var wn17 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/6#";  //紫
var wn18 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/7#";  //褐
var wn19 = "#fUI/CashShop.img/CSEffect/event/0#";  //活动图标
var wn20 = "#fUI/CashShop.img/CSEffect/hot/0#";  //人气图标
var wn21 = "#fUI/CashShop.img/CSEffect/mileage/0#";  //积分图标
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品图标
var wn23 = "#fUI/CashShop.img/CSEffect/sale/0#";  //折扣图标
var wn24 = "#fUI/CashShop.img/CSEffect/time/0#";  //限量图标
var wp1 = "#fUI/CashShop.img/CSEffect/number/0#";  //数字 后面改数字0-9
var wp2 = "#fUI/CashShop.img/CSIcon/0#";  //男图标 0男-1女
var wp3 = "#fUI/CashShop.img/CSStatus/BtCharge/mouseOver/0#";  //充值图标
var wp4 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/0#";  //武器开头
var wp5 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/1#";  //帽子
var wp6 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/2#";  //披风
var wp7 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/3#";  //长袍
var wp8 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/4#";  //上衣
var wp9 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/5#";  //裤子
var wp10 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/6#";  //鞋子
var wp11 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/7#";  //手套
var wp12 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/8#";  //饰品
var wp13 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/9#";  //眼饰
var wp14 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/10#";  //效果结尾
var wp15 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/0#";  //斜线美化
var wp16 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/1#";  //斜线美化
var wp17 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/2#";  //斜线美化
var wp18 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/3#";  //斜线美化
var wp19 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/4#";  //斜线美化
var wp20 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/5#";  //斜线美化
var wi1 = "#fUI/SoulUI.img/DungeonMap/icon/dungeonItem/0#";  //星星图标
var wi2 = "#fUI/SoulUI.img/DungeonMap/icon/soulFragment/0#";  //菱形图标
var wi3 = "#fUI/SoulUI.img/DungeonMap/icon/soulTrap/0#";  //骷髅图标
var wi4 = "#fUI/SoulUI.img/DungeonMap/icon/warpGate/0#";  //圆点图标
var wi5 = "#fUI/SoulUI.img/DungeonParty/backgrnd2#";  //毛莫
var wi6 = "#fUI/StarCityUI.img/Board_Friend/list/0/5/selected#";  //剪刀石头布
var wi7 = "#fUI/StarCityUI.img/Board_GameRank/tab/enabled/0#";  //游戏排行
var wi8 = "#fUI/StarCityUI.img/Board_GameRank/user/myrank#";  //黄色条
var wi9 = "#fUI/StarCityUI.img/Board_GameRank/user/shining#";  //紫色条
var wi11 = "#fUI/UIPVP.img/ChampionMark/4#";  //徽章黄色
var wi12 = "#fUI/UIPVP.img/DmgEffect/DmgRed/excellentCritical#";  //特别危险蓝
var wi13 = "#fUI/UIPVP.img/DmgEffect/DmgBlue/excellentCritical#";  //特别危险绿
var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#";  //黄星星
var wi15 = "#fUI/UIToolTip.img/Item/Equip/Star/Star1#";  //蓝星星
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////红色圆
var wn60 = "#fMob/0100101.img/die1/1#";  //梦想
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE);//获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
       // var selStr = "#e#r#L50#"+yun1+"游戏商店"+yun1+"#l\r\n";
		var selStr = "#n#k#L0#杂货商店#l #L1#火炮装备#l #L2#双刀装备#l #L3#飞标专卖#l\r\n";
		selStr += "#L4#暴君商店#l #L5#外星装备#l #L6#特殊装备#l #L7#狮王道具#l\r\n";
		selStr += "#L8#征服币店#l #L9#普通卷轴#l #L10#运动币店#l #L11#RED币商#l\r\n";
		selStr += "#L12#风暴币（技能书）店   #L13#神器 埃苏 顶级杂货店#l\r\n";
		selStr += "#e#r#L50#"+yun1+"点卷商店"+yun1+"#l\r\n";
		selStr += "#d#L15#"+wi14+"双倍道具#l#L16#"+wi14+"道具卷轴#l#L17#"+wi14+"皮肤伤害#l\r\n";
		selStr += "#L18#"+wi14+"职业副手#l#L19#"+wi14+"魔方，喇叭，其他"+wi14+"#l\r\n";
		selStr += "#r#e#L53#"+yun1+"国庆币商店"+yun1+"#l\r\n";
		selStr += "#d#L21#"+wi14+"实惠礼包#l#L22#"+wi14+"绝版时装#l#L23#"+wi14+"稀有椅子#l\r\n";
		selStr += "#L24#"+wi14+"上乘装备#l#L25#"+wi14+"极品卷轴#l#L26#"+wi14+"品级副装购买#l\r\n";
		selStr += "#r#e#L14#"+yun1+"抵用卷商店"+yun1+"#l\r\n";
		selStr += "#d#e#L27#"+wi14+"兑换道具#l#L28#"+wi14+"绝版椅子#l#L29#"+wi14+"140顶级副手#l\r\n";
		selStr += "#d#e#L30#"+wi14+"抵用时装#l#L31#"+wi14+"巨匠装备#l#L32#"+wi14+"极品机器人#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0://杂货商店
            cm.dispose();
            cm.openShop(1012123);
            break;
		case 1://火炮装备
            cm.dispose();
            cm.openShop(1012124);
            break;
		case 2://双刀装
            cm.dispose();
            cm.openShop(1012125);
            break;
		case 3://飞镖
            cm.dispose();
            cm.openShop(1033003);
            break;
		case 4://暴君
            cm.dispose();
           cm.openShop(22224);
            break;
		case 5://外形
            cm.dispose();
             cm.openShop(9310117);
            break;
		case 6://特殊装备
            cm.dispose();
             cm.openShop(1033001);
            break;
		case 7://狮子王
            cm.dispose();
            cm.openShop(2161010);
            break;
		case 8://征服币
            cm.dispose();
           cm.openNpc(9900003, 21);
            break;
		case 9://普通卷轴
            cm.dispose();
            cm.openNpc(9310144,222);
            break;
		case 10://运动会
            cm.dispose();
            cm.openShop(22200);
            break;
		case 11://RED
            cm.dispose();
            cm.openShop(20000);
            break;
        case 12://技能书
            cm.dispose();
	        cm.openNpc(9310073);
            break;
		case 13://神器杂货店
            cm.dispose();
	        cm.openNpc(9310122);
            break;
		case 50://蜗牛票
            cm.dispose();
	        cm.openNpc(9310144, 101);
            break;
		case 15://双倍
            cm.dispose();
            cm.openNpc(9900002, 11); //双倍道具
            break;
            break;
		case 16://道具卷轴
            cm.dispose();
	    cm.openNpc(9900002, 10);
            break;
		case 17://皮肤
            cm.dispose();
	    cm.openNpc(1540660);
            break;
		case 18://职业副手
            cm.dispose();
            cm.openShop(1012126);
	    //cm.openNpc(9310072);
            break;
        case 19://魔方喇叭其他
            cm.dispose();
	        cm.openNpc(9900003, 10);
            break;
        case 20://国庆商店
            cm.dispose();
	        cm.openNpc(9000069,5);
            break;
        case 21://实惠
            cm.dispose();
	        cm.openNpc(9000069,5);
            break;
        case 22://绝版时装
            cm.dispose();
            cm.openNpc(9000069,1);
            break;
        case 23://椅子
            cm.dispose();
	        cm.openNpc(9000069,2);
            break;
        case 24://上层装备
            cm.dispose();
	        cm.openNpc(9000069,4);
            break;
        case 25://极品卷轴
            cm.dispose();
	        cm.openNpc(9000069,3);
            break;
        case 26://品级副装购买
            cm.dispose();
	        cm.openNpc(9310144,999);
            break;
		case 14://抵用卷商店
            cm.dispose();
	        cm.openNpc(9900003,16);
            break;
        case 27://兑换道具
            cm.dispose();
	    cm.openNpc(931072);
            break;
        case 28://绝版椅子
            cm.dispose();
	        cm.openNpc(9900004,8);
            break;
        case 29://银河副手
            cm.dispose();
	        cm.openNpc(9900004,9);
            break;
        case 30://抵用时装
            cm.dispose();
	        cm.openNpc(9900004,11);
            break;
        case 31://巨匠
            cm.dispose();
	        cm.openNpc(9900004,12);
            break;
        case 32://机器人
            cm.dispose();
	        cm.openNpc(9900004,10);
            break;
		}
    }
}