var status = -1;
function start() {
	action(1, 0, 0);
}
function action(mode, type, selection){
	 if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
		cm.dispose();
		cm.openNpc(9070000);
	} else {
		cm.sendOk('Nothing to happened');
		cm.dispose();
	}
}