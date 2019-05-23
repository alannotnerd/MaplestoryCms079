function act() {
	rm.mapMessage("A baby dragon has hatched from within the egg.");
	rm.spawnNpc(2081008, rm.getPlayer());
	rm.createMapMonitor(rm.getPlayer().getMap().getId(), false, 0, "", 0, -1, 1000 * 60 * 3);
	rm.getPlayer().getMap().broadcastMessage(net.sf.cherry.tools.MaplePacketCreator.getClock(180));
	rm.setTimeOut(1000 * 60 * 3, 240040610);
}
