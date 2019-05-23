var status = -1;
var itemList = Array(
Array(1092049, 35000),
Array(1352503, 45000),
Array(1352203, 45000),
Array(1352213, 45000),
Array(1352223, 45000),
Array(1352233, 45000),
Array(1352243, 45000),
Array(1352253, 45000),
Array(1352263, 45000),
Array(1352273, 45000),
Array(1352283, 45000),
Array(1352293, 45000),
Array(1352903, 45000),
Array(1352913, 45000),
Array(1352923, 45000),
Array(1352953, 45000),
Array(1352963, 45000),
Array(1353004, 45000),
Array(1352973, 45000),
Array(1352943, 45000),
Array(1352933, 45000),
Array(1352703, 45000),
Array(1342038, 45000),
Array(1353404, 45000)
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
        var selStr = "亲爱的#r#h ##k您好，您还有抵用卷余额：#r"+cm.getPlayer().getCSPoints(2)+"#k点\r\n\r\n";
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