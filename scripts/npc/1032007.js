var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("���,������ͷ����Ա�����������뿪ά�����ǵ��ǵ����֮����? ����վ������˹��½��#b���֮��#k�Ĵ�ֻ\r��Ҫ����#b"+cost+" ���#k ����#b#t4031045##k �ſ�������.");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("����һЩ���õĸ������޷���԰�?");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("�������� #b"+cost+" ���#k? ����еĻ�,��Ȱ�����������������λ���Ƿ���û������.");
                cm.dispose();
            }
        }
    }
}
