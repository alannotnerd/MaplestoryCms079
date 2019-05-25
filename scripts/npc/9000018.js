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
   cm.sendSimple("#e您好，欢迎来到#r冒险岛的世界#k，我是自动售货员:\r\n\r\n  #d剩余G币:#r" + cm.getzb() + "点    \r\n#g#L0#G币充值帮助#l #k\r\n\r\n #L1#现金玩具#l \r\n #L2#现金椅子#l\r\n #L3#消耗物品");
    } else if (status == 1) {
           if (selection == 0) {
      cm.sendOk("#ewww.jqmxd.cn");
            cm.dispose();
    }else if  (selection == 1) {
           cm.openNpc(1300001);
    }else if  (selection == 2) {
           if(cm.getzb() >= 20) {
           cm.setzb(-20);
           cm.openNpc(1300000);

    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 
}
       }else if  (selection == 3) {
           if(cm.getzb() >= 30) {
           cm.setzb(-30);
           cm.openNpc(1300005); 

    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 
}
       }else if  (selection == 4) {
           if(cm.getzb() >= 40) {
           cm.setzb(-40);
           cm.openNpc(9030100); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 

}
       }else if  (selection == 5) {
           if(cm.getzb() >= 40) {
           cm.setzb(-40);
           cm.openNpc(9030100); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 

}
}      
}
}
}


