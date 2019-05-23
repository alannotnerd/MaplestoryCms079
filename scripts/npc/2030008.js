function start() {
    cm.sendSimple ("您想要挑战扎昆吗。想好了，请告诉我。\r\n#d#e       ★ 当前账户剩余:#r" + cm.getzb() + "元宝 #k★#k\r\n#e#L0#挑战扎昆#k")
    }

function action(mode, type, selection) {
        cm.dispose();

    switch(selection){
        case 0: 
            if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战扎困");
           } else if (cm.getBossLog('ZK') >= 10) {
            cm.sendOk("抱歉你只能参加10次");
	    cm.dispose();
        }else{
            cm.setBossLog('ZK');
        cm.warp(280030000, 0);
cm.serverNotice("『挑战扎昆』：【"+ cm.getChar().getName() +"】非常凶悍的拿着苍蝇排去挑战扎昆去了");  
	cm.dispose();}
        break;
        case 1: 
           if (cm.getLevel() < 120 ) {  
            cm.sendOk("本地图限制等级120级。您的能力没有资格挑战扎困");
           } else if(cm.getzb() >= 10000){
            cm.setzb(-10000);
            cm.setBossLog('ZK');
        cm.warp(280030000, 0);
cm.serverNotice("『挑战扎昆』：【"+ cm.getChar().getName() +"】非常凶悍的拿着苍蝇排去挑战扎昆去了");  
	    cm.dispose();
        }else{
cm.sendOk("你没有元宝无法让你进入");
	cm.dispose();}
        break;
        case 2:
            if(cm.haveItem(4001126, 100)) {
            cm.sendOk("您的#v4001126#已被收回!为了回报你，我给你100元宝!")
            cm.gainItem(4001126, -100);
            cm.setzb(100); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4001126#\r\n请检查您的背包中是否有100个再来领取。")
                cm.dispose();    
            };    
        break;
        case 3:
            if(cm.haveItem(4000378, 100)) {
            cm.sendOk("您的#v4000378#已被收回!为了回报你，我给你500元宝")
            cm.gainItem(4000378, -100);
            cm.setzb(500); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4000378#\r\n请检查您的背包中是否有100个再来领取。")
                cm.dispose();    
            };    
        break;
        case 4:
            if(cm.haveItem(4031250, 100)) {
            cm.sendOk("您的#v4031250#已被收回!为了回报你，我给你1000元宝!")
            cm.gainItem(4031250, -100);
            cm.setzb(1000); 
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4031250#\r\n请检查您的背包中是否有100个再来领取。")
                cm.dispose();    
            };    
        break;
        case 5:
            if(cm.haveItem(4001126, 100)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你10点卷")
            cm.gainItem(4001126, -100);
            cm.gainNX(10);
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b100#k 个 #v4001126#\r\n请检查您的背包中是否有100个再来领取。")
                cm.dispose();    
            };    
        break;
        case 6:
            if(cm.haveItem(4001126, 1)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你250点NX!")
            cm.gainItem(4001126, -1);
            cm.gainNX(250);
            cm.modifyNX(250, 0);//显示得点
            cm.dispose();
            } else {
                cm.sendOk("#e你没有 #b1#k #v4001126#")
                cm.dispose();    
            };
        break;
        case 7:
            if(cm.haveItem(4001126, 5)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你1250点NX!")
            cm.gainItem(4001126, -5);
            cm.gainNX(1250);
            cm.modifyNX(1250, 0);//显示得点
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b5#k 个 #v4001126#\r\n请检查您的背包中是否有5个再来领取。")
                cm.dispose();    
            };
        break
        case 8:
            if(cm.haveItem(4001126, 10)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你2500点NX!")
            cm.gainItem(4001126, -10);
            cm.gainNX(2500);
            cm.modifyNX(2500, 0);//显示得点
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b10#k 个 #v4001126#\r\n请检查您的背包中是否有10个再来领取。")
                cm.dispose();    
            };
        break
        case 9:
            if(cm.haveItem(4001126, 25)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你6250点NX!")
            cm.gainItem(4001126, -25);
            cm.gainNX(6250);
            cm.modifyNX(6250, 0);//显示得点
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b25#k 个 #v4001126#\r\n请检查您的背包中是否有25个再来领取。")
                cm.dispose();    
            };
        }
    }
