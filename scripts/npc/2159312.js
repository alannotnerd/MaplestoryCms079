/*
恶魔专职
*/
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        //cm.sendChangeJob(2159312);
		cm.getDemonSelection();
    } else if (selection == 0) {//恶魔复仇
        cm.getPlayer().changeJob(3101);
		cm.gainItem(1232000,1);
        cm.dispose();
    } else if (selection == 1) {//恶魔猎手
        cm.getPlayer().changeJob(3100);
        cm.dispose();
    } 
}