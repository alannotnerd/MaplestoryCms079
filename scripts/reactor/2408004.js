function act() {
	if (rm.haveItem(4001094) && rm.getQuestStatus(3706).equals(net.sf.cherry.client.MapleQuestStatus.Status.STARTED)) {
		rm.gainItem(4001094, -1);
		rm.getPlayer().getMap().getReactorById(2406000).setState(1);
		rm.getPlayer().getMap().getReactorById(2406000).hitReactor(1, 1, rm.getPlayer().getClient());
		rm.getReactor().setState(1);
	}
	else {
		rm.getReactor().setState(0);
	}
}
