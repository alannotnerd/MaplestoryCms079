var status = -1;
function start() {
    if((cm.getPlayer().getLevel() < 19 || cm.getPlayer().getLevel() > 30) && !cm.getPlayer().isGM()){
        cm.sendNext("�����Ҫ�μӾ���������ĵȼ�������20��~29����");
        cm.dispose();
        return;
    }
    action(1,0,0);
}

function action(mode, type, selection){
    status++;
    if (status == 4){
        cm.saveLocation("ARIANT");
        cm.warp(980010000, 3);
        cm.dispose();
    }
    if(mode != 1){
        if(mode == 0 && type == 0)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0)//
        cm.sendNext("����ð�յ���Ϊ��ΰ���ð�ռҳﻮ��һ����, ������Ϊ #b���ﰲ�ؾ�������ս#k.");
    else if (status == 1)
        cm.sendNextPrev("���ﰲ�ؾ�������ս����һ�������ս�����ܹ�������. ���ⳡ�����У����Ŀ�겻��Ҫ��ɱ����;  �෴������Ҫ #beliminateһ������HP�ӹ��������������б�ʯ#k. #b�������������鱦��ս������Ӯ�þ���.#k");
    else if (status == 2)
        cm.sendSimple("�������һ����ǿ���¸ҵ�սʿ #bPerion#k, �赸��ħ���ѵ����Ȼ������뵽��������ս����Ȥ��?!\r\n#b#L0# �Һ�Ը��μ����ΰ��ı���.#l");
    else if (status == 3)
        cm.sendNext("�ðɣ�������Ҫ����ȥս�������뿴�����ʤ��");
}