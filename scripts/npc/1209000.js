var status = -1;


function action(mode, type, selection) {
    if (cm.getQuestStatus(21002) == 0) {
	if (mode == 1) {
	    status++;
	} else {
	    status--;
	}
	if (status == 0) {
	    cm.sendNext("�����ˣ�#b������ʿ#k ���˵��˿ڻ����𣿣�ʲô����˵���������");
	} else if (status == 1) {
	    cm.sendNextPrev("���ѵ�׼�������������ˡ����Դ��ص���ȫ���������˷����ˡ������������ڼ���������ػ���û��ʲô�õ��ĵġ�����ֻҪ��ʰ�þͻ�����ǰ��ά�����Ǹۡ�");
	} else if (status == 2) {
	    cm.sendNextPrev("������ʿ��ͬ����...? ����... ȥ�Һ�ħ��ʦ�ˡ� ���������ѵ��ڼ����ֹ�ڷ�ʦ. ʲô? ����ҲҪȥ�Һ�ħ��ʦ�� ���У� �㲻���������� ������һ�������ɣ�");
	} else if (status == 3) {
	    cm.forceStartQuest(21002, "1");
	    // Ahh, Oh No. The kid is missing
	    cm.showWZEffect("Effect/Direction1.img/aranTutorial/Trio");
	    cm.dispose();
	}
    } else {
	if (mode == 1) {
	    status++;
	} else {
	    status--;
	}
	if (status == 0) {
	    cm.sendSimple("����ܽ���������֪��ʲô�� \r #b#L0#��ħ��ʦ��#l \r #b#L1#����׼����#l \r #b#L2#ͬ���ǣ�#l");
	} else if (status == 1) {
	    switch (selection) {
		case 0:
		    cm.sendOk("��˵��ħ��ʦ���ڲ�Զ������Ϊ��Ϊ��ħ��ʦ���µ���Ⱥ�赲�������޷�ͨ��ɭ�֡��������Ǵ�����������������ֻ�ܷ���ά�����ǵ�����...");
		    break;
		case 1:
		    cm.sendOk("���Ѽ����������ˡ����Դ��ص���ȫ�����Ϸ����ˡ�����ֻʣ�¼����˴�˺�Ϳ��Գ���ǰ��ά�����ǵ������޴�Ӧ�����������е�����赲���еĹ���...û���˻��������ػ�����...");
		    break;
		case 2:
		    cm.sendOk("���ͬ��... �����Ѿ�ȥ�Һ�ħ��ʦ�ˡ� ����˵Ҫ������ȥ���ѵ��ڼ���ֹ��ħ��ʦ...��˵��Ϊ�������ˣ����Բ�����ȥ���Ⱥ��Ӷ��ȳ�������Ҳ������һ�����߰ɣ� ������ʿ��");
		    break;
	    }
	    cm.safeDispose();
	}
    }
}