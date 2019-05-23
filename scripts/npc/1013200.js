var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
} 

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else if (mode == 0)
        status--;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getPlayer().getMapId() == 900020100) {
            cm.sendOk("#b(Please, get a little closer so you can catch it.)"); // TODO make it gms like
            cm.dispose();
        } else {
            if (cm.itemQuantity(4032449) == 0) {
                cm.gainItem(4032449, 1);
            }
            cm.removeNpc(1013200);
            cm.dispose();
        }
    }
}