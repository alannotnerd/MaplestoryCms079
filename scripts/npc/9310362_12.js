var status = 0
var text;
var tz2 = "#fEffect/CharacterEff/1082565/0/0#";  //兔子灰色

var a = 0;
var selects = 0;
var MapType;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else {
			cm.dispose();
			return;
        }
        if (a == -1) {
            cm.dispose();
	    } else if (a == 0) {
	text = "#k请选择你要连接的地方：\r\n";
	text += "#L0#"+tz2+"#d大蘑菇       〔推荐LV：1 ≈ 10〕#l\r\n";
	text += "#L1#"+tz2+"#d孢子山丘     〔推荐LV：1 ≈ 10〕#l\r\n";
	text += "#L2#"+tz2+"#d接近鸟的地方 〔推荐LV：10 ≈ 20〕#l\r\n";
	text += "#L3#"+tz2+"#d矿石路       〔推荐LV：20 ≈ 40〕#l\r\n";
	text += "#L4#"+tz2+"#d野猪的       〔推荐LV：40 ≈ 55〕#l\r\n";
	text += "#L5#"+tz2+"#d灰烬之地     〔推荐LV：55 ≈ 70〕#l\r\n";
	text += "#L6#"+tz2+"#d云彩公园1    〔推荐LV：55 ≈ 70〕#l\r\n";
	text += "#L7#"+tz2+"#d蚂蚁洞2      〔推荐LV：55 ≈ 90〕#l\r\n";
	text += "#L8#"+tz2+"#d深坑道       〔推荐LV：70 ≈ 80〕#l\r\n";
	text += "#L9#"+tz2+"#d研究所203号  〔推荐LV：80 ≈ 90〕#l\r\n";
	text += "#L10#"+tz2+"#d石头山入口  〔推荐LV：90 ≈ 120〕#l\r\n";
	text += "#L11#"+tz2+"#d露台大厅    〔推荐LV：105 ≈ 110〕#l\r\n";
	text += "#L12#"+tz2+"#d玩具工厂<骨干工程2>      〔推荐LV：110 ≈ 120〕#l\r\n";
	text += "#L13#"+tz2+"#d幻想车站2                〔推荐LV：120 ≈ 130〕#l\r\n";
	text += "#L14#"+tz2+"#d初级修练场               〔推荐LV：120 ≈ 140〕#l\r\n";
	text += "#L15#"+tz2+"#d红鼻子海贼团2            〔推荐LV：120 ≈ 150〕#l\r\n";
	text += "#L16#"+tz2+"#d龙林3                    〔推荐LV：130 ≈ 150〕#l\r\n";
	text += "#L17#"+tz2+"#d龙之巢穴                 〔推荐LV：140 ≈ 150〕#l\r\n";
	text += "#L18#"+tz2+"#d追忆之路1                〔推荐LV：150 ≈ 160〕#l\r\n";
	text += "#L19#"+tz2+"#d忘却之路1                〔推荐LV：160 ≈ 170〕#l\r\n";
	text += "#L20#"+tz2+"#d骑士团第三区域           〔推荐LV：170 ≈ 180〕#l\r\n";
	text += "#L21#"+tz2+"#d黑暗孢子山丘             〔推荐LV：170 ≈ 180〕#l\r\n";
	text += "#L22#"+tz2+"#d荣誉殿堂                 〔推荐LV：180 ≈ 190〕#l\r\n";
	text += "#L23#"+tz2+"#d荒凉山丘                 〔推荐LV：190 ≈ 200〕#l\r\n";
	text += "#L24#"+tz2+"#d黑色天堂1                〔推荐LV：200 ≈ 210〕#l\r\n";
	text += "#L25#"+tz2+"#d黑色天堂2                〔推荐LV：220 ≈ 230〕#l\r\n";
	text += "#L26#"+tz2+"#d黑色天堂3                〔推荐LV：230 ≈ 250〕#l\r\n";
	text += "#L27#"+tz2+"#d骑士团3区   〔推荐LV：180 ≈ 250〕#r打钱地图#l\r\n";
	text += "#L28#"+tz2+"#d骑士团4区   〔推荐LV：180 ≈ 250〕#r打钱地图#l\r\n";
	text += "#L29#"+tz2+"#d骑士团5区   〔推荐LV：180 ≈ 250〕#r打钱地图#l\r\n";
	text += "#L30#"+tz2+"#d寒冰半人马  〔推荐LV：180 ≈ 250〕#r打钱刷点卷地图#l\r\n";
	cm.sendSimple(text);
	} else if (a == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.warp(50000);
            break;
		case 1:
            cm.dispose();
            cm.warp(100020000);
            break;
		case 2:
            cm.dispose();
            cm.warp(101020100);
            break;
		case 3:
            cm.dispose();
            cm.warp(310040400);
            break;
		case 4:
            cm.dispose();
            cm.warp(102030000);
            break;
		case 5:
            cm.dispose();
            cm.warp(102030400);
            break;
		case 6:
            cm.dispose();
            cm.warp(200100000);
            break;
		case 7:
            cm.dispose();
            cm.warp(105010301);
            break;
		case 8:
            cm.dispose();
            cm.warp(310060300);
            break;
		case 9:
            cm.dispose();
            cm.warp(261010103);
            break;
		case 10:
            cm.dispose();
            cm.warp(300010400);
            break;
		case 11:
            cm.dispose();
            cm.warp(220010500);
            break;
		case 12:
            cm.dispose();
            cm.warp(220030200);
            break;
		case 13:
            cm.dispose();
            cm.warp(223030100);
            break;
		case 14:
            cm.dispose();
            cm.warp(250020000);
            break;
		case 15:
            cm.dispose();
            cm.warp(251010402);
            break;
		case 16:
            cm.dispose();
            cm.warp(240030300);
            break;
		case 17:
            cm.dispose();
            cm.warp(240040521);
            break;
		case 18:
            cm.dispose();
            cm.warp(270010100);
            break;
		case 19:
            cm.dispose();
            cm.warp(270030100);
            break;
		case 20:
            cm.dispose();
            cm.warp(271030300);
            break;
		case 21:
            cm.dispose();
            cm.warp(271020000);
            break;
		case 22:
            cm.dispose();
            cm.warp(271030600);
            break;
		case 23:
            cm.dispose();
            cm.warp(273020000);
            break;
		case 24:
            cm.dispose();
            cm.warp(310070400);
            break;
		case 25:
            cm.dispose();
            cm.warp(310070440);
            break;
		case 26:
            cm.dispose();
            cm.warp(310070470);
            break;
		case 27:
            cm.dispose();
            cm.warp(271030300);
            break;
		case 28:
            cm.dispose();
            cm.warp(271030400);
            break;
		case 29:
            cm.dispose();
            cm.warp(271030100);
            break;
		case 30:
            cm.dispose();
            cm.warp(240020400);
            break;
		if (a == 2) {
            selects = selection;
            cm.sendYesNo("在这里的事情办完了吗？确定要去你像要去的地方了吗？");
        } else if (a == 3) {
            if (cm.getVip() == 0 || !isopenvip) {
				if (cm.getMeso() < 50) {
					cm.sendOk("对不起，你的金币不足。\r\n需要50金币才能进行。");
					cm.dispose();
					return;
				} else {
					cm.gainMeso(-50);
				cm.dispose();
				}
			}
		}
		}
	}
	}
}