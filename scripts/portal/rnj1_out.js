function enter(pi) {
    if (pi.getMap().getAllMonstersThreadsafe().size() == 0) {
	if(pi.isLeader()){
		pi.givePartyExp(50000);
		pi.warpParty(926100100);
	}else{
        pi.playerMessage(5, "�ӳ����룡");
	}
       // pi.warp(926100100, 0);
    } else {
        pi.playerMessage(5, "��������δ�򿪡�");
    }
}
