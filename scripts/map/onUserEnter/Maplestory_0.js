//CherryMS LoveMXD
var messages = Array("地图公告1【修改路径Script/map/onUserEnter/Maplestory_0】", "地图公告2【修改路径Script/map/onUserEnter/Maplestory_0】", "地图公告2【修改路径Script/map/onUserEnter/Maplestory_0】");

function start(ms) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120025);
	
}
