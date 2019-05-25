function start() {
status = -1;

action(1, 0, 0);
}
function action(mode, type, selection) {
            if (mode == -1) {
                cm.dispose();
            }
            else {
                if (status >= 0 && mode == 0) {
                
   cm.sendOk("感谢你的光临！");
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
   cm.sendSimple ("本活动仅先内测使用。以后将会取消，感谢大家在游戏中提供的宝贵意见\r\n#d#e       ★ 当前账户剩余:#r" + cm.getzb() + "元宝 #k★#k\r\n#e#L0#我有#v4001126# #b100个兑换#k #r【10000元宝】 #k \r\n#e#L1#我有#v4001126# #b100个兑换 #r【2000商城点卷】#k\r\n");
    } else if (status == 1) {
           if (selection == 0) {     	   
	    if(cm.haveItem(4001126, 100)) {           
            cm.gainItem(4001126, -100);
            cm.setzb(10000); 
	    cm.sendOk("您的#v4001126#已被收回!为了回报你，我给你10000元宝!");
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4001126#\r\n请检查您的背包中是否有100个再来领取。");
                cm.dispose();    
            }
         
    }else if  (selection == 1) {
           if(cm.haveItem(4001126, 100)) {
            cm.gainItem(4001126, -100);
            cm.gainNX(2000); 
            cm.sendOk("您的#v4001126#已被收回!为了回报你，我给你2000点券!");
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4001126#\r\n请检查您的背包中是否有100个再来领取。");
                cm.dispose();    
            }  
    }
}
}
}


