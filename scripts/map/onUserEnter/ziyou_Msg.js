//CherryMS LoveMXD
var messages = Array("地图公告1【修改路径Script/map/onUserEnter/ziyou_Msg】", "地图公告2【修改路径Script/map/onUserEnter/ziyou_Msg】", "地图公告3【修改路径Script/map/onUserEnter/ziyou_Msg】");

function start(ms) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120025);
	
}
