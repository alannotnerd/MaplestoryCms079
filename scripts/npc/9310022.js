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
   cm.sendSimple("★★★★★★★★★★★★★★★★★★★★★★★★★★★\r\n★您好，欢迎来到冒险岛的世界，我是便民服务员，您有什★★么需要懂可以通过点击界面上的拍卖，来找到我。使用我★★的功能可不是免费的哦，需要象征性的给点小费哦      ★★#n#d剩余:#r" + cm.getzb() + "元宝   #d闯关积分 :#r" + cm.getboss() + " 分                #k★\r\n★★★★★★★★★★★★★★★★★★★★★★★★★★★\r\n#r#L6#进入拉斯维加斯赌场#l")
    } else if (status == 1) {
           if (selection == 0) {
      cm.sendOk("充值网站：www.jqmxd.cn\r\n\r\n即时您不充值，也可在自由市场4洞5洞通过打怪来获得元宝。有了大家支持我们才能把游戏做的更好\r\n#r#b本站唯一管理：亲亲嘴冒险岛\r\n#r希望大家不要使用和管理员类似的名字，否则可能会被删号处理，谢谢合作");
            cm.dispose();
    }else if  (selection == 1) {
           if(cm.getzb() >= 40) {
            cm.setzb(-40);
           cm.openNpc(9310057);

    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 
}
    }else if  (selection == 2) {
           if(cm.getzb() >= 20) {
           cm.setzb(-20);
           cm.openNpc(9310059);

    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 
}
       }else if  (selection == 3) {
           if(cm.getzb() >= 30) {
           cm.setzb(-30);
           cm.openNpc(9000018); 
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
           cm.openNpc(1300005); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 

}
       }else if  (selection == 6) {
           cm.warp(809030000); 
           cm.dispose(); 



       }else if  (selection == 7) {
           if(cm.getzb() >= 10) {
           cm.setzb(-10);
           cm.openNpc(1012105);
           cm.dispose(); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 

}
       }else if  (selection == 8) {
           if(cm.getzb() >= 10) {
           cm.setzb(-10);
           cm.openNpc(1012103);
           cm.dispose(); 
    } else {
           cm.sendOk("#e您的余额已不足！请及时充值！"); 
           cm.dispose(); 



}
}      
}
}
}


