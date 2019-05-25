/* 绝版抵用卷商店 脸饰*/

var status = -1;
var itemList = Array(
Array(1042164, 50000),
Array(1062126, 70000),
Array(1002355, 50000),
Array(1042347, 70000),
Array(1062229, 50000),
Array(1042329, 70000),
Array(1062216, 50000),
Array(1042290, 70000),
Array(1062209, 50000),
Array(1062179, 70000),
Array(1062219, 50000),
Array(1062137, 70000),
Array(1012511, 50000),
Array(1012468, 70000),
Array(1702583, 50000),
Array(1702529, 70000),
Array(1702455, 50000),
Array(1073014, 70000),
Array(1073013, 50000),
Array(1072943, 70000),
Array(1072951, 50000),
Array(1702535, 70000), 
Array(1004213, 50000),
Array(1072531, 70000),
Array(1072529, 50000),
Array(1051367, 90000),
Array(1050300, 90000),
Array(1051350, 70000),
Array(1050284, 90000),
Array(1004268, 70000),
Array(1004038, 60000),
Array(1012472, 80000),
Array(1022229, 50000),
Array(1102778, 120000),
Array(1102712, 60000),
Array(1102707, 60000),
Array(1102708, 60000),
Array(1102665, 70000),
Array(1102274, 50000),
Array(1082503, 80000),
Array(1004050, 50000),
Array(1702456, 70000),
Array(1702570, 90000),
Array(1112183, 200000),
Array(1112296, 200000),
Array(1004472, 70000),
Array(1001099, 60000),
Array(1051411, 80000),
Array(1012384, 50000),
Array(1702453, 80000)
);
var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好，请选择您希望购买的道具：";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k抵用卷#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("您是否购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 抵用卷？");
        } else {
            cm.sendOk("出现错误...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("购买道具出现错误...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(2) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "抵用卷商店", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX(2, - selectedCost );
                cm.sendOk("恭喜您成功购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k。");
            } else {
                cm.sendOk("购买失败，请您确认在背包所有栏目窗口中是否有一格以上的空间。");
            }
        } else {
            cm.sendOk("您没有那么多抵用卷。\r\n\r\n购买#i" + selectedItem + ":# #b#t" + selectedItem + "##k 需要 #r" + selectedCost + "#k 抵用卷。");
        }
        cm.dispose();
    }
}