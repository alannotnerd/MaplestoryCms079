importPackage(Packages.tools);
var status = 0;
var selStr;
var sel;
var selitem;
var a = Math.floor(Math.random() * 10 + 5);
var b = Math.floor(Math.random() * 20 + 10);
var c = Math.floor(Math.random() * 20 + 5);
var d = Math.floor(Math.random() * 10 + 3);
var ass = d + b * c + a;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var haogan = cm.getChar().getMapId() - 744000003;
    if (cm.getChar().getMapId() == 744000001) {
        haogan = 20;
    }
    if (cm.getBossLog("haogan" + cm.getChar().getMapId()) > 0) {
        haogan = 0;
    }
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getBossLog("haogandt") == 0) {
            selStr = "没想到你既然能到我的教室里面来,来做做测试题吧。#b\r\n";
            selStr += d + " + " + b + " x " + c + " + " + a + " = ?";
            cm.sendGetNumber(selStr, 1, 1, 9999);
        } else {
            selStr = "你已经解决老师们的问题了嘛?呵呵,没想到你还是蛮聪明的。那么选择赶快选择你喜欢的老师,获得他们的好感度吧!\r\n#b(可以分配的好感度#r" + haogan + "#b点)#b\r\n";
            selStr += "#L0#分配好感度给 乔     (敏捷图腾)#l\r\n";
            selStr += "#L1#分配好感度给 海丽蜜 (智力图腾)#l\r\n";
            selStr += "#L2#分配好感度给 李小龙 (力量图腾)#l\r\n";
            selStr += "#L3#分配好感度给 李卡司 (运气图腾)#l\r\n";
            cm.sendSimple(selStr);
        }
    } else if (status == 1) {
        if (cm.getBossLog("haogandt") == 0) {
            if (selection == ass) {
                status = -1;
                //cm.setbosslog("haogandt",1);
                cm.getPlayer().getMap().startSimpleMapEffect("你很聪明,希望你能再接再厉。", 5120067);
                cm.sendNext("好的,你通过了这个测试。");
            } else {
                cm.sendOk("这么简单的题目你都能算错吗?好好想在来找我把。");
                cm.dispose();
            }
        } else {
            if (cm.getBossLog("haogan" + cm.getChar().getMapId()) == 0) {
                cm.setBossLog("haogan" + cm.getChar().getMapId());
                cm.getChar().setgetschool(selection, haogan + cm.getChar().getgetschool(selection));
                cm.sendOk("好感度已分配你可以移至到下一个教室。");
            } else {
                if (cm.getChar().getMapId() == 744000001) {
                    cm.warp(744000000, 0);
                } else {
                    cm.sendOk("好感度已分配你可以移至到下一个教室。");
                }
            }
            cm.dispose();
        }
    }
}