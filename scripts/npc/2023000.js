/*
雪域黑车NPC
*/ 
var status;
 function start() {
 	status = -1;
 	action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
 	if (mode == -1) {
 		cm.dispose();
 	} else {
 		if (mode == 0 && status == 0) {
 			cm.dispose();
 			return;
 		}
 		if (mode == 1)
 			status++;
 		else
 			status--;
 		if (status == 0) {
			
			cm.sendYesNo("  您好! 您确定要去冰雪峡谷II吗?" );
			
		}
		if (status == 1) {			
			cm.warp(211040200,0);			
			cm.dispose();
		}
	}
}
