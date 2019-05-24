var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendOk("是位新的旅行者吧？還很陌生吧？我是瑪麗亞，打開(快捷鍵W)就可以查看所有楓之谷世界的所有地圖");
            qm.gainExp(11);
	    qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}