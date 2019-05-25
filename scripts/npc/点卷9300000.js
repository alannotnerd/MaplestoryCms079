
function start() {
    cm.sendSimple ("你好！我是唐三藏，我徒弟八戒去化缘还没回来，趁有点空我帮枫之林为大家服务一会，我可以帮你兑换点卷请选择相应的项目进行兑换吧!\r\n#r#L0##e10亿金币换10000点卷#n#l\r\n#k#L1##e21亿金币换25000点卷#n#l#k\r\n#e#L2#我有#v4001126# #b1#k #r100 #k\r\n#e#L3#我有#v4001126# #b5#k #r换100 点卷s#k\r\n#e#L4#我有#v4001126# #b10#k #r换100 点卷s#k\r\n#e#L5#我有#v4001126# #b25#k #r换100 点卷s#k\r\n#e#L6#我有#v4001126# #b1#k #g换250 点卷#k\r\n#e#L7#我有#v4001126# #b5#k #g换250 点卷s#k\r\n#e#L8#我有#v4001126# #b10#k #g换250 点卷s#k\r\n#e#L9#我有#v4001126# #b25#k #g换250 点卷s#k")
    }

function action(mode, type, selection) {
        cm.dispose();

    switch(selection){
        case 0: 
            if(cm.getMeso() >= 1000000000){
            cm.sendOk("谢谢! 10,000 点已添加到您的帐户! 享受吧! #r赶快去商城购买你喜爱的商品吧!#k");
            cm.gainMeso(-1000000000);
            cm.gainNX(10000);
            cm.modifyNX(10000, 0);//显示得点
            cm.dispose();
            }else{
            cm.sendOk("请确认你有10亿的时候在来兑换点卷!");
            cm.dispose();
            }
        break;
        case 1: 
            if(cm.getMeso() >= 2100000000) {
            cm.sendOk("谢谢! 25,000 点已添加到您的帐户! 享受吧! #r赶快去商城购买你喜爱的商品吧!#k");
            cm.gainMeso(-2100000000);
            cm.gainNX(25000);
            cm.modifyNX(25000, 0);//显示得点
            cm.dispose();        
            }
            else{    
                cm.sendOk("请确认你有21亿的时候在来兑换点卷!");
                cm.dispose();
            };
        break;
        case 2:
            if(cm.haveItem(4001126, 1)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你100点NX!")
            cm.gainItem(4001126, -1);
            cm.gainNX(100);
			cm.modifyNX(100, 0);
            cm.dispose();
            } else {
                cm.sendOk("#e你没有 #b1#k #v4001126#")
                cm.dispose();    
            };    
        break;
        case 3:
            if(cm.haveItem(4001126, 5)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你500点NX!")
            cm.gainItem(4001126, -5);
            cm.gainNX(500);
			cm.modifyNX(500, 0);
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b5#k 个 #v4001126#\r\n请检查您的背包中是否有5个再来领取。")
                cm.dispose();    
            };    
        break;
        case 4:
            if(cm.haveItem(4001126, 10)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你1000点NX!")
            cm.gainItem(4001126, -10);
            cm.gainNX(1000);
            cm.modifyNX(1000, 0);//显示得点
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b10#k 个 #v4001126#\r\n请检查您的背包中是否有10个再来领取。")
                cm.dispose();    
            };    
        break;
        case 5:
            if(cm.haveItem(4001126, 25)) {
            cm.sendOk("您的点卡已被收回!为了回报你，我给你2500点NX!")
            cm.gainItem(4001126, -25);
            cm.gainNX(2500);
			cm.modifyNX(2500, 0);
            cm.dispose();
            } else {
                cm.sendOk("#e您需要 #b25#k 个 #v4001126#\r\n请检查您的背包中是否有25个再来领取。")
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
