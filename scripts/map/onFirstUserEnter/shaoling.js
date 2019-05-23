/*
	亲亲嘴冒险专用脚本
	 少林妖僧
	by芯碎王子
	QQ:7851103
*/

importPackage(net.sf.cherry.server.life);
importPackage(net.sf.cherry.tools);
importPackage(java.awt);
function start(ms) {	
		var mob = MapleLifeFactory.getMonster(9600025);
		var pMap = ms.getPlayer().getMap();
		if(pMap.mobCount() > 0){
			pMap.killAllMonsters();
		}
		
		pMap.addMapTimer(600, pMap.getReturnMapId());
       		pMap.spawnMonsterWithEffect(mob, 15, new Point(140, 0)); 
	
}