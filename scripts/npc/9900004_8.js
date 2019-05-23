/* 绝版抵用卷商店 脸饰*/

var status = -1;
var itemList = Array(
Array(3010767, 30000),
Array(3010760, 120000),
Array(3010761, 20000),
Array(3014006, 120000),
Array(3015000, 80000),
Array(3010459, 50000),
Array(3010613, 80000),
Array(3010958, 30000),
Array(3010066, 30000),
Array(3010071, 20000),
Array(3010073, 25000),
Array(3010140, 36000),
Array(3015004, 50000),
Array(3010825, 80000),
Array(3010755, 50000),
Array(3010753, 100000),
Array(3010959, 30000),
Array(3010493, 30000),
Array(3013001, 30000),
Array(3015097, 35000),
Array(3010587, 50000),
Array(3010545, 60000),
Array(3010048, 50000),
Array(3010135, 70000),
Array(3010403, 50000),
Array(3010596, 60000),
Array(3015027, 100000),
Array(3010212, 100000),
Array(3010043, 90000),
Array(3010375, 120000),
Array(3010522, 120000),
Array(3010703, 120000),
Array(3010719, 150000),
Array(3015031, 170000),
Array(3010848, 640000),
Array(3010361, 200000),
Array(3010589, 200000),
Array(3010708, 200000),
Array(3010661, 250000),
Array(3014005, 200000),
Array(3014009, 350000),
Array(3015130, 250000),
Array(3010681, 650000),
Array(3010417, 650000),
Array(3010723, 300000),
Array(3015133, 350000),
Array(3015089, 350000),
Array(3015108, 280000),
Array(3015131, 280000),
Array(3010983, 150000),
Array(3010984, 160000)
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
