/*
 *	��˹�� - ����
 */

var status = -1;
var beauty = 0;
var next = true;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("��Ȼ��ϣ�������˺ܶණ���������ڰ�˹�������ܻ�úܶණ�����������Ϊ���Ƕ�ս���Ҿ͸�������Ի����Щ������");
        } else if (status == 1) {
            qm.sendSimple("����֪��ʲô�أ�\r\n\r\n\r\n#b#L0#����֪�����˽�������Щ��#k#l");
        } else if (status == 2) {
            qm.sendSimple("�����¸��˽�����˵˵����֪��ʲô��\r\n\r\n\r\n#b#L0#�����һ������������#k#l\r\n#b#L1#�������Ի�ù�����Ʒʱ����ļ���ң�#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                beauty = 1;
                qm.sendNext("#b��������#k��ָ���������ڵ�������#bÿ�����ɽ���5��#k��ֻҪ��������˹����ʣ���ϣ�����൳�����ܻ������ֵ��");
            } else if (selection == 1) {
                beauty = 2;
                qm.sendNext("#bÿ�տɽ���5��#k��������˹��������ϣ�����൳�Ĺ����У�����Ѫ����èͷӥ�����ػ�������һ�����ʿɻ�ü���ҡ�");
            }
        } else if (status == 4) {
            if (beauty == 1) {
                qm.sendNextPrev("ͨ����������ֵ�����������ȼ���ÿ�ﵽ#b2����30����70��#kʱ�����Ի��һ������������#b���ڸ������������Ļ�ԭ��#k������ÿ�������ȼ�������ʱ���ã�Ҳ����ʹ���ڽ��ս�л�õļ���ҽ��й���");
            } else if (beauty == 2) {
                qm.sendNextPrev("���У�ÿ����������൳ʱ�����Ȱ�����������µ���Ʒ���֡������ǰ�˹����������ᣬҲ�����ǿ��Ըı����������ĸ��ֵȼ��Ļ�ԭ�������⣬����ҩˮ��˹��װ�����Լ���������װ�����䷽�ȸ�����Ʒ������#r�յ����Ȱ��������Ļ�ʱ#k��һ��Ҫȥ��һ����");
            }
            if (!next) {
                status = 5;
            }
        } else if (status == 5) {
            var selStr = "�йظ��˽�����˵����û�н�������֪��ʲô�Ļ����͸���˵��\r\n\r\n\r\n#b"
            if (beauty == 1) {
                selStr += "#L1#�������Ի�ù�����Ʒʱ����ļ���ң�#k#l";
            } else if (beauty == 2) {
                selStr += "#L0#�����һ������������#k#l";
            }
            status = 2;
            next = false;
            qm.sendSimple(selStr);
        } else if (status == 6) {
            qm.sendYesNo("ϣ���ҵ�˵���Ѿ��㹻��ϸ�ˡ���Ҫ���㼸�����������ȡ��׼������");
        } else if (status == 7) {
            qm.gainItem(2700000, 1);
            qm.gainItem(4310036, 1);
            qm.forceforceCompleteQuest(3975);
            qm.sendOk("��������10Ʒ��ԭ����1�������߱ҡ�����ǲ�ס���Ի����Щ�����Ļ���������ȥ���ұߵ�#b����������#k������һһ����˵�������ˣ�ף����ˡ�");
            qm.dispose();
        }
    }
}
