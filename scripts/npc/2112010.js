var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.sendOk("...");
        cm.dispose();
        return;
    }
    if (em.getProperty("stage").equals("1")) {
        cm.sendOk("干嘛。一个可疑的阴谋？这是不可能的…");
        em.setProperty("stage", "2");
    } else if (em.getProperty("stage").equals("2") && cm.getMap().getAllMonstersThreadsafe().size() == 0) {
	cm.mapMessage(6, "实验室入口已开启!");
        em.setProperty("stage4", "2");
        cm.getMap().setReactorState();
    } else {
        cm.sendOk("...还有怪物没消灭！");
    }
    cm.dispose();
}