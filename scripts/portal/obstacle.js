importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.net.channel);
importPackage(net.sf.cherry.tools);

function enter(pi){
	if (pi.haveItem(2430014,1)){//奇拉蘑菇孢子
		pi.warp(106020400)
		return false;
	}else if (pi.haveItem(4000507,1)){ //蘑菇的毒孢子
		pi.warp(106020400)
		pi.gainItem(4000507,-1)
		return false;
	}else{
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "未知的力量阻挡着你的前进。"));
		return false;
	}
}