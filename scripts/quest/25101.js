function start(mode, type, selection) {
    //qm.completeQuest();
    qm.getPlayer().dropMessage(5, "test");
    qm.dispose();
}

function end(mode, type, selection) {
    qm.completeQuest();
    //qm.getPlayer().dropMessage(5, "test");
    qm.dispose();
}