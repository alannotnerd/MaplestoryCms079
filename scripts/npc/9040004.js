function start() {
	//cm.sendSimple("<3 <3");
	cm.sendSimple("#b��� #k#h  ##e  #b��������ϵͳ.#k\r\n#L0##r��������\n\#l\r\n#L1##g�������\n\#l\r\n#L2##b�������#l");//\r\n#L2##b�������#l
}

function action(mode, type, selection) {
	cm.dispose();
	if (selection == 0) {	
	cm.displayGuildRanks();
	cm.dispose();
	}
	else if (selection == 1) {
	cm.showlvl();
	cm.dispose();
	}
	else if (selection == 2) {
	cm.showmeso();
	cm.dispose();
	}
}
