/* �鿴���ﱬ�� */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getMap().getAllMonstersThreadsafe().size() <= 0) {
            cm.sendOk("��ǰ��ͼû��ˢ�¹���޷��鿴���ʡ�");
            cm.dispose();
            return;
        }
        var selStr = "��ѡ����Ҫ�鿴����ı��ʡ�\r\n\r\n#b";
        var iz = cm.getMap().getAllUniqueMonsters().iterator();
        while (iz.hasNext()) {
            var zz = iz.next();
            selStr += "#L" + zz + "##o" + zz + "##l\r\n";
        }
        if (cm.getPlayer().isAdmin()) {
            //selStr += "\r\n#L0# #r�鿴��ͼ����#k#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendNext(cm.checkMapDrop());
        } else {
            cm.sendNext(cm.checkDrop(selection));
        }
        cm.dispose();
    }
}