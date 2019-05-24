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
            var txt1 = "#d#L1#兑换#v4001322##z4001322#1个\t需要#v4000004#100个\r\n";
            var txt2 = "#d#L2#兑换#v4001322##z4001322#1个\t需要#v4000012#100个\r\n";
            var txt3 = "#d#L3#兑换#v4001322##z4001322#1个\t需要#v4000029#100个\r\n";
            var txt4 = "#d#L4#兑换#v4001322##z4001322#1个\t需要#v4000022#100个\r\n";
            var txt5 = "#d#L5#兑换#v4001322##z4001322#1个\t需要#v4000232#50个\r\n";
            var txt6 = "#d#L6#兑换#v4001322##z4001322#1个\t需要#v4000234#50个\r\n";
            var txt7 = "#d#L7#兑换#v4001322##z4001322#1个\t需要#v4000233#50个\r\n\r\n";
            var txt8 = "#d#L8#兑换#v4021010##z4021010#1个\t需要#v4000448#100个、#v4000458#100个、#v4000453#100个、#v4000444#100个、#v4000449#100个、#v4000454#100个\r\n";
            //var txt9 = "#d#L9使用##v4031643##z4031643#兑换经验#r5000\r\n";
            //var txt10 = "#d#L10使用##v4031645##z4031645#兑换经验#r10000\r\n";
            //var txt11 = "#d#L11使用##v4031646##z4031646#兑换经验#r10000\r\n";
            //var txt12 = "#d#L12使用##v4031647##z4031647#兑换经验#r10000\r\n";


            cm.sendSimple("使用#b各种钓到的鱼#k可以兑换经验哦！不知道你想用兑换哪种呢？\r\n" + txt1 + "" + txt2 + "" + txt3 + "" + txt4 + "" + txt5 + "" + txt6 + "" + txt7 + "" + txt8 + "");
        } else if (status == 1) {
            if (selection == 1) {
                if (cm.haveItem(4000004, 100)) {
                    cm.gainItem(4000004, -100);
                    cm.gainItem(4001322, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 2) { 
                if (cm.haveItem(4000012, 100)) {
                    cm.gainItem(4000012, -100);
                    cm.gainItem(4001322, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 3) {
                if (cm.haveItem(4000029, 100)) {
                    cm.gainItem(4000029, -100);
                    cm.gainItem(4001322, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (cm.haveItem(4000022, 100)) {
                    cm.gainItem(4000022, -100);
                    cm.gainExp(+30000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 5) {
                if (cm.haveItem(4000232, 50)) {
                    cm.gainItem(4000232, -50);
                    cm.gainExp(+30000);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 6) {
                if (cm.haveItem(4000234, 50)) {
                    cm.gainItem(4000234, -50);
                    cm.gainItem(4001322, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 7) {
                if (cm.haveItem(4000233, 50)) {
                    cm.gainItem(4000233, -50);
                    cm.gainItem(4001322, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！");
                    cm.dispose();
                }
            } else if (selection == 8) {
                if (cm.haveItem(4000448, 100) && cm.haveItem(4000458, 100) && cm.haveItem(4000453, 100) && cm.haveItem(4000444, 100) && cm.haveItem(4000449, 100) && cm.haveItem(4000454, 100)) {
                    cm.gainItem(4000448, -100);
                    cm.gainItem(4000458, -100);
                    cm.gainItem(4000453, -100);
                    cm.gainItem(4000444, -100);
                    cm.gainItem(4000449, -100);
                    cm.gainItem(4000454, -100);
                    cm.gainItem(4021010, 1);
                    cm.sendOk("合成成功，恭喜！获得#v4021010#一个");
                    cm.dispose();
                } else {
                    cm.sendOk("材料不足。无法合成！制作#v4021010#需要材料为：\r\n#v4000448#x100个\r\n#v4000458#x100个\r\n#v4000453#x100个\r\n#v4000444#x100个\r\n#v4000449#x100个\r\n#v4000454#x100个\r\n");
                    cm.dispose();
                }
            } else if (selection == 9) {
                if (cm.haveItem(4031643, 100)) {
                    cm.gainItem(4031643, -100);
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
