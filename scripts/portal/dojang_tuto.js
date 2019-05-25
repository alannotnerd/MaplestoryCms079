importPackage(net.sf.cherry.tools);

function enter(pi) {
    if (pi.getPlayer().getMap().getMonsterById(9300216) != null) {
        pi.getPlayer().enteredScript("dojang_Msg", pi.getPlayer().getMap().getId());
		pi.getPlayer().setMojoTime(1);
        pi.warp(925020001, 0);
    } else {
        pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "So Gong: Haha! You're going to run away like a coward? I won't let you get away that easily!"));
    }
    return true;
}  
