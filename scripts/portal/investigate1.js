//笔芯制作
importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.tools);

function enter(pi) {
	if (pi.isQuestFinished(2314)){//如果完成了这个任务
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "感觉到了很大的魔法气息，但是内务大臣说没有什么问题。"));
		return false;
	}else if (!pi.isQuestActive(2314)) {//如果没有接这个任务
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "感觉到了很大的魔法气息，但是好像找不到是哪里发出的，内务大臣好像知道点什么事情。"));
		return false;
	}else if (!pi.isQuestFinished(2314)){//如果还没有完成任务。
		pi.updateQuest(2314, "1");
		//pi.startQuest(2314)
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "感觉到了很大的魔法气息，回去向内务大臣禀报！"));
		return false;
	}else{
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "感觉到了很大的魔法气息。但是不知道是从哪里发出来的。"));
		return false;
	}
}
