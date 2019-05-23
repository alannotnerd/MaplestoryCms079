var status = -1;

function start() {
	cm.sendSimple("你想离开埃德尔斯坦，到其他大陆去吗？这里的船开往金银岛和神秘岛的天空之城。费用是800金币。你想去哪里？\r\n#L0#金银岛#l\r\n#L1#天空之城#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	
    if (status == 0) {
		if (cm.getMeso() < 800) {
			cm.sendNext("嗯……你确定自己有#b800#k金币吗？请你打开背包确认一下。不够的话，就先去吧钱凑齐。");
		} else {
			cm.gainMeso(-800);
			if (selection == 0)
				cm.warp(104020130,0);
			else if (selection == 1)
				cm.warp(200000100,0);
		}
		cm.dispose(); 
	} else {
		cm.dispose(); 
    }
}