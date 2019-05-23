/*	
	Author: Traitor
	Map(s):	Cygnus Intro Maps
	Desc:   Sends the disable UI packet, etc.
*/

importPackage(net.sf.cherry.scripting.npc);
importPackage(net.sf.cherry.tools);

function start(ms) {
    var mapid = ms.getPlayer().getMap().getId();
    switch (mapid) {
        case 913040000:
            ms.getClient().getSession().write(MaplePacketCreator.cygnusIntroDisableUI(true));
            ms.getClient().getSession().write(MaplePacketCreator.cygnusIntroLock(true));
        case 913040001:
        case 913040002:
        case 913040003:
        case 913040004:
        case 913040005:
            ms.getClient().getSession().write(MaplePacketCreator.showCygnusIntro(mapid - 913040000));
            ms.getPlayer().setAllowWarpToId(mapid + 1);
            break;
        case 913040006:
            ms.getClient().getSession().write(MaplePacketCreator.cygnusIntroDisableUI(false));
            ms.getClient().getSession().write(MaplePacketCreator.cygnusIntroLock(false));
            ms.getPlayer().setAllowWarpToId(-1);
            NPCScriptManager.getInstance().start(ms.getClient(), 1103005, null, null);
            break;
    }
}
