var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 2000 * 60 * 60;
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
	var random = java.lang.Math.floor(Math.random() * 3 + 1);//随机频道1-3频道
	var mobsl = java.lang.Math.floor(Math.random() * 5 + 2);//随机频道1-3频道
var mapid = java.lang.Math.floor(Math.random() * 4 + 1);//随机地图一共4个地图 明珠港 射手 废弃 勇士
var BOSS = java.lang.Math.floor(Math.random() * 4 + 1);//随机设置BOSS	1-4个选项随机
var 活动开启时间 = 0;//19 = 19点
var 活动限制时间 = 10;//此选项无效。也别修改！
var 怪物血量;
var bossid;
	if(BOSS <= 1){
		 bossid = 9302000;
		怪物血量 = 10000000;
	}else if(BOSS == 2){
		 bossid = 9302000;
		怪物血量 = 10000000;
	}else if(BOSS == 3){
		 bossid = 9302000;
		怪物血量 = 10000000;
	}else if(BOSS >= 4){
		 bossid = 9302000;
		怪物血量 = 10000000;
	}
	if(mapid <= 1){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,100000000,活动开启时间,活动限制时间,bossid,0,0,怪物血量);
	}
	}else if(mapid == 2){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,102000000,活动开启时间,活动限制时间,bossid,0,0,怪物血量);
	}
	}else if(mapid == 3){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,103000000,活动开启时间,活动限制时间,bossid,0,0,怪物血量);
	}
	}else if(mapid >= 4){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,104000000,活动开启时间,活动限制时间,bossid,0,0,怪物血量);
	}
	}
}