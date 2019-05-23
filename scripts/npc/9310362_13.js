var status = 0
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
	var selStr = "#k请选择你要连接的地方：#l\r\n\r\n";
	selStr += "#L0#"+tz2+"#r僵尸蘑菇的巢穴#l\r\n";
	selStr += "#L1#"+tz2+"#r蓝蘑菇王的巢穴#l\r\n";
	selStr += "#L2#"+tz2+"#r蘑菇王的巢穴#l\r\n";
	selStr += "#L3#"+tz2+"#r皮亚奴斯洞穴#l\r\n";
	selStr += "#L4#"+tz2+"#r时间塔的本源#l\r\n";
	selStr += "#L5#"+tz2+"#r喷火龙栖息地#l\r\n";
	selStr += "#L6#"+tz2+"#r格瑞芬的森林#l\r\n";
	selStr += "#L7#"+tz2+"#r外星人底下钻探区#l\r\n";
	selStr += "#L8#"+tz2+"#r阿卡伊勒祭坛前面#l\r\n";
	cm.sendSimple(selStr);
	} else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.warp();
            break;
		}
	}
}