/*
 脚本功能：商店
 */

var a = 0;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n请问你需要打开下列哪一种商店#b\r\n\r\n#L0# "+icon+" 杂货商店#l #L1# "+icon+" 火炮装备 #L2# "+icon+" 双刀装备\r\n#L3# "+icon+" 飞标专卖 #L4# "+icon+" 外星装备 #L5# "+icon+" 特殊装备\r\n#L6# "+icon+" 狮王道具 #L7# "+icon+" 征服币店 #L8# "+icon+" RED币商店\r\n#L9# "+icon+" 运动币店")
        } else if (a == 1) {
            if (selection == 0){
                cm.openShop(1012123);//shop字段不能为0
                cm.dispose();
            }else if (selection == 1) {//防具商店
                cm.openShop(1012124);
		cm.dispose();
            } else if (selection == 2) {//武器商店
                cm.openShop(1012125);
		cm.dispose();
            } else if (selection == 3) {//武器商店
                cm.openShop(1033003);
		cm.dispose();
            } else if (selection == 4) {//武器商店
                cm.openShop(9310117);
		cm.dispose();
            } else if (selection == 5) {//武器商店
                cm.openShop(1033001);
		cm.dispose();
            } else if (selection == 6) {//武器商店
                cm.openShop(2161010);
		cm.dispose();
            } else if (selection == 7) {//武器商店
		cm.dispose();
                cm.openNpc(9900003, 21);
            } else if (selection == 8) {//RED
		cm.dispose();
                cm.openShop(20000);
            } else if (selection == 9) {//运动币
		cm.dispose();
                cm.openShop(22200);
            } else {
                // 1012123 杂货商店 x
                //10 低级防具
                //11 50~60级防具
                //12 60~70级防具
                //20 低级武器
                //21 50~60级武器
                //22 60~70级武器
                // 3 其他道具 
                // 4 卷轴商店 x 
                // 1012125 宠物商店
                // 6 辅助武器
                cm.openShop(selection);
                cm.dispose();
            }
        } else if (a == 2) {
            switch (selection) {
                case 0://低级防具
                    //cm.openShop(10)
                    cm.sendOk("暂时未开放。")
                    break;
                case 1://50~60级防具
                    cm.openShop(11)
                    break;
                case 2://60~70级防具
                    cm.openShop(12)
                    break;
                case 3://低级武器
                    //cm.openShop(20)
                    cm.sendOk("暂时未开放。")
                    break;
                case 4://50~60级武器
                    cm.openShop(21)
                    break;
                case 5://60~70级武器
                    cm.openShop(22)
                    break;
            }
            cm.dispose();
        }//a
    }//mode
}//f