/*
    ���͵�703000001 - 2022��Ҷ�� - ��ռ��� ��Ҷ��
*/

function enter(pi) {
    if (pi.getQuestStatus(56203) != 1) {
        pi.topMessage("Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
        pi.playerMessage( - 9, "Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
        return false;
    }
//pi.playPortalSE();
    pi.warp(703000001, 0);
    return true;
}