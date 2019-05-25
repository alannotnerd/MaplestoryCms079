importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.tools);
function enter(pi) {
  if(pi.getPlayer().getMap().mobCount() < 1 || pi.getPlayer().getMap().getMonsterById(9300216) != null ){	 
  	if(Math.floor(pi.getPlayer().getMap().getId() / 100) % 100 != 38){
			var charcount = pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).getCharacters().size();      	
			if (charcount < 1){
			pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).killAllMonsters();  //杀下一地图怪
			pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).resetReactors();
			pi.getPlayer().getMap().clearDrops(pi.getPlayer() ,false);
			pi.getPlayer().getMap().killAllMonsters();  //杀当前地图怪
			pi.getPlayer().getMap().resetReactors();		
	  }	
  }
	else{
		pi.warp(925020003);
		pi.getPlayer().setDojoPoints(pi.getPlayer().getDojoPoints() + Math.ceil((Math.floor(pi.getPlayer().getMap().getId() / 100) % 100)/6)+ 1);
  	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "你获得 " + (Math.ceil((Math.floor(pi.getPlayer().getMap().getId() / 100) % 100)/6)+ 1) +" 点修炼积分,你的总修练积分为 "+ pi.getPlayer().getDojoPoints() +" 分"));
		pi.showInstruction("您已成功通关。祝您游戏愉快!亲亲嘴冒险--芯碎王子制作 QQ:7851103", 250, 20);
		pi.getPlayer().saveToDB(true);
		return true;
	}
	pi.getPlayer().setDojoPoints(pi.getPlayer().getDojoPoints() + Math.ceil((Math.floor(pi.getPlayer().getMap().getId() / 100) % 100)/6)+ 1);
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "你获得 " + (Math.ceil((Math.floor(pi.getPlayer().getMap().getId() / 100) % 100)/6)+ 1) +" 点修炼积分,你的总修练积分为 "+ pi.getPlayer().getDojoPoints() +" 分"));
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.updateDojoStats(pi.getPlayer(),1));
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.dojoWarpUp());
  var reactor = pi.getPlayer().getMap().getReactorByName("door");
  reactor.delayedHitReactor(pi.getC(), 800);
	pi.getPlayer().saveToDB(true);
  return true;
  } else {
  	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "还有怪物没有消灭。" ));
  }
    return false;
}  
