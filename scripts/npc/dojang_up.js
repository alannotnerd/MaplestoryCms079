importPackage(net.sf.cherry.server.maps);
importPackage(net.sf.cherry.tools);
function enter(pi) {
  if(pi.getPlayer().getMap().mobCount() < 1 || pi.getPlayer().getMap().getMonsterById(9300216) != null ){	 
	var charcount = pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).getCharacters().size();      	
	
	if (charcount < 1){
	pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).killAllMonsters();  //杀下一地图怪
	pi.getC().getChannelServer().getMapFactory().getMap(pi.getPlayer().getMapId() + 100).resetReactors();
	pi.getPlayer().getMap().clearDrops(pi.getPlayer() ,false);
	pi.getPlayer().getMap().killAllMonsters();  //杀当前地图怪
	pi.getPlayer().getMap().resetReactors();
	}	
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "你获得 " + pi.getPlayer().addDojoPointsByMap() +" 点修炼积分,你的总修练积分为 "+ pi.getPlayer().getDojoPoints() +" 分"));
	if(pi.getPlayer().getMap().getId() >= 925033800 && pi.getPlayer().getMap().getId() <= 925033809){
		pi.warp(925020003);
		pi.showInstruction("您已成功通关。祝您游戏愉快!亲亲嘴冒险--芯碎王子制作 QQ:7851103", 250, 20);
		return true;
	}

  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.updateDojoStats(pi.getPlayer(),1));
  pi.getPlayer().getClient().getSession().write(MaplePacketCreator.dojoWarpUp());
  var reactor = pi.getPlayer().getMap().getReactorByName("door");
  reactor.delayedHitReactor(pi.getC(), 800);
	pi.getPlayer().saveToDB(true);
  return true;
  } else {
  	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(5, "还有怪物没有消灭。"));
  }
    return false;
}  
