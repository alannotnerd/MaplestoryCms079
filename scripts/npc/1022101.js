/* RED 1st impact
    Rooney
    Made by Daenerys
*/
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else 
        if (status == 0) {
		    cm.sendNext("It seems like you are really busy right now. If you find some free time down the road, then please see me! You'll experience a Christmas town unlike anything else!");
            cm.dispose();
        status--;
    }
    if (status == 0) {
	    cm.sendYesNo("Are you curious to see the many adventures Happyville has in store for you? Then let's go!");
    } else if (status == 1) {	
	    cm.warp(209000000,16);
        cm.dispose();
    }
}