var setupTask;

function init() {
	scheduleNew();
}

function scheduleNew() {
	setupTask = em.schedule("start", 1000 * 60*3);
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function start() {
	scheduleNew();
var Message = new Array("豆豆冒险岛欢迎你",
"温馨提醒：豆豆冒险岛的商城是禁止转物品的，否则背包物品可能失效",
"每周五晚，市场会举行线上活动，周6和周日晚开放双倍经验",
"游戏内大家如果遇见什么问题，可以私聊我们的群管理，充值赞助请认准群主",
"豆豆冒险岛招收给力YY主播，要求：直播不卡，每天直播时间4小时以上且有麦解说",
"豆豆冒险岛欢迎你",
"温馨提醒：豆豆冒险岛的商城是禁止转物品的，否则背包物品可能失效");
em.getChannelServer().broadcastPacket(net.sf.cherry.tools.MaplePacketCreator.serverNotice(0,Message[Math.floor(Math.random() * Message.length)]));
}
