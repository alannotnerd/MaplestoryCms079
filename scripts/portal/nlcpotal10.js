/*
    ���͵�703000000 - 2022��Ҷ�� - ���ƻ��� ��Ҷ��
*/

function enter(pi) {
    switch (pi.getMapId()) {
    case 600000000:
        if (pi.getQuestStatus(56200) == 2) { //��Ҷ��-�����ֵ� - ��Ҷ��-��������
            pi.warp(703000000, 0);
        } else {
            pi.topMessage("Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
            pi.playerMessage( - 9, "Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
        }
        break;
    case 703000001:
        if (pi.getQuestStatus(56203) == 2) { //2022��Ҷ�� - ��ռ��� ��Ҷ��
            pi.warp(703000000, 0);
        } else {
            pi.topMessage("Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
            pi.playerMessage( - 9, "Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
        }
        break;
    default:
        pi.topMessage("Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
        pi.playerMessage( - 9, "Ŀǰ�޷����룬������Ǻ�δ������Ҷ����ĳ����ϵ");
        break;
    }
}