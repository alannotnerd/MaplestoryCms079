function enter(pi) {
    if (pi.getMap().getAllMonstersThreadsafe().size() == 0) {
		  if (pi.isLeader()) {
		pi.givePartyExp(40000);
		  pi.warpParty(925100400); //next
        } else {
            pi.playerMessage(5, "not");
		  }
    } else {
        pi.playerMessage(5, "The portal is not opened yet.");
    }
}