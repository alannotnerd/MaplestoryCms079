var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 || mode == -1 && status == 0) {
        cm.sendNextS("这一定是箱子…", 2);
        cm.dispose();
        return;
    }
    mode == 1 ? status++ : status--;
    if (status == 0) {
        if (cm.itemQuantity(4033194) || cm.itemQuantity(4033195) >= 1) {
            cm.sendOk("我最好回到楼下与药剂箱前老人,终于勃然大怒。");
            cm.dispose();
        }
        if (cm.isQuestActive(20031))
            cm.sendYesNo("所有这些药水很恶心！我们应该卖他们吗？\r\n进药水盒子吗？");
        else {
            cm.sendOk("你看起来并不需要我的药水!");
            cm.dispose();
        }
    } else if (status == 1) {
        cm.gainItem(4033194,1);
        cm.gainItem(4033195,1);
        cm.sendPlayerToNpc("这是一封信吗？必须由所有的尘埃…在一起讲述的.”\r…它不说是谁的…也许将要答。");
        cm.dispose();
    }
}