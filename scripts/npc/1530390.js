var itemid = 0;
var sl = 0;
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) cm.dispose();
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) status++;
    else status--;
    if (status == 0) {
        cm.sendGetNumber("请输入要获取或丢弃\r\n物品ID:", 0, 1000000, 5999999)
    }
    if (status == 1) {
        itemid = selection;
        cm.sendGetNumber("#r#i" + itemid + "##t" + itemid + "#\r\n32767以内即获取,等于32768即丢弃所有#k\r\n输入数量:", 1, 1, 32768);
    }
    if (status == 2) {
        sl = selection
        if (sl == 32768) {
            cm.sendYesNo("确定要丢弃所有#i" + itemid + "##t" + itemid + "#?");
        } else {
            cm.gainItem(itemid, sl) cm.sendOk("你已获得#r#t" + itemid + "##k个") cm.dispose();
        }
    }
    if (status == 3) {
        cm.gainItem(itemid, -32767);
        cm.gainItem(itemid, -32767);
        cm.gainItem(itemid, -32767);
        cm.dispose();
    }
}