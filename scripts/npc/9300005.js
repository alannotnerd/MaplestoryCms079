function start() {
	action(1, 0, 0) 
}
function action(mode, type, selection) {
	cm.warp(cm.getSavedLocation("AMORIA"));
	cm.clearSavedLocation("AMORIA");
	cm.dispose();
}