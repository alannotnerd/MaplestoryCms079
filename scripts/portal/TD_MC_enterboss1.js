importPackage(net.sf.cherry.scripting.npc);

var dungeonid = 106021500;
var dungeons = 10;

function enter(pi) {
	for(var i = 0; i < dungeons; i++) {
		if (pi.getPlayerCount(dungeonid + i)== 0) {
			pi.warp(dungeonid + i, "out01");
			/*
			pi.spawnMonster(dungeonid + i, 3300000, 10, -56, -68);  //得意的蘑菇仔
			pi.spawnMonster(dungeonid + i, 3300001, 10, -56, -68);  //紫色毒蘑菇
			pi.spawnMonster(dungeonid + i, 3300002, 10, -56, -68);  //中毒的猪猪
			pi.spawnMonster(dungeonid + i, 3300003, 10, -56, -68);  //戴头盔的企鹅兵
			pi.spawnMonster(dungeonid + i, 3300004, 10, -56, -68);  //亲卫队企鹅兵
			pi.spawnMonster(dungeonid + i, 3300005, 10, -56, -68);  //灰雪人与企鹅王			
			pi.spawnMonster(dungeonid + i, 3300006, 10, -56, -68);  //金雪人与企鹅王
			pi.spawnMonster(dungeonid + i, 3300007, 10, -56, -68);  //白雪人与企鹅王
			*/
			pi.spawnMonster(dungeonid + i, 3300008, 1, -56, -68);  //蘑菇大臣
			return true;
		}
	}
	pi.playerMessage(5, "所有的房间都被玩家占用了，请稍后再试！");
	return false;
}