function enter(pi) {
    var em = pi.getEventManager("Romeo");
    if (em != null && em.getProperty("stage1").equals("1")) {
	if (pi.getMonsterCount(926100001) <= 0){
		pi.spawnMobOnMap(9300145,40,-886,202,926100001); 
	}	
	if(pi.isLeader()){
		pi.givePartyExp(50000);
		pi.warpParty(926100001);
	}else{
        pi.playerMessage(5, "队长进入！");
	}
      //  pi.warp(926100001, 0);
		//pi.warpParty(926100001);
    } else {
        pi.playerMessage(5, "传送门尚未打开。");
    }
}
