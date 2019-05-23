function enter(pi) {
	pi.getPlayer().saveLocation(net.sf.cherry.server.maps.SavedLocationType.Pachinko_port);
			//pi.playerMessage("入口关闭中.");
                      //return false;	
			pi.warp(809030000, "out00");
			return true;
}