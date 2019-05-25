var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status != 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == -1) {
        cm.sendNext("#b（怎麼可能…再怎麼說潘也不會躲到裡面去的…是吧？）#k");
        cm.dispose();
    } else if (status == 0) {
        cm.sendYesNo("#b（看見可疑的洞口，不知道潘是不是跑進去裡面了。要進去看看嗎？）#k");
    } else if (status == 1) {
        cm.gainExp(35);
        cm.warp(931000010, 0);
        cm.dispose();
    }
}