var status = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendYesNo("��������Ҫ�뿪����?");
        status++;
    } else {
        if (mode < 1) {
            cm.dispose();
        } else {
            if (status == 1) {
                cm.sendNext ("�ð�.�´��ټ�.");
                status++;
            } else if (status == 2) {
                cm.warp(101000300, 0);// back to orbis
                cm.dispose();
            }
        }
    }
}
