/*
 *  Metal Bucket Snowman - Happy Ville NPC
 */

function start() {
    cm.sendSimple("���� ���� #p2001002# ��Ҫȥ�ĸ�С����? PS�ɽ��ͬ�� \n\r #b#L0#�¹�ɭ��6#l \n\r #L1#�¹�ɭ��7#l \n\r #L2#�¹�ɭ��8#l \n\r #L3#�¹�ɭ��9#l \n\r #L4#�¹�ɭ��10#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.warp(209000006 + selection, 0);
    }
    cm.dispose();
}
