/* The five caves
 * @author Jvlaple
 */
importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.tools);

function enter(pi) {
	if (pi.getPlayer().getMapId() == 240050101) {
		var nextMap = 240050102;
		var eim = pi.getPlayer().getEventInstance()
		var target = eim.getMapInstance(nextMap);
		var targetPortal = target.getPortal("sp");
		// only let people through if the eim is ready
		var avail = eim.getProperty("2stageclear");
		if (avail == null) {
			// do nothing; send message to player
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "This door is closed."));
			return false;
		}else {
			pi.getPlayer().changeMap(target, targetPortal);
			return true;
		}
	}
	else if (pi.getPlayer().getMapId() == 240050102) {
		var nextMap = 240050103;
		var eim = pi.getPlayer().getEventInstance()
		var target = eim.getMapInstance(nextMap);
		var targetPortal = target.getPortal("sp");
		// only let people through if the eim is ready
		var avail = eim.getProperty("3stageclear");
		if (avail == null) {
			// do nothing; send message to player
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "This door is closed."));
			return false;
		}else {
			pi.getPlayer().changeMap(target, targetPortal);
			return true;
		}
	}	
	else if (pi.getPlayer().getMapId() == 240050103) {
		var nextMap = 240050104;
		var eim = pi.getPlayer().getEventInstance()
		var target = eim.getMapInstance(nextMap);
		var targetPortal = target.getPortal("sp");
		// only let people through if the eim is ready
		var avail = eim.getProperty("4stageclear");
		if (avail == null) {
			// do nothing; send message to player
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "这个门是关闭的。"));
			return false;
		}else {
			pi.getPlayer().changeMap(target, targetPortal);
			return true;
		}
	}
	else if (pi.getPlayer().getMapId() == 240050104) {
		var nextMap = 240050105;
		var eim = pi.getPlayer().getEventInstance()
		var target = eim.getMapInstance(nextMap);
		var targetPortal = target.getPortal("sp");
		// only let people through if the eim is ready
		var avail = eim.getProperty("5stageclear");
		if (avail == null) {
			// do nothing; send message to player
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "This door is closed."));
			return false;
		}else {
			pi.getPlayer().changeMap(target, targetPortal);
			return true;
		}
	}
	else if (pi.getPlayer().getMapId() == 240050105) {
		if (pi.haveItem(4001091, 6) && pi.isLeader()) {
			pi.gainItem(4001091, -6);
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "The six keys break the seal for a flash..."));
			pi.warp(240050100, "st00");
			return true;
		} else {
			pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "Horntail\'s Seal is blocking this door."));
			return false;
		}
	}
	return true;
}
