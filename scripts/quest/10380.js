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
			qm.sendNext("��ã���֪��ս��ص�ð�յ��������Ϣ����Ϊ�˻�ӭս��Ĺ�����ð�յ���ӪԱ�͵ȴ�ս���������Ů����׼�����ر�����");
		} else if (status == 1) {
			qm.sendNextPrev("#v1112405# ȫ���� + 3  ������ +3  ħ�� +3  HP +30  MP +30 \r\n\r\nս��ﵽ70��תְʱ�����ջ���Լ��İ��Ľ�ָ��Ϊ�����͸�����");
		} else if (status == 2) {
			qm.sendNextPrev("ԭ�����޷���������Ʒ���������Ļ���ս�����������ְҵ���޷�ʹ���ˡ������ҽ��������⴦��");
		} else if (status == 3) {
			qm.sendNextPrev("�����յĽ�ָ�����˿������ʺ����ƶ�����Ʒ����Ȼ���ܺ�������ҽ��ף������Է��ڲֿ��ת�Ƹ�ͬһ�ʺ��µ�������ɫ��");
		} else if (status == 4) {
			qm.sendAcceptDecline("���ˣ����������");
		} else if (status == 5) {
			qm.gainItem(2031008, 1);
			qm.forceCompleteQuest(10380);
			qm.sendNext("������һ������ƶ�ȯ����������ֱ���ƶ����������ڵĴ�ׯ����������Ϊս�񣬴ﵽ70��֮�󣬾Ϳ���ʹ�����ˡ�");
		} else if (status == 6) {
			qm.sendPrev("ϣ��ս��Ĺ��������Ը�ð�յ�����������˴���ϲ�á�");
			qm.dispose();
		} 
	}
}
