/*
 �������� by���� v1
 */
����var status = -1;


function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    var Editing = true //false = ���ʼ
    if (Editing) {
        cm.sendOk("�ȴ�2��8�Ű�!\r\n" +
                "����������� ��\r\n" +
                "#i1112585# + 666��Ҷ���� #r��\r\n" +
                "#k#i1113021# + 666��Ҷ���� ");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("����~��������NPC,������#r2���������Ҷ����666��#k��ֻ��ѡ#r����һ����ָ#r!!\r\n" +
                "#L0##d������ #i1112585# + 666��Ҷ����\r\n" +
                "#L1##d������ #i1113021# + 666��Ҷ����\r\n" +
                "#L2##d�Ҳ���Ҫ(���˾���Ĳ����솪)");
        //cm.dispose();
    } else if (status == 1) {
        if (selection == 2) {
            if (cm.getPlayer().getPrizeLog('����') < 1) {
                cm.getPlayer().setPrizeLog('����')
                cm.sendOk("�������Ǿ�ף��������ֆ�!");
                cm.worldMessage(6, "[ѶϢ] " + "���" + cm.getChar().getName() + " ף���������");
            } else {
                cm.sendOk("#dһ���ʺ�ֻ����һ���");
            }
        } else if (selection == 0) {
            if (cm.getPlayer().getPrizeLog('����') < 1) {
                cm.getPlayer().modifyCSPoints(2, 666, true);
                cm.gainItem(1112585, 1);
                cm.getPlayer().setPrizeLog('����');
                cm.sendOk("������ ��ʹף����ָ*1 + 666��Ҷ����");
                cm.worldMessage(6, "[ѶϢ] " + "���" + cm.getChar().getName() + " ��ȡ����������");
            } else {
                cm.sendOk("#dһ���ʺ�ֻ����һ���");
            }
        } else if (selection == 1) {
            if (cm.getPlayer().getPrizeLog('����') < 1) {
                cm.getPlayer().modifyCSPoints(2, 666, true);
                cm.gainItem(1113021, 1);
                cm.getPlayer().setPrizeLog('����');
                cm.sendOk("������ ���������*1 + 666��Ҷ����");
                cm.worldMessage(6, "[ѶϢ] " + "���" + cm.getChar().getName() + " ��ȡ����������");
            } else {
                cm.sendOk("#dһ���ʺ�ֻ����һ���");
            }
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}