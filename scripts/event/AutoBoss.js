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
	var random = java.lang.Math.floor(Math.random() * 3 + 1);//���Ƶ��1-3Ƶ��
	var mobsl = java.lang.Math.floor(Math.random() * 5 + 2);//���Ƶ��1-3Ƶ��
var mapid = java.lang.Math.floor(Math.random() * 4 + 1);//�����ͼһ��4����ͼ ����� ���� ���� ��ʿ
var BOSS = java.lang.Math.floor(Math.random() * 4 + 1);//�������BOSS	1-4��ѡ�����
var �����ʱ�� = 0;//19 = 19��
var �����ʱ�� = 10;//��ѡ����Ч��Ҳ���޸ģ�
var ����Ѫ��;
var bossid;
	if(BOSS <= 1){
		 bossid = 9302000;
		����Ѫ�� = 10000000;
	}else if(BOSS == 2){
		 bossid = 9302000;
		����Ѫ�� = 10000000;
	}else if(BOSS == 3){
		 bossid = 9302000;
		����Ѫ�� = 10000000;
	}else if(BOSS >= 4){
		 bossid = 9302000;
		����Ѫ�� = 10000000;
	}
	if(mapid <= 1){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,100000000,�����ʱ��,�����ʱ��,bossid,0,0,����Ѫ��);
	}
	}else if(mapid == 2){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,102000000,�����ʱ��,�����ʱ��,bossid,0,0,����Ѫ��);
	}
	}else if(mapid == 3){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,103000000,�����ʱ��,�����ʱ��,bossid,0,0,����Ѫ��);
	}
	}else if(mapid >= 4){
	for (var x = 0; x < mobsl; x++) {
    em.getChannelServer().AutoBoss(random,104000000,�����ʱ��,�����ʱ��,bossid,0,0,����Ѫ��);
	}
	}
}