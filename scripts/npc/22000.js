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
   cm.sendSimple("★★★★★★★★★★★★★★★★★★★★★★★★★★★\r\n★您好，欢迎来到亲亲嘴冒险岛，我是便民服务员，您有什★★么需要懂可以通过点击界面上的拍卖，来找到我。使用我★★的功能可不是免费的哦，需要象征性的给点小费哦      ★★#n#d剩余:#r" + cm.getzb() + "元宝   #d闯关积分 :#r" + cm.getboss() + " 分                #k★\r\n★★★★★★★★★★★★★★★★★★★★★★★★★★★\r\n#r#L6#进入自由市场#l   #g#L0#元宝充值帮助#l #k\r\n\r\n #b#L1#转职#l  #L2#传送#l  #L3#装备#l \r\n #L4#仓库#l  #L8#枫叶换元宝#l  \r\n #L7#护肤#l  #L9#美发#l  #L10#经验修复#l");
    } else if (status == 1) {
           if (selection == 0) {
      cm.sendOk("充值网站：(暂无)\r\n\r\n即时您不充值，也可在通过打怪来获得元宝。有了大家支持我们才能把游戏做的更好\r\n#r#b本站唯一管理：芯碎王子\r\n#r希望大家不要使用和管理员类似的名字，否则可能会被删号处理，谢谢合作");
            cm.dispose();
    }else if  (selection == 1) {         
           cm.openNpc(9310057);
    }else if  (selection == 2) {
           cm.openNpc(9310059);
    }else if  (selection == 3) {      
           cm.openNpc(9000018); 
    }else if  (selection == 4) {
           cm.openNpc(9030100); 
    }else if  (selection == 5) {
           cm.openNpc(1300005); 
    }else if  (selection == 6) {
           cm.warp(910000000); 
           cm.dispose(); 
    }else if  (selection == 9) {     
           cm.openNpc(1012103);          
    }else if  (selection == 7) {
           cm.openNpc(1012105);          
    }else if  (selection == 8) {  
           cm.openNpc(9000041);
    }else if  (selection == 10) {  
           var statup = new java.util.ArrayList();
	   var p = cm.c.getPlayer();
	   if(p.getExp() < 0){
		   p.setExp(0) 
		   statup.add (new net.sf.cherry.tools.Pair(net.sf.cherry.client.MapleStat.EXP, java.lang.Integer.valueOf(0))); 
		   p.getClient().getSession().write (net.sf.cherry.tools.MaplePacketCreator.updatePlayerStats(statup));
		   cm.sendOk("经验值已修复完成");
		   cm.dispose();
	   }else{
		   cm.sendOk("您的经验值正常,无需修复!");
		   cm.dispose();
	   }

    }           
}
}
}


