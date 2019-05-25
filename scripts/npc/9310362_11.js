var status = 0
var text;
var tz2 = "#fEffect/CharacterEff/1082565/0/0#";  //兔子灰色

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
	text = "#k请选择你要连接的地方：\r\n";
	text += "#L0##n"+tz2+"#d匠人街道#l#L1#"+tz2+"#d废弃都市#l#L2#"+tz2+"#d明珠港#l#L3#"+tz2+"#d射手村#l\r\n";
	text += "#L4#"+tz2+"#d诺特勒斯#l#L5#"+tz2+"#d魔法密林#l#L6#"+tz2+"#d埃欧雷#l#L7#"+tz2+"#d艾利捏#l\r\n";
	text += "#L8#"+tz2+"#d勇士部落#l#L9#"+tz2+"#d水下世界#l#L10#"+tz2+"#d神木村#l#L11#"+tz2+"#d玩具城#l\r\n";
	text += "#L12#"+tz2+"#d天空之城#l#L13#"+tz2+"#d冰封雪域#l#L14#"+tz2+"#d童话村#l#L15#"+tz2+"#d大树村#l\r\n";
	text += "#L16#"+tz2+"#d阿里安特#l#L17#"+tz2+"#d玛加提亚#l#L18#"+tz2+"#d百草堂#l#L19#"+tz2+"#d狐狸村#l\r\n";
	text += "#L20#"+tz2+"#d黄金寺院#l#L21#"+tz2+"#d凯梅尔兹#l#L22#"+tz2+"#d嵩山镇#l#L23#"+tz2+"#d豫园村#l\r\n";
	text += "#L24#"+tz2+"#d古代神社#l#L25#"+tz2+"#d赫里希安#l#L26#"+tz2+"#d三个门#l#L27#"+tz2+"#d万神殿#l\r\n";
	text += "#L28#"+tz2+"#d大雄宝殿#l#L29#"+tz2+"#d克里蒂亚#l#L30#"+tz2+"#d埃德尔斯坦#l\r\n";
	text += "#L31#"+tz2+"#d克林逊森林城堡#l#L32#"+tz2+"#d阿尔泰营地#l#L33#"+tz2+"#d武陵#l\r\n";
	cm.sendSimple(text);
	} else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.warp(910001000);
            break;
		case 1:
            cm.dispose();
            cm.warp(103000000);
            break;
		case 2:
            cm.dispose();
            cm.warp(104000000);
            break;
		case 3:
            cm.dispose();
            cm.warp(100000000);
            break;
		case 4:
            cm.dispose();
            cm.warp(120000000);
            break;
		case 5:
            cm.dispose();
            cm.warp(101000000);
            break;
		case 6:
            cm.dispose();
            cm.warp(101050000);
            break;
		case 7:
            cm.dispose();
            cm.warp(101072000);
            break;
		case 8:
            cm.dispose();
            cm.warp(102000000);
            break;	
		case 9:
            cm.dispose();
            cm.warp(230000000);
            break;
		case 10:
            cm.dispose();
            cm.warp(240000000);
            break;
		case 11:
            cm.dispose();
            cm.warp(220000000);
            break;
		case 12:
            cm.dispose();
            cm.warp(200000000);
            break;
		case 13:
            cm.dispose();
            cm.warp(211000000);
            break;
		case 14:
            cm.dispose();
            cm.warp(224000000);
            break;
		case 15:
            cm.dispose();
            cm.warp(220000000);
            break;
		case 16:
            cm.dispose();
            cm.warp(866190000);
            break;
		case 17:
            cm.dispose();
            cm.warp(260000000);
            break;
		case 18:
            cm.dispose();
            cm.warp(261000000);
            break;
		case 19:
            cm.dispose();
            cm.warp(251000000);
            break;
		case 20:
            cm.dispose();
            cm.warp(410000000);
            break;
		case 21:
            cm.dispose();
            cm.warp(865000000);
            break;
		case 22:
            cm.dispose();
            cm.warp(701210000);
            break;
		case 23:
            cm.dispose();
            cm.warp(701100000);
            break;
		case 24:
            cm.dispose();
            cm.warp(800000000);
            break;
		case 25:
            cm.dispose();
            cm.warp(401040000);
            break;
		case 26:
            cm.dispose();
            cm.warp(270000000);
            break;
		case 27:
            cm.dispose();
            cm.warp(940011000);
            break;
		case 28:
            cm.dispose();
            cm.warp(701220000);
            break;
		case 29:
            cm.dispose();
            cm.warp(241000100);
            break;
		case 30:
            cm.dispose();
            cm.warp(310000000);
            break;
		case 31:
            cm.dispose();
            cm.warp(301000100);
            break;
		case 32:
            cm.dispose();
            cm.warp(300000000);
            break;
		case 33:
            cm.dispose();
            cm.warp(250000000);
            break;	
		}
	}
}