/*
 * 
 * @枫之梦
 * 神器进阶系统 - 魔武双修
 */
importPackage(net.sf.odinms.client);
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var txt1 = "#d#L1使用##v4031627##z4031627#兑换经验#r1000\r\n";
            var txt2 = "#d#L2使用##v4031634##z4031634#兑换经验#r1000\r\n";
            var txt3 = "#d#L3使用##v4031636##z4031636#兑换经验#r1000\r\n";
            var txt4 = "#d#L4使用##v4031637##z4031637#兑换经验#r3000\r\n";
            var txt5 = "#d#L5使用##v4031639##z4031639#兑换经验#r3000\r\n";
            var txt6 = "#d#L6使用##v4031640##z4031640#兑换经验#r3000\r\n";
            var txt7 = "#d#L7使用##v4031641##z4031641#兑换经验#r5000\r\n";
            var txt8 = "#d#L8使用##v4031642##z4031642#兑换经验#r5000\r\n";
            var txt9 = "#d#L9使用##v4031643##z4031643#兑换经验#r5000\r\n";
            var txt10 = "#d#L10使用##v4031645##z4031645#兑换经验#r10000\r\n";
            var txt11 = "#d#L11使用##v4031646##z4031646#兑换经验#r10000\r\n";
            var txt12 = "#d#L12使用##v4031647##z4031647#兑换经验#r10000\r\n";


            cm.sendSimple("使用#b各种钓到的鱼#k可以兑换经验哦！不知道你想用兑换哪种呢？\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "" + txt8 + "" + txt9 + "" + txt10 + "" + txt11 + "" + txt12 + "");
        } else if (status == 1) {
            if (selection == 1) {
                if (cm.haveItem(4031627, 1)) {
                    cm.gainItem(4031627, -1);
                    cm.gainExp(+10000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 2) { 
                if (cm.haveItem(4031634, 1)) {
                    cm.gainItem(4031634, -1);
                    cm.gainExp(+10000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if (cm.haveItem(4031636, 1)) {
                    cm.gainItem(4031636, -1);
                    cm.gainExp(+10000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.haveItem(4031637, 1)) {
                    cm.gainItem(4031637, -1);
                    cm.gainExp(+30000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.haveItem(4031639, 1)) {
                    cm.gainItem(4031639, -1);
                    cm.gainExp(+30000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 6) {
                if (cm.haveItem(4031640, 1)) {
                    cm.gainItem(4031640, -1);
                    cm.gainExp(+30000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 7) {
                if (cm.haveItem(4031641, 1)) {
                    cm.gainItem(4031641, -1);
                    cm.gainExp(+50000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 8) {
                if (cm.haveItem(4031642, 1)) {
                    cm.gainItem(4031642, -1);
                    cm.gainExp(+50000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 9) {
                if (cm.haveItem(4031643, 1)) {
                    cm.gainItem(4031643, -1);
                    cm.gainExp(+50000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 10) {
                if (cm.haveItem(4031645, 1)) {
                    cm.gainItem(4031645, -1);
                    cm.gainExp(+100000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 11) {
                if (cm.haveItem(4031646, 1)) {
                    cm.gainItem(4031646, -1);
                    cm.gainExp(+100000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 12) {
                if (cm.haveItem(4031647, 1)) {
                    cm.gainItem(4031647, -1);
                    cm.gainExp(+100000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 13) {
                if (cm.haveItem(4001013, 100)) {
                    cm.gainItem(4001013, -100);
                    cm.gainItem(1482085, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 14) {
                if (cm.haveItem(1482029, 1)) {
                    cm.gainItem(1482029, -1);
                    cm.gainItem(神器, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了神器", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 15) {
                if (cm.haveItem(1492030, 1)) {
                    cm.gainItem(1492030, -1);
                    cm.gainItem(神器, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了神器", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            }else if(selection == 16){
                 if (cm.haveItem(1442071, 1)) {
                    cm.gainItem(1442071, -1);
                    cm.gainItem(神器, 1);
                    cm.getC().getChannelServer().getWorldInterface().broadcastMessage(null, net.sf.cherry.tools.MaplePacketCreator.serverNotice(12, cm.getC().getChannel(), "[合成系统]" + " : " + " [" + cm.getPlayer().getName() + "]合成了神器", true).getBytes());
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            }
        }
    }
}
