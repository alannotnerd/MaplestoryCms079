importPackage(net.sf.cherry.tools);

function enter(pi) {
    if (pi.getPlayer().getMap().getReactorByName("door").getState() == 1) {
        pi.getPlayer().getMap().resetReactors();
        var temp = (pi.getPlayer().getMapId() - 925000000) / 100; //thanks lailai, you a beast.
        var stage = (temp - (Math.floor(temp / 100) * 100)) | 0; //| 0 converts it from a double to an int. p cool.
        
        if (stage != 38) {
            pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMap().getId() + 100).killAllMonsters(false);
            pi.warp(pi.getPlayer().getMap().getId() + 100, 0);
        } else {
			pi.getPlayer().addMojoCompleted(1);
        	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "You have completed this pq 1 time for a total of "+ pi.getPlayer().getMojoCompleted() +""));
            pi.warp(925020003, 0); //rooftop rofl.
        }
        return true;
    } else {
        pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "The door is not open yet."));
        return false;
    }
}  
