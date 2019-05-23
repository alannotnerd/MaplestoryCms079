importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.tools);

/*
    扎门脚本
    CherryMS LoveMXD
    非同意内禁止转载
*/

function enter(pi) {
	var nextMap = 211042400;
//	if (pi.getQuestStatus(100200) != net.sf.cherry.client.MapleQuestStatus.Status.COMPLETED) {
//		// do nothing; send message to player
//		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "你还没有准备好面对强大的大怪物!"));
//		return false;
//	}
//	else
        if (!pi.haveItem(4001017)) {
		// 如果没有火焰的眼睛。
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6,"你的身上没有火焰的眼,所以你不能进入。"));
		return false;
	}
	else{
		pi.warp(nextMap,"west00");
		return true;
	}
}
