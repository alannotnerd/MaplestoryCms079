var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.sendOk("...");
        cm.dispose();
        return;
    }
    if (em.getProperty("stage").equals("1")) {
        cm.sendOk("���һ�����ɵ���ı�����ǲ����ܵġ�");
        em.setProperty("stage", "2");
    } else if (em.getProperty("stage").equals("2") && cm.getMap().getAllMonstersThreadsafe().size() == 0) {
	cm.mapMessage(6, "ʵ��������ѿ���!");
        em.setProperty("stage4", "2");
        cm.getMap().setReactorState();
    } else {
        cm.sendOk("...���й���û����");
    }
    cm.dispose();
}