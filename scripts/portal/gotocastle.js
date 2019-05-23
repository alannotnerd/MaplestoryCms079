importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.tools);

function enter (pi){
	if (pi.isQuestFinished(2322)){//如果完成了这个任务
		pi.warp(106020500)
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "身边感觉到一阵光，发现自己的位置发现了变化。"));
	}else if (!pi.isQuestActive(2322)) {//如果没有接这个任务
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "未知的力量阻挡着你的前进。"));
		return false;
	}else{
		pi.warp(106020500)
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "身边感觉到一阵光，发现自己的位置发现了变化。"));
		return false;
	}
}
