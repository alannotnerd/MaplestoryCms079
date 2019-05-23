//家族传送
//CherryMS LoveMXD

function enter(pi) {
        if (pi.getPlayer().getEventInstance() == null) {
                pi.warp(101030104);
                return true;
        }
        else {
                if (pi.getPlayer().getEventInstance().getProperty("canEnter").equals("false")) {
                        pi.warp(990000100);
                        return true;
                }
                else { //cannot proceed while allies can still enter
                        pi.playerMessage("这个大门还没打开。");
                        return false;
                }
        }
}
