/* 
*
*	Choose EnterMTS or EnterFreeMarket
* By MrCoffee http://www.odinmr.cn
*/
var status = 0;

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
        	if(cm.getPlayer().getClient().getChannelServer().allowMTS()){
        		cm.sendSimple("想去哪里呢?\r\n#L0##r我要进自由市场#k#l\r\n#L1##b我要进拍卖系统#k#l");
        	}else{
        		cm.getPlayer().warpFreeMarket();
        		cm.dispose();
        	}
        } else if (status == 1) {
          	if(selection == 1){
          		cm.getPlayer().warpMTS();
          	}else if(selection == 0){
          		
          	}
          	cm.dispose();
        }
    }
}