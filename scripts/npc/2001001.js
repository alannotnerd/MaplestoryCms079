/*
 *  Branch Bucket Snowman - Happy Ville NPC
 */

function start() {
    cm.sendSimple("���� ���� #p2001001# ��Ҫȥ�ĸ�С����? PS�ɽ��ͬ�� \n\r #b#L0#�¹�ɭ��1#l \n\r #L1#�¹�ɭ��2#l \n\r #L2#�¹�ɭ��3#l \n\r #L3#�¹�ɭ��4#l \n\r #L4#�¹�ɭ��5#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.warp(209000001 + selection, 0);
    }
    cm.dispose();
}
