var baseid = 106021000;
var dungeonid = 106021001;
var dungeons = 10;

function enter(pi) {
    if (pi.getPlayer().getMapId() == baseid) {
        for (var i = 0; i < dungeons; i++) {
            if (pi.getMap(dungeonid + i).getCharactersSize() == 0) {
                pi.warp(dungeonid + i, 0);
                return true;
            }
        }
        pi.playerMessage(5, "All of the Mini-Dungeons are in use right now, please try again later.");
        return false;
    } else {
        pi.warp(baseid, "in00");
    }
    return true;
}