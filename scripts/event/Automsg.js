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
var Message = new Array("����ð�յ���ӭ��",
"��ܰ���ѣ�����ð�յ����̳��ǽ�ֹת��Ʒ�ģ����򱳰���Ʒ����ʧЧ",
"ÿ�������г���������ϻ����6����������˫������",
"��Ϸ�ڴ���������ʲô���⣬����˽�����ǵ�Ⱥ������ֵ��������׼Ⱥ��",
"����ð�յ����ո���YY������Ҫ��ֱ��������ÿ��ֱ��ʱ��4Сʱ�����������˵",
"����ð�յ���ӭ��",
"��ܰ���ѣ�����ð�յ����̳��ǽ�ֹת��Ʒ�ģ����򱳰���Ʒ����ʧЧ");
em.getChannelServer().broadcastPacket(net.sf.cherry.tools.MaplePacketCreator.serverNotice(0,Message[Math.floor(Math.random() * Message.length)]));
}
