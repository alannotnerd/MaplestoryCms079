


var status = 0;
var typede = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        if (status == 0) {
                var zyms = "<BOSS-贝勒德> \r\n通往鲁塔比斯巨大树根内部需要的钥匙。";
                zyms += "\r\n#b#L1#每天可以领取#v4033981##z4033981#。(5次)\r\n";
                zyms += "\r\n#b#L2#购买#v4033981##z4033981#。   #r1000#k点卷\r\n";
                zyms += "\r\n#b#L3#移动到三核贝勒德。\r\n";
                cm.sendSimple(zyms);
           

        } else if (selection == 1) {
	    if (cm.getSpace(3) < 1) {
                cm.sendOk("背包其他栏空间不足,无法领取。");
            } else if (cm.getPQLog("贝勒德入场卷") < 5) {
                cm.setPQLog("贝勒德入场卷");
                cm.gainItem(4033981, 1);
                //cm.gainNX(-1000);
                cm.sendOk("购买成功,祝您游戏愉快。");
            } else {
                cm.sendOk("每天只可以免费领取一次,您已经领取了。");
            }
            cm.dispose();
        
        } else if (selection == 2) { 
             if (cm.getSpace(3) < 1) {
                cm.sendOk("背包其他栏空间不足,无法购买。");
            } else if (cm.getNX(1) >=1000) {
                cm.gainItem(4033981, 1);
                cm.gainNX(-1000);
                cm.sendOk("购买成功,祝您游戏愉快。");
            } else {
                cm.sendOk("账户点卷余额不足。\r\n\r\n购买#v4033981##z4033981#需要#r1000#k点卷。");
            }
            cm.dispose();
        
        } else if (selection == 3) { 
                if(cm.haveItem(4033981) >= 1)
		    {
		    cm.gainItem(4033981,-1);
		    cm.warp(863010000);
		    cm.dispose();
               }else{
		    cm.sendOk("\r\n你没有#v4033981##t4033981#无法入场。");
                    cm.dispose();
		}
        }
    }
}
