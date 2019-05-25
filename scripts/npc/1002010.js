var status = 0;

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
		var selStr = "#L0##b#n极品属性点装#l #L1#土豪租用武器#l #L2#FFN防具#l\r\n"
		    selStr += "#L3#功能待加#l #L4#功能待加#l #L5#功能待加#l #L6#功能待加#l\r\n";
			selStr += "#L7#功能待加#l #L8#功能待加#l #L9#功能待加#l #L10#功能待加#l\r\n";
			selStr += "#L11#功能待加#l #L12#功能待加#l #L13#功能待加#l #L14#功能待加#l\r\n";
			
		cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0://属性点装
            cm.dispose();
            cm.openNpc(9900004,15);
            break;
		case 1://土豪武器
            cm.dispose();
            cm.openNpc(9900004,4);
            break;
		case 2://FFN防具
            cm.dispose();
            cm.openNpc(9900004,16);
            break;
		}
	}
}	