importPackage(net.sf.cherry.client);

var status = 0;
var jobName;
var job;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("�����ܺ�Ŷ~~�����ı��뷨�ǵ���ʱ�����ҡ�ף����ˣ�");
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("�ˣ����� #b����Ա#k �ҿ��԰��������תְŶ~~��");
        } else if (status == 1) {
            if(cm.getJob() >= 2000){
                cm.sendNext("��~~ս��ս��������ְҵŶ~�Һܸ���Ϊ�����Ŷ������");
                status = 163;
                return;
            } else if (cm.getLevel() < 30) {
                cm.sendNext("��ô����ð�ջ���˳���ɡ���Ŭ�����лر�����Ȼ��һ�ж��������׵ġ����㵽�� #r[30��]#k ��ʱ��Ϳ��Խ���#b[�ڶ���תְ]#k��ʱ������������Ŷ��");
                status = 98;
            } else if (cm.getLevel() < 70) {
                cm.sendNext("��ô����ð�ջ���˳���ɡ���Ŭ�����лر�����Ȼ��һ�ж��������׵ġ����㵽�� #r[70��]#k ��ʱ��Ϳ��Խ���#b[������תְ]#k��ʱ������������Ŷ��");
                status = 98;
            } else if (cm.getLevel() < 120) {
                cm.sendNext("��ô����ð�ջ���˳���ɡ���Ŭ�����лر�����Ȼ��һ�ж��������׵ġ����㵽�� #r[120��]#k ��ʱ��Ϳ��Խ���#b[���Ĵ�תְ]#k��ʱ������������Ŷ��");
                status = 98;
            } else if (cm.getLevel() < 255) {
                cm.sendNext("�˲������Ѿ���������е�תְ��\r\n");
                status = 98;
                cm.dispose();
            } else {
                cm.dispose();
            }
        } else if (status == 164) {
            if(cm.getJob() == 2000 && cm.getLevel() >=10){
                cm.sendYesNo("ս��ս������\r\n�������㻹��һ��սͯ,��ȷ��Ҫ���е�һ��תְ��");
            } else if(cm.getJob() == 2100 && cm.getLevel() >=30) {
                cm.sendYesNo("ս��ս�����������ȷ��Ҫ���еڶ���תְ����");
            } else if(cm.getJob() == 2110 && cm.getLevel() >=70){
                cm.sendYesNo("ս��ս�����������ȷ��Ҫ���е�����תְ����");
            } else if(cm.getJob() == 2111 && cm.getLevel() >=120) {
                cm.sendYesNo("ս��ս�����������ȷ��Ҫ���е��Ĵ�תְ����");
            } else if(cm.getJob() == 2112 && cm.getLevel() >120) {
                cm.sendOk("���Ѿ���������е�תְ�������������Ͱɣ���");
            } else {
                cm.sendOk("������Ŀǰ���������һ�����Ϊ������Ŷ�����Ͱɣ�");
                cm.dispose();
            }
        } else if (status == 165) {
            if(cm.getJob() == 2000 && cm.getLevel() >=10){
                cm.changeJob(2100);
                //cm.gainItem(1142129,1);
                //cm.gainItem(1442077,1);
                //cm.gainItem(2000022,50);
                //cm.gainItem(2000023,50);
            cm.teachSkill(21000000,0,10);//ì����ǿ��
            cm.teachSkill(21000002,0,20);//˫���ػ�
            cm.teachSkill(21001001,0,15);//ս������
            cm.teachSkill(21001003,0,20);//����ì
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
                cm.dispose();
            } else if(cm.getJob() == 2100 && cm.getLevel() >=30){
                cm.changeJob(2110);
                //cm.gainItem(1142130,1);
                //cm.gainItem(1442078,1);
                cm.teachSkill(21100000,0,20);
                cm.teachSkill(21100002,0,20);
                cm.teachSkill(21100004,0,20);
                cm.teachSkill(21100005,0,20);
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
cm.����(3, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ�2ת����������Ҫ����ˣ�");
                cm.dispose();
            } else if(cm.getJob() == 2110 && cm.getLevel() >=70){
                //cm.gainItem(1142131,1);
                cm.getPlayer().gainAp(5);
                cm.changeJob(2111);
                cm.teachSkill(21110002,0,20);
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ����3ת�����Ѿ���һ��������ʵ�Ĵ����ˣ�");
                cm.sendOk("תְ�ɹ������Ͷ�����������ǿ���ʱ��ǵ�������Ŷ��");
                cm.dispose();
            } else if(cm.getJob() == 2111 && cm.getLevel() >=120){
                //cm.gainItem(1142132,1);
                cm.getPlayer().gainAp(5);
                cm.changeJob(2112);
                cm.teachSkill(21121000,0,10);
                cm.teachSkill(21120004,0,10);
                cm.teachSkill(21120005,0,10);
                cm.teachSkill(21120006,0,10);
                cm.teachSkill(21120007,0,10);
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ������ת�����Ѿ���ӽ����޵��ˣ�");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ������ת��Ϊʲô����ôǿ��");
cm.����(2, "��ϲ[" + cm.getPlayer().getName() + "]�ɹ������ת���ɷ����ұ�һ����Ĵ��ȣ���");
                cm.sendOk("תְ�ɹ���ϣ�����Ժ��ð��֮·˳����");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }  

    }
}
