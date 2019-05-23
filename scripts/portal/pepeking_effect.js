importPackage(net.sf.cherry.scripting.npc);

function enter(pi) {
	NPCScriptManager.getInstance().start(pi.getC(), 1300012);
}