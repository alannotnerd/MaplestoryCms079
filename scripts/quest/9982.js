importPackage(net.sf.cherry.client);

var status = -1;

function start(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			qm.sendNext("��ã����Ƿ��������˼Ѽѡ�ð�յĵ�5�����գ�����������Ը�����һ��μ�5��������");
		} else if (status == 1) {
			qm.sendNextPrev("������������5��������ʲô�����Ǻ���һ����������Ļ�������տ������򣬲�����Ϩ���ʱ���һ��������⣬Ȼ�󽻸��㡣");
		} else if (status == 2) {
			qm.sendAcceptDecline("Ϊ����һ��...���ص������ִ������Ůʿѧϰ����������ķ�������ֻҪ��#b30����#k�ڱ��ܺ����򣬲�����Ϩ��Ϳ��ԡ��һ������õ��⣬Ȼ���͸���һ�顣�Ѽ���5�鵰���ֻ�󣬾���ƴ��һ�������⡣��ô��������μ���");
		} else if (status == 3) {
			if (!qm.haveItem(3994086)) {
				qm.gainItem(3994086, 1);
			}
			qm.sendOk("����ѵõ��ĵ���ŵ�������...������������������������һ�ŷ�Ҷ�������õģ�30���Ӻ��һ����һ�鵰�⡣");
			qm.forceCompleteQuest(9982);
			qm.dispose();
		}
	}
}
