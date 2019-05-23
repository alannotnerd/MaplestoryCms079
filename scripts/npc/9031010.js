function action(mode, type, selection) {
    if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
        cm.sendProfessionWindow();
    } else {
        cm.playerMessage( - 9, "未学习采药，无法使用。");
    }
    cm.dispose();
}