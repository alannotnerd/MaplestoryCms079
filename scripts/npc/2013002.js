function action(mode, type, selection) {
    var em = cm.getEventManager("OrbisPQ");
    if (em == null) {
        cm.dispose();
        return;
    }
    for (var i = 4001044; i < 4001064; i++) {
        cm.removeAll(i); //holy
    }
    switch (cm.getMapId()) {
    case 920010100:
        //center stage, minerva warps to bonus
        //em.setProperty("done", "1");
		cm.givePartyExp(300000);
        //cm.givePartyExp_PQ(120, 1.0);
        cm.warpParty(920011100);
        break;
    default:
        if (!cm.canHold(4001158, 1)) {
            cm.sendOk("Please make one ETC room.");
            cm.dispose();
            return;
        }
if(cm.haveItem(4031326,1)){//有财神的信件的玩家，可以获得斗神证物
	cm.gainItem(4310015,+1);}
        cm.gainItem(4001158, 1);//女神的羽毛
        cm.gainItem(4001322, 2);//蓝宝石
        cm.getPlayer().endPartyQuest(1203); //might be a bad implentation.. incase they dc or something
        //cm.gainNX(100);
        cm.warp(200080101);
        //cm.addTrait("will", 50);
        //cm.addTrait("charm", 10);
        break;
    }
    cm.dispose();
}