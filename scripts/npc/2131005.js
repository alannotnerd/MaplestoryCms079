var status = -1;

var exchangeItem = 4000436;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("I wish I had something to hold this water in...#b\r\n#L0#Hey, take these snail shells. You can hold your water with these.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("You don't have enough... I need at least 100.");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("Hey, that's a good idea! I can give you #i4310000#Perfect Pitch for each 100 #i" + exchangeItem + "##t" + exchangeItem + "# you give me. How many do you want? (Current Items: " + cm.getPlayer().itemQuantity(exchangeItem) + ")", java.lang.Math.min(300, cm.getPlayer().itemQuantity(exchangeItem) / 100), 1, java.lang.Math.min(300, cm.getPlayer().itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.getPlayer().itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("Please make some space in ETC tab.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("Thanks!");
	    }
	}
        cm.dispose();
    }
}