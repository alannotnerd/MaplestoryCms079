function enter(pi) {
    //pi.openNpc(2081005);
    if (pi.haveItem(5220006)) {
        pi.gainItem(5220006, -1);
        pi.warp(240050400);
    } else {
        pi.warp(240040700)
        pi.mapMessage(6, "你没有黑龙入场卷，不能让你进去!请到商城购买!")
    }
}