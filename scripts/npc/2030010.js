/* Amon
 * Last Mission : Zakum's Altar (280030000)
 */

function start() {
    cm.sendYesNo("����������뿪���㽫���ò����¿�ʼ����ȷ��Ҫ�뿪���ﵽ����ȥ��");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.warp(211042200);
    }
    cm.dispose();
}