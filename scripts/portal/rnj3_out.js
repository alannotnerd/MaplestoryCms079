function enter(pi) {
    var em = pi.getEventManager("Romeo");
    if (em != null && em.getProperty("stage4").equals("2")) {
	if(pi.isLeader()){
		pi.givePartyExp(50000);
		pi.warpParty(926100203);
	}else{
        pi.playerMessage(5, "�ӳ����룡");
	}
       // pi.warp(926100203, 0);
    } else {
        pi.playerMessage(5, "��������δ�򿪡�");
    }
}
