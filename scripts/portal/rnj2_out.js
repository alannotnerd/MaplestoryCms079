function enter(pi) {
    var em = pi.getEventManager("Romeo");
    if (em != null && em.getProperty("stage3").equals("3")) {
	if(pi.isLeader()){
		pi.givePartyExp(50000);
		pi.warpParty(926100200);
	}else{
        pi.playerMessage(5, "�ӳ����룡");
	}
        //pi.warp(926100200, 0);
    } else {
        pi.playerMessage(5, "��������δ�򿪡�");
    }
}
