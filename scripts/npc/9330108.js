var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
		if (status == 0) {
			cm.dispose();
			return;
		}
	status--;
    }

    if (status == 0) {
	cm.sendSimple("你现在想要做什么呢?\n\r #b#L0#前往其他钓鱼场#l \n\r #L2#返回自由市场#l");
    } else if (status == 1) {
	sel = selection;
	if (sel == 0) {
	    cm.sendSimple("你想前往那里的钓鱼场?\r\n#b#L0#外层空间钓鱼场#l\r\n#L1#梦幻王国钓鱼场#l\r\n#L2#精灵钓鱼场#l#k");
	} else if (sel == 2) {
	    var returnMap = cm.getSavedLocation("FISHING");
	    if (returnMap < 0 || cm.getMap(returnMap) == null) {
		returnMap = 910000000; 
	    }
	    cm.clearSavedLocation("FISHING");
	    cm.warp(returnMap,0);
	    cm.dispose();
	}
    } else if (status == 2) {
	if (sel == 0 && selection <= 2 && selection >= 0) {
	    if (cm.getPlayer().getMapId() < 749050500 || cm.getPlayer().getMapId() > 749050502) {
	    	cm.saveLocation("FISHING");
	    }
	    cm.warp(749050500 + selection);
	    cm.dispose();
	} else {
	    cm.dispose();
	}
    }
}