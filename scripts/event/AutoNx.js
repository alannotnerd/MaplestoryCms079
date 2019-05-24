var setupTask;

function init() {
	scheduleNew();
}

function scheduleNew() {
	var cal = java.util.Calendar.getInstance();
	var nextTime = cal.getTimeInMillis();
	while (nextTime <= java.lang.System.currentTimeMillis()) {
		nextTime += 30000;
	}
	setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function start() {
	scheduleNew();
	em.getChannelServer().AutoNx(1);
} 