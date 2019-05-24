

function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    var target = eim.getMapInstance(103000802);
    if (eim.getProperty("2stageclear") != null) {
        pi.getPlayer().changeMap(target, target.getPortal("st00"));
        return true;
    } else {
        pi.playerMessage(5, "现在还不能进入下一阶段。");
        return false;
    }
}
