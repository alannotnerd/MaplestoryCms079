var ��ɫ��ͷ = "#fUI/UIWindow/Quest/icon2/7#";
var ��ɫ��ͷ = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
function start() {

    if (cm.getChar().getMapId() != 209000015) {
        cm.sendSimple("#b���������ɲ鿴��\r\n\r\n\r\n#L0#"+��ɫ��ͷ+"�������а�#l\t\t\t#L1#"+��ɫ��ͷ+"�ȼ����а�#l  \r\n#r#L2#"+��ɫ��ͷ+"�������а�#l  \t\t\t#L10#"+��ɫ��ͷ+"������а�#l\r\n\r\n");
    } else {
        cm.sendOk("��Ҫ�������ͼʹ����")
    }
}
function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) { //��������
        cm.�������а�();
        cm.dispose();
    } else if (selection == 1) {
        //Level
        cm.displayLevelRanks();
        cm.dispose();
    } else if (selection == 2) {
        //MapGui
        cm.displayGuildRanks();
        cm.dispose();
    } else if (selection == 10) {
        //MapGui
        cm.�������();
        cm.dispose();

    }
}