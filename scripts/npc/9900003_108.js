
var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindowBT.img/WorldMap/BtQsearch/mouseOver/0#";

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
        var selStr = "\r\n#e#d您好，本服新增特色副本系列,更多请期待添加..#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
		selStr += "#L2#" + ttt6 + " #r#e[NEW]#n#b 逃脱任务 #r 必得#v2049323#.经验.500点卷#l\r\n";
		selStr += "#L23#" + ttt6 + " #r#e[NEW]#n#b 黄金寺院 #r #i5062002:##k#i5062500:##k#i4001839:#140装备#k#l#n\r\n";
		selStr += "#L20#" + ttt6 + " #r#e[NEW]#n#b 守卫金猪 #r 点卷:抵用卷#i5062500:##k#i5062002:##k#l#n\r\n";
		selStr += "#L21#" + ttt6 + " #r#e[NEW]#n#b 迷幻之域 #r #i4000463:##k#i4001839:##k#i5062500:##i5062002#等.#k#l#n\r\n";
		selStr += "#L22#" + ttt6 + " #r#e[NEW]#n#b 自身影子 #r #i2430069:##k#i2022728:##k#i2022530:#星球星座椅子#k#l#n\r\n";
		selStr += "#L16#" + ttt6 + " #r#e[NEW]#n#b 新版武陵道场 #r #i2046856:##k#i2046857:##k#i1082392:##k#l#n\r\n";
		selStr += "#L17#" + ttt6 + " #r#e[NEW]#n#b 拯救我的公主 #r #i2003517:##k#i4310129:##k#i5062002:##k#l#n\r\n";
		selStr += "#L15#" + ttt6 + " #r#e[NEW]#n#b 枫之高校 #r #i4310129:##k#i5062009:##k#i5062500:##k#l#n\r\n";
		//selStr += "#L14#" + ttt6 + " #r4#e[NEW]#n#b 来吧！怪物公园 #r #i4310020:##k#l#n\r\n";
		selStr += "#L12#" + ttt6 + " #r#e[HOT]#n#b 射手村跳跳跳（丰厚点卷）#r #i4310129:##k#l#n\r\n";
		selStr += "#L13#" + ttt6 + " #r#e[HOT]#n#b 玩具城跳跳跳（丰厚点卷）#r #i4310129:##k#l#n\r\n";
		//selStr += "#L18#" + ttt6 + " #r#e[HOT]#n#b 挑战克劳德 #r #i2431938:##k#i2430051:##k#l#n\r\n";
		selStr += "#L11#" + ttt6 + " #r#e[HOT]#n#b 神话副本<时装、椅子>#r #i1032219:##v2431354##v3010795##k#l#n\r\n";
        selStr += "#L10#" + ttt6 + " #r#e[HOT]#n#b 阿里安特竞技场#r #v4310036# #k#l#n\r\n";
        selStr += "#b#L0#" + ttt6 + " #r.#b 米纳尔森林保卫战#v4310030##v5072000##v5076000##l\r\n";
        //selStr += "#L1#" + ttt6 + " #r#b 全民飞机大战 #v5062009##v5062500##v5064000##l\r\n";
        selStr += "#L3#" + ttt6 + " #r#b 利弗里的天空庭院#v1102382##v1102383##v1102476##l\r\n";
        //selStr += "#L4#" + ttt6 + " #r#b 挑战英语村的大卫先生吧#v1102604##v3010059##v1182010##v1190101##l\r\n";
        selStr += "#L5#" + ttt6 + " #r#b 黄金寺院：僧侣诺伊的情愿#l\r\n";
        selStr += "#L6#" + ttt6 + " #r#b 关卡火力测试(小试牛刀)#v5062002##l\r\n";
        //selStr += "#L7#" + ttt6 + " #r#b 变成废墟的民居#v1432086##v1052315##v3010592##l\r\n";
        selStr += "#L8#" + ttt6 + " #r#e[HOT]#n#b 无限火力挑战#v5062002##l\r\n";
        selStr += "#L9#" + ttt6 + " #r#b 生化魔人欧碧啦#v1112915##v5062000##v5062002##v5064000##l\r\n";
		//selStr += "#L24#" + ttt6 + " #r#b 星星副本#l\r\n";
        selStr += "\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9900003, 109);
                break;
            case 1:
                cm.worldSpouseMessage(0x20, "[全民飞机大战] ：玩家 " + cm.getChar().getName() + " 进入了机场候机室。");
                cm.dispose();
                cm.warp(540010001, 0);
                break;
            case 2:
                cm.dispose();
                cm.openNpc(9900003, 107);
                break;
            case 3:
                cm.dispose();
                cm.openNpc(9220032);
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310057);
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9900003, 101);
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9900003, 102);
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, 700);
                break;
            case 8:
                cm.dispose();
                cm.openNpc(2060103);
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9120050);
                break;
            case 10:
                cm.dispose();
                cm.openNpc(2101017,1);
                break;
			case 11:
				cm.dispose();
				cm.warp(262030000);
				break;
			case 12: 
				cm.dispose();
				cm.warp(100000202, 0);
				cm.sendOk("跳到顶上，去领取属于你的奖励吧！");
				break;
			case 13:
				cm.dispose();
				cm.warp(220000006, 0);
				cm.sendOk("跳到顶上，去领取属于你的奖励吧！");
				break;
			case 14:
				cm.dispose();
				cm.warp(951000000);
				break;
			case 15:
				cm.dispose();
				cm.warp(744000000);
				break;
			case 16:
				cm.dispose();
				cm.warp(925020001);
				break;
			case 17:
				cm.dispose();
				cm.openNpc(9310114, 2);
				break;
			case 18:
				cm.dispose();
				cm.openNpc(9220059);
				break;
			case 20:
				cm.dispose();
				cm.openNpc(9300006, 1);
				break;
			case 21:
				cm.dispose();
				cm.openNpc(9070010, 1);
				break;
			case 22:
				cm.dispose();
				cm.openNpc(9900005, 1);
				break;
			case 23:
				cm.dispose();
				cm.openNpc(9900003, 101);
				break;
			case 24:
				cm.dispose();
				cm.openNpc(9310475);
				break;
        }
    }
}
