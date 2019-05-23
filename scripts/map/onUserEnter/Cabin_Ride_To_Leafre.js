//CherryMS LoveMXD
var messages = Array("地图公告1【修改路径Script/map/onUserEnter/Cabin_Ride_To_Leafre.js】", "地图公告2【修改路径Script/map/onUserEnter/Cabin_Ride_To_Leafre.js】", "地图公告3【修改路径Script/map/onUserEnter/Cabin_Ride_To_Leafre.js】");

function start(ms) {
		ms.getPlayer().startMapEffect(messages[Math.floor(Math.random()*messages.length)], 5120025);
	
}
