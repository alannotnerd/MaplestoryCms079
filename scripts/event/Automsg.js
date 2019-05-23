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
var Message = new Array("欢迎来到冒险岛! 现已加入了玩家工资，玩家上线每天可领取5000商城点券。并开通了转身功能",
"如果有不足的地方请提出来，或者有更好的建议也提出来，!",
"让我们一起拒绝外挂，一起携手打造美好的冒险环境。对于正在使用作弊工具的玩家，我们会对帐号进行封闭，请珍惜帐号!",
"本服已开启扎昆、闹钟、暴力熊、心疤狮王、暗黑龙王、克雷塞尔(大树妖)等BOSS正常召唤。欢迎玩家测试挑战!",
"新增枫叶水晶球副本活动,请找各大城市的星缘!",
"本服为娱乐测试服,GM不出售任何游戏道具、VIP、GM帐号之类的,切勿以现金方式向任何人购买任何道具!",
"为了方便玩家加点,现已增加NPC快速加点洗点功能,需要使用此功能的朋友可到市场找【冒险岛管理员】");
	em.getChannelServer().broadcastPacket(net.sf.cherry.tools.MaplePacketCreator.serverNotice(0,Message[Math.floor(Math.random() * Message.length)]));
}