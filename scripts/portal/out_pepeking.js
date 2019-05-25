importPackage(net.sf.cherry.scripting.npc);

function enter(pi) {
	NPCScriptManager.getInstance().start(pi.getC(), 1300012);
    //pi.warp(106021400,"TD_MC_enterboss1");
	return false;
}
