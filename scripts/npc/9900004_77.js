/*
 * 
 * @wnms
 * @大擂台传送副本npc
 */
function start() {
    status = -1;
    action(1, 0, 0);
}
var 冒险币 = 5000;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("放弃就算了");
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
            cm.sendSimple("#r我可以快捷的为您变更你的发型、脸型、肤色！！\r\n#b请选择你要的操作！\r\n\r\n#L1#购买皇家理发卷#l\r\n\r\n#d#L2##r更换发型（普通）#l\r\n\r\n#L3#更换发型（皇家）#l\r\n\r\n#L4#更换脸型#l\r\n\r\n#L5#更换肤色#l\r\n\r\n");
        } else if (status == 1) {
            if (selection == 1) {//副本传送
             cm.openNpc(1012117,0);
            } else if (selection == 2) {
             cm.openNpc(1012103,0);
            } else if (selection == 3) {
             cm.openNpc(9105006,0);            
            } else if (selection == 4) {
             cm.openNpc(1052004,0);
            } else if (selection == 5) {
             cm.openNpc(1012105,0);
                                            
        }	
        }
    }
}


